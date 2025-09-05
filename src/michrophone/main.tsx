import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";


const App = () => {


    const handleMicrophoneAccess = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("Microphone access granted.");
        } catch (err) {
            console.error("Microphone access denied:", err);
        }
    };


    return <div
        className="h-screen w-screen flex items-center justify-center"
        onClick={handleMicrophoneAccess}
        > 
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors">
            Allow Microphone Once
        </button>
    </div>
};



createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)