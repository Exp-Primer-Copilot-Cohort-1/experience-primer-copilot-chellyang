// Create web server

var express = require('express');
var router = express.Router();
var db = require('../models/db.js');

// Get all comments for a given post
router.get('/post/:postId', function(req, res) {
  var postId = req.params.postId;

  db.Comment.findAll({
    where: {
      postId: postId
    }
  }).then(function(comments) {
    res.json(comments);
  });
});

// Get all comments for a given user
router.get('/user/:userId', function(req, res) {
  var userId = req.params.userId;

  db.Comment.findAll({
    where: {
      userId: userId
    }
  }).then(function(comments) {
    res.json(comments);
  });
});

// Create a new comment
router.post('/', function(req, res) {
  var userId = req.body.userId;
  var postId = req.body.postId;
  var comment = req.body.comment;

  db.Comment.create({
    userId: userId,
    postId: postId,
    comment: comment
  }).then(function() {
    res.sendStatus(200);
  });
});

// Delete a comment
router.delete('/:commentId', function(req, res) {
  var commentId = req.params.commentId;

  db.Comment.destroy({
    where: {
      id: commentId
    }
  }).then(function() {
    res.sendStatus(200);
  });
});

module.exports = router;
