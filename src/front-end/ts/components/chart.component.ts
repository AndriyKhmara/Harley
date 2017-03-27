import {Component, Input} from '@angular/core';
@Component({
    selector: 'chart',
    template: `
    <div class="{{className}} container">
        <div class="row">
            <div class="col-xs-12">
                <h2>{{name}}</h2>
                <div>
                <label>select city</label>
                <select [(ngModel)]="selectedCity" (ngModelChange)="updateChart($event)">
                    <option *ngFor="let city of cities" [ngValue]="city" selected>{{city.name}}</option>
                </select>
                <label>select params</label>
                <select [(ngModel)]="selectedParam" (ngModelChange)="updateChart($event)">
                    <option *ngFor="let param of params" [ngValue]="param" selected>{{param.name}}</option>
                </select>
                </div>
                <canvas baseChart width="400" height="400"
                [chartType]="chartType"
                [datasets]="chartData"
                [labels]="chartLabels"
                [options]="chartOptions"
                [colors]="chartColors"
                [legend]="chartLegend"></canvas>
            </div>
        </div>
    </div>`,
    styles: ['canvas{ max-width: 50%; margin: 0 auto;}']
})

export class ChartComponent {
    public name: string;
    public className: string;
    public chartData: any;
    public chartLabels: any;
    public chartOptions: any;
    public chartColors: Array<any>;
    public chartLegend: boolean;
    public chartType: string;
    public params: Array<any>;
    public selectedParam: any;
    public cities: Array<any>;
    public selectedCity: any;
    @Input()
    public weather: any;

    constructor() {
        this.name = "Current Weather Chart";
        this.className = "current-chart";
        this.chartType = "bar";
        this.chartData = this.getChartData();
        this.chartLabels = this.getChartLabels();
        this.chartOptions = this.getChartOptions();
        this.chartColors = this.getChartColors();
        this.chartLegend = true;
        this.cities = [
            {id: 1, name: "Kiev"},
            {id: 2, name: "Rivne"},
            {id: 3, name: "Lutsk"}
        ];
        this.params = [
            {id: 1, name: "wind speed", value: "windSpeed"},
            {id: 2, name: "temperature", value: "temp"},
            {id: 3, name: "humidity", value: "humidity"}
        ];
        this.selectedParam = this.cities[0];
        this.selectedCity = this.params[0];

    }

    public getChartData() {
        let result = [
            {data: [12], label: 'Service A'},
            {data: [10], label: 'Service B'},
            {data: [15], label: 'Service C'}
        ];
        return result;
    };

    public getChartLabels() {
        return ['Weather in City']
    }

    public getChartOptions() {
        return {
            responsive: true,
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };
    }

    public getChartColors() {
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
    }

    public updateChart(newCity) {
        console.log("city:", this.selectedCity);
        console.log("param:", this.selectedParam);
        this.getChartData();
    }


}
