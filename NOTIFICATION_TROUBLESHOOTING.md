# 🔍 Notification Troubleshooting Guide

## Issue: Hearing sound but not seeing popup notification

### Step 1: Check Background Console

1. Go to `chrome://extensions/`
2. Find **Hydration Hero**
3. Click the blue **"service worker"** link
4. Look for these logs when timer ends:
   ```
   Notification settings: {notificationType: "both", ...}
   Notification type: both
   Playing sound...
   Creating visual notification...
   Visual notification created: <some-id>
   ✓ Notification process completed
   ```

### Step 2: Check Your Settings

1. Click the extension icon → ⚙️ Settings
2. Under **"Notification Type"**, verify **"Both"** is selected (not "Audio Only")
3. If it says "Audio Only", change it to "Both" and click **"Save Settings"**
4. Try again!

### Step 3: Check Chrome Notification Permissions

**Option A: Quick Check**
1. Go to `chrome://settings/content/notifications`
2. Look for your extension in the list
3. Make sure it's set to **"Allow"**

**Option B: System Notification Check**
1. Visit `chrome://settings/content/notifications`
2. Under "Allowed to send notifications" - Chrome should be there
3. If Chrome is blocked, click and allow it

### Step 4: Check System Notifications (macOS)

1. Open **System Settings** → **Notifications**
2. Find **Google Chrome** in the list
3. Make sure these are enabled:
   - ✅ Allow notifications
   - ✅ Show notifications on lock screen
   - ✅ Show in Notification Center
4. Set alert style to **"Alerts"** or **"Banners"**

### Step 5: Force Test Notification

Open the background console (`chrome://extensions/` → service worker) and run:

```javascript
// Test notification directly
chrome.notifications.create({
  type: 'basic',
  iconUrl: 'icons/icon128.png',
  title: '💧 Test Notification',
  message: 'If you see this, notifications work!',
  priority: 2
});
```

**Result:**
- ✅ **See notification**: Chrome notifications work, issue is in settings
- ❌ **No notification**: System/Chrome permissions issue

### Step 6: Check Do Not Disturb

**macOS:**
- Open Control Center
- Make sure **Focus** (Do Not Disturb) is OFF

**Windows:**
- Open Action Center
- Make sure **Focus Assist** is OFF

### Step 7: Reset Extension Settings

If nothing works, reset the extension:

1. Open background console
2. Run:
```javascript
chrome.storage.local.clear();
```
3. Reload the extension
4. Set up again with "Both" notification type

---

## Common Issues & Solutions

### Issue: "Audio Only" was selected
**Solution:** Change to "Both" in settings and save

### Issue: Chrome notifications blocked
**Solution:** Allow Chrome in `chrome://settings/content/notifications`

### Issue: System notifications disabled
**Solution:** Enable in System Settings → Notifications

### Issue: Do Not Disturb is on
**Solution:** Turn off Focus/DND mode

### Issue: Extension just installed
**Solution:** You may need to restart Chrome after first install

---

## Manual Testing Steps

1. **Reload Extension:**
   - `chrome://extensions/`
   - Click refresh icon on Hydration Hero

2. **Set Short Timer:**
   - Click extension icon
   - Set to **1 minute**
   - Click "Start Reminders"

3. **Watch Background Console:**
   - Open service worker console
   - Watch for logs when timer ends

4. **Expected Result:**
   - ✅ Hear sound
   - ✅ See Chrome notification popup
   - ✅ Logs show "Visual notification created"

---

## Still Not Working?

Check these in order:

1. ☐ Notification type is set to "Both" or "Visual"
2. ☐ Chrome has notification permissions
3. ☐ System notifications enabled for Chrome
4. ☐ Do Not Disturb / Focus is OFF
5. ☐ Extension is properly reloaded after changes
6. ☐ No console errors in background worker
7. ☐ Manual test notification works (Step 5)

If manual test notification works but extension doesn't → It's a settings issue  
If manual test notification fails → It's a permissions issue

---

## Debug Command Summary

Run these in the background console:

```javascript
// 1. Check current settings
chrome.storage.local.get(console.log);

// 2. Force set to "both"
chrome.storage.local.set({ notificationType: 'both' });

// 3. Test notification manually
chrome.notifications.create({
  type: 'basic',
  iconUrl: 'icons/icon128.png',
  title: '💧 Test',
  message: 'Test notification',
  priority: 2
});

// 4. Check notification permissions
chrome.notifications.getPermissionLevel(console.log);
```

Expected output: `{"level": "granted"}`

---

**Most Common Fix:** Settings → Change "Audio Only" to "Both" → Save → Restart timer 🎯

