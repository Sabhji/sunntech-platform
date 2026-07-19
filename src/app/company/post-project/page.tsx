"use client"

import { useState, useEffect } from "react"
import { Terminal, Briefcase, DollarSign, Clock, MapPin, AlertTriangle, CheckCircle, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PostProjectPage() {
  const [user, setUser] = useState<any>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    budget: "",
    duration: "",
    deadline: "",
    requirements: "",
    deliverables: ""
  })

  const categories = ["Penetration Testing", "Vulnerability Assessment", "Security Auditing", "Incident Response", "Malware Analysis", "Network Security", "Web Application Security", "Mobile Security"]
  const levels = ["Beginner", "Intermediate", "Advanced"]

  useEffect(() => {
    const storedUser = localStorage.getItem('sunntech_company')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      window.location.href = '/login/company'
    }
  }, [])

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (skills.length === 0) {
      alert("ERROR: Please add at least one required skill!")
      return
    }

    const projectData = {
      ...formData,
      skills,
      postedBy: user?.companyName || "Unknown Company",
      status: "Open",
      postedDate: new Date().toISOString()
    }

    console.log("Project posted:", projectData)
    
    // Store in localStorage for simulation
    const existingProjects = JSON.parse(localStorage.getItem('sunntech_projects') || '[]')
    existingProjects.push(projectData)
    localStorage.setItem('sunntech_projects', JSON.stringify(existingProjects))
    
    alert("SUCCESS: Project posted successfully! Redirecting to dashboard...")
    setTimeout(() => {
      window.location.href = '/company/dashboard'
    }, 1500)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center terminal-text">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="terminal-window p-8 hacker-border">
            <div className="terminal-header mb-6">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/company/post-project</span>
            </div>

            <div className="mb-6">
              <Link href="/company/dashboard" className="inline-flex items-center text-sm text-primary hover:underline terminal-text">
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK_TO_DASHBOARD
              </Link>
            </div>

            <div className="text-center mb-8">
              <Briefcase className="h-12 w-12 text-primary mx-auto mb-4 glitch" />
              <h1 className="text-3xl font-bold terminal-text glitch mb-2">
                <span className="text-primary">{">"}</span> POST_NEW_PROJECT
              </h1>
              <p className="text-sm text-muted-foreground terminal-text">
                Create a detailed cybersecurity project listing
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> PROJECT_TITLE
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="hacker-border bg-background/50 terminal-text"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> PROJECT_DESCRIPTION
                </label>
                <textarea
                  id="description"
                  placeholder="Provide a detailed description of the project..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-[120px] p-3 hacker-border bg-background/50 terminal-text rounded-md resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2 terminal-text">
                    <span className="text-primary">{">"}</span> CATEGORY
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 hacker-border bg-background/50 terminal-text rounded-md"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium mb-2 terminal-text">
                    <span className="text-primary">{">"}</span> DIFFICULTY_LEVEL
                  </label>
                  <select
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full p-3 hacker-border bg-background/50 terminal-text rounded-md"
                    required
                  >
                    <option value="">Select level</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium mb-2 terminal-text">
                    <span className="text-primary">{">"}</span> BUDGET
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="budget"
                      type="text"
                      placeholder="e.g., $500-1000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="pl-10 hacker-border bg-background/50 terminal-text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium mb-2 terminal-text">
                    <span className="text-primary">{">"}</span> DURATION
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-primary" />
                    <Input
                      id="duration"
                      type="text"
                      placeholder="e.g., 2-3 weeks"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="pl-10 hacker-border bg-background/50 terminal-text"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium mb-2 terminal-text">
                    <span className="text-primary">{">"}</span> DEADLINE
                  </label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="hacker-border bg-background/50 terminal-text"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> REQUIREMENTS
                </label>
                <textarea
                  id="requirements"
                  placeholder="List specific requirements for this project..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full min-h-[100px] p-3 hacker-border bg-background/50 terminal-text rounded-md resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="deliverables" className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> DELIVERABLES
                </label>
                <textarea
                  id="deliverables"
                  placeholder="What should the freelancer deliver? (reports, documentation, etc.)"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full min-h-[100px] p-3 hacker-border bg-background/50 terminal-text rounded-md resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 terminal-text">
                  <span className="text-primary">{">"}</span> REQUIRED_SKILLS
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    type="text"
                    placeholder="Add a skill (e.g., Python, Network Security)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="hacker-border bg-background/50 terminal-text"
                  />
                  <Button type="button" onClick={addSkill} className="cyber-button">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} className="cyber-button flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-400"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary mt-0.5" />
                  <p className="text-xs text-muted-foreground terminal-text">
                    <span className="text-primary">[INFO]</span> Your project will be visible to all verified freelancers. Make sure to provide accurate details to attract qualified candidates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1 cyber-button">
                  <Terminal className="mr-2 h-4 w-4" />
                  POST_PROJECT
                </Button>
                <Link href="/company/dashboard" className="flex-1">
                  <Button className="w-full cyber-button" variant="outline">
                    CANCEL
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
