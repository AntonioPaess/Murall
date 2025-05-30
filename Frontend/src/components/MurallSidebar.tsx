"use client";

import React, { useState, useEffect } from "react";
import {
  UserRoundCog,
  LogOut,
  LayoutDashboard,
  Compass,
  Handshake,
  Presentation,
  MessageCircle,
  ChevronRight,
  Bell,
  Settings,
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
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import { toast } from "sonner";

interface AppSidebarProps {
  className?: string;
  isVisible?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
  isExternal?: boolean;
}
const user = await userService.getUser();

export function AppSidebar({
  className = "",
  defaultCollapsed = false,
  onCollapsedChange,
}: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const router = useRouter();
  const pathname = usePathname();

  // Notificar componentes pais quando o estado collapsed mudar
  useEffect(() => {
    if (onCollapsedChange) {
      onCollapsedChange(collapsed);
    }
  }, [collapsed, onCollapsedChange]);

  const isLinkActive = (href: string) => pathname === href;

  const handleNavigation = (path: string) => {
    if (pathname !== path) {
      console.log(`Navegando para: ${path}`);
      router.push(path);
    }
  };

  const handleLogout = async () => {
    authService.logout();
    router.push("/");
    toast.success("Volte sempre!");
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  const mainLinks: NavLink[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "Explorar",
      href: "/explore",
      icon: <Compass size={20} />,
    },
    {
      label: "Meus Parceiros",
      href: "/my-partners",
      icon: <Handshake size={20} />,
      badge: 2,
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
      badge: "Novo",
    },
  ];

  const settingsLinks: NavLink[] = [
    {
      label: "Notificações",
      href: "/notifications",
      icon: <Bell size={20} />,
      badge: user.notifications,
    },
    {
      label: "Meu Perfil",
      href: "/account",
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
      border-r backdrop-blur-md ${className}`}>
        {/* CONTEÚDO */}
        <SidebarContent className={`mt-[105px] py-4 px-${collapsed ? "2" : "3"}`}>
          <SidebarGroup>
            <h3
              className={`text-xs uppercase text-primary font-semibold mb-3 ${
                collapsed ? "text-center" : "px-3"
              }`}>
              {!collapsed ? "Navegação" : "•••"}
            </h3>
            <SidebarMenu className="space-y-1">
              {mainLinks.map((item) => (
                <SidebarMenuItem
                  key={item.label}
                  className="text-white cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isLinkActive(item.href)}
                        onClick={() => handleNavigation(item.href)}>
                        <div
                          className={`
                          relative font-medium text-base flex items-center gap-3
                          ${collapsed ? "justify-center px-2" : "px-4"}
                          ${
                            isLinkActive(item.href)
                              ? "text-primary"
                              : "text-white"
                          }
                        `}>
                          {item.icon}
                          {!collapsed && item.label}
                          {!collapsed && item.badge && (
                            <Badge className="ml-auto py-1 px-2 bg-primary text-white">
                              {item.badge}
                            </Badge>
                          )}
                          {collapsed && item.badge && (
                            <Badge
                              className={`absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full flex justify-center items-center
                              ${
                                typeof item.badge === "string"
                                  ? "bg-primary"
                                  : "bg-primary"
                              } text-white`}>
                              {typeof item.badge === "string"
                                ? "•"
                                : item.badge}
                            </Badge>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          {/* SETTINGS */}
          <SidebarGroup className="mt-8">
            <h3
              className={`text-xs uppercase text-primary font-semibold mb-3 ${
                collapsed ? "text-center" : "px-3"
              }`}>
              {!collapsed ? "Configurações" : "•••"}
            </h3>
            <SidebarMenu className="space-y-1">
              {settingsLinks.map((item) => (
                <SidebarMenuItem
                  key={item.label}
                  className="text-white cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isLinkActive(item.href)}
                        onClick={() => handleNavigation(item.href)}>
                        <div
                          className={`
                          relative font-medium text-base flex items-center gap-3
                          ${collapsed ? "justify-center px-2" : "px-4"}
                          ${
                            isLinkActive(item.href)
                              ? "text-primary"
                              : "text-white"
                          }
                        `}>
                          {item.icon}
                          {!collapsed && item.label}
                          {!collapsed && item.badge && (
                            <Badge className="ml-auto bg-primary/80 text-white">
                              {item.badge}
                            </Badge>
                          )}
                          {collapsed && item.badge && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full flex justify-center items-center bg-secondary/90 text-white">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="pb-6">
          <SidebarMenu>
            <SidebarMenuItem className="cursor-pointer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    variant="destructive"
                    onClick={handleLogout}>
                    <div
                      className={`
                      font-medium text-base flex items-center gap-3 
                      ${collapsed ? "justify-center px-2" : "px-4"}
                      text-red-500 hover:text-red-400
                    `}>
                      <LogOut size={20} />
                      {!collapsed && "Sair"}
                    </div>
                  </SidebarMenuButton>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Sair</TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>

          <button
            onClick={toggleCollapsed}
            className="mt-4 mx-auto h-8 w-8 rounded-full flex items-center justify-center bg-primary/15 hover:bg-primary/60 text-primary transition-all">
            <ChevronRight
              size={18}
              className={`transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
