import SearchInput from "@/components/ui/search-input";
import React from "react";

const Page = () => {
  return (
    <section className="flex justify-between">
      {" "}
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search for available pharmacies..."
      />
      <div className="relative w-fit text-gray-600">
        <button
          id="actions"
          type="button"
          className="flex items-center gap-4 rounded-md border bg-white px-6 py-4 transition duration-300 hover:bg-gray-50 focus-visible:border-transparent focus-visible:outline-1 focus-visible:outline-gray-300"
          onClick={() => setExpanded(!expanded)}
        >
          Where should we search?
          <ChevronsUpDown size={16} />
        </button>
        <ul
          className={`bg-main absolute left-0 top-16 z-10 flex max-h-[21rem] w-3/4 min-w-40 flex-col gap-2 overflow-hidden overflow-y-auto rounded-md border bg-white px-2 py-4 shadow-sm transition-all ${
            expanded
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0"
          }`}
        >
          {SearchLocations.map((location, index) => (
            <li key={location + index}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-md px-2 py-1 text-left capitalize transition duration-300 hover:bg-gray-100"
                tabIndex={!expanded ? -1 : undefined}
                onClick={() => selectLocation(location)}
              >
                <Check
                  className={`h-4 w-4 text-blue-600 ${searchLocation.includes(location) ? "opacity-100" : "opacity-0"}`}
                />
                {location}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;
