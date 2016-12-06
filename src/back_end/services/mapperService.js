'use strict';
var config = require('./../services/ConfigService.js'),
    MongoClient = require('mongodb').MongoClient,
    pathToDBs  = require('./../config/pathConfig.json'),
    logger = require('./../services/logger.js');

module.exports = (function () {


    var prepareDataFromOpenWeather = function (serviceName, city, data) {
        console.log("-------------" + serviceName + "--------------");
        var tempInCelsius = parseFloat((data.main.temp - 273.15).toFixed(2)),
            windSpeedInKmH = parseFloat(((data.wind.speed * 3600) / 1000).toFixed(2)),
            fallOut = "";

        switch (data.weather[0].main) {
        case "Clouds":
        case "Clear":
            fallOut = "none";
            break;

        case "Thunderstorm":
        case "Rain":
            fallOut = "rain";
            break;

        case "Snow":
            fallOut = "snow";
            break;
        }

        var result = {
            "cityName": city,
            "temp": tempInCelsius,
            "pressure": data.main.pressure,
            "humidity": data.main.humidity,
            "windSpeed": windSpeedInKmH,
            "windDir": data.wind.deg,
            "clouds": data.clouds.all,
            "fallOut": fallOut,
            "sourceAPI": "openWeather",
            "coords": {
                "lon": data.coord.lon,
                "lat": data.coord.lat
            },
            "date": data.dt
        };
        return result;
    },

        prepareDataFromWunderground = function (serviceName, city, data) {
            console.log("-------------" + serviceName + "--------------");
            var fallOut = "",
                humidity = (data.current_observation.relative_humidity).replace(/%/g, '');
            humidity = parseInt(humidity, 10);

            var getIcon = function () {
                var VRegExp = new RegExp(/Cloud|cloud|sun|Sun|clear|Clear|hazy|Hazy/),
                    result = VRegExp.test(data.current_observation.icon);
                return result;
            };

            if (getIcon(data.current_observation.icon) === true) {
                fallOut = "none";
            }


        // не уверенна в правильности, так как нет нормальной документации с описанием всех возможных значений icon
            switch (data.current_observation.icon) {
            case "thunderstorm":
            case "rain":
                fallOut = "rain";
                break;

            case "snow":
            case "sleet":
                fallOut = "snow";
                break;
            }


            var result = {
                "cityName": city,
                "temp": parseFloat(data.current_observation.temp_c),
                "pressure": parseFloat(data.current_observation.pressure_mb),
                "humidity": humidity,
                "windSpeed": parseFloat(data.current_observation.wind_gust_kph),
                "windDir": data.current_observation.wind_degrees,
                "clouds": null, // не знаю какое значение указывать здесь, данных из сервиса нет
                "fallOut": fallOut,
                "sourceAPI": "wunderground",
                "coords": {
                    "lon": parseFloat(data.current_observation.display_location.longitude),
                    "lat": parseFloat(data.current_observation.display_location.latitude)
                },
                "date": parseFloat(data.current_observation.local_epoch)
            };

            return result;

        },

        prepareDataFromDarkSky = function (serviceName, city, data) {
            console.log("-------------" + serviceName + "--------------");
            var fallOut = "";

            switch (data.currently.icon) {
            case "clear-day":
            case "clear-night":
            case "fog":
            case "wind":
            case "cloudy":
            case "partly-cloudy-day":
            case "partly-cloudy-night":
                fallOut = "none";
                break;

            case "thunderstorm":
            case "rain":
                fallOut = "rain";
                break;

            case "sleet":
            case "snow":
                fallOut = "snow";
                break;
            }

            var tempInCelsius = parseFloat(((data.currently.temperature - 32) * (5 / 9)).toFixed(2)),
                windSpeedInKmH = parseFloat(((data.currently.windSpeed) * 1.609344).toFixed(2)),
                humidity = data.currently.humidity * 100,
                cloudsInPercent = data.currently.cloudCover * 100,

                result = {
                    "cityName": city,
                    "temp": tempInCelsius,
                    "pressure": data.currently.pressure,
                    "humidity": humidity,
                    "windSpeed": windSpeedInKmH,
                    "windDir": data.currently.windBearing,
                    "clouds": cloudsInPercent,
                    "fallOut": fallOut,
                    "sourceAPI": "darkSky",
                    "coords": {
                        "lon": data.longitude,
                        "lat": data.latitude
                    },
                    "date": data.currently.time
                };

            if (result.length === 0) {
                logger.logError('No data from service');
            }
            return result;
        },


        prepareDataFromService = function (serviceName, city, data) {
            var result = {};

            switch (serviceName) {
            case "openWeather":
                result = prepareDataFromOpenWeather("openWeather", city, data);
                break;

            case "darkSky":
                result = prepareDataFromDarkSky("darkSky", city, data);
                break;

            case "wunderground":
                result = prepareDataFromWunderground("wunderground", city, data);
                break;
            }
            return result;

        };

    return {
        prepareDataFromService: prepareDataFromService
    };

}());
