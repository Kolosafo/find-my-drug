"use client";
import { drugFoundCollectionRef } from "@/firebase";
import { DrugFoundType } from "@/types";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
const useDrugFound = ({
  searchId,
  drugName,
}: {
  searchId: string;
  drugName: string;
}) => {
  const [drugFoundData, setDrugFoundData] = useState<DrugFoundType[]>([]);
  const [isLoading, setLoading] = useState(true);
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
  return { isLoading, drugFoundData, drugName };
};
export default useDrugFound;
