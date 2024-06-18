"use client";
import HistoryCard from "@/components/HistoryCard";
import { drugSearchCollectionRef } from "@/firebase";
import { IRootState } from "@/redux/store";
import { DrugSearchType } from "@/types";
import { HistorMockup } from "@/utils/mockups";
import { getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const { user } = useSelector((state: IRootState) => state.user);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [searchObject, setSearchObject] = useState<DrugSearchType[]>([]);
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
      const findDrugSearched = allSearches.filter(
        (search) => search.user?.id === user.id,
      );
      setSearchObject(findDrugSearched);
      setFetchLoading(false);
    })();
  }, [user]);
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
  ) : !fetchLoading && searchObject.length === 0 ? (
    <div className="flex h-[80vh] w-[90vw] flex-col items-center justify-center">
      <span className="text-red-600">You haven&apos;t searched any drugs yet</span>
    </div>
  ) : (
    <div className="flex flex-col gap-6 p-10 px-16">
      <span>Search Histoy</span>
      {searchObject.map((item, index) => (
        <HistoryCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Page;
