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
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";
import ProviderCard from "./components/ProviderCard";
import { Pagination } from "@/components/Pagination";
import { useState, useEffect } from "react";

const PROVIDER_DATA = [1, 2, 3, 4, 5, 6, 7];

const Compare = observer(() => {
  const { SearchStore } = useStores();
  const searchParams = useSearchParams();
  const numProviders = PROVIDER_DATA.length;
  const [cards, setCards] = useState(PROVIDER_DATA.slice(0, 5));
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setCards(PROVIDER_DATA.slice((current - 1) * 5, current * 5));
  }, [current]);

  const [from, to, amount] = [
    searchParams.get("from")!,
    searchParams.get("to")!,
    searchParams.get("amount")!,
  ];

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
    <section id="compare-rates" className="gap-8">
      <div
        id="search"
        className="border box-border p-6 shadow-xl rounded-xl w-full space-y-4 bg-white"
      >
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="min-w-52">
            <DropdownSelect
              dropdownList={COUNTRY_CODES}
              reference={COUNTRY_CODE_TO_NAME}
              defaultValue={SearchStore.fromCountry}
              setSelected={SearchStore.setFromCountry}
              hasImage={true}
            />
          </div>
          <button
            className="flex text-secondary hover:text-accent -mx-1"
            onClick={handleSwap}
          >
            <ArrowsRightLeftIcon className="h-6 w-6" />
          </button>
          <div className="min-w-52">
            <DropdownSelect
              dropdownList={COUNTRY_CODES}
              reference={COUNTRY_CODE_TO_NAME}
              defaultValue={SearchStore.toCountry}
              setSelected={SearchStore.setToCountry}
              hasImage={true}
            />
          </div>
          <div className="items-center inline-block -my-4 min-w-[1em] sm:min-w-0 sm:min-h-[1em] sm:w-2 self-stretch bg-secondary/30"></div>
          <p className="pt-4 sm:pt-0">Send</p>
          <input
            type="number"
            value={SearchStore.amount}
            onChange={(e) => SearchStore.setAmount(e.target.value)}
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-primary shadow-sm border border-gray-300 sm:leading-6 focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <DropdownSelect
            dropdownList={["US"]}
            reference={COUNTRY_CODE_TO_CURRENCY}
            defaultValue={SearchStore.fromCountry}
            setSelected={SearchStore.setFromCurrency}
            className="border rounded-md p-2"
          />
          <p>to</p>
          <DropdownSelect
            dropdownList={["US"]}
            reference={COUNTRY_CODE_TO_CURRENCY}
            defaultValue={SearchStore.toCountry}
            setSelected={SearchStore.setToCurrency}
            className="border rounded-md p-2"
          />
          <Link
            href={{
              pathname: "/compare",
              query: {
                from: SearchStore.fromCurrency,
                to: SearchStore.toCurrency,
                amount: SearchStore.amount,
              },
            }}
            className="text-white text-center font-bold rounded-md py-1.5 px-1 w-full 
                bg-accent/80 relative z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-accent before:to-accent
                before:transition-transform before:duration-500 before:-z-10 hover:before:translate-x-full"
            onClick={() => console.log("ajsdf")}
          >
            Go {" \u26A1"}
          </Link>
        </div>
      </div>

      <div className="text-secondary">
        Showing results from {numProviders} providers
      </div>
      <div id="providers" className="flex flex-col gap-4 w-full">
        {cards.map((i) => (
          <ProviderCard key={i} fromCurrency={from} toCurrency={to} />
        ))}
      </div>
      <Pagination
        onPageChange={setCurrent}
        totalCount={PROVIDER_DATA.length}
        pageSize={5}
        currentPage={current}
        className=""
      />
    </section>
  );
});

export default Compare;
