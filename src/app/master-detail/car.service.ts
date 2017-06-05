import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Car} from './models/car';
@Injectable()
export class CarService {
    
    constructor(private http: Http) {}

     private api_url = 'http://localhost:8200/master-detail';

    getCarsSmall() {
        return this.http.get(this.api_url)
                    .toPromise()
                    .then(res => <Car[]> res.json().data)
                    .then(data => { return data; });
    }
}

