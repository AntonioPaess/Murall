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
} from "./ui/sidebar"; // Assuming this path is correct
import Image from "next/image"; // Assuming this path is correct
import { Badge } from "./ui/badge"; // Assuming this path is correct
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"; // Assuming this path is correct
import authService from "@/services/auth.service"; // Assuming this path is correct
import userService from "@/services/user.service"; // Assuming this path is correct
import { toast } from "sonner"; // Assuming this path is correct

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

// Define a type for the user state, similar to ProtectedNav
interface User {
  notifications?: number | string; // Added based on usage
  // Add other user properties if they are used from the user object
  username?: string;
  avatar?: string;
  role?: string;
}

export function AppSidebar({
  className = "",
  defaultCollapsed = false,
  onCollapsedChange,
}: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user in AppSidebar:", error);
        // Optionally, handle the error, e.g., by setting user to null or showing a toast
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (onCollapsedChange) {
      onCollapsedChange(collapsed);
    }
  }, [collapsed, onCollapsedChange]);

  const isLinkActive = (href: string) => pathname === href;

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
      badge: 2, // This seems static, so no change needed
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
      badge: "Novo", // This seems static, so no change needed
    },
  ];

  // Update settingsLinks to use user state and handle loading/null user
  const settingsLinks: NavLink[] = loadingUser || !user ? [] : [
    {
      label: "Notificações",
      href: "/notifications",
      icon: <Bell size={20} />,
      badge: user.notifications, // Access safely after loading and user check
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

  // You might want to show a loading indicator for the sidebar content or parts of it
  // if (loadingUser) {
  //   return <Sidebar className={`fixed top-0 left-0 h-full z-10 ...`}>Loading user...</Sidebar>;
  // }

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar
        className={`fixed top-0 left-0 h-full z-10 overflow-x-hidden transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}
      bg-gradient-to-b from-background/90 via-background/85 to-background/80
      border-r backdrop-blur-md ${className}`}>
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

          {/* SETTINGS - Render only if not loading and user exists, or handle appropriately */}
          {(!loadingUser && user && settingsLinks.length > 0) && (
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
          )}
        </SidebarContent>

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

