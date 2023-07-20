const express = require("express");
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());

// use environment variables here
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#',
    database: 'emotionmap'
  })

connection.connect()

// POST request to add record to db
app.post('/create/:id/:valence/:activation/:emotion/:ts', (req, res) => {
    var id = req.params.id;
    var valence = req.params.valence;
    var activation = req.params.activation;
    var emotion = req.params.emotion;
    var ts = req.params.ts;

    const insertQuery = 'INSERT INTO emotion_data (participant_id, valence, activation, current_emotion, ts) VALUES (?, ?, ?, ?, ?)';
    const values = [id, valence, activation, emotion, ts];

    connection.query(insertQuery, values, (error, results, fields) => {
        if (error) {
            console.error("Error inserting data: ", error);
            res.sendStatus(500);
        } else {
            console.log("Data inserted successfully!");
            res.sendStatus(200);
        }
    });
});

// PUT request to update an existing record in db
// to be implemented? - implement if you want only the most recent data from participants



// GET request to determine if participant is in DB
// to be implemented?

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})