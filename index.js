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
            res.status(200).json({success: true, users})
        })
        .catch(err => {
            res.status(err.code).json({success: false, message: err.message})
        })
});

// handle GET request for specific user
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(user => {
            res.status(200).json({success: true, user})
        })
        .catch(err => {
            res.status(500).json({success: false, err})
        })
});





server.listen(5000, () => {
    console.log('\n*** Running on port 5000 ***\n');
})