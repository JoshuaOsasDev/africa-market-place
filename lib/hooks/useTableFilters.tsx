import { useEffect, useState } from "react";

interface UseTableFiltersProps {
  initialPage?: number;
  initialLimit?: number;
  debounceTime?: number;
}

export function useTableFilters({
  initialPage = 1,
  initialLimit = 10,
  debounceTime = 1000,
}: UseTableFiltersProps = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatusState] = useState("");

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [search, debounceTime]);

  // Wrap setters to reset page automatically
  const setSearchWithReset = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const setStatus = (value: string) => {
    setPage(1);
    setStatusState(value);
  };

  return {
    page,
    setPage,
    limit,
    search,
    setSearch: setSearchWithReset,
    debouncedSearch,
    status,
    setStatus,
  };
}
