'use strict';

var http = require('http'), express = require('express');
var bodyParser = require("body-parser");
var app = express();
var logger = require('./services/logger.js');
var weather = require('./controllers/weather');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/weather/v01/current', function (req, res) {
    weather.getCurrentWeather().then(function (data) {
        res.send(data);
    });
});


http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});

weather.initialize();