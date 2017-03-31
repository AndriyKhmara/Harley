import {Component} from '@angular/core';
import {CurrentWeatherService} from '../services/currentWeather.service';
import {StatisticWeatherService} from '../services/statisticsWeather.service';

import * as _ from "lodash";

@Component({
    selector: 'container',
    template: `
        <div>
            <div class="paddings">
                <button *ngIf="statisticChart" class="btn btn-success" (click)="goHome()">Home</button>
            </div>
            <side-nav></side-nav>
            <map [ngClass]="{'hidden': statisticChart}" [weather]="weatherData"></map>
            <chart [ngClass]="{'hidden': statisticChart}" [type]="chartType" [weather]="weatherData"></chart>
            <canvas *ngIf="statisticChart" baseChart
                [chartType]="statChartType"
                [datasets]="chartData"
                [labels]="chartLabels"
                [options]="chartOptions"
                [colors]="chartColors"
                [legend]="chartLegend"></canvas>
        </div>
    `,
    styles: ['canvas{ max-width: 800px; margin: 15px auto; height:auto; max-height: 380px;}']
})
export class ContainerComponent {
    public weatherData: any;
    public chartType: string;
    public statisticChart = false;
    public statChartType: string;
    public chartData: Array<any>;
    public chartLabels: Array<string>;
    public chartOptions: any;
    public chartColors: Array<any>;
    public chartLegend: boolean;

    constructor(private currentWeatherService: CurrentWeatherService,
                private statisticWeatherService: StatisticWeatherService) {
        this.chartType = "bar";
        this.statisticChart = false;
        this.statChartType = "line";
        this.chartLabels = [''];
        this.chartData = [
            {data: [0], label: 'Service A'},
            {data: [0], label: 'Service B'},
            {data: [0], label: 'Service C'}
        ];
        this.chartOptions = this.getChartOptions();
        this.chartColors = this.getChartColors();
        this.chartLegend = true;
        this.weatherData = [{cityName: "No city", sourceAPI: "no API"}];
        this.weatherData = currentWeatherService.getWeatherData()
            .subscribe(
                data => this.weatherData = data,
                error => console.log(error)
            );

        statisticWeatherService.config$.subscribe(
            config => {
                this.renderStatisticsChart(statisticWeatherService, config);
            });
    }

    private renderStatisticsChart(service: StatisticWeatherService, config: any) {
        service.getWeatherData(config)
            .subscribe(
                data => {
                    this.statisticChart = true;
                    this.chartData = this.setChartData(data, config);
                    console.log("Chart", this.chartData)
                },
                error => console.log(error)
            );

    }

    private setChartData(data: any, config: any) {
        let result = {
            darkSky: [{data: [], label: 'Dark Sky'}],
            wunderground: [{data: [], label: 'Wunder Ground'}],
            openWeather: [{data: [], label: 'Open Weather'}]
        };
        let labels = [];
        _.each(data, function (item, i) {
            result[item.sourceAPI][0].data.push(item.stat[config.param].avg);
            let date = new Date(item.date * 1000);
            let formatedDate = [
                date.getDate() < 0 ? '0' + date.getDate() : date.getDate(), '/',
                date.getMonth() + 1, '/',
                date.getFullYear()
            ].join('');
            if (!_.includes(labels, formatedDate)) {
                labels.push(formatedDate);
            }
        });
        this.chartLabels = labels;
        return [result.darkSky[0], result.wunderground[0], result.openWeather[0]];
    }

    private getChartOptions() {
        return {
            responsive: true
        };
    }

    private getChartColors() {
        return [
            { // pink
                backgroundColor: 'rgba(255,23,68,.2)',
                borderColor: '#ff1744',
                pointBackgroundColor: '#ff1744',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ff1744'
            },
            { // green
                backgroundColor: 'rgba(156,204,101,.2)',
                borderColor: '#9ccc65',
                pointBackgroundColor: '#9ccc65',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#9ccc65'
            },
            { // blue
                backgroundColor: 'rgba(33,150,243,.2)',
                borderColor: '#2196f3',
                pointBackgroundColor: '#2196f3',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#2196f3'
            }
        ];
    }

    public goHome() {
        this.statisticChart = false;
    }
}