"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const displayPage = currentPage + 1

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i).map((pageIndex) => {
          const pageNum = pageIndex + 1
          return (
            <Button
              key={pageIndex}
              variant={currentPage === pageIndex ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageIndex)}
              className="min-w-[40px]"
            >
              {pageNum}
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="text-sm text-muted-foreground ml-4">
        Page {displayPage} of {totalPages}
      </div>
    </div>
  )
}
