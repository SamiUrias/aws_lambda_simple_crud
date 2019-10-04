const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");


// Create
router.post("/", function(req, res) {
    controller.addBooks(req.body)
        .then((book) => {
            response.success(req, res, book, 201);
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        });
});

// Read
router.get("/", function(req, res) {
    controller.getBooks()
        .then((booksList) => {
            response.success(req, res, booksList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

router.get("/:id", function(req, res) {
    controller.getSingleBook(req.params.id)
        .then((booksList) => {
            response.success(req, res, booksList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

// Update
router.put("/:id", function(req, res) {
    controller.updateBook(req.body, req.params.id)
        .then((book) => {
            response.success(req, res, book)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

// Delete
router.delete("/:id", function(req, res) {
    controller.deleteSingleBook(req.params.id)
        .then((booksList) => {
            response.success(req, res, booksList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

module.exports = router;