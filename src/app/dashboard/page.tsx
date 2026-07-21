"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Terminal, Activity, Network, Shield, Lock, AlertTriangle, Zap, Cpu, HardDrive, Wifi, Globe, Code, FileText, Settings, LogOut, Building2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ClientForm from "@/components/ClientForm"
import CustomerForm from "@/components/CustomerForm"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [networkActivity, setNetworkActivity] = useState(0)
  const [cpuUsage, setCpuUsage] = useState(45)
  const [memoryUsage, setMemoryUsage] = useState(62)
  const [activeConnections, setActiveConnections] = useState(127)
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'customers'>('overview')
  const [logs, setLogs] = useState([
    { time: "14:23:45", type: "INFO", message: "System initialization complete" },
    { time: "14:23:46", type: "SUCCESS", message: "Connection established to secure server" },
    { time: "14:23:47", type: "INFO", message: "Loading security protocols..." },
    { time: "14:23:48", type: "SUCCESS", message: "Firewall active - 127 rules loaded" },
    { time: "14:23:49", type: "WARNING", message: "Unusual traffic pattern detected" }
  ])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkActivity(Math.floor(Math.random() * 100))
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 50)
      setActiveConnections(Math.floor(Math.random() * 50) + 100)
      
      const newLog = {
        time: new Date().toLocaleTimeString(),
        type: Math.random() > 0.7 ? "WARNING" : "INFO",
        message: getRandomLogMessage()
      }
      setLogs(prev => [newLog, ...prev].slice(0, 8))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getRandomLogMessage = () => {
    const messages = [
      "Scanning network ports...",
      "Analyzing traffic patterns...",
      "Checking for vulnerabilities...",
      "Monitoring system resources...",
      "Updating security signatures...",
      "Verifying encryption protocols...",
      "Scanning for malware signatures...",
      "Checking firewall rules...",
      "Monitoring active connections...",
      "Analyzing packet headers..."
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const getLogColor = (type: string) => {
    switch(type) {
      case "SUCCESS": return "text-green-400"
      case "WARNING": return "text-yellow-400"
      case "ERROR": return "text-red-400"
      default: return "text-primary"
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center matrix-bg">
        <div className="terminal-text">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 py-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="terminal-window p-6 hacker-border mb-6">
            <div className="terminal-header mb-4">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~/dashboard</span>
              <span className="ml-auto text-xs text-muted-foreground terminal-text">{currentTime.toLocaleTimeString()}</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold terminal-text glitch mb-1">
                  <span className="text-primary">{">"}</span> WELCOME_BACK
                </h1>
                <p className="text-sm text-muted-foreground terminal-text">
                  Logged in as: {session.user?.email}
                </p>
              </div>
              <Button onClick={() => signOut()} className="cyber-button" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                LOGOUT
              </Button>
            </div>

            <div className="flex gap-2 mb-6">
              <Button
                onClick={() => setActiveTab('overview')}
                className={activeTab === 'overview' ? 'cyber-button' : 'cyber-button variant="outline"'}
                variant={activeTab === 'overview' ? 'default' : 'outline'}
              >
                <Terminal className="mr-2 h-4 w-4" />
                OVERVIEW
              </Button>
              <Button
                onClick={() => setActiveTab('clients')}
                className={activeTab === 'clients' ? 'cyber-button' : 'cyber-button variant="outline"'}
                variant={activeTab === 'clients' ? 'default' : 'outline'}
              >
                <Building2 className="mr-2 h-4 w-4" />
                CLIENTS
              </Button>
              <Button
                onClick={() => setActiveTab('customers')}
                className={activeTab === 'customers' ? 'cyber-button' : 'cyber-button variant="outline"'}
                variant={activeTab === 'customers' ? 'default' : 'outline'}
              >
                <Users className="mr-2 h-4 w-4" />
                CUSTOMERS
              </Button>
            </div>

            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="hacker-border terminal-window">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Activity className="h-5 w-5 text-primary" />
                    <Badge className="cyber-button text-xs">LIVE</Badge>
                  </div>
                  <CardTitle className="text-2xl terminal-text">{networkActivity}%</CardTitle>
                  <CardDescription className="terminal-text">Network Activity</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hacker-border terminal-window">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Cpu className="h-5 w-5 text-primary" />
                    <Badge className="cyber-button text-xs">ACTIVE</Badge>
                  </div>
                  <CardTitle className="text-2xl terminal-text">{cpuUsage}%</CardTitle>
                  <CardDescription className="terminal-text">CPU Usage</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hacker-border terminal-window">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <HardDrive className="h-5 w-5 text-primary" />
                    <Badge className="cyber-button text-xs">STABLE</Badge>
                  </div>
                  <CardTitle className="text-2xl terminal-text">{memoryUsage}%</CardTitle>
                  <CardDescription className="terminal-text">Memory Usage</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hacker-border terminal-window">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Network className="h-5 w-5 text-primary" />
                    <Badge className="cyber-button text-xs">SECURE</Badge>
                  </div>
                  <CardTitle className="text-2xl terminal-text">{activeConnections}</CardTitle>
                  <CardDescription className="terminal-text">Active Connections</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <Terminal className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> REAL_TIME_TERMINAL
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-black/50 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
                      {logs.map((log, index) => (
                        <div key={index} className="mb-1 terminal-text">
                          <span className="text-muted-foreground">[{log.time}]</span>
                          <span className={`ml-2 ${getLogColor(log.type)}`}>[{log.type}]</span>
                          <span className="ml-2">{log.message}</span>
                        </div>
                      ))}
                      <div className="mt-2 terminal-text">
                        <span className="text-muted-foreground">[{currentTime.toLocaleTimeString()}]</span>
                        <span className="ml-2 text-primary">[SYSTEM]</span>
                        <span className="ml-2 blink-cursor">_</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> NETWORK_VISUALIZATION
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/50 p-4 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="terminal-text text-sm">Incoming Traffic</span>
                          <Wifi className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                              <div className="flex-1 bg-background rounded h-2">
                                <div className="bg-primary h-2 rounded" style={{ width: `${Math.random() * 100}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-black/50 p-4 rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="terminal-text text-sm">Outgoing Traffic</span>
                          <Network className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <div className="flex-1 bg-background rounded h-2">
                                <div className="bg-green-400 h-2 rounded" style={{ width: `${Math.random() * 100}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> SECURITY_STATUS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-green-400" />
                        <span className="terminal-text text-sm">Firewall</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500 text-xs">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="terminal-text text-sm">Antivirus</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500 text-xs">PROTECTED</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="terminal-text text-sm">Threat Level</span>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500 text-xs">LOW</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-400" />
                        <span className="terminal-text text-sm">Encryption</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500 text-xs">AES-256</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> ACTIVE_PROCESSES
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { name: "security_daemon", pid: 1234, cpu: "2.3%", mem: "45MB" },
                        { name: "network_monitor", pid: 5678, cpu: "1.8%", mem: "32MB" },
                        { name: "firewall_service", pid: 9012, cpu: "0.9%", mem: "28MB" },
                        { name: "intrusion_detection", pid: 3456, cpu: "3.1%", mem: "67MB" },
                        { name: "encryption_service", pid: 7890, cpu: "1.2%", mem: "41MB" }
                      ].map((process, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded border border-border text-sm terminal-text">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{process.name}</span>
                          </div>
                          <div className="text-right text-xs text-muted-foreground">
                            <div>PID: {process.pid}</div>
                            <div>CPU: {process.cpu} | MEM: {process.mem}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> QUICK_ACTIONS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full cyber-button text-sm">
                      <Terminal className="mr-2 h-4 w-4" />
                      START_SCAN
                    </Button>
                    <Button className="w-full cyber-button text-sm" variant="outline">
                      <Shield className="mr-2 h-4 w-4" />
                      UPDATE_RULES
                    </Button>
                    <Button className="w-full cyber-button text-sm" variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      CONFIGURE
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'clients' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ClientForm />
                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> CLIENTS_LIST
                    </CardTitle>
                    <CardDescription className="terminal-text">
                      View and manage your clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground terminal-text">
                      No clients added yet. Use the form to add your first client.
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CustomerForm />
                <Card className="hacker-border terminal-window">
                  <CardHeader>
                    <CardTitle className="terminal-text flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-primary">{">"}</span> CUSTOMERS_LIST
                    </CardTitle>
                    <CardDescription className="terminal-text">
                      View and manage your customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground terminal-text">
                      No customers added yet. Use the form to add your first customer.
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
