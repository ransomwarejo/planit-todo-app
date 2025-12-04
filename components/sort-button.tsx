"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

interface SortButtonProps {
  label: string
  active: boolean
  direction: "asc" | "desc"
  onClick: () => void
}

export function SortButton({ label, active, direction, onClick }: SortButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="-ml-3 h-8 data-[state=open]:bg-accent">
      {label}
      {active ? (
        direction === "asc" ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  )
}
