"use client";

import Image from "next/image";

const Dashbooard = () => {
  return (
    <div className="min-h-screen bg-background p-8 ">
      <div className="flex h-[80vh] gap-4 flex-col items-center justify-center">
        <p className="flex justify-center items-center text-xl text-muted-foreground w-full">
          Nossos desenvolvedores estão trabalhando nisso.
        </p>
        <Image src={"/typing-laptop.gif"} alt="Cat" width={200} height={200}/>
      </div>
    </div>
  );
};

export default Dashbooard;
