const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 🔥 SIMPLE & WORKING ATLAS CONNECTION
mongoose.connect("mongodb+srv://admin:admin123@cluster0.2gb8wnq.mongodb.net/portfolioDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// schema
const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String
});

// route
app.post("/save", async (req, res) => {
  const data = new Contact(req.body);
  await data.save();
  res.send("Saved!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Running on port " + PORT));