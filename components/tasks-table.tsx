"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { SortButton } from "@/components/sort-button"
import { Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Task {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "done"
  createdDate: string
  user: string
}

interface TasksTableProps {
  tasks: Task[]
  onDelete: (id: string) => void
}

export function TasksTable({ tasks, onDelete }: TasksTableProps) {
  const [sortField, setSortField] = useState<string>("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const aValue = a[sortField as keyof Task]
    const bValue = b[sortField as keyof Task]

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks Overview</CardTitle>
        <CardDescription>View and manage all tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <SortButton
                  label="Title"
                  active={sortField === "title"}
                  direction={sortDirection}
                  onClick={() => handleSort("title")}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>
                <SortButton
                  label="Priority"
                  active={sortField === "priority"}
                  direction={sortDirection}
                  onClick={() => handleSort("priority")}
                />
              </TableHead>
              <TableHead>
                <SortButton
                  label="Status"
                  active={sortField === "status"}
                  direction={sortDirection}
                  onClick={() => handleSort("status")}
                />
              </TableHead>
              <TableHead>
                <SortButton
                  label="Created"
                  active={sortField === "createdDate"}
                  direction={sortDirection}
                  onClick={() => handleSort("createdDate")}
                />
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>{task.user}</TableCell>
                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={task.status} />
                </TableCell>
                <TableCell>{new Date(task.createdDate).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/tasks/${task.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
