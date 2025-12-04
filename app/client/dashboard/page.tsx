"use client"

import { StatsCard } from "@/components/stats-card"
import { CheckCircle, Circle, Clock, ListTodo } from "lucide-react"
import { useEffect, useState } from "react"
import { getTasks } from "@/lib/api"
import { useLocale } from "@/components/locale-provider"
import { translations } from "@/lib/i18n"

export default function ClientDashboard() {
  const { locale } = useLocale()
  const t = (key: keyof typeof translations.en) => translations[locale][key] || key

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTasks(0, 100)
        const tasks = data.content

        setStats({
          total: tasks.length,
          pending: tasks.filter((t) => t.status === "PENDING").length,
          inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
          completed: tasks.filter((t) => t.status === "DONE").length,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("dashboard.total")}
          value={loading ? "..." : stats.total.toString()}
          icon={<ListTodo className="h-4 w-4" />}
        />
        <StatsCard
          title={t("dashboard.pending")}
          value={loading ? "..." : stats.pending.toString()}
          icon={<Circle className="h-4 w-4" />}
        />
        <StatsCard
          title={t("dashboard.inProgress")}
          value={loading ? "..." : stats.inProgress.toString()}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatsCard
          title={t("dashboard.completed")}
          value={loading ? "..." : stats.completed.toString()}
          icon={<CheckCircle className="h-4 w-4" />}
        />
      </div>
    </div>
  )
}
