import InteractiveKeyboard from "@/components/InteractiveKeyboard"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function InteractiveLogoPage() {
  return (
    <div className="min-h-screen flex flex-col matrix-bg">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <InteractiveKeyboard />
        </div>
      </main>

      <Footer />
    </div>
  )
}
