// Humor-based notification titles
const NOTIFICATION_TITLES = [
  "Your Body's Calling...",
  "Hydration Alert!",
  "Water Break Time!",
  "Friendly Reminder from Your Kidneys",
  "Don't Be a Raisin",
  "H2O Time!",
  "Your Cells Are Thirsty",
  "Time to Drink Up!",
  "Hydration Station",
  "Water O'Clock",
  "Thirst Trap Alert",
  "Your Daily Hydration Nudge",
  "Drink Water or Else...",
  "PSA: You Need Water",
  "Water Time, Champion!",
  "Hydrate or Diedrate",
  "Your Brain Needs This",
  "Mandatory Water Break",
  "Hydration Check!",
  "You Know What Time It Is"
];

// Motivational messages array
const MOTIVATIONAL_MESSAGES = [
  // Humor-based
  "Your brain is 75% water. Don't let it turn into a raisin.",
  "Coffee doesn't count. Yes, we need to have this talk again.",
  "Remember: You're not hungry, you're thirsty. Drink up!",
  "Your kidneys called. They'd like some support here.",
  "Fun fact: Ignoring this won't make you less thirsty.",
  "That headache? Probably dehydration. Try water before WebMD.",
  "Your body is not a cactus. It needs water more than once a week.",
  "Plot twist: The fountain of youth is literally just... water.",
  "Still thinking about it? Your cells are filing complaints.",
  "This is your bladder's favorite notification. Make it happen.",
  
  // Fact-based nudges
  "Your blood is 90% water. Keep it flowing smoothly.",
  "Dehydration reduces cognitive performance by 30%. Don't be that person.",
  "Water flushes toxins. Your liver will send a thank you note.",
  "Mild dehydration slows metabolism by 3%. Science says drink up.",
  "Your muscles are 79% water. Hydrate or cramp. Your choice.",
  "Drinking water boosts productivity by 14%. That's free performance.",
  "Your skin cells are 64% water. Want to look younger? Here's your secret.",
  "Water improves mood. Cheaper than therapy, faster than meditation.",
  "Dehydration causes fatigue. That 3pm slump? This could fix it.",
  "Your joints need water to lubricate. Think of it as WD-40 for humans.",
  
  // Urgent nudges
  "You haven't had water in a while. Your future self is judging you.",
  "Dry mouth is your body's last warning. This is the first.",
  "Waiting for thirst? That means you're already dehydrated. Too late!",
  "Your concentration is dropping. Water can fix this in 5 minutes.",
  "Headache creeping in? 9 out of 10 times, it's dehydration.",
  "That brain fog? Water clears it faster than another coffee.",
  "Your energy is tanking. Coffee is a lie. Water is the truth.",
  "Feeling tired? You're not tired, you're dehydrated. Big difference.",
  "Your body is literally asking for water. Don't ghost it.",
  "This is not a suggestion. Your kidneys are 100% serious.",
  
  // Relatable humor
  "Yes, you'll pee more. That's called 'functioning kidneys'. Embrace it.",
  "Water: Because your body isn't designed to run on iced lattes.",
  "Hydrate now or regret it during your 2am bathroom trip.",
  "Your plants get watered daily. Surely you deserve the same?",
  "If your urine looks like apple juice, we need to talk.",
  "You water your plants, you charge your phone... now water yourself.",
  "Drinking water: The only trend that's actually backed by science.",
  "Your body: 60% water. Your coffee intake: Not helpful.",
  "Water is free. Kidney stones are expensive. Do the math.",
  "You shower on the outside. Time to shower on the inside.",
  
  // Health facts with urgency
  "72 hours without water = game over. Stay ahead of the curve.",
  "Your brain shrinks when dehydrated. Literally. Drink water.",
  "Water regulates body temperature. Don't be a overheated laptop.",
  "Dehydration increases stress hormones. Already stressed? This helps.",
  "Your heart pumps 2,000 gallons daily. Give it quality fuel.",
  "Water helps burn calories. It's not a diet, it's chemistry.",
  "Dehydration ages skin faster. Free anti-aging hack right here.",
  "Your digestive system needs water. Unless you enjoy constipation?",
  "Water carries nutrients to cells. They're waiting. Patiently.",
  "Proper hydration improves sleep quality. Tonight-you will thank you.",
  
  // Witty reminders
  "You're 60% water. Maintain your majority shareholder.",
  "Being dehydrated is so last hour. Be hydrated instead.",
  "Water: The original energy drink since 3.5 billion years ago.",
  "Your cells are having a meeting about your water intake. It's not going well.",
  "NASA spent millions on space water. You have a tap. Use it.",
  "Dehydration makes you irritable. Save your relationships. Drink water.",
  "You're basically a houseplant with complex emotions. Act accordingly.",
  "Water is the only thing your body can't negotiate on. Non-negotiable.",
  "Your future self is watching. Make them proud. Hydrate.",
  "If you were a plant, you'd be wilting right now. Don't wilt.",
  
  // Performance-based
  "Athletes drink water before feeling thirsty. Be an athlete at hydration.",
  "Want better focus? Water increases it by 14%. That's a superpower.",
  "Dehydration kills productivity. Your to-do list is judging you.",
  "Water improves memory. What were you doing? Oh right, drinking water.",
  "Physical performance drops 30% when dehydrated. Don't be at 70%.",
  "Your brain is 2% of your body but uses 20% of your water. Feed it.",
  "Water helps muscle recovery. Even if you're just sitting, they're working.",
  "Hydrated people make better decisions. Including the decision to drink water.",
  "Reaction time slows when dehydrated. Unless you're trying to avoid this notification?",
  "Water improves mood and energy. Both things you could use right now.",
  
  // Direct facts
  "You lose 2.5 liters of water daily just by existing. Replace it.",
  "Drinking water before meals reduces calorie intake by 13%.",
  "75% of people are chronically dehydrated. Don't be a statistic.",
  "Water helps prevent kidney stones. They're as fun as they sound. (Not fun.)",
  "Your spine discs are 80% water. Back pain? This might help.",
  "Drinking water can reduce allergy and asthma symptoms. Science is cool.",
  "Water prevents hangovers better than any 'cure'. Prevention > cure.",
  "Your cartilage is 80% water. Joint pain? You know what to do.",
  "Proper hydration prevents UTIs. Your urinary tract thanks you.",
  "Water helps regulate blood pressure. Your heart will literally love you.",
  
  // Funny but effective
  "Ignore this and your pee will be the color of regret.",
  "Water: Because your body doesn't accept crypto, only H2O.",
  "You're not 'forgetting' to drink water. You're choosing dehydration.",
  "Your organs are having a staff meeting about your neglect.",
  "Drink water or become a human raisin. Dramatic, but accurate.",
  "Your body: 'Please water me.' You: *opens another soda*. Your body: 😐",
  "This notification has better hydration habits than you.",
  "Water is calling. It's been calling. Please pick up.",
  "Your cells are ghosting you because you ghost water.",
  "Hydration: The only peer pressure you should give in to.",
  
  // Smart nudges
  "Small wins count. One glass is better than zero glasses.",
  "You brushed your teeth. You got dressed. Now drink water. Complete the trio.",
  "Past you set this reminder. Don't disappoint past you.",
  "Future you needs this water. Be kind to your future self.",
  "You took the time to read this. Take 10 seconds to drink water.",
  "Screen time: 6 hours. Water time: 0 minutes. Fix the ratio.",
  "You're here anyway. Might as well make it worth the notification.",
  "What's easier: Drinking water now or having a headache later?",
  "You've scrolled 500 feet today. Walk 5 feet to get water.",
  "This is reminder #[X] today. Please don't make it go higher.",
  
  // Last resort messages
  "Okay, this is getting ridiculous. Drink. Water. Now.",
  "Your body is 60% water, not 60% excuses. Let's go.",
  "If you were a plant, someone would have watered you by now.",
  "I'm just a browser extension, but even I know you need water.",
  "At this point, I'm concerned. Are you okay? Do you need help finding water?"
];

// Default settings
const DEFAULT_SETTINGS = {
  notificationType: 'both',
  soundType: 'chord',
  volume: 50,
  enableSchedule: false,
  startTime: '08:00',
  endTime: '22:00',
  useMotivational: true,
  customMessage: '',
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
  } else if (message.action === 'playTestSound') {
    playNotificationSound(message.soundType, message.volume);
  } else if (message.action === 'testNotification') {
    testNotification(message.notificationType);
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
      await playNotificationSound(settings.soundType || 'chord', settings.volume || 50);
    }
    
    // Show visual notification if needed
    if (notificationType === 'visual' || notificationType === 'both') {
      console.log('Creating visual notification...');
      
      // Use absolute path to PNG icon
      const iconUrl = chrome.runtime.getURL('icons/icon128.png');
      console.log('Icon URL:', iconUrl);
      
      try {
        // Pick a random humorous title
        const title = NOTIFICATION_TITLES[Math.floor(Math.random() * NOTIFICATION_TITLES.length)];
        
        const notificationId = await chrome.notifications.create({
          type: 'basic',
          iconUrl: iconUrl,
          title: title,
          message: message,
          priority: 2,
          requireInteraction: false,
          silent: true  // We handle sound separately
        });
        
        console.log('✓ Notification created successfully! ID:', notificationId);
        
        // Auto-increment glass count when notification is shown
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
          
          console.log('✓ Auto-incremented glass count to:', count);
        });
        
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
      soundType: soundType || 'chord',
      volume: volume || 50,
      customSoundData: customSoundData
    });

    console.log('Sound playback initiated:', soundType);
  } catch (err) {
    console.error('Error playing notification sound:', err);
  }
}

// Test notification function
async function testNotification(notificationType: string) {
  try {
    console.log('Testing notification type:', notificationType);
    
    const testMessage = "This is a test notification!";
    
    // Play sound if needed
    if (notificationType === 'audio' || notificationType === 'both') {
      const settings = await chrome.storage.local.get(['soundType', 'volume']);
      await playNotificationSound(settings.soundType || 'chord', settings.volume || 50);
    }
    
    // Show visual notification if needed
    if (notificationType === 'visual' || notificationType === 'both') {
      const iconUrl = chrome.runtime.getURL('icons/icon128.png');
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: iconUrl,
        title: 'Test Notification',
        message: testMessage,
        priority: 2,
        requireInteraction: false,
        silent: true
      });
    }
    
    // Show fullscreen notification if needed
    if (notificationType === 'fullscreen') {
      await chrome.windows.create({
        url: chrome.runtime.getURL('fullscreen.html'),
        type: 'popup',
        focused: true,
        state: 'fullscreen'
      });
    }
    
    console.log('Test notification completed');
  } catch (error) {
    console.error('Error testing notification:', error);
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

// Notification click handler - just dismiss the notification
chrome.notifications.onClicked.addListener((notificationId) => {
  chrome.notifications.clear(notificationId);
  console.log('Notification dismissed');
});

// Keep service worker alive
chrome.alarms.create('keepAlive', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') {
    // Just keep the service worker alive
    console.log('Service worker alive');
  }
});

