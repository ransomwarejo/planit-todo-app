import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://planit-mfzh.onrender.com/api"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const params = await Promise.resolve(context.params)
    const id = params.id

    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
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

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const params = await Promise.resolve(context.params)
    const id = params.id

    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`PUT failed with status ${response.status}:`, errorText)
      return NextResponse.json({ error: "Failed to update task", details: errorText }, { status: response.status })
    }

    const contentType = response.headers.get("content-type")
    const responseText = await response.text()

    if (!responseText || !contentType?.includes("application/json")) {
      return NextResponse.json({ ...body, id }, { status: 200 })
    }

    const data = JSON.parse(responseText)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const params = await Promise.resolve(context.params)
    const id = params.id

    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
      },
    })

    if (response.ok || response.status === 204) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const responseText = await response.text()
    console.error(`DELETE failed with status ${response.status}:`, responseText)

    return NextResponse.json({ error: "Failed to delete task", details: responseText }, { status: response.status })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json(
      { error: "Internal server error", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
