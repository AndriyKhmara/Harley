import {Component, Input} from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'chart',
    template: `
    <div class="{{className}} container">
        <div class="row">
            <div *ngIf="!weather[0]" class="col-xs-12 text-center paddings">Loading... Please wait.</div>
            <div *ngIf="weather[0]" class="col-xs-12">
                <h2>{{name}}</h2>
                <div class="text-center">
                    <label>select city</label>
                    <select [(ngModel)]="selectedCity" (change)="updateChart()">
                        <option *ngFor="let city of cities" [ngValue]="city.value">
                            {{city.name}}
                        </option>
                    </select>
                    <label>select params</label>
                    <select [(ngModel)]="selectedParam" (change)="updateChart()">
                        <option *ngFor="let param of params" [ngValue]="param.value">
                            {{param.name}}
                        </option>
                    </select>
                </div>
                <canvas baseChart
                [chartType]="type"
                [datasets]="chartData"
                [options]="chartOptions"
                [labels]="chartLabels"
                [colors]="chartColors"
                [legend]="chartLegend"></canvas>
            </div>
        </div>
    </div>`,
    styles: [
        'canvas{ max-width: 800px; margin: 15px auto; height:auto; max-height: 380px;}',
        '.paddings{padding: 15px; font-size:25px;}'
    ]
})

export class ChartComponent {
    public name: string;
    public className: string;
    public chartData: Array<any>;
    public chartOptions: any;
    public chartColors: Array<any>;
    public chartLegend: boolean;
    public params: Array<any>;
    public selectedParam: string;
    public cities: Array<any>;
    public chartLabels = [''];
    public selectedCity: string;
    @Input() weather: any;
    @Input() type: string;

    constructor() {
        this.name = "Current Weather Chart";
        this.className = "current-chart";
        this.chartData = [
            {data: [0], label: 'Service A'},
            {data: [0], label: 'Service B'},
            {data: [0], label: 'Service C'}
        ];
        this.chartOptions = this.getChartOptions();
        this.chartColors = this.getChartColors();
        this.chartLegend = true;
        this.cities = [
            {id: 1, name: "Rivne", value:"Rivne"},
            {id: 2, name: "Kiev", value:"Kiev"},
            {id: 3, name: "Luts'k", value:"Luts'k"}
        ];
        this.params = [
            {id: 1, name: "Temperature", value: "temp"},
            {id: 2, name: "Humidity", value: "humidity"},
            {id: 3, name: "Pressure", value: "pressure"},
            {id: 4, name: "Wind speed", value: "windSpeed"}
        ];
        this.selectedParam = _.first(this.params).value;
        this.selectedCity = _.first(this.cities).value;
    };

    ngOnChanges() {
        let data = this.weather;
        if (data.destination) {
            return false;
        }
        this.updateChart();
    };

    public updateChart(){
        this.chartData = this.getChartData();
        this.chartOptions = this.getChartOptions();
    };

    private getChartData() {
        let weather = this.weather,
            result = [],
            city = this.selectedCity,
            param = this.selectedParam;

        _.each(weather, function(item){
            if (item.cityName === city){
                let data = parseFloat(item[param]);
                result.push({
                    data: [data],
                    label: item.sourceAPI
                })
            }
        });
        return result;
    };

    private getChartOptions() {
        return {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: this.getChartTicks()
                }]
            }
        };
    };

    private getChartTicks(){
        let result = {
            suggestedMin: 0,
            suggestedMax: 0,
            beginAtZero: true
        };
        switch (this.selectedParam){
            case "temp":
                result.suggestedMax = 30;
                return result;
            case "humidity":
                result.suggestedMin = 50;
                result.suggestedMax = 100;
                result.beginAtZero = false;
                return result;
            case "pressure":
                result.suggestedMin = 700;
                result.suggestedMax = 1200;
                result.beginAtZero = false;
                return result;
            case "windSpeed":
                result.suggestedMin = 10;
                result.suggestedMax = 30;
                result.beginAtZero = false;
                return result;
        }
        return result;
    };

    private getChartColors() {
        return [
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
    };

}
