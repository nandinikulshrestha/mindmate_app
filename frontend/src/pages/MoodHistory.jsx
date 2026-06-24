import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MoodHistory() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/mood/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMoods(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const moodCount = {};

  moods.forEach((item) => {
    moodCount[item.mood] =
      (moodCount[item.mood] || 0) + 1;
  });

  const chartData = Object.keys(
    moodCount
  ).map((mood) => ({
    name: mood,
    value: moodCount[mood],
  }));

  const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

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
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          📊 Mood Analytics
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          Track your emotional journey
        </p>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-around",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "15px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h2>
              {moods.length}
            </h2>
            <p>Total Entries</p>
          </div>

          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "15px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h2>
              {chartData.length > 0
                ? chartData.sort(
                    (a, b) =>
                      b.value -
                      a.value
                  )[0].name
                : "-"}
            </h2>
            <p>Most Common Mood</p>
          </div>
        </div>

        <div
          style={{
            height: "350px",
            marginTop: "40px",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <h2
          style={{
            marginTop: "30px",
          }}
        >
          Mood History
        </h2>

        {moods.map((mood) => (
          <div
            key={mood._id}
            style={{
              background:
                "#f8fafc",
              padding: "15px",
              marginTop: "10px",
              borderRadius:
                "10px",
            }}
          >
            <h3>
              {mood.mood}
            </h3>

            <p>
              {mood.note}
            </p>

            <small>
              {new Date(
                mood.createdAt
              ).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoodHistory;