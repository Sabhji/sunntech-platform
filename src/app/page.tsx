import Link from "next/link"
import { Terminal, Search, TrendingUp, Users, Clock, DollarSign, ArrowRight, Cpu, Lock, ShieldAlert, Zap, Code, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import InteractiveKeyboard from "@/components/InteractiveKeyboard"
import { projects } from "@/data/projects"

export default function Home() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-20 scanline">
          <div className="container mx-auto px-4 text-center">
            <div className="terminal-window max-w-4xl mx-auto p-8 mb-8">
              <div className="terminal-header mb-6">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
                <span className="text-xs text-muted-foreground ml-2 terminal-text">root@sunntech:~</span>
              </div>
              <div className="text-left space-y-2 terminal-text text-sm">
                <p className="text-primary">[SYSTEM]</p>
                <p className="typing-effect">Initializing cybersecurity freelance platform...</p>
                <p className="text-primary">[SUCCESS]</p>
                <p>Connection established. Welcome to SUNNTECH.</p>
                <p className="text-primary">[INFO]</p>
                <p>Access granted. Browse available missions below.</p>
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              <Terminal className="h-16 w-16 text-primary glitch" />
            </div>
            <h1 className="text-5xl font-bold mb-6 terminal-text glitch">
              CYBERSECURITY FREELANCE OPERATIONS
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto terminal-text">
              <span className="text-primary">{">"}</span> Connect with businesses seeking cybersecurity expertise. Perfect for freshers and professionals to build their portfolio.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="cyber-button">
                <Terminal className="mr-2 h-4 w-4" />
                BROWSE MISSIONS
              </Button>
              <Button size="lg" className="cyber-button" variant="outline">
                <ShieldAlert className="mr-2 h-4 w-4" />
                POST MISSION
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link href="/login/freelancer">
                <Button className="w-full cyber-button" variant="outline">
                  <Code className="mr-2 h-4 w-4" />
                  FREELANCER_LOGIN
                </Button>
              </Link>
              <Link href="/login/company">
                <Button className="w-full cyber-button" variant="outline">
                  <Building2 className="mr-2 h-4 w-4" />
                  COMPANY_LOGIN
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="hacker-border terminal-window">
                <CardHeader>
                  <Search className="h-8 w-8 text-primary mb-2 glitch" />
                  <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> FIND_MISSIONS</CardTitle>
                  <CardDescription className="terminal-text">
                    Browse through hundreds of cybersecurity operations from clients worldwide
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hacker-border terminal-window">
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2 glitch" />
                  <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> BUILD_SKILLS</CardTitle>
                  <CardDescription className="terminal-text">
                    Gain real-world experience and enhance your cybersecurity portfolio
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="hacker-border terminal-window">
                <CardHeader>
                  <DollarSign className="h-8 w-8 text-primary mb-2 glitch" />
                  <CardTitle className="terminal-text"><span className="text-primary">{">"}</span> EARN_CREDITS</CardTitle>
                  <CardDescription className="terminal-text">
                    Get paid for your expertise and build a sustainable freelance career
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 terminal-text glitch"><span className="text-primary">{">"}</span> ACTIVE_MISSIONS</h2>
              <p className="text-muted-foreground terminal-text">Latest cybersecurity operations available</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {featuredProjects.map((project) => (
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

            <div className="text-center">
              <Button size="lg" className="cyber-button" asChild>
                <Link href="/projects">
                  <Terminal className="mr-2 h-4 w-4" />
                  VIEW_ALL_MISSIONS
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 scanline">
          <div className="container mx-auto px-4">
            <InteractiveKeyboard />
          </div>
        </section>

        <section className="bg-muted/30 py-16 scanline">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 terminal-text glitch"><span className="text-primary">{">"}</span> SYSTEM_ADVANTAGES</h2>
              <p className="text-muted-foreground terminal-text">Why choose SUNNTECH for your operations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center terminal-window p-6 hacker-border">
                <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 terminal-text">GROWING_NETWORK</h3>
                <p className="text-sm text-muted-foreground terminal-text">Join thousands of cybersecurity professionals</p>
              </div>
              <div className="text-center terminal-window p-6 hacker-border">
                <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 terminal-text">VERIFIED_MISSIONS</h3>
                <p className="text-sm text-muted-foreground terminal-text">All operations verified for legitimacy</p>
              </div>
              <div className="text-center terminal-window p-6 hacker-border">
                <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 terminal-text">QUICK_PAYOUTS</h3>
                <p className="text-sm text-muted-foreground terminal-text">Secure and timely payment processing</p>
              </div>
              <div className="text-center terminal-window p-6 hacker-border">
                <div className="bg-primary/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 terminal-text">SKILL_DEVELOPMENT</h3>
                <p className="text-sm text-muted-foreground terminal-text">Learn and grow with each operation</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
