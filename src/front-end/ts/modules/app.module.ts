import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from '../components/app.component';
import { HeaderComponent } from '../components/header.component';
import { ContainerComponent } from '../components/container.component';
import { MapComponent } from '../components/map.component';
import { MapService } from "../services/map.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        ContainerComponent,
        MapComponent
    ],
    providers: [
        MapService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }