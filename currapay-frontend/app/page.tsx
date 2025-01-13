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
} from "@heroicons/react/20/solid";
import GroupIcon from "@mui/icons-material/Groups";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AccordionMenu from "@/components/Accordion";
import { Marquee } from "@/components/Marquee";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { observer } from "mobx-react";
// import { useStores } from "@/stores/provider";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import CountUp from "react-countup";
import RatesTable from "@/components/Table";
import { NumericFormat } from "react-number-format";
import Searchbox from "@/components/Searchbox";

const Homepage = () => {
  // const { SearchStore } = useStores();
  const [useBanks, setUseBanks] = useState(false);
  const [useRemittanceApps, setUseRemittanceApps] = useState(false);
  const [useCrypto, setUseCrypto] = useState(false);

  const [amount, setAmount] = useState("500");
  const [fromCountry, setFromCountry] = useState("US");
  const [toCountry, setToCountry] = useState("GB");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      let _amount = localStorage.getItem("amount");
      let _fromCountry = localStorage.getItem("fromCountry");
      let _toCountry = localStorage.getItem("toCountry");
      if (_amount) {
        setAmount(_amount);
      }
      if (_fromCountry) {
        setFromCountry(_fromCountry);
      }
      if (_toCountry) {
        setToCountry(_toCountry);
      }
    }
  }, []);

  const handleSwap = () => {
    const from = fromCountry;
    const to = toCountry;
    setToCountry(from);
    setFromCountry(to);
  };

  const handleClick = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("amount", amount);
      localStorage.setItem("fromCountry", fromCountry);
      localStorage.setItem("toCountry", toCountry);
    }
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
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value.replace(/,/g, ""))
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
                defaultValue={COUNTRY_CODE_TO_NAME[fromCountry]}
                setSelected={setFromCountry}
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
                defaultValue={COUNTRY_CODE_TO_NAME[toCountry]}
                setSelected={setToCountry}
              />
            </div>
          </div>

          <h3 className="flex pt-4 justify-center items-center">
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
              className="text-white text-center font-bold rounded-md p-4 w-full 
                bg-accent/80 relative z-10 overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-accent before:to-accent
                before:transition-transform before:duration-500 before:-z-10 hover:before:translate-x-full"
            >
              Compare Rates {" \u26A1"}
            </Link>
          </h3>
        </div>
      </div>

      <div
        id="partners"
        className="text-center mb-12 lg:mb-24 space-y-12 "
      >
        <h1 className="text-center">Our Partners</h1>
        <h3>
          We work with industry leading financial institutions to
          provide you with the best rates
        </h3>
        <Marquee items={PARTNERS} />
      </div>

      <div
        id="context"
        className="differentBackgroundColor bg-accentDark"
      >
        <div className="subsection flex flex-col lg:flex-row lg:grid-cols-2 gap-16 md:gap-24 lg:justify-between text-background">
          <div className="space-y-8 md:space-y-16">
            <h1 className="font-bold text-accentSecondary">
              Save money with CurraPay
            </h1>
            <div>
              <h3 className="font-semibold">
                We&apos;re leveling the playing field.
              </h3>
              <h3 className="pt-4 md:pt-8">
                We&apos;re on a mission to reduce the cost of sending
                money internationally. CurraPay was founded on a
                simple idea — that the international money transfer
                market needed greater transparency.
              </h3>
            </div>
          </div>

          <div className="grid grid-rows-3 gap-y-8 md:gap-y-12 2xl:gap-y-16 ">
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
        <h1>Mid-Market Exchange Rates</h1>
        <div className="relative mt-16 pt-8 pb-20 px-8 md:px-12 bg-white rounded-xl shadow-xl border border-secondary/30">
          <RatesTable />
          <p className="absolute right-12 bottom-6">
            Source{" "}
            <Link
              href="https://xe-money-transfer.pxf.io/c/5580726/2132164/12610"
              className="underline hover:text-accent hover:decoration-accent"
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
            className="link text-accent underline underline-offset-4"
          >
            contact us!
          </Link>
        </h4>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Homepage;
