// =============================================================================
// File Name		              : dashboard.service.ts
// Description 	              : Call all dashboard related services
// Created by                 : Bikash Kumar Panda
// Created on                 : 12-Apr-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 12-Apr-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 12-Apr-2023
// Style sheet                : dashboard.component.scss
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
export class DashboardService {

  constructor(private router: Router, private http: HttpClient) { }
  //=============================================================================
    // For Pending Application List
    // Created by Bikash Kumar Panda on 12-Apr-2023
  //============================================================================= 
  pendingFileLIst(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/getPendingFilesListForApproval';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;
  }
  //=============================================================================
    // For Recent Files
    // Created by Bikash Kumar Panda on 12-Apr-2023
  //============================================================================= 
  public recentFiles(formParams:any):Observable<any> {
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getRecentFiles';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
 }
  //=============================================================================
    // For Total Documents with size
    // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 
  public gettotalDocuments(formParams:any):Observable<any> {
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/totalDocument';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
 }
  //=============================================================================
    // For Total Folders with size
    // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 
  public gettotalFolder(formParams:any):Observable<any> {
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/totalFolder';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  //=============================================================================
    // For Recent Activities
    // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 
  public recentactivitylog(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'master_module/getUserActivity';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
  //=============================================================================
    // For Recent Activities
    // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 
  public totalSharedfiles(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/totalSharedfile';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  //=============================================================================
    // For Recent Activities
    // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 
  public graphDetails(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/getPendingFilesListGraph';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

   //=============================================================================
    // For Recent Activities
    // Created by Bikash Kumar Panda on 16-Aug-2023
  //============================================================================= 
  public getRetentionDetails(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/getArchivedList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  } 


}
