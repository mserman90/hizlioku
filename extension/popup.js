/**
 * HızlıOku — Extension Popup Controller
 */

document.getElementById("btn-read-selection").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  try {
    // Inject scripts
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["content.css"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });

    // Get selected text from tab
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    });

    const selectedText = results?.[0]?.result?.trim();
    if (!selectedText) {
      alert("Lütfen önce sayfada okumak istediğiniz metni fare ile seçin.");
      return;
    }

    await chrome.tabs.sendMessage(tab.id, {
      action: "START_RSVP",
      text: selectedText,
    });

    window.close();
  } catch (err) {
    console.error("HızlıOku error:", err);
  }
});

document.getElementById("btn-read-custom").addEventListener("click", async () => {
  const text = document.getElementById("custom-text").value.trim();
  if (!text) {
    alert("Lütfen okumak istediğiniz metni giriniz.");
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["content.css"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });

    await chrome.tabs.sendMessage(tab.id, {
      action: "START_RSVP",
      text: text,
    });

    window.close();
  } catch (err) {
    console.error("HızlıOku error:", err);
  }
});
