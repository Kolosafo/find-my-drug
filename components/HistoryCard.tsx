import { DrugSearchType, HistoryObjectType } from "@/types";
import { checkIsTodayOrYesterday } from "@/utils/helpers";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function HistoryCard(data: DrugSearchType) {
  const router = useRouter();
  return (
    <div className="relative flex flex-col rounded-lg bg-blue-100/40 p-4">
      <MoreVertical className="absolute right-3 top-3 cursor-pointer" />

      <span className="mb-4 text-2xl font-semibold">{data.name}</span>
      <div className="flex items-center gap-6">
        <span className="text-sm">
          Pharmacies Contacted:{" "}
          <span className="font-semibold">{data.pharmaciesContacted}</span>
        </span>
        <span
          className="cursor-pointer text-sm text-red-400"
          onClick={() =>
            router.push(
              `/pharmacies/response?searchId=${data.id}&drugName=${data.name}`,
            )
          }
        >
          Responses: <span className="font-semibold">{data.response}</span>
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
