import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as CryptoJS from "crypto-js";
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class FormbuilderService {

  constructor(private router: Router, private http: HttpClient) { }

  insertData(formParams: any, fname: any): Observable<any> {
    let requestParam = Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }
}
