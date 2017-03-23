import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrentWeatherService {
    private currentWeatherUrl: string;

    constructor(private http: Http) {
        this.currentWeatherUrl = "/weather/v01/current";
    }

    public getWeatherData() :Observable<any[]> {
        return this.http.get(this.currentWeatherUrl)
            .map(this.extractData)
            .catch(this.handleError);
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