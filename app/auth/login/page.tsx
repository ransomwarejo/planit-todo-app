import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { CheckSquare } from "lucide-react"

export default function LoginPage() {
  return (
    /* Updated auth page styling to match landing page with gradient background and logo */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <CheckSquare className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold">Planit</span>
          </Link>
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground mt-4">
          {"Don't have an account? "}
          <Link href="/auth/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
