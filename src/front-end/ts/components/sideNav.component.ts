import { Component } from '@angular/core';

@Component({
    selector: 'side-nav',
    template: `
        <div>
            <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="#">About</a>
              <span onclick="openNav()">open</span>

            </div>
            
            </div>`,
    styles:['.sidenav{width:300px; height:100vh; position:fixed; z-index:9999999999999999; top:0; right:0; background-color:#f0f; overflow-x:hidden; padding-top:60px; }']
    }) 


export class  sideNavComponent { }
