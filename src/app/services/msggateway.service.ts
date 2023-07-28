import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import {Buffer} from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class MsggatewayService {

  constructor(private router: Router, private http: HttpClient) { }





  public getGetwayName(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'message_module/getwayConfiguration';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;
 
  }



  public viewGatwayTypes(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'message_module/getwayType';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;
 
  }


  newGetwayConfig(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'message_module/insertGatewayConfiguration';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }


   viewGetwayConfig(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'message_module/viewConfiguration';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }
  getPrevDetails(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'message_module/fillAll';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;

  }

  deleteGetwayConfig(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'message_module/deletegetwayDocument';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }
  


}
