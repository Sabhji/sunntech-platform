"use client"

import Link from "next/link"
import { DollarSign, Clock, User, Calendar, ArrowLeft, CheckCircle, Terminal, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { projects } from "@/data/projects"
import { useState, useEffect } from "react"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showBetaMessage, setShowBetaMessage] = useState(false)
  const project = projects.find(p => p.id === params.id)

  // Check authentication on mount
  useEffect(() => {
    const auth = localStorage.getItem('sunntech_authenticated')
    setIsAuthenticated(auth === 'true')
  }, [])

  const handleApply = () => {
    if (!isAuthenticated) {
      alert("ERROR: Authentication required! Please login to apply for missions.")
      window.location.href = '/login'
      return
    }
    setShowBetaMessage(true)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <Button asChild>
              <Link href="/projects">Back to Projects</Link>
            </Button>
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
          <Button variant="ghost" asChild className="mb-6 cyber-button">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="terminal-text">BACK_TO_MISSIONS</span>
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="hacker-border terminal-window">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="cyber-button text-sm">{project.category}</Badge>
                    <Badge className={project.level === "Beginner" ? "bg-green-500/20 text-green-400 border border-green-500" : "cyber-button text-sm"}>
                      {project.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl terminal-text glitch">{project.title}</CardTitle>
                  <CardDescription className="text-base terminal-text">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 terminal-text"><span className="text-primary">{">"}</span> REQUIRED_SKILLS</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge key={skill} className="cyber-button text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 terminal-text"><span className="text-primary">{">"}</span> MISSION_DETAILS</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground terminal-text">Budget</p>
                          <p className="font-medium terminal-text">{project.budget}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground terminal-text">Duration</p>
                          <p className="font-medium terminal-text">{project.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground terminal-text">Posted By</p>
                          <p className="font-medium terminal-text">{project.postedBy}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground terminal-text">Posted Date</p>
                          <p className="font-medium terminal-text">{new Date(project.postedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 terminal-text"><span className="text-primary">{">"}</span> LEARNING_OUTCOMES</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm terminal-text">Hands-on experience with real-world cybersecurity scenarios</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm terminal-text">Build your professional portfolio</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm terminal-text">Network with industry professionals</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm terminal-text">Earn competitive compensation</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4 hacker-border terminal-window">
                <CardHeader>
                  <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> APPLY_FOR_MISSION</CardTitle>
                  <CardDescription className="terminal-text">
                    {project.status === "Open" ? "This mission is currently accepting applications" : "This mission is not currently accepting applications"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/50 border border-border rounded">
                    <span className="text-sm font-medium terminal-text">Status</span>
                    <Badge className={project.status === "Open" ? "bg-green-500/20 text-green-400 border border-green-500" : "cyber-button text-xs"}>
                      {project.status}
                    </Badge>
                  </div>

                  {showBetaMessage && (
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium terminal-text text-yellow-400">BETA_VERSION</p>
                          <p className="text-xs text-muted-foreground terminal-text mt-1">
                            Application system is currently in beta testing. Full integration with backend database coming soon.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.status === "Open" ? (
                    <>
                      <Button className="w-full cyber-button" size="lg" onClick={handleApply}>
                        <Terminal className="mr-2 h-4 w-4" />
                        APPLY_NOW
                      </Button>
                      <Button className="w-full cyber-button" variant="outline">
                        SAVE_MISSION
                      </Button>
                      <Button className="w-full cyber-button" variant="outline">
                        SHARE_MISSION
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full cyber-button" size="lg" disabled>
                      NOT_ACCEPTING_APPLICATIONS
                    </Button>
                  )}

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2 terminal-text">
                      Need assistance with your application?
                    </p>
                    <Button variant="link" className="p-0 h-auto cyber-button" asChild>
                      <Link href="/contact">CONTACT_SUPPORT</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
