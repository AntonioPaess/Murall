"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import userService from "@/services/user.service";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import Link from "next/link";

interface ProtectedNavProps {
  className?: string;
}

const user = await userService.getUser();

const ProtectedNav = (className: ProtectedNavProps) => {
  const { theme } = useTheme();

  return (
    <nav
      className={`${className} sticky top-0 z-[99] flex items-center justify-between px-6 py-4 border-b border-border bg-background/90 backdrop-blur-sm`}>
      <Link className="cursor-pointer" href={"/dashboard"}>
        <Image
          src={theme === "dark" ? "/LogoGrandeDark.png" : "/LogoGrandeLigth.png"}
          width={110}
          height={110}
          alt="Murall"
        />
      </Link>
      <div className="flex flex-row gap-3 items-center justify-center">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-10 w-10 border-2 cursor-pointer border-primary">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="bg-primary/60 text-white uppercase">
                  {user.username ? user.username.slice(0, 1) : "M"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="bg-primary mt-2 rounded-lg p-2 border border-primary">
                <p className="font-medium text-white">{user.username}</p>
                <p className="text-xs font-bold text-white">
                  {user.role === "USER_ROLE" ? "Membro" : "Membro"}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default ProtectedNav;
