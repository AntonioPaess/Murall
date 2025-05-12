"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle"; // Assuming this path is correct
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // Assuming this path is correct
import userService from "@/services/user.service"; // Assuming this path is correct
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip"; // Assuming this path is correct
import Link from "next/link";
import React, { useEffect, useState } from "react"; // Added useEffect and useState

interface ProtectedNavProps {
  className?: string;
}

interface User {
  avatar?: string;
  username?: string;
  role?: string;
}

const ProtectedNav = ({ className }: ProtectedNavProps) => { // Changed to destructure className
  const { theme } = useTheme();
  const [user, setUser] = useState<User | null>(null); // Initialize user state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        // Handle error appropriately, e.g., redirect to login or show a message
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    // Optional: Show a loading state while user data is being fetched
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
          <div className="h-10 w-10 border-2 rounded-full border-primary animate-pulse bg-gray-300"></div> {/* Placeholder for Avatar */}
          <ThemeToggle />
        </div>
      </nav>
    );
  }

  if (!user) {
    // Optional: Handle case where user data could not be fetched or is null
    // You might want to redirect or show a generic avatar
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
                {/* Simplified avatar or login prompt */}
                <Avatar className="h-10 w-10 border-2 cursor-pointer border-primary">
                    <AvatarFallback className="bg-primary/60 text-white uppercase">?</AvatarFallback>
                </Avatar>
                <ThemeToggle />
            </div>
        </nav>
    );
  }

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
                  {/* Ensure user.role is checked before accessing */}
                  {user.role === "USER_ROLE" ? "Membro" : user.role === "ROLE_ADMIN" ? "Admin" : "Membro"} 
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

