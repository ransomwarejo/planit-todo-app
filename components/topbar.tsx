"use client"

import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Topbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [search, setSearch] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex-1" />
      </header>
    )
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <SearchInput placeholder="Search tasks..." value={search} onChange={setSearch} />

      <div className="flex items-center gap-2">
        <LanguageSwitcher />

        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <Button variant="ghost" size="icon">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
