"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/features", label: "Nossa Missão" },
    { href: "/how-it-works", label: "Como Funciona" },
    { href: "/privacy", label: "Política de Privacidade" },
    { href: "/support", label: "Suporte" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-border bg-background/80">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={
            theme === "dark" ? "/LogoGrandeDark.png" : "/LogoGrandeLigth.png"
          }
          alt="Murall Logo"
          width={110}
          height={110}
          priority
        />
      </Link>

      <div className="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-normal text-primary-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex items-center space-x-4">
        <Link href={"/signin"}>
          <Button
            variant="ghost"
            className="text-primary-foreground hover:text-primary border">
            Login
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="bg-primary hover:brightness-110 text-primary-foreground">
            Cadastre-se
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      {/* Menu Mobile */}
      <div className="flex gap-1 justify-center items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground"
              aria-label="Abrir menu">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetContent side="right" className="p-0 w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <Image
                  src={
                    theme === "dark"
                      ? "/LogoGrandeDark.png"
                      : "/LogoGrandeLigth.png"
                  }
                  alt="Murall Logo"
                  width={90}
                  height={90}
                />
              </div>

              <div className="flex flex-col p-4 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-primary-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-auto p-4 border-t flex flex-col space-y-4">
                <Link
                  href="/signin"
                  className="w-full"
                  onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full border">
                    Login
                  </Button>
                </Link>
                <Link
                  href="/signup"
                  className="w-full"
                  onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Cadastre-se</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <ThemeToggle className="" />
      </div>
    </motion.nav>
  );
}
