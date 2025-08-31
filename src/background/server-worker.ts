chrome.runtime.onMessage.addListener(function handleMessages(message, sender, sendResponse) {
  console.log("Message received in service worker:", message);
  console.log("Sender:", sender);
  sendResponse({ farewell: "goodbye from background." });
  return true;
});
