import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
 
@Component({
  selector: 'datepicker-demo',
  template: `
      <label>{{label}}</label>
      <input [(ngModel)]="dateModel" class="form-control"     (focus)="showPopup()" />
      <datepicker class="popup" *ngIf="showDatepicker" [(ngModel)]="dateModel" [showWeeks]="true" (ngModelChange)="hidePopup($event)" ></datepicker>
  `
})

export class DatepickerDemoComponent {
  @Input()
  dateModel: Date;
  @Input()
  label: string;
  @Output()
  dateModelChange: EventEmitter<string> = new EventEmitter();
  private showDatepicker: boolean = false;

  showPopup() {
      this.showDatepicker = true;
  }

  hidePopup(event) {
      this.showDatepicker = false;
      this.dateModel = event;
      this.dateModelChange.emit(event)
  }
}