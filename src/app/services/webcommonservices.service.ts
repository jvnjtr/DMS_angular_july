import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class WebcommonservicesService {
  
  constructor(private router: Router, private http: HttpClient) { }

  getFormDetails(ruleParams:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getFormDetails';
    let serviceRes = this.http.get(serviceUrl,ruleParams);
    return serviceRes;
  }

   schemeDynCtrl(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'getSchemeApplyDetails';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getSchemeApplyDetails';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }

  schemeApply(formParams:any):Observable<any>{
    let serviceURL = environment.serviceURL +'schemeApply';
    // let serviceURL = environment.serviceURL +'fileUploadWithMeta';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  schemeApplyFileInsert(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'schemeApply';
    let serviceURL = environment.serviceURL +'fileUploadWithMeta';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  schemeApplyEdit(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'schemeApply';
    let serviceURL = environment.serviceURL +'fileUploadWithMetaEdit';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  loadDynamicBindDetails(formParams:any):Observable<any>{
    let serviceURL = environment.serviceURL +'tableColumnFetch';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  previewDynamicForm(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'previewDynamicForm';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'previewDynamicForm';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }

  applyForProcess(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'applyForProcess';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'applyForProcess';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  formToPdfgeneration(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'applyForProcess';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'formToPdfgeneration';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  getFormWiseTemplateList(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'applyForProcess';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getFormWiseTemplateList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  getTemplateDetail(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'applyForProcess';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getTemplateDetail';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  getLetterData(formParams:any):Observable<any>{
    // let serviceURL = environment.serviceURL +'applyForProcess';
    // let moduleResponse = this.http.post(serviceURL, formParams);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getLetterData';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }

  saveFileToTemp(formParams:any):Observable<any>{
    let serviceURL = environment.serviceURL +'saveFileToTemp';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  getLogo(formParams:any):Observable<any>{
    let serviceURL = environment.serviceURL +'websitPreviewLogo';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  getQueryDetails(formParams:any):Observable<any>
  {
    let serviceURL = environment.serviceURL + 'getQueryDetails';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  queryReplyInsert(formParams:any):Observable<any>
  {
    let serviceURL = environment.serviceURL + 'queryReplyInsert';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  getschemeDynCtrl(formParams:any):Observable<any>
  {
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL +'getSchemeApplyDetailsWorkflow';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }


  // getIfscCode(params:any):Observable<any>{
  //   let serviceUrl = environment.fardserviceURL+'getBankDist';
  //   let ifscRes = this.http.post(serviceUrl,params);
  //   return ifscRes;
  // }


  // getifscDetails(params:any):Observable<any>{
  //   let serviceUrl = environment.fardserviceURL+'getIfscDetails';
  //   let ifscDetailsRes = this.http.post(serviceUrl,params);
  //   return ifscDetailsRes;
  // }
  getApplicationList(parms:any):Observable<any>{
    //alert("Rohit");
    let serviceUrl = environment.serviceURL+'getApplicationList';
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }

  // weblogin(parms:any):Observable<any>{
  
  //   let serviceUrl = environment.serviceURLTest+'login';
  //   let serviceResponse = this.http.post(serviceUrl,parms);
  //   return serviceResponse;
  // }


  noResubmitHistory(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'noResubmitHistory';
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }


  previewDynamicFormOfHistory(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'previewDynamicFormOfHistory';
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }
  getDesigantionDetails(parms:any):Observable<any>{
    let serviceUrl = environment.serviceURL+'getAdminUserData';
    let serviceResponse = this.http.post(serviceUrl,parms);
    return serviceResponse;
  }
}
