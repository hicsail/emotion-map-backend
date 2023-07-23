const express = require("express");
const mysql = require('mysql')
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


// use environment variables here
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA
})
connection.connect()

// POST request to add record to db
app.post('/create', (req, res) => {
    var id = req.body.id;
    var valence = req.body.valence;
    var activation = req.body.activation;
    var emotion = req.body.emotion;
    var ts = req.body.ts;

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

// GET health request
app.get('/health', (req, res) => {
    const query = 'SELECT 1+1 FROM emotion_data';
    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error("Issue with database connection: ", error);
            res.sendStatus(500);
        } else {
            console.log("API and DB connections are functional");
            res.sendStatus(200);
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})