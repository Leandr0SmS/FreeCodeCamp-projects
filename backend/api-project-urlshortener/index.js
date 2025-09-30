require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose()
const fs = require('fs');
const { resolve } = require('path');

const pathToDatabase = './database/sqlLite3.db';

// Check if the SQLite database file exists
if (!fs.existsSync(pathToDatabase)) {
  try {
    // Create the SQLite database file synchronously
    fs.writeFileSync(pathToDatabase, '');
    console.log('File created successfully');
  } catch (err) {
    console.error(err);
  }
}

const db = new sqlite3.Database(pathToDatabase);

db.serialize(() => {
  const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS urls(url_id INTEGER PRIMARY KEY, original_url TEXT UNIQUE NOT NULL)';
  db.run(sqlCreateTable);
})

async function queryUrl(url) {
  return new Promise((resolve, reject) => {
    const data = [];
    db.serialize(() => {
      db.all(`SELECT * FROM urls WHERE original_url="${url}"`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows) {
            rows.forEach((row) => {
              data.push(row);
            });
          }
          resolve(data);
        }
      });
    });
  });
}

async function queryId(id) {
  return new Promise((resolve, reject) => {
    const data = [];
    db.serialize(() => {
      db.all(`SELECT * FROM urls WHERE url_id="${id}"`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows) {
            rows.forEach((row) => {
              data.push(row);
            });
          }
          resolve(data);
        }
      });
    });
  });
}

async function updateUrl(url) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Insert Value
      const sqlInsert = 'INSERT OR IGNORE INTO urls(original_url) VALUES(?)';
      db.run(sqlInsert, [`${url}`], (err) => {
        if (err) {
          console.error("Error to insert: " + err.message);
          reject(err); // Reject the promise in case of an error
        } else {
          resolve(`Insert: ${url} OK`); // Resolve the promise on success
        }
      });
    });
  });
}

function isValidUrl(url) {
  // Regular expression pattern for a valid URL
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({extended: true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  if (isValidUrl(url)) {
    updateUrl(url)
    queryUrl(url)
    .then((data) => {
      if (data.length > 0) {
        const {original_url, url_id} = data[0];
        const response = { original_url : original_url, short_url: url_id}
        res.json(response)
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the database query
      console.error(error);
    });
  } else {
    const resError = { error: 'invalid url' }
    res.json(resError)
  }
})

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  queryId(id)
    .then((data) => {
      if (data.length > 0) {
        const {original_url} = data[0];
        res.redirect(original_url)
      }
    })
    .catch((error) => {
      // Handle any errors that occurred during the database query
      console.error(error);
    });
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// close the database connection
//db.close();