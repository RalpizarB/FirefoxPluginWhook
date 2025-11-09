# Testing Guide for YouTube Webhook Sender

## Quick Installation for Testing

1. Open Firefox browser
2. Navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the addon directory and select `manifest.json`

## Manual Testing Checklist

### Basic Functionality

- [ ] **Addon loads successfully**
  - Open Firefox
  - Load the addon from `about:debugging`
  - Verify no errors in the browser console

- [ ] **Popup opens correctly**
  - Click the addon icon in the toolbar
  - Verify the popup displays with two input fields and two buttons

- [ ] **Settings can be saved**
  - Enter a webhook URL (e.g., `https://webhook.site/unique-id`)
  - Enter a preceding string (e.g., "Check out this video: ")
  - Click "Save Settings"
  - Verify "Settings saved!" message appears
  - Close and reopen popup to verify settings persist

- [ ] **Button state on non-YouTube pages**
  - Navigate to any non-YouTube website
  - Click the addon icon
  - Verify "Send Current YouTube Link" button is disabled and shows "Not on YouTube"

- [ ] **Button state on YouTube pages**
  - Navigate to https://www.youtube.com/watch?v=dQw4w9WgXcQ (or any YouTube video)
  - Click the addon icon
  - Verify "Send Current YouTube Link" button is enabled

- [ ] **Webhook sending works**
  - Get a test webhook URL from https://webhook.site/
  - Configure the addon with this URL
  - Navigate to a YouTube video
  - Click the addon icon and then "Send Current YouTube Link"
  - Verify "Link sent successfully!" message appears
  - Check webhook.site to see the received payload

### Payload Verification

The webhook should receive a JSON payload like:
```json
{
  "text": "Check out this video: https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "precedingString": "Check out this video: "
}
```

### Edge Cases

- [ ] **Empty webhook URL**
  - Clear the webhook URL field
  - Try to send a link
  - Verify error message appears

- [ ] **Empty preceding string**
  - Save settings with empty preceding string
  - Send a YouTube link
  - Verify only the URL is sent in the "text" field

- [ ] **Invalid webhook URL**
  - Enter an invalid URL (e.g., "http://invalid-url-that-does-not-exist.com")
  - Try to send a link
  - Verify error message appears

- [ ] **Different YouTube page types**
  - Test with regular video page: https://www.youtube.com/watch?v=...
  - Test with YouTube homepage: https://www.youtube.com/
  - Test with YouTube search: https://www.youtube.com/results?search_query=...
  - Test with YouTube channel: https://www.youtube.com/@username

## Using webhook.site for Testing

1. Go to https://webhook.site/
2. You'll get a unique URL (e.g., `https://webhook.site/12345678-1234-1234-1234-123456789012`)
3. Copy this URL
4. Use it as the webhook URL in the addon settings
5. Send a YouTube link
6. Refresh webhook.site to see the received request

## Debugging

If something doesn't work:

1. Open Firefox Developer Tools (F12)
2. Go to the Console tab
3. Look for any error messages
4. Check the Network tab to see if the webhook request was sent

## Building the Addon

To create a distributable ZIP file:
```bash
web-ext build --overwrite-dest
```

The ZIP file will be created in `web-ext-artifacts/` directory.
