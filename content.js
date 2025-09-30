
function hideSpoilers(enabled) {
  const selectorsToHide = [
    '.imspo_mt__t-sc .imspo_mt__tt-w',
    '.imspo_mt__triangle',
    '.imso_mh__l-tm-sc',
    '.imso_mh__r-tm-sc',
    '.imso_mh__sep'
  ];
  const hiddenClassName = 'spoiler-is-hidden';

  if (!enabled) {
    document.querySelectorAll(`.${hiddenClassName}`).forEach(el => {
      el.style.visibility = '';
      el.classList.remove(hiddenClassName);
    });
    return;
  }

  function applyHidingRules() {
    selectorsToHide.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (!element.classList.contains(hiddenClassName)) {
          element.style.visibility = 'hidden';
          element.classList.add(hiddenClassName);
        }
      });
    });
  }

  applyHidingRules();

  const observer = new MutationObserver(mutations => {
    applyHidingRules();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "toggleSpoilers") {
    hideSpoilers(request.enabled);
  }
});

chrome.storage.sync.get('spoilerEnabled', function(data) {
  if (data.spoilerEnabled !== false) {
    hideSpoilers(true);
  }
});