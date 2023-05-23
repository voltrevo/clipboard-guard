'use strict';

(() => {
  let lastPasteHotkeyTime = -Infinity;

  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'v') {
      lastPasteHotkeyTime = Date.now();
    }
  });

  function isClipboardAllowed() {
    return Date.now() - lastPasteHotkeyTime < 500;
  };

  const originalClipboardRead = Clipboard.prototype.read;

  Clipboard.prototype.read = async function(...args) {
    // Call it for perms regardless
    const result = await originalClipboardRead.call(this, ...args);

    if (isClipboardAllowed()) {
      return result;
    }

    console.warn('Clipboard Guard: blocked clipboard.read');

    return [];
  };

  const originalClipboardReadText = Clipboard.prototype.readText;

  Clipboard.prototype.readText = async function (...args) {
    // Call it for perms regardless
    const result = await originalClipboardReadText.call(this, ...args);

    if (isClipboardAllowed()) {
      return result;
    }

    console.warn('Clipboard Guard: blocked clipboard.readText');

    return '';
  };
})();
