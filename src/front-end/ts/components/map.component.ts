import { Component, Input, OnChanges } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
    selector: 'map',
    template: `<div><div id="map"></div></div>`,
    styles:['#map{width:65%; height:35vh; margin:0 auto; z-index:-11111;}']
})

export class MapComponent implements OnChanges {
    @Input()
    public weather: any;

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
        console.log("Weather in ngOnInit:", this.weather)
    }

    /**
     * Для Ліди.
     * Ця функція запускається тоді коли в компоненті відбуваються зміни.
     * Рекомендую параметри для штшціалізацію попапів перенести сюди.
     * Примітка взагалі дані функцію я б не використовував, а писав у власних методах, бо
     * функція @Input() сама потівм усе пермалює.
     *
     * P/S:
     * я поки на 100% не впевнений що воно так працює тому пиши я по мірі прочитання документаці буду це оновлювати
     */
    ngOnChanges(){
        console.log("Weather in ngOnChanges:", this.weather)
    }
}