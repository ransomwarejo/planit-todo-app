import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://planit-mfzh.onrender.com/api"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 404) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch task" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    console.log("[v0] PUT request body:", JSON.stringify(body, null, 2))

    const response = await fetch(`${API_BASE_URL}/tasks/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    console.log("[v0] PUT response status:", response.status)
    const responseText = await response.text()
    console.log("[v0] PUT response body:", responseText)

    if (!response.ok) {
      console.error(`[v0] PUT failed with status ${response.status} and body:`, responseText)
      return NextResponse.json({ error: "Failed to update task" }, { status: response.status })
    }

    const contentType = response.headers.get("content-type")

    if (!responseText || !contentType?.includes("application/json")) {
      return NextResponse.json({ ...body, id: params.id })
    }

    const data = JSON.parse(responseText)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("[v0] DELETE request for task:", params.id)

    const response = await fetch(`${API_BASE_URL}/tasks/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    })

    console.log("[v0] DELETE response status:", response.status)

    if (response.ok || response.status === 204) {
      return NextResponse.json({ success: true })
    }

    const responseText = await response.text()
    console.error(`[v0] DELETE failed with status ${response.status} and body:`, responseText)

    return NextResponse.json({ error: "Failed to delete task" }, { status: response.status })
  } catch (error) {
    console.error("[v0] Error deleting task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
