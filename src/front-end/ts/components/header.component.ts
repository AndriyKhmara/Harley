import { Component } from '@angular/core';


@Component({
    selector: 'harley-header',
    template: `
        <header>
            <h2>Harley. Weather App</h2>
        </header>`,
    styles:[
        'header{ z-index:210; }',
        'header h2{ margin-top: 5px; color:#fff;}'
    ]

})
export class HeaderComponent {}
