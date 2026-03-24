const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));


async function connectDB() {
  try {
    await mongoose.connect("mongodb://admin:admin123@cluster0-shard-00-00.2gb8wnq.mongodb.net:27017,cluster0-shard-00-01.2gb8wnq.mongodb.net:27017,cluster0-shard-00-02.2gb8wnq.mongodb.net:27017/portfolioDB?ssl=true&replicaSet=atlas-2gb8wnq-shard-0&authSource=admin&retryWrites=true&w=majority");

    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB ERROR:", err);
  }
}

connectDB();
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