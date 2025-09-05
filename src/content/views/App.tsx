import { useState, useEffect } from 'react'
import './App.css'
import BrowzlyLogo from '../../assets/browzly.svg'
import ChatUI from '@/components/ChatUI.'

function App() {
  const [ showChat, setShowChat ] = useState(false)
  const toggle = () => setShowChat(!showChat)
  const [ isVoiceMode, setIsVoiceMode ] = useState(true)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(callback => {
      console.log(callback.message)
      return true
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if ( message.type === "FROM_OFFSCREEN" ) {
        console.log("Message from offscreen:", message.message);
        sendResponse({ farewell: "goodbye from content." });
      }
      return true;
    });
  }, [])

  return (
    <div className="fixed flex-col bottom-3 end-3 z-50 bg-blue-800/80 dark:bg-blue-800/90  px-6 py-3">
      { showChat && (
          <div className="z-10 mb-1 w-full">
            <ChatUI />
          </div>
        ) }
      <div className='bg-blue-800 dark:bg-blue-800 border-white border-3 rounded-full px-6 py-3 flex items-center justify-center gap-4 '>
        <img
          src={BrowzlyLogo}
          alt="Logo"
          width={45}
          height={45}
          className="p-1 rounded-full bg-white mr-3"
        />
        <button
          className="bg-green-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-green-200 transition-colors duration-200"
          onClick={() => setIsVoiceMode(!isVoiceMode) }
    
        >
          Voice
          { isVoiceMode && <span className="ml-2 inline-block w-3 h-3 bg-white rounded-full animate-pulse"></span> }
        </button>

        <button
            className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-blue-600 transition-colors duration-200 relative"
            onClick={toggle}
          >
            Chat
        </button>

    </div>
  </div>
  )
}

export default App
