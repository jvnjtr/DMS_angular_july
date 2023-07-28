import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticate = false;
  sessiontoken:any;
  token:any;
  authorization:any;
  //serviceURL = environment.serviceURL;



  
  constructor(private router: Router, private http: HttpClient) {


  }



  logindetails(params:any): Observable<any> {
    let requestParam = Buffer.from(JSON.stringify(params), 'utf8').toString('base64');
    let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
    let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
    let serviceURL = environment.serviceURL + 'manage_login/userLogin';
    let loginResponse = this.http.post(serviceURL, reqData);
    return loginResponse;
  }

  public isLoggedIn() {
        return sessionStorage.getItem('ADMIN_SESSION') !== null;
  }
  
 public logout(params:any): Observable<any> {

  let requestParam = Buffer.from(JSON.stringify(params), 'utf8').toString('base64');
  let requestToken = CryptoJS.HmacSHA256(requestParam, environment.apiHashingKey).toString();
  let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
  let serviceURL = environment.serviceURL + 'manage_login/userLogout';
  let logoutResponse = this.http.post(serviceURL, reqData);
  return logoutResponse;

    // sessionStorage.removeItem('ADMIN_SESSION');
    // sessionStorage.removeItem('TOKEN');
    
  }

  public directlogout(){
      sessionStorage.removeItem('ADMIN_SESSION');
      sessionStorage.removeItem('TOKEN');
       sessionStorage.removeItem('USER_LANGPREF');
        sessionStorage.removeItem('ALL_LANG_LIST');
       
      this.router.navigateByUrl('/login');
  }

}
