"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

interface DecodedToken {
  exp: number;
}

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        setTimeout(() => {
            toast.warning("Faça login para acessar a página");
            router.push("/signin");
        }, 500);
        return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        toast.warning("Sessão expirada, faça login novamente");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao decodificar token ", error);
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  if (isLoading) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-purple-700/30 border-t-purple-700 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
