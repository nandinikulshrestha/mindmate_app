import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Match() {
  const [mood, setMood] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    socket.on("waiting", (msg) => {
      setStatus(msg);
    });

    socket.on("matched", (data) => {
      setRoomId(data.roomId);
      setStatus("🎉 Match Found! Start Chatting");
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("waiting");
      socket.off("matched");
      socket.off("receiveMessage");
    };
  }, []);

  const findMatch = () => {
    if (!mood) {
      alert("Please select a mood");
      return;
    }

    socket.emit("joinMood", mood);
  };

  const sendMessage = () => {
    if (!message.trim() || !roomId) return;

    socket.emit("sendMessage", {
      roomId,
      message,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        message,
      },
    ]);

    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "#fff",
          borderRadius: "25px",
          padding: "30px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#4f46e5",
            marginBottom: "10px",
          }}
        >
          💬 Mood Match
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Connect with people who share your mood
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <select
            value={mood}
            onChange={(e) =>
              setMood(e.target.value)
            }
            style={{
              padding: "12px",
              borderRadius: "10px",
              width: "220px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">
              Select Mood
            </option>

            <option value="happy">
              😊 Happy
            </option>

            <option value="sad">
              😢 Sad
            </option>

            <option value="angry">
              😡 Angry
            </option>

            <option value="stressed">
              😰 Stressed
            </option>
          </select>

          <button
            onClick={findMatch}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Find Match
          </button>
        </div>

        <h3
          style={{
            textAlign: "center",
            color: "#16a34a",
          }}
        >
          {status}
        </h3>

        <div
          style={{
            height: "400px",
            overflowY: "auto",
            background: "#f8fafc",
            borderRadius: "15px",
            padding: "15px",
            border: "1px solid #ddd",
            marginTop: "20px",
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "You"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background:
                    msg.sender === "You"
                      ? "#4f46e5"
                      : "#e5e7eb",
                  color:
                    msg.sender === "You"
                      ? "#fff"
                      : "#000",
                  padding: "12px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                }}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            value={message}
            placeholder="Type your message..."
            onChange={(e) =>
              setMessage(e.target.value)
            }
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Match;