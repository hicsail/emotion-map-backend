DROP DATABASE IF EXISTS emotionmap;
CREATE DATABASE emotionmap;
USE emotionmap;

CREATE TABLE emotion_data (
    participant_id VARCHAR(255),
    valence INT,
    activation INT,
    current_emotion VARCHAR(255),
    ts DATETIME,
    PRIMARY KEY (participant_id, timestamp)
);