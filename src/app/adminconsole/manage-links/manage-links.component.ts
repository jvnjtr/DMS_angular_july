import { Component } from '@angular/core';

import {FormArray,FormBuilder, FormControlName,FormGroup,FormControl} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
import {Location} from '@angular/common';

 @Component({
  selector: 'app-manage-links',
  templateUrl: './manage-links.component.html',
  styleUrls: ['./manage-links.component.scss']
})
export class ManageLinksComponent {
  public loading=false;
  manage_links : FormGroup;
  title='Manage Links'
  serviceURL = environment.serviceURL;
  itemID:any;
  selParentLinklist : any ;
 constructor( private fb: FormBuilder,
              private route: Router,
              private router: ActivatedRoute,
              private commonService:ConsoleservicesService,
              public vldChkLst : ValidatorchecklistService,
              public translate: TranslateService,
              private encDec:EncrypyDecrpyService,
              private _location:Location
          ) { 

       
                   
            this.manage_links = this.fb.group({
                intId:'',
                selLinkType : 0 ,
                selParentLink : 0 ,
                txtLinkName : '',
                txtURL : '',
                txtCSSClass : '',
                txtSerialNo : 0,
                 
            });
            
          }

        
        ngOnInit(): void {
          let encSchemeId= this.router.snapshot.paramMap.get('id');
          if(encSchemeId != ''){
          let schemeStr = this.encDec.decText(encSchemeId);
          let schemeArr:any = schemeStr.split(':');
          this.itemID = schemeArr[0];
            if(this.itemID > 0){
             this. previewDetails(this.itemID);
            }

      let arrParam_ctrl_05042023115818 = {
        "method":"adminconsole/ManageLinksController/fillselParentLinkList"
        }
        this.loading=false;
        this.commonService.fillDropDown(arrParam_ctrl_05042023115818,"adminconsole/ManageLinksController/fillselParentLinkList").subscribe((response: any) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
          
          let res:any = Buffer.from(respData,"base64");
          res = JSON.parse(res.toString());
          this.loading=false;

          if(res.result.length > 0)
              {
                this.selParentLinklist = res.result;
            }
          }else{ this.loading=false;
            Swal.fire({
              icon: 'error',
              text: 'Unauthorized Response!!',
            });
          }
        });
          }
          }
         
/*
|------------------------------------------------------------------------------
|This function is used for submit data /Insert data in to database
|------------------------------------------------------------------------------
*/             
          submitForm(){
          let errFlag = 0; 
          let selLinkType = this.manage_links.value.selLinkType;
          let selParentLink = this.manage_links.value.selParentLink;
          let txtLinkName = this.manage_links.value.txtLinkName;
          let txtURL = this.manage_links.value.txtURL;
          let txtCSSClass = this.manage_links.value.txtCSSClass;
          let txtSerialNo = this.manage_links.value.txtSerialNo;
            
          if((errFlag == 0)  && (!this.vldChkLst.selectDropdown(selLinkType, `Link Type`))){
                                          errFlag = 1; 
                                        }
                                        if((errFlag == 0)  && (!this.vldChkLst.blankCheck(txtLinkName, `Link name cannot be blank`))){
                                          errFlag = 1; 
                                        }
                                        if((errFlag == 0)  && (!this.vldChkLst.blankCheck(txtURL, `Link URL cannot be blank`))){
                                          errFlag = 1; 
                                        }                            
          if((errFlag == 0) && (!this.vldChkLst.isNumberKey(txtSerialNo))){
                                            errFlag = 1; 
                                          }
                                          
        if(errFlag == 0){
        this.loading=true;
        this.commonService.insertData(this.manage_links.value,'adminconsole/ManageLinksController/addEdit').subscribe({
          next: (response) => {  
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if (respToken == verifyToken) {
            let res:any = Buffer.from(respData,'base64');
            res = JSON.parse(res.toString());  
            this.loading=false;

            if (res.status == 200) {
            
                  Swal.fire({
            
                      text: 'Record Inserted Successfully',
                      icon: 'success',
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'Ok'
                    }).then((result) => {
                      this.route.navigateByUrl('/adminconsole/viewmanage-links');
                           this.manage_links.reset();
                    })
                  
                 }
                 else if(res.status == 202){
                 
                  Swal.fire({
                    text: 'Record Updated Successfully',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                  }).then((result) => {
                    this.route.navigateByUrl('/adminconsole/viewmanage-links');
                           this.manage_links.reset();
                  })
                 }
                 else{
                  this.loading=false;
                   Swal.fire({
                     icon: 'error',
                     text:'Something Went wrong',
                     
                   });
                 }
                }else{
                  
                  this.loading=false;
                  Swal.fire({
                    icon: 'error',
                    text: 'Unauthorized Response!!',
                  });
                }
          },
          error: (msg) => {
          this.loading=false;
            Swal.fire({
              icon: 'error',
               text: 'Invalid Api ',
              
            });
          }
          })
              
            }}
/*
|------------------------------------------------------------------------------
|This function is used for preview all data from database for preview button
|------------------------------------------------------------------------------
*/         
           previewDetails(id:any)   {
            let viewParams={
              'intId':id,
             };
              this.loading=true;
              this.commonService.viewAll(viewParams,'adminconsole/ManageLinksController/preView').subscribe({
                next: (response) => { 
                  let respData = response.RESPONSE_DATA;
                  let respToken = response.RESPONSE_TOKEN;
                  let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                  if (respToken == verifyToken) {
                  let res:any = Buffer.from(respData,'base64'); 
                  res = JSON.parse(res.toString());
            this.loading=false;
    
                    if(res.status==200){
                        let dataResult=res.result;
                        this.manage_links.patchValue({
                         intId:this.itemID,  
                         selLinkType:dataResult.intLinkType,
                         selParentLink:dataResult.intParentLinks,
                         txtLinkName:dataResult.vchLinkName,
                         txtURL:dataResult.vchUrl,
                         txtCSSClass:dataResult.vchCssClass,
                         txtSerialNo:dataResult.intslNo,
                        });
                      }
                      else{
                        this.loading=false;
                        Swal.fire({
                          icon: 'error',
                          text: 'Something Went Wrong!',
                        }); 
                      }
                    }else{
                      this.loading=false;
                      Swal.fire({
                        icon: 'error',
                        text: 'Unauthorized Response!!',
                      });
                    } 
                },
                error: (msg) => {
                this.loading=false;
                  Swal.fire({
                    icon: 'error',
                     text: 'Invalid Api ',
                    
                  });
                }
                })
           
            
            }
/*
|------------------------------------------------------------------------------
|This function is used for file upload
|------------------------------------------------------------------------------
*/          
 
          validateFileSize(file:any,filesize:any,filesizeType:any){

          }

          onReset(){
            this.manage_links.reset();
        }
        onCancel(){
         this._location.back();
        }
}