# Contributing to Hydration Hero 💧

First off, thank you for considering contributing to Hydration Hero! It's people like you that make this extension better for everyone.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title**: Describe the issue concisely
- **Steps to reproduce**: Detailed steps to reproduce the behavior
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: Chrome version, OS, extension version

### Suggesting Features

Feature requests are welcome! Please provide:

- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Any alternative solutions you've considered
- **Additional context**: Mockups, examples, or references

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes**
3. **Test thoroughly** - use the testing checklist below
4. **Update documentation** if needed
5. **Write a clear commit message**
6. **Submit the pull request**

## 🔨 Development Guidelines

### Code Style

- Use **2 spaces** for indentation
- Use **camelCase** for variables and functions
- Use **PascalCase** for constants arrays (like `MOTIVATIONAL_MESSAGES`)
- Add **comments** for complex logic
- Keep functions **small and focused**

### File Organization

- `popup.*` - Main popup interface
- `options.*` - Settings page
- `background.js` - Service worker (alarms, notifications)
- `fullscreen.html` - Full-screen reminder
- `styles.css` - Shared styles

### Testing Checklist

Before submitting a PR, verify:

- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] No console errors in popup, options, or background
- [ ] All four notification types work correctly
- [ ] Settings save and persist after browser restart
- [ ] Timer intervals are accurate (test with 1-2 minute intervals)
- [ ] Active hours scheduling works correctly
- [ ] Water counter increments and resets daily
- [ ] Pause/resume preserves interval settings
- [ ] Volume control works
- [ ] Snooze feature works
- [ ] UI is responsive and looks good
- [ ] No breaking changes to existing features

### Adding Features

#### Adding New Notification Sounds

1. Add sound configuration in `background.js`:
   ```javascript
   const frequencies = {
     // ... existing sounds
     yourSound: [freq1, freq2, freq3]
   };
   ```

2. Add option in `options.html`:
   ```html
   <option value="yourSound">Your Sound Name</option>
   ```

3. Test with the "Test Sound" button

#### Adding Motivational Messages

1. Edit `MOTIVATIONAL_MESSAGES` array in `background.js`:
   ```javascript
   const MOTIVATIONAL_MESSAGES = [
     // ... existing messages
     "🌟 Your new motivational message!"
   ];
   ```

2. Keep messages positive, encouraging, and under 80 characters
3. Include an emoji for visual appeal

#### Adding UI Features

1. Update relevant HTML file (`popup.html` or `options.html`)
2. Add JavaScript logic in corresponding `.js` file
3. Style in `styles.css` (for shared) or inline styles
4. Ensure animations are smooth (60fps)
5. Test on different screen sizes

### Storage Keys

Current storage keys (don't change without migration):

```javascript
{
  // Settings
  notificationType: 'audio' | 'visual' | 'both' | 'fullscreen',
  soundType: 'default' | 'gentle' | 'water' | 'pleasant' | 'alert',
  volume: 0-100,
  interval: 1-480,
  enableSchedule: boolean,
  startTime: 'HH:MM',
  endTime: 'HH:MM',
  useMotivational: boolean,
  persistNotification: boolean,
  customMessage: string,
  showWaterGoal: boolean,
  dailyGoal: number,
  playOnStartup: boolean,
  enableSnooze: boolean,
  
  // Runtime state
  isActive: boolean,
  nextAlarmTime: timestamp,
  glassesCount: number,
  lastResetDate: string
}
```

## 🎨 Design Principles

- **Simplicity First**: Keep UI clean and intuitive
- **Visual Feedback**: Provide clear feedback for all actions
- **Performance**: Keep the extension lightweight
- **Accessibility**: Consider users with different abilities
- **Privacy**: No data collection, everything stored locally

## 🐛 Debugging Tips

### View Background Service Worker Logs
1. Go to `chrome://extensions/`
2. Find "Hydration Hero"
3. Click "service worker" link
4. View console logs

### Test Alarms
```javascript
// In background service worker console
chrome.alarms.getAll(console.log);
chrome.storage.local.get(console.log);
```

### Clear All Data
```javascript
// In any extension page console
chrome.storage.local.clear();
chrome.alarms.clearAll();
```

### Force Notification
```javascript
// In background service worker console
showNotification();
```

## 📚 Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Alarms API](https://developer.chrome.com/docs/extensions/reference/alarms/)
- [Chrome Notifications API](https://developer.chrome.com/docs/extensions/reference/notifications/)

## ❓ Questions?

Feel free to:
- Open an issue with the `question` label
- Start a discussion on GitHub Discussions
- Reach out to the maintainers

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Forever appreciated! 🙏

---

**Happy coding, and stay hydrated! 💧**

