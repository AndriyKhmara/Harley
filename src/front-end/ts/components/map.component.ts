import {Component, Input, OnChanges} from '@angular/core';
import {MapService} from '../services/map.service';

@Component({
    selector: 'map',
    template: `
    <div class="container">
        <div class="title-block">
           <h2>Map: current weather data by city</h2>
        </div>
    </div>
    <div class="container"><div id="map"></div></div>`,
    styles: ['#map{width:100%; height:400px; margin:0 auto; z-index:200;}']

})

export class MapComponent implements OnChanges {
    @Input()
    public weather: any;
    public mockWeather: any;
    //public map: any;

    constructor(private mapService: MapService) {
    }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(50.63, 26.23),
            zoom: 7,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({position: "topright"}).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
    }

    ngOnChanges() {
        let map = this.mapService.map;
        let markers = this.weather;
        if (markers.destination) {
            return false;
        }
        markers.forEach(function (item, i, arr) {
            if (item.sourceAPI === "darkSky") {
                let message = '<h4>' + item.cityName + '</h4><ul><li>Temperature: <b>' + item.temp + '&deg;C</b></li><li>Pressure: <b>' + item.pressure +
                    ' mm Hg</b></li><li>Humidity: <b>' + item.humidity + ' %</b></li><li>Wind speed: <b>' + item.windSpeed + ' meter/sec</b></li></ul>'
                L.marker([item.coords.lat, item.coords.lon]).addTo(map)
                    .bindPopup(message);
            }
        });
    }
}