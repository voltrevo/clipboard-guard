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

  const clipboard = navigator.clipboard;

  const originalClipboardRead = clipboard.read.bind(clipboard);

  navigator.clipboard.read = async (...args) => {
    // Call it for perms regardless
    const result = await originalClipboardRead(...args);

    if (isClipboardAllowed()) {
      return result;
    }

    console.warn('Clipboard Guard: blocked clipboard.read');

    return [];
  };

  const originalClipboardReadText = clipboard.readText.bind(clipboard);

  navigator.clipboard.readText = async (...args) => {
    // Call it for perms regardless
    const result = await originalClipboardReadText(...args);

    if (isClipboardAllowed()) {
      return result;
    }

    console.warn('Clipboard Guard: blocked clipboard.readText');

    return '';
  };
})();
