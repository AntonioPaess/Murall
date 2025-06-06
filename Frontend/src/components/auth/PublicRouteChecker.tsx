"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import LoaderMurall from "../Loader";

interface DecodedToken {
  exp: number;
}

export default function PublicRouteChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setTimeout(() => {
            router.push("/explore");
          }, 500);
          return;
        }
      } catch (error) {
        console.error("Erro ao decodificar token ", error);
      }
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <LoaderMurall/>
    );
  }

  return <>{children}</>;
}
