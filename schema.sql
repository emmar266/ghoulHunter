DROP TABLE IF EXISTS users;

CREATE TABLE users 
(
    username TEXT NOT NULL PRIMARY KEY,
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS score;

CREATE TABLE score
(
    username TEXT NOT NULL,
    score INTEGER NOT NULL
);