'use strict';
var request = require('request'),
    config = require('../config/config.js'),
    MongoClient = require('mongodb').MongoClient,
    urlDB = 'mongodb://localhost:27017/weatherProject',
    mapperService = require('../services/mapperService'),
    dataBaseService = require('../services/DataBaseService'),
    dataAfterMapperCollectionName = 'unifiedWeather',
    logger = require('./../services/logger.js');

module.exports = (function () {
    var setDataDB = function (serviceName, city, data) {

        switch (serviceName) {
        case "openWeather":

            dataBaseService.setDataToDB(urlDB, serviceName, data);

            break;
        case "wunderground":

            dataBaseService.setDataToDB(urlDB, serviceName, data);

            break;
        case "darkSky":

            dataBaseService.setDataToDB(urlDB, serviceName, data);

            break;
        }
        var unifiedWeather = mapperService.prepareDataFromService(serviceName, city, data);
        dataBaseService.setDataToDB(urlDB, 'unifiedWeather', unifiedWeather);
    },
        requestData = function (obj) {
            request(obj.url, function (error, response, body) {
                if (error) {
                    logger.logError(error);
                }
                if (!error && response.statusCode === 200) {
                    setDataDB(obj.name, obj.city, JSON.parse(body));
                }
            });
        },
        getWeatherData = function () {
            var citiesURLs = config.getCitiesURLs(),
                data = [];

            citiesURLs.forEach(function (obj) {
                data.push(requestData(obj));
            });

            return data;
        };


    return {
        getWeatherData: getWeatherData
    };
}());

