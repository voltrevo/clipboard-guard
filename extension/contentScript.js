'use strict';

const browser = globalThis.browser ?? globalThis.chrome;

const pageScriptTag = document.createElement('script');
pageScriptTag.src = browser.runtime.getURL('pageContentScript.js');
document.documentElement.appendChild(pageScriptTag);
