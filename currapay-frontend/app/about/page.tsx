import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";

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
    linkedin: " https://www.linkedin.com/in/maximillian-stanley-681619135/",
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
    <section className="text-center gap-36">
      <div className="h-screen">
        <h1>Mission</h1>
        <p className="mt-12 sm:mt-24">
          This is a random example paragraph for the purpose of demo.
          Blah blah blah words words words something here and there.
          Would be nice to have a real mission statement here
          something more inspiring and meaningful than this. And a
          cool picture or design too.
        </p>
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
        The chair sat in the corner where it had been for over 25 years. The only difference was there was someone actually sitting in it. How long had it been since someone had done that? Ten years or more he imagined. Yet there was no denying the presence in the chair now. </p>
      </div>
    </section>
  );
}
