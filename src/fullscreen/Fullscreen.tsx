import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Droplet } from 'lucide-react'

const MOTIVATIONAL_MESSAGES = [
  "💧 Stay hydrated! Your body needs water.",
  "🚰 Time for a water break!",
  "💙 Drink some water - your body will thank you!",
  "⚡ Hydration boost time!",
  "🌊 Get hydrated! Water is life.",
]

export default function Fullscreen() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadMessage()
    
    // Auto-close after 30 seconds
    const timeout = setTimeout(closeWindow, 30000)
    return () => clearTimeout(timeout)
  }, [])

  const loadMessage = async () => {
    const result = await chrome.storage.local.get(['customMessage', 'useMotivational'])
    
    let msg = 'Your body needs water. Take a moment to drink up!'
    
    if (result.customMessage && result.customMessage.trim()) {
      msg = result.customMessage
    } else if (result.useMotivational !== false) {
      msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
    }
    
    setMessage(msg)
  }

  const handleDrankWater = async () => {
    const result = await chrome.storage.local.get(['glassesCount', 'lastResetDate'])
    let count = result.glassesCount || 0
    const today = new Date().toDateString()
    
    if (result.lastResetDate !== today) {
      count = 0
    }
    
    count++
    
    await chrome.storage.local.set({
      glassesCount: count,
      lastResetDate: today
    })
    
    closeWindow()
  }

  const handleSnooze = () => {
    chrome.runtime.sendMessage({ action: 'snoozeReminder' })
    closeWindow()
  }

  const closeWindow = async () => {
    const currentWindow = await chrome.windows.getCurrent()
    if (currentWindow.id) {
      chrome.windows.remove(currentWindow.id)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-6xl animate-bounce">
            <Droplet className="h-24 w-24 mx-auto text-blue-500" />
          </div>
          <CardTitle className="text-4xl font-bold">Time to Hydrate!</CardTitle>
          <CardDescription className="text-xl mt-4">{message}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleDrankWater} size="lg" className="text-lg py-6">
            💧 I Drank Water!
          </Button>
          <Button onClick={handleSnooze} variant="outline" size="lg" className="text-lg py-6">
            ⏰ Remind Me Later
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
