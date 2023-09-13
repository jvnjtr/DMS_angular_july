import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewAppListService {
  constructor(private router: Router, private http: HttpClient) {}

  getApplicationList(ruleParams: any): Observable<any> {
    let serviceUrl = environment.serviceURL + 'getApplication';
    let serviceRes = this.http.post(serviceUrl, ruleParams);
    return serviceRes;
  }
  getHistoryDetails(intOnlineServiceId:any){
    let serviceUrl = environment.serviceURL + 'getHistoryDetails';
    let serviceRes = this.http.post(serviceUrl, intOnlineServiceId);
    return serviceRes;
  }

  getActions(param: any): Observable<any> {
    let serviceUrl = environment.serviceURL + 'getAuthAction';
    let serviceRes = this.http.post(serviceUrl, param);
    return serviceRes;
  }
  takeAction(param: any): Observable<any> {
    let serviceUrl = environment.serviceURL + 'takeAction';
  //  let formData = new FormData();
  //  let paramKeys = Object.keys(param);
    // for (let paramData of paramKeys) {
    //   formData.append('arrParam[' + paramData + ']', param[paramData]);
    // }
    let serviceRes = this.http.post(serviceUrl, param);
    return serviceRes;
  }

  getNoteing(param: any): Observable<any> {
    let serviceUrl = environment.serviceURL + 'getnoting';
    let serviceRes = this.http.post(serviceUrl, param);
    return serviceRes;
  }
  getHelpDeskData(param: any): Observable<any> {
    let serviceUrl = environment.serviceURL + 'getHelpDeskData';
    let serviceRes = this.http.post(serviceUrl, param);
    return serviceRes;
  }

  getStatus(rows: any) {
    let status = 0;
    let pendingAuths = '';
    let appStatus = '';
    let statusDate = '';
    if (rows) {
      status = rows.tinStatus;
      // console.log(status);
      pendingAuths = rows.pendingAuth;
      statusDate = rows.dtmStatusDate != '' ? rows.dtmStatusDate : '';

      if (status == 8) {
        appStatus = '<div class="btn btn-success btn-sm w-100">Resolved</div>';
       
      }
    
      else if (status == 7) {
        appStatus = '<div class="btn btn-danger btn-sm w-100">Discarded</div>';
      
      }
      else if (status == 24) {
        appStatus = '<div class="btn btn-warning btn-sm w-100">Escalated</div>';
      
      }
      else {
        appStatus = '<div class="btn btn-info btn-sm w-100">Open</div>';
      }
    }
    return appStatus;
  }


  getStatusName(rows: any) {
    let status = 0;
    let pendingAuths = '';
    let appStatus = '';
    let statusDate = '';
    if (rows) {
      status = rows.tinStatus;
      // console.log(status);
      pendingAuths = rows.pendingAuth;
      statusDate = rows.dtmStatusDate != '' ? rows.dtmStatusDate : '';

      if (status == 0) {
        appStatus = '<div class="btn btn-info btn-sm w-100">Open</div>';
       
      }
      else if (status == 8) {
        appStatus = '<div class="btn btn-success btn-sm w-100">Resolved</div>';
       
      }
      else if (status == 7) {
        appStatus = '<div class="btn btn-danger btn-sm w-100">Discarded</div>';
      
      }
      else if (status == 24) {
        appStatus = '<div class="btn btn-warning btn-sm w-100">Escalated</div>';
      
      }
      else if (status == 25) {
        appStatus = '<div class="btn btn-secondary btn-sm w-100">In Progress</div>';
      
      }
      else if (status == 26) {
        appStatus = '<div class="btn btn-warning btn-sm w-100">On Hold</div>';
      
      }
      else {
        appStatus = '<div>New</div>';
      }
    }
    return appStatus;
  }

 
  getDashBoardReport(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getReport';    
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  } 

  getDetailsReport(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getDetailReport';    
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  } 
  getTicketNo(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getTicketNo';    
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }
  
  getModeWiseData(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getModeWiseData';    
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }
  getALLEmailDetails(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getEmailDetails';    
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }




}
