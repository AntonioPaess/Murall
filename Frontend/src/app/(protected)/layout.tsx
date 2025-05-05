"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/MurallSidebar";
import AuthChecker from "@/components/auth/AuthChecker";
import ProtectedNav from "@/components/ProtectedNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthChecker>
      <ProtectedNav />
      <div className="flex h-[calc(100vh-80px)] overflow-hidden">
        <AppSidebar
          defaultCollapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />
        <main className="flex-1 overflow-auto transition-all duration-300 ease-in-out">
          {children}
        </main>
      </div>
    </AuthChecker>
  );
};

export default Layout;
