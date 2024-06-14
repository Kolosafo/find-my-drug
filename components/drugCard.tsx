"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

const DrugCard = ({
  image,
  text,
}: {
  image: string | StaticImageData;
  text: string;
}) => {
  return (
    <div className='flex items-center p-4 bg-blue-600 rounded-xl my-4 hover:bg-blue-400'>
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
