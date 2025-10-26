# Testing Guide - Hydration Hero React Extension

## Installation for Testing

1. **Build the extension**:
   ```bash
   npm install
   npm run build
   ```

2. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from the project

3. **Verify installation**:
   - You should see the Hydration Hero extension with a water droplet icon
   - Click the extension icon to open the popup

## Testing Features

### 1. Popup Interface (shadcn/ui Components)

**Test the minimalistic shadcn design**:
- [ ] Popup opens with clean, minimal white design
- [ ] All buttons use shadcn button styles
- [ ] Cards have proper shadcn borders and shadows
- [ ] Inputs and sliders use shadcn styling

**Test reminder controls**:
- [ ] Set interval using input field (1-480 minutes)
- [ ] Use slider to adjust interval
- [ ] Click preset buttons (15, 30, 45, 60, 90, 120 min)
- [ ] Click "Start Reminders" - status should show "Active"
- [ ] Timer countdown should display correctly

**Test water tracking**:
- [ ] Click "Add Glass" - counter should increment
- [ ] Click reset button - confirm dialog appears
- [ ] Refresh popup - counter should persist
- [ ] Check that counter resets at midnight

### 2. Settings Page (Options)

**Access settings**:
- Click the settings icon in popup, OR
- Right-click extension icon → "Options"

**Test shadcn UI components**:
- [ ] Clean, minimalistic design with shadcn colors
- [ ] All form controls use shadcn components
- [ ] Cards are properly styled
- [ ] Buttons use shadcn variants (primary, outline, ghost)

**Test Notification Type** (RadioGroup component):
- [ ] Switch between: Audio Only, Visual Only, Both, Full Screen
- [ ] Save and verify each mode works

**Test Sound Settings** (Select & Slider components):
- [ ] Select different sounds from dropdown
- [ ] Adjust volume slider (0-100%)
- [ ] Click "Test" button to preview sound
- [ ] Verify all 15+ built-in sounds work

**Test Active Hours** (Switch & Input components):
- [ ] Toggle "Enable schedule" switch
- [ ] Set start time (e.g., 08:00)
- [ ] Set end time (e.g., 22:00)
- [ ] Verify notifications only occur within this window

**Test Message Settings** (Switch & Input components):
- [ ] Toggle "Use varied motivational messages"
- [ ] Toggle "Keep notification visible until dismissed"
- [ ] Enter custom message
- [ ] Save and verify message appears in notifications

**Test Appearance** (Switch & Input components):
- [ ] Toggle "Use bright, colorful icons"
- [ ] Toggle "Show daily water goal in notifications"
- [ ] Set daily goal (glasses)
- [ ] Save and verify settings persist

**Test Advanced** (Switch components):
- [ ] Toggle "Resume reminders on browser startup"
- [ ] Toggle "Enable snooze button"
- [ ] Restart browser and verify auto-resume works

### 3. Notifications

**Test different notification types**:

**Audio + Visual (Default)**:
- [ ] Wait for timer to end
- [ ] Hear sound play
- [ ] See Chrome notification popup
- [ ] Notification has water icon
- [ ] Notification has motivational message

**Full Screen**:
- [ ] Set notification type to "Full Screen" in settings
- [ ] Wait for timer
- [ ] Full-screen overlay appears with shadcn Card
- [ ] Click "I Drank Water!" - window closes, counter increments
- [ ] Click "Remind Me Later" - window closes, snoozes 5 min

**Audio Only**:
- [ ] Set to "Audio Only"
- [ ] Wait for timer
- [ ] Sound plays, no popup

**Visual Only**:
- [ ] Set to "Visual Only"
- [ ] Wait for timer
- [ ] Popup shows, no sound

### 4. System Permissions

**macOS Notification Permissions**:
- Go to System Settings → Notifications → Google Chrome
- [ ] Ensure "Allow Notifications" is ON
- [ ] Test that notifications appear

### 5. Service Worker (Background)

**Test background functionality**:
- Open service worker console:
  - Go to `chrome://extensions/`
  - Click "service worker" under Hydration Hero
- [ ] Verify no console errors
- [ ] Check logs when timer fires
- [ ] Verify alarm creation logs

### 6. Responsive Design

**Test UI consistency**:
- [ ] Popup width is fixed at 380px
- [ ] Settings page is desktop-optimized (max-width: 1200px)
- [ ] All shadcn components render properly
- [ ] No layout issues or overflow

### 7. Data Persistence

**Test storage**:
- [ ] Set all settings, close browser completely
- [ ] Reopen browser
- [ ] Verify all settings persist
- [ ] Verify water count persists (same day)
- [ ] Change system date and verify water count resets

### 8. Edge Cases

**Test error handling**:
- [ ] Set interval to 0 or negative - should default to 1
- [ ] Set interval to 1000+ - should cap at 480
- [ ] Disable notifications in browser - verify graceful handling
- [ ] Clear all extension data - verify defaults load

### 9. TypeScript Build

**Verify build**:
```bash
npm run build
```
- [ ] No TypeScript errors
- [ ] No linter warnings
- [ ] dist folder generated correctly
- [ ] All assets copied properly

### 10. Performance

**Test responsiveness**:
- [ ] Popup opens instantly (<100ms)
- [ ] Settings page loads quickly
- [ ] No lag when adjusting sliders
- [ ] Notifications appear on time (not delayed)
- [ ] Extension doesn't slow down browser

## Known Issues

None currently! 🎉

## Reporting Issues

If you find any bugs:
1. Check the service worker console for errors
2. Note the steps to reproduce
3. Include your Chrome version
4. Create an issue on GitHub

## React DevTools

For developers:
1. Install React Developer Tools extension
2. Open the popup/options page
3. Open DevTools
4. Use the React tab to inspect component state

## Debugging Tips

**Console locations**:
- **Popup**: Right-click popup → Inspect
- **Options**: Right-click options page → Inspect  
- **Service Worker**: chrome://extensions/ → "service worker" link
- **Fullscreen**: Opens in new window, use F12

**Storage inspection**:
- Open any console
- Run: `chrome.storage.local.get(console.log)`
- View all stored data

**Manual notification test**:
- Open service worker console
- Run:
```javascript
chrome.notifications.create({
  type: 'basic',
  iconUrl: chrome.runtime.getURL('icons/icon128.png'),
  title: '💧 Test',
  message: 'Test notification',
  priority: 2
});
```

## Success Criteria

✅ All shadcn components render with minimal, clean styling
✅ No custom colors outside shadcn's palette
✅ All features from vanilla version work in React version
✅ No TypeScript errors
✅ No console errors during normal operation
✅ Notifications appear reliably and on time
✅ All settings persist correctly
✅ Water tracking works accurately

Happy testing! 💧
