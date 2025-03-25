'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation" // ← Add this import

export default function Home() {
  const router = useRouter() // ← Initialize router

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
          Create a <span className="text-harvard-crimson">Harvard-Style</span> Resume
        </h1>
        <Button 
          className="bg-harvard-crimson hover:bg-harvard-crimson/90 px-8 py-6 text-lg"
          onClick={() => router.push('/editor')} // ← Add this
        >
          Create Your Resume
        </Button>
      </header>
    </div>
  )
}