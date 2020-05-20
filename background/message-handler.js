import * as BrowserAsMarkdown from './browser-as-markdown.js';
import copy from './clipboard-access.js';
import { flashSuccessBadge } from './badge.js';

async function handleCopy(action) {
  /** @type {string} */
  let text;

  switch (action) {
    case 'current-tab-link': {
      text = await BrowserAsMarkdown.currentTab();
      break;
    }

    case 'all-tabs-link-as-list': {
      text = await BrowserAsMarkdown.allTabs('link');
      break;
    }

    case 'all-tabs-link-as-one-piece': {
      text = await BrowserAsMarkdown.allTabs('link', {'style':'onePiece'});
      break;
    }

    case 'highlighted-tabs-link-as-list': {
      text = await BrowserAsMarkdown.highlightedTabs('link');
      break;
    }

    case 'highlighted-tabs-link-as-one-piece': {
      text = await BrowserAsMarkdown.highlightedTabs('link', {'style':'onePiece'});
      break;
    }

    default: {
      throw new TypeError(`Unknown action: ${action}`);
    }
  }

  await copy(text);
  return text;
}

async function handleBadge(params) {
  switch (params.action) {
    case 'flashSuccess':
      return flashSuccessBadge();

    default:
      throw new TypeError(`Unknown action: ${params.action}`);
  }
}

export default function messageHandler({ topic = '', params = {} }) {
  switch (topic) {
    case 'copy': {
      return handleCopy(params.action);
    }

    case 'badge': {
      return handleBadge(params);
    }

    default: {
      throw TypeError(`Unknown message topic '${topic}'`);
    }
  }
}
