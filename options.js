// DOM Elements
const notificationTypeRadios = document.querySelectorAll('input[name="notificationType"]');
const soundSelect = document.getElementById('soundSelect');
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');
const testSoundBtn = document.getElementById('testSoundBtn');
const customSoundUpload = document.getElementById('customSoundUpload');
const soundFile = document.getElementById('soundFile');
const uploadSoundBtn = document.getElementById('uploadSoundBtn');
const soundFileName = document.getElementById('soundFileName');
const clearCustomSound = document.getElementById('clearCustomSound');
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

// Sound selection - show/hide custom upload
soundSelect.addEventListener('change', () => {
  if (soundSelect.value === 'custom') {
    customSoundUpload.style.display = 'block';
  } else {
    customSoundUpload.style.display = 'none';
  }
});

// Upload custom sound
uploadSoundBtn.addEventListener('click', async () => {
  const file = soundFile.files[0];
  
  if (!file) {
    alert('Please select an audio file first');
    return;
  }
  
  // Check file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('File is too large! Please choose a file under 2MB.');
    return;
  }
  
  // Check file type
  if (!file.type.startsWith('audio/')) {
    alert('Please select a valid audio file (MP3, WAV, or OGG)');
    return;
  }
  
  // Read file as base64
  const reader = new FileReader();
  reader.onload = async (e) => {
    const audioData = e.target.result;
    
    // Save to storage
    await chrome.storage.local.set({
      customSoundData: audioData,
      customSoundName: file.name
    });
    
    soundFileName.textContent = file.name;
    clearCustomSound.style.display = 'inline-block';
    
    alert('✓ Custom sound uploaded successfully!');
  };
  
  reader.readAsDataURL(file);
});

// Clear custom sound
clearCustomSound.addEventListener('click', async () => {
  if (confirm('Remove custom sound?')) {
    await chrome.storage.local.remove(['customSoundData', 'customSoundName']);
    soundFileName.textContent = 'No custom sound uploaded';
    clearCustomSound.style.display = 'none';
    soundFile.value = '';
    
    // Switch back to default sound
    soundSelect.value = 'default';
    customSoundUpload.style.display = 'none';
    
    alert('✓ Custom sound removed');
  }
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
    'customSoundData',
    'customSoundName',
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
  
  // Show custom sound upload if custom selected
  if (settings.soundType === 'custom') {
    customSoundUpload.style.display = 'block';
  }
  
  // Load custom sound info
  if (settings.customSoundName) {
    soundFileName.textContent = settings.customSoundName;
    clearCustomSound.style.display = 'inline-block';
  }

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
async function playTestSound() {
  const volume = volumeSlider.value / 100;
  const soundType = soundSelect.value;

  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // If custom sound is selected, play it
  if (soundType === 'custom') {
    const settings = await chrome.storage.local.get(['customSoundData']);
    
    if (settings.customSoundData) {
      currentAudio = new Audio(settings.customSoundData);
      currentAudio.volume = volume;
      currentAudio.play().catch(err => {
        console.error('Error playing custom sound:', err);
        alert('Error playing custom sound. Please try a different file.');
      });
      return;
    } else {
      alert('Please upload a custom sound first!');
      return;
    }
  }

  // For built-in sounds, use Web Audio API to generate simple tones
  playTone(soundType, volume);
}

// Generate tone using Web Audio API
function playTone(soundType, volume) {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const soundProfiles = {
    // Water Themed Sounds
    'water-drop': {
      type: 'sine',
      notes: [
        { freq: 1200, duration: 0.05, volume: volume * 0.8 },
        { freq: 900, duration: 0.05, volume: volume * 0.6 },
        { freq: 600, duration: 0.08, volume: volume * 0.4 }
      ]
    },
    'water-splash': {
      type: 'sine',
      notes: [
        { freq: 1500, duration: 0.03, volume: volume * 0.5 },
        { freq: 1200, duration: 0.03, volume: volume * 0.7 },
        { freq: 900, duration: 0.04, volume: volume * 0.6 },
        { freq: 700, duration: 0.05, volume: volume * 0.4 }
      ]
    },
    'water-pour': {
      type: 'sine',
      notes: [
        { freq: 400, duration: 0.15, volume: volume * 0.3 },
        { freq: 500, duration: 0.15, volume: volume * 0.4 },
        { freq: 450, duration: 0.15, volume: volume * 0.3 }
      ]
    },
    'bubble': {
      type: 'sine',
      notes: [
        { freq: 800, duration: 0.08, volume: volume * 0.6 },
        { freq: 1000, duration: 0.06, volume: volume * 0.4 }
      ]
    },
    
    // Bells & Chimes
    'default': {
      type: 'sine',
      notes: [
        { freq: 800, duration: 0.1, volume: volume * 0.7 },
        { freq: 600, duration: 0.1, volume: volume * 0.5 }
      ]
    },
    'gentle-bell': {
      type: 'sine',
      notes: [
        { freq: 523, duration: 0.15, volume: volume * 0.6 },
        { freq: 659, duration: 0.15, volume: volume * 0.5 }
      ]
    },
    'wind-chime': {
      type: 'triangle',
      notes: [
        { freq: 659, duration: 0.1, volume: volume * 0.5 },
        { freq: 784, duration: 0.1, volume: volume * 0.4 },
        { freq: 988, duration: 0.1, volume: volume * 0.3 }
      ]
    },
    'crystal': {
      type: 'sine',
      notes: [
        { freq: 1047, duration: 0.12, volume: volume * 0.6 },
        { freq: 1319, duration: 0.12, volume: volume * 0.5 }
      ]
    },
    'meditation-bell': {
      type: 'sine',
      notes: [
        { freq: 396, duration: 0.2, volume: volume * 0.7 }
      ]
    },
    
    // Pleasant Tones
    'pleasant': {
      type: 'sine',
      notes: [
        { freq: 880, duration: 0.1, volume: volume * 0.6 },
        { freq: 1100, duration: 0.1, volume: volume * 0.5 }
      ]
    },
    'soft-marimba': {
      type: 'sine',
      notes: [
        { freq: 523, duration: 0.08, volume: volume * 0.7 },
        { freq: 659, duration: 0.08, volume: volume * 0.6 },
        { freq: 784, duration: 0.1, volume: volume * 0.5 }
      ]
    },
    'music-box': {
      type: 'square',
      notes: [
        { freq: 1047, duration: 0.12, volume: volume * 0.3 },
        { freq: 1319, duration: 0.12, volume: volume * 0.25 }
      ]
    },
    'harp': {
      type: 'sine',
      notes: [
        { freq: 523, duration: 0.06, volume: volume * 0.4 },
        { freq: 659, duration: 0.06, volume: volume * 0.5 },
        { freq: 784, duration: 0.06, volume: volume * 0.6 },
        { freq: 1047, duration: 0.08, volume: volume * 0.5 }
      ]
    },
    
    // Alerts
    'alert': {
      type: 'sine',
      notes: [
        { freq: 1200, duration: 0.1, volume: volume * 0.7 },
        { freq: 1000, duration: 0.1, volume: volume * 0.6 }
      ]
    },
    'beep': {
      type: 'square',
      notes: [
        { freq: 800, duration: 0.15, volume: volume * 0.5 }
      ]
    },
    'notification': {
      type: 'sine',
      notes: [
        { freq: 600, duration: 0.08, volume: volume * 0.6 },
        { freq: 900, duration: 0.08, volume: volume * 0.5 }
      ]
    }
  };

  const profile = soundProfiles[soundType] || soundProfiles.default;
  let currentTime = audioContext.currentTime;

  profile.notes.forEach((note) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = note.freq;
    oscillator.type = profile.type;

    gainNode.gain.setValueAtTime(note.volume, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + note.duration);

    currentTime += note.duration;
  });
}

// Helper to generate beep sound data URL (placeholder)
function generateBeepSound(frequency, duration) {
  // This is a placeholder - in production, you'd use actual audio files
  return '';
}

