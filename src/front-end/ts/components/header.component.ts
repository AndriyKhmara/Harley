import { Component } from '@angular/core';

@Component({
    selector: 'harley-header',
    template: `
        <header>
            <h1>Harley <span>Weather</span></h1>
            <side-nav></side-nav>
        </header>`,
    styles:['header{ z-index:210; }']

})
export class HeaderComponent { }
