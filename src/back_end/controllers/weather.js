'use strict';
var logger = require('./../services/logger.js'),
    getWeatherFromAPI   = require('../services/getDataFromAPI'),
    urlStatisticsDataDB = 'mongodb://localhost:27017/Weather_Statistics',
    urlWeatherDataDB    = 'mongodb://localhost:27017/weatherProject',
    dataBaseService     = require('../services/DataBaseService'),
    statisticsService   = require('../services/StatisticService'),
    mapperService   = require('../services/mapperService'),
    fs                  = require('fs');

module.exports = (function () {

    var data = [],
        date = new Date(),
        getDataOnlyOnce = false,
        currentWeatherJSONpath = './data/common_data.json',
        currentStatJSONpath = './data/statisticMock.json',

        initialize = function () {
            //TODO:Set timer to collect statistics for the day
            //TODO: To get data from API uncomment this !
            // if (!getDataOnlyOnce) {
            //     data = getWeatherFromAPI.getWeatherData();
            //     getDataOnlyOnce = true;
            // }
        },
        /**
         *  @desc: Method returns an array of current weather from the database.
         *  If the database not available -  returned mock data from JSON.
         *
        */
        readData = function (path) {
            //logger works 1
            try {
                var result = fs.readFileSync(path, 'utf8');
                return JSON.parse(result);
            } catch (e) {
                logger.logError("Can't read from file ");
                console.log(e);
                console.log('ERROR');
                return [];
            }
        },
        getCurrentWeather = function () {
            var result = dataBaseService.getLastRecords(urlWeatherDataDB, 'unifiedWeather').then(function (items) {
                console.info('The current weather data from DB returned successfully!');
                return items;
            }, function (err) {
                logger.logError(err);
                return readData(currentWeatherJSONpath);
            });
            return result;
        },

        getServiceDayStat = function () {
            var path = './data/serviceDayStatMock.json';
            return readData(path);
        },
        getServiceMonthStat = function () {
            var path = './data/serviceMonthStatMock.json';
            return readData(path);
        },
        getCityDayStat = function () {
            var path = './data/cityDayStatMock.json';
            return readData(path);
        },
        getCityMonthStat = function () {
            var path = './data/cityMonthStatMock.json';
            return readData(path);
        },

        getServiceDayStatistics = function () {
            var path = './data/serviceDayStatMock.json',
                res = readData(path);
            return res;
        },

        /**
         * @desc:
         * Method returns an array of day statistic from the database.
         * If the database not available -  returned mock data from JSON.
         */
        getDaysStatiscticData = function (date) {
            var start = new Date(date.getTime()),
                end = new Date(date.getTime());
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);

            dataBaseService.getAllStatistic(urlStatisticsDataDB, 'Day_Statistics').then(function (items) {
                console.info('All statistic data from DB has been returned successfully!');
                return items;
            }, function (err) {
                logger.logError(err);
                return readData(currentStatJSONpath);
            });

        };

    return {
        initialize: initialize,
        getCurrentWeather: getCurrentWeather,
        getDaysStatiscticData: getDaysStatiscticData,
        getServiceDayStat: getServiceDayStat,
        getServiceMonthStat: getServiceMonthStat,
        getCityDayStat: getCityDayStat,
        getCityMonthStat: getCityMonthStat
    };
}());