"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { CheckCircle, Edit, Trash2, Calendar } from "lucide-react"
import Link from "next/link"

interface TaskCardProps {
  task: {
    id: string
    title: string
    description: string
    priority: "low" | "medium" | "high" | "LOW" | "MEDIUM" | "HIGH"
    status: "pending" | "in-progress" | "completed" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "DONE"
    dueDate: string
  }
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const isDone = task.status.toLowerCase() === "completed" || task.status.toLowerCase() === "done"

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <div className="flex gap-1">
            <PriorityBadge priority={task.priority} />
            <StatusBadge status={task.status} />
          </div>
        </div>
        <CardDescription className="line-clamp-2">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {!isDone && (
          <Button size="sm" variant="outline" className="flex-1 bg-transparent" onClick={() => onComplete(task.id)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete
          </Button>
        )}
        <Button size="sm" variant="outline" asChild>
          <Link href={`/client/tasks/${task.id}/edit`}>
            <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="sm" variant="outline" onClick={() => onDelete(task.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
