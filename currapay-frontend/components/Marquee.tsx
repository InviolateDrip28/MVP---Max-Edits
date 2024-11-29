import Link from "next/link";
import Image from "next/image";

export interface MarqueeItem {
  image: string;
  link: string;
}

/** Reusable marquee component. animations defined in tailwind.config.ts */
export const Marquee = ({ items }: { items: MarqueeItem[] }) => {
  return (
    <div className="relative flex items-center -mx-8 sm:-mx-16 md:-mx-24">
      <div className="relative flex items-center max-h-32 max-w-[100vw] overflow-hidden fade-left-right">
        <div
          className="flex animate-marquee [--duration:40s]
         hover:[animation-play-state:paused] pt-8 space-x-24"
        >
          {[...items, ...items].map((item, index) => (
            <Link key={index} className="h-full w-full" href={item.link}>
              <span className="flex h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 2xl:h-12 w-max justify-center">
                <Image
                  src={item.image}
                  alt={`Image ${index}`}
                  width={500}
                  height={500}
                  className="h-full object-contain"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
