const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
const { auth } = require("./middleware/authMiddleware");
const { authorize } = require("./middleware/roleMiddleware");
const recordRoutes = require("./routes/recordRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

app.get("/api/test", auth, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

app.get("/api/admin-only", auth, authorize("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

// middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/users", userRoutes);
// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);


module.exports = app;