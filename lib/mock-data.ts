export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "done"
  dueDate: string
  userId: string
}

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the Q1 project proposal to management",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-20",
    userId: "1",
  },
  {
    id: "2",
    title: "Review code changes",
    description: "Review pull requests from the team",
    priority: "medium",
    status: "pending",
    dueDate: "2024-01-18",
    userId: "1",
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update API documentation with new endpoints",
    priority: "low",
    status: "done",
    dueDate: "2024-01-15",
    userId: "1",
  },
  {
    id: "4",
    title: "Design new landing page",
    description: "Create mockups for the new marketing landing page",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-01-25",
    userId: "2",
  },
  {
    id: "5",
    title: "Fix bug in authentication",
    description: "Resolve the token refresh issue reported by users",
    priority: "high",
    status: "pending",
    dueDate: "2024-01-17",
    userId: "2",
  },
  {
    id: "6",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment",
    priority: "medium",
    status: "done",
    dueDate: "2024-01-10",
    userId: "3",
  },
]

// Store tasks in localStorage
export const getTasks = (): Task[] => {
  if (typeof window === "undefined") return MOCK_TASKS
  const stored = localStorage.getItem("planit_tasks")
  return stored ? JSON.parse(stored) : MOCK_TASKS
}

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("planit_tasks", JSON.stringify(tasks))
}

export const getUserTasks = (userId: string): Task[] => {
  const tasks = getTasks()
  return tasks.filter((task) => task.userId === userId)
}

export const updateTaskStatus = (taskId: string, status: Task["status"]): void => {
  const tasks = getTasks()
  const updated = tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
  saveTasks(updated)
}

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks()
  const filtered = tasks.filter((task) => task.id !== taskId)
  saveTasks(filtered)
}

export const addTask = (task: Omit<Task, "id">): Task => {
  const tasks = getTasks()
  const newTask = { ...task, id: Date.now().toString() }
  saveTasks([...tasks, newTask])
  return newTask
}

export const createTask = (task: Omit<Task, "id" | "userId">): Task => {
  const currentUser = typeof window !== "undefined" ? localStorage.getItem("planit_user") : null
  const user = currentUser ? JSON.parse(currentUser) : { id: "1" }

  const tasks = getTasks()
  const newTask = { ...task, id: Date.now().toString(), userId: user.id }
  saveTasks([...tasks, newTask])
  return newTask
}

export const updateTask = (taskId: string, updates: Partial<Task>): void => {
  const tasks = getTasks()
  const updated = tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task))
  saveTasks(updated)
}
