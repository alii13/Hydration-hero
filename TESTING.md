# Testing Guide for Hydration Hero 💧

## Quick Start - Load Extension in Chrome

### Step 1: Open Chrome Extensions Page
1. Open Google Chrome browser
2. Navigate to: `chrome://extensions/`
3. Or click: **Menu (⋮)** → **Extensions** → **Manage Extensions**

### Step 2: Enable Developer Mode
1. Look for **"Developer mode"** toggle in the top-right corner
2. Click to enable it (it should turn blue/on)

### Step 3: Load Unpacked Extension
1. Click the **"Load unpacked"** button (appears after enabling Developer mode)
2. Navigate to your project folder: `/Users/shekh/Water-drink-reminder`
3. Select the folder and click **"Select"** or **"Open"**

### Step 4: Verify Installation
✅ You should see:
- **Hydration Hero** card appear in your extensions list
- A water drop icon (💧) in your Chrome toolbar
- Status showing "Active" or "Enabled"

---

## 🧪 Complete Testing Checklist

### Basic Functionality

#### Test 1: Open Popup
- [ ] Click the extension icon in toolbar
- [ ] Popup opens with clean, animated interface
- [ ] Status shows "Inactive" with gray dot
- [ ] Default interval is 30 minutes
- [ ] Water counter shows 0 glasses

#### Test 2: Start Reminders
- [ ] Set interval to **1 minute** (for quick testing)
- [ ] Click **"Start Reminders"** button
- [ ] Status changes to "Active" with green pulsing dot
- [ ] Countdown timer appears and counts down
- [ ] Button changes to "Pause Reminders"

#### Test 3: Wait for Notification
- [ ] Wait 1 minute (or your set interval)
- [ ] Notification appears with sound
- [ ] Shows motivational message with emoji
- [ ] Chrome notification popup is visible

#### Test 4: Test Water Tracking
- [ ] Click **"Add Glass"** button in popup
- [ ] Counter increments to 1
- [ ] Number animates (pulse effect)
- [ ] Click notification to auto-add glass (optional)
- [ ] Click **"Reset"** to clear counter

#### Test 5: Pause and Resume
- [ ] Click **"Pause Reminders"**
- [ ] Status changes to "Inactive"
- [ ] No more notifications appear
- [ ] Note: interval setting is preserved
- [ ] Click **"Start Reminders"** again
- [ ] Reminders resume with same interval

---

### Settings Page Testing

#### Access Settings
- [ ] Click ⚙️ icon in popup
- [ ] Settings page opens in new tab
- [ ] OR right-click extension icon → **Options**

#### Test Notification Types
1. **Audio Only**
   - [ ] Select "Audio Only" radio button
   - [ ] Click "Save Settings"
   - [ ] Wait for next reminder
   - [ ] Verify: Sound plays, NO popup appears

2. **Visual Only**
   - [ ] Select "Visual Only"
   - [ ] Save and wait
   - [ ] Verify: Popup appears, NO sound plays

3. **Both** (Default)
   - [ ] Select "Both"
   - [ ] Save and wait
   - [ ] Verify: Both sound AND popup appear

4. **Full Screen**
   - [ ] Select "Full Screen"
   - [ ] Save and wait
   - [ ] Verify: Large popup window opens with message

#### Test Sound Settings
- [ ] Select different sound from dropdown
- [ ] Adjust volume slider (0-100%)
- [ ] Click **"Test Sound"** button
- [ ] Verify sound plays at correct volume
- [ ] Try all 5 sound options

#### Test Active Hours (Schedule)
- [ ] Enable "Enable schedule" checkbox
- [ ] Set start time: `08:00` (8 AM)
- [ ] Set end time: `22:00` (10 PM)
- [ ] Save settings
- [ ] **To test**: Change system time outside these hours
- [ ] Verify: No notifications appear outside active hours

#### Test Custom Messages
- [ ] Uncheck "Use varied motivational messages"
- [ ] Enter custom message: "Time to drink water!"
- [ ] Save and wait for reminder
- [ ] Verify: Your custom message appears
- [ ] Re-enable motivational messages
- [ ] Verify: Random messages appear again

#### Test Other Settings
- [ ] Toggle "Keep notification visible until dismissed"
- [ ] Set daily water goal (e.g., 8 glasses)
- [ ] Enable "Show daily water goal in notifications"
- [ ] Save and verify notification shows progress

---

### Advanced Testing

#### Test Snooze Feature
- [ ] Start reminders with short interval
- [ ] When notification appears, click "Snooze (5 min)"
- [ ] Verify: Next reminder delayed by 5 minutes
- [ ] Check countdown timer updates correctly

#### Test Preset Buttons
- [ ] Click each preset button in popup:
  - [ ] 15 min
  - [ ] 30 min
  - [ ] 45 min
  - [ ] 1 hour
  - [ ] 1.5 hours
  - [ ] 2 hours
- [ ] Verify: Input and slider update correctly

#### Test Slider
- [ ] Drag interval slider
- [ ] Verify: Number input updates in real-time
- [ ] Try minimum (1) and maximum (480) values

#### Test Daily Reset
- [ ] Add some glasses to counter
- [ ] Note the count
- [ ] **Manual test**: Change system date to next day
- [ ] Reopen popup
- [ ] Verify: Counter resets to 0

#### Test Browser Restart
- [ ] Enable "Resume reminders on browser startup" in settings
- [ ] Start reminders
- [ ] Close Chrome completely
- [ ] Reopen Chrome
- [ ] Verify: Reminders resume automatically (if enabled)
- [ ] OR verify: Reminders don't auto-start (if disabled)

---

## 🐛 Debugging Tips

### View Console Logs

**Background Service Worker:**
1. Go to `chrome://extensions/`
2. Find "Hydration Hero"
3. Click **"service worker"** link (blue text)
4. Console opens with background logs

**Popup Console:**
1. Open popup by clicking extension icon
2. Right-click inside popup
3. Select **"Inspect"**
4. Console opens with popup logs

**Options Console:**
1. Open options page
2. Right-click on page
3. Select **"Inspect"**
4. Console opens

### Check Storage
In any console (popup, options, or background):
```javascript
// View all stored data
chrome.storage.local.get(console.log);

// View specific settings
chrome.storage.local.get(['interval', 'isActive', 'glassesCount'], console.log);

// Clear all data (reset extension)
chrome.storage.local.clear();
```

### Check Alarms
In background service worker console:
```javascript
// View active alarms
chrome.alarms.getAll(console.log);

// Clear all alarms
chrome.alarms.clearAll();
```

### Force a Notification
In background service worker console:
```javascript
// Manually trigger notification
showNotification();
```

---

## 🎯 Quick Test Scenarios

### Scenario 1: First Time User (5 min)
1. Load extension
2. Click icon, set to 1 minute
3. Start reminders
4. Wait for notification
5. Add a glass when reminded
6. Check settings page
7. Save with custom preferences

### Scenario 2: Power User (10 min)
1. Set 2-hour interval with presets
2. Configure active hours (8 AM - 10 PM)
3. Enable custom message
4. Test all 4 notification types
5. Adjust volume
6. Track 8 glasses throughout day
7. Use snooze feature

### Scenario 3: Edge Cases (15 min)
1. Set minimum interval (1 min)
2. Set maximum interval (480 min = 8 hours)
3. Test with Chrome minimized
4. Test with computer locked
5. Test rapid start/stop cycles
6. Add 20 glasses (test limits)
7. Change settings while reminder is active

---

## ✅ Expected Behavior

### Notifications Should:
- ✅ Appear at exact intervals (±5 seconds acceptable)
- ✅ Play sound at configured volume
- ✅ Show random motivational messages (or custom)
- ✅ Be clickable to dismiss
- ✅ Auto-increment glass count when clicked

### UI Should:
- ✅ Show smooth animations
- ✅ Update countdown timer every second
- ✅ Preserve settings after browser restart
- ✅ Respond immediately to button clicks
- ✅ Show visual feedback (hover effects, etc.)

### Settings Should:
- ✅ Save immediately when "Save Settings" clicked
- ✅ Persist across browser sessions
- ✅ Apply to next reminder (not current one)
- ✅ Show "Settings saved" confirmation

---

## 🚨 Common Issues & Solutions

### Issue: Extension doesn't load
- **Solution**: Check for errors in `chrome://extensions/`
- Check manifest.json is valid
- Ensure all files are present

### Issue: No notifications appear
- **Solution**: Check Chrome notification permissions
- System Preferences → Notifications → Chrome (enable)
- Ensure reminders are active (green dot)

### Issue: Sound doesn't play
- **Solution**: Check volume isn't 0%
- Unmute Chrome in system sound mixer
- Try different sound option

### Issue: Countdown not updating
- **Solution**: Refresh popup (close and reopen)
- Check background service worker is running

### Issue: Water count wrong
- **Solution**: Check system date/time is correct
- Reset count manually
- Clear storage and restart

---

## 📊 Performance Checks

- [ ] Extension loads in < 1 second
- [ ] Popup opens instantly
- [ ] Settings save in < 500ms
- [ ] No memory leaks after 24 hours
- [ ] CPU usage near 0% when idle
- [ ] Notifications fire within 5 seconds of scheduled time

---

## 🎉 Testing Complete!

If all tests pass, your extension is ready to:
- ✅ Use daily
- ✅ Share with friends
- ✅ Submit to Chrome Web Store
- ✅ Accept contributions from the community

**Stay hydrated! 💧**

