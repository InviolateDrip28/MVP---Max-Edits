"use client";
import {
  COUNTRY_CODES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
} from "@/constants";
import DropdownSelect from "../components/DropdownSelect";
import { use, useEffect, useState } from "react";

export default function Homepage() {
  const [fromCountry, setFromCountry] = useState("US");
  const [toCountry, setToCountry] = useState("GB");

  const handleClick = () => {
    console.log("fromCountry: ", fromCountry);
    console.log("toCountry: ", toCountry);
    console.log(
      "fromCurrency: ",
      COUNTRY_CODE_TO_CURRENCY[fromCountry]
    );
    console.log("toCurrency: ", COUNTRY_CODE_TO_CURRENCY[toCountry]);
  };
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center p-24 gap-8">
        <div className="font-semibold justify-center space-y-4">
          <p className="text-4xl">
            Compare international money transfers and save.
          </p>
          <p>
            Search across banks, remittance apps, and crypto services
            to find the best way to send or recieve your international
            money transfer.
          </p>
        </div>

        <div className="border box-border p-8 shadow-xl rounded-xl w-full space-y-4">
          <div className="w-full flex flex-row gap-4">
            <div className="w-1/2">
              <div className="bg-secondary/80 py-2 px-3 rounded-t-sm text-lg font-bold">
                COUNTRY FROM
              </div>
              <DropdownSelect
                dropdownList={COUNTRY_CODES}
                reference={COUNTRY_CODE_TO_NAME}
                defaultValue={fromCountry}
                setSelected={setFromCountry}
              />
            </div>
            <div className="w-1/2">
              <div className="bg-secondary/80 py-2 px-3 rounded-t-sm text-lg font-bold">
                COUNTRY TO
              </div>
              <DropdownSelect
                dropdownList={COUNTRY_CODES}
                reference={COUNTRY_CODE_TO_NAME}
                defaultValue={toCountry}
                setSelected={setToCountry}
              />
            </div>
          </div>
          <div className="">
            I want to convert{" "}
            <input
              type="number"
              defaultValue={500}
              className="border rounded-md p-2"
            />
            <DropdownSelect
              dropdownList={["USD"]}
              defaultValue={COUNTRY_CODE_TO_CURRENCY[fromCountry]}
              className="border rounded-md p-2"
              setSelected={setFromCountry}
            />
            to
            <DropdownSelect
              dropdownList={["USD"]}
              defaultValue={COUNTRY_CODE_TO_CURRENCY[toCountry]}
              className="border rounded-md p-2"
              setSelected={setToCountry}
            />
          </div>
          <button
            className="bg-accent text-white font-bold rounded-md p-2 w-full"
            onClick={handleClick}
          >
            Compare Rates
          </button>
        </div>
      </div>
    </div>
  );
}
