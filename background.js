// Background script for YouTube Webhook Sender
// This script runs in the background and can handle events

// Listen for browser action click (optional, since we have a popup)
browser.browserAction.onClicked.addListener(function(tab) {
  // This will only be called if there's no popup defined
  // Since we have a popup, this is just for future extensibility
});

// You can add more background functionality here if needed
// For example, keyboard shortcuts, context menus, etc.
