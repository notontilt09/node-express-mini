// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware 
server.use(express.json());

// routes === endpoints

// handle GET request for all users
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({ success: true, users })
        })
        .catch(err => {
            res.status(500).send({ error: "The users information could not be retrieved."})
        })
});

// handle GET request for specific user
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(user => {
            if (user.length === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist."})
            }
            res.status(200).json({success: true, user})
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." })
        })
});

// handle POST request for creating new user
server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." });
        return;
    }
    db.insert(user)
        .then(user => {
            db.findById(user.id)
                .then(user => {
                    res.status(201).json({ success: true, user })
                })
                .catch(err => {
                    res.status(500).json({ error: "There was an error while saving the user to the database"})
                })
        })
});





server.listen(5000, () => {
    console.log('\n*** Running on port 5000 ***\n');
})