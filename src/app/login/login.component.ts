import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { AutoFocus } from '../auto-focus';
import { ValidatorchecklistService } from '../services/validatorchecklist.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  siteUrl = environment.siteURL;
  password: any = 'password';
  UserId: any = '';
  Password: any = null;
  loading: any = false;
  show = false;
  config: any=false;
  constructor(public router: Router,
    private authentication: AuthenticationService,
    public validation: ValidatorchecklistService
  ) { }

  ngOnInit(): void {
  }

  //\\ ======================== // Password Toggle // ======================== //\\
  toggleFieldTextType() {
    if (this.password == 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }

  }
  //\\ ======================== // Password Toggle // ======================== //\\
  //\\ ======================== // Do Login // ======================== //\\
  doLogin() {
    let userId = this.UserId;
    let password = this.Password;
    if (userId == '' || typeof (userId) == undefined || userId == null) {

      Swal.fire({
        icon: 'error',
        text: 'Enter User Id',

      });
    }

    else if (password == '' || typeof (password) == undefined || password == null) {

      Swal.fire({
        icon: 'error',
        text: 'Enter Password'
      });
    }
    else {
      this.loading = true;
      let loginParam = {
        "userName": userId,
        "passWord": password,

      };


      this.authentication.logindetails(loginParam).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          let res: any = { 'status': 0, 'result': {} };
          if (respToken == verifyToken) {
            res = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)
             console.log(responseResult);
            if (responseResult.status == 200) {


              this.loading = false;
              let result = responseResult.result;

              let profileId = result.userId;
              let appName = result.userFullName;
              let appEmailid = result.userEmail;
              let accesstoken = result.access_token;
              let tokentype = result.token_type;
              let desgId = result.desgId;
              let desgName = result.desgName;
              let roleId = result.roleId;
              let roleName = result.roleName;
              let config = result.generalConfiguration;
              this.config=result.generalConfiguration;
              let leftMenu=result.leftMenu;
              let headerMenu=result.headerMenu;
              // this.menuPermission=result.menuPermissions;

              let userSesnArr: any = {};
              userSesnArr["USER_LOGINID"] = profileId
              userSesnArr["USER_ID"] = profileId;
              userSesnArr["USER_NAME"] = appName;
              userSesnArr["USER_EMAIL"] = appEmailid;
              userSesnArr["DESG_ID"] = desgId;
              userSesnArr["DESG_NAME"] = desgName;
              userSesnArr["ROLE_ID"] = roleId;
              userSesnArr["CONFIG"] = config;
              userSesnArr["LEFTMENU"] = leftMenu;
              userSesnArr["HEADERMENU"] = headerMenu;
              userSesnArr["ROLE_NAME"] = roleName;
              userSesnArr["TOKEN"] = accesstoken;
              userSesnArr["AUTHORIZATION"] = tokentype;
              sessionStorage.setItem('ADMIN_SESSION', CryptoJS.AES.encrypt(JSON.stringify(userSesnArr), environment.apiHashingKey).toString());
              sessionStorage.setItem('TOKEN', accesstoken);
              //sessionStorage.setItem('ADMIN_SESSION', JSON.stringify(userSesnArr));


            }
            else if (responseResult.status == 401) {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: responseResult.message
              });


            }
            else if (responseResult.status == 417) {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: responseResult.message,
                confirmButtonText: ('Logout'),
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  console.log(responseResult.result);
                  let token=responseResult.result.token;
                  let user=responseResult.result.userId;
                  this.InvalidThisToken(token, user);
                }
              });


            }
            else {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: "Incorrect User id && Password",
                confirmButtonText: ('Logout'),
              });

              this.Password = null;

            }


          } else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: "Incorrect User id && Password"
            });
          }
        },

        error: (msg) => {
          this.loading=false;
          Swal.fire({
            icon: 'error',
            text: "Error In api response "
          });


        },
        complete: () =>{
          if(this.config==false){
            this.router.navigateByUrl('/admin/generalconfig') 
          }else{
            this.router.navigateByUrl('/admin/dashboard') 
          }
        } 
      })



    }
  }
  //\\ ======================== // Do Login // ======================== //\\
  InvalidThisToken(token:any, user:any){
    let formParams = {
       
      "token":token,
      "userId":user
      };
    
  //  console.log(formParams) 
  this.authentication.InvalidThisToken(formParams).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
    
    
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult = JSON.parse(res)
            if(responseResult.status == 200){
              Swal.fire({
                icon: 'success',
                text: responseResult.message,
                
              })
              
              
            }
            else if(responseResult.status == 400){
              Swal.fire({
                icon: 'error',
                text: responseResult.message,
                
              });
            }
           
          }else{
           
            Swal.fire({
              icon: 'error',
              text: 'Error',
              
            });
          }
    }, error: (msg) => {
      this.loading=false;
      Swal.fire({
        icon: 'error',
        text: "Error In api response "
      });


    },
    complete: () =>{
      this.router.navigateByUrl('/login') 
    } 
   
 })
  }
}
