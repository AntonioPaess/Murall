import {
    Marquee,
    MarqueeItem,
    MarqueeFade,
    MarqueeContent
  } from "@/components/ui/marquee"

  import Image from "next/image"

  const Logos = {
    cesar: {
        href: "/logo-cesar-school-br.png",
        alt: "CESAR School",
    }
    
  }
  
  export const MarqueeDemo = () => {
    return (
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent>
          {new Array(10).fill(null).map((_, index) => (
            <MarqueeItem key={index} className="w-24 mr-6 h-24">
                <Image src={Logos.cesar.href} alt={Logos.cesar.alt} width={128} height={128}/>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    )
  }