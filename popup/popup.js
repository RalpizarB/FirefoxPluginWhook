// Helper function to check if URL is a valid YouTube page
function isYouTubeUrl(url) {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    // Check if hostname is youtube.com or subdomain of youtube.com
    return urlObj.hostname === 'youtube.com' || urlObj.hostname.endsWith('.youtube.com');
  } catch (e) {
    return false;
  }
}

// Load saved settings when popup opens
document.addEventListener('DOMContentLoaded', function() {
  browser.storage.local.get(['webhookUrl', 'precedingString']).then(function(result) {
    if (result.webhookUrl) {
      document.getElementById('webhookUrl').value = result.webhookUrl;
    }
    if (result.precedingString) {
      document.getElementById('precedingString').value = result.precedingString;
    }
  });

  // Check if we're on a YouTube page
  browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
    const currentTab = tabs[0];
    const isYouTube = isYouTubeUrl(currentTab.url);
    
    const sendButton = document.getElementById('sendButton');
    if (!isYouTube) {
      sendButton.disabled = true;
      sendButton.textContent = 'Not on YouTube';
    }
  });
});

// Save settings
document.getElementById('saveButton').addEventListener('click', function() {
  const webhookUrl = document.getElementById('webhookUrl').value;
  const precedingString = document.getElementById('precedingString').value;
  
  if (!webhookUrl) {
    showStatus('Please enter a webhook URL', 'error');
    return;
  }

  browser.storage.local.set({
    webhookUrl: webhookUrl,
    precedingString: precedingString
  }).then(function() {
    showStatus('Settings saved!', 'success');
  });
});

// Send current YouTube link
document.getElementById('sendButton').addEventListener('click', function() {
  browser.storage.local.get(['webhookUrl', 'precedingString']).then(function(result) {
    if (!result.webhookUrl) {
      showStatus('Please configure webhook URL first', 'error');
      return;
    }

    // Get current tab URL
    browser.tabs.query({active: true, currentWindow: true}).then(function(tabs) {
      const currentTab = tabs[0];
      const url = currentTab.url;
      
      if (!isYouTubeUrl(url)) {
        showStatus('Not on a YouTube page', 'error');
        return;
      }

      // Prepare message
      const precedingString = result.precedingString || '';
      const message = precedingString + url;

      // Send to webhook
      // Discord webhooks use "content" field, other services might use different fields
      fetch(result.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: message,  // Discord webhook format
          text: message,     // Generic webhook format
          url: url,
          precedingString: precedingString
        })
      })
      .then(response => {
        if (response.ok) {
          showStatus('Link sent successfully!', 'success');
        } else {
          showStatus('Failed to send: ' + response.status, 'error');
        }
      })
      .catch(error => {
        showStatus('Error: ' + error.message, 'error');
      });
    });
  });
});

function showStatus(message, type) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = 'block';
  
  setTimeout(function() {
    statusDiv.style.display = 'none';
  }, 3000);
}
