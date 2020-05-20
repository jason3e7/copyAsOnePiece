import messageHandler from './message-handler.js';
import { flashSuccessBadge } from './badge.js';

// listen to keyboard shortcuts
chrome.commands.onCommand.addListener(async (command) => {
  await messageHandler({
    topic: 'copy',
    params: {
      action: command,
    },
  });

  flashSuccessBadge();
});

// listen to messages from popup
chrome.runtime.onMessage.addListener(async (message) => {
  await messageHandler(message);

  // To avoid an error related to port closed before response
  return true;
});
