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
export class UploadfilesService {

  constructor(private router: Router, private http: HttpClient) { }

 public uploadFile(formParams:any):Observable<any> {
    let serviceURL = environment.serviceURL + 'file_module/fileUpload';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  
  public finaluploadFile(formParams:any):Observable<any> {
   
    let requestParam = Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileUploadFinal';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
  public fileEdit(formParams:any):Observable<any> {
   
    let requestParam = Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileEditFinal';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

}
