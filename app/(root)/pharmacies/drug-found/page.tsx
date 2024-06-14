"use client";
import DrugFoundForm from "@/components/drugFoundForm";
import { drugFoundCollectionRef, drugSearchCollectionRef } from "@/firebase";
import { DrugFoundType, DrugSearchType } from "@/types";
import { addDoc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";

const Page = () => {
  const searchParams = useSearchParams();
  const searchId = searchParams.get("searchId");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [searchObject, setSearchObject] = useState<DrugSearchType>();

  const handleSubmitDrugFound = async (finderInfo: DrugFoundType) => {
    await addDoc(drugFoundCollectionRef, {
      drugSearchId: searchId,
      finderName: finderInfo.finderName,
      finderLocation: finderInfo.finderLocation,
      finderPhoneNumber: finderInfo.finderPhoneNumber,
    })
      .then((res) => {
        const drugSearcher = searchObject?.user?.phoneNumber;
        // SEND THE PERSON WHO SEARCH FOR THE DRUG A TEXT MESSAGE THAT THEIR DRUG HAS BEEN FOUND
      })
      .catch(() => {
        toast("Something went wrong", {
          type: "error",
        });
      });
  };
  useEffect(() => {
    (async () => {
      setFetchLoading(true);
      const searches = await getDocs(drugSearchCollectionRef).catch(() => {
        setFetchLoading(false);
        toast("Something went wrong", {
          type: "error",
        });
      });
      const allSearches = searches?.docs.map((search) => ({
        ...search.data(),
        id: search.id,
      })) as DrugSearchType[];
      const findDrugSearched = allSearches.find(
        (search) => search.id === searchId,
      );
      setSearchObject(findDrugSearched);
      setFetchLoading(false);
    })();
  }, [searchId]);

  return fetchLoading ? (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#000000", "#000000", "#000000", "#000000", "#000000"]}
      />
      <span className="text-red-600">Loading...</span>
    </div>
  ) : !fetchLoading && !searchObject ? (
    <div className="flex h-[80vh] w-[90vw] flex-col items-center justify-center">
      <span className="text-red-600">
        We couldn&apos;t find who searched that drug
      </span>
    </div>
  ) : (
    <DrugFoundForm
      drugName={searchObject?.name ?? ""}
      handleSumbitDrugFound={handleSubmitDrugFound}
    />
  );
};
// router.push("/learn/new-course?quickLearn=true");
export default Page;
