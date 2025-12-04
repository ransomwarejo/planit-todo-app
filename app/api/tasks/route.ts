import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://planit-mfzh.onrender.com/api"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "0"
    const size = searchParams.get("size") || "20"
    const search = searchParams.get("search") || ""
    const sort = searchParams.get("sort") || ""

    let url = `${API_BASE_URL}/tasks?page=${page}&size=${size}`
    if (search) url += `&search=${search}`
    if (sort) url += `&sort=${sort}`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch tasks" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: errorText || "Failed to create task" }, { status: response.status })
    }

    const taskId = await response.text()

    return NextResponse.json({ id: taskId.replace(/"/g, "") })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
