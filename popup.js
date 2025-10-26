// DOM Elements
const intervalInput = document.getElementById('intervalInput');
const intervalSlider = document.getElementById('intervalSlider');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const settingsBtn = document.getElementById('settingsBtn');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const nextReminder = document.getElementById('nextReminder');
const timeRemaining = document.getElementById('timeRemaining');
const glassCount = document.getElementById('glassCount');
const addGlass = document.getElementById('addGlass');
const resetGlasses = document.getElementById('resetGlasses');
const snoozeBtn = document.getElementById('snoozeBtn');
const presetBtns = document.querySelectorAll('.preset-btn');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();
  await updateUI();
  startCountdown();
});

// Sync input and slider
intervalInput.addEventListener('input', () => {
  intervalSlider.value = intervalInput.value;
  saveInterval();
});

intervalSlider.addEventListener('input', () => {
  intervalInput.value = intervalSlider.value;
  saveInterval();
});

// Preset buttons
presetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const minutes = parseInt(btn.dataset.minutes);
    intervalInput.value = minutes;
    intervalSlider.value = minutes;
    saveInterval();
  });
});

// Start button
startBtn.addEventListener('click', async () => {
  const interval = parseInt(intervalInput.value);
  
  chrome.runtime.sendMessage({
    action: 'startReminder',
    interval: interval
  });
  
  await updateUI();
});

// Stop button
stopBtn.addEventListener('click', async () => {
  chrome.runtime.sendMessage({ action: 'stopReminder' });
  await updateUI();
});

// Snooze button
snoozeBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'snoozeReminder' });
});

// Settings button
settingsBtn.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Water tracking
addGlass.addEventListener('click', async () => {
  const result = await chrome.storage.local.get(['glassesCount', 'lastResetDate']);
  let count = result.glassesCount || 0;
  const today = new Date().toDateString();
  
  // Reset if new day
  if (result.lastResetDate !== today) {
    count = 0;
  }
  
  count++;
  
  await chrome.storage.local.set({
    glassesCount: count,
    lastResetDate: today
  });
  
  glassCount.textContent = count;
  
  // Animate
  glassCount.classList.add('pulse');
  setTimeout(() => glassCount.classList.remove('pulse'), 300);
});

resetGlasses.addEventListener('click', async () => {
  if (confirm('Reset today\'s water intake?')) {
    await chrome.storage.local.set({
      glassesCount: 0,
      lastResetDate: new Date().toDateString()
    });
    glassCount.textContent = '0';
  }
});

// Load settings
async function loadSettings() {
  const result = await chrome.storage.local.get(['interval', 'glassesCount', 'lastResetDate']);
  
  if (result.interval) {
    intervalInput.value = result.interval;
    intervalSlider.value = result.interval;
  }
  
  const today = new Date().toDateString();
  let count = result.glassesCount || 0;
  
  // Reset count if new day
  if (result.lastResetDate !== today) {
    count = 0;
    await chrome.storage.local.set({
      glassesCount: 0,
      lastResetDate: today
    });
  }
  
  glassCount.textContent = count;
}

// Save interval
async function saveInterval() {
  const interval = parseInt(intervalInput.value);
  await chrome.storage.local.set({ interval });
}

// Update UI based on reminder state
async function updateUI() {
  const result = await chrome.storage.local.get(['isActive', 'nextAlarmTime']);
  const isActive = result.isActive || false;
  
  if (isActive) {
    statusIndicator.classList.remove('inactive');
    statusIndicator.classList.add('active');
    statusText.textContent = 'Active';
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    snoozeBtn.style.display = 'inline-block';
    nextReminder.style.display = 'block';
  } else {
    statusIndicator.classList.remove('active');
    statusIndicator.classList.add('inactive');
    statusText.textContent = 'Inactive';
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    snoozeBtn.style.display = 'none';
    nextReminder.style.display = 'none';
  }
}

// Countdown timer
function startCountdown() {
  setInterval(async () => {
    const result = await chrome.storage.local.get(['isActive', 'nextAlarmTime']);
    
    if (result.isActive && result.nextAlarmTime) {
      const now = Date.now();
      const remaining = result.nextAlarmTime - now;
      
      if (remaining > 0) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        timeRemaining.textContent = `${minutes}m ${seconds}s`;
      } else {
        timeRemaining.textContent = 'Soon...';
      }
    }
  }, 1000);
}

// Listen for messages from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateUI') {
    updateUI();
  }
});

