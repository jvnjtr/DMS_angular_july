import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-config-general',
  templateUrl: './config-general.component.html',
  styleUrls: ['./config-general.component.scss']
})
export class ConfigGeneralComponent implements OnInit {

  //\\ ======================== // Variables // ======================== //\\
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/general.config.json";
  letterID: any = "";
  files_dropped: File[] = [];
  loading: any = false;

  metaid: any = '';
  metalist: any = [];
  langKey: any = 'en';


  txtSessionTime: any = "";
  txtWelcomemsg: any = "";
  txtMaxusers: any = "";
  txtMaxsize: any = "";
  configId:any=0;
  sessiontoken: any;
  roleId:any;
  config:any;
  userMessage:any;
  messagesToUser:any;
  showTouser:any=false
  //\\ ======================== // Variables // ======================== //\\

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public vldChkLst: ValidatorchecklistService
  ) { }

  ngOnInit(): void {
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    //console.log(SeetionParsed)
    this.roleId = SeetionParsed.ROLE_ID;
    this.config = SeetionParsed.CONFIG;
    
    this.loadconfig();
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.metaid = schemeArr[0];


    }
  this.getConfigGeneral();
  }
  //\\ ======================== // Config // ======================== //\\
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
        this.tablist = data[0].tabList;
        this.utillist = data[0].utils
        this.messaageslist = data[0].messages;
        this.title = data[0].pagetitle;

      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
 
    if(this.roleId > 1 && this.config==false){
      this.messagesToUser=this.commonserveice.langReplace("General Has Not Been Set, Please Contact To Administrator");
      this.showTouser=false;
    }else{
      this.showTouser=true;
    }

  }
  //\\ ======================== // Config // ======================== //\\




  //\\ ======================== // Reset Form // ======================== //\\
  formReset() {
    this.txtSessionTime = "";
    this.txtWelcomemsg= "";
    this.txtMaxusers= "";
    this.txtMaxsize= "";
  }
  //\\ ======================== // Reset Form // ======================== //\\



  //\\ ======================== // Create Meta // ======================== //\\
  createConfigGeneral() {

    let txtSessionTime = this.txtSessionTime;
    let txtWelcomemsg = this.txtWelcomemsg;
    let txtMaxusers = this.txtMaxusers;
    let txtMaxsize = this.txtMaxsize;
    if (!this.vldChkLst.blankCheck(txtMaxsize, this.commonserveice.langReplace(this.messaageslist.maxSize), 'txtMaxsize')) { 

    }else if(!this.vldChkLst.blankCheck(txtMaxusers, this.commonserveice.langReplace(this.messaageslist.maxUser), 'txtMaxusers')){

    }else if(!this.vldChkLst.blankCheck(txtWelcomemsg, this.commonserveice.langReplace(this.messaageslist.welcomeMessage), 'txtWelcomemsg')){

    }else if(!this.vldChkLst.blankCheck(txtSessionTime, this.commonserveice.langReplace(this.messaageslist.sessionTime), 'txtSessionTime')){
    }
    else{
      let metaparams={
        "configId":this.configId,
        "maxSize":txtMaxsize,
        "maxUser":txtMaxusers,
        "welcomeMessage":txtWelcomemsg,
        "sessionTimeOut":txtSessionTime
      }
      this.loading=true;
      this.commonserveice.setGeneralConfiguration(metaparams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
    
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult = JSON.parse(res)
        
          if (responseResult.status == 200) {
            this.loading=false;
             Swal.fire({
                
              text: this.commonserveice.langReplace(this.messaageslist.successMsgAfterAdd),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              
              this.authService.directlogout();
            })
  
          }
  
          else if(responseResult.status == 202){
  
            this.loading=false;
           
            Swal.fire({
                
              text: this.commonserveice.langReplace(this.messaageslist.successMsgAfterUpdate),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              
              this.authService.directlogout();
            })
  
           }
           else if(responseResult.status==501){
          
            this.authService.directlogout();
          }
           else if(responseResult.status == 400){
  
            this.loading=false;
            this.commonserveice.swalfire('error',responseResult.message.metaName[0])
            }
           else{
            this.loading=false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
          
           }
        }
        else{
          this.loading = false;
          this.authService.directlogout();
        }
        },
        error: (msg) => {
             this.authService.directlogout();
       }
     })

  }
  }
  //\\ ======================== // Create Meta // ======================== //\\
  getConfigGeneral(){
    let metaparams={
      "configId":this.configId,
    }
    this.loading=true;
    this.commonserveice.getGeneralConfiguration(metaparams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
  
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
      
        if (responseResult.status == 200) {
          this.loading=false;
          console.log(responseResult.result);
          this.configId=responseResult.result.configId;
          this.txtMaxsize=responseResult.result.maxSize;
          this.txtMaxusers=responseResult.result.maxUser;
          this.txtWelcomemsg=responseResult.result.welcomeMessage;
          this.txtSessionTime=responseResult.result.sessionTimeOut;
        }

        else if(responseResult.status == 202){

          this.loading=false;
         
          Swal.fire({
              
            text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            
            this.formReset();
            this.route.navigate(['/admin/viewMeta'])
          })

         }
         else if(responseResult.status==501){
        
          this.authService.directlogout();
        }
         else if(responseResult.status == 400){

          this.loading=false;
          this.commonserveice.swalfire('error',responseResult.message.metaName[0])
          }
         else{
          this.loading=false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
        
         }
      }
      else{
        this.loading = false;
        this.authService.directlogout();
      }
      },
      error: (msg) => {
           this.authService.directlogout();
     }
   })
  }
}
