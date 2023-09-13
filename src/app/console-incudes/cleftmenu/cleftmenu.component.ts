import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';

import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-cleftmenu',
  templateUrl: './cleftmenu.component.html',
  styleUrls: ['./cleftmenu.component.scss']
})
export class CleftmenuComponent implements OnInit {
  siteUrl = environment.siteURL;
  currentYear: number = new Date().getFullYear();
  arrAllFormDetails:any;
  moduleNames:any;
  txtModuleId:any;
  formNames:any;
menulist:any;
logotitle:any;
websitedetails:any;
logoimg:any;
clicked:boolean=false;
sessiontoken:any='';
userRole:any='';

userPermissionDetails: any;
userPermissionlistAll:any=[];
admin_privilege: any;  //1--for default   2--for Admin(when check)   3--for User(when uncheck)
userId: any;


  constructor(


    private route: Router,
    private router : ActivatedRoute,
     public encDec : EncrypyDecrpyService
  ) { }

  ngOnInit(): void {
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    this.userRole = SeetionParsed.USER_ROLE;
    this.userId= SeetionParsed.USER_ID;
    this.admin_privilege= SeetionParsed.ADMIN_PRIVILEGE;
  
    this.userPermissionDetails= SeetionParsed.USER_PERMISSION;

    // console.log("SessionData----");
    // console.log(this.userPermissionDetails);

    this.userPermissionDetails.forEach((ele: any) => {
      this.userPermissionlistAll[ele.moduleid] = {ele};
    });

    this.userPermissionDetails.forEach((ele: any) => {
      this.userPermissionlistAll[ele.intLinkId] = {ele};
    });




  }
  navigatetopage(pid:any,submenuid:any){
    let formParms  = pid+':'+0+':'+0+":"+this.userRole;
    let encSchemeStr = this.encDec.encText(formParms.toString());
     $('.dropdown-item').removeClass('active') 
     $('#'+submenuid).addClass('active') 
     this.route.navigate(['./admin/configuration/dynamicForms',encSchemeStr]);
  }

  //  getModFormName(){
  
  //   let formParams = 
  //     {

  //       "formType":'master',
  //         "adminApplication":"1",
  //       "websiteApplication":""

  //      };
    
  //   this.commonService.getModFormName(formParams).subscribe((res:any)=>{
    
  //     if(res.status == 200){
  //       this.menulist=res.result;

  //     }
  //     else{
  //      console.log(res.messages)
  //      }
  //      });
  //  }
  //  bindLogo(){

  //   let logoParams = {
  //     "tinType":3, 
  //    };
  //   this.commonService.getLogo(logoParams).subscribe((res:any) => {
  //     if(res.status == 200)
  //       {

  //         this.websitedetails = res.result;
  //     //  console.log(this.websitedetails)
  //         this.logoimg=this.websitedetails.vchLogo;
  //         this.logotitle=this.websitedetails.vchHeading;
         
         
  //       }
  // });
  // }

  viewFormApplication(formId: any) {
    //application-summary
    let encSchemeStr = this.encDec.encText(formId.toString());
    if(this.userRole == 0)
      {
        this.route.navigate([
          '/admin/application/application-summary',
          encSchemeStr,
        ]);
      }
   else
      {
        this.route.navigate([
          '/admin/application/pending-application',
          encSchemeStr,
        ]);
      }
  }
  viewModeWiseData(formId: any){
    // let encSchemeStr = this.encDec.encText(formId.toString());
    this.route.navigate([
      '/admin/application/modewise-view'
    ]);

  }

  viewEmail(formId: any){
    // let encSchemeStr = this.encDec.encText(formId.toString());
    this.route.navigate([
      '/admin/application/view-email'
    ]);

  }



  viewModule(moduleId:any): boolean{
    if(this.admin_privilege == 2 || this.admin_privilege == 1){
        return true;
    }
    else if( this.userPermissionlistAll[moduleId]!=undefined && this.userPermissionlistAll[moduleId]!=null)
      {
       return true;
      }
      else
      {
        return false;
      }
   
  }

  viewProcess(processId:any): boolean{
    if(this.admin_privilege == 2 || this.admin_privilege == 1){
      return true;
  }
  else if( this.userPermissionlistAll[processId]!=undefined && this.userPermissionlistAll[processId]!=null)
    {
     return true;
    }
    else
    {
      return false;
    }
  }

  viewStaticModule(staticModuleId:any){
   if(this.admin_privilege == 2 || this.admin_privilege == 1){
        return true;
    }
    else if( this.userPermissionlistAll[staticModuleId]!=undefined && this.userPermissionlistAll[staticModuleId]!=null)
      {
       return true;
      }
      else
      {
        return false;
      }
   
  }

  viewStaticProcess(staticProcessId:any){
    if(this.admin_privilege == 2 || this.admin_privilege == 1){
      return true;
      }
    else if( this.userPermissionlistAll[staticProcessId]!=undefined && this.userPermissionlistAll[staticProcessId]!=null)
    {
     return true;
    }
    else
    {
      return false;
    }

  }


}
