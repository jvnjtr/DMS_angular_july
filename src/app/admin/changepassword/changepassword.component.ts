import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { environment } from '../../../environments/environment';
import { CommonServicesService } from '../../services/common-services.service';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  sessiontoken:any;
  userLoginId:any;
  username:any;
  txtConPass:any=null;
  txtOldPass:any=null;
  txtNewPass:any=null
  show:any=false;
  password:any='password';

  nshow:any=false;
  npassword:any='password';
  cshow:any=false;
  cpassword:any='password';
  constructor( private route: Router,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService, 
   public vldChkLst: ValidatorchecklistService,
  public authService: AuthenticationService,
  
  ) { }

  ngOnInit(): void {
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 
let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
 
this.userLoginId=SeetionParsed.USER_LOGINID;
this.username=SeetionParsed.USER_NAME;




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
  toggleFieldNTextType() {
    if (this.npassword == 'password') {
      this.npassword = 'text';
      this.nshow = true;
    } else {
      this.npassword = 'password';
      this.nshow = false;
    }

  }
  toggleFieldCTextType() {
    if (this.cpassword == 'password') {
      this.cpassword = 'text';
      this.cshow = true;
    } else {
      this.cpassword = 'password';
      this.cshow = false;
    }

  }
//\\ ======================== // Password Toggle // ======================== //\\


  changePassword(){
    let username=this.username;
    let oldpass=this.txtOldPass;
    let newpass=this.txtNewPass;
    let confpass=this.txtConPass;
    
    if(!this.vldChkLst.blankCheck(oldpass,this.commonserveice.langReplace("Please Enter Current Password"),'txtOldPass')) {
      
    }
else if(!this.vldChkLst.blankCheck(newpass,this.commonserveice.langReplace("Enter New Password"),'txtNewPass')) {
      
    }

    else if(!this.vldChkLst.chkPassword(newpass)){
    
    }
    else if(!this.vldChkLst.blankCheck(confpass,this.commonserveice.langReplace("Enter Confirm Password"),'txtConPass')) {
    
    }

else if(!this.vldChkLst.chkPassword(confpass)){
    
}

    else if(newpass !== confpass){
      this.commonserveice.swalfire('error',this.commonserveice.langReplace('Enter New and Confirm Password not matched'))
     
    }
    else{
    
       let formParams = {
       
        "old_password":oldpass,
        "new_password":newpass,   
        "new_confirm_password":confpass   
        };
      
    //  console.log(formParams) 
    this.commonserveice.changePassword(formParams).subscribe({
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
                  text: this.commonserveice.langReplace('Your Password changed Successfully'),
                  
                }).then((result:any) => {
                  if (result.isConfirmed) {
                    this.resetform();
                    this.authService.directlogout();
                    
                  }
                });
                
                
              }
              else if(responseResult.status == 400){
                Swal.fire({
                  icon: 'error',
                  text: responseResult.message,
                  
                });
              }
              else if(responseResult.status==501){
                      
                this.authService.directlogout();
              }
              else{
                this.commonserveice.swalfire('error',this.commonserveice.langReplace('Enter Old Password Not Matched'))
              
              }
            }
            else{
             
              this.authService.directlogout();
            }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })



    }



  }
  resetform(){
    this.txtConPass=null;
    this.txtNewPass=null;
    this.txtOldPass=null;
  }

}
