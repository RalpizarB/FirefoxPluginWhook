# Installation Instructions

## For Users

### Option 1: Load Temporary Add-on (Development/Testing)

1. Download or clone this repository
2. Open Firefox
3. Navigate to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on"
5. Navigate to the addon directory and select `manifest.json`
6. The addon will appear in your Firefox toolbar

### Option 2: Install from ZIP (Recommended)

1. Download `youtube_webhook_sender-1.0.zip` from the `web-ext-artifacts` directory
2. Open Firefox
3. Navigate to `about:addons`
4. Click the gear icon and select "Install Add-on From File"
5. Select the downloaded ZIP file
6. Confirm the installation

**Note**: Firefox may warn that the addon is not signed. This is normal for private addons. Click "Add" to proceed.

## Configuration

1. Click the addon icon in your Firefox toolbar
2. Enter your webhook URL:
   - **Discord webhook**: Go to Server Settings → Integrations → Webhooks → Copy URL
   - **Other webhooks**: Use your webhook endpoint URL
3. (Optional) Enter a preceding string (e.g., "Check out this video: ")
4. Click "Save Settings"

Your settings are saved locally in the browser and will persist between sessions.

## Usage

1. Navigate to any YouTube video page (e.g., `https://www.youtube.com/watch?v=...`)
2. Click the addon icon in your Firefox toolbar
3. Click "Send Current YouTube Link"
4. The link will be sent to your configured webhook

## Testing Your Webhook

If you don't have a webhook endpoint yet, you can test with https://webhook.site/:

1. Go to https://webhook.site/
2. Copy the unique URL provided (e.g., `https://webhook.site/12345678-...`)
3. Use this URL in the addon settings
4. Send a YouTube link from the addon
5. Refresh webhook.site to see the received payload

## Troubleshooting

**Addon button is disabled:**
- Make sure you're on a YouTube page (youtube.com domain)
- The addon only works on YouTube pages

**Link not sending:**
- Check that you've configured a valid webhook URL
- Open Firefox Developer Tools (F12) and check the Console for errors
- Verify your webhook endpoint is accessible

**Settings not saving:**
- Make sure you clicked "Save Settings" after entering your configuration
- Check that Firefox has permission to store local data

## Uninstallation

1. Navigate to `about:addons`
2. Find "YouTube Webhook Sender" in the list
3. Click the three dots menu
4. Select "Remove"

## For Developers

See [TESTING.md](TESTING.md) for development and testing instructions.

## Privacy

This addon:
- Only accesses URLs from YouTube pages
- Stores webhook URL and preceding string locally in your browser
- Only sends data to the webhook URL you configure
- Does not collect or transmit any other personal data
- Does not include any analytics or tracking

## Support

For issues or questions, please open an issue on the GitHub repository.
