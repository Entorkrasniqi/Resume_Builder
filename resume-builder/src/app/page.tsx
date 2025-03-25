"use client" // Add this at the top

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
          Create a <span className="text-harvard-crimson">Harvard-style</span> resume that gets results.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered resume builder crafted for professionals who demand excellence.
        </p>
        <Button 
          className="text-black px-8 py-6 text-lg text-white"
          onClick={() => router.push('/editor')}
        >
          Create Your Resume
        </Button>
      </header>
    </div>
  )
}