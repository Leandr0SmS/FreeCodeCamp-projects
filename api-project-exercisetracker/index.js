const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const userSchema = mongoose.Schema({
  username: { type: String, unique: true }
}, {versionKey: false})

const User = mongoose.model('User', userSchema);

const exerciseSchema = mongoose.Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
  userId: { type: String, require: true }
}, {versionKey: false});

const Exercise = mongoose.model('Exercise', exerciseSchema);

const userLogSchema = mongoose.Schema({
  username: String,
  count: Number,
  userId: String,
  log: [{
    description: String,
    duration: Number,
    date: String,
  }]
})

const UserLog = mongoose.model('UserLog', userLogSchema);

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

//Get /api/users Get all users
app.get('/api/users', async (req, res) => {
  const findAllUsers = await User.find();
  res.send(findAllUsers)
})

// Post /api/users/:_id/exercises Add exercise
app.post('/api/users/:_id/exercises', async (req, res) => {
  const userId = req.body[':_id'];
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date 
    ? new Date(req.body.date).toDateString() 
    : new Date().toDateString()
  const foundUsername = await User.findById(userId);
  if (!foundUsername) {
    res.json({message: "No user found"})
  } else {
    try {
      const findExercise = await Exercise.findOne({
        username: foundUsername.username,
        description,
        duration,
        date,
        userId
      })
      if (findExercise) {
        res.json({
          _id: findExercise.userId,
          username: findExercise.username,
          date: new Date(findExercise.date).toDateString(),
          duration: findExercise.duration,
          description: findExercise.description,
        })
      } else {
        const exercise = await Exercise.create({
          username: foundUsername.username,
          description,
          duration,
          date,
          userId
        })
        res.json({
          _id: exercise.userId,
          username: exercise.username,
          date: new Date(exercise.date).toDateString(),
          duration: exercise.duration,
          description: exercise.description,
        })
      }
    } catch(err) {
      res.send("There was a error")
    }
  }
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
