"use client"

import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ListTodo, CheckCircle, TrendingUp } from "lucide-react"
import { Bar, BarChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const tasksPerMonthData = [
  { month: "Jan", tasks: 45 },
  { month: "Feb", tasks: 52 },
  { month: "Mar", tasks: 48 },
  { month: "Apr", tasks: 61 },
  { month: "May", tasks: 55 },
  { month: "Jun", tasks: 67 },
]

const statusDistributionData = [
  { name: "Pending", value: 35, color: "hsl(var(--chart-2))" },
  { name: "In Progress", value: 45, color: "hsl(var(--chart-3))" },
  { name: "Completed", value: 20, color: "hsl(var(--chart-1))" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage platform statistics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="342"
          icon={<Users className="h-4 w-4" />}
          description="+12% from last month"
        />
        <StatsCard
          title="Total Tasks"
          value="1,284"
          icon={<ListTodo className="h-4 w-4" />}
          description="+8% from last month"
        />
        <StatsCard
          title="Completed Tasks"
          value="856"
          icon={<CheckCircle className="h-4 w-4" />}
          description="66.7% completion rate"
        />
        <StatsCard
          title="Active Rate"
          value="89%"
          icon={<TrendingUp className="h-4 w-4" />}
          description="+2% from last month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasks Per Month</CardTitle>
            <CardDescription>Number of tasks created each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksPerMonthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="tasks" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Task breakdown by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
