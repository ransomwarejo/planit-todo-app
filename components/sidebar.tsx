"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ListTodo, Users, Plus, CheckSquare, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { logout } from "@/lib/mock-auth"
import { useToast } from "@/hooks/use-toast"

interface SidebarProps {
  role: "client" | "admin"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const clientLinks = [
    { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/tasks", label: "My Tasks", icon: CheckSquare },
    { href: "/client/tasks/create", label: "New Task", icon: Plus },
  ]

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/tasks", label: "All Tasks", icon: ListTodo },
    { href: "/admin/users", label: "Users", icon: Users },
  ]

  const links = role === "client" ? clientLinks : adminLinks

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/auth/login")
  }

  return (
    /* Updated sidebar styling with primary color for active states and logo */
    <aside className="w-64 border-r bg-sidebar border-sidebar-border">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Planit</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Button
                key={link.href}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary hover:bg-primary/90 text-primary-foreground",
                )}
                asChild
              >
                <Link href={link.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            )
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            {role === "admin" ? "Admin Panel" : "Client Area"}
          </p>
        </div>
      </div>
    </aside>
  )
}
