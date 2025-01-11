import {
  BanknotesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { RecipientCardProps } from "../types";

import { PARTNER_NAMES_TO_DETAILS } from "@/app/constants";

export default function RecipientCard(props: RecipientCardProps) {
  const [showRecieveDetails, setShowRecieveDetails] = useState(false);
  const total = (
    (parseFloat(props.amount) - Number(PARTNER_NAMES_TO_DETAILS[props.provider].fees)) *
    props.option.rate
  )
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div className="w-full h-full">
      {/* smaller screens */}
      <div className="font-normal text-secondary/80 block lg-xl:hidden">
        <div>
          <p>
            <span className="mb-2 font-semibold text-primary">
              Recipient recieves:{"  "}
            </span>
            <span>
              {" "}
              {total} {props.toCurrency}
            </span>
          </p>
        </div>

        {showRecieveDetails && (
          <div className="text-secondary/75 font-normal mb-4 ">
            <p className="flex whitespace-nowrap">
              <span className="text-left">You pay</span>
              <span className="border-b border-dashed border-secondary/70 -translate-y-2 w-full mx-1"></span>
              <span className="text-right font-semibold">{props.amount}</span>
            </p>
            <p className="flex whitespace-nowrap">
              <span>- Fee</span>
              <span className="border-b border-dashed border-secondary/70 -translate-y-2 w-full mx-1"></span>
              <span className="text-right font-semibold">
                {PARTNER_NAMES_TO_DETAILS[props.provider].fees}
              </span>
            </p>
            <p className="flex whitespace-nowrap">
              <span>&times; Exchange rate</span>
              <span className="border-b border-dashed border-secondary/70 -translate-y-2 w-full mx-1"></span>
              <span className="text-right font-semibold">
                {props.option.rate}
              </span>
            </p>
            <div className="border border-secondary/80 my-2" />
            <p className="text-right">{total}</p>
          </div>
        )}
        <button
          className="flex items-center hover:underline decoration-accent underline-offset-4 pb-4 hover:text-accent"
          onClick={() => setShowRecieveDetails(!showRecieveDetails)}
        >
          {showRecieveDetails ? (
            <p className="inline-flex text-accent">
              Hide
              <span className="flex items-center ml-1">
                <ChevronUpIcon aria-hidden="true" className="h-4 w-4" />
              </span>
            </p>
          ) : (
            <p className="inline-flex hover:text-accent">
              More details
              <span className="flex items-center ml-1">
                <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
              </span>
            </p>
          )}
        </button>
      </div>

      {/* larger screens */}
      <div className="relative w-full lg-xl:p-4 xl:p-6 bg-white border border-secondary/10 rounded-lg shadow hidden lg-xl:block">
        <BanknotesIcon className="w-8 h-8 text-secondary mb-3 fill-accentDark" />
        <h4 className="mb-4 font-semibold tracking-tight text-primary pr-3">
          Recipient recieves
        </h4>
        <h3 className="pb-24 font-semibold text-accent tracking-tight">
          {total} {props.toCurrency}
        </h3>

        {showRecieveDetails && (
          <div className="text-secondary/75 font-normal mb-4 -translate-y-10">
            <p className="flex whitespace-nowrap">
              <span className="text-left">You pay</span>
              <span className="border-b border-dashed border-secondary/70 -translate-y-2 w-full mx-1"></span>
              <span className="text-right font-semibold">{props.amount}</span>
            </p>
            <p className="flex whitespace-nowrap">
              <span>- Fee</span>
              <span className="border-b border-dashed border-secondary/70 -translate-y-2 w-full mx-1"></span>
              <span className="text-right font-semibold">
                {PARTNER_NAMES_TO_DETAILS[props.provider].fees}
              </span>
            </p>
            <p className="flex whitespace-nowrap">
              <span>&times; Exchange rate</span>
              <span className="border-b border-dashed border-secondary/70 -translate-y-2 w-full mx-1"></span>
              <span className="text-right font-semibold">
                {props.option.rate}
              </span>
            </p>
            <div className="border border-secondary/80 my-2" />
            <p className="text-right">{total}</p>
          </div>
        )}

        <button
          className="flex text-left whitespace-nowrap items-center absolute text-sm sm:text-base 2xl:text-lg bottom-6 text-secondary hover:text-accent hover:underline decoration-accent underline-offset-4"
          onClick={() => setShowRecieveDetails(!showRecieveDetails)}
        >
          {showRecieveDetails ? (
            <p className="inline-flex text-accent">
              Hide
              <span className="flex items-center ml-1">
                <ChevronUpIcon aria-hidden="true" className="h-4 w-4" />
              </span>
            </p>
          ) : (
            <p className="inline-flex text-left">
              More details
              <span className="flex items-center ml-1">
                <ChevronDownIcon aria-hidden="true" className="h-4 w-4" />
              </span>
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
