const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 🔥 SIMPLE & WORKING ATLAS CONNECTION
mongoose.connect("mongodb://admin:admin123@ac-ftlfv9h-shard-00-00.krulaeh.mongodb.net:27017,ac-ftlfv9h-shard-00-01.krulaeh.mongodb.net:27017,ac-ftlfv9h-shard-00-02.krulaeh.mongodb.net:27017/?ssl=true&replicaSet=atlas-s2t37p-shard-0&authSource=admin&appName=Cluster0")
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