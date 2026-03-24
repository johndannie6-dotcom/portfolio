const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 🔥 DEBUG: check env variable
console.log("MONGO_URI:", process.env.MONGO_URI);

// 🔥 CONNECT TO DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log("MongoDB ERROR:", err);
});

// schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

// route
app.post("/save", async (req, res) => {
  try {
    const data = new Contact(req.body);
    await data.save();
    res.send("Saved!");
  } catch (err) {
    console.log("SAVE ERROR:", err);
    res.status(500).send("Error saving");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});