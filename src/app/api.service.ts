import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface CBS_VERSION {
  externalVersion: string;
  internalVersion: string;
}

@Injectable()
export class ApiService {

url: string = "https://tst.calculators.symmetry.com/api/";
calculateUrl: string = "https://tst.calculators.symmetry.com/api/calculators/salary";
cbsKey: string = environment.cbs_api_key;

constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'pcc-api-key': this.cbsKey
      })
    };   
  }

  getApiInfo() : Observable<CBS_VERSION> {
    return this.http.get(this.url, this.getHeaders())
      .pipe(
        map(res => <CBS_VERSION> JSON.parse(JSON.stringify(res)))
      );
  }

  calculate(amount) {
    const body = {grossPay: amount};
    return this.http.post(this.calculateUrl, body, this.getHeaders())
      .pipe(
        map(res => <CBS_VERSION> JSON.parse(JSON.stringify(res)))
      );
  }
}