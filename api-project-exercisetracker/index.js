const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose');

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//Schemas / Models
const userSchema = mongoose.Schema({
  username: { type: String, unique: true }
})

const User = mongoose.model('User', userSchema);

const exerciseSchema = mongoose.Schema({
  description: String,
  duration: Number,
  date: String,
  userId: { type: String, require: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

// Home root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
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

// Post /api/users/:_id/exercises Add exercise
app.post('/api/users/:_id/exercises', async (req, res) => {
  const userId = req.params._id;
  const { description, duration } = req.body;
  const date = req.body.date
    ? new Date(req.body.date).toDateString() 
    : new Date().toDateString()
  const user = await User.findById(userId);
  if (!user) {
    res.json({message: "No user found"})
  } else {
    try {
      const findExercise = await Exercise.findOne({
        description,
        duration,
        date,
        userId
      })
      if (findExercise) {
        res.json({
          _id: findExercise.userId,
          username: user.username,
          date: date,
          duration: findExercise.duration,
          description: findExercise.description,
        })
      } else {
        const exercise = await Exercise.create({
          description,
          duration,
          date,
          userId
        })
        res.json({
          _id: exercise.userId,
          username: user.username,
          date: date,
          duration: exercise.duration,
          description: exercise.description,
        })
      }
    } catch(err) {
      res.send("There was a error")
    }
  }
})


app.get('/api/users/:_id/logs', async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  const user = await User.findById(userId);
  if (!user) res.send({Error: "No user found"});

  const limitObj = {};
  if (from) limitObj['$gte'] = new Date(from);
  if (to) limitObj['$lte'] = new Date(to);

  const filter = { user_id: userId };
  if (from || to) filter.date = limitObj;

  const exercises = await Exercise.find(filter).limit(+limit ?? 500)

  const logFormat = exercises.map(e => ({
    description: e.description.toString(),
    duration: parseInt(e.duration),
    date: new Date(e.date).toDateString,
  }))

  res.json({
    username: user.username,
    count: exercises.length,
    _id: user._id,
    log: logFormat
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
