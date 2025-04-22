"use client";

import { Button } from "@/components/ui/button";
import { Menu, Presentation } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-border"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Presentation className="rotate-180 w-6 h-6 text-primary" />
        <span className="text-primary-foreground font-bold text-xl">
          MurALL
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/features">Nossa Missão</NavLink>
        <NavLink href="/how-it-works">Como Funciona</NavLink>
        <NavLink href="/examples">Exemplos</NavLink>
        <NavLink href="/examples">Suporte</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Link href={"/signin"}>
          <Button variant="ghost" className="text-primary-foreground hover:text-primary">
            Login
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="bg-primary hover:brightness-110 text-primary-foreground">
            Cadastre-se
          </Button>
        </Link>
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-primary-foreground">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-primary-foreground transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
    </Link>
  );
}
