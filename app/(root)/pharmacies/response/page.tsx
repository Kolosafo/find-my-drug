"use client";
import MaxWidthContainer from "@/components/shared/max-width-container";
import Loader from "@/components/ui/loader";
import { drugFoundCollectionRef } from "@/firebase";
import { DrugFoundType } from "@/types";
import { getRandomHexColor } from "@/utils/helpers";
import { getDocs } from "firebase/firestore";
import { Copy, MapPin, MapPinned, Phone, Search, SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

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
      // setIsCopied(true);
      toast("Phone number copied", {
        type: "success",
        style: { fontSize: "14px" },
      });
      // setTimeout(() => setIsCopied(false), 3000);
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
    <MaxWidthContainer className="space-y-6 pt-10 lg:pt-14">
      <div className="mx-auto max-w-md rounded-md border bg-white p-6">
        <h1 className="text-center lg:text-xl">
          Search responses for:
          <span className="ml-3 text-blue-600">&quot;{drugName}&quot;</span>
        </h1>
      </div>

      {isLoading ? (
        <Loader />
      ) : drugFoundData.length > 0 ? (
        <div className="mx-auto max-w-screen-lg">
          <ul>
            {drugFoundData.map((result, index) => (
              <li
                key={index}
                className="flex items-start gap-4 border-b border-gray-100 py-4"
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
                      className="flex w-fit items-center gap-2 self-end rounded-md bg-green-600 px-3 py-2 text-sm text-white transition duration-300 hover:bg-green-600/80"
                    >
                      <MapPinned size={16} /> Open in Maps
                    </button>
                    <a
                      href={`tel:${result.finderPhoneNumber}`}
                      className="flex w-fit items-center gap-2 self-end rounded-md bg-blue-600 px-3 py-2 text-sm text-white transition duration-300 hover:bg-blue-600/80"
                    >
                      <Phone size={16} />
                      Call
                    </a>
                    <button
                      onClick={() => handleCopy(`${result.finderPhoneNumber}`)}
                      className="flex w-fit items-center gap-2 self-end rounded-md bg-orange-500 px-3 py-2 text-sm text-white transition duration-300 hover:bg-orange-500/80"
                    >
                      <Copy size={16} />
                      {!isCopied ? "Copy Phone No." : "copied!"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mx-auto mt-2 flex min-h-80 max-w-md flex-col items-center gap-8 rounded-md border bg-white p-6 text-center">
          <div>
            <p className="text-lg text-blue-600 lg:text-xl">
              Please check back later
            </p>
            <p className="">No responses for this drug search yet</p>
          </div>
          <SearchX size={100} className="text-gray-300" />
        </div>
      )}
      {/* {HistorMockup.map((item, index) => (
        <HistoryCard key={index} {...item} />
      ))} */}
    </MaxWidthContainer>
  );
};

export default Page;
