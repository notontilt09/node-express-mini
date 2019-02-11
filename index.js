// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware 
server.use(express.json());

// routes === endpoints
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json({success: true, users})
        })
        .catch(err => {
            res.status(err.code).json({success: false, message: err.message})
        })
});





server.listen(5000, () => {
    console.log('\n*** Running on port 5000 ***\n');
})