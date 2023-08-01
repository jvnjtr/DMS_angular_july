import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import {Buffer} from 'buffer';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {
  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';



  constructor(private router: Router, private http: HttpClient) { }

// commonFunctionCall(formParams:any){
//   let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
//   let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
//   let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
// }

  public changePassword(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'manage_login/changePassword';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;
 
  }

  public getDesignation(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'master_module/getDesignation';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;

  }

 public getRoles(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'master_module/getRole';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;

  }
  public getUserlist(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'manage_login/userList';
    let desnResponse = this.http.post(serviceURL, reqData);
    return desnResponse;

  }


  public getFolders(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/getFolderDetail';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public getParentwiseFolders(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/getFolderDetailNew';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public getFoldersSingle(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/getFolderDetailIndividual';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
    public createFolders(formParams:any):Observable<any> {

    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/createFolder';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  
  public createMeta(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileMetaConfigCreate';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
  
  public viewMeta(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getFileMetaConfigList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
 
  public deleteMeta(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/deleteFileMetaConfigList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

   
  public deleteFolder(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/deleteFolder';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }


  public folderHierarchy(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/getFolderHierarchy';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public folderWiseDetails(formParams:any):Observable<any> {
   
    let requestParam =  Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/IndividualFolderDetail';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }


  public fileDownload(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileDecryptHandler';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public fileDownloadVer(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileDecryptHandlerVersioning';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public getFileDetails(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getFileDetailIndividual';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public moveToTash(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileMoveToTrash';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public moveTofolder(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileMoveToFolder';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public getrecentFiles(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getRecentFiles';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
  

  public fileBookmark(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileBookMark';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public fileRetention(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileRetention';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }



  

  public fileNumbreing(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileNumbering';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public fileShare(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/fileShare';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public getSharedFiles(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getSharedFileList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public getArchiveFiles(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getArchivedList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public archiveAction(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/archieveAction';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }


  public getuserList(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'manage_login/userList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public createDuplicate(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/duplicateFile';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
  public getfileVersions(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getFileVersionIndividual';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

   public duplicateFolder(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/duplicateFolder';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public activitylog(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'master_module/getUserActivity';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public loadDepartment(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'master_module/getDepartment';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }


  public getFolderList(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'folder_module/getFolderList';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }


  public fileLockUnlock(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'lock_module/fileLockUnlock';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }

  public searchQueryResult(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/searchQueryResult';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }




  // saveFileToTemp(formParams : any): Observable<any> {
  //   let serviceURL = environment.frameworkserviceURL + "saveFileToTemp";
  //   let moduleResponse = this.http.post(serviceURL, formParams);
  //   return moduleResponse;
  // }

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
  unpublishAll(formParams : any, fname : any): Observable<any> {
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


  public checkinCheckout(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'checkin_module/fileCheckinCheckout';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }
  public getfileLogs(formParams:any):Observable<any> {
   
    let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'file_module/getFileLogIndividual';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;

  }



  // U2FsdGVkX1+azlWGSORoJQSs1aUkN21p9rLVQXnmt4A=
  saveAdminLanguageLabel(langParms : any): Observable<any> {
    let serviceURL = environment.serviceURL + "saveAdminLanguageLabel";
    let langResponse = this.http.post(serviceURL, langParms);
    return langResponse;
  }

  saveAllLanguageLabel(): Observable<any> {
    let serviceURL = environment.serviceURL + "language_module/getAllLabels";
    let langResponse = this.http.get(serviceURL);
    return langResponse;
  }



  public showUserNotification(formParams:any):Observable<any> {

   let requestParam =Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'dashboard_module/showNotification';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
}

public reloadpage(){

  window.history.back()
}

  langReplace(languageText : any, languageName : any = "") {
  //console.log(1)
     if (languageText != "" && languageText !=undefined) {
       let lngToLower: any = languageText.toLowerCase();

      let allLangListResult: any = sessionStorage.getItem("ALL_LANG_LIST");

     let SeetionParsedLangRes = JSON.parse(CryptoJS.AES.decrypt(allLangListResult, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));

//console.log(SeetionParsedLangRes)


      let sessionUserLangtoken: any = sessionStorage.getItem("USER_LANGPREF");

      let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));

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


/// Get file type ///
  getfiletype(filename: any) {

    let icon: any;
    let iconsGroups: any = environment.iconsGroups;
    for (let i = 0; i < iconsGroups.length; i++) {
      let filetype: any = iconsGroups[i].groups.includes(filename);
      if (filetype == true) {
        icon = iconsGroups[i].name;
      }

    }
    return icon;

  }

/// Get file type ///

/// File size conversion ///

  formatBytes(bytes: any, decimals: any) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
/// File size conversion ///
swalfire(type: any, message: any) {
 return  Swal.fire({
          icon: type,
          text: message
          });

}

onSortClick(name:any,event:any,arraydetails:any) {
   
  let target = event.currentTarget,
    classList = target.classList;


  if (classList.contains('bi-arrow-up')) {
    classList.remove('bi-arrow-up');
    classList.add('bi-arrow-down');
    this.sortDir=-1;
  } else {
    classList.add('bi-arrow-up');
    classList.remove('bi-arrow-down');
    this.sortDir=1;
  }
  this.sortArr(name,arraydetails);
  
  //this.sortArr('departmentName');
}


sortArr(colName:any, filterarray:any){
   
  //this.sortColumn = colName;
  if (this.sortOrder == 'asc'){
   this.sortOrder = 'desc';
  }
 else{
   this.sortOrder = 'asc';
 }
 
    filterarray = filterarray.sort((a: any, b: any) => {
    
   if(this.sortOrder == 'asc'){
     return a[colName].localeCompare(b[colName], undefined, { numeric: true });
   }
   else{
     return b[colName].localeCompare(a[colName], undefined, { numeric: true });
   }

 })    
   
   // this.ffdetailsArr = this.ffdetailsArr.sort((a:any, b:any) => {
   //   if (a[colName] < b[colName])
   //     return this.sortOrder == 'asc' ? -1 : 1;
   //   if (a[colName] > b[colName])
   //     return this.sortOrder == 'asc' ? 1 : -1;
   //   return 0;
   // })
 
 
 }
 
   //\\ ======================== // Data sorting // ======================== //\\


}
