import { useState, useEffect } from "react";
import API from "../services/api";

function Journal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [journals, setJournals] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/journal/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJournals(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveJournal = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/journal/add",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Journal Saved Successfully");

      setTitle("");
      setContent("");

      fetchJournals();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Error Saving Journal"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          📖 My Journal
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Write your thoughts and track
          your emotional journey.
        </p>

        <input
          type="text"
          placeholder="Journal Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            marginBottom: "15px",
          }}
        />

        <textarea
          rows="10"
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            resize: "none",
          }}
        />

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={saveJournal}
            style={{
              background: "#6366f1",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Save Journal
          </button>

          <button
            onClick={() =>
              setShowHistory(
                !showHistory
              )
            }
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            📚 Previous Thoughts
          </button>
        </div>

        {showHistory && (
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <h2>
              Previous Thoughts
            </h2>

            {journals.length === 0 ? (
              <p>
                No journal entries
                found.
              </p>
            ) : (
              journals.map(
                (journal) => (
                  <div
                    key={
                      journal._id
                    }
                    style={{
                      background:
                        "#f8fafc",
                      borderRadius:
                        "15px",
                      padding:
                        "20px",
                      marginTop:
                        "15px",
                      boxShadow:
                        "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  >
                    <h3>
                      {journal.title}
                    </h3>

                    <p
                      style={{
                        marginTop:
                          "10px",
                      }}
                    >
                      {
                        journal.content
                      }
                    </p>

                    <small
                      style={{
                        color:
                          "gray",
                      }}
                    >
                      {new Date(
                        journal.createdAt
                      ).toLocaleString()}
                    </small>
                  </div>
                )
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Journal;