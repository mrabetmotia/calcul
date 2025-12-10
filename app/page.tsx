'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Moon, Sun, Copy, Check, Sparkles } from 'lucide-react'

function Page() {
  const [inputText, setInputText] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [copied, setCopied] = useState(false)
  const [separator, setSeparator] = useState<'-' | '_'>('-')
  const [textCase, setTextCase] = useState<'lowercase' | 'uppercase' | 'none'>('none')
  const [transformMode, setTransformMode] = useState<'separator' | 'case'>('separator')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const applyCase = (text: string) => {
    if (textCase === 'lowercase') return text.toLowerCase()
    if (textCase === 'uppercase') return text.toUpperCase()
    return text
  }

  const transformedText = transformMode === 'case' 
    ? applyCase(inputText)
    : inputText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s/']+/g, separator)
  
  const inputCharCount = inputText.length
  const transformedCharCount = transformedText.length
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(transformedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-500 relative overflow-hidden ${
      isDarkMode ? 'bg-linear-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Animated background elements */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isDarkMode ? 'opacity-30' : 'opacity-20'
      }`}>
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-400/30'
        } animate-pulse`} />
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-400/30'
        } animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>
      
      <div className={`w-full max-w-lg relative z-10 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <Card className={`backdrop-blur-xl transition-all duration-500 shadow-2xl hover:shadow-3xl ${
          isDarkMode 
            ? 'bg-slate-800/90 border-slate-700/50 shadow-blue-500/10' 
            : 'bg-white/90 border-white/50 shadow-lg'
        }`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className={`flex items-center gap-2 text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                }`}>
                  <Sparkles className={`w-6 h-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-purple-500'
                  } animate-pulse`} />
                  Text Transformer Pro
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                  Convert your text to URL-friendly format instantly
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'text-yellow-400 hover:bg-slate-700/50 hover:rotate-180' 
                    : 'text-slate-700 hover:bg-slate-100 hover:-rotate-180'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                  Enter your text
                </Label>
                {inputText && (
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {inputCharCount} character{inputCharCount !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type something here..."
                className={
                  isDarkMode 
                    ? 'bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:border-blue-400 transition-all duration-300 hover:bg-slate-700' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:border-purple-400 transition-all duration-300 hover:border-purple-300'
                }
              />
            </div>

            <div className="space-y-4">
              <Tabs value={transformMode} onValueChange={(v) => setTransformMode(v as 'separator' | 'case')}>
                <TabsList className={`w-full p-1 transition-all duration-300 ${
                  isDarkMode ? 'bg-slate-700/50 backdrop-blur-sm' : 'bg-slate-100'
                }`}>
                  <TabsTrigger 
                    value="separator" 
                    className="flex-1 transition-all duration-300 data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]"
                  >
                    URL Transform
                  </TabsTrigger>
                  <TabsTrigger 
                    value="case" 
                    className="flex-1 transition-all duration-300 data-[state=active]:shadow-lg data-[state=active]:scale-[1.02]"
                  >
                    Text Case
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {transformMode === 'separator' && (
                <div className="space-y-2">
                  <Label className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    Separator character
                  </Label>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setSeparator('-')}
                      variant={separator === '-' ? 'default' : 'outline'}
                      className={`flex-1 transition-all duration-300 hover:scale-105 ${
                        separator === '-'
                          ? 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 border-slate-600'
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-blue-300'
                      }`}
                    >
                      Dash (-)
                    </Button>
                    <Button
                      onClick={() => setSeparator('_')}
                      variant={separator === '_' ? 'default' : 'outline'}
                      className={`flex-1 transition-all duration-300 hover:scale-105 ${
                        separator === '_'
                          ? 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 border-slate-600'
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-blue-300'
                      }`}
                    >
                      Underscore (_)
                    </Button>
                  </div>
                </div>
              )}

              {transformMode === 'case' && (
                <div className="space-y-2">
                  <Label className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                    Text case
                  </Label>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setTextCase('lowercase')}
                      variant={textCase === 'lowercase' ? 'default' : 'outline'}
                      className={`flex-1 transition-all duration-300 hover:scale-105 ${
                        textCase === 'lowercase'
                          ? 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 border-slate-600'
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-purple-300'
                      }`}
                    >
                      Minuscule
                    </Button>
                    <Button
                      onClick={() => setTextCase('uppercase')}
                      variant={textCase === 'uppercase' ? 'default' : 'outline'}
                      className={`flex-1 transition-all duration-300 hover:scale-105 ${
                        textCase === 'uppercase'
                          ? 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 border-slate-600'
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-purple-300'
                      }`}
                    >
                      Majuscule
                    </Button>
                    <Button
                      onClick={() => setTextCase('none')}
                      variant={textCase === 'none' ? 'default' : 'outline'}
                      className={`flex-1 transition-all duration-300 hover:scale-105 ${
                        textCase === 'none'
                          ? 'bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30'
                          : isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600 border-slate-600'
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:border-purple-300'
                      }`}
                    >
                      Original
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {inputText && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500">
                <Label className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Transformed output
                </Label>
                <div className={`border-2 rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] ${
                  isDarkMode 
                    ? 'bg-linear-to-br from-slate-700/50 to-slate-800/50 border-slate-600 shadow-lg shadow-blue-500/10' 
                    : 'bg-linear-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md hover:shadow-lg'
                }`}>
                  <p className={`font-mono text-lg break-all transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-700'
                  }`}>
                    {transformedText}
                  </p>
                </div>
                <Button
                  onClick={handleCopy}
                  className={`w-full transition-all duration-300 hover:scale-[1.02] font-semibold ${
                    copied
                      ? 'bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/30'
                      : isDarkMode
                      ? 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30'
                      : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-purple-500/30'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 animate-in zoom-in duration-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy to clipboard
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page