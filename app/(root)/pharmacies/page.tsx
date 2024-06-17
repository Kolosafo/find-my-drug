"use client";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { Check, ChevronsUpDown, MapPin, SearchIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SearchLocations } from "@/utils/mockups";
import { LocationSearchType, PharmListType } from "@/types";
import SearchInput from "@/components/ui/search-input";
import AbujaPharmacies from "../../../pharmacies/abuja.json";
import BeningPharmacies from "../../../pharmacies/benin.json";
import EnuguPharmacies from "../../../pharmacies/enugu.json";
import IbadanPharmacies from "../../../pharmacies/ibadan.json";
import KadunaPharmacies from "../../../pharmacies/kaduna.json";
import KanoPharmacies from "../../../pharmacies/kano.json";
import LagosPharmacies from "../../../pharmacies/lagos.json";
import OwerriPharmacies from "../../../pharmacies/owerri.json";
import portPharmacies from "../../../pharmacies/portHarcourt.json";
import { getRandomHexColor } from "@/utils/helpers";
function Page() {
  const combinedPharmacies = [
    ...AbujaPharmacies,
    ...BeningPharmacies,
    ...EnuguPharmacies,
    ...IbadanPharmacies,
    ...KadunaPharmacies,
    ...KanoPharmacies,
    ...LagosPharmacies,
    ...OwerriPharmacies,
    ...portPharmacies,
  ];
  const [untouchedArray, setUntouchedArray] = useState<PharmListType[]>([]);
  const [results, setResults] = useState<PharmListType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [searchLocation, setSearchLocation] = useState<LocationSearchType>(
    SearchLocations[0],
  );

  const handleSearchPharm = (query: string) => {
    setSearchQuery(query);
    const filterPharms = untouchedArray.filter(
      (pharm) =>
        pharm.name.toLowerCase().includes(query.toLowerCase()) ||
        pharm.address.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filterPharms);
  };

  const selectLocation = (location: LocationSearchType) => {
    setSearchLocation(location);
    switch (location) {
      case "abuja":
        setResults(AbujaPharmacies);
        setUntouchedArray(AbujaPharmacies);
        return;
      case "lagos":
        setResults(LagosPharmacies);
        setUntouchedArray(LagosPharmacies);
        return;
      case "ibadan":
        setResults(IbadanPharmacies);
        setUntouchedArray(IbadanPharmacies);
        return;
      case "enugu":
        setResults(EnuguPharmacies);
        setUntouchedArray(EnuguPharmacies);
        return;
      case "kaduna":
        setResults(KadunaPharmacies);
        setUntouchedArray(KadunaPharmacies);
        return;
      case "kano":
        setResults(KanoPharmacies);
        setUntouchedArray(KanoPharmacies);
        return;
      case "owerri":
        setResults(OwerriPharmacies);
        setUntouchedArray(OwerriPharmacies);
        return;
      case "portHarcourt":
        setResults(portPharmacies);
        setUntouchedArray(portPharmacies);
        return;
      case "benin":
        setResults(BeningPharmacies);
        setUntouchedArray(BeningPharmacies);
        return;
      case "everywhere":
        setResults(combinedPharmacies);
        setUntouchedArray(combinedPharmacies);
        return;
      default:
        setResults(combinedPharmacies);
        setUntouchedArray(combinedPharmacies);
    }
  };

  useEffect(() => {
    setResults(combinedPharmacies);
  }, []);

  return (
    <MaxWidthContainer className="pt-10 lg:pt-14">
      <section className="flex justify-between">
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={handleSearchPharm}
          placeholder="Search for available pharmacies..."
        />
        <div className="relative w-fit text-gray-600">
          <button
            id="actions"
            type="button"
            className="flex items-center gap-4 rounded-md border bg-white px-6 py-4 transition duration-300 hover:bg-gray-50 focus-visible:border-transparent focus-visible:outline-1 focus-visible:outline-gray-300"
            onClick={() => setExpanded(!expanded)}
          >
            {searchLocation}
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
      <section className="mt-10">
        <div className="mx-auto max-w-screen-lg">
          <ul>
            {results.map((result, index) => (
              <li
                key={index}
                className="flex items-center gap-4 border-b border-gray-100 py-4"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-md`}
                  style={{ backgroundColor: getRandomHexColor() }}
                >
                  <span className="text-2xl font-bold">{result.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold xl:text-lg">{result.name}</h3>
                  <p className="flex items-center gap-2 text-sm text-gray-600 lg:text-base">
                    <MapPin size={16} />
                    <span>{result.address}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MaxWidthContainer>
  );
}

export default Page;
