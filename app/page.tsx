"use client"

import Link from "next/link"
import { CheckCircle2, ListTodo, Calendar, Bell, ArrowRight, Zap, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocale } from "@/components/locale-provider"
import { translations } from "@/lib/i18n"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LandingPage() {
  const { locale } = useLocale()
  const t = (key: keyof typeof translations.en) => translations[locale][key] || key

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-950 dark:via-blue-950/10 dark:to-gray-950">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A] to-blue-600 shadow-lg">
              <ListTodo className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1E3A8A] to-blue-600 bg-clip-text text-transparent">
              Planit
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" asChild className="text-gray-700 dark:text-gray-300">
              <Link href="/auth/login">{t("landing.login")}</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-[#1E3A8A] to-blue-600 hover:from-[#1E3A8A]/90 hover:to-blue-600/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/auth/register">{t("landing.register")}</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Hero Content */}
          <div className="text-center mb-20">
            <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1E3A8A] to-blue-600 shadow-2xl animate-pulse">
              <CheckCircle2 className="h-14 w-14 text-white" />
            </div>

            <h1 className="mb-6 text-5xl font-bold text-pretty text-gray-900 dark:text-white md:text-7xl leading-tight">
              {t("landing.title")}
            </h1>

            <p className="mb-10 text-balance text-xl text-gray-600 dark:text-gray-400 md:text-2xl max-w-3xl mx-auto">
              {t("landing.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#1E3A8A] to-blue-600 hover:from-[#1E3A8A]/90 hover:to-blue-600/90 text-white rounded-full px-10 py-7 text-lg shadow-2xl hover:shadow-3xl transition-all group"
              >
                <Link href="/auth/login">
                  {t("landing.cta")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Team Collaboration</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-3 mb-20">
            <Card className="p-8 text-left border-2 border-gray-100 dark:border-gray-800 hover:border-[#1E3A8A]/30 dark:hover:border-blue-400/30 hover:shadow-2xl transition-all duration-300 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 group-hover:scale-110 transition-transform">
                <ListTodo className="h-8 w-8 text-[#1E3A8A] dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t("landing.feature1.title")}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t("landing.feature1.desc")}</p>
            </Card>

            <Card className="p-8 text-left border-2 border-gray-100 dark:border-gray-800 hover:border-[#1E3A8A]/30 dark:hover:border-blue-400/30 hover:shadow-2xl transition-all duration-300 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-[#1E3A8A] dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t("landing.feature2.title")}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t("landing.feature2.desc")}</p>
            </Card>

            <Card className="p-8 text-left border-2 border-gray-100 dark:border-gray-800 hover:border-[#1E3A8A]/30 dark:hover:border-blue-400/30 hover:shadow-2xl transition-all duration-300 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 group-hover:scale-110 transition-transform">
                <Bell className="h-8 w-8 text-[#1E3A8A] dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t("landing.feature3.title")}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t("landing.feature3.desc")}</p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16 px-8 rounded-3xl bg-gradient-to-r from-[#1E3A8A] to-blue-600 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get organized?</h2>
            <p className="text-lg mb-8 text-blue-100">Join thousands of productive users today</p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-10 py-6 text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Link href="/auth/register">{t("landing.cta")}</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E3A8A]">
              <ListTodo className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E3A8A] dark:text-blue-400">Planit</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{t("landing.footer")}</p>
        </div>
      </footer>
    </div>
  )
}
