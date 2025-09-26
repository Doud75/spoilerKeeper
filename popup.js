document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('toggleSpoilers');

  chrome.storage.sync.get('spoilerEnabled', function(data) {
    toggle.checked = data.spoilerEnabled !== false;
  });

  toggle.addEventListener('change', function() {
    chrome.storage.sync.set({ 'spoilerEnabled': toggle.checked });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "toggleSpoilers", enabled: toggle.checked});
      }
    });
  });
});