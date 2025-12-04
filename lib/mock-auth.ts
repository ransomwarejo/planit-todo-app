export interface User {
  id: string
  name: string
  email: string
  role: "client" | "admin"
}

export function mockLogin(email: string, password: string): User | null {
  // Mock authentication - in production, this would be a real API call
  const users: User[] = [
    { id: "1", name: "Admin User", email: "admin@planit.com", role: "admin" },
    { id: "2", name: "John Doe", email: "john@example.com", role: "client" },
  ]

  const user = users.find((u) => u.email === email)
  if (user && password.length >= 6) {
    // Store user in localStorage for demo
    if (typeof window !== "undefined") {
      localStorage.setItem("planit_user", JSON.stringify(user))
    }
    return user
  }
  return null
}

export function mockRegister(name: string, email: string, password: string): User | null {
  // Mock registration - in production, this would be a real API call
  if (password.length >= 6) {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "client",
    }
    // Store user in localStorage for demo
    if (typeof window !== "undefined") {
      localStorage.setItem("planit_user", JSON.stringify(newUser))
    }
    return newUser
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("planit_user")
  return userStr ? JSON.parse(userStr) : null
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("planit_user")
  }
}
