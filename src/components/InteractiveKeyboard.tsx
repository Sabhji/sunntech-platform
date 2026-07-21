"use client"

import { useState } from "react"
import { Terminal, Shield, Lock, Globe, Mail, Cloud, Users, AlertTriangle } from "lucide-react"

const cyberStories = {
  'S': {
    title: '🔐 Social Engineering Attacks',
    icon: <Users className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Social engineering</span> accounts for 98% of all cyber attacks. Hackers manipulate human psychology to gain access to systems and sensitive information.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">Common tactics:</p>
          <p className="text-muted-foreground">Phishing emails, pretexting, baiting, and tailgating</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">We provide comprehensive security awareness training, phishing simulations, and behavioral analysis to identify and prevent social engineering attempts before they compromise your organization.</p>
        </div>
      </div>
    )
  },
  'U': {
    title: '🌐 Unsecured Networks',
    icon: <Globe className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Unsecured networks</span> are open doors for cybercriminals. Public WiFi, unencrypted connections, and poorly configured routers expose businesses to man-in-the attacks, data interception, and unauthorized access.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">The risk:</p>
          <p className="text-muted-foreground">60% of small businesses close within 6 months of a cyber attack</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">Our network security solutions include advanced encryption, secure VPN configurations, network segmentation, and real-time traffic monitoring to keep your connections fortress-secure.</p>
        </div>
      </div>
    )
  },
  'N': {
    title: '🎭 Network Intrusions',
    icon: <Shield className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Network intrusions</span> occur every 39 seconds on average. Sophisticated hackers use automated tools to scan for vulnerabilities, exploit weak passwords, and deploy malware across corporate networks.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">Attack methods:</p>
          <p className="text-muted-foreground">SQL injection, cross-site scripting, ransomware, and zero-day exploits</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">Our AI-powered intrusion detection systems identify threats in real-time, automatically block suspicious activities, and provide detailed forensic analysis to understand and prevent future attacks.</p>
        </div>
      </div>
    )
  },
  'T': {
    title: '💻 Threat Intelligence',
    icon: <AlertTriangle className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Cyber threats</span> evolve daily. New malware variants, attack vectors, and exploitation techniques emerge constantly, making traditional security measures insufficient.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">The challenge:</p>
          <p className="text-muted-foreground">Organizations face an average of 1,200+ cyber attacks per week</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">Our threat intelligence platform monitors global cyber threats, analyzes attack patterns, and provides proactive defense strategies. We predict attacks before they happen and keep your security measures ahead of emerging threats.</p>
        </div>
      </div>
    )
  },
  'E': {
    title: '📧 Email Security Breaches',
    icon: <Mail className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Email attacks</span> are the #1 entry point for cybercriminals. Business Email Compromise (BEC) scams alone cost businesses $26 billion globally. Phishing, spoofing, and email-based malware distribution continue to evolve.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">Statistics:</p>
          <p className="text-muted-foreground">91% of all cyber attacks begin with a phishing email</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">Our advanced email security includes AI-powered phishing detection, domain-based message authentication, encryption, and real-time threat analysis to protect your communication channels from email-based attacks.</p>
        </div>
      </div>
    )
  },
  'C': {
    title: '🔒 Cloud Security Challenges',
    icon: <Cloud className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Cloud security</span> misconfigurations expose 33% of organizations to data breaches. As businesses migrate to cloud infrastructure, new vulnerabilities emerge in storage, access controls, and API endpoints.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">Common issues:</p>
          <p className="text-muted-foreground">Misconfigured S3 buckets, excessive permissions, and inadequate encryption</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">We provide comprehensive cloud security assessments, continuous configuration monitoring, identity and access management, and automated compliance checks to ensure your cloud infrastructure remains secure.</p>
        </div>
      </div>
    )
  },
  'H': {
    title: '🛡️ Human Factor & Security',
    icon: <Lock className="h-6 w-6" />,
    content: (
      <div className="space-y-3 text-sm">
        <p><span className="text-red-400 font-bold">Human error</span> contributes to 95% of all security breaches. Despite advanced technology, people remain the weakest link in cybersecurity - through weak passwords, careless clicking, and lack of security awareness.</p>
        <div className="bg-muted/30 p-3 rounded-lg">
          <p className="text-primary font-semibold mb-1">The reality:</p>
          <p className="text-muted-foreground">Only 38% of global organizations have a cybersecurity strategy</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
          <p className="text-green-400 font-semibold mb-1">SunnTech Solution:</p>
          <p className="text-muted-foreground">We bridge the gap between technology and people through comprehensive security training, simulated phishing exercises, password management solutions, and a security-first culture that transforms employees into your strongest defense line.</p>
        </div>
      </div>
    )
  }
}

export default function InteractiveKeyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [showStory, setShowStory] = useState(false)

  const keys = [
    { char: 'S', type: 'sunn' },
    { char: 'U', type: 'sunn' },
    { char: 'N', type: 'sunn' },
    { char: 'N', type: 'sunn' },
    { char: 'T', type: 'tech' },
    { char: 'E', type: 'tech' },
    { char: 'C', type: 'tech' },
    { char: 'H', type: 'tech' }
  ]

  const handleKeyClick = (char: string) => {
    setActiveKey(char)
    setShowStory(true)
  }

  const story = activeKey ? cyberStories[activeKey as keyof typeof cyberStories] : null

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 terminal-text glitch">
          <span className="text-primary">{">"}</span> INTERACTIVE_SECURITY_EXPERIENCE
        </h2>
        <a 
          href="https://www.sunntech.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block text-primary hover:text-primary/80 transition-colors border border-primary px-4 py-2 rounded hover:bg-primary/10"
        >
          www.sunntech.in
        </a>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8 p-4 bg-black/50 rounded-lg border border-border">
        {keys.map((key) => (
          <button
            key={key.char}
            onClick={() => handleKeyClick(key.char)}
            className={`
              w-16 h-16 rounded-lg font-bold text-2xl transition-all duration-300
              ${key.type === 'sunn' 
                ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500/50 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                : 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-500/50 hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
              }
              ${activeKey === key.char ? 'scale-95 ring-2 ring-white' : 'hover:-translate-y-1'}
              text-white
            `}
          >
            {key.char}
          </button>
        ))}
      </div>

      {showStory && story && (
        <div className="bg-black/80 border border-primary rounded-lg p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-primary">{story.icon}</div>
            <h3 className="text-xl font-bold terminal-text">{story.title}</h3>
          </div>
          <div className="terminal-text">
            {story.content}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm terminal-text">
          <span className="text-primary">{">"}</span> Click on any key to discover cybercrime stories and how SunnTech protects businesses
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">2.8M+</div>
          <div className="text-xs text-muted-foreground mt-1">Cyber Attacks Daily</div>
        </div>
        <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">$6T</div>
          <div className="text-xs text-muted-foreground mt-1">Global Damage Cost</div>
        </div>
        <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">99%</div>
          <div className="text-xs text-muted-foreground mt-1">Human Error Factor</div>
        </div>
      </div>
    </div>
  )
}
