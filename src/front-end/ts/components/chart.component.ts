import {Component, Input} from '@angular/core';

@Component({
    selector: 'chart',
    template: `
    <div class="{{className}} container" style="width: 70%; height:auto; max-width: 600px border: 2px solid black">
        <div class="row">
            <div class="col-xs-12">
                <h2>{{name}}</h2>
                <p>Temperature:</p>
                <ul *ngIf="weather[0]">
                    <li *ngFor="let data of weather">
                        in {{data.cityName}} by {{data.sourceAPI}} is {{data.temp}}; 
                    </li>
                </ul>
                <!--<div>-->
                    <!--<label>select city</label>-->
                    <!--<select [( ngModel)]="selectedCity">-->
                        <!--<option *ngFor="let city of cities" [ngValue]="city">{{city.name}}</option>-->
                    <!--</select>-->
                    <!--<label>select params</label>-->
                    <!--<select [(ngModel)]="selectedParam">-->
                        <!--<option *ngFor="let param of params" [ngValue]="param">{{param.name}}</option>-->
                    <!--</select>-->
                <!--</div>-->
                <select name ="id" class = "form-control">
                   <option *ngFor = "let car of cars" [ngValue] = "car.key">{{ car.name }}</option>
                </select>
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
    public chartLabels: any;
    public chartOptions: any;
    public chartColors: any;
    public cities: any;
    public params: any;
    public selectedCity:any;
    public selectedParam:any;
    public chartLegend:boolean;
    public chartType:string;
    @Input()
    public weather: any;
    public getChartData() {
        return [
            {data: [2.2, 0, 0.27 ], label: 'darkSky'},
            {data: [-1.37, -0.92, 1], label: 'openWeather'},
            {data: [-1.68, 3.18, -2.3], label: 'wunderground'}
        ];
    };
    public cars = [
        {id: 1, name: 'a'},
        {id: 2, name: 'b'},
        {id: 3, name: 'c'}
    ];

    public getChartLabels() {
        return ['Kiev', 'Rivne', 'Lutsk'];
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

    // public getCities() {
    //     return  [
    //         {id: 1, name: "Kiev"},
    //         {id: 2, name: "Rivne"},
    //         {id: 3, name: "Lutsk"}
    //     ];
    //
    // }
    // public getParams(){
    //     return [
    //         {id: 1, name: "wind speed"},
    //         {id: 2, name: "temperature"},
    //         {id: 3, name: "humidity"}
    //     ];
    // }
    // ngOnInit () {
    //     this.myForm = this.fb.group({
    //         id: ['', Validators.required]
    //     });
    // }
    ngOnChanges(){
        console.log ("city:", this.cars)
    }

    constructor(){
        this.name = "Current Weather Chart";
        this.className = "current-chart";
        this.chartData = this.getChartData();
        this.chartColors = this.getChartColors();
        // this.cities = this.getCities();
        // this.params = this.getParams();
        this.chartLabels = this.getChartLabels();
        this.chartOptions = this.getChartOptions();
        this.chartLegend = true;
        this.chartType = "bar";
        };
    }

