import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const saveMood = async (mood) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/mood/save",
        {
          mood,
          note: `User feels ${mood}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedMood(mood);

      alert("Mood Saved Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save mood");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const moodCardStyle = (bg) => ({
    background: bg,
    width: "120px",
    height: "120px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "35px",
    fontWeight: "bold",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "0.3s",
  });

  const featureCardStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    width: "250px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    transition: "0.3s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          color: "white",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          🧠 MindMate Dashboard
        </h1>

        <p
          style={{
            fontSize: "20px",
          }}
        >
          Your Mental Wellness Companion
        </p>
      </div>

      {/* Mood Section */}
      <div
        style={{
          background: "white",
          borderRadius: "25px",
          padding: "30px",
          maxWidth: "1000px",
          margin: "auto",
          marginBottom: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          How are you feeling today?
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={moodCardStyle("#FFE082")}
            onClick={() => saveMood("Happy")}
          >
            😊
            <span style={{ fontSize: "16px" }}>
              Happy
            </span>
          </div>

          <div
            style={moodCardStyle("#90CAF9")}
            onClick={() => saveMood("Sad")}
          >
            😢
            <span style={{ fontSize: "16px" }}>
              Sad
            </span>
          </div>

          <div
            style={moodCardStyle("#EF9A9A")}
            onClick={() => saveMood("Angry")}
          >
            😡
            <span style={{ fontSize: "16px" }}>
              Angry
            </span>
          </div>

          <div
            style={moodCardStyle("#CE93D8")}
            onClick={() =>
              saveMood("Stressed")
            }
          >
            😰
            <span style={{ fontSize: "16px" }}>
              Stressed
            </span>
          </div>

          <div
            style={moodCardStyle("#B0BEC5")}
            onClick={() => saveMood("Lonely")}
          >
            😔
            <span style={{ fontSize: "16px" }}>
              Lonely
            </span>
          </div>
        </div>

        {selectedMood && (
          <div
            style={{
              marginTop: "25px",
              background: "#f8fafc",
              padding: "15px",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Current Mood: {selectedMood}
          </div>
        )}
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={featureCardStyle}
          onClick={() =>
            navigate("/history")
          }
        >
          <h1>📊</h1>
          <h2>Mood History</h2>
          <p>
            View your emotional journey
          </p>
        </div>

        <div
          style={featureCardStyle}
          onClick={() =>
            navigate("/journal")
          }
        >
          <h1>📖</h1>
          <h2>Journal</h2>
          <p>
            Write and revisit thoughts
          </p>
        </div>

        <div
          style={featureCardStyle}
          onClick={() =>
            navigate("/chat")
          }
        >
          <h1>🤖</h1>
          <h2>AI Chat</h2>
          <p>
            Talk with your AI companion
          </p>
        </div>

        <div
          style={featureCardStyle}
          onClick={() =>
            navigate("/match")
          }
        >
          <h1>💬</h1>
          <h2>Mood Match</h2>
          <p>
            Connect with people sharing
            your mood
          </p>
        </div>

        <div
          style={{
            ...featureCardStyle,
            background:
              "linear-gradient(135deg,#ff6b6b,#ff4757)",
            color: "white",
          }}
          onClick={logout}
        >
          <h1>🚪</h1>
          <h2>Logout</h2>
          <p>Sign out securely</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;