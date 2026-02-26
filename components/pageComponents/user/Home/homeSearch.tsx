"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import http from "@/services/apiServices/http";
import { Search, Loader2, TrendingUp, Clock, X } from "lucide-react";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  slug: string;
  image?: { url: string };
  price: number;
  salePrice?: number;
}

const RECENT_KEY = "recent_searches";

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecent(term: string) {
  const prev = getRecent().filter((t) => t !== term);
  localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...prev].slice(0, 5)));
}

export default function HomeSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent on mount
  useEffect(() => {
    setRecent(getRecent());
  }, []);

  // Outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await http.post(`/search`, { query: debouncedSearch });
        setResults(res.data.products ?? []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [debouncedSearch]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const showDropdown = open && (search.trim() ? true : recent.length > 0);

  function handleSelect(product: Product) {
    saveRecent(product.name);
    setRecent(getRecent());
    setSearch("");
    setOpen(false);
    router.push(`/user/products/${product.slug}`);
  }

  function handleRecentClick(term: string) {
    setSearch(term);
    inputRef.current?.focus();
  }

  function clearSearch() {
    setSearch("");
    setResults([]);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;
    const total = results.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + total) % total);
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      handleSelect(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      {/* Input wrapper */}
      <div className="flex items-center justify-between py-1">
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setFocused(true);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for food items here..."
          className="h-6 w-full rounded-md p-3 outline-none"
          autoComplete="off"
        />

        <div className="flex items-center space-x-1">
          {loading && (
            <Loader2
              size={15}
              className="shrink-0 animate-spin text-[#F08804]"
            />
          )}
          {search && (
            <button
              onClick={clearSearch}
              className="shrink-0 rounded-full p-0.5 text-[#767676] transition hover:bg-gray-100 hover:text-gray-900"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      {/* Vertical divider + Search button */}

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 left-0 z-50 mt-2.5 overflow-hidden rounded-lg border border-[#CDCDCD] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          {/* Recent searches — shown when input is empty */}
          {!search.trim() && recent.length > 0 && (
            <>
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-[11px] font-semibold tracking-wider text-[#767676] uppercase">
                  Recent Searches
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem(RECENT_KEY);
                    setRecent([]);
                  }}
                  className="text-sm text-[#2E7D32] hover:text-[#C7511F] hover:underline"
                >
                  Clear
                </button>
              </div>
              {recent.map((term) => (
                <button
                  key={term}
                  onClick={() => handleRecentClick(term)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[#F6F6F6]"
                >
                  <Clock size={14} className="shrink-0 text-[#767676]" />
                  <span className="text-sm text-gray-800">{term}</span>
                </button>
              ))}
              <div className="mx-4 my-1 border-t border-[#EBEBEB]" />
            </>
          )}

          {/* Trending placeholder — shown when input is empty */}
          {!search.trim() && (
            <div className="px-4 pt-2 pb-1">
              <span className="text-[11px] font-semibold tracking-wider text-[#767676] uppercase">
                Trending
              </span>
            </div>
          )}

          {/* Results */}
          {search.trim() && !loading && results.length === 0 && (
            <div className="px-4 py-5 text-center">
              <p className="text-sm text-[#767676]">
                No results for{" "}
                <span className="font-semibold text-gray-900">{`${search}`}</span>
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="max-h-85 overflow-y-auto py-1">
              {results.map((product, i) => {
                const discounted =
                  product.salePrice && product.salePrice < product.price;
                const isActive = i === activeIndex;

                return (
                  <li key={product._id}>
                    <button
                      onClick={() => handleSelect(product)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition ${
                        isActive ? "bg-[#F6F6F6]" : "hover:bg-[#F6F6F6]"
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded border border-[#EBEBEB] bg-[#F9F9F9]">
                        {product.image?.url ? (
                          <Image
                            fill
                            src={product.image.url}
                            alt={product.name}
                            className="h-full w-full object-contain p-0.5"
                          />
                        ) : (
                          <div className="h-6 w-6 rounded-sm bg-[#CDCDCD]" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                        <span className="truncate text-sm text-gray-900">
                          {/* Highlight matching portion */}
                          {product.name
                            .split(new RegExp(`(${search})`, "gi"))
                            .map((part, j) =>
                              part.toLowerCase() === search.toLowerCase() ? (
                                <strong key={j} className="font-semibold">
                                  {part}
                                </strong>
                              ) : (
                                part
                              ),
                            )}
                        </span>
                        <div className="flex items-center gap-2">
                          {discounted ? (
                            <>
                              <span className="text-xs font-bold text-[#B12704]">
                                ₦{product.salePrice?.toLocaleString()}
                              </span>
                              <span className="text-xs text-[#767676] line-through">
                                ₦{product.price.toLocaleString()}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-bold text-gray-900">
                              ₦{product.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <Search size={13} className="shrink-0 text-[#CDCDCD]" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Footer hint */}
          {results.length > 0 && (
            <div className="border-t border-[#EBEBEB] px-4 py-2.5 text-center">
              <button
                onClick={() => {
                  router.push(
                    `/user/products?q=${encodeURIComponent(search.trim())}`,
                  );
                  setOpen(false);
                }}
                className="text-xs text-[#2E7D32] hover:text-[#C7511F] hover:underline"
              >
                See all results for{" "}
                <span className="font-semibold">{`${search}`}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
