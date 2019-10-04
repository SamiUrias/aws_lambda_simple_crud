const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");


// Create
router.post("/", function(req, res) {
    controller.addAuthor(req.body)
        .then((author) => {
            response.success(req, res, author, 201);
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        });
});

// Read
router.get("/", function(req, res) {
    controller.getAuthors()
        .then((authorsList) => {
            response.success(req, res, authorsList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

router.get("/:id", function(req, res) {
    controller.getSingleAuthor(req.params.id)
        .then((author) => {
            response.success(req, res, author)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

// Update
router.put("/:id", function(req, res) {
    controller.updateAuthor(req.body, req.params.id)
        .then((book) => {
            response.success(req, res, book)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

// Delete
router.delete("/:id", function(req, res) {
    controller.deleteSingleAuthor(req.params.id)
        .then((booksList) => {
            response.success(req, res, booksList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

module.exports = router;