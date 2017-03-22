"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ChartComponent = (function () {
    function ChartComponent() {
        this.cars = [
            { id: 1, name: 'a' },
            { id: 2, name: 'b' },
            { id: 3, name: 'c' }
        ];
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
    }
    ChartComponent.prototype.getChartData = function () {
        return [
            { data: [2.2, 0, 0.27], label: 'darkSky' },
            { data: [-1.37, -0.92, 1], label: 'openWeather' },
            { data: [-1.68, 3.18, -2.3], label: 'wunderground' }
        ];
    };
    ;
    ChartComponent.prototype.getChartLabels = function () {
        return ['Kiev', 'Rivne', 'Lutsk'];
    };
    ChartComponent.prototype.getChartOptions = function () {
        return {
            responsive: true
        };
    };
    ChartComponent.prototype.getChartColors = function () {
        return [
            {
                backgroundColor: '#ffbac7',
                borderColor: '#ff1744',
                pointBackgroundColor: '#ff1744',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff1744'
            },
            {
                backgroundColor: '#e1f0d1',
                borderColor: '#9ccc65',
                pointBackgroundColor: '#9ccc65',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#9ccc65'
            },
            {
                backgroundColor: '#bde0fb',
                borderColor: '#2196f3',
                pointBackgroundColor: '#2196f3',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2196f3'
            }
        ];
    };
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
    ChartComponent.prototype.ngOnChanges = function () {
        console.log("city:", this.cars);
    };
    ;
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "weather");
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            template: "\n    <div class=\"{{className}} container\" style=\"width: 70%; height:auto; max-width: 600px border: 2px solid black\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <h2>{{name}}</h2>\n                <p>Temperature:</p>\n                <ul *ngIf=\"weather[0]\">\n                    <li *ngFor=\"let data of weather\">\n                        in {{data.cityName}} by {{data.sourceAPI}} is {{data.temp}}; \n                    </li>\n                </ul>\n                <!--<div>-->\n                    <!--<label>select city</label>-->\n                    <!--<select [( ngModel)]=\"selectedCity\">-->\n                        <!--<option *ngFor=\"let city of cities\" [ngValue]=\"city\">{{city.name}}</option>-->\n                    <!--</select>-->\n                    <!--<label>select params</label>-->\n                    <!--<select [(ngModel)]=\"selectedParam\">-->\n                        <!--<option *ngFor=\"let param of params\" [ngValue]=\"param\">{{param.name}}</option>-->\n                    <!--</select>-->\n                <!--</div>-->\n                <select name =\"id\" class = \"form-control\">\n                   <option *ngFor = \"let car of cars\" [ngValue] = \"car.key\">{{ car.name }}</option>\n                </select>\n                <canvas baseChart width=\"400\" height=\"400\"\n                [datasets]=\"chartData\"\n                [labels]=\"chartLabels\"\n                [options]=\"chartOptions\"\n                [colors]=\"chartColors\"\n                [legend]=\"chartLegend\"\n                [chartType]=\"chartType\"></canvas>\n            </div>\n        </div>\n    </div>"
        })
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map