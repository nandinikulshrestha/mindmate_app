import { useState, useRef, useEffect } from "react";
import axios from "axios";

function AIChat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://mindmate-app-4.onrender.com/api/ai/chat",
        {
          message: userMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChat((prev) => [
        ...prev,
        {
          user: userMessage,
          ai: response.data.reply,
        },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        {
          user: userMessage,
          ai: "Sorry, AI is unavailable right now.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#f5f7fb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}

      <div
        style={{
          background: "#6366f1",
          color: "white",
          padding: "20px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        🤖 MindMate AI Assistant
      </div>

      {/* Chat Area */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {chat.map((item, index) => (
          <div key={index}>

            {/* User Message */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  background: "#6366f1",
                  color: "white",
                  padding: "12px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                }}
              >
                {item.user}
              </div>
            </div>

            {/* AI Message */}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "12px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                {item.ai}
              </div>
            </div>

          </div>
        ))}

        {loading && (
          <p>🤖 AI is typing...</p>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Area */}

      <div
        style={{
          padding: "20px",
          background: "white",
          display: "flex",
          gap: "10px",
          boxShadow:
            "0 -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          value={message}
          placeholder="Ask anything..."
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#6366f1",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChat;