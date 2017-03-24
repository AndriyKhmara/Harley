    import {Component, Input} from '@angular/core';
    @Component({
        selector: 'chart',
        template: `
    <div class="{{className}} container">
        <div class="row">
            <div class="col-xs-12" style="width:60%; min-width: 320px; margin: 0 20%;border: 1px solid black">
                <h2>{{name}}</h2>
                <p>Temperature:</p>
                <ul *ngIf="weather[0]">
                    <li *ngFor="let data of weather">
                        in {{data.cityName}} by {{data.sourceAPI}} is {{data.temp}}; 
                    </li>
                </ul>
                <div>
                <label>select city</label>
                <select [(ngModel)]="selectedCity" (ngModelChange)="updateChart($event)">
                    <option *ngFor="let city of cities" [ngValue]="city">{{city.name}}</option>
                </select>
                <label>select params</label>
                <select [(ngModel)]="selectedParam" (ngModelChange)="updateChart($event)">
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
        public name:string;
        public className:string;
        public chartData:any;
        public chartLabels:any;
        public chartOptions:any;
        public chartColors:Array<any>;
        public chartLegend:boolean = true;
        public chartType:string = 'bar';
        public selectedParam:any;
        public selectedCity:any;
        @Input()
        public weather:any;

        public getChartData() {
            return [
                {data: [2.2, 0, 0.27], label: 'darkSky'},
                {data: [-1.37, -0.92, 1], label: 'openWeather'},
                {data: [-1.68, 4.18, -2.3], label: 'wunderground'}
            ];
        };
        public getChartLabels(){
            let label = "LABEL";
            return [label]
        }

        public getChartOptions() {
            return {
                responsive: true
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

        updateChart(newCity) {
            console.log("city:", this.selectedCity);
            console.log("param:", this.selectedParam);
        }

        constructor() {
            this.name = "Current Weather Chart";
            this.className = "current-chart";
            this.chartData = this.getChartData();
            this.chartLabels = this.getChartLabels();
            this.chartColors = this.getChartColors();
        }
    }
