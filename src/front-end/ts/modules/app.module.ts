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
import { ContactFormComponent } from "../components/contactForm.component";
import { DatepickerDemoComponent } from "../components/datepicker.component";
import { DropdownComponent } from "../components/dropdown.component";
import { RodiobuttonComponent } from "../components/radiobutton.component";
import { ChartComponent } from "../components/chart.component";
import { CurrentWeatherService } from "../services/currentWeather.service";
import { DatepickerModule } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';
import { ButtonsModule } from 'ng2-bootstrap';



@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ChartsModule,
        SelectModule,
        DatepickerModule.forRoot(),
        DropdownModule.forRoot(),
        ButtonsModule.forRoot()

    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        SideNavComponent,
        ContainerComponent,
        MapComponent,
        ContactFormComponent,
        ChartComponent,
        DatepickerDemoComponent,
        DropdownComponent,
        RodiobuttonComponent
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