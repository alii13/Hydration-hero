import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Settings, Plus, Minus, AlarmClock } from 'lucide-react'
import '../index.css'

export default function Popup() {
  const [interval, setInterval] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('')
  const [glassCount, setGlassCount] = useState(0)
  const [nextAlarmTime, setNextAlarmTime] = useState<number | null>(null)
  const [enableSnooze, setEnableSnooze] = useState(true)
  const [dailyGoal, setDailyGoal] = useState(8)

  useEffect(() => {
    loadData()
    const timer = window.setInterval(updateCountdown, 1000)
    
    // Listen for storage changes to keep UI in sync with background
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.isActive) {
        setIsActive(changes.isActive.newValue || false)
      }
      if (changes.nextAlarmTime) {
        setNextAlarmTime(changes.nextAlarmTime.newValue || null)
      }
      if (changes.glassesCount !== undefined) {
        setGlassCount(changes.glassesCount.newValue || 0)
      }
      if (changes.enableSnooze !== undefined) {
        setEnableSnooze(changes.enableSnooze.newValue !== undefined ? changes.enableSnooze.newValue : true)
      }
      if (changes.dailyGoal) {
        setDailyGoal(changes.dailyGoal.newValue || 8)
      }
    }
    
    chrome.storage.onChanged.addListener(handleStorageChange)
    
    return () => {
      window.clearInterval(timer)
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [nextAlarmTime])

  const loadData = async () => {
    const result = await chrome.storage.local.get([
      'interval',
      'isActive',
      'nextAlarmTime',
      'glassesCount',
      'lastResetDate',
      'enableSnooze',
      'dailyGoal',
    ])

    if (result.interval) setInterval(result.interval)
    setIsActive(result.isActive || false)
    setNextAlarmTime(result.nextAlarmTime || null)
    setEnableSnooze(result.enableSnooze !== undefined ? result.enableSnooze : true)
    setDailyGoal(result.dailyGoal || 8)

    const today = new Date().toDateString()
    let count = result.glassesCount || 0
    if (result.lastResetDate !== today) {
      count = 0
      await chrome.storage.local.set({ glassesCount: 0, lastResetDate: today })
    }
    setGlassCount(count)
  }

  const updateCountdown = () => {
    if (!nextAlarmTime) return
    const remaining = nextAlarmTime - Date.now()
    if (remaining > 0) {
      const minutes = Math.floor(remaining / 60000)
      const seconds = Math.floor((remaining % 60000) / 1000)
      setTimeRemaining(`${minutes}m ${seconds}s`)
    } else {
      setTimeRemaining('Soon...')
    }
  }

  const handleStart = async () => {
    await chrome.runtime.sendMessage({ action: 'startReminder', interval })
    // Set active immediately for UI responsiveness
    setIsActive(true)
    // Reload data to get the new nextAlarmTime
    setTimeout(() => loadData(), 100)
  }

  const handleStop = async () => {
    await chrome.runtime.sendMessage({ action: 'stopReminder' })
    setIsActive(false)
    setNextAlarmTime(null)
    setTimeRemaining('')
  }

  const handleAddGlass = async () => {
    const newCount = glassCount + 1
    setGlassCount(newCount)
    await chrome.storage.local.set({
      glassesCount: newCount,
      lastResetDate: new Date().toDateString(),
    })
  }

  const handleRemoveGlass = async () => {
    const newCount = Math.max(0, glassCount - 1)
    setGlassCount(newCount)
    await chrome.storage.local.set({
      glassesCount: newCount,
      lastResetDate: new Date().toDateString(),
    })
  }

  const presets = [15, 30, 45, 60, 90, 120]

  return (
    <div className="w-[380px] min-h-[500px] p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Hydration Hero</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => chrome.runtime.openOptionsPage()}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Status</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-xs text-muted-foreground">
                {isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        {isActive && (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Next reminder: <span className="font-medium">{timeRemaining}</span>
            </p>
          </CardContent>
        )}
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm">Remind me every:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min="1"
              max="480"
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value))}
              className="text-center text-2xl font-semibold h-12"
            />
            <span className="text-sm text-muted-foreground">minutes</span>
          </div>

          <Slider
            value={[interval]}
            onValueChange={(value) => setInterval(value[0])}
            min={1}
            max={480}
            step={1}
            className="w-full"
          />

          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => setInterval(preset)}
              >
                {preset < 60 ? `${preset}m` : `${preset / 60}h`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            Today's Water Intake
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl">💧</span>
            <span className="text-4xl font-bold">{glassCount}/{dailyGoal}</span>
            <span className="text-sm text-muted-foreground">glasses</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={handleRemoveGlass} variant="outline" size="sm">
              <Minus className="h-4 w-4" />
            </Button>
            <Button onClick={handleAddGlass} className="bg-black text-white hover:bg-gray-800" size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {isActive ? (
        <Button onClick={handleStop} className="w-full" variant="outline">
          Stop Reminders
        </Button>
      ) : (
        <Button onClick={handleStart} className="w-full bg-black text-white hover:bg-gray-800">
          Start Reminders
        </Button>
      )}

      {isActive && enableSnooze && (
        <Button
          onClick={() => chrome.runtime.sendMessage({ action: 'snoozeReminder' })}
          variant="ghost"
          className="w-full mt-2"
          size="sm"
        >
          <AlarmClock className="h-4 w-4 mr-1" />
          Snooze (5 min)
        </Button>
      )}
    </div>
  )
}
