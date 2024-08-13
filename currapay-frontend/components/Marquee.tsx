import Link from "next/link";

export interface MarqueeItem {
  image: string;
  link: string;
}

export const Marquee = ({items}: {items: MarqueeItem[]}) => {
  return (
    <div className="relative flex items-center">
      <div className="relative flex max-h-72 max-w-[100vw] overflow-hidden py-5">
        <div className="flex animate-marquee [--duration:30s] hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, index) => (
            <Link
              key={index}
              className="h-full w-full"
              href={item.link}
            >
              <div className="relative h-full w-[16rem]">
                <div className="mt-auto flex items-center h-36 w-36 bg-accent">
                  <img
                    src={item.image}
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
