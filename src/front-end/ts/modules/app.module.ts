import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../components/app.component';
import { HeaderComponent } from '../components/header.component';
import { ContainerComponent } from '../components/container.component';
import { MapComponent } from '../components/map.component';
import { MapService } from "../services/map.service";
import { ContactFormComponent } from "../components/contactForm.component";
import { sideNavComponent } from "../components/sideNav.component";


@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        ContainerComponent,
        MapComponent,
        ContactFormComponent,
        sideNavComponent
    ],
    providers: [
        MapService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }