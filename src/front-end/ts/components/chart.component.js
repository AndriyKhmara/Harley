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
        this.chartLegend = true;
        this.chartType = 'bar';
        this.cities = [
            { id: 1, name: "Kiev" },
            { id: 2, name: "Rivne" },
            { id: 3, name: "Lutsk" }
        ];
        this.selectedCity = this.cities[1];
        this.params = [
            { id: 1, name: "wind speed" },
            { id: 2, name: "temperature" },
            { id: 3, name: "humidity" }
        ];
        this.selectedParam = this.params[1];
        this.name = "Current Weather Chart";
        this.className = "current-chart";
        this.chartData = this.getChartData();
        this.chartLabels = this.getChartLabels();
        this.chartColors = this.getChartColors();
    }
    ChartComponent.prototype.getChartData = function () {
        return [
            { data: [2.2, 0, 0.27], label: 'darkSky' },
            { data: [-1.37, -0.92, 1], label: 'openWeather' },
            { data: [-1.68, 4.18, -2.3], label: 'wunderground' }
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
    ChartComponent.prototype.onChangeCity = function (newCity) {
        console.log("city:", newCity.name);
        this.selectedCity = newCity;
    };
    ChartComponent.prototype.onChangeParam = function (newParam) {
        console.log("param:", newParam.name);
        this.selectedCity = newParam;
    };
    ChartComponent.prototype.ngOnChanges = function () {
        console.log("city:", this.selectedCity.name);
        console.log("city:", this.selectedCity.name);
    };
    __decorate([
        core_1.Input()
    ], ChartComponent.prototype, "weather");
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            template: "\n    <div class=\"{{className}} container\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <h2>{{name}}</h2>\n                <p>Temperature:</p>\n                <ul *ngIf=\"weather[0]\">\n                    <li *ngFor=\"let data of weather\">\n                        in {{data.cityName}} by {{data.sourceAPI}} is {{data.temp}}; \n                    </li>\n                </ul>\n                <div>\n                <label>select city</label>\n                <select [(ngModel)]=\"selectedCity\" (ngModelChange)=\"onChangeCity($event)\">\n                    <option *ngFor=\"let city of cities\" [ngValue]=\"city\">{{city.name}}</option>\n                </select>\n                <!--{{selectedCity | json}}-->\n                <label>select params</label>\n                <select [(ngModel)]=\"selectedParam\" (ngModelChange)=\"onChangeParam($event)\">\n                    <option *ngFor=\"let param of params\" [ngValue]=\"param\">{{param.name}}</option>\n                </select>\n                </div>\n                <canvas baseChart width=\"400\" height=\"400\"\n                [datasets]=\"chartData\"\n                [labels]=\"chartLabels\"\n                [options]=\"chartOptions\"\n                [colors]=\"chartColors\"\n                [legend]=\"chartLegend\"\n                [chartType]=\"chartType\"></canvas>\n            </div>\n        </div>\n    </div>"
        })
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map