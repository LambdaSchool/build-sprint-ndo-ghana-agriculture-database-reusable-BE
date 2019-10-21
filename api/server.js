const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const register = require('../routers/register.js');
// const login = require('../routers/login.js');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());



// server.use('/api/login', login);
// server.use('/api/register', register);


server.get('/', (req, res) => {
    res.send('server is up');
});

module.exports = server;