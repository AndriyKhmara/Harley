import { Component, OnChanges } from '@angular/core';
import { CurrentWeatherService } from '../services/currentWeather.service'

//TODO: remove template to separate html file
@Component({
    selector: 'container',
    template: `
        <div>
            <map [weather]="weatherData"></map>
            <chart-demo [weather]="weatherData"></chart-demo>
            <!--<chart [weather]="weatherData"></chart>-->
        </div>
    `
})
export class ContainerComponent{
    public weatherData: any;

    constructor(private currentWeatherService: CurrentWeatherService) {
        this.weatherData = [{cityName: "No city", sourceAPI: "no API"}];
        this.weatherData = currentWeatherService.getWeatherData()
            .subscribe(
                data => {
                    this.weatherData = data;
                    console.log("subscribe", this.weatherData);
                }
                ,
                error =>  console.log(error)
            );
    }


}