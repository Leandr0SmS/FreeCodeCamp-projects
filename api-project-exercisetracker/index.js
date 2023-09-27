const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

///Schemas / Models
const userSchema = mongoose.Schema({
  username: { type: String, unique: true }
}) 
const User = mongoose.model("username", userSchema);

const exercisesSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date,
});
const Exercise = mongoose.model("exercises", exercisesSchema);

//Home
app.get("/", (req, res) => {
res.sendFile(__dirname + "/views/index.html");
});

//Get /api/users Get all users
app.get('/api/users', async (req, res) => {
const findAllUsers = await User.find();
if (!findAllUsers) return res.send("No user");
res.send(findAllUsers)
})

//Post /api/users create new user
app.post('/api/users', async (req, res) => {
const username = req.body.username;
if (!username) {
res.send({Error: "Need to give a name"})
}
try {
const findUser = await User.findOne({username});
if (findUser) {
  res.json(findUser)
} else {
  const user = await User.create({
    username 
  });
  res.json(user)
}
} catch(err) {
console.log(err)
}
});


app.post("/api/users/:_id/exercises", async (req, res) => {
const id = req.params._id;
const { description, duration, date } = req.body;
try {
const user = await User.findById(id);
if (!user) return res.send("could not find user");

const exercises = new Exercise({
  user_id: user._id,
  description,
  duration,
  date: date ? new Date(date) : new Date(),
});
const result = await exercises.save();

res.json({
  _id: user._id,
  username: user.username,
  date: new Date(result.date).toDateString(),
  duration: result.duration,
  description: result.description,
});
} catch (err) {
  console.log(err);
}
});


app.get("/api/users/:_id/logs", async (req, res) => {
const { from, to, limit } = req.query;
const id = req.params._id;
const user = await User.findById(id);
if (!user) return res.send("could not find user");

let dateObj = {};
const filter = {user_id: id};
if (from) dateObj["$gte"] = new Date(from);
if (to) dateObj["$lte"] = new Date(to);
if (from || to) filter.date = dateObj;
console.log(filter)
const exercises = await Exercise.find(filter).limit(+limit ?? 500);
const log = exercises.map((e) => ({
description: e.description.toString(),
duration:parseInt(e.duration),
date: e.date.toDateString(),
}));

res.json({
username: user.username,
count: exercises.length,
_id: user._id,
log
});
});

const listener = app.listen(process.env.PORT || 3001, () => {
console.log("Your app is listening on port " + listener.address().port);
});