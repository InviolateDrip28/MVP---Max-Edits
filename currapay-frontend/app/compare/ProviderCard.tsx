import {
  ArrowRightIcon,
  ClockIcon,
  BanknotesIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import CurrapayShortLogoBlack from "@/public/CurrapayShortLogoBlack.png";
import { useState } from "react";
import Link from "next/link";
import RecipientCard from "./RecipientCard";

interface ProviderCardProps {
  fromCurrency: string;
  toCurrency: string;
}

export default function ProviderCard(props: ProviderCardProps) {
  const [showTransferOptions, setShowTransferOptions] =
    useState(false);

  return (
    <div className="relative border bg-white pt-6 pb-12 px-6 rounded-lg shadow-md gap-4 flex flex-col justify-center">
      <div className="rounded-lg gap-4 flex flex-row justify-center">
        <div className="relative w-40 -ml-2">
          <Image
            src={CurrapayShortLogoBlack}
            alt="provider logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <ClockIcon className="w-8 h-8 text-secondary mb-3" />

          <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Transfer time
          </p>

          <div className="pb-12 pr-12 font-normal text-gray-500 dark:text-gray-400">
            <p>1-3 days</p>
            <p>Payment method: debit card</p>
          </div>
          <button
            className="flex items-center absolute text-sm bottom-6 text-secondary hover:underline underline-offset-4"
            onClick={() =>
              setShowTransferOptions(!showTransferOptions)
            }
          >
            {showTransferOptions ? (
              <p className="inline-flex text-accent">
                Less payment options
                <span className="flex items-center ml-1">
                  <ChevronUpIcon
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </span>
              </p>
            ) : (
              <p className="inline-flex">
                More payment options
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

        <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <ArrowPathIcon className="w-8 h-8 text-secondary mb-3" />

          <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Rates
          </p>

          <div className="pb-12 pr-12 font-normal text-gray-500 dark:text-gray-400">
            <p>Fee: 1 {props.fromCurrency}</p>
            <p>Exchange rate: 0%</p>
          </div>
          <p className="absolute text-sm bottom-6 text-secondary">
            This is a good option
          </p>
        </div>

        <RecipientCard
          fromCurrency={props.fromCurrency}
          toCurrency={props.toCurrency}
        />
      </div>

      {showTransferOptions && (
        <div className="mt-4 pb-8 rounded-md bg-secondary/10">
          <hr className="h-px mb-8 bg-secondary/30 border-0" /> 

          <div className=" rounded-lg gap-4 flex flex-row justify-center">
            <div className="relative w-40 -ml-2"></div>
            <div className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <ClockIcon className="w-8 h-8 text-secondary mb-3" />

              <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Transfer time
              </p>

              <div className="pb-12 pr-12 font-normal text-gray-500 dark:text-gray-400">
                <p>1-3 days</p>
                <p>Payment method: debit card</p>
              </div>
            </div>

            <div className="relative max-w-sm p-6 bg-white  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <ArrowPathIcon className="w-8 h-8 text-secondary mb-3" />

              <p className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Rates
              </p>

              <div className="pb-12 pr-12 font-normal text-gray-500 dark:text-gray-400">
                <p>Fee: 1 {props.fromCurrency}</p>
                <p>Exchange rate: 0%</p>
              </div>
              <p className="absolute text-sm bottom-6 text-secondary">
                This is a good option
              </p>
            </div>

            <RecipientCard
              fromCurrency={props.fromCurrency}
              toCurrency={props.toCurrency}
            />
          </div>
        </div>
      )}

      <Link
        className="absolute bottom-4 right-10 inline-flex text-base text-secondary hover:text-accent hover:underline underline-offset-4"
        href=""
      >
        Go to provider
        <div className="flex items-center ml-1">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
}
