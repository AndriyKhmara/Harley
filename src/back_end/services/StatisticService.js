/*jslint nomen: true */
'use strict';
var config              = require('../config/config.js'),
    dataBaseService     = require('../services/DataBaseService'),
    _                   = require('underscore'),
    logger = require('./../services/logger.js'),
    urlStatisticsDataDB = 'mongodb://localhost:27017/Weather_Statistics',
    urlWeatherDataDB    = 'mongodb://localhost:27017/weatherProject';

module.exports = (function () {

    var cityDayStatistics = function (serchTime) {
        var start = new Date(serchTime.getTime()),
            end = new Date(serchTime.getTime()),
            cities = [];
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        _.each(config.getCitiesURLs(), function (city) {
            cities.push(city.city);
        });

        _.each(_.uniq(cities), function (cityName) {
            dataBaseService.getStatisticsOnCities(urlWeatherDataDB, 'unifiedWeather',
                parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName).then(function (dataArr) {
                console.info('Data services successfully collected!');
                var lowestTempObj = {},
                    highesTempObj = {},
                    lowestHumObj = {},
                    highesHumObj = {},
                    lowestWindSpeedObj = {},
                    highesWindSpeedObj = {},
                    result = {},
                    avgTempVal = 0,
                    avgHumVal = 0,
                    avgWindSpeedVal = 0,
                    lowestTemp = Number.POSITIVE_INFINITY,
                    lowestHum = Number.POSITIVE_INFINITY,
                    lowestWindSpeed = Number.POSITIVE_INFINITY,
                    highestTemp = Number.NEGATIVE_INFINITY,
                    highestHum = Number.NEGATIVE_INFINITY,
                    highestWindSpeed = Number.NEGATIVE_INFINITY;

                _.each(dataArr, function (data) {
                    avgTempVal += data.temp;
                    avgHumVal += data.humidity;
                    avgWindSpeedVal += data.windSpeed;
                    if (data.temp < lowestTemp) {
                        lowestTemp = data.temp;
                        lowestTempObj = {
                            'temp': data.temp,
                            'date': data.date
                        };
                    }
                    if (data.temp > highestTemp) {
                        highestTemp = data.temp;
                        highesTempObj = {
                            'temp': data.temp,
                            'date': data.date
                        };
                    }
                    if (data.humidity < lowestHum) {
                        lowestHum = data.humidity;
                        lowestHumObj = {
                            'hum': data.humidity,
                            'date': data.date
                        };
                    }
                    if (data.humidity > highestHum) {
                        highestHum = data.humidity;
                        highesHumObj = {
                            'hum': data.humidity,
                            'date': data.date
                        };
                    }
                    if (data.windSpeed < lowestWindSpeed) {
                        lowestWindSpeed = data.windSpeed;
                        lowestWindSpeedObj = {
                            'windSpeed': data.windSpeed,
                            'date': data.date
                        };
                    }
                    if (data.windSpeed > highestWindSpeed) {
                        highestWindSpeed = data.windSpeed;
                        highesWindSpeedObj = {
                            'windSpeed': data.windSpeed,
                            'date': data.date
                        };
                    }
                });
                result = {
                    'time': dataArr[0].date,
                    'city' : cityName,
                    'stat': [{
                        'minTemp': lowestTempObj
                    }, {
                        'maxTemp': highesTempObj
                    }, {
                        'minHum': lowestHumObj
                    }, {
                        'maxHum': highesHumObj
                    }, {
                        'minWindSpeed': lowestWindSpeedObj
                    }, {
                        'maxWindSpeed': highesWindSpeedObj
                    }, {
                        'avgTemp': {
                            'temp': avgTempVal / dataArr.length
                        }
                    }, {
                        'avgHum': {
                            'hum': avgHumVal / dataArr.length
                        }
                    }, {
                        'avgWindSpeed': {
                            'windSpeed': avgWindSpeedVal / dataArr.length
                        }
                    }]
                };
                dataBaseService.setDataToDB(urlStatisticsDataDB, 'City_Day_Statistics', result);
            }, function (err) {
                logger.logError(err);
            });
        });
    },
        cityMonthStatistics = function (serchTime) {
            var start = new Date(serchTime.getFullYear(), serchTime.getMonth(), 1),
                end = new Date(serchTime.getFullYear(), serchTime.getMonth() + 1, 0),
                cities = [];
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            _.each(config.getCitiesURLs(), function (city) {
                cities.push(city.city);
            });

            _.each(_.uniq(cities), function (cityName) {
                dataBaseService.getStatisticsOnCities(urlWeatherDataDB, 'unifiedWeather',
                    parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), cityName).then(function (dataArr) {
                    console.info('Data services successfully collected!');
                    var lowestTempObj = {},
                        highesTempObj = {},
                        lowestHumObj = {},
                        highesHumObj = {},
                        lowestWindSpeedObj = {},
                        highesWindSpeedObj = {},
                        result = {},
                        avgTempVal = 0,
                        avgHumVal = 0,
                        avgWindSpeedVal = 0,
                        lowestTemp = Number.POSITIVE_INFINITY,
                        lowestHum = Number.POSITIVE_INFINITY,
                        lowestWindSpeed = Number.POSITIVE_INFINITY,
                        highestTemp = Number.NEGATIVE_INFINITY,
                        highestHum = Number.NEGATIVE_INFINITY,
                        highestWindSpeed = Number.NEGATIVE_INFINITY;

                    _.each(dataArr, function (data) {
                        avgTempVal += data.temp;
                        avgHumVal += data.humidity;
                        avgWindSpeedVal += data.windSpeed;
                        if (data.temp < lowestTemp) {
                            lowestTemp = data.temp;
                            lowestTempObj = {
                                'temp': data.temp,
                                'date': data.date
                            };
                        }
                        if (data.temp > highestTemp) {
                            highestTemp = data.temp;
                            highesTempObj = {
                                'temp': data.temp,
                                'date': data.date
                            };
                        }
                        if (data.humidity < lowestHum) {
                            lowestHum = data.humidity;
                            lowestHumObj = {
                                'hum': data.humidity,
                                'date': data.date
                            };
                        }
                        if (data.humidity > highestHum) {
                            highestHum = data.humidity;
                            highesHumObj = {
                                'hum': data.humidity,
                                'date': data.date
                            };
                        }
                        if (data.windSpeed < lowestWindSpeed) {
                            lowestWindSpeed = data.windSpeed;
                            lowestWindSpeedObj = {
                                'windSpeed': data.windSpeed,
                                'date': data.date
                            };
                        }
                        if (data.windSpeed > highestWindSpeed) {
                            highestWindSpeed = data.windSpeed;
                            highesWindSpeedObj = {
                                'windSpeed': data.windSpeed,
                                'date': data.date
                            };
                        }
                    });
                    result = {
                        'time': dataArr[0].date,
                        'city' : cityName,
                        'stat': [{
                            'minTemp': lowestTempObj
                        }, {
                            'maxTemp': highesTempObj
                        }, {
                            'minHum': lowestHumObj
                        }, {
                            'maxHum': highesHumObj
                        }, {
                            'minWindSpeed': lowestWindSpeedObj
                        }, {
                            'maxWindSpeed': highesWindSpeedObj
                        }, {
                            'avgTemp': {
                                'temp': avgTempVal / dataArr.length
                            }
                        }, {
                            'avgHum': {
                                'hum': avgHumVal / dataArr.length
                            }
                        }, {
                            'avgWindSpeed': {
                                'windSpeed': avgWindSpeedVal / dataArr.length
                            }
                        }]
                    };
                    dataBaseService.setDataToDB(urlStatisticsDataDB, 'City_Month_Statistics', result);
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        serviceDayStatistics = function (serchTime) {
            var start = new Date(serchTime.getTime()),
                end = new Date(serchTime.getTime());
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(urlWeatherDataDB, 'unifiedWeather',
                    parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), service).then(function (dataArr) {
                    console.info('Data services successfully collected!');

                    var lowestTempObj = {},
                        highesTempObj = {},
                        lowestHumObj = {},
                        highesHumObj = {},
                        lowestWindSpeedObj = {},
                        highesWindSpeedObj = {},
                        result = {},
                        avgTempVal = 0,
                        avgHumVal = 0,
                        avgWindSpeedVal = 0,
                        lowestTemp = Number.POSITIVE_INFINITY,
                        lowestHum = Number.POSITIVE_INFINITY,
                        lowestWindSpeed = Number.POSITIVE_INFINITY,
                        highestTemp = Number.NEGATIVE_INFINITY,
                        highestHum = Number.NEGATIVE_INFINITY,
                        highestWindSpeed = Number.NEGATIVE_INFINITY;

                    _.each(dataArr, function (data) {
                        avgTempVal += data.temp;
                        avgHumVal += data.humidity;
                        avgWindSpeedVal += data.windSpeed;
                        if (data.temp < lowestTemp) {
                            lowestTemp = data.temp;
                            lowestTempObj = {
                                'temp': data.temp,
                                'cords': data.coords
                            };
                        }
                        if (data.temp > highestTemp) {
                            highestTemp = data.temp;
                            highesTempObj = {
                                'temp': data.temp,
                                'cords': data.coords
                            };
                        }
                        if (data.humidity < lowestHum) {
                            lowestHum = data.humidity;
                            lowestHumObj = {
                                'hum': data.humidity,
                                'cords': data.coords
                            };
                        }
                        if (data.humidity > highestHum) {
                            highestHum = data.humidity;
                            highesHumObj = {
                                'hum': data.humidity,
                                'cords': data.coords
                            };
                        }
                        if (data.windSpeed < lowestWindSpeed) {
                            lowestWindSpeed = data.windSpeed;
                            lowestWindSpeedObj = {
                                'windSpeed': data.windSpeed,
                                'cords': data.coords
                            };
                        }
                        if (data.windSpeed > highestWindSpeed) {
                            highestWindSpeed = data.windSpeed;
                            highesWindSpeedObj = {
                                'windSpeed': data.windSpeed,
                                'source': service,
                                'cords': data.coords
                            };
                        }
                    });

                    result = {
                        'time': dataArr[0].date,
                        'service' : service,
                        'stat': [{
                            'minTemp': lowestTempObj
                        }, {
                            'maxTemp': highesTempObj
                        }, {
                            'minHum': lowestHumObj
                        }, {
                            'maxHum': highesHumObj
                        }, {
                            'minWindSpeed': lowestWindSpeedObj
                        }, {
                            'maxWindSpeed': highesWindSpeedObj
                        }, {
                            'avgTemp': {
                                'temp': avgTempVal / dataArr.length
                            }
                        }, {
                            'avgHum': {
                                'hum': avgHumVal / dataArr.length
                            }
                        }, {
                            'avgWindSpeed': {
                                'windSpeed': avgWindSpeedVal / dataArr.length
                            }
                        }]
                    };
                    dataBaseService.setDataToDB(urlStatisticsDataDB, 'Service_Day_Statistics', result);
                }, function (err) {
                    logger.logError(err);
                });
            });
        },

        serviceMonthStatistics = function (serchTime) {
            var start = new Date(serchTime.getFullYear(), serchTime.getMonth(), 1),
                end = new Date(serchTime.getFullYear(), serchTime.getMonth() + 1, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            _.each(config.getServicesNames(), function (service) {
                dataBaseService.getStatisticsOnServices(urlWeatherDataDB, 'unifiedWeather',
                    parseInt(start.getTime() / 1000, 10), parseInt(end.getTime() / 1000, 10), service).then(function (dataArr) {
                    console.info('Data services successfully collected!');

                    var lowestTempObj = {},
                        highesTempObj = {},
                        lowestHumObj = {},
                        highesHumObj = {},
                        lowestWindSpeedObj = {},
                        highesWindSpeedObj = {},
                        result = {},
                        avgTempVal = 0,
                        avgHumVal = 0,
                        avgWindSpeedVal = 0,
                        lowestTemp = Number.POSITIVE_INFINITY,
                        lowestHum = Number.POSITIVE_INFINITY,
                        lowestWindSpeed = Number.POSITIVE_INFINITY,
                        highestTemp = Number.NEGATIVE_INFINITY,
                        highestHum = Number.NEGATIVE_INFINITY,
                        highestWindSpeed = Number.NEGATIVE_INFINITY;

                    _.each(dataArr, function (data) {
                        avgTempVal += data.temp;
                        avgHumVal += data.humidity;
                        avgWindSpeedVal += data.windSpeed;
                        if (data.temp < lowestTemp) {
                            lowestTemp = data.temp;
                            lowestTempObj = {
                                'temp': data.temp,
                                'cords': data.coords
                            };
                        }
                        if (data.temp > highestTemp) {
                            highestTemp = data.temp;
                            highesTempObj = {
                                'temp': data.temp,
                                'cords': data.coords
                            };
                        }
                        if (data.humidity < lowestHum) {
                            lowestHum = data.humidity;
                            lowestHumObj = {
                                'hum': data.humidity,
                                'cords': data.coords
                            };
                        }
                        if (data.humidity > highestHum) {
                            highestHum = data.humidity;
                            highesHumObj = {
                                'hum': data.humidity,
                                'cords': data.coords
                            };
                        }
                        if (data.windSpeed < lowestWindSpeed) {
                            lowestWindSpeed = data.windSpeed;
                            lowestWindSpeedObj = {
                                'windSpeed': data.windSpeed,
                                'cords': data.coords
                            };
                        }
                        if (data.windSpeed > highestWindSpeed) {
                            highestWindSpeed = data.windSpeed;
                            highesWindSpeedObj = {
                                'windSpeed': data.windSpeed,
                                'source': service,
                                'cords': data.coords
                            };
                        }
                    });
                    result = {
                        'time': dataArr[0].date,
                        'service' : service,
                        'stat': [{
                            'minTemp': lowestTempObj
                        }, {
                            'maxTemp': highesTempObj
                        }, {
                            'minHum': lowestHumObj
                        }, {
                            'maxHum': highesHumObj
                        }, {
                            'minWindSpeed': lowestWindSpeedObj
                        }, {
                            'maxWindSpeed': highesWindSpeedObj
                        }, {
                            'avgTemp': {
                                'temp': avgTempVal / dataArr.length
                            }
                        }, {
                            'avgHum': {
                                'hum': avgHumVal / dataArr.length
                            }
                        }, {
                            'avgWindSpeed': {
                                'windSpeed': avgWindSpeedVal / dataArr.length
                            }
                        }]
                    };
                    dataBaseService.setDataToDB(urlStatisticsDataDB, 'Service_Month_Statistics', result);
                }, function (err) {
                    logger.logError(err);
                });
            });
        };

    return {
        serviceDayStatistics: serviceDayStatistics,
        serviceMonthStatistics: serviceMonthStatistics,
        cityDayStatistics: cityDayStatistics,
        cityMonthStatistics: cityMonthStatistics
    };
}());