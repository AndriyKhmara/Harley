import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()

export class StatisticWeatherService {
    private configSource = new Subject<string>();
    public config: any;

    constructor(private http: Http) { }

    config$ = this.configSource.asObservable();

    public setConfig(data: any) {
        this.configSource.next(data);
    }

    public getWeatherData(config:any) : Observable<any[]> {
        let url = this.setUrl(config);
        this.config = config;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private setUrl(config:any){
        return ['/weather/v01/stat/service-by-city/day?from=', config.dateFrom,
            '&to=', config.dateTo,
            '&city=', config.city
        ].join('');
    }

    private extractData(res) {
        let data = res.json();
        return data || [{ err: "no data found"}];
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}