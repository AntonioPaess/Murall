"use client";

import { Eye, EyeOff, LoaderCircle, Rocket } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (username === "" || password === "") {
            toast.error("Ops... Você deixou algum campo vazio.");
            return;
        }
        try {
            const token = await authService.login({ username, password })
            toast.success("Login realizado com sucesso!")
            router.push("/dashboard")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message)
        } finally {
          setIsLoading(false);
        }
    }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-3xl"
        initial={{ x: -100, y: -100 }}
        animate={{
          x: [-100, 100, -100],
          y: [-100, 200, -100],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      {/* Left section */}
      <motion.div
        className="bg-[#18181b] w-full md:w-[55%] border-b md:border-b-0 md:border-r border-[#2c2c30] min-h-screen flex flex-col"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 md:p-12">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Rocket className="w-8 h-8 md:w-11 md:h-11 text-purple-500" />
            </motion.div>
            <span className="text-white text-xl font-bold">RocketApp</span>
          </Link>
        </div>

        <motion.div
          className="flex-1 flex items-center justify-center p-8 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-white text-xl md:text-2xl font-medium mb-6 italic">
                "This platform has saved me countless hours of work and helped
                me deliver stunning designs to my clients faster than ever
                before."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-300 font-bold">SD</span>
                </div>
                <div>
                  <p className="text-white font-medium">Sofia Davis</p>
                  <p className="text-gray-400 text-sm">Product Designer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right section */}
      <motion.div
        className="w-full md:w-[45%] min-h-screen flex items-center justify-center p-8 md:p-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-[#18181b] border-[#2c2c30]">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-gray-300"
                    htmlFor="user"
                  >
                    Usuário
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Input
                      id="user"
                      placeholder="Seu usuário"
                      type="text"
                      className="bg-[#27272a] border-[#3f3f46] text-white"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-sm font-medium text-gray-300"
                      htmlFor="password"
                    >
                      Senha
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="relative"
                  >
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className="bg-[#27272a] border-[#3f3f46] text-white"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <Eye className="text-white" />
                      ) : (
                        <EyeOff className="text-white" />
                      )}
                    </div>
                  </motion.div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-[#3f3f46] data-[state=checked]:bg-purple-500"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <Button onClick={handleLogin} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  {isLoading ?  <div className="flex flex-row gap-2 items-center"><LoaderCircle className="text-white w-6 h-6 animate-spin"/> Carregando...</div> : "Entrar"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-[#2c2c30] pt-4">
            <p className="text-center text-sm text-gray-400">
              Não possui uma conta?{" "}
              <Link
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
