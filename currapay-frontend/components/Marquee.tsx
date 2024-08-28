import Link from "next/link";
import Image from "next/image";

export interface MarqueeItem {
  image: string;
  link: string;
}

/** Reusable marquee component. animations defined in tailwind.config.ts */
export const Marquee = ({ items }: { items: MarqueeItem[] }) => {
  return (
    <div className="relative flex items-center -mx-8 sm:-mx-24">
      <div className="relative flex max-h-72 max-w-[100vw] overflow-hidden fade-left-right">
        <div className="flex animate-marquee [--duration:30s] hover:[animation-play-state:paused">
          {[...items, ...items].map((item, index) => (
            <Link
              key={index}
              className="h-full w-full"
              href={item.link}
            >
              <div className="relative h-full w-[16rem]">
                <div className="mt-auto flex items-center h-36 w-36">
                  <img
                    src={item.image}
                    alt={`Image ${index}`}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
