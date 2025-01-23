export const ChatInterface = ({ messages }) => {
  return (
    <div className="z-0 w-[700px] h-[70vh] overflow-y-auto flex flex-col gap-4 max-md:w-full">
      {messages.length === 0 ? (
        <div className="text-white/50 text-center mt-20">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.sender === "user"
                ? "bg-blue-500 self-end text-white"
                : "bg-gray-700 self-start text-white"
            }`}
          >
            {msg.text}
          </div>
        ))
      )}
    </div>
  );
};
