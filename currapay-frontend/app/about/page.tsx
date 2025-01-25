/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";

const Globe = dynamic(
  () => {
    return import("@/components/Globe");
  },
  { ssr: false }
);

interface Member {
  name: string;
  title: string;
  imgSrc: string;
  linkedin: string;
  desc: string;
}

const TEAM: Member[] = [
  {
    name: "David McMillan",
    title: "Co-Founder & CEO",
    imgSrc: "/team/david-pfp.jpg",
    linkedin: "https://www.linkedin.com/in/davidandrewmcmillan/",
    desc: "David recently graduated from the University of Oxford where he was a Global Rotary Scholar. He won Nobel Prize Laureate Vernon Smith's annual international prize for his paper applying Keynesian probability theory to economic forecasting. Most recently, David served as Director of Public Policy at CARTS, a Princeton University spinout, which is focused on the deployment of autonomous vehicle technology.",
  },
  {
    name: "Max Stanley",
    title: "Co-Founder & COO",
    imgSrc: "/team/max-pfp.png",
    linkedin:
      " https://www.linkedin.com/in/maximillian-stanley-681619135/",
    desc: "Before co-founding CurraPay, Max was an investment banker at Citi, covering the Technology and Communications sector. Before Citi, he was an analyst at Olsen Palmer, an investment bank in Washington D.C., working on community bank M&A. He received a B.A. in Economics and History from George Washington University. He holds Series 7, 79, and 63 licenses.",
  },
];

const MemberCard = ({ member }: { member: Member }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="p-0 md:w-80 lg:w-96 text-left">
      <div className="flex flex-col items-center">
        <div className="rounded-3xl shadow-lg border-secondary/30">
          <img
            src={member.imgSrc}
            alt={member.name}
            className="relative rounded-xl items-center w-full md:h-80 lg:h-96 object-cover"
          />
        </div>

        <div className="relative flex flex-col pt-6 pb-20 pl-3">
          <div className="font-semibold inline-flex items-center gap-1.5 md:gap-2">
            <h3>{member.name}</h3>
            <Link href={member.linkedin} target="_blank" className="">
              <LinkedInIcon className="hover:text-accent -translate-y-0.5 md:scale-125" />
            </Link>
          </div>
          <h4 className="text-secondary/80">{member.title}</h4>
          <div>
            <p
              className={`pt-4 text-ellipsis ${
                !showDesc && "line-clamp-2"
              }`}
            >
              {member.desc}
            </p>
            <button
              className="pt-1 text-accent hover:underline"
              onClick={() => setShowDesc(!showDesc)}
            >
              {showDesc ? "Read less" : "Read more"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function About() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id="about" className="about text-center gap-36 lg:gap-48">
      <div
        id="mission"
        className="differentBackgroundColor bg-gradient-to-tl from-slate-900 to-accentDark"
      >
        <div className="items-center justify-center grid grid-flow-row lg:grid-flow-col lg:grid-cols-3 text-center lg:text-left gap-12 lg:gap-8 subsection pt-12 sm:pt-24 md:pt-36 lg:-mt-4 xl:-mt-8 2xl:-mt-12">
          <div className="relative justify-center space-y-4 lg:col-span-2 lg:pr-16 2xl:text-2xl z-10">
            <h1 className="text-white">Our Mission</h1>
            <h3 className="font-semibold text-gray-300">
              We&apos;re building a better way to send money abroad.
            </h3>
            <div className="pt-4 w-full space-y-4 text-left">
              <div className="bg-white glass flex flex-row border box-border shadow-xl rounded-xl p-4 cursor-default hover:drop-shadow-glow">
                <ArrowLongRightIcon className="h-5 w-5 2xl:h-7 2xl:w-7 translate-y-1 flex-shrink-0 mr-2" />
                <h4 className="lg:text-xl 2xl:text-2xl 3xl:text-3xl">
                  CurraPay is on a mission to help the world hit
                  Target 10(c) of the United Nations&apos; Sustainable
                  Development Goals: lowering the cost of sending
                  money abroad to less than 3%.
                </h4>
              </div>
              <div className="bg-white glass flex flex-row border box-border shadow-xl rounded-xl p-4 cursor-default hover:drop-shadow-glow">
                <ArrowLongRightIcon className="h-5 w-5 2xl:h-7 2xl:w-7 translate-y-1 flex-shrink-0 mr-2" />
                <h4 className="lg:text-xl 2xl:text-2xl 3xl:text-3xl">
                  We&apos;re shifting the international money transfer
                  market away from slow, expensive services and
                  towards faster, more affordable options. By doing
                  this, we&apos;re making it easier and cheaper for
                  people to support their loved ones across borders.
                </h4>
              </div>
              <div className="bg-white glass flex flex-row border box-border shadow-xl rounded-xl p-4 cursor-default hover:drop-shadow-glow">
                <ArrowLongRightIcon className="h-5 w-5 2xl:h-7 2xl:w-7 translate-y-1 flex-shrink-0 mr-2" />
                <h4 className="lg:text-xl 2xl:text-2xl 3xl:text-3xl">
                  At CurraPay, we&apos;re purpose-driven to create a
                  marketplace that empowers the over 1 billion people
                  who send and receive more than $13 trillion every
                  year.
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full lg:col-span-1 lg:translate-x-1/4 md:translate-y-4 -my-12 lg:-my-36 xl:-my-40 2xl:-my-48">
            <Globe className="relative flex justify-center items-center" />
          </div>
        </div>
      </div>

      <div className="subsection xl:py-8">
        <h1>Our Story</h1>
        <div className="mt-16 w-full h-full grid grid-flow-row gap-12 xl:grid-flow-col xl:grid-cols-9 xl:gap-20 justify-center items-center md:mb-16">
          <div
            className="relative flex w-full h-full items-center justify-center xl:col-span-4"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <img
              src={"/max_and_david.jpg"}
              alt="founders"
              className="object-contain rounded-lg"
            />
          </div>
          <div
            className="w-full h-full space-y-6 text-left xl:col-span-5"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <h4 className="lg:text-xl 2xl:text-2xl">
              As a graduate student at Oxford, David McMillan realized
              that sending money back home to the U.S. was too
              complicated. He teamed up with a longtime friend and
              British expat, Max Stanley, who worked in investment
              banking at Citi.
            </h4>
            <h4 className="lg:text-xl 2xl:text-2xl">
              Together, they founded CurraPay to help simplify
              international money transfers for the one billion people
              and businesses who sent $13 trillion abroad last year.
            </h4>
            <h4 className="lg:text-xl 2xl:text-2xl">
              After incorporating their startup in July 2024, they
              were accepted into a fintech accelerator run by Plug &
              Play (an early investor in PayPal and DropBox),
              Prudential, Stevens Institute of Technology, and the New
              Jersey Economic Development Authority. The platform
              launched in November 2024, and the rest is history.
            </h4>
          </div>
        </div>
      </div>
      <div
        id="investors"
        className="differentBackgroundColor -mb-8 sm:-mb-8 md:-mb-12 md:py-20 lg:py-20 xl:py-20 2xl:py-20 bg-accentDark"
      >
        <div className="subsection flex flex-col items-center justify-center">
          <h1 className="w-full h-full flex items-center justify-center text-white">
            Backed by
          </h1>
          <div
            className="mt-16 xl:mt-32 w-full h-full xl:h-20 grid grid-cols-2 gap-12 items-center justify-items-center justify-center xl:flex xl:justify-between"
            data-aos="zoom-out"
            data-aos-duration="1200"
          >
            <Link href="https://www.njeda.gov/" target="_blank">
              <img
                src={"/backers/nj_eda_logo_white.png"}
                alt="NJ EDA"
                className="relative h-20 w-auto object-contain"
              />
            </Link>

            <Link
              href="https://www.plugandplaytechcenter.com/"
              target="_blank"
            >
              <img
                src={"/backers/plug_and_play_logo_white.png"}
                alt="Plug and Play"
                className="relative h-12 w-auto object-contain"
              />
            </Link>

            <Link href=" https://www.prudential.com/" target="_blank">
              <img
                src={"/backers/prudential_logo_white.png"}
                alt="Prudential"
                className="relative h-12 w-auto object-contain"
              />
            </Link>
            <Link href="https://www.stevens.edu/" target="_blank">
              <img
                src={"/backers/sit_logo_white.png"}
                alt="SIT"
                className="relative h-20 w-auto object-contain -translate-y-2"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="subsection flex flex-col space-y-12 md:space-y-16 items-center">
        <h1>Meet the Team</h1>
        <h4>
          Our company was built by founders from best-in class finance
          and technology companies
        </h4>
        <div
          className="grid grid-flow-row auto-rows-max md:grid-flow-col md::auto-cols-max gap-12 md:gap-24"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {TEAM.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
}
