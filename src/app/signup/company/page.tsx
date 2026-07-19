"use client"

import { useState } from "react"
import { Terminal, Lock, Building2, Mail, Eye, EyeOff, AlertCircle, CheckCircle, Briefcase, MapPin, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CompanySignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactPerson: "",
    phone: "",
    location: "",
    website: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("ERROR: Passwords do not match!")
      return
    }
    if (formData.password.length < 8) {
      alert("ERROR: Password must be at least 8 characters!")
      return
    }
    console.log("Company signup attempt:", formData)
    
    // Store company data in localStorage for simulation
    const userData = {
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      location: formData.location,
      website: formData.website,
      userType: "company",
      createdAt: new Date().toISOString()
    }
    localStorage.setItem('sunntech_company', JSON.stringify(userData))
    
    alert("SUCCESS: Company account initialized! Redirecting to login...")
    setTimeout(() => {
      window.location.href = '/login/company'
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-lg">
          <div className="terminal-window p-8 hacker-border">
            <div className="terminal-header mb-6">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/auth/company</span>
            </div>

            <div className="text-center mb-8">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4 glitch" />
              <h1 className="text-2xl font-bold terminal-text glitch mb-2">
                <span className="text-primary">{">"}</span> INITIALIZE_COMPANY_ACCOUNT
              </h1>
              <p className="text-sm text-muted-foreground terminal-text">
                Create your company profile to post cybersecurity projects
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> COMPANY_NAME
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> CONTACT_PERSON
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="contactPerson"
                    type="text"
                    placeholder="Full name of contact person"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> COMPANY_EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="company@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> PHONE_NUMBER
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> COMPANY_LOCATION
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> WEBSITE (OPTIONAL)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="pl-10 hacker-border bg-background/50 terminal-text"
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
                    placeholder="Create password (min 8 characters)"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> CONFIRM_PASSWORD
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 hacker-border bg-background/50 terminal-text"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-primary hover:text-primary/80"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input type="checkbox" className="rounded border-primary bg-background mt-1" required />
                <label className="text-sm text-muted-foreground terminal-text">
                  I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
                </label>
              </div>

              <Button type="submit" className="w-full cyber-button">
                <Terminal className="mr-2 h-4 w-4" />
                INITIALIZE
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground terminal-text">
                  Already have an account?{" "}
                  <Link href="/login/company" className="text-primary hover:underline">
                    Authenticate
                  </Link>
                </p>
              </div>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground terminal-text mb-2">
                  Are you a freelancer?
                </p>
                <Link href="/signup/freelancer">
                  <Button className="cyber-button" variant="outline" size="sm">
                    <Terminal className="mr-2 h-4 w-4" />
                    FREELANCER_SIGNUP
                  </Button>
                </Link>
              </div>
            </form>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-xs text-muted-foreground terminal-text">
                  <span className="text-primary">[SECURITY]</span> Your company account will be encrypted with military-grade encryption. All data is protected.
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
