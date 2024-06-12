"use client";

import { SearchIcon, X } from "lucide-react";
import { useState } from "react";

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <label
      htmlFor="search"
      className="flex h-fit w-full max-w-[500px] items-center rounded-lg border border-gray-200 p-3 px-6 py-3 transition duration-300 placeholder:text-sm placeholder:font-thin focus-within:border-transparent focus-within:outline focus-within:outline-1 focus-within:outline-gray-300"
    >
      <SearchIcon className="pointer-events-none h-5 w-5" />
      <input
        id="search"
        type="text"
        autoComplete="off"
        value={searchQuery}
        placeholder="Search for your prescription..."
        onChange={(e) => {
          const value = e.target.value;
          setSearchQuery(value);
        }}
        className="h-fit w-full border-none bg-transparent px-4 outline-none transition duration-300 placeholder:text-sm placeholder:tracking-widest"
      />
      <button
        type="button"
        title="clear input"
        onClick={() => setSearchQuery("")}
      >
        <X className="h-5 w-5" />
      </button>
    </label>
  );
}

export default Search;
