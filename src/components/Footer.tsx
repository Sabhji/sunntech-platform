import { Shield, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SunnTech</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to cybersecurity freelance projects and opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary">Projects</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects?category=penetration-testing" className="text-muted-foreground hover:text-primary">Penetration Testing</Link></li>
              <li><Link href="/projects?category=vulnerability-assessment" className="text-muted-foreground hover:text-primary">Vulnerability Assessment</Link></li>
              <li><Link href="/projects?category=security-auditing" className="text-muted-foreground hover:text-primary">Security Auditing</Link></li>
              <li><Link href="/projects?category=incident-response" className="text-muted-foreground hover:text-primary">Incident Response</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SunnTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
