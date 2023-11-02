import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class LetterconfigService {

  serviceURL = environment.serviceURL;


  constructor( private router: Router, private http: HttpClient) { 
  } 

  newLetter(letterParams:any):Observable<any>{
    let requestParam = Buffer.from(JSON.stringify(letterParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL + 'letterconfig';
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
    // let requestParam = btoa(encodeURIComponent(JSON.stringify(letterParams)));
    // let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    // let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    // let serviceUrl = environment.serviceURL+'letterconfig';
    // let serviceRes = this.http.post(serviceUrl,reqData);
    // return serviceRes;
  }

  viewLetters(letterParams:any):Observable<any>{
    // let requestParam = btoa(encodeURIComponent(JSON.stringify(letterParams)));
    // let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    // let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    // let serviceUrl = environment.serviceURL+'viewLetterConfig';
    // let serviceRes = this.http.post(serviceUrl,reqData);
    // return serviceRes;
    let requestParam = Buffer.from(JSON.stringify(letterParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL + 'viewLetterConfig';
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }
  viewAllPublishedLetters(letterParams:any):Observable<any>{
    let requestParam = btoa(encodeURIComponent(JSON.stringify(letterParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'viewAllPublishedLetters';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }
  //  viewLetters(letterParams:any):Observable<any>{
  //   let serviceUrl = environment.serviceURL+'viewLetterConfig';
  //   let serviceRes = this.http.post(serviceUrl,letterParams);
  //   return serviceRes;
  // }
  //  newLetter(letterParams:any):Observable<any>{
    //   let serviceUrl = environment.serviceURL+'letterconfig';
    //   let serviceRes = this.http.post(serviceUrl,letterParams);
    //   return serviceRes;
    // }


  // viewLetters(letterParams:any):Observable<any>{
  //   let serviceUrl = environment.serviceURL+'viewLetterConfig';
  //   let serviceRes = this.http.post(serviceUrl,letterParams);
  //   return serviceRes;
  // }

  // deleteLetter(letterParams:any):Observable<any>{
  //   let serviceUrl = environment.serviceURL+'DeleteLetterConfig';
  //   let serviceRes = this.http.post(serviceUrl,letterParams);
  //   return serviceRes;
  // }
}
