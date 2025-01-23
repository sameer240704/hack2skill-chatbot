import { useRef, useState } from "react";
import { Send, Mic, LoaderPinwheel } from "lucide-react";

export const TypingBox = ({ setMessage, loading }) => {
  const [question, setQuestion] = useState("");
  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (!question.trim() || loading) return;

    setMessage(question);
    setQuestion("");
    inputRef.current?.focus();
  };

  return (
    <div className="z-10 max-w-[700px] w-full max-md:bottom-4 absolute bottom-10 flex flex-col bg-gradient-to-tr from-[#232A34]/80 via-slate-400/10 to-[#232A34] p-4 backdrop-blur-lg rounded-xl border border-slate-100/30 shadow-lg">
      <div className="flex items-center gap-3 w-full">
        <input
          ref={inputRef}
          className="
              w-full flex-grow outline-none bg-transparent 
              py-2 rounded-full text-white 
              placeholder:text-white/60 
              transition-all duration-300
            "
          placeholder="Write your message here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          className={`
              bg-slate-100/20 hover:bg-slate-100/40 
              p-2 px-4 rounded-full text-white 
              transition-all flex items-center gap-2
              ${loading ? "cursor-not-allowed opacity-50" : ""}
            `}
          disabled={loading || !question.trim()}
        >
          {loading ? (
            <>
              <LoaderPinwheel className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send
            </>
          )}
        </button>
        <button
          className="p-2 rounded-full bg-slate-100/20 hover:bg-slate-100/40 text-white transition-all"
          aria-label="Use microphone"
          disabled={loading}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
