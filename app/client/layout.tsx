import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar role="client" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
