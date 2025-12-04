"use client"

import { TasksTable } from "@/components/tasks-table"
import { SearchInput } from "@/components/search-input"
import { Pagination } from "@/components/pagination"
import { useEffect, useState } from "react"

interface Task {
  id: string
  title: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "done"
  createdDate: string
  user: string
}

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/tasks?search=${search}&page=${page}&size=10`)
        const data = await response.json()
        console.log("[v0] Admin tasks fetched:", data)
        setTasks(data.tasks)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("[v0] Error fetching tasks:", error)
        // Mock data for demo
        setTasks([
          {
            id: "1",
            title: "Complete project proposal",
            priority: "high",
            status: "in-progress",
            createdDate: "2024-01-15",
            user: "John Doe",
          },
          {
            id: "2",
            title: "Review code changes",
            priority: "medium",
            status: "pending",
            createdDate: "2024-01-16",
            user: "Jane Smith",
          },
          {
            id: "3",
            title: "Update documentation",
            priority: "low",
            status: "done",
            createdDate: "2024-01-14",
            user: "Bob Johnson",
          },
        ])
        setTotalPages(3)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [search, page])

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
      })
      console.log("[v0] Task deleted:", id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting task:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">All Tasks</h1>
        <p className="text-muted-foreground">Manage all tasks across the platform</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search tasks..." value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <>
          <TasksTable tasks={tasks} onDelete={handleDelete} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
