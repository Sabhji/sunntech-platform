import { Terminal, Github, Twitter, Linkedin, Cpu, Lock } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="hacker-border bg-background/95 backdrop-blur scanline">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Terminal className="h-6 w-6 text-primary glitch" />
              <span className="text-xl font-bold terminal-text glitch">SUNNTECH</span>
            </div>
            <p className="text-sm text-muted-foreground terminal-text">
              [SYSTEM]: Your gateway to cybersecurity freelance projects and opportunities.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="terminal-text">STATUS: ONLINE</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 terminal-text"><span className="text-primary">{">"}</span> QUICK_LINKS</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary terminal-text">./projects</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary terminal-text">./about</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary terminal-text">./contact</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary terminal-text">./login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 terminal-text"><span className="text-primary">{">"}</span> CATEGORIES</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects?category=penetration-testing" className="text-muted-foreground hover:text-primary terminal-text">pentest</Link></li>
              <li><Link href="/projects?category=vulnerability-assessment" className="text-muted-foreground hover:text-primary terminal-text">vuln-assess</Link></li>
              <li><Link href="/projects?category=security-auditing" className="text-muted-foreground hover:text-primary terminal-text">security-audit</Link></li>
              <li><Link href="/projects?category=incident-response" className="text-muted-foreground hover:text-primary terminal-text">incident-response</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 terminal-text"><span className="text-primary">{">"}</span> CONTACT</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground terminal-text">sidharth@sunntech.in</li>
              <li className="text-muted-foreground terminal-text">+91 9350360894</li>
            </ul>
            <h3 className="font-semibold mb-3 mt-4 terminal-text"><span className="text-primary">{">"}</span> CONNECT</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Sabhji/sunntech-platform" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/sidharth" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="terminal-text">
            <span className="text-primary">[ROOT]</span> &copy; 2024 SUNNTECH SYSTEMS. ALL RIGHTS RESERVED. <span className="text-primary">[ENCRYPTED]</span>
          </p>
          <p className="text-xs mt-2 terminal-text">
            <span className="text-primary">SECURE CONNECTION ESTABLISHED</span> | <Lock className="inline h-3 w-3" />
          </p>
        </div>
      </div>
    </footer>
  )
}
