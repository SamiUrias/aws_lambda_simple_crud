const express = require('express');
const books = require('../components/books/network')

const routes = function (server) {
    server.use('/books', books)
};

module.exports = routes;