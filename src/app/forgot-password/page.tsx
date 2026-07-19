"use client"

import { useState } from "react"
import { Terminal, Lock, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
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
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/auth/recovery</span>
            </div>

            <div className="mb-6">
              <Link href="/login" className="inline-flex items-center text-sm text-primary hover:underline terminal-text">
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK_TO_LOGIN
              </Link>
            </div>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <Lock className="h-12 w-12 text-primary mx-auto mb-4 glitch" />
                  <h1 className="text-2xl font-bold terminal-text glitch mb-2">
                    <span className="text-primary">{">"}</span> CREDENTIAL_RECOVERY
                  </h1>
                  <p className="text-sm text-muted-foreground terminal-text">
                    Enter your email to reset access credentials
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 terminal-text">
                      <span className="text-primary">{">"}</span> EMAIL_ADDRESS
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 hacker-border bg-background/50 terminal-text"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full cyber-button" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Terminal className="mr-2 h-4 w-4 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      <>
                        <Terminal className="mr-2 h-4 w-4" />
                        SEND_RESET_LINK
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground terminal-text">
                      Remember credentials?{" "}
                      <Link href="/login" className="text-primary hover:underline">
                        Authenticate
                      </Link>
                    </p>
                  </div>
                </form>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5" />
                    <p className="text-xs text-muted-foreground terminal-text">
                      <span className="text-primary">[SECURITY]</span> Reset link will be sent to your registered email. Link expires in 1 hour for security.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4 glitch" />
                <h2 className="text-xl font-bold terminal-text glitch mb-2">
                  <span className="text-primary">{">"}</span> RECOVERY_INITIATED
                </h2>
                <p className="text-sm text-muted-foreground terminal-text mb-6">
                  Reset link sent to: <span className="text-primary">{email}</span>
                </p>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded mb-6">
                  <p className="text-xs text-muted-foreground terminal-text">
                    <span className="text-primary">[INFO]</span> Check your inbox and follow the secure link to reset your credentials.
                  </p>
                </div>
                <Button className="cyber-button" onClick={() => setIsSubmitted(false)}>
                  <Terminal className="mr-2 h-4 w-4" />
                  SEND_ANOTHER
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
