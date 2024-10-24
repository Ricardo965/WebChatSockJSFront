export function Message({ message, sender }) {
    const isSender = message.sender === sender;
    return (
        <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-4`}>
            <div
                className={`rounded-lg p-3 max-w-xs shadow-md text-white ${isSender ? "bg-blue-500" : "bg-gray-500"
                    }`}
            >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-75">{isSender ? "Tú" : message.sender}</p>
            </div>
        </div>
    );
}

export default Message;
