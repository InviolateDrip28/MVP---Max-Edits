"use client";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

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
    title: "CEO",
    imgSrc: "/team/david-pfp.jpg",
    linkedin: "https://www.linkedin.com/in/davidandrewmcmillan/",
    desc: "David recently graduated from the University of Oxford where he was a Global Rotary Scholar. He won Nobel Prize Laureate Vernon Smith's annual international prize for his paper applying Keynesian probability theory to economic forecasting. Most recently, David served as Director of Public Policy at CARTS, a Princeton University spinout, which is focused on the deployment of autonomous vehicle technology.",
  },
  {
    name: "Max Stanley",
    title: "COO",
    imgSrc: "/team/max-pfp.png",
    linkedin:
      " https://www.linkedin.com/in/maximillian-stanley-681619135/",
    desc: "Before co-founding CurraPay, Max was an investment banker at Citi, covering the Technology and Communications sector. Before Citi, he was an analyst at Olsen Palmer, an investment bank in Washington D.C., working on community bank M&A. He received a B.A. in Economics and History from George Washington University. He holds Series 7, 79, and 63 licenses.",
  },
];

const MemberCard = ({ member }: { member: Member }) => {
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div className="p-0 bg-white rounded-lg max-w-[17rem] xl:max-w-[35rem] shadow-xl">
      <div className="flex flex-col items-center">
        <div className="relative rounded-lg bg-white h-64 md:h-72 lg:h-80 2xl:h-[30rem] w-full max-w-[35rem] items-center">
          <Image
            src={member.imgSrc}
            alt={member.name}
            className="rounded-t-lg"
            objectFit="cover"
            fill
          />
        </div>
        <div className="relative pt-6 pb-20 px-6 lg:px-8">
          <p className="font-semibold">{member.name}</p>
          <div className="inline-flex items-center gap-1">
            <p>{member.title}</p>
            <Link
              href={member.linkedin}
              target="_blank"
              className="-translate-y-0.5"
            >
              <LinkedInIcon className="hover:text-accent" />
            </Link>
          </div>
          <p
            className={`pt-4 text-ellipsis ${
              !showDesc && "line-clamp-4"
            }`}
          >
            {member.desc}
          </p>
          <button
            className="absolute left-1/2 transform -translate-x-1/2 bottom-6 text-accent hover:underline"
            onClick={() => setShowDesc(!showDesc)}
          >
            {showDesc ? "Hide" : "Read more"}
          </button>
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
    <section className="w-screen max-w-full text-center gap-36 lg:gap-48 overflow-hidden">
      <div className="items-center justify-center grid grid-flow-row lg:grid-flow-col lg:grid-cols-3 text-center lg:text-left gap-12 lg:gap-8 subsection">
        <div className="relative space-y-4 lg:col-span-2 lg:pr-16 2xl:text-2xl 2xl:-mt-16 mobile:mx-11">
          <h1 className="">Our Mission</h1>
          <h3 className="font-semibold">
            We&apos;re building a better way to send money abroad.
          </h3>
          <h4 className="pt-4">
            CurraPay is helping the world reach Target 10(c) of the
            United Nation&apos;s Sustainable Development&apos;s Goals:
            reducing the cost of sending money abroad below 3%.
          </h4>
          <h4>
            Through CurraPay, we are helping move demand within the
            international money transfer market away from slow and
            expensive institutions, and towards cheaper and quicker
            alternatives.
          </h4>
          <h4>
            We are working at the intersection of profit and purpose
            to build a marketplace that empowers the more than 1
            billion people who send and receive more than $13 trillion
            annually.
          </h4>
        </div>
        <div className="w-full lg:col-span-1 lg:translate-x-1/4 -my-12 lg:-my-36 xl:-my-40 2xl:-my-48">
          <Globe className="relative flex justify-center items-center " />
        </div>
      </div>

      <div className="subsection">
        <h1>Our Story</h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-36 justify-center items-center">
          <div
            className="relative w-full h-[20rem] order-2 lg:order-1"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <Image
              src={"/NJ.png"}
              alt="new jersey"
              className="rounded-lg"
              fill
              objectFit="cover"
            />
          </div>

          <div
            className="text-center lg:text-left space-y-4 order-1 lg:order-2"
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <p>
              As a graduate student at Oxford, David McMillan realized
              that sending money back home to the U.S. was too
              complicated. He teamed up with a longtime friend and
              British expat, Max Stanley, who worked in investment
              banking at Citi.
            </p>
            <p>
              Together, they founded CurraPay to help simplify
              international money transfers for the one billion people
              and businesses who sent $13 trillion abroad last year.
            </p>
          </div>

          <p
            className="text-center lg:text-left order-3"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            After incorporating our start-up in July 2024, we were
            accepted into a fintech accelerator run by Plug & Play (an
            early investor in PayPal and DropBox), Prudential, Stevens
            Institute of Technology, and the New Jersey Economic
            Development Authority. We launched our platform in
            November 2024.
          </p>

          <div
            className="h-full w-full grid grid-cols-2 gap-12 place-content-between order-4"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div className="relative h-36 w-full">
              <Image
                src={"/backers/nj_eda_logo.png"}
                alt="NJ EDA"
                objectFit="contain"
                fill
              />
            </div>
            <div className="relative h-36 w-full">
              <Image
                src={"/backers/plug_and_play_logo.png"}
                alt="Plug and Play"
                fill
                objectFit="contain"
              />
            </div>
            <div className="relative h-36 w-full">
              <Image
                src={"/backers/sit_logo.png"}
                alt="SIT"
                fill
                objectFit="contain"
              />
            </div>
            <div className="relative h-36 w-full">
              <Image
                src={"/backers/prudential_logo.png"}
                alt="Prudential"
                fill
                objectFit="contain"
              />
            </div>
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
          data-aos-duration="3000"
        >
          {TEAM.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
