import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import SimpleGlobe from "@/components/Globe";

const TEAM = [
  {
    name: "David McMillan",
    title: "CEO",
    imgSrc: "https://via.placeholder.com/250",
    linkedin: "https://www.linkedin.com/in/davidandrewmcmillan/",
  },
  {
    name: "Max Stanley",
    title: "CEO",
    imgSrc: "https://via.placeholder.com/250",
    linkedin:
      " https://www.linkedin.com/in/maximillian-stanley-681619135/",
  },
  {
    name: "Zach Kiihne",
    title: "CEO",
    imgSrc: "https://via.placeholder.com/250",
    linkedin: "https://www.linkedin.com/in/zachary-kiihne-56b944129/",
  },
];

export default function About() {
  return (
    <section className="text-center gap-36 overflow-x-hidden">
      <div className="justify-center items-center w-[100vw] h-screen -my-36 grid grid-flow-col px-8 sm:px-24 bg--950">
        <div className="text-left space-y-4 -mr-24">
          <h1 className="">Mission</h1>
          <p className="text-xl font-semibold text-accentSecondary">We're building a better way to send money abroad.</p>
          <p className="pt-4">
            This is a random example paragraph for the purpose of
            demo. Blah blah blah words words words something here and
            there. Would be nice to have a real mission statement here
            something more inspiring and meaningful than this. And look at this globe!.
          </p>
        </div>

        <SimpleGlobe className="overflow-visible scale-110 translate-x-1/3" />
      </div>

      <div className="h-screen">
        <h1>Meet the Team</h1>
        <div className="mt-12 sm:mt-24 grid grid-flow-row auto-rows-max sm:grid-flow-col sm:auto-cols-max gap-12 sm:gap-24 ">
          {TEAM.map((member) => (
            <div className="group" key={member.name}>
              <div className="group-hover:scale-105">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="group-hover:drop-shadow-xl rounded-full object-contain"
                />
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
