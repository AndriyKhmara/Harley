import { Component } from '@angular/core';
 
@Component({
  selector: 'buttons-radio',
  template: `<div class="btn-group">
  <label class="btn btn-primary" [(ngModel)]="radioModel"
         btnRadio="Left">Rivne</label>
  <label class="btn btn-primary" [(ngModel)]="radioModel" btnRadio="Kiev">Kiev</label>
  <label class="btn btn-primary" [(ngModel)]="radioModel"
         btnRadio="Right">Luts'k</label>
</div>`
})
export class RodiobuttonComponent {
  public radioModel: string = 'Middle';

  public cities: Array<string> =["Rivne", "Kiev", "Luts'k"];

  
}