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
import userService from "@/services/user.service";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const VerifyResend = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast.error("O campo email é obrigatório");
      setIsLoading(false);
    }

    try {
      await userService.resendVerificationEmail({ email });
      toast.success("Email de confirmação de conta foi enviado com sucesso")
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <div className="mt-32 flex items-center justify-center">
          <Card className="w-full max-w-md backdrop-blur-sm border border-border shadow-xl z-[99] text-white"
            style={{
              background: 'linear-gradient(180deg, #0A2A45 0%, #0D1522 100%)'
            }}>
            <CardHeader>
              Reenviar email de verificação
              <CardDescription>
                Insira seu email e reenviaremos o email de verificação caso
                <br />
                tenha uma conta na nossa base de dados
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
                <Button onClick={handelSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex flex-row gap-2 items-center">
                      <LoaderCircle className="w-6 h-6 animate-spin" />{" "}
                      Carregando...
                    </div>
                  ) : (
                    "Reenviar Email"
                  )}</Button>
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
      </motion.div>
    </div>
  );
};

export default VerifyResend;
