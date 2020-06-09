const ESCAPE_CHARS = /([\\`*_[\]<>])/g;
const DEFAULT_TITLE = '(No Title)';

function escapeLinkText(text) {
  return text.replace(ESCAPE_CHARS, '\\$1');
}

let userOptions = {};
userOptions.escape = 'yes';

export function linkTo(title = DEFAULT_TITLE, url, { needEscape = true } = {}) {
  let normalizedTitle = title;

  // used for copying link-in-image
  if (needEscape && userOptions.escape === 'yes') {
    normalizedTitle = escapeLinkText(title);
  }

  return `[${normalizedTitle}](${url})`;
}

export function list(theList) {
  return theList.map((item) => `* ${item}`).join('\n');
}

export function onePiece(theList) {
  return theList.map((item) => `* \\#rating:80, ${item}`).join('\n');
}

export function links(theLinks, options = {}) {
  if (options.style === 'onePiece') {
    return onePiece(theLinks.map((link) => linkTo(link.title, link.url, options)));
  }
  return list(theLinks.map((link) => linkTo(link.title, link.url, options)));
}
