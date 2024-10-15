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
import GroupIcon from "@mui/icons-material/Groups";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DropdownSelect from "@/components/DropdownSelect";
import AccordionMenu from "@/components/Accordion";
import { Marquee } from "@/components/Marquee";
import Link from "next/link";
import { Suspense, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "@/stores/provider";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import CountUp from "react-countup";
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
        <div className="grid xl:grid-flow-col gap-8 items-center">
          <div className="space-y-4">
            <p className="text-center xl:text-left bigHeading animatedGradientText">
              Search.{" "}
              <span className="whitespace-nowrap">Send. Save.</span>
            </p>
            <p className="text-center xl:text-left xl:pt-8">
              Search across banks, remittance apps, and crypto
              services to find the best way to send or recieve your
              international money transfer.
            </p>
          </div>
          <div
            className="border p-8 shadow-xl rounded-xl w-full
          space-y-4 xl:space-y-8 bg-white"
          >
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
                  className="ms-2 text-primary whitespace-nowrap"
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
                className="relative w-full xl:w-24 cursor-default rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-primary shadow-sm border border-gray-300 sm:leading-6 focus:border-accent focus:ring-1 focus:ring-accent"
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

        <div
          id="partners"
          className="text-center mb-24 md:mb-36 space-y-12"
        >
          <h3 className="text-center">In partnership with</h3>
          <Marquee items={PARTNERS} />
        </div>

        <div
          id="context"
          className="differentBackgroundColor bg-navy flex flex-col lg:flex-row lg:grid-cols-2 gap-16 md:gap-24 lg:justify-between text-white"
        >
          <div className="space-y-8 md:space-y-16">
            <h1>Save money with CurraPay</h1>
            <div>
              <h3 className="font-semibold text-accentSecondary">
                We&apos;re leveling the playing field.
              </h3>
              <h3 className="pt-4 md:pt-8 text-gray-100">
                We&apos;re on a mission to reduce the cost of sending
                money internationally. CurraPay was founded on a
                simple idea — that the international money transfer
                market needed greater transparency.
              </h3>
            </div>
          </div>

          <div className="grid grid-rows-3 gap-y-8 md:gap-y-12 2xl:gap-y-16 ">
            <div className="border-l-8 pl-8 py-2 lg:py-0 2xl:py-6 grid grid-flow-col justify-start items-center border-accentSecondary gap-6 md:gap-8">
              <div className="h-16 w-16 md:h-20 md:w-20">
                <GroupIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="whitespace-nowrap">
                  1 billion people
                </h2>
                <h3>send money abroad</h3>
              </div>
            </div>
            <div className="border-l-8 pl-8 py-2 lg:py-0 2xl:py-6 grid grid-flow-col justify-start items-center border-accentSecondary/75 gap-6 md:gap-8">
              <div className="h-16 w-16 md:h-20 md:w-20">
                <SendIcon style={{ width: "100%", height: "100%" }} />
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="whitespace-nowrap">
                  <CountUp
                    start={0}
                    end={13}
                    prefix="$"
                    suffix=" trillion"
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </h2>
                <h3>sent every year</h3>
              </div>
            </div>
            <div className="border-l-8 pl-8 py-2 lg:py-0 2xl:py-6 grid grid-flow-col justify-start items-center border-accentSecondary/50 gap-6 md:gap-8">
              <div className="h-16 w-16 md:h-20 md:w-20">
                <RemoveCircleIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="whitespace-nowrap">
                  <CountUp
                    start={0}
                    end={280}
                    prefix="$"
                    suffix=" billion"
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </h2>
                <h3>lost each year due to transaction costs</h3>
              </div>
            </div>
          </div>
        </div>

        <div
          id="faq"
          className="min-h-screen mt-24 mb-48 text-center"
        >
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
