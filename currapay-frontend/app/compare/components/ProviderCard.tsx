import {
  ArrowRightIcon,
  ClockIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { ProviderCardProps } from "../types";
import Image from "next/image";
import CurrapayShortLogoBlack from "@/public/logos/CurrapayShortLogoBlack.png";
import { useState } from "react";
import Link from "next/link";
import RecipientCard from "./RecipientCard";
import { PARTNER_NAMES_TO_LINKS,  PARTNER_NAMES_TO_IMAGES } from "@/app/constants";

// need to map provider to image path
// for each provider, need to get how many options they have
// get first option
// if numOptions > 1: show more options button
// for options 2 to numOptions: show options
// go to provider link: need provider website link

export default function ProviderCard(props: ProviderCardProps) {
  const optionsFirst = props.options[0];
  const optionsRest =
    props.options.length > 1 ? props.options.slice(1) : undefined;
  const [showTransferOptions, setShowTransferOptions] =
    useState(false);

  return (
    <div className="relative border bg-white pt-6 pb-20 lg:pb-28 px-6 md:px-8 rounded-lg shadow-md gap-4 flex flex-col justify-center">
      {/* smaller screens (no images, less details) */}
      <div className="block lg:hidden">
        <div className="flex flex-col gap-4">
          <div className="relative float-right w-1/2 h-24">
            <Image
              src={PARTNER_NAMES_TO_IMAGES[props.provider]}
              alt="provider logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className="border" />

          <div>
            <div className="font-normal text-secondary/80">
              <p>
                <span className="mb-2 font-semibold text-secondary">
                  Transfer time:{"  "}
                </span>
                <span>{optionsFirst.transferTime}</span>
              </p>
              <p>Payment method: {optionsFirst.method}</p>
            </div>
          </div>

          <div className="font-normal text-secondary/80">
            <p>
              <span className="mb-2 font-semibold text-secondary">
                Fee:{"  "}
              </span>
              <span>
                {optionsFirst.fee} {props.fromCurrency}
              </span>
            </p>
            <p>Exchange rate: {optionsFirst.exchangeRate}</p>
            {/* <p className="py-2">This is a good option</p> */}
          </div>

          <RecipientCard
            fromCurrency={props.fromCurrency}
            toCurrency={props.toCurrency}
            amount={props.amount}
            option={optionsFirst}
          />
        </div>

        {optionsRest && (
          <div className="py-4">
            <button
              className="absolute bottom-6 left-6 items-center inline-flex bg-accentDark hover:bg-accentDark/90 cursor-pointer text-white rounded-lg py-2 px-3"
              onClick={() =>
                setShowTransferOptions(!showTransferOptions)
              }
            >
              {showTransferOptions ? (
                <p className="inline-flex ">
                  Less options
                  <span className="flex items-center ml-1">
                    <ChevronUpIcon
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </span>
                </p>
              ) : (
                <p className="inline-flex">
                  More options
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
        )}

        {optionsRest && showTransferOptions && (
          <div className="bg-secondary/10 -mx-6 px-6 flex flex-col gap-4">
            <div className="border" />
            {optionsRest.map((option, i) => (
              <div key={i}>
                <div>
                  <div className="font-normal text-secondary/80">
                    <p>
                      <span className="mb-2 font-semibold text-secondary">
                        Transfer time:{"  "}
                      </span>
                      <span>{option.transferTime}</span>
                    </p>
                    <p>Payment method: {option.method} </p>
                  </div>
                </div>

                <div className="font-normal text-secondary/80">
                  <p>
                    <span className="mb-2 font-semibold text-secondary">
                      Fee:{"  "}
                    </span>
                    <span>
                      {option.fee} {props.fromCurrency}
                    </span>
                  </p>
                  <p>Exchange rate: {option.exchangeRate} %</p>
                  {/* <p className="py-2">This is a good option</p> */}
                </div>

                <RecipientCard
                  fromCurrency={props.fromCurrency}
                  toCurrency={props.toCurrency}
                  amount={props.amount}
                  option={optionsFirst}
                />
              </div>
            ))}
            <div className="border " />
          </div>
        )}
      </div>

      {/* larger screens */}
      <div className="hidden lg:block">
        <div className="rounded-lg gap-4 flex flex-row justify-between">
          <div className="relative mr-4 w-full h-32 self-center">
            <Image
              src={PARTNER_NAMES_TO_IMAGES[props.provider]}
              alt="provider logo"
              fill
              style={{ objectFit: "contain"}}
            />
          </div>
          <div className="relative w-full p-6 bg-white border border-secondary/10 rounded-lg shadow ">
            <ClockIcon className="w-8 h-8 text-secondary mb-3" />

            <h3 className="mb-4 font-semibold tracking-tight text-primary">
              Transfer time
            </h3>

            <div className="pb-12 space-y-2 font-normal">
              <p>{optionsFirst.transferTime}</p>
              <p className="font-semibold">Payment method: </p>
              <p className="-translate-y-2">{optionsFirst.method}</p>
            </div>

            {optionsRest && (
              <button
                className="flex text-left whitespace-nowrap items-center absolute text-sm sm:text-base 2xl:text-lg bottom-6 text-secondary hover:underline decoration-accent underline-offset-4"
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
                  <p className="inline-flex hover:text-accent">
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
            )}
          </div>

          <div className="relative w-full p-6 bg-white border border-secondary/10 rounded-lg shadow text-secondary ">
            <ArrowPathIcon className="w-8 h-8 text-secondary mb-3" />
            <h3 className="mb-4 font-semibold tracking-tight text-primary">
              Rates
            </h3>

            <div className="pb-12 space-y-2 font-normal">
              <p>
                <span className="font-semibold">Fee: </span>{" "}
                {optionsFirst.fee} {props.fromCurrency}
              </p>
              <p>
                <span className="font-semibold">Exchange rate:</span>{" "}
                {optionsFirst.exchangeRate}%
              </p>
            </div>
            {/* <p className="absolute text-sm sm:text-base 2xl:text-lg bottom-6 text-secondary">
              This is a good option
            </p> */}
          </div>

          <RecipientCard
            fromCurrency={props.fromCurrency}
            toCurrency={props.toCurrency}
            amount={props.amount}
            option={optionsFirst}
          />
        </div>

        {optionsRest && showTransferOptions && (
          <div className="mt-8 pb-8 bg-secondary/10 -mx-8 px-8">
            {optionsRest.map((option, i) => (
              <div key={i}>
                <hr className="h-px mb-8 bg-secondary/30 border-0" />

                <div className="rounded-lg gap-4 flex flex-row justify-center text-secondary">
                  <div className="relative w-full mr-4"></div>
                  <div className="relative w-full p-6 bg-white border border-secondary/10 rounded-lg shadow ">
                    <ClockIcon className="w-8 h-8 text-secondary mb-3" />

                    <h3 className="mb-4 font-semibold tracking-tight text-primary">
                      Transfer time
                    </h3>

                    <div className="pb-12 space-y-2 font-normal">
                      <p>{option.transferTime}</p>
                      <p className="font-semibold">
                        Payment method:{" "}
                      </p>
                      <p className="-translate-y-2">
                        {option.method}
                      </p>
                    </div>
                  </div>

                  <div className="relative w-full p-6 bg-white border border-secondary/10 rounded-lg shadow text-secondary ">
                    <ArrowPathIcon className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="mb-4 font-semibold tracking-tight text-primary">
                      Rates
                    </h3>

                    <div className="pb-12 space-y-2 font-normal">
                      <p>
                        <span className="font-semibold">Fee: </span>{" "}
                        {option.fee} {props.fromCurrency}
                      </p>
                      <p>
                        <span className="font-semibold">
                          Exchange rate:
                        </span>{" "}
                        {option.exchangeRate}%
                      </p>
                    </div>
                    {/* <p className="absolute text-sm sm:text-base 2xl:text-lg bottom-6 text-secondary">
                      This is a good option
                    </p> */}
                  </div>

                  <RecipientCard
                    fromCurrency={props.fromCurrency}
                    toCurrency={props.toCurrency}
                    amount={props.amount}
                    option={option}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 inline-flex bg-accent hover:bg-accent/75 text-white rounded-lg py-2 px-3"
        href={PARTNER_NAMES_TO_LINKS[props.provider]}
      >
        <p className="font-bold">Go to provider</p>

        <div className="flex items-center ml-2">
          <ArrowRightIcon className="h-6 w-6" />
        </div>
      </Link>
    </div>
  );
}
