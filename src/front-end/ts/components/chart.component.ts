import {Component, Input} from '@angular/core';

@Component({
    selector: 'chart',
    template: `
    <div class="{{className}} container">
        <div class="row">
            <div class="col-xs-12">
                <h2>{{name}}</h2>
                <p>Temperature:</p>
                <ul *ngIf="weather[0]">
                    <li *ngFor="let data of weather">
                        in {{data.cityName}} by {{data.sourceAPI}} is {{data.temp}};  
                    </li>
                </ul>
            </div>
        </div>
    </div>`
})
export class ChartComponent {
    public name: string;
    public className: string;
    @Input()
    public weather: any;

    constructor() {
        this.name = "Current Weather Chart";
        this.className = "current-chart";
    }

}