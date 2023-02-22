const express = require('express');
const app = express();
app.use(express.json()); // to parse incoming requests with JSON payloads

// Sample users data
const users = [
    {id: 1, name: 'Jukka', email: 'jukka@example.com'},
    {id: 2, name: 'Kari', email: 'kari@example.com'},
    {id: 3, name: 'Eino', email: 'eino@example.com'},
];

// GET method
app.get('/users', (req, res) => {
    res.json(users);
});

// GET method with one parameter
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

// GET method with two parameters
app.get('/users/:name/:email', (req, res) => {
    const name = req.params.name;
    const email = req.params.email;
    const user = users.find(u => u.name === name && u.email === email);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

// POST method
app.post('/users', (req, res) => {
    const {name, email} = req.body;
    const id = users.length + 1;
    const user = {id, name, email};
    users.push(user);
    res.status(201).json(user);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
