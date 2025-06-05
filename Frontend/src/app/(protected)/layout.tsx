"use client";

import React from "react";
import { AppSidebar } from "@/components/MurallSidebar";
import AuthChecker from "@/components/auth/AuthChecker";
import ProtectedNav from "@/components/ProtectedNav";
import LoaderMurall from "@/components/Loader";
import UserSetupScreen from "@/components/user-setup/UserSetupFlow";
import { SidebarProvider, useSidebar } from "../contexts/SidebarContext";
import { UserProvider, useUser } from "../contexts/UserContext";

const AuthenticatedLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, isMobile, setCollapsed } = useSidebar();

  React.useEffect(() => {
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
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out`}>
          {children}
        </main>
      </div>
    </>
  );
};

const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, error, refreshUser } = useUser();

  if (loading) {
    return <LoaderMurall />;
  }

  if (error) {
    console.error("Erro ao buscar usuário:", error);
  }

  if (!user?.role) {
    return (
      <UserSetupScreen
        user={user}
        onComplete={refreshUser}
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

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <LayoutContent>{children}</LayoutContent>
    </UserProvider>
  );
};

export default Layout;