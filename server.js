const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connects to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/teacher-pod");

//Sessions
const sessions = require("client-sessions");

app.use(sessions({
  cookieName: "session",
  secret: process.env.cookieSecret,
  duration: 6 * 60 * 60 * 1000 // 6 hours 
}))

// Pulls in API routes for use
app.use(routes);

// Sends every other request to the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});