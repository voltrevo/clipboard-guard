'use strict';

const pageScriptTag = document.createElement('script');
pageScriptTag.src = browser.runtime.getURL('pageContentScript.js');
document.documentElement.appendChild(pageScriptTag);
