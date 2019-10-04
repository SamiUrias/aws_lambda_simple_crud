const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controller");


// Create
router.post("/", function(req, res) {
    controller.addRelationship(req.body)
        .then((book) => {
            response.success(req, res, book, 201);
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        });
});

// Read
router.get("/", function(req, res) {
    controller.getRelationship()
        .then((relationships) => {
            response.success(req, res, relationships)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

router.get("/:bookid/:authorid", function(req, res) {
    controller.getSingleRelationship(req.params.bookid, req.params.authorid)
        .then((booksList) => {
            response.success(req, res, booksList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

// Update
router.put("/:bookid/:authorid", function(req, res) {
    controller.updateRelationship(req.body, req.params.bookid, req.params.authorid)
        .then((book) => {
            response.success(req, res, book)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

// Delete
router.delete("/:bookid/:authorid", function(req, res) {
    controller.deleteSingleRelationship(req.params.bookid, req.params.authorid)
        .then((booksList) => {
            response.success(req, res, booksList)
        })
        .catch(error => {
            response.error(req, res, 'Unexpected error', 500, error)
        })
});

module.exports = router;