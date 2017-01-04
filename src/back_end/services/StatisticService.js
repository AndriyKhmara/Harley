/*jslint nomen: true */
'use strict';
var config              = require('./ConfigService.js'),
    dataBaseService     = require('./DataBaseService'),
    _                   = require('lodash'),
    logger              = require('./logger.js'),
    set                 = require('./../config/settings.json'),
    pathToDBs           = require('./../config/pathConfig.json');
module.exports = (function () {
    var  minValue = function (paramName, data, cityNameNeeded) {
            var lowest      = Number.POSITIVE_INFINITY,
                fieldName   = set.variables.min_ + paramName,
                result      = {},
                city        = '';
            _.each(data, function (item) {
                if (item[paramName] < lowest) {
                    lowest = item[paramName];
                    city = item.cityName;
                }
                if (cityNameNeeded) {
                    result[fieldName] = lowest;
                    result.cityName = city;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return lowest;

        },
        maxValue = function (paramName, data, cityNameNeeded) {
            var highest     = Number.NEGATIVE_INFINITY,
                fieldName   = set.variables.max_ + paramName,
                result      = {},
                city        = '';
            _.each(data, function (item) {
                if (item[paramName] > highest) {
                    highest = item[paramName];
                    city = item.cityName;
                }
                if (cityNameNeeded) {
                    result[fieldName] = highest;
                    result.cityName = city;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return highest;
        },

        avgValue = function (paramName, data, cityNameNeeded) {
            var avg         = 0,
                fieldName   = set.variables.avg + paramName,
                result      = {};
            _.each(data, function (item) {
                avg += item[paramName];
                if (cityNameNeeded) {
                    result[fieldName] = avg / data.length;
                    result.cityName = item.cityName;
                }
            });
            if (cityNameNeeded) {
                return result;
            }
            return avg / data.length;
        },
        result = function (dataArr, cityName, serviceName) {
            var output,
                obj1 = {
                    time: dataArr[0].date,
                    city : cityName,
                    service : serviceName
                },
                obj2 = {
                    time: dataArr[0].date,
                    city : cityName
                },
                obj3 = {
                    time: dataArr[0].date,
                    service : serviceName
                },

                obj4 = [{
                    minTemp: minValue(set.variables.temp, dataArr)
                }, {
                    maxTemp: maxValue(set.variables.temp, dataArr)
                }, {
                    minHum: minValue(set.variables.humidity, dataArr)
                }, {
                    maxHum: maxValue(set.variables.humidity, dataArr)
                }, {
                    minWindSpeed: minValue(set.variables.windSpeed, dataArr)
                }, {
                    maxWindSpeed: maxValue(set.variables.windSpeed, dataArr)
                }, {
                    avgTemp: {
                        temp: avgValue(set.variables.temp, dataArr)
                    }
                }, {
                    avgHum: {
                        hum: avgValue(set.variables.humidity, dataArr)
                    }
                }, {
                    avgWindSpeed: {
                        windSpeed: avgValue(set.variables.windSpeed, dataArr)
                    }
                }];
            if (cityName !== 0 && serviceName !== 0) {
                obj1.stat = obj4;
                output = obj1;
            } else if (serviceName === 0 && cityName !== 0) {
                obj2.stat = obj4;
                output = obj2;
            } else if (serviceName !== 0 && cityName === 0) {
                obj3.stat = obj4;
                output = obj3;
            }
            return output;
        },

        serviceDayStatisticByCity = function (searchTime) {
            var dayStart = new Date(searchTime.getTime()),
                dayEnd = new Date(searchTime.getTime()),
                cities = [];
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function (serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal), parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal), cityName, serviceName).then(function (dataArr) {
                        //console.info('Data services successfully collected!');
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatisticsByCity, result(dataArr, cityName, serviceName));
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },

        serviceMonthStatisticByCity = function (searchTime) {
            var dayStart = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                dayEnd = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0),
                cities = [];
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                _.each(_.uniq(config.getServicesNames()), function (serviceName) {
                    dataBaseService.getServiceStatisticsByCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                        parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal), parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal), cityName, serviceName).then(function (dataArr) {
                        //console.info('Data services successfully collected!');
                        dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatisticsByCity, result(dataArr, cityName, serviceName));
                    }, function (err) {
                        logger.logError(err);
                    });
                });

            });
        },

        cityDayStatistics = function (searchTime) {
            var service = 0,
                dayStart = new Date(searchTime.getTime()),
                dayEnd = new Date(searchTime.getTime()),
                cities = [];
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal), parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal), cityName).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityDayStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        cityMonthStatistics = function (searchTime) {
            var service = 0,
                dayStart = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                dayEnd = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0),
                cities = [];
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal), parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal), cityName).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.CityMonthStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        serviceDayStatistics = function (searchTime) {
            var cityName = 0,
                dayStart = new Date(searchTime.getTime()),
                dayEnd = new Date(searchTime.getTime());
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal), parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal), service).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceDayStatistics, result(dataArr, cityName, service));
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        serviceMonthStatistics = function (searchTime) {
            var cityName = 0,
                dayStart = new Date(searchTime.getFullYear(), searchTime.getMonth(), 1),
                dayEnd = new Date(searchTime.getFullYear(), searchTime.getMonth() + 1, 0);
            dayStart.setHours(set.dayStart.hour, set.dayStart.mins, set.dayStart.sec, set.dayStart.mSec);
            dayEnd.setHours(set.dayEnd.hour, set.dayEnd.mins, set.dayEnd.sec, set.dayEnd.mSec);
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(pathToDBs.urlWeatherDataDB, pathToDBs.dataAfterMapperCollectionName,
                    parseInt(dayStart.getTime() / set.variables.mSecToSec, set.variables.decimal), parseInt(dayEnd.getTime() / set.variables.mSecToSec, set.variables.decimal), service).then(function (dataArr) {
                    //console.info('Data services successfully collected!');
                    dataBaseService.setDataToDB(pathToDBs.urlStatisticsDataDB, pathToDBs.ServiceMonthStatistics, result(dataArr, cityName, service));
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