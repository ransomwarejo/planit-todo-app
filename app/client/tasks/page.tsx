"use client"

import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { getTasks, updateTask, deleteTask } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Pagination } from "@/components/pagination"
import { SortButton } from "@/components/sort-button"
import useSWR from "swr"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TasksPage() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const { toast } = useToast()

  const sortParam = sortField ? `${sortField},${sortDirection}` : ""

  const { data, error, isLoading, mutate } = useSWR(
    [`/api/tasks`, page, search, sortParam, statusFilter, priorityFilter],
    () => getTasks(page, 20, search, sortParam),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  )

  const handleComplete = async (id: string) => {
    try {
      const task = data?.content.find((t) => t.id === id)
      if (!task) return

      const updatePayload = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: "COMPLETED",
        dueDate: task.dueDate,
      }
      console.log("[v0] Updating task with payload:", JSON.stringify(updatePayload, null, 2))

      await updateTask(id, updatePayload)

      mutate()

      toast({
        title: "Success",
        description: "Task marked as complete!",
      })
    } catch (error) {
      console.error("[v0] Error in handleComplete:", error)
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)

      mutate()

      toast({
        title: "Success",
        description: "Task deleted successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(0)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
    setPage(0)
  }

  const filteredTasks = data?.content.filter((task) => {
    if (statusFilter && statusFilter !== "all" && task.status !== statusFilter) return false
    if (priorityFilter && priorityFilter !== "all" && task.priority !== priorityFilter) return false
    return true
  })

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-destructive">Error loading tasks. Please try again.</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>
        <Button asChild>
          <Link href="/client/tasks/create">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value)
            setPage(0)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priorityFilter}
          onValueChange={(value) => {
            setPriorityFilter(value)
            setPage(0)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>

        {(statusFilter !== "all" || priorityFilter !== "all" || search || sortField) && (
          <Button
            variant="outline"
            onClick={() => {
              setStatusFilter("all")
              setPriorityFilter("all")
              setSearch("")
              setSortField("")
              setPage(0)
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        <SortButton
          label="Due Date"
          active={sortField === "dueDate"}
          direction={sortDirection}
          onClick={() => handleSort("dueDate")}
        />
        <SortButton
          label="Priority"
          active={sortField === "priority"}
          direction={sortDirection}
          onClick={() => handleSort("priority")}
        />
        <SortButton
          label="Status"
          active={sortField === "status"}
          direction={sortDirection}
          onClick={() => handleSort("status")}
        />
        <SortButton
          label="Title"
          active={sortField === "title"}
          direction={sortDirection}
          onClick={() => handleSort("title")}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks?.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={handleComplete} onDelete={handleDelete} />
        ))}
      </div>

      {filteredTasks && filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {search || statusFilter !== "all" || priorityFilter !== "all"
              ? "No tasks match your filters."
              : "No tasks found. Create your first task!"}
          </p>
        </div>
      )}

      {data && data.totalPages > 1 && (
        <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
      )}
    </div>
  )
}
