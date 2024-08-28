"use client";
import {
  COUNTRY_CODES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
  PARTNERS,
  FAQS,
} from "./constants";
import {
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/20/solid";
import DropdownSelect from "@/components/DropdownSelect";
import AccordionMenu from "@/components/Accordion";
import { Marquee } from "@/components/Marquee";
import Link from "next/link";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/provider";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import api from "@/utils/api";
import { trpc } from "@/utils/trpc";

const Homepage = observer(() => {
  const { SearchStore } = useStores();
  const [useBanks, setUseBanks] = useState(false);
  const [useRemittanceApps, setUseRemittanceApps] = useState(false);
  const [useCrypto, setUseCrypto] = useState(false);

  // const {
  //   data: transactions,
  //   error: transactionsError,
  //   isLoading: transactionsLoading,
  // } = trpc.transaction.getAllTransactions.useQuery();

  // if (transactionsError)
  //   return <p>Error loading data</p>;

  const handleClick = () => {
    console.log("fromCountry: ", SearchStore.fromCountry);
    console.log("toCountry: ", SearchStore.toCountry);
    console.log("fromCurrency: ", SearchStore.fromCurrency);
    console.log("toCurrency: ", SearchStore.toCurrency);
    console.log("amount: ", SearchStore.amount);
  };

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
    <section id="homepage">
      <div className="flex flex-col gap-48">
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="px-8 space-y-4">
            <p className="text-center bigHeading animatedGradientText">
              Search. Send. Save.
            </p>
            <p className="sm:text-xl md:text-2xl text-center">
              Search across banks, remittance apps, and crypto
              services to find the best way to send or recieve your
              international money transfer.
            </p>

            {/* <ul>
              {transactions?.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.amount} {transaction.currency}
                </li>
              ))}
            </ul> */}
          </div>
          <div className="border box-border p-8 shadow-xl rounded-xl w-full space-y-4 bg-white">
            <div
              id="filters"
              className="justify-center flex flex-row text-xs sm:text-base md:text-lg gap-4"
            >
              <div className="flex items-center mb-4">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0"
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
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0"
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
                  className="w-4 h-4 text-accent bg-gray-100 border-gray-300 rounded accent-accent focus:ring-0"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-primary"
                >
                  Crypto
                </label>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
              <div className="w-full sm:w-1/2">
                <DropdownSelect
                  dropdownList={COUNTRY_CODES}
                  reference={COUNTRY_CODE_TO_NAME}
                  defaultValue={SearchStore.fromCountry}
                  setSelected={SearchStore.setFromCountry}
                  hasImage={true}
                  label={"Country From"}
                />
              </div>
              <button
                className="flex text-secondary hover:text-accent"
                onClick={handleSwap}
              >
                <ArrowsUpDownIcon className="h-6 w-6 flex sm:hidden" />
                <ArrowsRightLeftIcon className="h-6 w-6 hidden sm:flex" />
              </button>
              <div className="w-full sm:w-1/2">
                <DropdownSelect
                  dropdownList={COUNTRY_CODES}
                  reference={COUNTRY_CODE_TO_NAME}
                  defaultValue={SearchStore.toCountry}
                  setSelected={SearchStore.setToCountry}
                  label={"Country to"}
                  hasImage={true}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <p className=" whitespace-nowrap">I want to convert</p>
              <input
                type="number"
                value={SearchStore.amount}
                onChange={(e) =>
                  SearchStore.setAmount(e.target.value)
                }
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
            </div>
            <div className="flex pt-4 justify-center items-center">
              <Link
                href={{
                  pathname: "/compare",
                  query: {
                    from: SearchStore.fromCurrency,
                    to: SearchStore.toCurrency,
                    amount: SearchStore.amount,
                  },
                }}
                className="text-white text-center font-bold rounded-md p-4 w-full 
                bg-accent/80 relative z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-accent before:to-accent
                before:transition-transform before:duration-500 before:-z-10 hover:before:translate-x-full"
                onClick={handleClick}
              >
                Compare Rates {" \u26A1"}
              </Link>
            </div>
          </div>
        </div>

        <div id="partners" className="text-center my-24 space-y-12">
          <p className="text-sm sm:text-2xl text-center">
            In partnership with
          </p>
          <Marquee items={PARTNERS} />
        </div>

        <div id="context" className="differentBackgroundColor bg-navy grid lg:grid-cols-2 gap-16 md:gap-24 lg:gap-48 text-white">
          <div className="space-y-8 md:space-y-16">
            <h1>Save money with CurraPay</h1>
            <p className="text-gray-100 text-xl md:text-3xl">
              We're on a mission to reduce the cost of sending money
              internationally. CurraPay was founded on a simple idea —
              that the international money transfer market needed
              greater transparency. 
              <p className="pt-4 md:pt-8 font-semibold">We're leveling the playing field.</p>
            </p>
          </div>

          <div className="grid grid-rows-3 gap-y-8 md:gap-y-16">
            <div className="border-l-8 pl-8 py-3 md:py-6 flex flex-col justify-center border-accentSecondary space-y-2">
            <p className="text-2xl sm:text-3xl md:text-5xl font-semibold whitespace-nowrap ">1 billion people</p>
              <p className="text-lg sm:text-2xl">send money abroad</p>
            </div>
            <div className="border-l-8 pl-8 py-3 md:py-6 flex flex-col justify-center border-accentSecondary/60 space-y-2">
            <p className="text-2xl sm:text-3xl md:text-5xl font-semibold whitespace-nowrap">$13 trillion</p>
              <p className="text-lg sm:text-2xl">sent every year</p>
            </div>
            <div className="border-l-8 pl-8 py-3 md:py-6 flex flex-col justify-center border-accentSecondary/40 space-y-2">
              <p className="text-2xl sm:text-3xl md:text-5xl font-semibold whitespace-nowrap">$280 billion</p>
              <p className="text-lg sm:text-2xl">lost each year due to transaction costs</p>
            </div>
          </div>
        </div>

        <div id="faq" className="h-screen mt-24 mb-48 text-center">
          <h1 className="">Frequently Asked Questions</h1>
          <div className="mt-24">
            <AccordionMenu itemList={FAQS} />
          </div>
          <p className="mt-24">
            Can&apos;t find the answer you&apos;re looking for? Feel
            free to{" "}
            <Link href="" className="link text-accent">
              contact us!
            </Link>
          </p>
        </div>
      </div>

      <ScrollToTopButton />
    </section>
  );
});

export default trpc.withTRPC(Homepage);
