"use client"

import { useState } from "react"
import { Terminal, Lock, User, Eye, EyeOff, AlertCircle, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function FreelancerLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check localStorage for freelancer data
    const storedUser = localStorage.getItem('sunntech_freelancer')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (formData.username === userData.username && formData.password === userData.password) {
        localStorage.setItem('sunntech_authenticated', 'true')
        localStorage.setItem('sunntech_user_type', 'freelancer')
        alert("SUCCESS: Freelancer authentication verified! Access granted.")
        setTimeout(() => {
          window.location.href = '/freelancer/dashboard'
        }, 1000)
        return
      }
    }
    
    alert("ERROR: Invalid credentials! Access denied.")
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
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/auth/freelancer</span>
            </div>

            <div className="text-center mb-8">
              <Code className="h-12 w-12 text-primary mx-auto mb-4 glitch" />
              <h1 className="text-2xl font-bold terminal-text glitch mb-2">
                <span className="text-primary">{">"}</span> FREELANCER_ACCESS
              </h1>
              <p className="text-sm text-muted-foreground terminal-text">
                Authenticate as a cybersecurity freelancer
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
                  New freelancer?{" "}
                  <Link href="/signup/freelancer" className="text-primary hover:underline">
                    Initialize account
                  </Link>
                </p>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground terminal-text mb-2">
                  Are you a company?
                </p>
                <Link href="/login/company">
                  <Button className="cyber-button" variant="outline" size="sm">
                    <Terminal className="mr-2 h-4 w-4" />
                    COMPANY_LOGIN
                  </Button>
                </Link>
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
