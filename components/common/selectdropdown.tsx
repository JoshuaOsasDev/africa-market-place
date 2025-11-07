"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

type LanguageOption = {
  value: string;
  label: string;
  flag: string;
};

type languageSelectProp = {
  showFlag: Boolean;
};
const languageOptions: LanguageOption[] = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "fr", label: "French", flag: "🇫🇷" },
  { value: "es", label: "Spanish", flag: "🇪🇸" },
  { value: "de", label: "German", flag: "🇩🇪" },
  { value: "pt", label: "Portuguese", flag: "🇵🇹" },
  { value: "zh", label: "Chinese", flag: "🇨🇳" },
  { value: "ar", label: "Arabic", flag: "🇸🇦" },
];

export default function LanguageSelect({ showFlag }: languageSelectProp) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(
    languageOptions[0]
  );
  const [open, setOpen] = useState(false);

  const handleSelect = (option: LanguageOption) => {
    setSelectedLanguage(option);
    setOpen(false);
  };

  return (
    <div className=" hidden lg:flex  items-center justify-center ">
      <div className="relative">
        {/* Button with language and icon close together */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center bg-transparent text-gray-800 focus:outline-none"
        >
          <span className="mr-1">
            {showFlag &&selectedLanguage.flag } {" "}
            {selectedLanguage.label}
          </span>

          <ChevronDown
            className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute left-0 right-0 z-10 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg w-64">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`flex w-full items-center space-x-2 px-4 py-2 text-left text-gray-800 hover:bg-blue-50 ${
                  selectedLanguage.value === option.value ? "bg-blue-100" : ""
                }`}
              >
                { 
                  showFlag && <span>{option.flag}</span>
                }
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
