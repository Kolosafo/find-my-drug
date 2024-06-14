import { SearchIcon, X } from "lucide-react";
import React from "react";

function SearchInput({
  searchQuery,
  setSearchQuery,
  placeholder,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder: string;
}) {
  return (
    <label
      htmlFor="search"
      className="flex h-fit w-full max-w-[500px] items-center rounded-lg border border-gray-200 bg-white px-6 py-4 transition duration-300 placeholder:text-sm placeholder:font-thin focus-within:border-blue-400"
    >
      <SearchIcon className="pointer-events-none h-4 w-4" />
      <input
        id="search"
        type="text"
        autoComplete="off"
        value={searchQuery}
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value;
          setSearchQuery(value);
        }}
        className="h-fit w-full border-none bg-transparent px-4 outline-none transition duration-300 placeholder:text-sm placeholder:text-gray-600"
      />
      {searchQuery && (
        <button
          type="button"
          title="clear input"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </label>
  );
}

export default SearchInput;
