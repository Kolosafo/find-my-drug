"use client";
import { SearchIcon, X } from "lucide-react";
import { drugSearchCollectionRef } from "@/firebase";
import { IRootState } from "@/redux/store";
import { DrugSearchType, LocationSearchType } from "@/types";
import { priceCalculator } from "@/utils/helpers";
import { SearchLocations } from "@/utils/mockups";
import { addDoc } from "firebase/firestore";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

function Search() {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLocation, setSearchLocaion] = useState<LocationSearchType[]>([]);
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
      {searchQuery && (
        <button
          type="button"
          title="clear input"
          onClick={() => setSearchQuery("")}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </label>
  );
}

export default Search;
