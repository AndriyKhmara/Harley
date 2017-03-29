import { Component } from '@angular/core';
import * as _ from "lodash";
declare var $:any;
import { DatepickerDemoComponent } from "./datepicker.component"

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
                      <button type="button" class="btn btn-primary" (click)="setSelectedCity('Rivne')">Rivne</button>
                      <button type="button" class="btn btn-primary" (click)="setSelectedCity('Kiev')">Kiev</button>
                      <button type="button" class="btn btn-primary" (click)="setSelectedCity('Lutsk')">Luts'k</button>
                    </div>
                    <hr/>
                    <label>Parameter:</label>
                    <select [(ngModel)]="selectedParam" (change)="updateDataset()">
                        <option *ngFor="let param of params" [ngValue]="param.value">
                            {{param.name}}
                        </option>
                    </select>
                    <hr/>
                    <label>Period from:</label>
                    <input type="date" name="date-from" [(ngModel)]="dateFrom" (change)="updateDataset()"/>
                    <label>Period to:</label>
                    <input type="date" name="date-to" [(ngModel)]="dateTo" (change)="updateDataset()"/>
                    <hr/>  
                    <button class="btn-success btn-lg">Show</button>
                </div>
            </div>            
        </div>`,

    styles:['']
    }) 


export class  SideNavComponent {
    public status: string;
    public dateFrom: string;
    public dateTo: string;
    public city: string;
    public params: Array<any>;
    public selectedParam: string;
    constructor() {
        this.status = 'side-nav';
        this.params = [
            {id: 1, name: "Temperature", value: "temp"},
            {id: 2, name: "Humidity", value: "humidity"},
            {id: 3, name: "Pressure", value: "pressure"},
            {id: 4, name: "Wind speed", value: "windSpeed"}
        ];
        this.selectedParam = _.first(this.params).value;
    }

    ngOnChanges() {

    };

    public toggleSideNav(){
        this.status = this.status === 'side-nav' ? 'side-nav open' : 'side-nav';
    }

    public updateDataset(){
        console.log("dateFrom", this.dateFrom);
        console.log("dateTo", this.dateTo);
        console.log("selectedParam", this.selectedParam);
        console.log('City', this.city);
    }

    public setSelectedCity(name){
        this.city = name;
        console.log('City', this.city)
    }
}

