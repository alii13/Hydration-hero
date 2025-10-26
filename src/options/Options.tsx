import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import '../index.css'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Bell, Volume2, Clock, MessageSquare, Palette, Settings as SettingsIcon } from 'lucide-react'

export default function Options() {
  const [notificationType, setNotificationType] = useState('both')
  const [soundType, setSoundType] = useState('default')
  const [volume, setVolume] = useState(50)
  const [enableSchedule, setEnableSchedule] = useState(false)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('22:00')
  const [useMotivational, setUseMotivational] = useState(true)
  const [customMessage, setCustomMessage] = useState('')
  const [persistNotification, setPersistNotification] = useState(false)
  const [useColorfulIcons, setUseColorfulIcons] = useState(true)
  const [showWaterGoal, setShowWaterGoal] = useState(false)
  const [dailyGoal, setDailyGoal] = useState(8)
  const [playOnStartup, setPlayOnStartup] = useState(false)
  const [enableSnooze, setEnableSnooze] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    const settings = await chrome.storage.local.get([
      'notificationType',
      'soundType',
      'volume',
      'enableSchedule',
      'startTime',
      'endTime',
      'useMotivational',
      'customMessage',
      'persistNotification',
      'useColorfulIcons',
      'showWaterGoal',
      'dailyGoal',
      'playOnStartup',
      'enableSnooze',
    ])

    if (settings.notificationType) setNotificationType(settings.notificationType)
    if (settings.soundType) setSoundType(settings.soundType)
    if (settings.volume !== undefined) setVolume(settings.volume)
    if (settings.enableSchedule !== undefined) setEnableSchedule(settings.enableSchedule)
    if (settings.startTime) setStartTime(settings.startTime)
    if (settings.endTime) setEndTime(settings.endTime)
    if (settings.useMotivational !== undefined) setUseMotivational(settings.useMotivational)
    if (settings.customMessage) setCustomMessage(settings.customMessage)
    if (settings.persistNotification !== undefined)
      setPersistNotification(settings.persistNotification)
    if (settings.useColorfulIcons !== undefined)
      setUseColorfulIcons(settings.useColorfulIcons)
    if (settings.showWaterGoal !== undefined) setShowWaterGoal(settings.showWaterGoal)
    if (settings.dailyGoal) setDailyGoal(settings.dailyGoal)
    if (settings.playOnStartup !== undefined) setPlayOnStartup(settings.playOnStartup)
    if (settings.enableSnooze !== undefined) setEnableSnooze(settings.enableSnooze)
  }

  const handleSave = async () => {
    await chrome.storage.local.set({
      notificationType,
      soundType,
      volume,
      enableSchedule,
      startTime,
      endTime,
      useMotivational,
      customMessage,
      persistNotification,
      useColorfulIcons,
      showWaterGoal,
      dailyGoal,
      playOnStartup,
      enableSnooze,
    })

    chrome.runtime.sendMessage({ action: 'settingsUpdated' })

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const testSound = async () => {
    // Send message to background to play test sound
    try {
      await chrome.runtime.sendMessage({
        action: 'playTestSound',
        soundType: soundType,
        volume: volume
      })
    } catch (error) {
      console.error('Error playing test sound:', error)
    }
  }

  const sounds = [
    // MP3 Sounds (High Quality)
    { value: 'alarm', label: 'Alarm' },
    { value: 'aurora', label: 'Aurora' },
    { value: 'bamboo', label: 'Bamboo' },
    { value: 'chord', label: 'Chord' },
    { value: 'circles', label: 'Circles' },
    { value: 'complete', label: 'Complete' },
    { value: 'hello', label: 'Hello' },
    { value: 'input', label: 'Input' },
    { value: 'keys', label: 'Keys' },
    { value: 'note', label: 'Note' },
    { value: 'popcorn', label: 'Popcorn' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'synth', label: 'Synth' },
    // Water Themed (Generated)
    { value: 'water-drop', label: 'Water Drop' },
    { value: 'water-splash', label: 'Water Splash' },
    { value: 'water-pour', label: 'Water Pouring' },
    { value: 'bubble', label: 'Bubble Pop' },
    // System Sounds (Generated)
    { value: 'default', label: 'Default' },
    { value: 'beat', label: 'Beat' },
    { value: 'bling', label: 'Bling' },
    { value: 'chime', label: 'Chime' },
    { value: 'mamba', label: 'Mamba' },
    { value: 'single-beep', label: 'Single Beep' },
    { value: 'three-beeps', label: 'Three Beeps' },
    { value: 'whistle', label: 'Whistle' },
    { value: 'gentle-bell', label: 'Gentle Bell' },
    { value: 'wind-chime', label: 'Wind Chime' },
    { value: 'crystal', label: 'Crystal Bell' },
    { value: 'meditation-bell', label: 'Meditation Bell' },
    { value: 'pleasant', label: 'Pleasant Ding' },
    { value: 'soft-marimba', label: 'Soft Marimba' },
    { value: 'music-box', label: 'Music Box' },
    { value: 'harp', label: 'Harp Glissando' },
    { value: 'alert', label: 'Alert Tone' },
    { value: 'notification', label: 'Notification Ping' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hydration Hero Settings</h1>
          <p className="text-muted-foreground">Customize your water reminder experience</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={notificationType} onValueChange={setNotificationType}>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="audio" id="audio" />
                  <Label htmlFor="audio" className="cursor-pointer">
                    Audio Only - Play sound without popup
                  </Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="visual" id="visual" />
                  <Label htmlFor="visual" className="cursor-pointer">
                    Visual Only - Show popup without sound
                  </Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="cursor-pointer">
                    Both - Sound and popup notification
                  </Label>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value="fullscreen" id="fullscreen" />
                  <Label htmlFor="fullscreen" className="cursor-pointer">
                    Full Screen - Maximum visibility reminder
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Sound Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sound">Notification Sound</Label>
                <Select value={soundType} onValueChange={setSoundType}>
                  <SelectTrigger id="sound">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sounds.map((sound) => (
                      <SelectItem key={sound.value} value={sound.value}>
                        {sound.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="volume">Volume: {volume}%</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Slider
                    id="volume"
                    value={[volume]}
                    onValueChange={(value) => setVolume(value[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Button onClick={testSound} variant="outline" size="sm">
                    Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Active Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="schedule"
                  checked={enableSchedule}
                  onCheckedChange={setEnableSchedule}
                />
                <Label htmlFor="schedule">Enable schedule (prevent nighttime notifications)</Label>
              </div>

              {enableSchedule && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Reminder Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="motivational"
                  checked={useMotivational}
                  onCheckedChange={setUseMotivational}
                />
                <Label htmlFor="motivational">Use varied motivational messages</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="persist"
                  checked={persistNotification}
                  onCheckedChange={setPersistNotification}
                />
                <Label htmlFor="persist">Keep notification visible until dismissed</Label>
              </div>

              <div>
                <Label htmlFor="custom-message">Custom Message (optional)</Label>
                <Input
                  id="custom-message"
                  placeholder="e.g., Time to hydrate!"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Notification Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="colorful"
                  checked={useColorfulIcons}
                  onCheckedChange={setUseColorfulIcons}
                />
                <Label htmlFor="colorful">Use bright, colorful icons</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-goal"
                  checked={showWaterGoal}
                  onCheckedChange={setShowWaterGoal}
                />
                <Label htmlFor="show-goal">Show daily water goal in notifications</Label>
              </div>

              <div>
                <Label htmlFor="daily-goal">Daily Water Goal (glasses)</Label>
                <Input
                  id="daily-goal"
                  type="number"
                  min="1"
                  max="20"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(parseInt(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Advanced
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="startup"
                  checked={playOnStartup}
                  onCheckedChange={setPlayOnStartup}
                />
                <Label htmlFor="startup">Resume reminders on browser startup</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="snooze"
                  checked={enableSnooze}
                  onCheckedChange={setEnableSnooze}
                />
                <Label htmlFor="snooze">Enable snooze button (5 minutes)</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6" />

        <div className="flex items-center justify-center gap-4">
          <Button onClick={handleSave} size="lg" className="min-w-[200px] bg-black text-white hover:bg-gray-800">
            Save Settings
          </Button>
          {saved && (
            <p className="text-sm text-green-600 dark:text-green-400">✓ Settings saved successfully!</p>
          )}
        </div>
      </div>
    </div>
  )
}
