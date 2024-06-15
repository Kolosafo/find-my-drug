"use client";

import { drugSearchCollectionRef } from "@/firebase";
import { IRootState } from "@/redux/store";
import { DrugSearchType, LocationSearchType } from "@/types";
import { priceCalculator } from "@/utils/helpers";
import { SearchLocations } from "@/utils/mockups";
import { addDoc } from "firebase/firestore";
import moment from "moment";
import { Check, ChevronsUpDown, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SearchInput from "./ui/search-input";

function Search() {
  const { user, isLogged } = useSelector((state: IRootState) => state.user);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<LocationSearchType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [pricing, setPricing] = useState({
    price: 0,
    searchAmount: 0,
    locationCount: 0,
  });
  const [expanded, setExpanded] = useState(false);

  const handleAddLocation = (
    location: LocationSearchType,
    removeEveryWhere?: boolean,
  ) => {
    if (location === "everywhere") {
      const allLocationsSelected =
        searchLocation.length === SearchLocations.length;
      if (allLocationsSelected) {
        setSearchLocation([]);
        setPricing({
          price: 0,
          searchAmount: 0,
          locationCount: 0,
        });
      } else {
        setSearchLocation(SearchLocations);
        setPricing(priceCalculator(SearchLocations));
      }
      return;
    }
    const checkExists = searchLocation.find((item) => item === location);
    if (checkExists) {
      const removeLocation = searchLocation.filter((item) => item !== location);
      setSearchLocation(removeLocation);
      setPricing(priceCalculator(removeLocation));
      return;
    }
    setSearchLocation([...searchLocation, location]);
    setPricing(priceCalculator([...searchLocation, location]));
  };

  const handleSubmit = async () => {
    // THIS SHOULD BE RUN WHEN PAYSTACK PAYMENT IS SUCCESSFUL
    setIsLoading(true);
    await addDoc(drugSearchCollectionRef, {
      name: searchQuery,
      searchLocations: searchLocation,
      user,
      dateCreated: moment().format("YYYY-MM-DD"),
    } as DrugSearchType)
      .then((res) => {
        // EXECUTE TEXTING PHARMACIES
      })
      .catch(() => {
        toast("Something went wrong", {
          type: "error",
        });
      });
    setIsLoading(false);
  };
  return !isLogged ? (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="What drug(s) are you looking for?"
        />

        {/* options dropdown */}
        <div className="relative w-fit text-gray-600">
          <button
            id="actions"
            type="button"
            className="flex items-center gap-4 rounded-md border bg-white px-6 py-3 transition duration-300 hover:bg-gray-50 focus-visible:border-transparent focus-visible:outline-1 focus-visible:outline-gray-300"
            onClick={() => setExpanded(!expanded)}
          >
            Where should we search?
            <ChevronsUpDown size={16} />
          </button>
          <ul
            className={`bg-main absolute left-0 top-14 z-10 flex max-h-[21rem] w-3/4 min-w-40 flex-col gap-2 overflow-hidden overflow-y-auto rounded-md border bg-white px-2 py-4 shadow-sm transition-all ${
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
                  onClick={() => handleAddLocation(location)}
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
      </div>

      {/* search details */}
      <div className="mt-2 rounded-md border bg-white p-6">
        {pricing.locationCount > 0 ? (
          <div className="flex flex-col gap-4">
            <span className="mb-3 text-3xl">Checkout</span>
            <span className="font-semibold">
              Pharmacies Found:{" "}
              <span className="text-blue-600">
                {(pricing.searchAmount + 3).toLocaleString()}
              </span>{" "}
            </span>
            <div className="flex flex-col gap-2">
              <span className="whitespace-nowrap text-nowrap font-semibold">
                Search Locations:
              </span>{" "}
              <p className="flex flex-wrap gap-3">
                {searchLocation
                  .filter((location) => location !== "everywhere")
                  .map((location, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-0.5 text-sm font-medium capitalize text-blue-600"
                    >
                      {location}
                    </span>
                  ))}
              </p>
            </div>
            <span>
              No. of search states:{" "}
              <span className="font-bold text-blue-600">
                {pricing.locationCount}
              </span>
            </span>
            <span className="text-2xl font-semibold">
              Total: N{pricing.price}
            </span>
            <div className="flex justify-between">
              <button
                disabled={isLoading}
                // onClick={handleSubmit}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-600/90"
              >
                {isLoading ? "Loading..." : `Pay Now - N${pricing.price}`}
              </button>
              <Link
                href={"/pharmacies"}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-300 hover:bg-blue-600/90"
              >
                View Pharmacies
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[300px] items-center justify-center">
            <p>Search to see results.</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <Link href={"/auth/login"} className="font-semibold text-red-500">
        Login to begin
      </Link>
    </div>
  );
}

export default Search;
