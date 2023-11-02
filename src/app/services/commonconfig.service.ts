import {EventEmitter, Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as CryptoJS from "crypto-js";
import { Subscription} from 'rxjs/internal/Subscription'; 
import {Buffer} from 'buffer';
@Injectable({providedIn: "root"})
export class CommonconfigService {
  serviceURL = environment.serviceURL;
  constructor(private router : Router, private http : HttpClient) {}

  public getLanguage(formData : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formData)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }   
    let serviceURL = environment.serviceURL + "getLanguage";
    let moduleResponse = this.http.get(serviceURL);
    return moduleResponse;
  }
  public getPublishReportList() {
    let serviceURL = environment.serviceURL + "getPublishReportList";
    let reportListResponse = this.http.get(serviceURL);
    return reportListResponse;
  }
  public getReportDataByReportId(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getReportData";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  public getAllLabels(): Observable<any> {
    let serviceURL = environment.serviceURL + "getAllLabels";
    let moduleResponse = this.http.post(serviceURL, null);
    return moduleResponse;
  }
  public getMetaTemplateList(): Observable<any> {
    let serviceURL = environment.serviceURL + "getMetaTemplateList";
    let moduleResponse = this.http.post(serviceURL, null);
    return moduleResponse;
  }

  public getModules() {
    let serviceURL = environment.serviceURL + "getmodules";
    let moduleResponse = this.http.post(serviceURL, null);
    return moduleResponse;
  }

  public getForms(formData : any): Observable<any>  {
    // let serviceURL = environment.serviceURL + "getForms";
    // let moduleResponse = this.http.post(serviceURL, null);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formData), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getForms';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  public getFormFieldList(formData : any): Observable<any>  {
    // let serviceURL = environment.serviceURL + "getForms";
    // let moduleResponse = this.http.post(serviceURL, null);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formData), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getFormFieldList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  public getFormTemplateName(formData : any): Observable<any>  {
    // let serviceURL = environment.serviceURL + "getForms";
    // let moduleResponse = this.http.post(serviceURL, null);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formData), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getFormTemplateName';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  public getMetaTemplateFieldDetail(formData : any): Observable<any>  {
    // let serviceURL = environment.serviceURL + "getForms";
    // let moduleResponse = this.http.post(serviceURL, null);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formData), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getMetaTemplateFieldDetail';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  
  public getallFormName(formData : any): Observable<any> {
    // let requestParam = btoa(encodeURIComponent(JSON.stringify(formData)));
    // let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    // formData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }   
    // let serviceURL = environment.serviceURL + "getallFormName";
    // let moduleResponse = this.http.post(serviceURL,formData);
    // return moduleResponse;
    let requestParam =Buffer.from(JSON.stringify(formData), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'getallFormName';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }
  public getAllFormsByModule(formParams : any): Observable<any>  {
    let serviceURL = environment.serviceURL + "getAllFormsByModule";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  public getFormName(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getFormName";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  public getFielsByProcessId(formParams : any): Observable<any> {
    // let serviceURL = "http://192.168.103.98:7001/fard_git/sugam/admin/api/getDynmCntrls";
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceURL = environment.serviceURL +"getFieldsForReport";
    let moduleResponse = this.http.post(serviceURL, reqData);
    return moduleResponse;
  }


  public getFormNameForReport(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getFormNameForReport";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  deleteAll(formParams : any, fname : any): Observable<any> {
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceUrl = environment.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }
  publishAll(formParams : any, fname : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceUrl = environment.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }
  unpublishAll(formParams : any, fname : any): Observable<any> {
    console.log(fname);
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceUrl = environment.serviceURL + fname;
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }

  public getGetwayType() {
    let serviceURL = environment.serviceURL + "getwayType";
    let moduleResponse = this.http.get(serviceURL);
    return moduleResponse;
  }

  public getGetwayName(formParams : any): Observable<any> {
    let serviceURL = environment.serviceURL + "gatewayConfiguration";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  public schemeDynCtrls(formParams : any): Observable<any> {
    // let serviceURL = "http://192.168.103.98:7001/fard_git/sugam/admin/api/getDynmCntrls";
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = {
      REQUEST_DATA: requestParam,
      REQUEST_TOKEN: requestToken
    };
    let serviceURL = environment.serviceURL +"getSchemeApplyDetails";
    let moduleResponse = this.http.post(serviceURL, reqData);
    return moduleResponse;
  }

  public tableColumnFetch(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "tableColumnFetch";
    let moduleResponse = this.http.post(serviceURL, formParams);
    
    return moduleResponse;
  }

  public getConfigurationKeys(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "formDetailsData";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }


  public getStaticConfigurationKeys(): Observable<any> {
    // let requestParam = btoa(JSON.stringify(formParams));
    // let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    // formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "GetSaticKeys";
    let moduleResponse = this.http.get(serviceURL);
    return moduleResponse;
  }
 


  public getModFormName(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getModFormName";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  updateReportBuilder(id:number): Observable<any> {    
    let serviceURL = environment.serviceURL + "viewReportBuilderData/";
    let langResponse = this.http.get(serviceURL+id);      
    return langResponse;
  }
  ViewReportPreview(exp:any): Observable<any> {
    
    let serviceURL = environment.serviceURL + "viewReportPreview";
    let langResponse = this.http.post(serviceURL,exp);
    return langResponse;
  }


  public saveReportBuilderData(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "saveReportBuilderData";
    let saveReportResponse = this.http.post(serviceURL, formParams);
    return saveReportResponse;
  }


  getAllReportBuilderData(): Observable<any> {    
    let serviceURL = environment.serviceURL + "viewAllReportBuilderData";
    let langResponse = this.http.get(serviceURL);      
    return langResponse;
  }
 
  deleteReportBuilder(id:number): Observable<any> {
    let serviceURL = environment.serviceURL + "deleteReportBuilderData/";
    let langResponse = this.http.delete(serviceURL+id);      
    return langResponse;
  }


  filterReportBuilder(reportParams: any): Observable<any> {

    let requestParam = btoa(encodeURIComponent(JSON.stringify(reportParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL + 'filterReportBuilder';
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }

  viewReportBuilder(letterParams: any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(letterParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = {
      'REQUEST_DATA': requestParam, 'REQUEST_TOKEN':
        requestToken
    };
    let serviceUrl = environment.serviceURL + 'viewLetterConfig';
    let serviceRes = this.http.post(serviceUrl, reqData);
    return serviceRes;
  }


  // getAllReportBuilderData1(data:any): Observable<any> {    
  //   let serviceURL = environment.serviceURL + "viewAllReportBuilderData";
  //   let langResponse = this.http.get(serviceURL);      
  //   return langResponse;
  // }


  getAllReportBuilderData1(data:any):Observable<any>{
    //alert("Servicee......"+JSON.stringify(data));
    let requestParam = btoa(encodeURIComponent(JSON.stringify(data)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'viewReportBuilderConfig';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }


  newReportBuilder(letterParams:any):Observable<any>{
    let requestParam = btoa(encodeURIComponent(JSON.stringify(letterParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceUrl = environment.serviceURL+'reportBuilderconfig';
    let serviceRes = this.http.post(serviceUrl,reqData);
    return serviceRes;
  }

  
  public getStaticMenu(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getStaticMenu";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }



  public generateEncrypt(formParams : any) {
    let requestParam = btoa(JSON.stringify(formParams));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    return JSON.stringify(formParams);
  }


  public insertFormData(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "manageForm";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  public viewFormData(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "viewForm";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  public deleteFormData(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "deleteForm";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  public dyprocessWiseView(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "processWiseApplicationDetails";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }
  public deleteDynamicDetails(formParams : any): Observable<any> {
    let serviceURL = environment.serviceURL + "deleteprocessWiseAppDetails";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  getLogo(formParams : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(formParams)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    formParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "websitPreviewLogo";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  getTableDetails(processId : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(processId)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    processId = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getTableDetails";
    let moduleResponse = this.http.post(serviceURL, processId);
    return moduleResponse;
  }

  getAnyTableDetails(tableName : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(tableName)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    tableName = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "getAnyTableDetails";
    let moduleResponse = this.http.post(serviceURL, tableName);
    return moduleResponse;
  }
  saveFileToTemp(formParams : any): Observable<any> {
    let serviceURL = environment.serviceURL + "saveFileToTemp";
    let moduleResponse = this.http.post(serviceURL, formParams);
    return moduleResponse;
  }

  getAllLanguageList(langParms : any): Observable<any> { 

    let requestParam = btoa(encodeURIComponent(JSON.stringify(langParms)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    langParms = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + "viewLanguage";
    let langResponse = this.http.post(serviceURL, langParms);
     
    return langResponse;
  }
  saveAdminLanguageLabel(langParms : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(langParms)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    langParms = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "saveAdminLanguageLabel";
    let langResponse = this.http.post(serviceURL, langParms);
    return langResponse;
  }
  FetchPublishGateWayRecords(gateWayParms : any): Observable<any> {
    let requestParam = btoa(encodeURIComponent(JSON.stringify(gateWayParms)));
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    gateWayParms = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken }
    let serviceURL = environment.serviceURL + "FetchPublishGateWayRecords";
    let gateWayResponse = this.http.post(serviceURL, gateWayParms);
    return gateWayResponse;
  }
  
  saveAllLanguageLabel(): Observable<any> {
    let serviceURL = environment.serviceURL + "getAllLabels";
    let langResponse = this.http.get(serviceURL);
    return langResponse;
  }
  // getLanguages():Observable<any>{    

  //   let serviceURL = environment.serviceURL +'viewLanguage';    

  //   let moduleResponse = this.http.post(serviceURL,);

  //   return moduleResponse;



  // }
  langReplace(languageText:any,languageName:any='')
    {  

      if(languageText==''|| languageText==undefined || languageText=='undefined')
        {
          return languageText;
        }
       
      let lngToLower : any = languageText.toLowerCase();
      let allLangListResult:any = sessionStorage.getItem("ALL_LANG_LIST");
      let SeetionParsedLangRes =JSON.parse(CryptoJS.AES.decrypt(allLangListResult, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
      let sessionUserLangtoken:any = sessionStorage.getItem('USER_LANGPREF'); 
      let sessionUserLang =JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
     
      if(SeetionParsedLangRes[lngToLower] != undefined)
        {
           let allParsedLang = JSON.parse(SeetionParsedLangRes[lngToLower])
          
           return allParsedLang[sessionUserLang];
        }
        else
          {
            return languageText;
          }
    
    }


    invokeFirstComponentFunction = new EventEmitter();    

    subsVar: Subscription;    
 
    onFirstComponentButtonClick() {    
 
      this.invokeFirstComponentFunction.emit();    
 
    } 
  }
   
