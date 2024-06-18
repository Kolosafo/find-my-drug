"use client";
import HistoryCard from "@/components/HistoryCard";
import MaxWidthContainer from "@/components/shared/max-width-container";
import Loader from "@/components/ui/loader";
import { drugSearchCollectionRef } from "@/firebase";
import { IRootState } from "@/redux/store";
import { DrugSearchType } from "@/types";
import { HistorMockup } from "@/utils/mockups";
import { getDocs } from "firebase/firestore";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
    <Loader />
  ) : !fetchLoading && searchObject.length === 0 ? (
    <MaxWidthContainer className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="mx-auto mt-2 flex min-h-80 max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-lg text-gray-900 lg:text-xl">
          You haven&apos;t searched for any drug yet.
        </h1>
        <Link
          href="/search"
          className="flex w-fit items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-white transition duration-300 hover:bg-blue-600/80"
        >
          Search
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </MaxWidthContainer>
  ) : (
    <MaxWidthContainer className="space-y-8 py-10">
      <div className="mx-auto max-w-md rounded-md border bg-white p-4">
        <h1 className="text-center lg:text-lg">Search History</h1>
      </div>

      <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
        {searchObject.map((item, index) => (
          <HistoryCard key={index} {...item} />
        ))}
      </div>
    </MaxWidthContainer>
  );
};

export default Page;
