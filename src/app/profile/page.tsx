"use client"

import { useState } from "react"
import { Terminal, User, Mail, MapPin, Shield, Award, Clock, TrendingUp, Edit, LogOut, Cpu, Lock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const userStats = {
    completedMissions: 12,
    totalEarnings: "$4,500",
    successRate: "95%",
    reputation: 4.8
  }

  const recentActivity = [
    { id: 1, type: "mission", title: "Web App Penetration Test", status: "Completed", date: "2 days ago" },
    { id: 2, type: "mission", title: "Network Security Audit", status: "In Progress", date: "1 week ago" },
    { id: 3, type: "achievement", title: "Bug Bounty Hunter", status: "Earned", date: "2 weeks ago" }
  ]

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
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/profile</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold terminal-text glitch">OPERATOR_ZERO</h2>
                  <p className="text-muted-foreground terminal-text">Elite Security Specialist</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge className="cyber-button text-xs">Level 5</Badge>
                    <Badge className="cyber-button text-xs">Verified</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 terminal-text">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm">operator@sunntech.in</span>
                  </div>
                  <div className="flex items-center gap-3 terminal-text">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">India</span>
                  </div>
                  <div className="flex items-center gap-3 terminal-text">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm">Member since Jan 2024</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button className="w-full cyber-button" variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    EDIT_PROFILE
                  </Button>
                  <Button className="w-full cyber-button" variant="outline">
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
                    onClick={() => setActiveTab("missions")}
                    className={`terminal-text ${activeTab === "missions" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <span className="text-primary">{">"}</span> MISSIONS
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`terminal-text ${activeTab === "skills" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    <span className="text-primary">{">"}</span> SKILLS
                  </button>
                </div>

                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{userStats.completedMissions}</CardTitle>
                          <CardDescription className="terminal-text">Missions</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{userStats.totalEarnings}</CardTitle>
                          <CardDescription className="terminal-text">Earnings</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{userStats.successRate}</CardTitle>
                          <CardDescription className="terminal-text">Success Rate</CardDescription>
                        </CardHeader>
                      </Card>
                      <Card className="hacker-border terminal-window">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-2xl terminal-text">{userStats.reputation}</CardTitle>
                          <CardDescription className="terminal-text">Reputation</CardDescription>
                        </CardHeader>
                      </Card>
                    </div>

                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> RECENT_ACTIVITY</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-3 bg-background/50 rounded border border-border">
                              <div className="flex items-center gap-3">
                                {activity.type === "mission" ? <Terminal className="h-4 w-4 text-primary" /> : <Award className="h-4 w-4 text-primary" />}
                                <div>
                                  <p className="terminal-text font-medium">{activity.title}</p>
                                  <p className="text-xs text-muted-foreground terminal-text">{activity.date}</p>
                                </div>
                              </div>
                              <Badge className={activity.status === "Completed" || activity.status === "Earned" ? "bg-green-500/20 text-green-400 border border-green-500" : "cyber-button text-xs"}>
                                {activity.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "missions" && (
                  <div className="space-y-4">
                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> ACTIVE_MISSIONS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-background/50 rounded border border-border">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="terminal-text font-medium">Network Security Audit</h3>
                              <Badge className="cyber-button text-xs">In Progress</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground terminal-text mb-2">Conduct security audit for small business infrastructure</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-text">
                              <Clock className="h-3 w-3" />
                              <span>Due in 5 days</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> COMPLETED_MISSIONS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="p-3 bg-background/50 rounded border border-border">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="terminal-text font-medium">Web App Penetration Test</h3>
                              <Badge className="bg-green-500/20 text-green-400 border border-green-500 text-xs">Completed</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground terminal-text mb-2">Security assessment of web application</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground terminal-text">
                              <TrendingUp className="h-3 w-3" />
                              <span>Earned $500</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-4">
                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> TECHNICAL_SKILLS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { skill: "Penetration Testing", level: 90 },
                            { skill: "Network Security", level: 85 },
                            { skill: "Web Application Security", level: 88 },
                            { skill: "Malware Analysis", level: 75 },
                            { skill: "Incident Response", level: 80 }
                          ].map((item) => (
                            <div key={item.skill}>
                              <div className="flex justify-between mb-1">
                                <span className="terminal-text text-sm">{item.skill}</span>
                                <span className="terminal-text text-sm text-primary">{item.level}%</span>
                              </div>
                              <div className="w-full bg-background rounded-full h-2 border border-border">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${item.level}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hacker-border terminal-window">
                      <CardHeader>
                        <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> CERTIFICATIONS</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border">
                            <Shield className="h-5 w-5 text-primary" />
                            <div>
                              <p className="terminal-text font-medium">CEH - Certified Ethical Hacker</p>
                              <p className="text-xs text-muted-foreground terminal-text">Issued: Dec 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-background/50 rounded border border-border">
                            <Lock className="h-5 w-5 text-primary" />
                            <div>
                              <p className="terminal-text font-medium">CompTIA Security+</p>
                              <p className="text-xs text-muted-foreground terminal-text">Issued: Nov 2023</p>
                            </div>
                          </div>
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
