"use client"

import { useState, useEffect } from "react"
import { X, Heart, Shield, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome before
    const seen = localStorage.getItem('sunntech_welcome_seen')
    if (!seen) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem('sunntech_welcome_seen', 'true')
    setHasSeenWelcome(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-primary/30 rounded-2xl max-w-lg w-full p-8 relative animate-in slide-in-from-bottom-8 duration-500 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Welcome Content */}
        <div className="text-center space-y-6">
          {/* Animated Icons */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="animate-bounce" style={{ animationDelay: '0s' }}>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
              <Sparkles className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          {/* Welcome Message */}
          <div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to SUNNTECH! 🎉
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              We're so glad you're here!
            </p>
          </div>

          {/* Warm Message */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary font-semibold">You've just joined</span> a community dedicated to connecting talented cybersecurity professionals with businesses that need protection. 
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you're here to <span className="text-green-400 font-semibold">find missions</span>, <span className="text-blue-400 font-semibold">build your portfolio</span>, or <span className="text-purple-400 font-semibold">secure your business</span> — you're in the right place.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted/30 rounded-lg p-3">
              <Users className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Growing Community</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <Shield className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Verified Missions</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <Sparkles className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Skill Growth</p>
            </div>
          </div>

          {/* Personal Touch */}
          <div className="text-sm text-muted-foreground italic">
            <p>✨ Your cybersecurity journey starts now ✨</p>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleClose}
            className="w-full cyber-button text-lg py-6"
            size="lg"
          >
            Let's Get Started! 🚀
          </Button>

          {/* Skip Link */}
          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
