"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getTask, updateTask } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("MEDIUM")
  const [status, setStatus] = useState("PENDING")
  const [dueDate, setDueDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTask(params.id)
        setTitle(data.title)
        setDescription(data.description)
        setPriority(data.priority.toUpperCase())
        setStatus(data.status.toUpperCase().replace("-", "_"))
        setDueDate(data.dueDate.split("T")[0])
      } catch (error) {
        console.error("[v0] Error fetching task:", error)
        toast({
          title: "Error",
          description: "Failed to load task. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const isoDate = new Date(dueDate).toISOString()

      await updateTask(params.id, {
        title,
        description,
        priority: priority as "LOW" | "MEDIUM" | "HIGH",
        status: status as "PENDING" | "IN_PROGRESS" | "COMPLETED",
        dueDate: isoDate,
      })

      toast({
        title: "Success",
        description: "Task updated successfully!",
      })

      router.push("/client/tasks")
    } catch (error) {
      console.error("[v0] Error updating task:", error)
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading task...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Task</h1>
        <p className="text-muted-foreground">Update task information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>Update the task information below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Task"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
