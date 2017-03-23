import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'side-nav',
    template: `
        <div>
            <span id="burger">open</span>
            <div id="mySidenav" class="sidenav">
                <a href="javascript:void(0)" class="close-btn">&times;</a>
                <a href="#">About</a>
                
            </div>            
        </div>`,

    styles:['.sidenav{width:0; height:100vh; position:fixed; z-index:9999; top:0; right:0; background-color:#f4f4f4; overflow-x:hidden; padding-top:60px; }']
    }) 


export class  SideNavComponent {
    
}

