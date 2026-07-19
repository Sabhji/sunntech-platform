"use client"

import Link from "next/link"
import { Shield, Menu, X, Terminal, User, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

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
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> DASHBOARD
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> ABOUT
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> CONTACT
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> LOGIN
            </Link>
            <Button className="cyber-button">
              <Terminal className="mr-2 h-4 w-4" />
              POST PROJECT
            </Button>
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
            <Link href="/dashboard" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> DASHBOARD
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> ABOUT
            </Link>
            <Link href="/contact" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> CONTACT
            </Link>
            <Link href="/login" className="block text-sm font-medium hover:text-primary transition-colors terminal-text">
              <span className="text-primary">{">"}</span> LOGIN
            </Link>
            <Button className="w-full cyber-button">
              <Terminal className="mr-2 h-4 w-4" />
              POST PROJECT
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
