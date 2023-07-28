// =============================================================================
// File Name		              : reports.service.ts
// Description 	              : Call all dashboard related services
// Created by                 : Bikash Kumar Panda
// Created on                 : 08-Jun-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 08-Jun-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 08-Jun-2023
 
// =============================================================================

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
export class ReportsService {

  constructor(private router: Router, private http: HttpClient) { }
  //=============================================================================
    // Search Query List
    // Created by Bikash Kumar Panda on 08-Jun-2023
  //============================================================================= 
  public searchQueryResult(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/searchQueryResult';
    let reportResponse = this.http.post(serviceURL, reqData);
    return reportResponse;

  }
  //=============================================================================
    // Search Query List
    // Created by Bikash Kumar Panda on 08-Jun-2023
  //============================================================================= 
  //=============================================================================
    // Pending Approval List
    // Created by Bikash Kumar Panda on 09-Jun-2023
  //============================================================================= 
  public rptApprovalList(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'report_module/reportingPendingFilesListForApproval';
    let reportResponse = this.http.post(serviceURL, reqData);
    return reportResponse;

  }
  //=============================================================================
    // Pending Approval List
    // Created by Bikash Kumar Panda on 09-Jun-2023
  //============================================================================= 
  public getUserlist(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'manage_login/userList';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;

  }


  public getUserDetails(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'manage_login/getUserDetail';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;

  }

//=============================================================================
    // Shared files List
    // Created by jivan on 22-Jun-2023
  //============================================================================= 
  public rptSharedList(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'report_module/reportingSharedFilesList';
    let reportResponse = this.http.post(serviceURL, reqData);
    return reportResponse;

  }
  //=============================================================================
    // Pending Approval List
    // Created by Bikash Kumar Panda on 09-Jun-2023
  //============================================================================= 

//=============================================================================
    // All files List
    // Created by jivan on 22-Jun-2023
  //============================================================================= 
  public rptAllFilesList(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'report_module/reportingAllFilesList';
    let reportResponse = this.http.post(serviceURL, reqData);
    return reportResponse;

  }
  //=============================================================================
    // Pending Approval List
    // Created by Bikash Kumar Panda on 09-Jun-2023
  //============================================================================= 
//=============================================================================
    // Retention files List
    // Created by jivan on 22-Jun-2023
  //============================================================================= 
  public rptRetentionFilesList(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'report_module/reportingRetentionFilesList';
    let reportResponse = this.http.post(serviceURL, reqData);
    return reportResponse;

  }
  //=============================================================================
    // Pending Approval List
    // Created by Bikash Kumar Panda on 09-Jun-2023
  //============================================================================= 
 


}
