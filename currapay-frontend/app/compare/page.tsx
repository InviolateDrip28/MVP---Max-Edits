"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
// import { observer } from "mobx-react";
// import { useStores } from "@/stores/provider";
import {
  COUNTRY_NAMES,
  COUNTRY_NAME_TO_CODE,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
} from "../constants";
import {
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ProviderCard from "./components/ProviderCard";
import { Pagination } from "@/components/Pagination";
import { useState, useEffect } from "react";
import { Provider } from "./types";
import { trpc } from "@/utils/trpc";
import { Spinner } from "@/components/Spinner";
import { Tooltip } from "flowbite-react";
import { NumericFormat } from "react-number-format";
import Searchbox from "@/components/Searchbox";

type TData = Provider[];

// interface QueryResult<TData> {
//   data: Provider[] | undefined;
//   error: unknown;
//   isLoading: boolean;
// }

const Compare = () => {
  // const { SearchStore } = useStores();
  const searchParams = useSearchParams();

  const [amount, setAmount] = useState<string>(
    searchParams.get("amount")!
  );
  const [fromCountry, setFromCountry] = useState<string>(
    searchParams.get("fromCountry")!
  );
  const [toCountry, setToCountry] = useState<string>(
    searchParams.get("toCountry")!
  );

  const handleClick = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("amount", amount);
      localStorage.setItem("fromCountry", fromCountry);
      localStorage.setItem("toCountry", toCountry);
    }
  };

  const [
    _fromCurrency,
    _toCurrency,
    _amount,
    _fromCountry,
    _toCountry,
  ] = [
    searchParams.get("from")!,
    searchParams.get("to")!,
    searchParams.get("amount")!,
    searchParams.get("fromCountry")!,
    searchParams.get("toCountry")!,
  ];

  const { data, error, isLoading } =
    trpc.allRates.getRankedRates.useQuery<TData>({
      amount: Number(_amount),
      country: _fromCountry,
      sell: _fromCurrency,
      buy: _toCurrency,
      destinationCountry: _toCountry,
      fixed_currency: "sell",
    });

  const [numProviders, setNumProviders] = useState(0);
  const [cards, setCards] = useState<Provider[]>([]);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!isLoading && data) {
      setNumProviders(data.length);
      setCards(data.slice(0, 5));
    }
  }, [numProviders, data, isLoading]);

  useEffect(() => {
    if (data) {
      setCards(data.slice((current - 1) * 5, current * 5));
    }
  }, [current, data]);

  const handleSwap = () => {
    const from = fromCountry;
    const to = toCountry;
    setToCountry(from);
    setFromCountry(to);
  };

  return (
    <section
      id="compare-rates"
      className="flex items-center justify-start gap-8"
    >
      <div
        id="search"
        className="w-full flex border box-border p-6 xl:p-8 shadow-xl rounded-xl space-y-4 bg-white"
      >
        <div className="w-full flex flex-col md:flex-row md:items-end gap-4 justify-center ">
          <div className="w-full">
            <p className="text-secondary/80">Amount</p>
            <NumericFormat
              className="relative w-full text-base sm:text-lg xl:text-2xl min-w-20 md:min-w-36 cursor-default rounded-md bg-white py-2 md:py-2.5 px-3 text-left shadow-sm border border-secondary/30 sm:leading-6 focus:border-accent focus:ring-1 focus:ring-accent "
              thousandSeparator={","}
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value.replace(/,/g, ""))
              }
              allowNegative={false}
              decimalScale={2}
            />
          </div>

          <div className="w-full">
            <p className="text-secondary/80">From</p>
            <Searchbox
              optionsList={COUNTRY_NAMES}
              reference={COUNTRY_NAME_TO_CODE}
              reference2={COUNTRY_CODE_TO_CURRENCY}
              defaultValue={COUNTRY_CODE_TO_NAME[fromCountry]}
              setSelected={setFromCountry}
            />
          </div>
          <button
            className="flex md:h-full items-center justify-center text-secondary hover:text-accent -my-4 translate-y-3 md:my-0"
            onClick={handleSwap}
          >
            <ArrowsUpDownIcon className="h-6 w-6 flex md:hidden" />
            <ArrowsRightLeftIcon className="h-6 w-6 hidden md:flex" />
          </button>
          <div className="w-full">
            <p className="text-secondary/80">To</p>
            <Searchbox
              optionsList={COUNTRY_NAMES}
              reference={COUNTRY_NAME_TO_CODE}
              reference2={COUNTRY_CODE_TO_CURRENCY}
              defaultValue={COUNTRY_CODE_TO_NAME[toCountry]}
              setSelected={setToCountry}
            />
          </div>
          <Link
            href={{
              pathname: "/compare",
              query: {
                from: COUNTRY_CODE_TO_CURRENCY[fromCountry],
                to: COUNTRY_CODE_TO_CURRENCY[toCountry],
                amount: amount,
                fromCountry: fromCountry,
                toCountry: toCountry,
              },
            }}
            onClick={handleClick}
            className="text-white text-center font-bold rounded-md py-2 md:py-[9px] lg:py-[13px] xl:py-[11px] w-full md:min-w-24 md:max-w-32 h-min flex justify-center text-base sm:text-lg xl:text-2xl
                bg-accent/80 relative z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-accent before:to-accent
                before:transition-transform before:duration-500 before:-z-10 hover:before:translate-x-full mt-4 sm:mt-0"
          >
            Go {" \u26A1"}
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="w-full h-full text-secondary items-center justify-center inline-flex pt-10 pb-0 lg:pt-16 lg:pb-6 space-x-2">
          <Spinner />
          <h3 className="">Loading...</h3>
        </div>
      )}

      {error && (
        <h3 className="w-full h-full text-secondary text-center pt-10 pb-0 lg:pt-16 lg:pb-6">
          Error getting results, please try again.
        </h3>
      )}

      {numProviders === 0 && !isLoading && (
        <div className="w-full h-full text-secondary text-center pt-10 pb-0 lg:pt-16 lg:pb-6 space-y-12 md:space-y-16">
          <div className="space-y-4">
            <div className="flex justify-center">
              <ExclamationCircleIcon className="h-16 w-16 text-accent" />
            </div>
            <h3 className="font-semibold">No results</h3>

            <h4>
              Looks like we couldn&apos;t find any providers that send
              money from{" "}
              <span className="font-semibold">
                {COUNTRY_CODE_TO_NAME[_fromCountry]} ({_fromCountry})
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {COUNTRY_CODE_TO_NAME[toCountry]} ({toCountry})
              </span>
              .
            </h4>
          </div>
          <div className="flex justify-center">
            <Link
              className="bg-accent hover:bg-accent/75 text-white rounded-lg py-2 px-3 md:py-4 md:px-6 font-bold"
              href={"/"}
            >
              <h4>Let&apos;s try a new search!</h4>
            </Link>
          </div>
        </div>
      )}

      {numProviders > 0 && !isLoading && (
        <>
          <div className="pt-10 pb-0 lg:pt-16 lg:pb-6 space-y-4 text-secondary text-center">
            <h3 className="text-accent font-semibold">
              Showing results from {numProviders} providers
            </h3>
            <div className="whitespace-nowrap space-x-1.5 flex items-center ">
              <Tooltip
                content="CurraPay is supported by you. When you discover a provider through our links on our site, we may earn an affiliate commission."
                placement="bottom"
                className="max-w-xs md:max-w-md shadow-xl text-secondary whitespace-normal text-sm sm:text-base 2xl:text-lg tracking-wide px-6 py-4 border-secondary/30"
                style="light"
                theme={{
                  arrow: {
                    base: "absolute z-10 h-2 w-2 rotate-45 border-l border-t border-secondary/30",
                  },
                }}
              >
                <span className="underline underline-offset-4 flex items-center cursor-pointer">
                  <QuestionMarkCircleIcon className="h-4 w-4 md:h-6 md:w-6 mr-1" />
                  Advertiser disclosure
                </span>
              </Tooltip>

              <span>|</span>
              <span>Sorted by amount received</span>
            </div>
          </div>

          <div
            id="providers"
            className="flex flex-col gap-8 xl:gap-16 w-full"
          >
            {cards.map((provider, i) => (
              <ProviderCard
                key={i}
                provider={provider.source}
                fromCurrency={_fromCurrency}
                toCurrency={_toCurrency}
                amount={_amount}
                options={[{ rate: provider.rate }]}
              />
            ))}
          </div>
          <Pagination
            onPageChange={setCurrent}
            totalCount={numProviders}
            pageSize={5}
            currentPage={current}
          />
        </>
      )}
    </section>
  );
};

export default trpc.withTRPC(Compare);
