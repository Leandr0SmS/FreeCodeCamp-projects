var express = require('express');
var cors = require('cors');
const multer  = require('multer')
const upload = multer()
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Post route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.file;
  res.json({ name, type, size })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
