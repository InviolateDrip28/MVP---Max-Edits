import {
  BanknotesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { RecipientCardProps } from "../types";

export default function RecipientCard(props: RecipientCardProps) {
  const [showRecieveDetails, setShowRecieveDetails] = useState(false);

  function calculateAmount(
    amount: string,
    rate: number,
    fee: number
  ): string {
    return (parseFloat(amount) * rate - fee).toFixed(2).toString();
  }

  return (
    <div className="w-full h-full">
      {/* smaller screens */}
      <div className="font-normal text-secondary/80 block lg-xl:hidden">
        <div>
          <p>
            <span className="mb-2 font-semibold text-secondary">
              Recipient recieves:{"  "}
            </span>
            <span>
              {" "}
              {calculateAmount(
                props.amount,
                props.option.rate,
                // props.option.fee
                1
              )}{" "}
              {props.toCurrency}
            </span>
          </p>
        </div>

        {/* {showRecieveDetails && (
          <div className="pb-6 font-normal">
            <p>math</p>
            <p>math</p>
          </div>
        )} */}
        {/* <button
          className="flex items-center hover:underline decoration-accent underline-offset-4 pb-4 hover:text-accent"
          onClick={() => setShowRecieveDetails(!showRecieveDetails)}
        >
          {showRecieveDetails ? (
            <p className="inline-flex text-accent">
              Hide
              <span className="flex items-center ml-1">
                <ChevronUpIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          ) : (
            <p className="inline-flex hover:text-accent">
              More details
              <span className="flex items-center ml-1">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          )}
        </button> */}
      </div>

      {/* larger screens */}
      <div className="relative w-full lg-xl:p-4 xl:p-6 bg-white border border-secondary/10 rounded-lg shadow hidden lg-xl:block">
        <BanknotesIcon className="w-8 h-8 text-secondary mb-3" />
        <h4 className="mb-4 font-semibold tracking-tight text-primary pr-3">
          Recipient recieves
        </h4>
        <h3 className="pb-24 font-semibold text-accent tracking-tight">
          {calculateAmount(
            props.amount,
            props.option.rate,
            // props.option.fee
            1
          )}{" "}
          {props.toCurrency}
        </h3>
        {/* {showRecieveDetails && (
          <div className="pb-12 font-normal">
            <p>math</p>
            <p>math</p>
          </div>
        )} */}
        {/* <button
          className="flex text-left whitespace-nowrap items-center absolute text-sm sm:text-base 2xl:text-lg bottom-6 text-secondary hover:text-accent hover:underline decoration-accent underline-offset-4"
          onClick={() => setShowRecieveDetails(!showRecieveDetails)}
        >
          {showRecieveDetails ? (
            <p className="inline-flex text-accent">
              Hide
              <span className="flex items-center ml-1">
                <ChevronUpIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          ) : (
            <p className="inline-flex text-left">
              More details
              <span className="flex items-center ml-1">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          )}
        </button> */}
      </div>
    </div>
  );
}
