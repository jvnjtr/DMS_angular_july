import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

import {Buffer} from 'buffer';
import { VarlistService } from './varlist.service';
import Swal from 'sweetalert2';




@Injectable({
  providedIn: 'root'
})
export class MsgengineLibService {




  constructor(
    private router: Router, 
    private http: HttpClient,
     private varlist:VarlistService
     ) { }


     public directlogoutlib(){
      sessionStorage.removeItem('ADMIN_SESSION');
      sessionStorage.removeItem('TOKEN');
      this.router.navigateByUrl('/login');
  }

  public getGetwayName(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = this.varlist.serviceURL + '/getwayConfiguration';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;
 
  }



  public viewGatwayTypes(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = this.varlist.serviceURL + '/getwayType';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;
 
  }


  newGetwayConfig(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = this.varlist.serviceURL+'/insertGatewayConfiguration';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }


   viewGetwayConfig(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = this.varlist.serviceURL+'/viewConfiguration';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }
  getPrevDetails(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = this.varlist.serviceURL+'/fillAll';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;

  }

  deleteGetwayConfig(docParams:any):Observable<any>{
    let requestParam = btoa(JSON.stringify(docParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = this.varlist.serviceURL+'/deletegetwayDocument';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }

  deleteAll(formParams : any, fname : any): Observable<any> {
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceUrl = this.varlist.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }
  publishAll(formParams : any, fname : any): Observable<any> {
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceUrl = this.varlist.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }
  unpublishAll(formParams : any, fname : any): Observable<any> {
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceUrl = this.varlist.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }

   newMessage(messageParams:any):Observable<any>{
      let requestParam = btoa(JSON.stringify(messageParams));
      let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
      let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
      let serviceUrl = this.varlist.serviceURL+'/addMessageConfig';
      let serviceRes = this.http.post(serviceUrl,reqData);
      return serviceRes;
    }
  // newMessage(messageParams: any): Observable<any> {
  //   let serviceUrl = this.varlist.serviceURL + 'addMessageConfig';
  //   let serviceRes = this.http.post(serviceUrl, messageParams);
  //   return serviceRes;
  // }

  viewMessage(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/viewMessageConfig';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }
  reminderSchedular(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/getRemindercron';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }
  msgexecuteSchedular(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/startExecution';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }
  msgstopSchedular(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/stopExecution';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }

  getStaticConfigurationKeys(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/GetStaticKeys';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }
  

  getFetchPublishRecord(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/FetchPublishRecord';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }


  getLanguage(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/viewLanguage';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }

  getForms(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/getFormName';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }

  getConfigurationKeys(messageParams: any): Observable<any> {
    let requestParam = btoa(JSON.stringify(messageParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
    messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceUrl = this.varlist.serviceURL + '/getConfigKeys';
    let serviceRes = this.http.post(serviceUrl, messageParams);
    return serviceRes;
  }



  public msguploadFile(formParams:any):Observable<any> {
    let serviceURL = this.varlist.serviceURL + '/fileUpload';
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }



  langReplace(languageText : any, languageName : any = "") {
    if (languageText != "" && languageText !=undefined) {
      let lngToLower: any = languageText.toLowerCase();

     let allLangListResult: any = sessionStorage.getItem("ALL_LANG_LIST");

    let SeetionParsedLangRes = JSON.parse(CryptoJS.AES.decrypt(allLangListResult, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));

     let sessionUserLangtoken: any = sessionStorage.getItem("USER_LANGPREF");

     let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));

      if (SeetionParsedLangRes[lngToLower] != undefined) {
       let allParsedLang = JSON.parse(SeetionParsedLangRes[lngToLower]);
       return allParsedLang[sessionUserLang] != "" && allParsedLang[sessionUserLang] != undefined
         ? allParsedLang[sessionUserLang]
         : languageText;
      } else {
        return languageText;
     }
    } else {
      return languageText;
    }
 }


 swalfire(type: any, message: any) {
  return  Swal.fire({
           icon: type,
           text: message
           });
 
 }


}
