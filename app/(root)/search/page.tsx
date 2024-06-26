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
      text: "Enter the prescription or drug name(s)",
    },
    {
      image: image2,
      text: "Select where you want us to search, this is typically your state or a nearby state.",
    },
    {
      image: image3,
      text: "Checkout and we will contact you as soon as we find any pharmacy that has your medication",
    },
  ];

  return (
    <MaxWidthContainer className="grid gap-8 py-14 md:gap-10 lg:grid-cols-2 lg:gap-16 lg:pb-24 xl:gap-28">
      <section className="flex flex-col gap-2 lg:gap-4">
        <span className="mb-6 max-w-prose">
          With contacts of over 2,000 major pharmacies across Nigeria, we can
          help you find any prescribed medication.
        </span>
        <Search />
      </section>

      <section className="relative flex flex-col gap-6 rounded-md">
        <div className="sticky top-28">
          <div className="flex justify-center bg-slate-50 py-5 text-center">
            <h2>
              Search any prescription in{" "}
              <span className="font-semibold text-blue-600">3</span> simple
              steps
            </h2>
          </div>
          <div className="sticky top-10 flex h-auto flex-col bg-transparent">
            {data.map((item, index) => (
              <DrugCard key={index} image={item.image} text={item.text} />
            ))}
          </div>
        </div>
      </section>
    </MaxWidthContainer>
  );
}

export default Page;
