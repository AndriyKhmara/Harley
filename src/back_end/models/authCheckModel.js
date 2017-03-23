'use strict';

var jwt = require('jsonwebtoken'),
    User = require('./userModel'),
    config = require('../config/config.json'),
    _ = require('underscore');


module.exports = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }
    var token = _.first(req.headers.authorization.split(' '));
    return jwt.verify(token, config.jwtSecret, function (err, decoded) {
        if (err) {
            return res.status(401).end();
        }
        var userId = decoded.sub;
        return User.findById(userId, function (userErr, user) {
            if (userErr || !user) {
                return res.status(401).end();
            }
            return next();
        });
    });
};