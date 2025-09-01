const ChatUI = () => {
    return (
        <div className="min-h-96 h-96 rounded-xl shadow-lg p-0 bg-blue-50 dark:bg-blue-700 overflow-hidden flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-black p-3">Chat Interface</h2>
            <div className="flex-1 flex flex-col w-full">
                <div className="flex-1">
                    {/* Chat messages will go here */}
                </div>
               <div className="w-full flex gap-1 mt-0 p-2">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded mb-0 text-black"
                    placeholder="Type your message..."
                />
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200">
                    Send
                </button>
               </div>
            </div>
        </div>
    )
}

export default ChatUI