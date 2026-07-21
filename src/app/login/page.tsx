"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Terminal, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      setError("An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="terminal-window p-8 hacker-border">
            <div className="terminal-header mb-6">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/auth</span>
            </div>

            <div className="text-center mb-8">
              <Terminal className="h-12 w-12 text-primary mx-auto mb-4 glitch" />
              <h1 className="text-2xl font-bold terminal-text glitch mb-2">
                <span className="text-primary">{">"}</span> SYSTEM_ACCESS
              </h1>
              <p className="text-sm text-muted-foreground terminal-text">
                Authenticate to access secure operations
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm terminal-text">
                  <span className="text-primary">{">"}</span> {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-primary hover:text-primary/80"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 terminal-text cursor-pointer">
                  <input type="checkbox" className="rounded border-primary bg-background" />
                  <span>Remember session</span>
                </label>
                <Link href="/forgot-password" className="text-primary hover:underline terminal-text">
                  Lost credentials?
                </Link>
              </div>

              <Button type="submit" disabled={loading} className="w-full cyber-button">
                <Terminal className="mr-2 h-4 w-4" />
                {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground terminal-text">
                  New operator?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Initialize account
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-xs text-muted-foreground terminal-text">
                  <span className="text-primary">[SECURITY]</span> All login attempts are monitored and logged. Unauthorized access will be blocked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
