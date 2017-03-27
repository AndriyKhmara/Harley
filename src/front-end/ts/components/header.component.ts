import { Component } from '@angular/core';

@Component({
    selector: 'harley-header',
    template: `
        <header>
            <h2>Header template</h2>
            <side-nav></side-nav>
        </header>`,
    styles:['header{ z-index:210; }']

})
export class HeaderComponent { }
