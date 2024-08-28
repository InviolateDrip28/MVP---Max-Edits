import {
  BanknotesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

interface RecipientCardProps {
  fromCurrency: string;
  toCurrency: string;
}

export default function RecipientCard(props: RecipientCardProps) {
  const [showRecieveDetails, setShowRecieveDetails] = useState(false);

  return (
    <div
      className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
    >
      <BanknotesIcon className="w-8 h-8 text-secondary mb-3" />
      <p className="mb-2 pr-12 text-2xl font-semibold tracking-tight">
        Recipient recieves
      </p>
      <h1 className="pb-12 pr-12 mb-2 tracking-tight">
        500 {props.toCurrency}
      </h1>
      {showRecieveDetails && (
        <div className="pb-12 pr-12 font-normal text-gray-500">
          <p>math</p>
          <p>math</p>
        </div>
      )}
      <button
        className="flex items-center absolute text-sm bottom-6 text-secondary hover:underline underline-offset-4"
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
  );
}
