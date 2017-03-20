import { Component } from '@angular/core';

@Component({
    selector: 'side-nav',
    template: `
            <div id="sidNav">
                  <h2>Title</h2> 
                  <button>Click me</button>    
            </div>`,
    styles:['#sidNav{width:25%; height:100vh; position:right; z-index: 10; background:yellow;}']

})

export class  sideNavComponent { }
