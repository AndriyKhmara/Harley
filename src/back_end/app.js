'use strict';

var http        = require('http'),
    express     = require('express'),
    bodyParser  = require("body-parser"),
    app         = express(),
    logger      = require('./services/logger.js'),
    weatherController = require('./controllers/weather');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// route to mock data with services statistics per day
app.get('/weather/v01/stat/service/day', function (req, res) {
    res.send(weatherController.getServiceDayStat(req.query));
});
// route to mock data with services statistics per month
app.get('/weather/v01/stat/service/month', function (req, res) {
    res.send(weatherController.getServiceMonthStat(req.query));
});
// route to mock data with cities statistics per day
app.get('/weather/v01/stat/city/day', function (req, res) {
    res.send(weatherController.getCityDayStat(req.query));
});
// route to mock data with cities statistics per month
app.get('/weather/v01/stat/city/month', function (req, res) {
    res.send(weatherController.getCityMonthStat(req.query));
});
app.get('/weather/v01/current', function (req, res) {
    weatherController.getCurrentWeather().then(function (data) {
        res.send(data);
    });
});
app.get('/weather/v01/stat/service-by-city/day', function (req, res) {
    var dateFrom = req.query.from;
    var dateTo =  req.query.to;
    weatherController.getServiceStatByCities(dateFrom, dateTo).then(function (data) {
        console.log(data);
        res.send(data);
    });
});

//TODO: Make parameters for send day or time interval
app.get('/weather/v01/statistic/day', function (req, res) {
    var date = new Date();
    weatherController.getServiceDayStat(date).then(function (data) {
        res.send(data);
    });
});

http.createServer(app).listen(3000, function () {
    console.log('App listening on port 3000!');
});