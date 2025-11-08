'use client'

import { useState } from 'react'

function Page() {
  const [inputText, setInputText] = useState('')
  
  const transformedText = inputText.toLowerCase().replace(/[\s/']+/g, '-')
  
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-800">
              Text Transformer
            </h1>
            <p className="text-slate-500 text-sm">
              Convert your text to URL-friendly format
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Enter your text
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something here..."
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          
          {inputText && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <label className="block text-sm font-semibold text-slate-700">
                Transformed output
              </label>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <p className="font-mono text-lg text-blue-700 break-all">
                  {transformedText}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(transformedText)
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
                Copy to clipboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page