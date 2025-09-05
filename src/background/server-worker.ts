let extraMessage = '';
let hasOffScreenDocument = false;

function createOffScreenDocument(){
  extraMessage = "creating off screen."
  
  try {
    
    chrome.offscreen.createDocument({
      url: 'src/offscreen/index.html',
      reasons: ['USER_MEDIA'],
      justification: 'Need to use user media in the background'
    });
    hasOffScreenDocument = true;
    extraMessage = "Created.";

  } catch (error) {
    
    console.error('Failed to create offscreen document:', error);
    hasOffScreenDocument = false;
    extraMessage = "Failed to create offscreen document";

  }


  fetch("/src/offscreen/index.html")
    .then(async response => {
      if (!response.ok) throw new Error("Network response was not ok");
      const fileContent = await response.text();
      extraMessage = "read successfully.: " + fileContent;
    })
    .catch(e => {
      extraMessage = e.message || "Error reading.";
    });
}


chrome.runtime.onInstalled.addListener(()=>{
  extraMessage = "Extension installed.";
  createOffScreenDocument();

  chrome.tabs.create({ url: "src/michrophone/index.html" });
});


chrome.runtime.onMessage.addListener(function handleMessages(message, sender, sendResponse) {
  console.log("Message received in service worker:", message);
  console.log("Sender:", sender);

  if ( message.type === "FROM_OFFSCREEN" ) {
    sendResponse({ farewell: "From Offscreen: " });
    return true;
  }

  sendResponse({ 
    farewell: "goodbye from background.",
    extraMessage,
    hasOffScreenDocument
  });

  return true;
});
