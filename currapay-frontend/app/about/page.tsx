import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import dynamic from "next/dynamic";

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
  return (
    <section className="text-center gap-36">
      <div className="min-h-screen md:-mt-28 lg:-mt-24 xl:-mt-30 -mb-24 px-8 sm:px-16 sm:-mx-20 items-center justify-center grid grid-flow-row lg:grid-flow-col lg:grid-cols-3 text-center lg:text-left gap-8">
        <div className="relative space-y-4 lg:col-span-2 lg:-ml-12 lg:pr-16 text-base 2xl:text-2xl">
          <h1 className="md:pt-28 lg:pt-0">Mission</h1>
          <p className="text-xl font-semibold text-accentSecondary drop-shadow-sm">
            We&apos;re building a better way to send money abroad.
          </p>
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
        <div className="w-full -my-12 lg:-my-36 lg:col-span-1 lg:translate-x-1/3">
          <Globe className="relative flex justify-center items-center" />
        </div>
      </div>
      <div className="pb-36 differentBackgroundColor backgroundWave lg:-mx-48 ">
        <h1>Our story</h1>
        <div className="mt-12 md:mt-24 grid grid-flow-row lg:grid-flow-col justify-between gap-12 z-10">
          <div className="bg-white md:backdrop-blur-xl md:bg-opacity-85 shadow-xl rounded-xl p-8 xl:p-16">
            As a graduate student at Oxford, David McMillan realized
            that sending money back home to the U.S. was a complicated
            process.
          </div>
          <div className="bg-white md:backdrop-blur-xl md:bg-opacity-85 shadow-xl rounded-xl p-8 xl:p-16">
            <p>
              He teamed up with a longtime friend and British expat,
              Max Stanley, who was working in investment banking at
              Citi.
            </p>
          </div>
          <div className="bg-white md:backdrop-blur-xl md:bg-opacity-85 shadow-xl rounded-xl p-8 xl:p-16">
            Together, they founded CurraPay to help simplify
            international money transfers for the people and
            businesses who send money abroad each year.
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col space-y-12 md:space-y-24 lg:mt-16">
        <h1>Meet the Team</h1>
        <div className="grid grid-flow-row auto-rows-max md:grid-flow-col md::auto-cols-max gap-12 md:gap-24">
          {TEAM.map((member) => (
            <div className="group" key={member.name}>
              <div className="flex flex-col items-center relative group-hover:scale-105">
                <div className="relative bg-black rounded-full w-40 h-40 md:w-56 md:h-56 group-hover:drop-shadow-xl">
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
        <div className="lg:px-36 ">
          Our company was built by founders from best-in class finance
          and technology companies
        </div>
      </div>
    </section>
  );
}
