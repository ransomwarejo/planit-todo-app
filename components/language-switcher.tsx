"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/components/locale-provider"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <Button variant="ghost" size="sm" onClick={() => setLocale(locale === "en" ? "fr" : "en")} className="gap-2">
      <Globe className="h-4 w-4" />
      {locale === "en" ? "FR" : "EN"}
    </Button>
  )
}
