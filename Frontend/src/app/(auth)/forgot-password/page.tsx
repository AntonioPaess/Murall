"use client";


import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-32 flex items-center justify-center">
        <Card>
          <CardHeader>
            Esqueci minha senha
            <CardDescription>
              Preencha os dados abaixo para recuperarmos sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <Input
                id="email"
                placeholder="Seu email"
                type="email"
                className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handelSubmit}>Redefinir Senha</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center items-center text-sm border-t py-4">
            Deseja voltar ao menu principal? Clique
            <Link
              href="/"
              className="text-primary hover:text-primary/80 ml-1 underline">
              aqui
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
