import { Component } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
    selector: 'map',
    template: `<div><div id="map"></div></div>`,
    styles:['#map{width:65%; height:35vh; margin:0 auto;}']
})

export class MapComponent {
    constructor(private mapService: MapService) {

    }

    ngOnInit() {
        let map = L.map("map", {
            zoomControl: false,
            center: L.latLng(40.731253, -73.996139),
            zoom: 12,
            minZoom: 4,
            maxZoom: 19,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
    }
}