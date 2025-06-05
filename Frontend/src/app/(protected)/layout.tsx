"use client";

import React, { useEffect, useState } from "react";
import { AppSidebar } from "@/components/MurallSidebar";
import AuthChecker from "@/components/auth/AuthChecker";
import ProtectedNav from "@/components/ProtectedNav";
import { User } from "@/models/users";
import userService from "@/services/user.service";
import LoaderMurall from "@/components/Loader";
import UserSetupScreen from "@/components/user-setup/UserSetupFlow";
import { SidebarProvider, useSidebar } from "../contexts/sidebar-context";

const AuthenticatedLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, isMobile, setCollapsed  } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true); 
    }
  }, [isMobile, setCollapsed]);
  
  return (
    <>
      <ProtectedNav />
      <div className="flex overflow-hidden">
        <AppSidebar />
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
            collapsed ? "ml-[5rem]" : "ml-[8rem]"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <LoaderMurall />;
  }

  if (!user?.role) {
    return (
      <UserSetupScreen
        user={user}
        onComplete={(updatedUser) => setUser(updatedUser)}
      />
    );
  }

  return (
    <AuthChecker>
      <SidebarProvider>
        <AuthenticatedLayoutContent>
          {children}
        </AuthenticatedLayoutContent>
      </SidebarProvider>
    </AuthChecker>
  );
};

export default Layout;