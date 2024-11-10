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
      <div className="font-normal text-secondary/80 block lg:hidden">
        <div className="pb-4">
          <p>
            <span className="mb-2 font-semibold text-secondary">
              Recipient recieves:{"  "}
            </span>
            <span>
              {" "}
              {calculateAmount(
                props.amount,
                props.option.exchangeRate,
                props.option.fee
              )}{" "}
              {props.toCurrency}
            </span>
          </p>
          <p>Exchange rate: 0%</p>
        </div>

        {showRecieveDetails && (
          <div className="pb-12 font-normal">
            <p>math</p>
            <p>math</p>
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
                <ChevronUpIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          ) : (
            <p className="inline-flex hover:text-accent">
              Show more details
              <span className="flex items-center ml-1">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          )}
        </button>
      </div>

      {/* larger screens */}
      <div className="relative w-full p-6 bg-white border border-secondary/10 rounded-lg shadow hidden lg:block">
        <BanknotesIcon className="w-8 h-8 text-secondary mb-3" />
        <h3 className="mb-4 font-semibold tracking-tight text-primary">
          Recipient recieves
        </h3>
        <h1 className="pb-28 tracking-tight">
          {calculateAmount(
            props.amount,
            props.option.exchangeRate,
            props.option.fee
          )}{" "}
          {props.toCurrency}
        </h1>
        {showRecieveDetails && (
          <div className="pb-12 font-normal">
            <p>math</p>
            <p>math</p>
          </div>
        )}
        <button
          className="flex items-center absolute text-sm sm:text-base 2xl:text-lg bottom-6 text-secondary hover:text-accent hover:underline decoration-accent underline-offset-4"
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
            <p className="inline-flex">
              Show more details
              <span className="flex items-center ml-1">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
