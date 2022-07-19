//Libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

//Server initialize
const PORT = process.env.PORT || 5008;
const server = express();
server.use(cors()); //allow us to access the server from each endpoint
server.use(express.json()); //add json support for POST, GET, PUT, DELETE 
server.use(express.static(path.join(__dirname, 'client/build/')));

//routes
server.use('/api/notes', require('./controllers/noteController'));
server.use('/api/users', require('./controllers/UserController'));
server.use('/api/attraction', require('./controllers/AttractionController'));
server.use('/api/business', require('./controllers/BusinessController'));
server.use('/api/category', require('./controllers/CategoryController'));




//Global Get Request
server.get('*/*', async (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/', 'index.html'));
});

//Run the server
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

