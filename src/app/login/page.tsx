"use client"

import { useState } from "react"
import { Terminal, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    alert("Authentication simulated. In production, this would connect to your backend.")
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
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> USERNAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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

              <Button type="submit" className="w-full cyber-button">
                <Terminal className="mr-2 h-4 w-4" />
                AUTHENTICATE
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
