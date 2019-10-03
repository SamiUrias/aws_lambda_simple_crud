const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const router = require('./network/routes')


server.use(bodyParser.json());
router(server);


module.exports = server;