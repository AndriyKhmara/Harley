/*jslint nomen: true */
'use strict';
var config              = require('./ConfigService.js'),
    dataBaseService     = require('./DataBaseService'),
    _                   = require('lodash'),
    logger              = require('./logger.js'),
    set                 = require('./../config/settings.json'),
    pathToDBs           = require('./../config/pathConfig.json');
module.exports = (function () {


    var minValue = function (paramName, data, cityNameNeeded) {
        var lowest      = Number.POSITIVE_INFINITY,
            fieldName   = 'min_' + paramName,
            result      = {},
            city        = '';
        _.each(data, function (item) {
            if (item[paramName] < lowest) {
                lowest = item[paramName];
                city = item.cityName;
            }
            if (cityNameNeeded) {
                result[fieldName] = lowest;
                result['cityName'] = city;
            }
        });
        if (cityNameNeeded) {
            return result;
        }
        return lowest;

    },
        maxValue = function (paramName, data, cityNameNeeded) {
            var highest     = Number.NEGATIVE_INFINITY,
                fieldName   = 'max_' + paramName,
                result      = {},
                city        = '';
            _.each(data, function (item) {
                if (item[paramName] > highest) {
                    highest = item[paramName];
                    city = item.cityName;
                }
                if (cityNameNeeded) {
                    result[fieldName] = highest;
                    result['cityName'] = city;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return highest;
        },

        avgValue = function (paramName, data, cityNameNeeded) {
            var avg         = 0,
                fieldName   = 'avg_' + paramName,
                result      = {};
            _.each(data, function (item) {
                avg += item[paramName];
                if (cityNameNeeded) {
                    result[fieldName] = avg / data.length;
                    result['cityName'] = item.cityName;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return avg / data.length;
        },
        result = function (dataArr, cityName, serviceName) {

            return {
                'time': dataArr[0].date,
                'city' : cityName,
                'service' : serviceName,
                'stat': [{
                    'minTemp': minValue('temp', dataArr)
                }, {
                    'maxTemp': maxValue('temp', dataArr)
                }, {
                    'minHum': minValue('humidity', dataArr)
                }, {
                    'maxHum': maxValue('humidity', dataArr)
                }, {
                    'minWindSpeed': minValue('windSpeed', dataArr)
                }, {
                    'maxWindSpeed': maxValue('windSpeed', dataArr)
                }, {
                    'avgTemp': {
                        'temp': avgValue('temp', dataArr)
                    }
                }, {
                    'avgHum': {
                        'hum': avgValue('humidity', dataArr)
                    }
                }, {
                    'avgWindSpeed': {
                        'windSpeed': avgValue('windSpeed', dataArr)
                    }
                }]
            };
        },
        result2 = function (dataArr, cityName) {

            return {
                'time': dataArr[0].date,
                'city' : cityName,
                'stat': [{
                    'minTemp': minValue('temp', dataArr)
                }, {
                    'maxTemp': maxValue('temp', dataArr)
                }, {
                    'minHum': minValue('humidity', dataArr)
                }, {
                    'maxHum': maxValue('humidity', dataArr)
                }, {
                    'minWindSpeed': minValue('windSpeed', dataArr)
                }, {
                    'maxWindSpeed': maxValue('windSpeed', dataArr)
                }, {
                    'avgTemp': {
                        'temp': avgValue('temp', dataArr)
                    }
                }, {
                    'avgHum': {
                        'hum': avgValue('humidity', dataArr)
                    }
                }, {
                    'avgWindSpeed': {
                        'windSpeed': avgValue('windSpeed', dataArr)
                    }
                }]
            };
        },
        result3 = function (dataArr, serviceName) {

            return {
                'time': dataArr[0].date,
                'service' : serviceName,
                'stat': [{
                    'minTemp': minValue('temp', dataArr)
                }, {
                    'maxTemp': maxValue('temp', dataArr)
                }, {
                    'minHum': minValue('humidity', dataArr)
                }, {
                    'maxHum': maxValue('humidity', dataArr)
                }, {
                    'minWindSpeed': minValue('windSpeed', dataArr)
                }, {
                    'maxWindSpeed': maxValue('windSpeed', dataArr)
                }, {
                    'avgTemp': {
                        'temp': avgValue('temp', dataArr)
                    }
                }, {
                    'avgHum': {
                        'hum': avgValue('humidity', dataArr)
                    }
                }, {
                    'avgWindSpeed': {
                        'windSpeed': avgValue('windSpeed', dataArr)
                    }
                }]
            };
        },
        serviceDayStatisticByCity = function (searchTime) {
            var start = new Date(searchTime.getTime()),
                end = new Date(searchTime.getTime()),
                cities = [];
            start.setHours(set.start.hour, set.start.mins, set.start.sec, set.start.mSec);
            end.setHours(set.end.hour, set.end.mins, set.end.sec, set.end.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function (serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        parseInt(start.getTime() / set.mSecToSec, set.decimal), parseInt(end.getTime() / set.mSecToSec, set.decimal), cityName, serviceName).then(function (dataArr) {
                        //console.info('Data services successfully collected!');
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatisticsByCity, result(dataArr, cityName, serviceName));
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },

        serviceMonthStatisticByCity = function (searchTime) {
            var start = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                end = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0),
                cities = [];
            start.setHours(set.start.hour, set.start.mins, set.start.sec, set.start.mSec);
            end.setHours(set.end.hour, set.end.mins, set.end.sec, set.end.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function (serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        parseInt(start.getTime() / set.mSecToSec, set.decimal), parseInt(end.getTime() / set.mSecToSec, set.decimal), cityName, serviceName).then(function (dataArr) {
                        //console.info('Data services successfully collected!');
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatisticsByCity, result(dataArr, cityName, serviceName));
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },

        cityDayStatistics = function (searchTime) {
            var start = new Date(searchTime.getTime()),
                end = new Date(searchTime.getTime()),
                cities = [];
            start.setHours(set.start.hour, set.start.mins, set.start.sec, set.start.mSec);
            end.setHours(set.end.hour, set.end.mins, set.end.sec, set.end.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / set.mSecToSec, set.decimal), parseInt(end.getTime() / set.mSecToSec, set.decimal), cityName).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityDayStatistics, result2(dataArr, cityName));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        cityMonthStatistics = function (searchTime) {
            var start = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                end = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0),
                cities = [];
            start.setHours(set.start.hour, set.start.mins, set.start.sec, set.start.mSec);
            end.setHours(set.end.hour, set.end.mins, set.end.sec, set.end.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / set.mSecToSec, set.decimal), parseInt(end.getTime() / set.mSecToSec, set.decimal), cityName).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityMonthStatistics, result2(dataArr, cityName));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        serviceDayStatistics = function (searchTime) {
            var start = new Date(searchTime.getTime()),
                end = new Date(searchTime.getTime());
            start.setHours(set.start.hour, set.start.mins, set.start.sec, set.start.mSec);
            end.setHours(set.end.hour, set.end.mins, set.end.sec, set.end.mSec);
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / set.mSecToSec, set.decimal), parseInt(end.getTime() / set.mSecToSec, set.decimal), service).then(function (dataArr) {
                    console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatistics, result3(dataArr, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        serviceMonthStatistics = function (searchTime) {
            var start = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                end = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0);
            start.setHours(set.start.hour, set.start.mins, set.start.sec, set.start.mSec);
            end.setHours(set.end.hour, set.end.mins, set.end.sec, set.end.mSec);
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(start.getTime() / set.mSecToSec, set.decimal), parseInt(end.getTime() / set.mSecToSec, set.decimal), service).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatistics, result3(dataArr, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        };

    return {
        serviceDayStatistics: serviceDayStatistics,
        serviceMonthStatistics: serviceMonthStatistics,
        cityDayStatistics: cityDayStatistics,
        cityMonthStatistics: cityMonthStatistics,
        serviceDayStatisticByCity: serviceDayStatisticByCity,
        serviceMonthStatisticByCity: serviceMonthStatisticByCity
    };
}());