'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import React from "react"

export default function EditorPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = React.useState({
    name: '',
    education: '',
    experience: '',
    skills: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Harvard Resume Editor</h1>
        <Button 
          variant="outline" 
          onClick={() => router.push('/')}
        >
          ← Back to Home
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Editor Form */}
        <div className="space-y-6">
          <div>
            <label className="block mb-2">Full Name</label>
            <Input
              name="name"
              value={resumeData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2">Education</label>
            <Textarea
              name="education"
              value={resumeData.education}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-2">Experience</label>
            <Textarea
              name="experience"
              value={resumeData.experience}
              onChange={handleChange}
              rows={6}
            />
          </div>

          <div>
            <label className="block mb-2">Skills</label>
            <Textarea
              name="skills"
              value={resumeData.skills}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-white p-6 rounded-lg border">
          <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
          {resumeData.name && (
            <h3 className="text-lg font-semibold">{resumeData.name}</h3>
          )}
          {resumeData.education && (
            <>
              <h4 className="font-medium mt-4">EDUCATION</h4>
              <p className="whitespace-pre-line">{resumeData.education}</p>
            </>
          )}
          {resumeData.experience && (
            <>
              <h4 className="font-medium mt-4">EXPERIENCE</h4>
              <p className="whitespace-pre-line">{resumeData.experience}</p>
            </>
          )}
          {resumeData.skills && (
            <>
              <h4 className="font-medium mt-4">SKILLS</h4>
              <p className="whitespace-pre-line">{resumeData.skills}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}