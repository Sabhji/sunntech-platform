"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, DollarSign, Clock, ArrowRight, Terminal, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { projects } from "@/data/projects"

export default function ProjectsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('sunntech_authenticated')
    setIsAuthenticated(auth === 'true')
  }, [])

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))]
  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesLevel = selectedLevel === "All" || project.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col matrix-bg">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="terminal-window p-8 hacker-border max-w-md w-full">
            <div className="terminal-header mb-6">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/security</span>
            </div>
            <div className="text-center">
              <Lock className="h-16 w-16 text-primary mx-auto mb-4 glitch" />
              <h2 className="text-2xl font-bold terminal-text glitch mb-2">
                <span className="text-primary">{">"}</span> ACCESS_DENIED
              </h2>
              <p className="text-muted-foreground terminal-text mb-6">
                Authentication required to view classified missions
              </p>
              <Button className="cyber-button w-full" onClick={() => window.location.href = '/login'}>
                <Terminal className="mr-2 h-4 w-4" />
                AUTHENTICATE
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold terminal-text glitch mb-4">
              <span className="text-primary">{">"}</span> CLASSIFIED_MISSIONS
            </h1>
            <p className="text-muted-foreground terminal-text">Find the perfect operation to build your cybersecurity portfolio</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
              <Input
                placeholder="Search operations by title, description, or skills..."
                className="pl-10 hacker-border bg-background/50 terminal-text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium terminal-text">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      className={selectedCategory === category ? "cyber-button" : "cyber-button variant-outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium terminal-text">Level:</span>
                <div className="flex flex-wrap gap-2">
                  {levels.map(level => (
                    <Button
                      key={level}
                      className={selectedLevel === level ? "cyber-button" : "cyber-button variant-outline"}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground terminal-text">
              <span className="text-primary">{">"}</span> Displaying {filteredProjects.length} of {projects.length} classified operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hacker-border terminal-window hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="cyber-button text-xs">{project.category}</Badge>
                    <Badge className={project.level === "Beginner" ? "bg-green-500/20 text-green-400 border border-green-500" : "cyber-button text-xs"}>
                      {project.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg terminal-text">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2 terminal-text">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 terminal-text">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      {project.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      {project.duration}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} className="cyber-button text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {project.skills.length > 3 && (
                      <Badge className="cyber-button text-xs">
                        +{project.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground terminal-text">
                      Posted by {project.postedBy}
                    </span>
                    <Badge className={project.status === "Open" ? "bg-green-500/20 text-green-400 border border-green-500" : "cyber-button text-xs"}>
                      {project.status}
                    </Badge>
                  </div>
                  <Button className="w-full cyber-button" asChild>
                    <Link href={`/projects/${project.id}`}>
                      <Terminal className="mr-2 h-4 w-4" />
                      ACCESS <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground terminal-text mb-4">No operations found matching your criteria.</p>
              <Button className="cyber-button" onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setSelectedLevel("All")
              }}>
                CLEAR_FILTERS
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
