import HistoryCard from "@/components/HistoryCard";
import { HistorMockup } from "@/utils/mockups";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 p-10 px-16">
      <span>Search Histoy</span>
      {HistorMockup.map((item, index) => (
        <HistoryCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Page;
