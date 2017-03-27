import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SelectModule } from 'angular2-select';
import { AppComponent } from '../components/app.component';
import { HeaderComponent } from '../components/header.component';
import { SideNavComponent } from '../components/sideNav.component';
import { ContainerComponent } from '../components/container.component';
import { MapComponent } from '../components/map.component';
import { MapService } from "../services/map.service";
import { ChartComponent } from "../components/chart.component";
import { BarChartDemoComponent } from "../components/testBarChart.component";
import { CurrentWeatherService } from "../services/currentWeather.service";



@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ChartsModule,
        SelectModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        SideNavComponent,
        ContainerComponent,
        MapComponent,
        ChartComponent,
        BarChartDemoComponent
    ],
    providers: [
        MapService,
        CurrentWeatherService

    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }