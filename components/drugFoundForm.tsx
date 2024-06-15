"use client";
import { DrugFoundType, DrugSearchType } from "@/types";
import React, { useState } from "react";
import moment from "moment";
const DrugFoundForm = ({
  drugName,
  handleSumbitDrugFound,
  isLoading,
}: {
  drugName: string;
  handleSumbitDrugFound: ({
    finderName,
    finderLocation,
    finderPhoneNumber,
  }: DrugFoundType) => void;
  isLoading: boolean;
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [drugFound, setDrugFound] = useState({
    finderName: "",
    finderLocation: "",
    finderPhoneNumber: "" as string | number,
    dateFound: moment().format("YYYY-MM-DD"),
  });
  const handleSubmit = () => {
    setErrorMsg("");
    setPhoneError("");
    if (
      drugFound.finderLocation === "" ||
      (drugFound.finderPhoneNumber === 0 && drugFound.finderName === "")
    ) {
      setErrorMsg("All fields are required");
      return;
    }
    if (
      typeof drugFound.finderPhoneNumber === "string" &&
      drugFound.finderPhoneNumber.length !== 11
    ) {
      setPhoneError("Invalid phone number");
      setErrorMsg("Invalid phone number");
      return;
    }

    handleSumbitDrugFound(drugFound);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[70%] items-center justify-center">
        <div className="mx-auto mb-4 flex w-full max-w-lg flex-col rounded bg-blue-100 px-8 pb-8 pt-6 shadow-md">
          <span className="mb-3 mt-3 self-center text-2xl font-semibold">
            {drugName}
          </span>
          <span className="mb-2 mt-4 block text-sm font-semibold text-red-500">
            Please only fill this form if you have the drug/prescription above
          </span>
          <div className="my-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Pharmacy Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="text"
              placeholder="Name of your pharmacy"
              value={drugFound.finderName}
              onChange={(e) =>
                setDrugFound({ ...drugFound, finderName: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Location
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="location"
              type="text"
              placeholder="Where is your pharmacy located?"
              value={drugFound.finderLocation}
              onChange={(e) =>
                setDrugFound({ ...drugFound, finderLocation: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <span className="text-xs text-red-600">{phoneError}</span>
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="confirmPassword"
            >
              Contact Number
            </label>
            <input
              className="focus:shadow-outline no-spinners mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="contactNumber"
              type="number"
              placeholder="Contact number e.g 090123456"
              value={drugFound.finderPhoneNumber}
              onChange={(e) => {
                setDrugFound({
                  ...drugFound,
                  finderPhoneNumber: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="mb-2 text-sm text-red-600">{errorMsg}</span>
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700`}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
          <div className="mt-6 text-center">
            <div className="w-full border-t border-gray-400 pb-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugFoundForm;
