import { Shield, Target, Users, Award, Globe, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">About SunnTech</h1>
              <p className="text-xl text-muted-foreground">
                Empowering the next generation of cybersecurity professionals
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                SunnTech is dedicated to bridging the gap between aspiring cybersecurity professionals and real-world opportunities. 
                We believe that hands-on experience is the best teacher, and our platform connects freshers and professionals 
                with meaningful freelance projects that help them build skills, portfolios, and careers.
              </p>
              <p className="text-muted-foreground">
                Whether you're just starting your cybersecurity journey or you're an experienced professional looking for 
                new challenges, SunnTech provides a platform to find projects that match your skills and career goals.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Target className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Diverse Projects</CardTitle>
                    <CardDescription>
                      Access to a wide range of cybersecurity projects across different domains and difficulty levels
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Community Support</CardTitle>
                    <CardDescription>
                      Join a growing community of cybersecurity enthusiasts and professionals
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Skill Development</CardTitle>
                    <CardDescription>
                      Build practical skills and enhance your portfolio with real-world experience
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Global Opportunities</CardTitle>
                    <CardDescription>
                      Work with clients from around the world and expand your professional network
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Our Values</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Lock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Security First</h3>
                    <p className="text-muted-foreground">
                      We maintain the highest security standards to protect both freelancers and clients
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Quality Assurance</h3>
                    <p className="text-muted-foreground">
                      All projects are verified to ensure legitimacy and fair compensation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Community Driven</h3>
                    <p className="text-muted-foreground">
                      We foster a supportive environment where knowledge sharing and collaboration thrive
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Join Us Today</h2>
              <p className="text-muted-foreground mb-6">
                Ready to start your cybersecurity freelance journey? Join thousands of professionals who have 
                found their next opportunity on SunnTech.
              </p>
              <div className="flex gap-4">
                <a href="/projects" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Browse Projects
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
