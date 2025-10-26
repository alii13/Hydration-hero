// DOM Elements
const notificationTypeRadios = document.querySelectorAll('input[name="notificationType"]');
const soundSelect = document.getElementById('soundSelect');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const testSoundBtn = document.getElementById('testSoundBtn');
const enableSchedule = document.getElementById('enableSchedule');
const scheduleInputs = document.getElementById('scheduleInputs');
const startTime = document.getElementById('startTime');
const endTime = document.getElementById('endTime');
const useMotivational = document.getElementById('useMotivational');
const persistNotification = document.getElementById('persistNotification');
const customMessage = document.getElementById('customMessage');
const messagePreview = document.getElementById('messagePreview');
const useColorfulIcons = document.getElementById('useColorfulIcons');
const showWaterGoal = document.getElementById('showWaterGoal');
const dailyGoal = document.getElementById('dailyGoal');
const playOnStartup = document.getElementById('playOnStartup');
const enableSnooze = document.getElementById('enableSnooze');
const saveBtn = document.getElementById('saveBtn');
const saveStatus = document.getElementById('saveStatus');

// Audio context for testing sounds
let audioContext;
let currentAudio;

// Load settings on page load
document.addEventListener('DOMContentLoaded', loadSettings);

// Volume slider
volumeSlider.addEventListener('input', () => {
  volumeValue.textContent = volumeSlider.value;
});

// Test sound
testSoundBtn.addEventListener('click', () => {
  playTestSound();
});

// Schedule toggle
enableSchedule.addEventListener('change', () => {
  scheduleInputs.style.opacity = enableSchedule.checked ? '1' : '0.5';
  startTime.disabled = !enableSchedule.checked;
  endTime.disabled = !enableSchedule.checked;
});

// Custom message preview
customMessage.addEventListener('input', updateMessagePreview);
useMotivational.addEventListener('change', updateMessagePreview);

// Save button
saveBtn.addEventListener('click', saveSettings);

// Load settings from storage
async function loadSettings() {
  const settings = await chrome.storage.local.get([
    'notificationType',
    'soundType',
    'volume',
    'enableSchedule',
    'startTime',
    'endTime',
    'useMotivational',
    'persistNotification',
    'customMessage',
    'useColorfulIcons',
    'showWaterGoal',
    'dailyGoal',
    'playOnStartup',
    'enableSnooze'
  ]);

  // Set notification type
  const notType = settings.notificationType || 'both';
  document.querySelector(`input[name="notificationType"][value="${notType}"]`).checked = true;

  // Set sound
  soundSelect.value = settings.soundType || 'default';

  // Set volume
  const vol = settings.volume !== undefined ? settings.volume : 50;
  volumeSlider.value = vol;
  volumeValue.textContent = vol;

  // Set schedule
  enableSchedule.checked = settings.enableSchedule || false;
  startTime.value = settings.startTime || '08:00';
  endTime.value = settings.endTime || '22:00';
  scheduleInputs.style.opacity = enableSchedule.checked ? '1' : '0.5';
  startTime.disabled = !enableSchedule.checked;
  endTime.disabled = !enableSchedule.checked;

  // Set messages
  useMotivational.checked = settings.useMotivational !== false;
  persistNotification.checked = settings.persistNotification || false;
  customMessage.value = settings.customMessage || '';

  // Set appearance
  useColorfulIcons.checked = settings.useColorfulIcons !== false;
  showWaterGoal.checked = settings.showWaterGoal || false;
  dailyGoal.value = settings.dailyGoal || 8;

  // Set advanced
  playOnStartup.checked = settings.playOnStartup || false;
  enableSnooze.checked = settings.enableSnooze !== false;

  updateMessagePreview();
}

// Save settings
async function saveSettings() {
  const selectedNotificationType = document.querySelector('input[name="notificationType"]:checked').value;

  const settings = {
    notificationType: selectedNotificationType,
    soundType: soundSelect.value,
    volume: parseInt(volumeSlider.value),
    enableSchedule: enableSchedule.checked,
    startTime: startTime.value,
    endTime: endTime.value,
    useMotivational: useMotivational.checked,
    persistNotification: persistNotification.checked,
    customMessage: customMessage.value,
    useColorfulIcons: useColorfulIcons.checked,
    showWaterGoal: showWaterGoal.checked,
    dailyGoal: parseInt(dailyGoal.value),
    playOnStartup: playOnStartup.checked,
    enableSnooze: enableSnooze.checked
  };

  await chrome.storage.local.set(settings);

  // Notify background script
  chrome.runtime.sendMessage({ action: 'settingsUpdated' });

  // Show success message
  saveStatus.classList.add('show');
  setTimeout(() => {
    saveStatus.classList.remove('show');
  }, 3000);
}

// Update message preview
function updateMessagePreview() {
  const messages = [
    "💧 Stay hydrated! Your body needs water.",
    "🚰 Time for a water break!",
    "💙 Drink some water - your body will thank you!",
    "⚡ Hydration boost time!",
    "🌊 Get hydrated! Water is life.",
    "✨ Keep your body refreshed with water!"
  ];

  if (customMessage.value.trim()) {
    messagePreview.textContent = customMessage.value;
  } else if (useMotivational.checked) {
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    messagePreview.textContent = randomMsg;
  } else {
    messagePreview.textContent = "Time to drink water!";
  }
}

// Play test sound
function playTestSound() {
  const volume = volumeSlider.value / 100;
  const soundType = soundSelect.value;

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Create audio element
  currentAudio = new Audio();
  currentAudio.volume = volume;

  // Generate sound based on type
  const soundUrls = {
    default: generateBeepSound(800, 0.1),
    gentle: generateBeepSound(600, 0.15),
    water: generateBeepSound(1000, 0.08),
    pleasant: generateBeepSound(880, 0.12),
    alert: generateBeepSound(1200, 0.1)
  };

  // For now, use Web Audio API to generate simple tones
  playTone(soundType, volume);
}

// Generate tone using Web Audio API
function playTone(soundType, volume) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const frequencies = {
    default: [800, 600],
    gentle: [600, 500],
    water: [1000, 800, 600],
    pleasant: [880, 1100],
    alert: [1200, 1000]
  };

  const freqs = frequencies[soundType] || frequencies.default;
  const duration = 0.1;

  freqs.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime + index * duration);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (index + 1) * duration);

    oscillator.start(audioContext.currentTime + index * duration);
    oscillator.stop(audioContext.currentTime + (index + 1) * duration);
  });
}

// Helper to generate beep sound data URL (placeholder)
function generateBeepSound(frequency, duration) {
  // This is a placeholder - in production, you'd use actual audio files
  return '';
}

