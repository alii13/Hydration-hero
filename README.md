# 💧 Hydration Hero - Water Reminder Extension

A beautiful, intuitive Chrome extension that helps you stay hydrated throughout the day with customizable reminders and motivational messages.

## ✨ Features

### 🎯 Core Functionality
- **Flexible Reminder Intervals**: Set reminders from 1 minute to 8 hours (1-480 minutes)
- **Quick Presets**: One-click access to common intervals (15min, 30min, 45min, 1hr, 1.5hrs, 2hrs)
- **Smart Scheduling**: Set active hours to prevent nighttime notifications
- **Persistent Settings**: Your reminder keeps running even when you pause/stop (interval is preserved)
- **Accurate Timing**: Uses Chrome Alarms API for reliable, precise notifications

### 🔔 Notification Options
- **Four Notification Types**:
  - Audio Only - Sound without popup
  - Visual Only - Silent popup notification
  - Both - Sound + popup (default)
  - Full Screen - Maximum visibility reminder window
  
### 🔊 Sound Customization
- **Multiple Sound Options**: Default Chime, Gentle Bell, Water Drop, Pleasant Ding, Alert Tone
- **Volume Control**: Adjustable volume slider (0-100%)
- **Test Button**: Preview sounds before saving

### 💬 Motivational Messages
- **20+ Varied Messages**: Rotating motivational reminders like:
  - "💧 Stay hydrated! Your body needs water."
  - "⚡ Hydration boost time!"
  - "🧠 Stay sharp - drink water!"
  - And many more!
- **Custom Messages**: Set your own personalized reminder text
- **Bright Icons**: Colorful, attention-grabbing notification icons
- **Persistent Notifications**: Option to keep notifications visible until dismissed

### 📊 Water Tracking
- **Daily Glass Counter**: Track how many glasses you've drunk today
- **Auto-Reset**: Automatically resets at midnight
- **Quick Add**: Click notification to auto-increment counter
- **Goal Tracking**: Set daily water goals (1-20 glasses)
- **Progress Display**: Optionally show progress in notifications

### ⏰ Smart Scheduling
- **Active Hours**: Set start and end times (e.g., 8 AM - 10 PM)
- **Prevents Night Interruptions**: No more annoying alerts while sleeping
- **Resume on Startup**: Option to automatically resume reminders when browser starts
- **Snooze Feature**: 5-minute snooze button for when you're busy

### 🎨 Modern UI/UX
- **Beautiful Design**: Gradient backgrounds, smooth animations
- **Intuitive Interface**: Clean, easy-to-understand controls
- **Real-time Countdown**: See exactly when your next reminder will trigger
- **Visual Status**: Color-coded active/inactive indicators
- **Preset Buttons**: Quick-select common intervals

## 🚀 Installation

### From Source (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/yourusername/Water-drink-reminder.git
   cd Water-drink-reminder
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top-right corner)

4. Click "Load unpacked"

5. Select the `Water-drink-reminder` folder

6. The extension icon (💧) should appear in your toolbar!

### Icon Setup (Optional)

The extension includes SVG icons that work directly in Chrome. If you prefer PNG icons:

**Option 1 - ImageMagick:**
```bash
brew install imagemagick  # macOS
# or: sudo apt-get install imagemagick  # Linux
./convert-icons.sh
```

**Option 2 - Python:**
```bash
pip install pillow cairosvg
cd icons && python3 create-pngs.py
```

**Option 3 - Manual:**
Use any image editor or online converter to convert the SVG files in the `icons/` directory to PNG.

## 📖 Usage

### Quick Start
1. Click the extension icon to open the popup
2. Set your desired reminder interval (default: 30 minutes)
3. Click "Start Reminders"
4. Stay hydrated! 💧

### Accessing Settings
- Click the ⚙️ icon in the popup, or
- Right-click the extension icon → Options

### Tracking Your Water Intake
- Click "Add Glass" in the popup when you drink water
- Or click the notification to auto-increment
- Your daily count resets automatically at midnight

### Pausing Reminders
- Click "Pause Reminders" to stop notifications
- Your interval setting is preserved
- Click "Start Reminders" to resume with the same interval

## 🛠️ Technology Stack

- **Manifest V3**: Latest Chrome extension format
- **Service Worker**: Background script for reliable alarms
- **Chrome Alarms API**: Precise, battery-efficient notifications
- **Chrome Storage API**: Persistent settings and data
- **Chrome Notifications API**: System-level notifications
- **Vanilla JavaScript**: No dependencies, lightweight and fast
- **Modern CSS**: Gradients, animations, and responsive design

## 📁 Project Structure

```
Water-drink-reminder/
├── manifest.json           # Extension configuration
├── popup.html             # Main popup interface
├── popup.js               # Popup logic and UI updates
├── options.html           # Settings page
├── options.js             # Settings logic
├── background.js          # Service worker (alarms, notifications)
├── fullscreen.html        # Full-screen reminder view
├── styles.css             # Shared styles
├── icons/                 # Extension icons (SVG + PNG)
│   ├── icon16.svg/png
│   ├── icon32.svg/png
│   ├── icon48.svg/png
│   └── icon128.svg/png
├── convert-icons.sh       # Icon conversion utility
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ideas for Contributions
- 🎨 **UI/UX Improvements**: Better animations, themes, accessibility
- 🔊 **More Sounds**: Add new notification sound options
- 💬 **More Messages**: Expand the motivational message library
- 🌍 **Internationalization**: Multi-language support
- 📊 **Analytics**: Better tracking and statistics
- 🎯 **Features**: Water intake goals, streak tracking, reminders for other activities
- 🐛 **Bug Fixes**: Report and fix issues
- 📝 **Documentation**: Improve docs, add tutorials, create videos

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly in Chrome
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use clear, descriptive variable names
- Comment complex logic
- Follow existing code structure
- Test all notification types
- Ensure settings persist correctly

### Testing Checklist
- [ ] Reminders trigger at correct intervals
- [ ] All notification types work (audio, visual, both, fullscreen)
- [ ] Settings save and load correctly
- [ ] Schedule (active hours) works properly
- [ ] Water counter increments and resets
- [ ] Pause/resume preserves interval
- [ ] Extension works after browser restart

## 🐛 Known Issues & Limitations

- Custom audio files not yet supported (uses generated tones)
- Full-screen notifications may be blocked by popup blockers
- Sound volume control uses generated tones (no audio file support yet)

## 📝 License

MIT License - feel free to use, modify, and distribute!

## 🙏 Acknowledgments

Built with ❤️ to help people stay healthy and hydrated.

Inspired by user feedback and the need for a truly intuitive, feature-rich water reminder extension.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/Water-drink-reminder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/Water-drink-reminder/discussions)
- **Email**: your.email@example.com

---

**Stay hydrated, stay healthy! 💧**

⭐ If you find this extension helpful, please star the repository!

