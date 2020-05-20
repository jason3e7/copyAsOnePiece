function sendMessageToBackgroundPage(payload) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(payload, () => {
      // NOTE: there will be no response content even if the execution was successful
      resolve(true);
    });
  });
}

async function doCopy(action) {
  return sendMessageToBackgroundPage({
    topic: 'copy',
    params: {
      action,
    },
  });
}

async function showSuccessBadge() {
  return sendMessageToBackgroundPage({
    topic: 'badge',
    params: {
      action: 'flashSuccess',
    },
  });
}

function handler(event) {
  doCopy(event.currentTarget.dataset.action);
  showSuccessBadge();
  window.close();
}

// Install listeners
document.querySelectorAll('[data-action]').forEach((element) => {
  element.addEventListener('click', handler);
});

document.body.classList.add('custom-popup-style');

chrome.windows.getCurrent({ populate: true }, (crWindow) => {
  const tabsCount = crWindow.tabs.length;
  const highlightedCount = crWindow.tabs.filter((tab) => tab.highlighted).length;

  const displayCountOfAllTabs = document.getElementsByClassName('display-count-all-tabs');
  for (var i = 0; i < displayCountOfAllTabs.length; i++) {
    displayCountOfAllTabs[i].textContent = String(tabsCount);
  }

  const displayCountOfHighlightedTabs = document.getElementsByClassName('display-count-highlighted-tabs');
  for (var i = 0; i < displayCountOfAllTabs.length; i++) {
    displayCountOfHighlightedTabs[i].textContent = String(highlightedCount);
  }
});
