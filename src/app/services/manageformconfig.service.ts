import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ManageformconfigService {
  serviceURL = environment.serviceURL;

  constructor(private router: Router, private http: HttpClient) { }


  addNewForm(formParams: any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL + 'addManageForm';
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }

  viewManageForm(formParams: any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL + 'viewManageFrom';
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }


  // addNewFormtool(formParams: any): Observable<any> {
  //   let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
  //   let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
  //   let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
  //   let serviceUrl = environment.serviceURLtool + 'addManageForm';
  //   let serviceRes = this.http.post(serviceUrl, reqData);
  //   return serviceRes;
  // }

  // viewManageFormtool(formParams: any): Observable<any> {
  //   let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
  //   let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
  //   let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
  //   let serviceUrl = environment.serviceURLtool + 'viewManageFrom';
  //   let serviceRes = this.http.post(serviceUrl, reqData);

  //   return serviceRes;
  // }

  addNewFormConfig(formParams: any): Observable<any> {

    const formData = new FormData();
    formData.append("formData", formParams);

    let serviceUrl = environment.serviceURL + 'addFormConfig';
    let serviceRes = this.http.post(serviceUrl, formData);
    return serviceRes;
  }
  //  viewFormConfig(formParams:any):Observable<any>{
  //   let requestParam = btoa(JSON.stringify(formParams));
  //   let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
  //   let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
  //   let serviceUrl = environment.serviceURL+'viewFormConfig';
  //   let serviceRes = this.http.post(serviceUrl,reqData);
  //   return serviceRes;
  // }
  viewFormConfig(formParams: any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = environment.serviceURL + 'viewFormConfig';
    let serviceRes = this.http.post(serviceUrl, formParams);
    return serviceRes;
  }

  createFormConfig(formParams: any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = environment.serviceURL + 'finalSubmitData';
    let serviceRes = this.http.post(serviceUrl, formParams);
    return serviceRes;
  }

  viewFinalFormList(formParams: any): Observable<any> {
    let serviceUrl = environment.serviceURL + 'viewFormList';
    let serviceRes = this.http.post(serviceUrl, formParams);
    return serviceRes;
  }

}
