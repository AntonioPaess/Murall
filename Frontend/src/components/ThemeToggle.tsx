"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative h-[28px] w-[52px] border  rounded-full transition-colors duration-300",
        isDark ? "bg-slate-700" : "bg-sky-400",
        className 
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full   transition-transform duration-300",
          isDark ? "translate-x-6 bg-black" : "translate-x-0 bg-white",
        )}
      >
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-[10px]",
            isDark ? "text-white" : "text-slate-700",
          )}
        >
          {isDark ? <Moon className="h-3 w-3"/> : <Sun className="h-3 w-3"/>}
        </span>
      </span>
    </button>
  )
}