"use client";
import {
  COUNTRY_CODES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
  PARTNERS,
} from "@/constants";
import DropdownSelect from "@/components/DropdownSelect";
import AccordionMenu from "@/components/Accordion";
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
    <section
      id="homepage"
    >
      <div className="flex flex-col gap-48">
        <div className="flex flex-col gap-8 items-center">
          <div className="px-8 space-y-4">
            <h1 className="text-center">Search. Send. Save.</h1>
            <p className="text-sm sm:text-2xl text-center">
              Search across banks, remittance apps, and crypto
              services to find the best way to send or recieve your
              international money transfer.
            </p>
          </div>
          <div className="border box-border p-8 shadow-xl rounded-xl w-[9/10] sm:w-full space-y-4 bg-white">
            <div
              id="filters"
              className="justify-center flex flex-row gap-4"
            >
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-accent"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-primary"
                >
                  Banks
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-accent"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-primary"
                >
                  Remittance Apps
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-accent"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-primary"
                >
                  Crypto
                </label>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <DropdownSelect
                  dropdownList={COUNTRY_CODES}
                  reference={COUNTRY_CODE_TO_NAME}
                  defaultValue={fromCountry}
                  setSelected={setFromCountry}
                  hasImage={true}
                  label={"COUNTRY FROM"}
                />
              </div>
              <div className="w-full sm:w-1/2">
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
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <p className=" whitespace-nowrap">I want to convert</p>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-primary shadow-sm border border-gray-300 sm:leading-6 focus:border-accent focus:ring-1 focus:ring-accent"
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
            <div className="flex pt-4 justify-center items-center">
              <button
                className="bg-accent text-white font-bold rounded-md p-4 w-full"
                onClick={handleClick}
              >
                Compare Rates {'\u26A1'}
              </button>
            </div>
          </div>
        </div>


        <div id="partners" className="text-center space-y-24">
          <h1>Our Partners</h1>
          <Marquee items={PARTNERS} />
        </div>

        <div id="faq" className="text-center">
          <h1>Frequently Asked Questions</h1>
          <div className="p-8">
          <AccordionMenu />

          </div>

        </div>
      </div>
    </section>
  );
}
