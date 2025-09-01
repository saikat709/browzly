
const SendMessageButton = () => {

    const handleClick = async () => {
        console.log("Sending message to background script...");
        const response = await chrome.runtime.sendMessage({greeting: "hello"});
        console.log(response);
        console.log("Done.");
    }

    return (
        <button
            onClick={handleClick}
        >Send Message</button>
    )
}

export default SendMessageButton;