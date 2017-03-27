import {Component, Input} from '@angular/core';

@Component({
    selector: 'chart-demo',
    template: `
    <div class="container">
        <div class="row">
            <div class="col-xs-12" style="width:60%; min-width: 320px; margin: 0 20%;border: 1px solid black">

                <div style="display: block">
                    <canvas baseChart
                        [datasets]="barChartData"
                        [labels]="barChartLabels"
                        [options]="barChartOptions"
                        [legend]="barChartLegend"
                        [chartType]="barChartType"
                        (chartHover)="chartHovered($event)"
                        (chartClick)="chartClicked($event)">                
                    </canvas>
                </div>
                 
            </div>
        </div>
    </div>`
})

export class BarChartDemoComponent {
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    constructor() {
        // console.log("constructor", weather)
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public randomize():void {
        // Only Change 3 values
        let data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }
}

