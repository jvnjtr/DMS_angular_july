import { Injectable } from '@angular/core';
import {environment} from "src/environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as CryptoJS from "crypto-js";
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ConsoleservicesService {

  constructor(private router : Router, private http : HttpClient) { }

  insertData(formParams:any,fname:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
}

viewAll(formParams:any,fname:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
}

deleteRecord(formParams:any,fname:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
}

fillDropDown(formParams:any,fname:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }

fillRadio(formParams:any,fname:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }

fillCheckBox(formParams:any,fname:any):Observable<any>{
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,formParams);
    return serviceRes;
  }

saveFileToTemp(formParams:any):Observable<any>{
    let serviceURL = environment.serviceURL +'adminconsole/ManageUser/userImageUpload';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  deleteAll(formParams:any,fname:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { "REQUEST_DATA": requestParam, "REQUEST_TOKEN": requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
      }
publishAll(formParams:any,fname:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { "REQUEST_DATA": requestParam, "REQUEST_TOKEN": requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
      }
unpublishAll(formParams:any,fname:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { "REQUEST_DATA": requestParam, "REQUEST_TOKEN": requestToken };
    let serviceUrl = environment.serviceURL+fname;
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
      }

}
