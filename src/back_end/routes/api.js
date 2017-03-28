'use strict';

var express = require('express');

var router = new express.Router();

router.get('/profile', function (req, res) {
    res.status(200).json({
        username: req.username,
        message: "You're authorized to see this secret message."
    });
});

module.exports = router;