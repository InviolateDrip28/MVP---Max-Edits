"use client";
import {
  COUNTRY_NAMES,
  COUNTRY_CODE_TO_NAME,
  COUNTRY_CODE_TO_CURRENCY,
  PARTNERS,
  FAQS,
  COUNTRY_NAME_TO_CODE,
} from "./constants";
import {
  ArrowsUpDownIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  HomeIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/20/solid";
import GroupIcon from "@mui/icons-material/Groups";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AccordionMenu from "@/components/Accordion";
import { Marquee } from "@/components/Marquee";
import Link from "next/link";
import { useState } from "react";
import { observer } from "mobx-react";
import { useSearchStore } from "@/stores/provider";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import CountUp from "react-countup";
import RatesTable from "@/components/Table";
import { NumericFormat } from "react-number-format";
import Searchbox from "@/components/Searchbox";

const Homepage = observer(() => {
  const searchStore = useSearchStore();
  const [useBanks, setUseBanks] = useState(false);
  const [useRemittanceApps, setUseRemittanceApps] = useState(false);
  const [useCrypto, setUseCrypto] = useState(false);

  const handleSwap = () => {
    const from = searchStore.fromCountry;
    const to = searchStore.toCountry;
    searchStore.setFromCountry(to);
    searchStore.setToCountry(from);
  };

  return (
    <div id="homepage" className="homepage">
      <div className="subsection grid xl:grid-flow-col xl:grid-cols-2 gap-16 xl:gap-20 items-center justify-center">
        <div className="space-y-4">
          <p className="text-center xl:text-left xl:leading-tight bigHeading animatedGradientText">
            Search. Send. Save.
          </p>

          <h4 className="text-center xl:text-left xl:pt-8">
            Search across banks, remittance apps, and crypto services
            to find the best way to send or receive your international
            money transfer.
          </h4>
        </div>

        <div
          className="border border-secondary/30 p-8 shadow-xl rounded-xl w-full
          space-y-4 xl:space-y-6 bg-white"
        >
          <div
            id="filters"
            className="justify-center flex flex-row text-xs sm:text-base lg:text-lg 2xl:text-xl gap-2"
          >
            <div className="flex items-center mb-4 ">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-accent bg-secondary/10 border-secondary/30 rounded accent-accent focus:ring-0"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-1 md:ms-2"
              >
                Banks
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-accent bg-secondary/10 border-secondary/30 rounded accent-accent focus:ring-0"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-1 md:ms-2 whitespace-nowrap"
              >
                Remittance Apps
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-accent bg-secondary/10 border-secondary/30 rounded accent-accent focus:ring-0"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-1 md:ms-2"
              >
                Crypto
              </label>
            </div>
          </div>

          <h3 className="font-semibold text-center text-accent">
            I want to send
          </h3>

          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
              <div className="w-full">
                <p className="text-secondary/80">Amount</p>
                <NumericFormat
                  className="relative w-full xl:min-w-28 text-base sm:text-lg lg:text-xl 2xl:text-2xl tracking-wide cursor-default rounded-md bg-white py-2 lg:py-3 px-3 text-left shadow-sm border border-secondary/30 sm:leading-6 focus:border-accent focus:ring-1 focus:ring-accent"
                  thousandSeparator={","}
                  value={searchStore.amount}
                  onChange={(e) =>
                    searchStore.setAmount(
                      e.target.value.replace(/,/g, "")
                    )
                  }
                  allowNegative={false}
                  decimalScale={2}
                  maxLength={9}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <div className="w-full">
              <p className="text-secondary/80">From</p>
              <Searchbox
                optionsList={COUNTRY_NAMES}
                reference={COUNTRY_NAME_TO_CODE}
                reference2={COUNTRY_CODE_TO_CURRENCY}
                defaultValue={
                  COUNTRY_CODE_TO_NAME[searchStore.fromCountry]
                }
                setSelected={searchStore.setFromCountry}
              />
            </div>
            <button
              className="flex translate-y-3 text-secondary hover:text-accent"
              onClick={handleSwap}
            >
              <ArrowsUpDownIcon className="h-6 w-6 flex" />
              {/* <ArrowsRightLeftIcon className="h-6 w-6 hidden lg:flex" /> */}
            </button>

            <div className="w-full">
              <p className="text-secondary/80">To</p>
              <Searchbox
                optionsList={COUNTRY_NAMES}
                reference={COUNTRY_NAME_TO_CODE}
                reference2={COUNTRY_CODE_TO_CURRENCY}
                defaultValue={
                  COUNTRY_CODE_TO_NAME[searchStore.toCountry]
                }
                setSelected={searchStore.setToCountry}
              />
            </div>
          </div>

          <h3 className="flex pt-4 justify-center items-center">
            <Link
              href={{
                pathname: "/compare",
                query: {
                  from: COUNTRY_CODE_TO_CURRENCY[
                    searchStore.fromCountry
                  ],
                  to: COUNTRY_CODE_TO_CURRENCY[searchStore.toCountry],
                  amount: searchStore.amount,
                  fromCountry: searchStore.fromCountry,
                  toCountry: searchStore.toCountry,
                },
              }}
              // onClick={handleClick}
              className="text-white text-center font-bold rounded-md p-4 w-full 
                bg-accent/80 relative z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-accent before:to-accent
                before:transition-transform before:duration-500 before:-z-10 hover:before:translate-x-full"
            >
              Compare Rates {" \u26A1"}
            </Link>
          </h3>
        </div>
      </div>

      <div id="partners" className="text-center mb-12 space-y-12">
        <h1 className="text-center">Our Partners</h1>
        <h3>
          We work with industry leading financial institutions to
          provide you with the best rates
        </h3>
        <Marquee items={PARTNERS} />
      </div>

      <div
        id="how-it-works"
        className="differentBackgroundColor bg-secondary/10 space-y-12 lg:space-y-24"
      >
        <h1 className="text-accent text-center">
          How CurraPay Works
        </h1>

        <div className="relative overflow-hidden w-full">
          <div className="mt-2 overflow-hidden">
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                  <svg
                    className="w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    width="875"
                    height="48"
                    viewBox="0 0 875 48"
                    fill="none"
                  >
                    <path
                      d="M2 29C20.2154 33.6961 38.9915 35.1324 57.6111 37.5555C80.2065 40.496 102.791 43.3231 125.556 44.5555C163.184 46.5927 201.26 45 238.944 45C312.75 45 385.368 30.7371 458.278 20.6666C495.231 15.5627 532.399 11.6429 569.278 6.11109C589.515 3.07551 609.767 2.09927 630.222 1.99998C655.606 1.87676 681.208 1.11809 706.556 2.44442C739.552 4.17096 772.539 6.75565 805.222 11.5C828 14.8064 850.34 20.2233 873 24"
                      stroke="black"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-dasharray="1 12"
                    />
                  </svg>
                </div>
                <div className="relative grid grid-cols-1 text-center gap-y-8 sm:gap-y-10 md:gap-y-12 md:grid-cols-3 gap-x-36">
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                      <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        1
                      </span>
                    </div>
                    <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                      Search for the Country You Want to Send To
                    </h3>
                    <p className="mt-3 sm:mt-4">
                      Simply select the country you want to send money
                      to, and then enter the amount you wish to send.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                      <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        2
                      </span>
                    </div>
                    <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                      Compare Your Trusted Providers
                    </h3>
                    <p className="mt-3 sm:mt-4 ">
                      Just like finding the best hotel on Booking.com
                      or Kayak, our unique comparison engine shows you
                      the fastest and cheapest providers to send your
                      money through.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                      <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                        3
                      </span>
                    </div>
                    <h3 className="mt-4 sm:mt-6 text-xl font-semibold leading-tight text-gray-900 dark:text-white md:mt-10">
                      Choose, Send, Then Save!
                    </h3>
                    <p className="mt-3 sm:mt-4">
                      Find your trusted provider, then send your
                      money. You&apos;ll know that you secured the
                      best possible value for you and your recipient.
                      CurraPay is all about getting you more “bang for
                      your buck”!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-row lg:grid-flow-col gap-16">
          <div className="space-y-4">
            <div className="lg:h-1/2 space-y-4">
              <MagnifyingGlassIcon className="h-12 w-12 text-accent" />
              <h2>STEP 1</h2>
              <h4>Search for the Country You Want to Send To</h4>
            </div>
            <div className="pt-6 border-b border-secondary/30" />
            <p className="lg:pt-4">
              Simply select the country you want to send money to, and
              then enter the amount you wish to send.
            </p>
          </div>
          <div className="space-y-4">
            <div className="lg:h-1/2 space-y-4">
              <ChartBarIcon className="h-12 w-12 text-accent" />
              <h2>STEP 2</h2>
              <h4>Compare Your Trusted Providers</h4>
            </div>
            <div className="pt-6 border-b border-secondary/30" />
            <p className="lg:pt-4">
              Just like finding the best hotel on Booking.com or
              Kayak, our unique comparison engine shows you the
              fastest and cheapest providers to send your money
              through.
            </p>
          </div>
          <div className="space-y-4">
            <div className="lg:h-1/2 space-y-4">
              <CursorArrowRaysIcon className="h-12 w-12 text-accent" />
              <h2>STEP 3</h2>
              <h4>Choose, Send, Then Save!</h4>
            </div>
            <div className="pt-6 border-b border-secondary/30" />
            <p className="lg:pt-4">
              Find your trusted provider, then send your money.
              You&apos;ll know that you secured the best possible
              value for you and your recipient. CurraPay is all about
              getting you more “bang for your buck”!
            </p>
          </div>
        </div>
      </div>

      <div
        id="who-we-help"
        className="subsection flex flex-col py-4 lg:py-12 space-y-16"
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1>Who We&apos;re Helping</h1>
            <h3>
              We understand the importance of sending money quickly
              and affordably, especially internationally. That&apos;s
              why we&apos;re dedicated to empowering both those
              sending and receiving money. We help you find the best
              options to ensure your money gets there efficiently and
              at the lowest cost.
            </h3>
          </div>
          <div className="flex w-full justify-center ">
            <img
              className="rounded-md shadow-lg object-cover"
              src="/home_page.jpg"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="bg-white border border-secondary/30 rounded-xl py-8 px-6 space-y-3 lg:space-y-8">
            <div className="lg:h-1/3 space-y-1">
              <HomeIcon className="text-accent h-8 w-8" />
              <h4 className="font-semibold">Immigrants</h4>
            </div>

            <p className="pt-4">
              Just settled into a new country? We have you covered!
              Send money home quickly and cheaply to friends, family,
              and loved ones.
            </p>
          </div>
          <div className="bg-white border border-secondary/30 rounded-xl py-8 px-6 space-y-3 lg:space-y-8">
            <div className="lg:h-1/3 space-y-1">
              <BuildingOffice2Icon className="text-accent h-8 w-8" />
              <h4 className="font-semibold">Expats</h4>
            </div>

            <p className="pt-4">
              Relocated to a new country for work? Find the best ways
              to send money easily to cover housing costs or other
              expenses during your move.
            </p>
          </div>
          <div className="bg-white border border-secondary/30 rounded-xl py-8 px-6 space-y-3 lg:space-y-8">
            <div className="lg:h-1/3 space-y-1">
              <BookOpenIcon className="text-accent h-8 w-8" />
              <h4 className="font-semibold">
                {" "}
                Study-Abroad & International Students
              </h4>
            </div>
            <p className="pt-4">
              Sending tuition or funding your study abroad? Compare
              options with us and save on fees. We understand the
              importance of every dollar &mdash; we&apos;ve been there
              too!
            </p>
          </div>
        </div>
      </div>

      <div
        id="context"
        className="differentBackgroundColor bg-gradient-to-tr from-accentDark via-accentDark/80 to-accentDark "
      >
        <div className="subsection flex flex-col lg:flex-row lg:grid-cols-2 gap-16 md:gap-24 lg:justify-between text-white">
          <div className="space-y-8 md:space-y-16">
            <h1 className="text-accentSecondary">
              Save money with CurraPay
            </h1>
            <div className="space-y-4 md:space-y-8">
              <h2>We&apos;re leveling the playing field.</h2>
              <h3>
                We&apos;re on a mission to reduce the cost of sending
                money internationally. CurraPay was founded on a
                simple idea — that the international money transfer
                market needed greater transparency.
              </h3>
              <h3>
                We want to give you to the chance to see the{" "}
                <span className="font-semibold underline-offset-[3px]">
                  <u>cheapest</u>, <u>fastest</u>, and <u>best</u>{" "}
                  ways
                </span>{" "}
                to send your hard-earned money internationally.
              </h3>
            </div>
          </div>

          <div className="grid grid-rows-3 gap-y-8 md:gap-y-12 2xl:gap-y-16">
            <div className="border-l-8 pl-8 py-2 lg:py-0 2xl:py-6 grid grid-flow-col justify-start items-center border-accentSecondary gap-6 md:gap-8">
              <div className="h-16 w-16 md:h-20 md:w-20 ">
                <GroupIcon
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <h2 className="whitespace-nowrap">
                  1 billion people
                </h2>
                <p>send money abroad</p>
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
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h2>
                <p>sent every year</p>
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
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </h2>
                <p>lost each year due to transaction costs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="rates-table"
        className="subsection mt-12 lg:mt-24 text-center"
      >
        <h1>Check Out the Latest Exchange Rates</h1>
        <div className="relative mt-16 pt-8 pb-20 px-8 md:px-12 bg-white rounded-xl shadow-xl border border-secondary/30">
          <RatesTable />
          <p className="absolute right-12 bottom-6">
            Source{" "}
            <Link
              href="https://xe-money-transfer.pxf.io/c/5580726/2132164/12610"
              className="underline hover:text-accent hover:decoration-accent"
              target="_blank"
            >
              XE
            </Link>
          </p>
        </div>
      </div>

      <div id="faq" className="subsection text-center">
        <h1 className="">Frequently Asked Questions</h1>
        <div className="mt-16">
          <AccordionMenu itemList={FAQS} />
        </div>
        <h4 className="font-normal mt-24">
          Can&apos;t find the answer you&apos;re looking for? Feel
          free to{" "}
          <Link
            href="https://forms.gle/JZK9F2C3E9u1osaaA"
            target="_blank"
            className="link text-accent underline underline-offset-4"
          >
            contact us!
          </Link>
        </h4>
      </div>
      <ScrollToTopButton />
    </div>
  );
});

export default Homepage;
