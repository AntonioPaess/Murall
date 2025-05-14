"use client";

import type React from "react";
import { Eye, EyeOff, LoaderCircle, Presentation } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import authService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !password || !email || !confirmPassword) {
      toast.error("Ops... Você deixou algum campo vazio.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      toast.error("As senhas não coincidem.");
      return;
    }

    const clearInputs = () => {
      setUsername("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    };

    try {
      await authService.register({
        username,
        password,
        email,
        role: "ROLE_USER",
      });
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      clearInputs();
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background/5 to-transparent pointer-events-none" />
      <motion.div
        className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{
          x: [-100, 100, -100],
          y: [-100, 200, -100],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -z-10 h-[250px] w-[250px] rounded-full bg-primary/10 blur-3xl right-20 top-20"
        initial={{ x: 100, y: 100 }}
        animate={{
          x: [100, -100, 100],
          y: [100, 300, 100],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="bg-card w-full md:w-[55%] border-b md:border-b-0 md:border-r border-border min-h-screen flex flex-col"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <div className="p-8 md:p-12">
          <Link href="/" className="">
            <Image
              src={
                theme === "dark"
                  ? "/LogoGrandeDark.png"
                  : "/LogoGrandeLigth.png"
              }
              alt="Murall Logo"
              width={110}
              height={110}
              priority
            />
          </Link>
        </div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}>
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative overflow-hidden rounded-[2.5rem] aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/60 mix-blend-overlay z-10 rounded-[2.5rem]" />
              <Image
                src="https://images.pexels.com/photos/1031700/pexels-photo-1031700.jpeg"
                alt="Register visual"
                fill
                priority
                className="object-cover rounded-[2.5rem] transform hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-background/80 to-transparent rounded-b-[2.5rem]">
                <h2 className="text-primary-foreground text-2xl md:text-3xl font-bold mb-2">
                  Bem-vindo ao MurALL
                </h2>
                <p className="text-white text-sm md:text-base">
                  Sua plataforma para criar e compartilhar conteúdo visual
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full md:w-[45%] min-h-screen flex items-center justify-center p-8 md:p-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-primary-foreground text-2xl">
              Faça seu cadastro
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Insira seus dados para criar uma conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-muted-foreground"
                    htmlFor="email">
                    Email
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}>
                    <Input
                      id="email"
                      placeholder="email@email.com"
                      type="email"
                      className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-muted-foreground"
                    htmlFor="user">
                    Usuário
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}>
                    <Input
                      id="user"
                      placeholder="Seu usuário"
                      type="text"
                      className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-muted-foreground"
                    htmlFor="password">
                    Senha
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? (
                        <Eye className="text-primary-foreground" />
                      ) : (
                        <EyeOff className="text-primary-foreground" />
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-muted-foreground"
                    htmlFor="confirm-password">
                    Confirmar Senha
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative">
                    <Input
                      id="confirm-password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className="bg-background/80 border-border text-primary-foreground focus:border-primary/50 focus:ring-primary/30"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </motion.div>
                </div>
                <Button
                  onClick={handleRegister}
                  className="w-full bg-primary text-primary-foreground hover:brightness-110 font-medium py-6">
                  {isLoading ? (
                    <div className="flex flex-row gap-2 items-center">
                      <LoaderCircle className="w-6 h-6 animate-spin" />{" "}
                      Carregando...
                    </div>
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-border pt-4">
            <p className="text-center text-sm text-muted-foreground">
              Já possui uma conta?{" "}
              <Link
                href="/signin"
                className="text-primary hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
