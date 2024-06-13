"use client";
import DrugCard from "@/components/drugCard";
import Search from "@/components/search";
import MaxWidthContainer from "@/components/shared/max-width-container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import image1 from "@/public/1.jpg";
import image2 from "@/public/2.jpg";
import image3 from "@/public/images (3).jpg";

function Page() {
  const data = [
    {
      image: image1,
      text: "Do not take a drug without a doctors prescription",
    },
    {
      image: image2,
      text: "Do not take a drug without a doctors prescription",
    },
  ];

  const [results, setResults] = useState(Array.from({ length: 10 }).fill(""));

  return (
    <MaxWidthContainer className="grid gap-8 py-14 lg:grid-cols-2 lg:gap-10 lg:pb-24 xl:gap-12">
      <div className="flex flex-col gap-2 lg:gap-4">
        <span className="leading-0 mb-0 text-2xl font-bold text-gray-800">
          {" "}
          <span className="text-blue-600">Find</span>MyDrug
        </span>
        <span className="mb-6">
          With contacts of over 2,000 major pharmacies across Nigeria, we can
          help you find any prescribed drug.
        </span>
        <div className="flex h-auto flex-col bg-transparent">
          {data.map((item, index) => (
            <DrugCard key={index} image={item.image} text={item.text} />
          ))}
        </div>
        {/* <Search /> */}
      </div>
      <div className="flex flex-col gap-6 rounded-md">
        <div className="flex justify-center bg-slate-50 py-5 text-center">
          <h2>Here&apos;s what we found</h2>
        </div>
        <ul className="flex max-h-72 flex-col gap-6 overflow-y-auto rounded-md bg-slate-50 px-6 py-16 2xl:max-h-96">
          {results.map((result) => (
            <li
              key={crypto.randomUUID()}
              className="flex h-16 items-center justify-between rounded-md border bg-white p-4"
            >
              <div className="">
                <p className="font-medium">Yunik Pharmacy</p>
                <p className="text-sm">
                  Cedi plaza, Central business district, Abuja
                </p>
              </div>
              <Link
                href="/search"
                className="mx-auto flex h-fit w-fit items-center gap-2 rounded-md bg-blue-500 px-2 py-1 text-sm text-white sm:m-0"
              >
                View
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </MaxWidthContainer>
  );
}

export default Page;
