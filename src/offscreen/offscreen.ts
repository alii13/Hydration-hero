// Offscreen document for playing audio
// Service workers can't play audio, so we use this offscreen document

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === 'playSound') {
    playSound(message.soundType, message.volume, message.customSoundData);
    sendResponse({ success: true });
  }
  return true;
});

async function playSound(soundType: string, volume: number, customSoundData?: string) {
  // If custom sound
  if (soundType === 'custom' && customSoundData) {
    try {
      const audio = new Audio(customSoundData);
      audio.volume = (volume || 50) / 100;
      await audio.play();
      return;
    } catch (err) {
      console.error('Error playing custom sound:', err);
    }
  }

  // List of sounds that use MP3 files
  const mp3Sounds = [
    'alarm', 'aurora', 'bamboo', 'chord', 'circles', 
    'complete', 'hello', 'input', 'keys', 'note', 
    'popcorn', 'pulse', 'synth'
  ];

  // If it's an MP3 sound, load and play the file
  if (mp3Sounds.includes(soundType)) {
    try {
      const soundFile = `${soundType.charAt(0).toUpperCase() + soundType.slice(1)}.mp3`;
      const audio = new Audio(chrome.runtime.getURL(`sounds/${soundFile}`));
      audio.volume = (volume || 50) / 100;
      await audio.play();
      return;
    } catch (err) {
      console.error('Error playing MP3 sound:', err);
    }
  }

  // Generate built-in sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const volumeValue = (volume || 50) / 100;

  type SoundProfile = {
    type: OscillatorType;
    notes: { freq: number; duration: number; volume: number }[];
  };

  const soundProfiles: Record<string, SoundProfile> = {
    // Water Themed Sounds
    'water-drop': {
      type: 'sine',
      notes: [
        { freq: 1200, duration: 0.05, volume: volumeValue * 0.8 },
        { freq: 900, duration: 0.05, volume: volumeValue * 0.6 },
        { freq: 600, duration: 0.08, volume: volumeValue * 0.4 }
      ]
    },
    'water-splash': {
      type: 'sine',
      notes: [
        { freq: 1500, duration: 0.03, volume: volumeValue * 0.5 },
        { freq: 1200, duration: 0.03, volume: volumeValue * 0.7 },
        { freq: 900, duration: 0.04, volume: volumeValue * 0.6 },
        { freq: 700, duration: 0.05, volume: volumeValue * 0.4 }
      ]
    },
    'water-pour': {
      type: 'sine',
      notes: [
        { freq: 400, duration: 0.15, volume: volumeValue * 0.3 },
        { freq: 500, duration: 0.15, volume: volumeValue * 0.4 },
        { freq: 450, duration: 0.15, volume: volumeValue * 0.3 }
      ]
    },
    'bubble': {
      type: 'sine',
      notes: [
        { freq: 800, duration: 0.08, volume: volumeValue * 0.6 },
        { freq: 1000, duration: 0.06, volume: volumeValue * 0.4 }
      ]
    },
    'default': {
      type: 'sine',
      notes: [
        { freq: 800, duration: 0.1, volume: volumeValue * 0.7 },
        { freq: 600, duration: 0.1, volume: volumeValue * 0.5 }
      ]
    },

    'beat': {
      type: 'square',
      notes: [
        { freq: 440, duration: 0.05, volume: volumeValue * 0.6 },
        { freq: 554, duration: 0.05, volume: volumeValue * 0.6 }
      ]
    },
    'bling': {
      type: 'sine',
      notes: [
        { freq: 1319, duration: 0.08, volume: volumeValue * 0.7 },
        { freq: 1568, duration: 0.12, volume: volumeValue * 0.5 }
      ]
    },
    'chime': {
      type: 'sine',
      notes: [
        { freq: 1047, duration: 0.15, volume: volumeValue * 0.6 },
        { freq: 1319, duration: 0.15, volume: volumeValue * 0.5 },
        { freq: 1568, duration: 0.2, volume: volumeValue * 0.4 }
      ]
    },
    'mamba': {
      type: 'triangle',
      notes: [
        { freq: 523, duration: 0.08, volume: volumeValue * 0.5 },
        { freq: 698, duration: 0.08, volume: volumeValue * 0.6 },
        { freq: 880, duration: 0.1, volume: volumeValue * 0.5 }
      ]
    },
    'single-beep': {
      type: 'sine',
      notes: [
        { freq: 1000, duration: 0.12, volume: volumeValue * 0.7 }
      ]
    },
    'three-beeps': {
      type: 'sine',
      notes: [
        { freq: 1000, duration: 0.08, volume: volumeValue * 0.6 },
        { freq: 1000, duration: 0.08, volume: volumeValue * 0.6 },
        { freq: 1000, duration: 0.08, volume: volumeValue * 0.6 }
      ]
    },
    'whistle': {
      type: 'sine',
      notes: [
        { freq: 800, duration: 0.05, volume: volumeValue * 0.4 },
        { freq: 1000, duration: 0.05, volume: volumeValue * 0.5 },
        { freq: 1200, duration: 0.1, volume: volumeValue * 0.6 },
        { freq: 1400, duration: 0.12, volume: volumeValue * 0.5 }
      ]
    },
    'gentle-bell': {
      type: 'sine',
      notes: [
        { freq: 523, duration: 0.15, volume: volumeValue * 0.6 },
        { freq: 659, duration: 0.15, volume: volumeValue * 0.5 }
      ]
    },
    'wind-chime': {
      type: 'triangle',
      notes: [
        { freq: 659, duration: 0.1, volume: volumeValue * 0.5 },
        { freq: 784, duration: 0.1, volume: volumeValue * 0.4 },
        { freq: 988, duration: 0.1, volume: volumeValue * 0.3 }
      ]
    },
    'crystal': {
      type: 'sine',
      notes: [
        { freq: 1047, duration: 0.12, volume: volumeValue * 0.6 },
        { freq: 1319, duration: 0.12, volume: volumeValue * 0.5 }
      ]
    },
    'meditation-bell': {
      type: 'sine',
      notes: [
        { freq: 396, duration: 0.2, volume: volumeValue * 0.7 }
      ]
    },
    'pleasant': {
      type: 'sine',
      notes: [
        { freq: 880, duration: 0.1, volume: volumeValue * 0.6 },
        { freq: 1100, duration: 0.1, volume: volumeValue * 0.5 }
      ]
    },
    'soft-marimba': {
      type: 'sine',
      notes: [
        { freq: 523, duration: 0.08, volume: volumeValue * 0.7 },
        { freq: 659, duration: 0.08, volume: volumeValue * 0.6 },
        { freq: 784, duration: 0.1, volume: volumeValue * 0.5 }
      ]
    },
    'music-box': {
      type: 'square',
      notes: [
        { freq: 1047, duration: 0.12, volume: volumeValue * 0.3 },
        { freq: 1319, duration: 0.12, volume: volumeValue * 0.25 }
      ]
    },
    'harp': {
      type: 'sine',
      notes: [
        { freq: 523, duration: 0.06, volume: volumeValue * 0.4 },
        { freq: 659, duration: 0.06, volume: volumeValue * 0.5 },
        { freq: 784, duration: 0.06, volume: volumeValue * 0.6 },
        { freq: 1047, duration: 0.08, volume: volumeValue * 0.5 }
      ]
    },
    'alert': {
      type: 'sine',
      notes: [
        { freq: 1200, duration: 0.1, volume: volumeValue * 0.7 },
        { freq: 1000, duration: 0.1, volume: volumeValue * 0.6 }
      ]
    },
    'beep': {
      type: 'square',
      notes: [
        { freq: 800, duration: 0.15, volume: volumeValue * 0.5 }
      ]
    },
    'notification': {
      type: 'sine',
      notes: [
        { freq: 600, duration: 0.08, volume: volumeValue * 0.6 },
        { freq: 900, duration: 0.08, volume: volumeValue * 0.5 }
      ]
    }
  };

  const profile = soundProfiles[soundType] || soundProfiles['default'];
  let currentTime = audioContext.currentTime;

  profile.notes.forEach((note: { freq: number; duration: number; volume: number }) => {
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

console.log('Offscreen audio player ready');

