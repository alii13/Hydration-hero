// Motivational messages array
const MOTIVATIONAL_MESSAGES = [
  "💧 Stay hydrated! Your body needs water.",
  "🚰 Time for a water break!",
  "💙 Drink some water - your body will thank you!",
  "⚡ Hydration boost time!",
  "🌊 Get hydrated! Water is life.",
  "✨ Keep your body refreshed with water!",
  "💪 Water helps your muscles and brain!",
  "🧠 Stay sharp - drink water!",
  "🏃 Fuel your body with H2O!",
  "☀️ Refresh yourself with a glass of water!",
  "💚 Your health matters - drink up!",
  "🎯 Time to reach your hydration goal!",
  "🌟 You're doing great! Don't forget water!",
  "🔥 Keep your energy up with water!",
  "💎 Treat your body right - hydrate!",
  "🌈 Brighten your day with water!",
  "🏆 Champions stay hydrated!",
  "🎨 Creative minds need water!",
  "📚 Stay focused - time for water!",
  "❤️ Love yourself, drink water!",
  "💧 Your cells are thirsty - drink up!",
  "🌟 Water: nature's energy drink!",
  "🎯 Hydration is self-care!",
  "💪 Strong bodies need water!",
  "🧘 Stay calm and drink water.",
  "🌺 Bloom with hydration!",
  "⭐ You deserve this water break!",
  "🎪 Make hydration your daily habit!",
  "🌸 Fresh water, fresh mind!",
  "💖 Water is the best medicine.",
  "🎨 Paint your day with hydration!",
  "🌻 Grow stronger with every sip!",
  "🏃‍♀️ Hydrate to dominate!",
  "🎵 Dance through life, stay hydrated!",
  "🌙 Dream big, drink water!",
  "☕ Take a water break, you earned it!",
  "🎭 Performance starts with hydration!",
  "🌍 Join the hydration revolution!",
  "💎 Water: liquid gold for your body!",
  "🎪 The show must go on - with water!",
  "🌈 Taste the rainbow of health!",
  "🚀 Fuel your journey with H2O!",
  "🎯 Hit your hydration target!",
  "🌟 Shine brighter when hydrated!",
  "💫 Magic happens when you're hydrated!",
  "🎨 Create your best self with water!",
  "🌺 Blossom with proper hydration!",
  "🏋️ Power up with water!",
  "🎪 Your body is the main event - hydrate it!",
  "💝 Give your body the gift of water.",
  "🌊 Ride the wave of wellness!",
  "🎯 Bulls-eye! Time for water!",
  "🌟 Sparkle from the inside out!",
  "💪 Build your strength, one glass at a time!",
  "🎵 Keep your rhythm with hydration!",
  "🌸 Fresh as morning dew? Drink water!",
  "⚡ Charge yourself with H2O!",
  "🎨 Color your world with hydration!",
  "🏆 Victory tastes like water!",
  "💙 Deep breath, deep sip!",
  "🌻 Sunshine and water - perfect combo!",
  "🎪 Step right up for hydration!",
  "🌟 You're a star - stars need water too!",
  "💎 Precious moments need precious water!",
  "🎯 Stay on target - drink water!",
  "🌈 Over the rainbow with hydration!",
  "🚀 Launch into your day with water!",
  "💫 Wishes come true when hydrated!",
  "🎨 Masterpiece in progress - add water!",
  "🌺 Exotic wellness starts here!",
  "🏃 Sprint towards hydration!",
  "💝 Self-love = drinking water!",
  "🌊 Go with the flow, drink H2O!",
  "🎯 Precision performance needs water!",
  "🌟 Illuminate your health!",
  "💪 Flex your hydration game!",
  "🎵 Symphony of health - drink up!",
  "🌸 Petal-soft skin loves water!",
  "⚡ Lightning-fast energy from water!",
  "🎨 Express yourself through hydration!",
  "🏆 Gold medal moment - drink water!",
  "💙 Ocean of benefits in every glass!",
  "🌻 Sunflower power through water!",
  "🎪 Greatest show: your health journey!",
  "🌟 Twinkle with hydration!",
  "💎 Diamonds are forever, so is hydration!",
  "🎯 Center yourself with water!",
  "🌈 Double rainbow energy!",
  "🚀 Blast off with H2O power!",
  "💫 Cosmic energy through hydration!",
  "🎨 Artist's secret: stay hydrated!",
  "🌺 Tropical vibes and water!",
  "🏃‍♀️ Marathon of life needs water!",
  "💝 Heartfelt hydration reminder!",
  "🌊 Surf the wellness wave!",
  "🎯 Direct hit on health goals!",
  "🌟 Constellation of wellness!",
  "💪 Hulk-level hydration time!",
  "🎵 Melody of health plays on!",
  "🌸 Garden of health needs watering!",
  "⚡ Thunder of energy awaits!",
  "🎨 Canvas of life needs water!"
];

// Default settings
const DEFAULT_SETTINGS = {
  notificationType: 'both',
  soundType: 'default',
  volume: 50,
  enableSchedule: false,
  startTime: '08:00',
  endTime: '22:00',
  useMotivational: true,
  persistNotification: false,
  customMessage: '',
  useColorfulIcons: true,
  showWaterGoal: false,
  dailyGoal: 8,
  playOnStartup: false,
  enableSnooze: true,
  interval: 30
};

// Initialize on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Hydration Hero installed');
  
  // Set default settings if not already set
  const settings = await chrome.storage.local.get(Object.keys(DEFAULT_SETTINGS));
  const needsDefaults = Object.keys(DEFAULT_SETTINGS).some(key => settings[key] === undefined);
  
  if (needsDefaults) {
    await chrome.storage.local.set(DEFAULT_SETTINGS);
  }
  
  // Initialize tracking data
  await chrome.storage.local.set({
    isActive: false,
    glassesCount: 0,
    lastResetDate: new Date().toDateString(),
    nextAlarmTime: null
  });
});

// Listen for messages from popup and options
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.action === 'startReminder') {
    startReminder(message.interval);
  } else if (message.action === 'stopReminder') {
    stopReminder();
  } else if (message.action === 'snoozeReminder') {
    snoozeReminder();
  } else if (message.action === 'settingsUpdated') {
    handleSettingsUpdate();
  }
});

// Start reminder
async function startReminder(interval: number) {
  console.log('Starting reminder with interval:', interval);
  
  // Check if we're within active hours
  await isWithinActiveHours();
  
  // Clear any existing alarms
  await chrome.alarms.clear('waterReminder');
  
  // Create new alarm
  chrome.alarms.create('waterReminder', {
    delayInMinutes: interval,
    periodInMinutes: interval
  });
  
  // Calculate next alarm time
  const nextAlarmTime = Date.now() + (interval * 60 * 1000);
  
  // Update state
  await chrome.storage.local.set({
    isActive: true,
    interval: interval,
    nextAlarmTime: nextAlarmTime
  });
  
  console.log('Reminder started. Next alarm at:', new Date(nextAlarmTime));
}

// Stop reminder
async function stopReminder() {
  console.log('Stopping reminder');
  
  await chrome.alarms.clear('waterReminder');
  
  // Update state but keep interval setting
  const { interval } = await chrome.storage.local.get(['interval']);
  await chrome.storage.local.set({
    isActive: false,
    nextAlarmTime: null
  });
  
  console.log('Reminder stopped. Interval preserved:', interval);
}

// Snooze reminder (5 minutes)
async function snoozeReminder() {
  console.log('Snoozing reminder for 5 minutes');
  
  await chrome.alarms.clear('waterReminder');
  
  // Get current interval
  const { interval } = await chrome.storage.local.get(['interval']);
  
  // Set snooze alarm
  chrome.alarms.create('waterReminder', {
    delayInMinutes: 5,
    periodInMinutes: interval || 30
  });
  
  const nextAlarmTime = Date.now() + (5 * 60 * 1000);
  await chrome.storage.local.set({ nextAlarmTime });
  
  console.log('Snoozed. Next alarm at:', new Date(nextAlarmTime));
}

// Handle alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'waterReminder') {
    console.log('Alarm triggered:', alarm.name);
    
    // Check if within active hours
    const canNotify = await isWithinActiveHours();
    
    if (canNotify) {
      await showNotification();
      
      // Update next alarm time
      const { interval } = await chrome.storage.local.get(['interval']);
      const nextAlarmTime = Date.now() + ((interval || 30) * 60 * 1000);
      await chrome.storage.local.set({ nextAlarmTime });
    } else {
      console.log('Outside active hours, skipping notification');
      
      // Still update next alarm time for countdown
      const { interval } = await chrome.storage.local.get(['interval']);
      const nextAlarmTime = Date.now() + ((interval || 30) * 60 * 1000);
      await chrome.storage.local.set({ nextAlarmTime });
    }
  }
});

// Check if current time is within active hours
async function isWithinActiveHours() {
  const settings = await chrome.storage.local.get(['enableSchedule', 'startTime', 'endTime']);
  
  if (!settings.enableSchedule) {
    return true; // No schedule set, always active
  }
  
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const [startHour, startMin] = settings.startTime.split(':').map(Number);
  const startTimeMinutes = startHour * 60 + startMin;
  
  const [endHour, endMin] = settings.endTime.split(':').map(Number);
  const endTimeMinutes = endHour * 60 + endMin;
  
  if (startTimeMinutes <= endTimeMinutes) {
    // Normal case: start time is before end time (e.g., 8:00 to 22:00)
    return currentTime >= startTimeMinutes && currentTime <= endTimeMinutes;
  } else {
    // Crosses midnight (e.g., 22:00 to 08:00)
    return currentTime >= startTimeMinutes || currentTime <= endTimeMinutes;
  }
}

// Show notification
async function showNotification() {
  try {
    const settings = await chrome.storage.local.get([
      'notificationType',
      'soundType',
      'volume',
      'useMotivational',
      'customMessage',
      'persistNotification',
      'useColorfulIcons',
      'showWaterGoal',
      'dailyGoal',
      'glassesCount'
    ]);
    
    console.log('Notification settings:', settings);
    
    // Get message
    let message = 'Time to drink water!';
    
    if (settings.customMessage && settings.customMessage.trim()) {
      message = settings.customMessage;
    } else if (settings.useMotivational !== false) {
      message = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    }
    
    // Add progress if enabled
    if (settings.showWaterGoal) {
      const glasses = settings.glassesCount || 0;
      const goal = settings.dailyGoal || 8;
      message += `\n\nProgress: ${glasses}/${goal} glasses today`;
    }
    
    const notificationType = settings.notificationType || 'both';
    console.log('Notification type:', notificationType);
    
    // Play sound if needed
    if (notificationType === 'audio' || notificationType === 'both') {
      console.log('Playing sound...');
      await playNotificationSound(settings.soundType || 'default', settings.volume || 50);
    }
    
    // Show visual notification if needed
    if (notificationType === 'visual' || notificationType === 'both') {
      console.log('Creating visual notification...');
      
      // Use absolute path to PNG icon
      const iconUrl = chrome.runtime.getURL('icons/icon128.png');
      console.log('Icon URL:', iconUrl);
      
      try {
        const notificationId = await chrome.notifications.create({
          type: 'basic',
          iconUrl: iconUrl,
          title: '💧 Hydration Reminder',
          message: message,
          priority: 2,
          requireInteraction: settings.persistNotification || false,
          silent: true  // We handle sound separately
        });
        
        console.log('✓ Notification created successfully! ID:', notificationId);
        
        // Verify notification was created
        chrome.notifications.getAll((notifications) => {
          console.log('All active notifications:', notifications);
        });
      } catch (err) {
        console.error('❌ Failed to create notification:', err);
      }
    }
    
    // Full screen notification
    if (notificationType === 'fullscreen') {
      console.log('Creating fullscreen notification...');
      const window = await chrome.windows.create({
        url: 'fullscreen.html',
        type: 'popup',
        width: 500,
        height: 300,
        focused: true
      });
      console.log('Fullscreen window created:', window.id);
    }
    
    console.log('✓ Notification process completed');
  } catch (error) {
    console.error('Error showing notification:', error);
  }
}

// Play notification sound
async function playNotificationSound(soundType: string, volume: number) {
  try {
    // Create offscreen document if it doesn't exist
    const existingContexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT' as chrome.runtime.ContextType]
    });

    if (existingContexts.length === 0) {
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK' as chrome.offscreen.Reason],
        justification: 'Play notification sound for water reminder'
      });
    }

    // Get custom sound data if needed
    let customSoundData = null;
    if (soundType === 'custom') {
      const settings = await chrome.storage.local.get(['customSoundData']);
      customSoundData = settings.customSoundData;
    }

    // Send message to offscreen document to play sound
    await chrome.runtime.sendMessage({
      action: 'playSound',
      soundType: soundType || 'default',
      volume: volume || 50,
      customSoundData: customSoundData
    });

    console.log('Sound playback initiated:', soundType);
  } catch (err) {
    console.error('Error playing notification sound:', err);
  }
}

// Handle settings update
async function handleSettingsUpdate() {
  console.log('Settings updated');
  
  // If reminder is active, update the alarm with new settings
  const { isActive, interval } = await chrome.storage.local.get(['isActive', 'interval']);
  
  if (isActive) {
    // Restart reminder with current interval
    await startReminder(interval);
  }
}

// Handle browser startup
chrome.runtime.onStartup.addListener(async () => {
  const settings = await chrome.storage.local.get(['playOnStartup', 'isActive', 'interval']);
  
  if (settings.playOnStartup && settings.isActive) {
    console.log('Resuming reminder on startup');
    await startReminder(settings.interval || 30);
  }
});

// Notification click handler
chrome.notifications.onClicked.addListener((notificationId) => {
  // Auto-increment glass count when notification is clicked
  chrome.storage.local.get(['glassesCount', 'lastResetDate'], (result) => {
    let count = result.glassesCount || 0;
    const today = new Date().toDateString();
    
    if (result.lastResetDate !== today) {
      count = 0;
    }
    
    count++;
    
    chrome.storage.local.set({
      glassesCount: count,
      lastResetDate: today
    });
    
    console.log('Glass count incremented:', count);
  });
  
  chrome.notifications.clear(notificationId);
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    // Just keep the service worker alive
    console.log('Service worker alive');
  }
});

