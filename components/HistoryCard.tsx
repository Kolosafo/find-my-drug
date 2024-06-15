import { HistoryObjectType } from "@/types";
import { checkIsTodayOrYesterday } from "@/utils/helpers";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";

function HistoryCard(data: HistoryObjectType) {
  return (
    <div className="relative flex flex-col rounded-lg bg-blue-100/40 p-4">
      <HiDotsVertical
        size={25}
        className="absolute right-3 top-3 cursor-pointer"
      />

      <span className="mb-4 text-2xl font-semibold">{data.name}</span>
      <div className="flex items-center gap-6">
        <span className="text-sm">
          Pharmacies Contacted:{" "}
          <span className="font-semibold">{data.pharmaciesContacted}</span>{" "}
        </span>
        <span className="text-sm">
          Responses: <span className="font-semibold">{data.responses}</span>
        </span>
        <span className="text-sm">
          Date Created:{" "}
          <span className="font-semibold">
            {checkIsTodayOrYesterday(data.dateCreated).toString()}
          </span>
        </span>
      </div>
    </div>
  );
}

export default HistoryCard;
