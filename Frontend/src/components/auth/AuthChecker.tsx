"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import LoaderMurall from "../Loader";

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
        router.push("/signin");
        toast.warning("Sessão expirada, faça login novamente.");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Erro ao decodificar token ", error);
      localStorage.removeItem("token");
      router.push("/signin");
    }
  }, [router]);

  if (isLoading) {
    return (
      <LoaderMurall />
    );
  }

  return <>{children}</>;
}
