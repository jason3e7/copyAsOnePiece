// Convert browser items (tabs / window / etc.) to Markdown
import * as Markdown from './markdown.js';

const tabsToResult = {
  link: (tabs, options) => Markdown.links(tabs, options)
};

/**
 * @param {chrome.tabs.QueryInfo} query
 */
function queryTabs(query) {
  return new Promise((resolve) => chrome.tabs.query(query, resolve));
}

export async function currentTab(options = {}) {
  const tabs = await queryTabs({ currentWindow: true, active: true });
  const onlyOneTab = tabs[0];

  if (options.style === 'list') {
    return Markdown.list([Markdown.linkTo(onlyOneTab.title, onlyOneTab.url, options)]);
  }
  if (options.style === 'onePiece') {
    return Markdown.onePiece([Markdown.linkTo(onlyOneTab.title, onlyOneTab.url, options)]);
  }
  return Markdown.linkTo(onlyOneTab.title, onlyOneTab.url, options);
}

export async function allTabs(contentType, options = {}) {
  const tabs = await queryTabs({ currentWindow: true });
  return tabsToResult[contentType](tabs, options);
}

export async function highlightedTabs(contentType, options = {}) {
  const tabs = await queryTabs({ currentWindow: true, highlighted: true });
  return tabsToResult[contentType](tabs, options);
}
