// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api', (req, res) =>{
  let dateObj = new Date();
  let result = {
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  }
  res.send(result);
});

app.get("/api/:date", function(req, res) {
  let dateObj;
  const numRegExp = /^[0-9]+$/;
  numRegExp.test(req.params.date)
    ? dateObj = new Date(Number(req.params.date))
    : dateObj = new Date(req.params.date);
  if (dateObj.toString() === 'Invalid Date') {
    res.json({ error: "Invalid Date" })
  } else {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString()
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
