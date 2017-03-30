import {Component, Input} from '@angular/core';
@Component({
    selector: 'chart',
    template: `
    <div class="{{className}} container">
        <div class="row">
            <div *ngIf="!weather[0]" class="col-xs-12 text-center paddings"><img src="img/infinity.gif"/></div>
            <div *ngIf="weather[0]" class="col-xs-12">
                <div class="row">
                    <div class="title-block">
                    <h2>{{name}}</h2>
                    </div>
                    <div class="chart-menu col-md-3">
                        <label>Select City</label>
                        <select [(ngModel)]="selectedCity" (change)="getChartData()" class="form-control">
                            <option *ngFor="let city of cities" [ngValue]="city.value">
                                {{city.name}}
                            </option>
                        </select>
                        <label>Select Params</label>
                        <select [(ngModel)]="selectedParam" (change)="getChartData()" class="form-control">
                            <option *ngFor="let param of params" [ngValue]="param.value">
                                {{param.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-9">
                        <canvas baseChart
                        [chartType]="chartType"
                        [datasets]="chartData"
                        [labels]="chartLabels"
                        [options]="chartOptions"
                        [colors]="chartColors"
                        [legend]="chartLegend"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    styles: [
        'canvas{ max-width: 800px; margin: 15px auto; height:auto; max-height: 380px;}',
        ' .paddings{padding: 15px; font-size:25px;}'
    ]
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
    public selectedParam: string;
    public cities: Array<any>;
    public selectedCity: string;
    @Input()
    public weather: any;

    constructor() {
        this.name = "Current Weather Compare Service";
        this.className = "current-chart";
        this.chartType = "bar";
        this.chartData = [
            {data: [0], label: 'Service A'},
            {data: [0], label: 'Service B'},
            {data: [0], label: 'Service C'}
        ];
        this.chartLabels = this.getChartLabels();
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
            {id: 3, name: "Wind speed", value: "windSpeed"}
        ];
        this.selectedParam = this.params[0].value;
        this.selectedCity = this.cities[0].value;

    }

    public getChartData() {
        let weather = new Array(this.weather);
        let result = [];

        for(let i = 0; i < weather[0].length; i++){
            if (weather[0][i].cityName === this.selectedCity){
                result.push({
                    data: [weather[0][i][this.selectedParam]],
                    label: weather[0][i].sourceAPI
                })
            }
        }
        this.chartData = result;
    };

    public getChartLabels() {
        return ['Weather in City']
    }

    public getChartOptions() {
        return {
            responsive: true,
            scales: {
                yAxes: [{
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
                backgroundColor: '#ff2d55',
                borderColor: '#ff2d55',
                pointBackgroundColor: '#ff2d55',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff2d55'
            },
            { // blue
                backgroundColor: '#688a7e',
                borderColor: '#688a7e',
                pointBackgroundColor: '#688a7e',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#688a7e'
            },
            { // green
                backgroundColor: '#47A025',
                borderColor: '#47A025',
                pointBackgroundColor: '#47A025',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#47A025'
            }
        ];
    }

    ngOnChanges() {
        console.log(this.selectedParam);
        console.log(this.selectedCity);
        let data = this.weather;
        if (data.destination) {
            return false;
        }
        this.getChartData();
    }

}
