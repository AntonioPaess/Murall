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
        localStorage.removeItem("token");
        router.push("/login");
        toast.warning("Sessão expirada, faça login novamente.");
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
      <div className="min-h-screen flex flex-col md:flex-row bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
