"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createTask } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function CreateTaskPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("MEDIUM")
  const [dueDate, setDueDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const isoDate = new Date(dueDate).toISOString()

      await createTask({
        title,
        description,
        priority: priority as "LOW" | "MEDIUM" | "HIGH",
        dueDate: isoDate,
        status: "PENDING",
      })

      toast({
        title: "Success",
        description: "Task created successfully!",
      })

      router.push("/client/tasks")
    } catch (error) {
      console.error("[v0] Error creating task:", error)
      toast({
        title: "Error",
        description: "Failed to create task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Create New Task</h1>
        <p className="text-muted-foreground">Add a new task to your list</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Details</CardTitle>
          <CardDescription>Fill in the information below to create a new task</CardDescription>
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
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Task"}
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
