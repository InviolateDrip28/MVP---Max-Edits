import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import GlobeModel from "@/components/Globe";

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
  {
    name: "Zach Kiihne",
    title: "CTO",
    imgSrc: "/team/zach-pfp.png",
    linkedin: "https://www.linkedin.com/in/zachary-kiihne-56b944129/",
  },
];

export default function About() {
  return (
    <section className="text-center gap-36">
      <div className="md:h-screen md:-mt-36 items-center justify-center grid grid-flow-row md:grid-flow-col md:grid-cols-3 text-center md:text-left gap-8">
        <div className="relative space-y-4 md:col-span-2 md:pr-16">
          <h1 className="">Mission</h1>
          <p className="text-xl font-semibold text-accentSecondary">
            We&apos;re building a better way to send money abroad.
          </p>
          <p className="pt-4">
            This is a random example paragraph for the purpose of
            demo. Blah blah blah words words words something here and
            there. Would be nice to have a real mission statement here
            something more inspiring and meaningful than this. And
            look at this globe!.
          </p>
        </div>
        <div className="w-full md:-my-36 md:col-span-1 md:translate-x-1/3">
          <GlobeModel className="relative flex justify-center items-center" />
        </div>
      </div>

      <div className="h-screen">
        <h1>Meet the Team</h1>
        <div className="mt-12 sm:mt-24 grid grid-flow-row auto-rows-max sm:grid-flow-col sm:auto-cols-max gap-12 sm:gap-24">
          {TEAM.map((member) => (
            <div className="group" key={member.name}>
              <div className="flex flex-col items-center relative group-hover:scale-105">
                <div className="relative bg-black rounded-full w-56 h-56 sm:w-72 sm:h-72 group-hover:drop-shadow-xl ">
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

      <div className="">
        <h1>Other</h1>
        <p className="mt-12 sm:mt-24">
          The chair sat in the corner where it had been for over 25
          years. The only difference was there was someone actually
          sitting in it. How long had it been since someone had done
          that? Ten years or more he imagined. Yet there was no
          denying the presence in the chair now.{" "}
        </p>
      </div>
    </section>
  );
}
