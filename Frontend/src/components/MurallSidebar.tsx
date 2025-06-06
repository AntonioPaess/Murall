"use client";

import React, { useState, useEffect } from "react";
import {
  UserRoundCog,
  LogOut,
  Compass,
  Handshake,
  Presentation,
  MessageCircle,
  ChevronRight,
  Settings,
  Bell,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import authService from "@/services/auth.service";
import { useSidebar } from "@/app/contexts/SidebarContext";
import { toast } from "sonner";
import { useUser } from "@/app/contexts/UserContext";
import { blogPartnershipService } from "@/services/partnership.service";

interface AppSidebarProps {
  className?: string;
}

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  isExternal?: boolean;
}

export function AppSidebar({ className = "" }: AppSidebarProps) {
  const { collapsed, toggleCollapsed } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  // Busca o número de notificações pendentes para o usuário
  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (!user?.id) return;
      
      try {
        const count = await blogPartnershipService.countPendingRequestsByUser(user.id);
        setPendingRequestsCount(count);
      } catch (error) {
        console.error("Erro ao buscar notificações pendentes:", error);
      }
    };

    fetchPendingRequests();
    
    // Atualiza a cada 30 segundos
    const interval = setInterval(fetchPendingRequests, 30000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const isLinkActive = (href: string) => {
    if (href === '/explore') {
      return pathname.startsWith('/explore');
    }
    return pathname === href;
  };

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };
  
  const handleLogout = async () => {
    authService.logout();
    router.push("/");
    toast.success("Volte sempre!");
  };

  const mainLinks: NavLink[] = [
    {
      label: "Explorar",
      href: "/explore",
      icon: <Compass size={20} />,
    },
    {
      label: "Meus Parceiros",
      href: "/my-partners",
      icon: <Handshake size={20} />,
    },
    {
      label: "Notificações",
      href: "/notifications",
      icon: <Bell size={20} />,
      badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined,
    },
    {
      label: "Meus Banners",
      href: "/my-banners",
      icon: <Presentation size={20} />,
    },
    {
      label: "Bate-papo",
      href: "/chat",
      icon: <MessageCircle size={20} />,
    },
  ];

  const settingsLinks: NavLink[] = [
    {
      label: "Meu Perfil",
      href: `/my-account/${user?.id}`,
      icon: <UserRoundCog size={20} />,
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar
        className={`fixed top-0 left-0 h-full z-10 overflow-x-hidden transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          bg-gradient-to-b from-background/90 via-background/85 to-background/80
          border-r backdrop-blur-md ${className}`}
      >
        <SidebarContent className={`mt-[105px] py-4 ${collapsed ? "px-2" : "px-3"}`}>
          <SidebarGroup>
            <h3 className={`text-xs uppercase text-primary font-semibold mb-3 ${collapsed ? "text-center" : "px-3"}`}>
              {!collapsed ? "Navegação" : "•••"}
            </h3>
            <SidebarMenu className="space-y-1">
              {mainLinks.map((item) => (
                <SidebarMenuItem key={item.label} className="text-white cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isLinkActive(item.href)}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <div
                          className={`relative font-medium text-base flex items-center gap-3
                          ${collapsed ? "justify-center px-2" : "px-4"}
                          ${isLinkActive(item.href) ? "text-primary" : "text-white"}`}
                        >
                          {item.icon}
                          {!collapsed && item.label}
                          {item.badge !== undefined && (
                            <Badge 
                              className={`ml-auto ${collapsed ? 
                                "absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full flex justify-center items-center" : 
                                "py-1 px-2"}`}
                              variant={item.badge > 0 ? "default" : "secondary"}
                            >
                              {item.badge > 0 ? item.badge : ''}
                            </Badge>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-8">
            <h3 className={`text-xs uppercase text-primary font-semibold mb-3 ${collapsed ? "text-center" : "px-3"}`}>
              {!collapsed ? "Configurações" : "•••"}
            </h3>
            <SidebarMenu className="space-y-1">
              {settingsLinks.map((item) => (
                <SidebarMenuItem key={item.label} className="text-white cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isLinkActive(item.href)}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <div
                          className={`font-medium text-base flex items-center gap-3
                          ${collapsed ? "justify-center px-2" : "px-4"}
                          ${isLinkActive(item.href) ? "text-primary" : "text-white"}`}
                        >
                          {item.icon}
                          {!collapsed && item.label}
                        </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="pb-6">
          <SidebarMenu>
            <SidebarMenuItem className="cursor-pointer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild variant="destructive" onClick={handleLogout}>
                    <div
                      className={`font-medium text-base flex items-center gap-3 
                      ${collapsed ? "justify-center px-2" : "px-4"}
                      text-red-500 hover:text-red-400`}
                    >
                      <LogOut size={20} />
                      {!collapsed && "Sair"}
                    </div>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">Sair</TooltipContent>}
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>

          <button
            onClick={toggleCollapsed}
            className="mt-4 mx-auto h-8 w-8 rounded-full flex items-center justify-center bg-primary/15 hover:bg-primary/60 text-primary transition-all"
          >
            <ChevronRight
              size={18}
              className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}