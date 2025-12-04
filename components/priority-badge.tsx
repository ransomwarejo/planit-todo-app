import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

interface PriorityBadgeProps {
  priority: "low" | "medium" | "high" | "LOW" | "MEDIUM" | "HIGH"
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const normalizedPriority = priority.toLowerCase() as "low" | "medium" | "high"

  const config = {
    low: {
      label: "Low",
      icon: Info,
      className: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/20 border-chart-2",
    },
    medium: {
      label: "Medium",
      icon: AlertCircle,
      className: "bg-chart-3/20 text-chart-3 hover:bg-chart-3/20 border-chart-3",
    },
    high: {
      label: "High",
      icon: AlertTriangle,
      className: "bg-destructive/20 text-destructive hover:bg-destructive/20 border-destructive",
    },
  }

  const { label, icon: Icon, className } = config[normalizedPriority]

  return (
    <Badge variant="outline" className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  )
}
