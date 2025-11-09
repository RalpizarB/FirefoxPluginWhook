# YouTube Webhook Sender - Firefox Addon

A Firefox addon that allows you to send YouTube video links via webhook to a custom URL with an optional preceding message.

## Features

- 🎯 Works on YouTube pages
- 🔗 Sends current YouTube video URL via webhook
- ⚙️ Configurable webhook URL
- 💬 Optional preceding string/message
- 🎨 Simple and intuitive popup interface

## Installation

### For Development/Testing

1. Clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the addon directory and select the `manifest.json` file

### For Production

1. Package the addon as a ZIP file containing all files
2. Submit to Mozilla Add-ons or use it as a private addon

## Usage

1. **Configure the addon:**
   - Click the addon button in your Firefox toolbar
   - Enter your webhook URL (e.g., `https://your-webhook-url.com/endpoint`)
   - (Optional) Enter a preceding string (e.g., "Check this out: ")
   - Click "Save Settings"

2. **Send a YouTube link:**
   - Navigate to any YouTube video page
   - Click the addon button
   - Click "Send Current YouTube Link"
   - The link will be sent to your configured webhook

## Webhook Payload

The addon sends a POST request with the following JSON payload:

```json
{
  "text": "Your preceding string + URL",
  "url": "https://www.youtube.com/watch?v=...",
  "precedingString": "Your preceding string"
}
```

## Files Structure

```
FirefoxPluginWhook/
├── manifest.json          # Addon configuration
├── background.js          # Background script
├── content.js            # Content script for YouTube pages
├── popup/
│   ├── popup.html        # Popup UI
│   └── popup.js          # Popup logic
├── icons/
│   └── icon-48.png       # Addon icon
└── README.md             # This file
```

## Permissions

The addon requires the following permissions:

- `activeTab` - To access the current tab's URL
- `storage` - To save webhook URL and preceding string
- `tabs` - To query active tabs
- `http://*/*` and `https://*/*` - To send webhook requests

## Development

To make changes to the addon:

1. Edit the relevant files
2. Reload the addon in `about:debugging`
3. Test your changes

## License

MIT License

## Author

RalpizarB
