"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { observer } from "mobx-react";
import { useStores } from "@/stores/provider";
import DropdownSelect from "@/components/DropdownSelect";
import {
  COUNTRY_CODES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
} from "../constants";
import {
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import ProviderCard from "./components/ProviderCard";
import { Pagination } from "@/components/Pagination";
import { useState, useEffect } from "react";
import { Provider } from "./types";
import { trpc } from "@/utils/trpc";
import { Spinner } from "@/components/Spinner";
import { Tooltip } from "flowbite-react";

type TData = Provider[];
interface QueryResult<TData> {
  data: Provider[] | undefined;
  error: unknown;
  isLoading: boolean;
}

const Compare = observer(() => {
  const { SearchStore } = useStores();
  const searchParams = useSearchParams();

  const [from, to, amount, fromCountry, toCountry] = [
    searchParams.get("from")!,
    searchParams.get("to")!,
    searchParams.get("amount")!,
    searchParams.get("fromCountry")!,
    searchParams.get("toCountry")!,
  ];

  const { data, error, isLoading } =
    trpc.allRates.getRankedRates.useQuery<TData>({
      amount: Number(amount),
      country: fromCountry,
      sell: from,
      buy: to,
      destinationCountry: toCountry,
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
    const fromCountry = SearchStore.fromCountry;
    const toCountry = SearchStore.toCountry;
    const fromCurrency = SearchStore.fromCurrency;
    const toCurrency = SearchStore.toCurrency;
    SearchStore.setFromCountry(toCountry);
    SearchStore.setToCountry(fromCountry);
    SearchStore.setFromCurrency(toCurrency);
    SearchStore.setToCurrency(fromCurrency);
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
        <div className="w-full flex flex-col lg:flex-row gap-4 justify-center">
          <div className="w-auto xl:w-max flex flex-col md:flex-row gap-3 lg:gap-2 xl:gap-3 items-center justify-center">
            <div className="w-full xl:min-w-52">
              <DropdownSelect
                dropdownList={COUNTRY_CODES}
                reference={COUNTRY_CODE_TO_NAME}
                defaultValue={SearchStore.fromCountry}
                setSelected={SearchStore.setFromCountry}
                textStyles={
                  "xl:text-2xl xl:min-w-[14ch] xl:max-w-[16ch] 2xl:min-w-[16ch] 2xl:max-w-[50ch]"
                }
                hasImage={true}
              />
            </div>
            <button
              className="flex text-secondary hover:text-accent"
              onClick={handleSwap}
            >
              <ArrowsUpDownIcon className="h-6 w-6 flex md:hidden" />
              <ArrowsRightLeftIcon className="h-6 w-6 hidden md:flex" />
            </button>
            <div className="w-full xl:min-w-52">
              <DropdownSelect
                dropdownList={COUNTRY_CODES}
                reference={COUNTRY_CODE_TO_NAME}
                defaultValue={SearchStore.toCountry}
                setSelected={SearchStore.setToCountry}
                textStyles={
                  "xl:text-2xl xl:min-w-[14ch] xl:max-w-[16ch] 2xl:min-w-[16ch] 2xl:max-w-[50ch]"
                }
                hasImage={true}
              />
            </div>
          </div>

          <div className="hidden lg:inline-block items-center -my-4 min-h-[1em] min-w-[1px] w-[1px] self-stretch bg-secondary/30"></div>

          <div className="block lg:hidden my-2 sm:my-4 border-t w-full border-secondary/30"></div>

          <div className="inline-flex flex-col sm:flex-row items-center sm:space-x-3">
            <div className="w-full inline-flex items-center space-x-2 sm:space-x-3">
              <input
                type="number"
                value={SearchStore.amount}
                onChange={(e) =>
                  SearchStore.setAmount(e.target.value)
                }
                className="relative w-full text-base sm:text-lg xl:text-2xl min-w-20 lg:min-w-36 cursor-default rounded-md bg-white py-2 px-3 text-left shadow-sm border border-secondary/30 sm:leading-6 focus:border-accent focus:ring-1 focus:ring-accent "
              />
              <DropdownSelect
                reference={COUNTRY_CODE_TO_CURRENCY}
                defaultValue={SearchStore.fromCountry}
                setSelected={SearchStore.setFromCurrency}
                textStyles={"xl:text-2xl"}
                className="border rounded-md p-2"
              />
              <p className="xl:text-2xl">to</p>
              <DropdownSelect
                reference={COUNTRY_CODE_TO_CURRENCY}
                defaultValue={SearchStore.toCountry}
                setSelected={SearchStore.setToCurrency}
                textStyles={"xl:text-2xl"}
                className="border rounded-md p-2"
              />
            </div>
            <Link
              href={{
                pathname: "/compare",
                query: {
                  from: SearchStore.fromCurrency,
                  to: SearchStore.toCurrency,
                  amount: SearchStore.amount,
                  fromCountry: SearchStore.fromCountry,
                  toCountry: SearchStore.toCountry,
                },
              }}
              className="text-white text-center font-bold rounded-md py-2 sm:py-1.5 xl:py-2 w-full sm:min-w-24 sm:max-w-32 text-base sm:text-lg xl:text-2xl
                bg-accent/80 relative z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-accent before:to-accent
                before:transition-transform before:duration-500 before:-z-10 hover:before:translate-x-full mt-4 sm:mt-0"
            >
              Go {" \u26A1"}
            </Link>
          </div>
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

      {numProviders > 0 && (
        <>
          <div className="pt-10 pb-0 lg:pt-16 lg:pb-6 space-y-4 text-secondary text-center">
            <h3 className="text-accent font-semibold">Showing results from {numProviders} providers</h3>
            <p className="whitespace-nowrap space-x-1.5 flex items-center ">
              <Tooltip
                content="CurraPay is supported by you. When you discover a provider through our links on our site, we may earn an affiliate commission."
                placement="bottom"
                className="max-w-md shadow-2xl text-secondary whitespace-normal text-sm sm:text-base 2xl:text-lg tracking-wide px-6 py-4 border-secondary/30"
                style="light"
                theme={{arrow: {base: "absolute z-10 h-2 w-2 rotate-45 border-l border-t border-secondary/30"}}}
              >
                <span className="underline underline-offset-4 flex items-center cursor-pointer">
                  <QuestionMarkCircleIcon className="h-4 w-4 md:h-6 md:w-6 mr-1" />
                  Advertiser disclosure
                </span>
              </Tooltip>

              <span>|</span>
              <span>Sorted by amount received</span>
            </p>
          </div>

          <div
            id="providers"
            className="flex flex-col gap-8 xl:gap-16 w-full"
          >
            {cards.map((provider, i) => (
              <ProviderCard
                key={i}
                provider={provider.source}
                fromCurrency={from}
                toCurrency={to}
                amount={amount}
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
});

export default trpc.withTRPC(Compare);
