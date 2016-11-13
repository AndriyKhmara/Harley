'use strict';
var logger = require('/Harley/dist/services/logger.js');
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
        var path = '/Harley/dist/config/data.json';
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError("Can't read from file " + path);
            return [];
        }
    };
    
    return {
        initialize: initialize,
        getMockData: getMockData
    }
})();