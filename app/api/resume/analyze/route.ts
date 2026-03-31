import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse, SYSTEM_PROMPTS } from '@/lib/ai'
import pdfParse from 'pdf-parse'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Extract text based on file type
    let resumeText = ''
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name.toLowerCase()

    if (fileName.endsWith('.pdf')) {
      const pdfData = await pdfParse(buffer)
      resumeText = pdfData.text
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a PDF file.' },
        { status: 400 }
      )
    }

    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Could not extract text from file. Please ensure it contains readable text.' },
        { status: 400 }
      )
    }

    // Generate AI analysis
    const messages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPTS.resume,
      },
      {
        role: 'user' as const,
        content: `Please analyze this resume and provide detailed feedback:\n\n${resumeText}`,
      },
    ]

    const analysis = await generateAIResponse(messages, 'resume')

    return NextResponse.json({
      analysis,
      wordCount: resumeText.split(/\s+/).length,
    })
  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    )
  }
}
