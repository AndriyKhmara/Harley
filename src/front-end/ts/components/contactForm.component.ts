import { Component } from '@angular/core';

@Component({
    selector: 'contact-form',
    template: `
        <div>
            <form>
                <div>
                    <label>Nick</label>
                </div>
                <div>
                    <input type="text" [(ngModel)]="nick" [ngModelOptions]="{standalone: true}"/>
                </div>
                <div>
                    <label>Message</label>
                </div>
                <div>
                    <textarea [(ngModel)]="message" [ngModelOptions]="{standalone: true}"></textarea>
                </div>
                <div>
                    <input type="submit" value="Send message" (click)="showData($event)"/>
                    <input type="reset" value="Cancel"/>
                </div>
            </form>            
        </div>
    `
})
export class ContactFormComponent {

    private nick:string = '';
    private message:string = '';

    public showData(event):void {
        console.log(event);
        console.log("show data", this.nick, this.message);
    }
}