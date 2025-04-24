"use client";

import {
  Marquee,
  MarqueeItem,
  MarqueeFade,
  MarqueeContent,
} from "@/components/ui/marquee";
import Image from "next/image";

const Logos = {
  cesar: {
    href: "/Logo_CESAR.png",
    alt: "CESAR School",
    width: 270,
    height: 246,
  },
  gec: {
    href: "/lugo-gec2sl.png",
    alt: "GEC",
    width: 998,
    height: 250,
  },
};

export const MarqueeDemo = () => {
  return (
    <Marquee className="lg:w-[50%] sm:w-full">
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />
      <MarqueeContent>
        {Object.values(Logos).map((logo, index) => (
          <MarqueeItem key={index} className="mx-6 flex items-center">
            <div className="h-10 max-w-xs flex items-center">
              <Image
                src={logo.href || "/placeholder.svg"}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-full w-auto object-contain transition-all duration-200"
              />
            </div>
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  );
};
