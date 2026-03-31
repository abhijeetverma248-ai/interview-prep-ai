'use client'

import { useState } from 'react'
import { Upload, FileText, Loader2, CheckCircle2, XCircle } from 'lucide-react'

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
        setError('Only PDF files are supported. Please upload a PDF resume.')
        setFile(null)
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError(null)
      setAnalysis(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/resume/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze resume')
      }

      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-4">Resume Analysis</h2>
        <p className="text-gray-600 mb-6">
          Upload your resume (PDF only) and get AI-powered feedback on ATS compatibility,
          impact statements, and structure.
        </p>

        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            id="resume-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="resume-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {file ? (
              <>
                <FileText className="w-12 h-12 text-blue-600 mb-2" />
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="font-semibold mb-1">Click to upload resume</p>
                <p className="text-sm text-gray-500">PDF only (max 5MB)</p>
              </>
            )}
          </label>
        </div>

        {/* Analyze Button */}
        {file && !analysis && (
          <button
            onClick={handleUpload}
            disabled={isAnalyzing}
            className="w-full mt-4 bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Analyze Resume
              </>
            )}
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Analysis Result */}
        {analysis && (
          <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              Analysis Complete
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-gray-800">{analysis}</p>
            </div>
            <button
              onClick={() => {
                setFile(null)
                setAnalysis(null)
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Analyze Another Resume
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
