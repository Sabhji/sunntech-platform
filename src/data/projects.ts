export interface Project {
  id: string
  title: string
  description: string
  category: string
  budget: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  skills: string[]
  postedBy: string
  postedDate: string
  status: "Open" | "In Progress" | "Closed"
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Web Application Penetration Testing",
    description: "Perform comprehensive security assessment of a web application including authentication, authorization, and data validation testing.",
    category: "Penetration Testing",
    budget: "$500-$800",
    duration: "2-3 weeks",
    level: "Intermediate",
    skills: ["OWASP Top 10", "Burp Suite", "SQL Injection", "XSS"],
    postedBy: "TechCorp Inc.",
    postedDate: "2024-01-15",
    status: "Open"
  },
  {
    id: "2",
    title: "Network Security Audit",
    description: "Conduct network security audit for a small business. Identify vulnerabilities in network infrastructure and provide remediation recommendations.",
    category: "Security Auditing",
    budget: "$300-$500",
    duration: "1-2 weeks",
    level: "Beginner",
    skills: ["Nmap", "Wireshark", "Network Protocols", "Basic Security"],
    postedBy: "SecureNet Solutions",
    postedDate: "2024-01-14",
    status: "Open"
  },
  {
    id: "3",
    title: "Mobile App Security Assessment",
    description: "Security testing of Android application focusing on data storage, communication security, and authentication mechanisms.",
    category: "Vulnerability Assessment",
    budget: "$600-$1000",
    duration: "3-4 weeks",
    level: "Advanced",
    skills: ["Mobile Security", "Android", "Reverse Engineering", "APK Analysis"],
    postedBy: "AppSecure Ltd",
    postedDate: "2024-01-13",
    status: "Open"
  },
  {
    id: "4",
    title: "API Security Testing",
    description: "Test REST API endpoints for security vulnerabilities including authentication flaws, authorization issues, and data exposure.",
    category: "Penetration Testing",
    budget: "$400-$600",
    duration: "1-2 weeks",
    level: "Intermediate",
    skills: ["API Security", "Postman", "OWASP API Security", "REST"],
    postedBy: "CloudTech Services",
    postedDate: "2024-01-12",
    status: "In Progress"
  },
  {
    id: "5",
    title: "Security Awareness Training Content",
    description: "Create comprehensive security awareness training materials for employees including phishing simulations and best practices.",
    category: "Security Consulting",
    budget: "$200-$400",
    duration: "2 weeks",
    level: "Beginner",
    skills: ["Security Awareness", "Content Creation", "Training", "Communication"],
    postedBy: "EduSecure Institute",
    postedDate: "2024-01-11",
    status: "Open"
  },
  {
    id: "6",
    title: "Incident Response Plan Development",
    description: "Develop incident response plan and procedures for a healthcare organization including playbooks for common security incidents.",
    category: "Incident Response",
    budget: "$800-$1200",
    duration: "4-6 weeks",
    level: "Advanced",
    skills: ["Incident Response", "Security Operations", "Risk Management", "Healthcare Compliance"],
    postedBy: "MediGuard Health",
    postedDate: "2024-01-10",
    status: "Open"
  },
  {
    id: "7",
    title: "Cloud Security Configuration Review",
    description: "Review AWS cloud infrastructure security configurations and implement best practices for IAM, S3, and EC2 security.",
    category: "Cloud Security",
    budget: "$500-$700",
    duration: "2-3 weeks",
    level: "Intermediate",
    skills: ["AWS", "Cloud Security", "IAM", "CIS Benchmarks"],
    postedBy: "CloudFirst Technologies",
    postedDate: "2024-01-09",
    status: "Open"
  },
  {
    id: "8",
    title: "Malware Analysis Setup Guide",
    description: "Create documentation and setup guide for malware analysis lab including tools configuration and analysis procedures.",
    category: "Malware Analysis",
    budget: "$300-$500",
    duration: "1-2 weeks",
    level: "Beginner",
    skills: ["Malware Analysis", "Virtualization", "Static Analysis", "Dynamic Analysis"],
    postedBy: "CyberLearn Academy",
    postedDate: "2024-01-08",
    status: "Open"
  }
]
