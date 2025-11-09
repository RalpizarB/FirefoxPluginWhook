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
    const isYouTube = currentTab.url && currentTab.url.includes('youtube.com');
    
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
      
      if (!url || !url.includes('youtube.com')) {
        showStatus('Not on a YouTube page', 'error');
        return;
      }

      // Prepare message
      const precedingString = result.precedingString || '';
      const message = precedingString + url;

      // Send to webhook
      fetch(result.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: message,
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
