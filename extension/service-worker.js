/**
 * HızlıOku — Background Service Worker (Manifest V3)
 */

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "hizlioku-read-selection",
    title: "HızlıOku ile Oku",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "hizlioku-read-selection" && info.selectionText && tab?.id) {
    try {
      // Ensure content script and style are injected
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["content.css"],
      });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });

      // Send selected text to in-page reader overlay
      await chrome.tabs.sendMessage(tab.id, {
        action: "START_RSVP",
        text: info.selectionText,
      });
    } catch (err) {
      console.error("HızlıOku injection error:", err);
    }
  }
});
