# Hydration Hero - React + shadcn/ui Extension

A beautiful, minimalistic water reminder Chrome extension built with React, TypeScript, Vite, and shadcn/ui components.

## Features

💧 **Smart Reminders**
- Customizable reminder intervals (1-480 minutes)
- Quick preset buttons (15, 30, 45, 60, 90, 120 minutes)
- Schedule active hours to avoid nighttime notifications

🔔 **Notification Options**
- Audio only, visual only, both, or full-screen reminders
- 15+ built-in notification sounds including water-themed sounds
- Custom sound upload support
- Volume control with test button

🎯 **Water Tracking**
- Track daily water intake
- Set daily goals
- Auto-reset at midnight
- Progress display in notifications

💬 **Motivational Messages**
- 100+ built-in motivational messages
- Custom message support
- Bright, colorful icons

⚙️ **Advanced Features**
- Snooze for 5 minutes
- Resume on browser startup
- Persistent notifications option
- Full-screen reminder mode

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Build in development mode (watch)
npm run dev
```

## Installation

1. Build the extension: `npm run build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Chrome Extension Manifest V3** - Extension API

## Project Structure

```
src/
├── popup/          # Extension popup (click icon)
├── options/        # Settings page
├── fullscreen/     # Full-screen reminder
├── background/     # Service worker
├── offscreen/      # Audio playback
├── components/ui/  # shadcn/ui components
└── lib/           # Utilities
```

## License

MIT License - See LICENSE file for details

## Contributing

See CONTRIBUTING.md for contribution guidelines.
