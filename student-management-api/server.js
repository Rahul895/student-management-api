const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

const app = express();

app.use(express.json());

// DNS Test
dns.resolveSrv(
  "_mongodb._tcp.student-management-clus.phe4gdz.mongodb.net",
  (err, records) => {
    console.log("===== DNS TEST =====");
    console.log("ERROR:", err);
    console.log("RECORDS:", records);
    console.log("====================");
  }
);

// MongoDB Connection
console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.error("FULL ERROR:");
    console.error(err);
});

// Home Route
app.get("/", (req, res) => {
    res.send("Student Management API Running");
});

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});