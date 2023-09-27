const userSchema = new mongoose.Schema({
    username: String,
  });
  
  const User = mongoose.model("username", userSchema);
  
  const exercisesSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    description: String,
    duration: Number,
    date: Date,
  });
  const Exercise = mongoose.model("exercises", exercisesSchema);
  
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
  });
  
  app.get("/api/users", async (req, res) => {
    const user = await User.find();
    if (!user) return res.send("there is no user");
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    const user = new User({
      username: req.body.username,
    });
    await user.save();
  
    console.log(user);
  
    res.json(user);
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
    // console.log(id.toString());
    const user = await User.findById(id);
    if (!user) return res.send("could not find user");
  
    let dateObj = {};
    if (from) {
      dateObj["$gte"] = new Date(from);
    }
    if (to) {
      dateObj["$lte"] = new Date(to);
    }
    let filter = {
      user_id: id,
    };
    if (from || to) {
      filter.date = dateObj;
    }
    const exercises = await Exercise.find(filter).limit(+limit ?? 500);
    console.log(exercises);
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
  