import { Badge } from "@/components/ui/badge"
import { Circle, Clock, CheckCircle } from "lucide-react"

interface StatusBadgeProps {
  status: "pending" | "in-progress" | "completed" | "PENDING" | "IN_PROGRESS" | "COMPLETED"
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase().replace("_", "-").replace("done", "completed") as
    | "pending"
    | "in-progress"
    | "completed"

  const config = {
    pending: {
      label: "Pending",
      icon: Circle,
      className: "bg-secondary text-secondary-foreground hover:bg-secondary",
    },
    "in-progress": {
      label: "In Progress",
      icon: Clock,
      className: "bg-chart-3/20 text-chart-3 hover:bg-chart-3/20 border-chart-3",
    },
    completed: {
      label: "Completed",
      icon: CheckCircle,
      className: "bg-chart-1/20 text-chart-1 hover:bg-chart-1/20 border-chart-1",
    },
  }

  const { label, icon: Icon, className } = config[normalizedStatus]

  return (
    <Badge variant="outline" className={className}>
      <Icon className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  )
}
