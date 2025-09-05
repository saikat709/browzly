import { useEffect, useRef } from "react";

const App = () => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        async function startRecording() {
            try {
                console.log("Requesting microphone permission...");
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log("Microphone permission granted.");
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;
                chunksRef.current = [];

                mediaRecorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        chunksRef.current.push(e.data);
                        console.log("Data available:", e.data);
                    }
                };

                mediaRecorder.onerror = (e) => {
                    console.error("MediaRecorder error:", e.error);
                };

                mediaRecorder.start();
                console.log("Recording started.");

                let seconds = 0;
                timerRef.current = setInterval(() => {
                    seconds++;
                    console.log(`Recording... ${seconds}s`);
                    if (seconds >= 10) {
                        mediaRecorder.stop();
                        clearInterval(timerRef.current!);
                        console.log("Recording stopped after 10 seconds.");
                    }
                }, 1000);

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                    const url = URL.createObjectURL(blob);
                    console.log("Audio saved. Blob URL:", url);
                    // Auto-download
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = url;
                    a.download = "recording.webm";
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }, 100);
                };
            } catch (err) {
                console.error("Error accessing microphone:", err);
            }
        }
        startRecording();
    }, []);

    return (
        <div>
            <h1>Audio Recorder</h1>
            <p>Recording for 10 seconds. Check console for logs.</p>
        </div>
    );
};

export default App;