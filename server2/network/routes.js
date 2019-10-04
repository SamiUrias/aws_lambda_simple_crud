const express = require('express');
const books = require('../components/books/network')
const authors = require('../components/authors/network')
const booksAuthors = require('../components/booksAuthor/network')

const routes = function (server) {
    server.use('/books', books);
    server.use('/authors', authors);
    server.use('/booksauthors', booksAuthors);
};

module.exports = routes;