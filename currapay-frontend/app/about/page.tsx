"use client";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Globe = dynamic(
  () => {
    return import("@/components/Globe");
  },
  { ssr: false }
);

const TEAM = [
  {
    name: "David McMillan",
    title: "CEO",
    imgSrc: "/team/david-pfp.jpg",
    linkedin: "https://www.linkedin.com/in/davidandrewmcmillan/",
  },
  {
    name: "Max Stanley",
    title: "COO",
    imgSrc: "/team/max-pfp.png",
    linkedin:
      " https://www.linkedin.com/in/maximillian-stanley-681619135/",
  },
];

export default function About() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="text-center gap-36 lg:gap-48 overflow-x-hidden">
      <div className="items-center justify-center grid grid-flow-row lg:grid-flow-col lg:grid-cols-3 text-center lg:text-left gap-12 lg:gap-8">
        <div className="relative space-y-4 lg:col-span-2 lg:pr-16 text-base 2xl:text-2xl">
          <h1 className="">Our Mission</h1>
          <h3 className="font-semibold">
            We&apos;re building a better way to send money abroad.
          </h3>
          <p className="pt-4">
            Our platform is helping the world reach Target 10(c) of
            the U.N. Sustainable Development&apos;s Goals: reducing
            the cost of sending money abroad below 3%. Through our
            platform, we are helping move demand within the
            international money transfer market away from slow and
            expensive institutions, and towards cheaper and quicker
            alternatives.
          </p>
          <p>
            We are working at the intersection of profit and purpose
            to build a marketplace that empowers the more than one
            billion people who send and receive more than $13 trillion
            annually.
          </p>
        </div>
        <div className="w-full lg:col-span-1 lg:translate-x-1/4 -my-12 lg:-my-36 xl:-my-40">
          <Globe className="relative flex justify-center items-center" />
        </div>
      </div>

      <div>
        <h1>Our Story</h1>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 w-full h-full gap-36 justify-center items-center">
          <div
            className="relative w-full h-[20rem] order-1"
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
            className="text-center lg:text-right space-y-4 order-2"
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
            November 2024. This provided our start-up
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

      <div className="flex flex-col space-y-12 md:space-y-24">
        <h1>Meet the Team</h1>
        <p>
          Our company was built by founders from best-in class finance
          and technology companies
        </p>
        <div className="grid grid-flow-row auto-rows-max md:grid-flow-col md::auto-cols-max gap-12 md:gap-24">
          {TEAM.map((member) => (
            <div className="group" key={member.name}>
              <div className="flex flex-col items-center relative group-hover:scale-105">
                <div className="relative bg-black rounded-full w-40 h-40 md:w-56 md:h-56 xl:w-64 xl:h-64 group-hover:drop-shadow-xl">
                  <Image
                    src={member.imgSrc}
                    alt={member.name}
                    sizes="100vw"
                    objectFit="cover"
                    className="rounded-full"
                    fill
                  />
                </div>
                <p className="font-semibold pt-4">{member.name}</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
