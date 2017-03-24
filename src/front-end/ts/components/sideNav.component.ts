import { Component } from '@angular/core';
declare var $:any;
import { DatepickerDemoComponent } from "./datepicker.component"



@Component({
    selector: 'side-nav',
    template: `
        <div>
            <div class="burger">
                <div class="burger-brick"></div>
                <div class="burger-brick middle"></div>
                <div class="burger-brick"></div>
            </div>
            <div class="side-nav">
                <a href="javascript:void(0)" class="close-btn">&times;</a>
               <buttons-radio></buttons-radio>
                <datepicker-demo></datepicker-demo>
                <datepicker-demo></datepicker-demo>

            </div>            
        </div>`,

    styles:['']
    }) 


export class  SideNavComponent {

    constructor() {

    }
    ngOnInit() {

    }
    ngAfterViewInit(){
        $('.burger').on('click', function(){
            $('.side-nav, .burger').addClass('open');
        });
        $('.close-btn').on('click', function () {
            $('.side-nav, .burger').removeClass('open');
        });
    }
}

