const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const mongoose=require("mongoose");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authroutes");
const moodRoutes = require("./routes/moodroutes");
const journalRoutes = require("./routes/journalroutes");
const aiRoutes = require("./routes/airoutes");

// Socket
const initializeSocket = require("./socket/matchSocket");

// Config
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/ai", aiRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("MindMate API Running...");
});

// Create HTTP Server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Initialize Socket Logic
initializeSocket(io);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
server.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
app.get("/test", (req, res) => {
  res.send("Server working");
});
