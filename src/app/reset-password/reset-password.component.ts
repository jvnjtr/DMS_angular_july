import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';
import { AutoFocus } from '../auto-focus';
import { EncrypyDecrpyService } from '../services/encrypy-decrpy.service';
import { ValidatorchecklistService } from '../services/validatorchecklist.service';
import { CommonServicesService } from '../services/common-services.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  siteUrl = environment.siteURL;
  password: any = 'password';
  UserId: any = '';
  Password: any = null;
  cnfPassword: any = null;
  loading: any = false;
  show = false;
  config: any=false;
  constructor(public router: Router,
    private authentication: AuthenticationService,
    private routerA: ActivatedRoute,
    private encDec: EncrypyDecrpyService,
    public vldChkLst: ValidatorchecklistService,
    public commonserveice: CommonServicesService,
  ) { }

  ngOnInit(): void {
    let encSchemeId = this.routerA.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.UserId = schemeArr[0];
      
    }
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
  doVerify(){

  }
  onReset(){
    
  }
  resetPassword(){
    let userId=this.UserId;
    let newpass=this.Password;
    let confpass=this.cnfPassword;
    
    if (newpass == '' || typeof (newpass) == undefined || newpass == null) {

      Swal.fire({
        icon: 'error',
        text: 'Enter New Password',

      });
    }

    else if (confpass == '' || typeof (confpass) == undefined || confpass == null) {

      Swal.fire({
        icon: 'error',
        text: 'Enter Confirm Password'
      });
    }


    else if(newpass !== confpass){
      Swal.fire({
        icon: 'error',
        text: 'Password & Confirm Password Did not Match'
      });
     
    }
    else{
    
       let formParams = {
       
        "userId":userId,
        "new_password":newpass,   
        "new_confirm_password":confpass   
        };
      
    //  console.log(formParams) 
    this.commonserveice.resetPassword(formParams).subscribe({
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
  //\\ ======================== // Do Login // ======================== //\\

}
