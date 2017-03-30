"use strict";

var express = require("express");
var user = require("../services/userService");

var router = new express.Router();

router.get("/profile", function (req, res) {
    user.getUserSettings(req.username);
    res.status(200).json({
        username: req.username,
        colors: ["#FFC122", "#C70321", "#581123"]
    });
});

router.post("/changeSettings", function (req, res) {
    user.setUserSettings(req.username);
    res.status(200).json({
        username: req.username,
        colors: ["#FFC122", "#C70321", "#581123"]
    });
});

module.exports = router;