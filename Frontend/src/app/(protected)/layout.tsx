import type React from "react";
import { AppSidebar } from "@/components/MurallSidebar";
import AuthChecker from "@/components/auth/AuthChecker";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthChecker>
      <AppSidebar />
      {children}
    </AuthChecker>
  );
};

export default Layout;