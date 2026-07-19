"use client"

import { useState, useEffect } from "react"
import { Terminal, Building2, Mail, MapPin, Shield, Award, Clock, TrendingUp, Edit, LogOut, Cpu, Lock, Zap, CheckCircle, XCircle, Briefcase, Plus, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function CompanyDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('sunntech_company')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      window.location.href = '/login/company'
    }
  }, [])

  const companyStats = {
    postedProjects: 8,
    totalBudget: "$15,000",
    activeProjects: 3,
    completedProjects: 5
  }

  const postedProjects = [
    { id: 1, title: "Web App Penetration Test", budget: "$500", status: "Open", applicants: 12, date: "2 days ago" },
    { id: 2, title: "Network Security Audit", budget: "$800", status: "In Progress", applicants: 8, date: "1 week ago" },
    { id: 3, title: "Mobile App Security", budget: "$600", status: "Closed", applicants: 15, date: "2 weeks ago" }
  ]

  const recentApplications = [
    { id: 1, project: "Web App Penetration Test", freelancer: "John Doe", status: "Pending", date: "2 hours ago" },
    { id: 2, project: "Web App Penetration Test", freelancer: "Jane Smith", status: "Pending", date: "5 hours ago" },
    { id: 3, project: "Network Security Audit", freelancer: "Mike Johnson", status: "Accepted", date: "1 day ago" }
  ]

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center terminal-text">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="terminal-window p-8 hacker-border mb-8">
            <div className="terminal-header mb-6">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/company/dashboard</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold terminal-text glitch">{user.companyName}</h2>
                  <p className="text-muted-foreground terminal-text">{user.contactPerson}</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge className="cyber-button text-xs">COMPANY</Badge>
                    <Badge className="cyber-button text-xs">VERIFIED</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 terminal-text">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 terminal-text">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3 terminal-text">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Member since {new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button className="w-full cyber-button" variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    EDIT_PROFILE
                  </Button>
                  <Button className="w-full cyber-button" variant="outline" onClick={() => {
                    localStorage.removeItem('sunntech_authenticated')
                    localStorage.removeItem('sunntech_user_type')
                    window.location.href = '/'
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    LOGOUT
                  </Button>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="flex gap-4 mb-6 border-b border-border pb-4">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`terminal-text ${activeTab === "overview" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <span className="text-primary">{">"}</span> OVERVIEW
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`terminal-text ${activeTab === "projects" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <span className="text-primary">{">"}</span> MY_PROJECTS
                  </button>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className={`terminal-text ${activeTab === "applications" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <span className="text-primary">{">"}</span> APPLICATIONS
                  </button>
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{companyStats.postedProjects}</CardTitle>
                          <CardDescription className="terminal-text">Posted</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{companyStats.totalBudget}</CardTitle>
                          <CardDescription className="terminal-text">Total Budget</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{companyStats.activeProjects}</CardTitle>
                          <CardDescription className="terminal-text">Active</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{companyStats.completedProjects}</CardTitle>
                          <CardDescription className="terminal-text">Completed</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>

                    <Link href="/company/post-project">
                      <Button className="w-full cyber-button">
                        <Plus className="mr-2 h-4 w-4" />
                        POST_NEW_PROJECT
                      </Button>
                    </Link>

                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> RECENT_PROJECTS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {postedProjects.map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-3 bg-background/50 rounded border border-border">
                              <div className="flex items-center gap-3">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="terminal-text font-medium">{project.title}</p>
                                  <p className="text-xs text-muted-foreground terminal-text">{project.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={project.status === "Open" ? "bg-green-500/20 text-green-400 border border-green-500" : project.status === "In Progress" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500" : "bg-red-500/20 text-red-400 border border-red-500"} text-xs>
                                  {project.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground terminal-text">{project.applicants} applicants</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "projects" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="terminal-text text-lg"><span className="text-primary">{">"}</span> ALL_POSTED_PROJECTS</h3>
                      <Link href="/company/post-project">
                        <Button className="cyber-button" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          NEW_PROJECT
                        </Button>
                      </Link>
                    </div>

                    <Card className="hacker-border terminal-window">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          {postedProjects.map((project) => (
                            <div key={project.id} className="p-4 bg-background/50 rounded border border-border">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="terminal-text font-medium">{project.title}</h3>
                                <Badge className={project.status === "Open" ? "bg-green-500/20 text-green-400 border border-green-500" : project.status === "In Progress" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500" : "bg-red-500/20 text-red-400 border border-red-500"} text-xs>
                                  {project.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground terminal-text mb-2">
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>{project.budget}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{project.applicants} applicants</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-text">
                                <Clock className="h-3 w-3" />
                                <span>{project.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "applications" && (
                  <div className="space-y-4">
                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> RECEIVED_APPLICATIONS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {recentApplications.map((app) => (
                            <div key={app.id} className="p-4 bg-background/50 rounded border border-border">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="terminal-text font-medium">{app.freelancer}</h3>
                                  <p className="text-xs text-muted-foreground terminal-text">Applied for: {app.project}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Badge className={app.status === "Pending" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500" : "bg-green-500/20 text-green-400 border border-green-500"} text-xs>
                                    {app.status}
                                  </Badge>
                                  {app.status === "Pending" && (
                                    <>
                                      <Button className="cyber-button text-xs" size="sm">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Accept
                                      </Button>
                                      <Button className="cyber-button text-xs" size="sm" variant="outline">
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-text">
                                <Clock className="h-3 w-3" />
                                <span>{app.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
