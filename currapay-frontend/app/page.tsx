"use client";
import {
  COUNTRY_CODES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
  PARTNERS
} from "@/constants";
import DropdownSelect from "../components/DropdownSelect";
import { Marquee } from "@/components/Marquee";
import { useState } from "react";

export default function Homepage() {
  const [fromCountry, setFromCountry] = useState("US");
  const [toCountry, setToCountry] = useState("GB");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("500");
  const [useBanks, setUseBanks] = useState(false);
  const [useRemittanceApps, setUseRemittanceApps] = useState(false);
  const [useCrypto, setUseCrypto] = useState(false);

  const handleClick = () => {
    console.log("fromCountry: ", fromCountry);
    console.log("toCountry: ", toCountry);
    console.log(
      "fromCurrency: ",
      COUNTRY_CODE_TO_CURRENCY[fromCountry]
    );
    console.log("toCurrency: ", COUNTRY_CODE_TO_CURRENCY[toCountry]);
    console.log("amount: ", amount);
  };
  return (
    <div>
      <div className="flex min-h-screen flex-col items-center p-24 gap-8">
        <div className="font-semibold justify-center space-y-4">
          <h1 className="text-4xl">
            Compare international money transfers and save.
          </h1>
          <p>
            Search across banks, remittance apps, and crypto services
            to find the best way to send or recieve your international
            money transfer.
          </p>
        </div>

        <div className="border box-border p-8 shadow-xl rounded-xl w-full space-y-4">
          <div
            id="filters"
            className="justify-center flex flex-row gap-4"
          >
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-primary"
              >
                Banks
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-primary"
              >
                Remittance Apps
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-primary"
              >
                Crypto
              </label>
            </div>
          </div>

          <div className="w-full flex flex-row gap-4">
            <div className="w-1/2">
              <DropdownSelect
                dropdownList={COUNTRY_CODES}
                reference={COUNTRY_CODE_TO_NAME}
                defaultValue={fromCountry}
                setSelected={setFromCountry}
                hasImage={true}
                label={"COUNTRY FROM"}
              />
            </div>
            <div className="w-1/2">
              <DropdownSelect
                dropdownList={COUNTRY_CODES}
                reference={COUNTRY_CODE_TO_NAME}
                defaultValue={toCountry}
                setSelected={setToCountry}
                label={"COUNTRY TO"}
                hasImage={true}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className=" whitespace-nowrap">I want to convert</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-primary shadow-sm border border-gray-300 focus:outline-none sm:text-sm sm:leading-6"
            />
            <DropdownSelect
              dropdownList={["US"]}
              defaultValue={fromCountry}
              reference={COUNTRY_CODE_TO_CURRENCY}
              setSelected={setFromCurrency}
              className="border rounded-md p-2"
            />
            <p>to</p>
            <DropdownSelect
              dropdownList={["US"]}
              reference={COUNTRY_CODE_TO_CURRENCY}
              defaultValue={toCountry}
              setSelected={setToCurrency}
              className="border rounded-md p-2"
            />
          </div>
          <button
            className="bg-accent text-white font-bold rounded-md p-2 w-full"
            onClick={handleClick}
          >
            Compare Rates
          </button>
        </div>

        <h1
          id="partners"
          className="mt-24 relative text-4xl font-semibold"
        >
          Our Partners
        </h1>
        <Marquee items={PARTNERS} />
      </div>
    </div>
  );
}
