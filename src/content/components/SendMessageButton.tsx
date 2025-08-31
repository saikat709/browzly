
const SendMessageButton = () => {

    const handleClick = async () => {
        const response = await chrome.runtime.sendMessage({greeting: "hello"});
        console.log(response);
    }

    return (
        <button
            onClick={handleClick}
            className="text-green-500 border border-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-black/80 transition-all hover:scale-105 duration-200"
            >Send Message</button>
    )
}

export default SendMessageButton;