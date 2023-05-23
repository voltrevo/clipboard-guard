'use strict';

patchWindow(window);

function patchWindow(window) {
  let lastPasteHotkeyTime = -Infinity;

  const currentTime = Date.now.bind(Date);

  window.document.addEventListener('keydown', (e) => {
    if (e.isTrusted && e.metaKey && e.key === 'v') {
      lastPasteHotkeyTime = currentTime();
    }
  });

  function isClipboardAllowed() {
    return currentTime() - lastPasteHotkeyTime < 500;
  }

  const originalClipboardRead = window.Clipboard.prototype.read;

  window.Clipboard.prototype.read = async function(...args) {
    // Call it for perms regardless
    const result = await originalClipboardRead.call(this, ...args);

    if (isClipboardAllowed()) {
      return result;
    }

    console.warn('Clipboard Guard: blocked clipboard.read');

    return [];
  };

  const originalClipboardReadText = window.Clipboard.prototype.readText;

  window.Clipboard.prototype.readText = async function (...args) {
    // Call it for perms regardless
    const result = await originalClipboardReadText.call(this, ...args);

    if (isClipboardAllowed()) {
      return result;
    }

    console.warn('Clipboard Guard: blocked clipboard.readText');

    return '';
  };

  const originalCreateElement = window.Document.prototype.createElement;

  window.Document.prototype.createElement = function(...args) {
    const result = originalCreateElement.call(this, ...args);

    if (args[0] === 'iframe') {
      result.addEventListener('load', () => {
        patchWindow(result.contentWindow);
      });
    }

    return result;
  }
}
