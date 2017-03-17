import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppComponent } from './components/app.component';
import { AppModule } from './modules/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
    .then(success => console.log(`Bootstrap success`))
    .catch(error => console.log(error));