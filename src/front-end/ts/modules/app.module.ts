import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../components/app.component';
import { HeaderComponent } from '../components/header.component';
import { SideNavComponent } from '../components/sideNav.component';
import { ContainerComponent } from '../components/container.component';
import { MapComponent } from '../components/map.component';
import { MapService } from "../services/map.service";
import { ContactFormComponent } from "../components/contactForm.component";
import { ChartComponent } from "../components/chart.component";
import { CurrentWeatherService } from "../services/currentWeather.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        SideNavComponent,
        ContainerComponent,
        MapComponent,
        ContactFormComponent,
        ChartComponent
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