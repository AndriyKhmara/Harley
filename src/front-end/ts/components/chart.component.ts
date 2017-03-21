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
                <div>
                <label>select city</label>
                <select [(ngModel)]="selectedCity">
                    <option *ngFor="let city of cities" [ngValue]="city">{{city.name}}</option>
                </select>
                <label>select params</label>
                <select [(ngModel)]="selectedParam">
                    <option *ngFor="let param of params" [ngValue]="param">{{param.name}}</option>
                </select>
                </div>
                <canvas baseChart width="400" height="400"
                [datasets]="chartData"
                [labels]="chartLabels"
                [options]="chartOptions"
                [colors]="chartColors"
                [legend]="chartLegend"
                [chartType]="chartType"></canvas>
            </div>
        </div>
    </div>`
})

export class ChartComponent {
    public name: string;
    public className: string;
    public chartData: any;
    @Input()
    public weather: any;
    public getChartData: any = function () {
        return [
            {data: [2.2, 0, 0.27 ], label: 'darkSky'},
            {data: [-1.37, -0.92, 1], label: 'openWeather'},
            {data: [-1.68,-5.18, -2.3], label: 'wunderground'}
        ];
    }
    public chartLabels:Array<any> = ['Kiev', 'Rivne', 'Lutsk'];
    public chartOptions:any = {
        responsive: true
    };
    public chartColors:Array<any> = [
        { // pink
            backgroundColor: '#ffbac7',
            borderColor: '#ff1744',
            pointBackgroundColor: '#ff1744',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff1744'
        },
        { // green
            backgroundColor: '#e1f0d1',
            borderColor: '#9ccc65',
            pointBackgroundColor: '#9ccc65',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#9ccc65'
        },
        { // blue
            backgroundColor: '#bde0fb',
            borderColor: '#2196f3',
            pointBackgroundColor: '#2196f3',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2196f3'
        }
    ];
    public chartLegend:boolean = true;
    public chartType:string = 'bar';
    public selectedCity:any;
    public selectedParam:any;

    public cities = [
        {id: 1, name: "Kiev"},
        {id: 2, name: "Rivne"},
        {id: 3, name: "Lutsk"}
    ];

    public params = [
        {id: 1, name: "wind speed"},
        {id: 2, name: "temperature"},
        {id: 3, name: "humidity"}
    ];
    ngOnChanges() {
        console.log ("city:", this.selectedCity)
    }

    constructor() {
        this.name = "Current Weather Chart";
        this.className = "current-chart";
        this.chartData = this.getChartData;
    }

}