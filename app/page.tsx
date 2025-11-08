'use client'

import { useState } from 'react'

function Page() {
  const [inputText, setInputText] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const transformedText = inputText.toLowerCase().replace(/[\s/']+/g, '-')
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900' : 'bg-linear-to-br from-slate-50 to-slate-100'
    }`}>
      <div className="w-full max-w-lg">
        <div className={`rounded-2xl shadow-xl p-8 space-y-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="text-center space-y-2 flex-1">
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Text Transformer
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Convert your text to URL-friendly format
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-lg transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Enter your text
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something here..."
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-blue-400/30' 
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
          </div>
          
          {inputText && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <label className={`block text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Transformed output
              </label>
              <div className={`border-2 rounded-lg p-4 ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`font-mono text-lg break-all ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  {transformedText}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(transformedText)
                }}
                className={`w-full font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
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