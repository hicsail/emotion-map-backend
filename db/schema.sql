ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'rsPASS1!';

CREATE TABLE IF NOT EXISTS emotion_data (
    participant_id VARCHAR(255),
    valence INT,
    activation INT,
    current_emotion VARCHAR(255),
    ts DATETIME,
    PRIMARY KEY (participant_id, ts)
);