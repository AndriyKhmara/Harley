import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';

import "leaflet";
import "leaflet.vectorgrid";

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));