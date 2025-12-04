"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"
import { Pagination } from "@/components/pagination"
import { Eye, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id: string
  name: string
  email: string
  taskCount: number
  joinedDate: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users?search=${search}&page=${page}&size=10`)
        const data = await response.json()
        console.log("[v0] Users fetched:", data)
        setUsers(data.users)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error("[v0] Error fetching users:", error)
        // Mock data for demo
        setUsers([
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            taskCount: 12,
            joinedDate: "2024-01-10",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            taskCount: 8,
            joinedDate: "2024-01-12",
          },
          {
            id: "3",
            name: "Bob Johnson",
            email: "bob@example.com",
            taskCount: 15,
            joinedDate: "2024-01-08",
          },
        ])
        setTotalPages(2)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [search, page])

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE",
      })
      console.log("[v0] User deleted:", id)
      setUsers(users.filter((user) => user.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting user:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search users..." value={search} onChange={setSearch} />
      </div>

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>User List</CardTitle>
              <CardDescription>All registered users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tasks</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.taskCount}</TableCell>
                      <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
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

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
