'use strict';
//var logger = require('./services/logger.js');
var getWeatherFromAPI = require('../services/getDataFromAPI');
var fs = require('fs');

module.exports = (function () {

    var data = [],
        getDataOnlyOnce = false;

    var initialize = function () {
        if (!getDataOnlyOnce) {
            data = getWeatherFromAPI.getWeatherData();
            getDataOnlyOnce = true;
            console.log(data);
        }
    };


    var getMockData = function () {
        try {
            var result = fs.readFileSync('./config/data.json', 'utf8');
            return JSON.parse(result);
        } catch (e) {
            console.log(e);
            //logger.logError("Can't read from file " + path);
            return [];
        }
    };

    return {
        initialize: initialize,
        getMockData: getMockData
    }
})();