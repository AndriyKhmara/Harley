import { Component } from '@angular/core';
import { StatisticWeatherService } from '../services/statisticsWeather.service';
import { Subscription } from 'rxjs/Subscription';
import * as _ from "lodash";

@Component({
    selector: 'side-nav',
    template: `
        <div class="{{status}}">
            <div class="col-xs-12">
                <h2 class="text-center">Get detailed info about weather</h2> 
                <p class="text-justify">
                Please select parameters to show data about the weather for specific city by specific period
                </p>
                <div class="burger" (click)="toggleSideNav()">
                    <div class="burger-brick"></div>
                    <div class="burger-brick middle"></div>
                    <div class="burger-brick"></div>
                </div>
                <div class="content text-center">
                    <label>City:</label>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary" [ngClass]="{'active': city === 'Rivne'}" 
                      (click)="setSelectedCity('Rivne')">Rivne</button>
                      <button type="button" class="btn btn-primary" [ngClass]="{'active': city === 'Kiev'}" 
                      (click)="setSelectedCity('Kiev')">Kiev</button>
                      <button type="button" class="btn btn-primary" [ngClass]="{'active': city === 'Lutsk'}" 
                      (click)="setSelectedCity('Lutsk')">Luts'k</button>
                    </div>
                    <hr/>
                    <label>Parameter:</label>
                    <select [(ngModel)]="selectedParam">
                        <option *ngFor="let param of params" [ngValue]="param.value">
                            {{param.name}}
                        </option>
                    </select>
                    <hr/>
                    <label>Period from:</label>
                    <input type="date" name="date-from" [(ngModel)]="dateFrom"/>
                    <label>Period to:</label>
                    <input type="date" name="date-to" [(ngModel)]="dateTo"/>
                    <hr/>  
                    <button class="btn-success btn-lg" (click)="getChartData()">Show</button>
                </div>
            </div>            
        </div>`,

    styles:['']
    }) 


export class  SideNavComponent {
    private status: string;
    private dateFrom: string;
    private dateTo: string;
    private city: string;
    private params: Array<any>;
    private selectedParam: string;
    public data: any;
    subscription: Subscription;

    constructor(private statisticWeatherService: StatisticWeatherService) {
        this.status = 'side-nav';
        this.params = [
            {id: 1, name: "Temperature", value: "temp"},
            {id: 2, name: "Humidity", value: "humidity"},
            {id: 3, name: "Pressure", value: "pressure"},
            {id: 4, name: "Wind speed", value: "windSpeed"}
        ];
        this.selectedParam = _.first(this.params).value;
    }

    public toggleSideNav(){
        this.status = this.status === 'side-nav' ? 'side-nav open' : 'side-nav';
    }

    public getChartData(){
        let data = {
            dateFrom: this.dateFrom,
            dateTo: this.dateTo,
            param: this.selectedParam,
            city: this.city === "Lutsk" ? "Luts'k" : this.city
        };
        this.statisticWeatherService.setConfig(data);
        this.toggleSideNav();
    }

    public setSelectedCity(name:string){
        this.city = name;
    }
}

