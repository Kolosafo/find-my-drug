"use client";
import React from "react";
import Image from "next/image";

const DrugCard = ({ image, text }: any) => {
  return (
    <div className="my-4 flex items-center justify-around rounded-xl bg-blue-700 p-4 hover:bg-blue-400">
      <div>
        <Image
          src={image}
          width={100}
          height={50}
          alt="drug img here"
          className="max-w-[100px] rounded-xl"
        />
      </div>
      <div className="pl-4 text-white">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DrugCard;