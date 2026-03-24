const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());
app.use(express.static(__dirname));

// 🔥 CONNECT TO MONGODB (NON-SRV — WORKS ON RENDER)
async function connectDB() {
  try {
    await mongoose.connect("mongodb://admin:admin123@cluster0-shard-00-00.2gb8wnq.mongodb.net:27017,cluster0-shard-00-01.2gb8wnq.mongodb.net:27017,cluster0-shard-00-02.2gb8wnq.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-2gb8wnq-shard-0&authSource=admin&retryWrites=true&w=majority");

    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB ERROR:", err);
  }
}

connectDB();

// schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

// route to save data
app.post("/save", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const newContact = new Contact(req.body);
    await newContact.save();

    console.log("Saved successfully");

    res.send("Saved!");
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).send("Error saving");
  }
});

// server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});