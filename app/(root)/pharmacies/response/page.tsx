"use client";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { drugFoundCollectionRef } from "@/firebase";
import { DrugFoundType } from "@/types";
import { getRandomHexColor } from "@/utils/helpers";
import { getDocs } from "firebase/firestore";
import { MapPin, MapPinned } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

const Page = () => {
  const searchParams = useSearchParams();
  const searchId = searchParams.get("searchId");
  const drugName = searchParams.get("drugName");
  const [drugFoundData, setDrugFoundData] = useState<DrugFoundType[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  useEffect(() => {
    const handleFetchFoundDrugs = async () => {
      setLoading(true);
      const foundDrugs = await getDocs(drugFoundCollectionRef);
      const allFoundDrugs: any = foundDrugs.docs.map((sub) => ({
        ...sub.data(),
        id: sub.id,
      }));
      const specificDrug = allFoundDrugs.filter(
        (item: DrugFoundType) => item.drugSearchId === searchId,
      );
      setDrugFoundData(specificDrug);
      setLoading(false);
    };
    handleFetchFoundDrugs();
  }, [searchId]);
  return (
    <MaxWidthContainer className="pt-10 lg:pt-14">
      <span className="text-xl">{drugName}</span>
      {isLoading ? (
        <div className="flex h-[80vh] w-screen flex-col items-center justify-center">
          <ColorRing
            visible={true}
            height="100"
            width="50"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
          />
          <span className="text-red-600">Loading...</span>
        </div>
      ) : drugFoundData.length > 0 ? (
        <div className="mx-auto max-w-screen-lg">
          <ul>
            {drugFoundData.map((result, index) => (
              <li
                key={index}
                className="flex items-center gap-4 border-b border-gray-100 py-4"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-md`}
                  style={{ backgroundColor: getRandomHexColor() }}
                >
                  <span className="text-2xl font-bold">
                    {result.finderName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold xl:text-lg">
                    {result.finderName}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-gray-600 lg:text-base">
                    <MapPin size={16} />
                    <span>{result.finderLocation}</span>
                  </p>
                  <div className="mt-3 flex gap-4">
                    <button
                      onClick={() => {
                        const encodedLocation = encodeURIComponent(
                          result.finderLocation,
                        );
                        const googleMapsUrl = `https://www.google.com/maps/place/${encodedLocation}`;
                        window.open(googleMapsUrl, "_blank");
                      }}
                      className="flex w-fit items-center gap-2 self-end rounded-lg bg-green-600 px-3 py-2 text-white transition duration-300 hover:bg-green-600/80"
                    >
                      <MapPinned /> Open in Maps
                    </button>
                    <a
                      href={`tel:${result.finderPhoneNumber}`}
                      className="flex w-fit items-center gap-2 self-end rounded-lg bg-blue-600 px-3 py-2 text-white transition duration-300 hover:bg-blue-600/80"
                    >
                      Call
                    </a>
                    <button
                      onClick={() => handleCopy(`${result.finderPhoneNumber}`)}
                      className="flex w-fit items-center gap-2 self-end rounded-lg bg-orange-500 px-3 py-2 text-white transition duration-300 hover:bg-orange-500/80"
                    >
                      {!isCopied ? "Copy Phone Number" : "copied!"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex h-[80vh] w-[90vw] flex-col items-center justify-center">
          <span className="text-lg text-red-600">Please check back later</span>
          <span className="text-red-600">
            No responses yet for this drug search
          </span>
        </div>
      )}
      {/* {HistorMockup.map((item, index) => (
        <HistoryCard key={index} {...item} />
      ))} */}
    </MaxWidthContainer>
  );
};

export default Page;
