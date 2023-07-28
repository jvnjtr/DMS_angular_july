import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private router: Router, private http: HttpClient) { }
  

  addLanguage(formParams:any):Observable<any>{ 
    

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL +'language_module/addLanguage';    
    let moduleResponse = this.http.post(serviceURL, reqData);
    return moduleResponse;
  }
 
  viewLanguage(formParams:any):Observable<any>{ 
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    //console.log(requestParam);
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL +'language_module/viewLanguage';    
    let moduleResponse = this.http.post(serviceURL, reqData);
    return moduleResponse;
  }

  getLanguageById(formParams:any):Observable<any>{    
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    //console.log(requestParam);
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL +'language_module/editLanguageDetailsById';    
    let moduleResponse = this.http.post(serviceURL, reqData);
    return moduleResponse;
  }

  


  onUpdate(formParams:any):Observable<any>
  {
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }; 
    let serviceURL = environment.serviceURL +'language_module/manageLanguage';    
    let moduleResponse = this.http.post(`${serviceURL}`,reqData);
    return moduleResponse;
  }


  getlanguages(formParams:any):Observable<any>
  {
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }; 
    let serviceURL = environment.serviceURL +'language_module/getLanguage';    
    let moduleResponse = this.http.post(`${serviceURL}`,reqData);
    return moduleResponse;
  }

  submitlables(formParams:any):Observable<any>
  {
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }; 
    let serviceURL = environment.serviceURL +'language_module/labelLanguage';    
    let moduleResponse = this.http.post(`${serviceURL}`,reqData);
    return moduleResponse;
  }

  viewAllLanguages(formParams:any):Observable<any>{  
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };     
    let serviceURL = environment.serviceURL +'language_module/viewAllLanguages';    
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  deleteLableLanguages(formParams:any):Observable<any>{  
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };     
    let serviceURL = environment.serviceURL +'language_module/deleteLableLanguages';    
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  editLableLanguageById(formParams:any):Observable<any>{  
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };     
    let serviceURL = environment.serviceURL +'language_module/editLanguageDetailsById';    
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
 

}
