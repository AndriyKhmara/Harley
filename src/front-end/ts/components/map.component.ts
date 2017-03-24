import { Component, Input, OnChanges } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
    selector: 'map',
    template: `<div><div id="map"></div></div>`,
    styles:['#map{width:65%; height:400px; margin:0 auto;}']
})

export class MapComponent implements OnChanges {
    @Input()
    public weather: any;
    public mockWeather: any;

    constructor(private mapService: MapService) {
        this.mockWeather = [
                  {
                    "_id": "582e21177bab4b3794eacde1",
                    "cityName": "Rivne",
                    "temp": -0.93,
                    "pressure": 1018.72,
                    "humidity": 97,
                    "windSpeed": 14.11,
                    "windDir": 193,
                    "clouds": 98,
                    "fallOut": "none",
                    "sourceAPI": "darkSky",
                    "coords": {
                      "lon": 26.24,
                      "lat": 50.63
                    },
                    "date": 1479418135
                  },
                  {
                    "_id": "582e21177bab4b3794eacddf",
                    "cityName": "Luts'k",
                    "temp": 2.36,
                    "pressure": 1006.9,
                    "humidity": 98,
                    "windSpeed": 22.21,
                    "windDir": 208.008,
                    "clouds": 92,
                    "fallOut": "rain",
                    "sourceAPI": "openWeather",
                    "coords": {
                      "lon": 25.34,
                      "lat": 50.76
                    },
                    "date": 1479417694
                  },
                  {
                    "_id": "582e21177bab4b3794eacddd",
                    "cityName": "Kiev",
                    "temp": -0.34,
                    "pressure": 1022,
                    "humidity": 100,
                    "windSpeed": 10.8,
                    "windDir": 180,
                    "clouds": 90,
                    "fallOut": "none",
                    "sourceAPI": "openWeather",
                    "coords": {
                      "lon": 30.52,
                      "lat": 50.43
                    },
                    "date": 1479416400
                  },
                  {
                    "_id": "582e21177bab4b3794eacddb",
                    "cityName": "Luts'k",
                    "temp": -0.21,
                    "pressure": 1017.76,
                    "humidity": 97,
                    "windSpeed": 14.97,
                    "windDir": 201,
                    "clouds": 98,
                    "fallOut": "none",
                    "sourceAPI": "darkSky",
                    "coords": {
                      "lon": 25.26,
                      "lat": 50.74
                    },
                    "date": 1479418135
                  },
                  {
                    "_id": "582e21177bab4b3794eacdd9",
                    "cityName": "Kiev",
                    "temp": -1.66,
                    "pressure": 1023.44,
                    "humidity": 90,
                    "windSpeed": 7.71,
                    "windDir": 189,
                    "clouds": 71,
                    "fallOut": "none",
                    "sourceAPI": "darkSky",
                    "coords": {
                      "lon": 30.5,
                      "lat": 50.43
                    },
                    "date": 1479418135
                  },
                  {
                    "_id": "582e21177bab4b3794eacdd7",
                    "cityName": "Rivne",
                    "temp": 0.34,
                    "pressure": 1004.3,
                    "humidity": 95,
                    "windSpeed": 19.87,
                    "windDir": 196.508,
                    "clouds": 76,
                    "fallOut": "none",
                    "sourceAPI": "openWeather",
                    "coords": {
                      "lon": 26.23,
                      "lat": 50.62
                    },
                    "date": 1479417601
                  },
                  {
                    "_id": "582e21177bab4b3794eacdd5",
                    "cityName": "Rivne",
                    "temp": 14,
                    "pressure": 1017,
                    "humidity": 89,
                    "windSpeed": 10,
                    "windDir": 23,
                    "clouds": 0,
                    "fallOut": "none",
                    "sourceAPI": "wunderground",
                    "coords": {
                      "lon": 25.5,
                      "lat": 50.70000076
                    },
                    "date": 1479418134
                  },
                  {
                    "_id": "582e21177bab4b3794eacdd3",
                    "cityName": "Luts'k",
                    "temp": 4,
                    "pressure": 1014,
                    "humidity": 81,
                    "windSpeed": 12,
                    "windDir": 200,
                    "clouds": 0,
                    "fallOut": "none",
                    "sourceAPI": "wunderground",
                    "coords": {
                      "lon": 23.81999969,
                      "lat": 51.24000168
                    },
                    "date": 1479418134
                  },
                  {
                    "_id": "582e21177bab4b3794eacdd1",
                    "temp": -0.2,
                    "cityName": "Kiev",
                    "pressure": 1022,
                    "humidity": 94,
                    "windSpeed": 4.8,
                    "windDir": 222,
                    "clouds": 0,
                    "fallOut": "none",
                    "sourceAPI": "wunderground",
                    "coords": {
                      "lon": 30.56999969,
                      "lat": 50.40000153
                    },
                    "date": 1479418134
                  }
            ];
    }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(50.63, 26.23),
            zoom: 7,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        var markers = this.mockWeather;
        markers.forEach(function (item, i, arr) {
            if (item.sourceAPI === "darkSky") {
                let message = '<h4>'+ item.cityName + '</h4><ul><li>Temperature: <b>' + item.temp + '&deg;C</b></li><li>Pressure: <b>' + item.pressure +
                           + ' mm Hg</b></li><li>Humidity: <b>' + item.humidity + ' %</b></li><li>Wind speed: <b>' + item.windSpeed + ' meter/sec</b></li></ul>'
                L.marker([item.coords.lat, item.coords.lon]).addTo(map)
              .bindPopup(message)
              .openPopup();
            }
        });

        this.mapService.map = map;
        console.log("MockWeather", this.mockWeather)
    }

    ngOnChanges() {
        console.log(this.weather);
    }
}