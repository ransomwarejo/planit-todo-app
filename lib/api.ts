const API_BASE_URL = "/api"

export interface Task {
  id: string
  title: string
  description: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  status: "PENDING" | "IN_PROGRESS" | "DONE"
  dueDate: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedResponse {
  content: Task[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

const mockTasks: Task[] = []

const getMockTasks = (): Task[] => {
  if (typeof window === "undefined") return mockTasks
  const stored = localStorage.getItem("tasks")
  return stored ? JSON.parse(stored) : []
}

const saveMockTasks = (tasks: Task[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }
}

export const createTask = async (task: {
  title: string
  description: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  status: "PENDING" | "IN_PROGRESS" | "DONE"
  dueDate: string
}): Promise<Task> => {
  try {
    const body = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
    }

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to create task")
    }

    const data = await response.json()
    return data
  } catch (error) {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      userId: "current-user",
    }
    const tasks = getMockTasks()
    tasks.push(newTask)
    saveMockTasks(tasks)
    return newTask
  }
}

export const getTask = async (id: string): Promise<Task> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch task")
    }

    const data = await response.json()
    return data
  } catch (error) {
    const tasks = getMockTasks()
    const task = tasks.find((t) => t.id === id)
    if (!task) throw new Error("Task not found")
    return task
  }
}

export const getTasks = async (page = 0, size = 20, search = "", sort = ""): Promise<PaginatedResponse> => {
  try {
    let url = `${API_BASE_URL}/tasks?page=${page}&size=${size}`
    if (search) url += `&search=${encodeURIComponent(search)}`
    if (sort) url += `&sort=${encodeURIComponent(sort)}`

    const response = await fetch(url, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    const allTasks = getMockTasks()

    let filtered = allTasks
    if (search) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return {
      content: filtered,
      page: 0,
      size: filtered.length,
      totalElements: filtered.length,
      totalPages: 1,
    }
  }
}

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      throw new Error("Failed to update task")
    }

    const data = await response.json()
    return data
  } catch (error) {
    const tasks = getMockTasks()
    const taskIndex = tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) throw new Error("Task not found")
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
    saveMockTasks(tasks)
    return tasks[taskIndex]
  }
}

export const deleteTask = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete task")
    }
  } catch (error) {
    const tasks = getMockTasks()
    const filtered = tasks.filter((t) => t.id !== id)
    saveMockTasks(filtered)
  }
}
