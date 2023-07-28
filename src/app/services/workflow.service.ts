import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor(private router: Router, private http: HttpClient) { }


  public getEvents(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'workflow_module/getApprovalActions';
    let eventResponse = this.http.post(serviceURL, reqData);
    return eventResponse;

  }


  // Function to get events master
  getAdminRoles(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'workflow_module/getAuthority';
    let rolesResponse = this.http.post(serviceURL, reqData);
    return rolesResponse;
  }

  saveCanvasData(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'workflow_module/setWorkflow';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }
  // workflow_module/getWorkflowDetail
  fillWorkflowData(params:any):Observable<any>{

    let requestParam =Buffer.from(JSON.stringify(params), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'workflow_module/getWorkflowDetail';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;
   }

   pendingListForApproval(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getPendingFilesListForApproval';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }


   getuserActionList(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getAllowedApprovedActionList';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }

    takeAction(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/takeAction';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }
  
    summeylist(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getPendingFilesListSummry';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }

     getNotingList(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getNotingListFileWIse';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }

  viewMessageConfigPublished(formParams:any):Observable<any>{
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'message_module/viewMessageConfigPublished';
    let saveResponse = this.http.post(serviceURL, reqData);
    return saveResponse;

  }
  


}
