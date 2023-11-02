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
  selector: 'app-manage-employee-type',
  templateUrl: './manage-employee-type.component.html',
  styleUrls: ['./manage-employee-type.component.scss']
})
export class ManageEmployeeTypeComponent {
  public loading=false;

manage_employee_type : FormGroup;


  title='Manage Employee Type'
  serviceURL = environment.serviceURL;
  itemID:any;
  
  
  
  
  
constructor( private fb: FormBuilder,
  private route: Router,
  private router: ActivatedRoute,
  private commonService:ConsoleservicesService,
  public vldChkLst : ValidatorchecklistService,
  public translate: TranslateService,
  private encDec:EncrypyDecrpyService,
  private _location:Location
          ) { 

            translate.addLangs(['English','Hindi','Odia']);
            if (localStorage.getItem('locale')) {
              const browserLang:any = localStorage.getItem('locale');
              translate.use(browserLang.match(/English|Hindi|Odia/) ? browserLang : '');
            } else {
              localStorage.setItem('locale', 'English');
              translate.setDefaultLang('English');
            }
                   
            this.manage_employee_type = this.fb.group({
                intId:'',
                
            txtEmployeeType : '',
            txtAliasName : '',
                            
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
            
            
            
             
                 
            }
          }
          
                      
          
          
          
          
          
          
/*
|------------------------------------------------------------------------------
|This function is used for submit data /Insert data in to database
|------------------------------------------------------------------------------
*/             
          submitForm(){

           let errFlag = 0;
            
 let txtEmployeeType = this.manage_employee_type.value.txtEmployeeType;
 let txtAliasName = this.manage_employee_type.value.txtAliasName;

            
if((errFlag == 0)  && (!this.vldChkLst.blankCheck(txtEmployeeType, `Employee Type Cannot be Blank!`,'txtEmployeeType'))){
                                errFlag = 1; 
                              }
                              
if((errFlag == 0) && (!this.vldChkLst.minLength(txtEmployeeType, 2,`Employee Type`,'txtEmployeeType'))){
                                errFlag = 1; 
                              }
                              
if((errFlag == 0) && (!this.vldChkLst.maxLength(txtEmployeeType, 100,`Employee Type`,'txtEmployeeType'))){
                                errFlag = 1; 
                              }
                              
if(errFlag == 0){
this.loading=true;
this.commonService.insertData(this.manage_employee_type.value,'adminconsole/ManageEmployeeType/addEdit').subscribe({
  next: (response) => {  
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if (respToken == verifyToken) {
    let res:any = Buffer.from(respData,'base64');
    res = JSON.parse(res.toString());  

    if (res.status == 200) {
      this.loading=false;

    
          Swal.fire({
    
              text: 'Record Inserted Successfully',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              this.route.navigateByUrl('/adminconsole/viewmanage-employee-type');
                   this.manage_employee_type.reset();
            })
          
         }
         else if(res.status == 401){
            this.loading=false;
         
          Swal.fire({
            text: 'Employee Type already exist!',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
         }
         else if(res.status == 202){
            this.loading=false;
         
          Swal.fire({
            text: 'Record Updated Successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            this.route.navigateByUrl('/adminconsole/viewmanage-employee-type');
                   this.manage_employee_type.reset();
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
                  this.commonService.viewAll(viewParams,'adminconsole/ManageEmployeeType/preView').subscribe({
                    next: (response) => { 
                      let respData = response.RESPONSE_DATA;
                      let respToken = response.RESPONSE_TOKEN;
                      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                      if (respToken == verifyToken) {
                      let res:any = Buffer.from(respData,'base64'); 
                      res = JSON.parse(res.toString());
                        if(res.status==200){
                        this.loading=false;
        
                            let dataResult=res.result;
                            this.manage_employee_type.patchValue({
                             intId:this.itemID,  
                             txtEmployeeType:dataResult.vchEmpType,
                            txtAliasName:dataResult.vchAliasName,
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
            
            
          

          onReset(){
            this.manage_employee_type.reset();
        }
        onCancel(){
         this._location.back();
        }  
}