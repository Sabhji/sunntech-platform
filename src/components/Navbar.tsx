"use client"

import Link from "next/link"
import { Shield, Menu, X, Terminal, User, LogIn, Code, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<"freelancer" | "company" | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem('sunntech_authenticated')
    const type = localStorage.getItem('sunntech_user_type') as "freelancer" | "company" | null
    setIsAuthenticated(auth === 'true')
    setUserType(type)
  }, [])

  return (
    <nav className="hacker-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <Terminal className="h-6 w-6 text-primary group-hover:glitch" />
            <span className="text-xl font-bold terminal-text glitch">SUNNTECH</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> HOME
            </Link>
            <Link href="/projects" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> PROJECTS
            </Link>
            {isAuthenticated && userType === 'freelancer' && (
              <Link href="/freelancer/dashboard" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
                <span className="text-primary">{">"}</span> DASHBOARD
              </Link>
            )}
            {isAuthenticated && userType === 'company' && (
              <>
                <Link href="/company/dashboard" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> DASHBOARD
                </Link>
                <Link href="/company/post-project" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> POST_PROJECT
                </Link>
              </>
            )}
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> ABOUT
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> CONTACT
            </Link>
            {!isAuthenticated ? (
              <>
                <Link href="/login/freelancer" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> FREELANCER_LOGIN
                </Link>
                <Link href="/login/company" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> COMPANY_LOGIN
                </Link>
              </>
            ) : (
              <Button className="cyber-button" onClick={() => {
                localStorage.removeItem('sunntech_authenticated')
                localStorage.removeItem('sunntech_user_type')
                window.location.href = '/'
              }}>
                <LogIn className="mr-2 h-4 w-4" />
                LOGOUT
              </Button>
            )}
          </div>

          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 terminal-window">
            <Link href="/" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> HOME
            </Link>
            <Link href="/projects" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> PROJECTS
            </Link>
            {isAuthenticated && userType === 'freelancer' && (
              <Link href="/freelancer/dashboard" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
                <span className="text-primary">{">"}</span> DASHBOARD
              </Link>
            )}
            {isAuthenticated && userType === 'company' && (
              <>
                <Link href="/company/dashboard" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> DASHBOARD
                </Link>
                <Link href="/company/post-project" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> POST_PROJECT
                </Link>
              </>
            )}
            <Link href="/about" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> ABOUT
            </Link>
            <Link href="/contact" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> CONTACT
            </Link>
            {!isAuthenticated ? (
              <>
                <Link href="/login/freelancer" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> FREELANCER_LOGIN
                </Link>
                <Link href="/login/company" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
                  <span className="text-primary">{">"}</span> COMPANY_LOGIN
                </Link>
              </>
            ) : (
              <Button className="w-full cyber-button" onClick={() => {
                localStorage.removeItem('sunntech_authenticated')
                localStorage.removeItem('sunntech_user_type')
                window.location.href = '/'
              }}>
                <LogIn className="mr-2 h-4 w-4" />
                LOGOUT
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
