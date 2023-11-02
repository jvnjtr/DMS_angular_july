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
import { EncrypyDecrpyService } from '../services/encrypy-decrpy.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  siteUrl = environment.siteURL;
  password: any = 'password';
  UserId: any = '';
  Password: any = null;
  loading: any = false;
  show = false;
  config: any = false;
  resUserId: any;
  resEmail: any;
  userIdEntry: any = true;
  userOtpEntry: any = false;
  userOtp: any = '';
  constructor(public router: Router,
    private authentication: AuthenticationService,
    public validation: ValidatorchecklistService,
    private encDec: EncrypyDecrpyService,
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
  doVerifyTest() {
    // this.router.navigate(['/forgotPasswordOtp']);
    // return false;
    let userId = this.UserId;
    if (userId == '' || typeof (userId) == undefined || userId == null) {

      Swal.fire({
        icon: 'error',
        text: 'Enter User Id',

      });
    } else {
      this.loading = true;
      let loginParam = {
        "userName": userId
      };


      this.authentication.checkUserId(loginParam).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          let res: any = { 'status': 0, 'result': {} };
          if (respToken == verifyToken) {
            res = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)

            if (responseResult.status == 200) {
              // alert();
              this.loading = false;
              //this.router.navigate(['/forgotPasswordOtp']);
              let result = responseResult.result;
              this.resUserId = responseResult.result.userId;
              this.resEmail = responseResult.result.emailId;
              this.userIdEntry = false;
              this.userOtpEntry = true;
              this.sendOtpToUserMail(this.resUserId, this.resEmail);
              //   console.log('ji');
            }
            else if (responseResult.status == 400) {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: responseResult.message
              });


            }
            else {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: "Incorrect User id"
              });

              this.UserId = null;

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
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: "Error In api response "
          });


        }
      })



    }
  }
  resendOtp() {
    this.loading = true;
    let loginParam = {
      "userId": this.resUserId,
      "email": this.resEmail
    };


    this.authentication.sendOtpToUserMail(loginParam).subscribe({
      next: (response) => {

        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        let res: any = { 'status': 0, 'result': {} };
        if (respToken == verifyToken) {
          res = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)
          // console.log(responseResult);
          if (responseResult.status == 200) {
            this.loading = false;
            let result = responseResult.result;
            this.userIdEntry = false;
            this.userOtpEntry = true;
          }
          else if (responseResult.status == 400) {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: responseResult.message
            });


          }
          else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: "Incorrect User id"
            });

            this.UserId = null;

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
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: "Error In api response "
        });


      }
    })
  }
  doVerifyOTP() {
    let userOtp = this.userOtp;
    if (userOtp == '' || typeof (userOtp) == undefined || userOtp == null) {

      Swal.fire({
        icon: 'error',
        text: 'Please Enter OTP',

      });
    } else if (userOtp.length < 6) {
      Swal.fire({
        icon: 'error',
        text: 'Invalid OTP',

      });
    } else {
      this.loading = true;
      let loginParam = {
        "userId": this.resUserId,
        "otp": this.userOtp
      };


      this.authentication.validateUserOtp(loginParam).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          let res: any = { 'status': 0, 'result': {} };
          if (respToken == verifyToken) {
            res = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)
            // console.log(responseResult);
            if (responseResult.status == 200) {
              this.loading = false;
              let result = responseResult.result;
              let reData:any= this.resUserId+':'+'0'
              let encSchemeStr = this.encDec.encText(reData.toString());
              this.router.navigate(['/resetPassword',encSchemeStr])
            }
            else if (responseResult.status == 400) {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: responseResult.message
              });


            }
            else {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: "Incorrect User id"
              });

              this.UserId = null;

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
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: "Error In api response "
          });


        }
      })
    }

  }
  sendOtpToUserMail(userId: any, email: any) {
    this.loading = true;
    let loginParam = {
      "userId": userId,
      "email": email
    };


    this.authentication.sendOtpToUserMail(loginParam).subscribe({
      next: (response) => {

        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        let res: any = { 'status': 0, 'result': {} };
        if (respToken == verifyToken) {
          res = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)
          // console.log(responseResult);
          if (responseResult.status == 200) {
            this.loading = false;
            let result = responseResult.result;
            this.userIdEntry = false;
            this.userOtpEntry = true;
          }
          else if (responseResult.status == 400) {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: responseResult.message
            });


          }
          else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: "Incorrect User id"
            });

            this.UserId = null;

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
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: "Error In api response "
        });


      }
    })
  }


  //\\ ======================== // Do Login // ======================== //\\
  onResetUserId() {
    this.resUserId = null;
    this.UserId = null;
    this.resEmail = null;
  }
  onResetOtp() {
    this.userOtp = null;
  }
}
