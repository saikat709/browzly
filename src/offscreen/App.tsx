const App = () => {
    
    console.log("offscreen loaded.");

    return (
        <div>
            <h1> Audio player. </h1>
            <audio
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                autoPlay
            />
        </div>
    );
}

export default App;