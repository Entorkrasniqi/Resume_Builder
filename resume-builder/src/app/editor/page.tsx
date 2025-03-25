'use client'

import { Button } from "@/components/ui/button"
import React from "react"
import { useRouter } from 'next/navigation'

interface ResumeData {
  name: string
  email: string
  phone: string
  location: string
  website: string
  sectionOrder: string[]
  education: {
    school: string
    degree: string
    date: string
    location: string
  }[]
  skills: string[]
  projects: {
    name: string
    description: string
    date: string
    bullets: string[]
  }[]
  experience: {
    company: string
    position: string
    date: string
    location: string
    bullets: string[]
  }[]
  additional: string[]
}

export default function EditorPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = React.useState<ResumeData>({
    name: 'Your Name',
    email: 'email@example.com',
    phone: '(123) 456-7890',
    location: 'City, State',
    website: 'yourwebsite.com',
    sectionOrder: ['education', 'skills', 'projects', 'experience', 'additional'],
    education: [{
      school: 'University Name',
      degree: 'Degree Name',
      date: 'Expected May 2024',
      location: 'City, State'
    }],
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    projects: [{
      name: 'Project Name',
      description: 'Project Description',
      date: 'Date',
      bullets: ['• Project detail 1', '• Project detail 2']
    }],
    experience: [{
      company: 'Company Name',
      position: 'Position Title',
      date: 'Start - End Date',
      location: 'City, State',
      bullets: ['• Accomplishment 1', '• Accomplishment 2']
    }],
    additional: ['Language 1', 'Language 2']
  })

  const handleInlineEdit = (
    section: keyof ResumeData,
    index: number | null = null,
    field: string | null = null,
    bulletIndex: number | null = null,
    value: string
  ) => {
    setResumeData(prev => {
      if (index === null) {
        return { ...prev, [section]: value }
      }
      
      const newData = { ...prev }
      if (Array.isArray(newData[section])) {
        if (bulletIndex !== null && field === 'bullets') {
          (newData[section] as any)[index].bullets[bulletIndex] = value
        } else if (field) {
          (newData[section] as any)[index][field] = value
        } else {
          (newData[section] as any)[index] = value
        }
      }
      return newData
    })
  }

  const moveSection = (section: string, direction: 'up' | 'down') => {
    setResumeData(prev => {
      const newOrder = [...prev.sectionOrder]
      const currentIndex = newOrder.indexOf(section)
      if (direction === 'up' && currentIndex > 0) {
        [newOrder[currentIndex], newOrder[currentIndex - 1]] = [newOrder[currentIndex - 1], newOrder[currentIndex]]
      } else if (direction === 'down' && currentIndex < newOrder.length - 1) {
        [newOrder[currentIndex], newOrder[currentIndex + 1]] = [newOrder[currentIndex + 1], newOrder[currentIndex]]
      }
      return { ...prev, sectionOrder: newOrder }
    })
  }

  const deleteItem = (section: keyof ResumeData, index: number, bulletIndex?: number) => {
    setResumeData(prev => {
      const newData = { ...prev }
      if (bulletIndex !== undefined) {
        // Delete bullet point
        (newData[section] as any)[index].bullets = (newData[section] as any)[index].bullets.filter((_, i) => i !== bulletIndex)
      } else {
        // Delete section item
        (newData[section] as any) = (newData[section] as any).filter((_: any, i: number) => i !== index)
      }
      return newData
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      <Button
        onClick={() => router.push('/')}
        className="absolute top-4 right-4"
        variant="outline"
      >
        Back to Main Page
      </Button>
      
      <div className="max-w-[8.5in] mx-auto bg-white shadow-lg">
        <div className="p-8 min-h-[11in] relative">
          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="text-2xl font-serif mb-2"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleInlineEdit('name', null, null, null, e.currentTarget.textContent || '')}
            >
              {resumeData.name}
            </div>
            <div className="text-sm space-x-2">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleInlineEdit('email', null, null, null, e.currentTarget.textContent || '')}
              >
                {resumeData.email}
              </span>
              <span>•</span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleInlineEdit('phone', null, null, null, e.currentTarget.textContent || '')}
              >
                {resumeData.phone}
              </span>
              <span>•</span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleInlineEdit('location', null, null, null, e.currentTarget.textContent || '')}
              >
                {resumeData.location}
              </span>
              <span>•</span>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleInlineEdit('website', null, null, null, e.currentTarget.textContent || '')}
              >
                {resumeData.website}
              </span>
            </div>
          </div>

          {/* Render sections based on order */}
          {resumeData.sectionOrder.map((sectionName) => {
            const Section = () => {
              switch(sectionName) {
                case 'education':
                  return (
                    <div className="mb-4 relative">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Education</h2>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => moveSection('education', 'up')}>↑</Button>
                          <Button variant="ghost" size="sm" onClick={() => moveSection('education', 'down')}>↓</Button>
                        </div>
                      </div>
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="mb-2 relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100"
                            onClick={() => deleteItem('education', index)}
                          >
                            ×
                          </Button>
                          <div className="flex justify-between items-start text-sm">
                            <div>
                              <div
                                className="font-semibold"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('education', index, 'school', null, e.currentTarget.textContent || '')}
                              >
                                {edu.school}
                              </div>
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('education', index, 'degree', null, e.currentTarget.textContent || '')}
                              >
                                {edu.degree}
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('education', index, 'date', null, e.currentTarget.textContent || '')}
                              >
                                {edu.date}
                              </div>
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('education', index, 'location', null, e.currentTarget.textContent || '')}
                              >
                                {edu.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          education: [...prev.education, { school: 'University Name', degree: 'Degree Name', date: 'Date', location: 'Location' }]
                        }))}
                        className="text-xs"
                      >
                        + Add Education
                      </Button>
                    </div>
                  )
                case 'skills':
                  return (
                    <div className="mb-4 relative">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => moveSection('skills', 'up')}>↑</Button>
                          <Button variant="ghost" size="sm" onClick={() => moveSection('skills', 'down')}>↓</Button>
                        </div>
                      </div>
                      <div className="text-sm">
                        {resumeData.skills.map((skill, index) => (
                          <span key={index} className="inline-block mr-4 group relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute -right-4 -top-2 opacity-0 group-hover:opacity-100"
                              onClick={() => deleteItem('skills', index)}
                            >
                              ×
                            </Button>
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineEdit('skills', index, null, null, e.currentTarget.textContent || '')}
                            >
                              {skill}
                            </span>
                          </span>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          skills: [...prev.skills, 'New Skill']
                        }))}
                        className="text-xs mt-2"
                      >
                        + Add Skill
                      </Button>
                    </div>
                  )
                case 'projects':
                  return (
                    <div className="mb-4 relative">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Projects</h2>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => moveSection('projects', 'up')}>↑</Button>
                          <Button variant="ghost" size="sm" onClick={() => moveSection('projects', 'down')}>↓</Button>
                        </div>
                      </div>
                      {resumeData.projects.map((project, index) => (
                        <div key={index} className="mb-4 relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100"
                            onClick={() => deleteItem('projects', index)}
                          >
                            ×
                          </Button>
                          <div className="flex justify-between items-start text-sm">
                            <div>
                              <div
                                className="font-semibold"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('projects', index, 'name', null, e.currentTarget.textContent || '')}
                              >
                                {project.name}
                              </div>
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('projects', index, 'description', null, e.currentTarget.textContent || '')}
                              >
                                {project.description}
                              </div>
                              {project.bullets.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="relative group">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -left-6 opacity-0 group-hover:opacity-100"
                                    onClick={() => deleteItem('projects', index, bulletIndex)}
                                  >
                                    ×
                                  </Button>
                                  <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleInlineEdit('projects', index, 'bullets', bulletIndex, e.currentTarget.textContent || '')}
                                  >
                                    {bullet}
                                  </div>
                                </div>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newData = { ...resumeData }
                                  newData.projects[index].bullets.push('• New bullet point')
                                  setResumeData(newData)
                                }}
                                className="text-xs mt-1"
                              >
                                + Add Bullet
                              </Button>
                            </div>
                            <div
                              className="text-right"
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineEdit('projects', index, 'date', null, e.currentTarget.textContent || '')}
                            >
                              {project.date}
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          projects: [...prev.projects, {
                            name: 'Project Name',
                            description: 'Project Description',
                            date: 'Date',
                            bullets: ['• Project detail']
                          }]
                        }))}
                        className="text-xs"
                      >
                        + Add Project
                      </Button>
                    </div>
                  )
                case 'experience':
                  return (
                    <div className="mb-4 relative">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Experience</h2>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => moveSection('experience', 'up')}>↑</Button>
                          <Button variant="ghost" size="sm" onClick={() => moveSection('experience', 'down')}>↓</Button>
                        </div>
                      </div>
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="mb-4 relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute -right-4 top-0 opacity-0 group-hover:opacity-100"
                            onClick={() => deleteItem('experience', index)}
                          >
                            ×
                          </Button>
                          <div className="flex justify-between items-start text-sm">
                            <div>
                              <div
                                className="font-semibold"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('experience', index, 'company', null, e.currentTarget.textContent || '')}
                              >
                                {exp.company}
                              </div>
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('experience', index, 'position', null, e.currentTarget.textContent || '')}
                              >
                                {exp.position}
                              </div>
                              {exp.bullets.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="relative group">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -left-6 opacity-0 group-hover:opacity-100"
                                    onClick={() => deleteItem('experience', index, bulletIndex)}
                                  >
                                    ×
                                  </Button>
                                  <div
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={(e) => handleInlineEdit('experience', index, 'bullets', bulletIndex, e.currentTarget.textContent || '')}
                                  >
                                    {bullet}
                                  </div>
                                </div>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newData = { ...resumeData }
                                  newData.experience[index].bullets.push('• New bullet point')
                                  setResumeData(newData)
                                }}
                                className="text-xs mt-1"
                              >
                                + Add Bullet
                              </Button>
                            </div>
                            <div>
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('experience', index, 'date', null, e.currentTarget.textContent || '')}
                              >
                                {exp.date}
                              </div>
                              <div
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) => handleInlineEdit('experience', index, 'location', null, e.currentTarget.textContent || '')}
                              >
                                {exp.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          experience: [...prev.experience, {
                            company: 'Company Name',
                            position: 'Position Title',
                            date: 'Start - End Date',
                            location: 'City, State',
                            bullets: ['• Accomplishment']
                          }]
                        }))}
                        className="text-xs"
                      >
                        + Add Experience
                      </Button>
                    </div>
                  )
                case 'additional':
                  return (
                    <div className="mb-4 relative">
                      <div className="flex justify-between items-center">
                        <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-2">Additional</h2>
                        <div className="space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => moveSection('additional', 'up')}>↑</Button>
                          <Button variant="ghost" size="sm" onClick={() => moveSection('additional', 'down')}>↓</Button>
                        </div>
                      </div>
                      <div className="text-sm">
                        {resumeData.additional.map((item, index) => (
                          <div key={index} className="relative group inline-block mr-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute -right-4 -top-2 opacity-0 group-hover:opacity-100"
                              onClick={() => deleteItem('additional', index)}
                            >
                              ×
                            </Button>
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) => handleInlineEdit('additional', index, null, null, e.currentTarget.textContent || '')}
                            >
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          additional: [...prev.additional, 'New Item']
                        }))}
                        className="text-xs mt-2"
                      >
                        + Add Item
                      </Button>
                    </div>
                  )
                default:
                  return null
              }
            }
            return <Section key={sectionName} />
          })}
        </div>
      </div>
    </div>
  )
}