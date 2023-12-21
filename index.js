require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db/connection.db");

// Importing routes
const roomRoutes = require("./routes/room.routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Connecting DB.
db();

app.get("/", (req, res) => {
  res.send("Welcome to Hall booking API");
});

app.use("/api", roomRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});