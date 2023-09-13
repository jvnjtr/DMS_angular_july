import { Component } from '@angular/core';

import {FormArray,FormBuilder, FormControlName,FormGroup,FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';

import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
@Component({
  selector: 'app-viewmanage-employee-type',
  templateUrl: './viewmanage-employee-type.component.html',
  styleUrls: ['./viewmanage-employee-type.component.scss']
})
export class ViewmanageEmployeeTypeComponent {
  public loading=false;

manage_employee_typelist : any;
 manage_employee_typelistPreview : any=[];
manage_employee_type: FormGroup;

    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    pageSizes = [10, 20, 50,100,500,1000];


serviceURL = environment.serviceURL;
title='Manage Employee Type'
fileURL=environment.tempurl;
formName='manage_employee_type/' 
constructor( private fb: FormBuilder,
              private route: Router,
              private router: ActivatedRoute, 
              private commonService:ConsoleservicesService,
              public vldChkLst : ValidatorchecklistService,
              private encDec:EncrypyDecrpyService
            ){

    this.manage_employee_type = this.fb.group({
      intId:'',
      
            });
             }
  ngOnInit(): void {
      this.viewAllData();
             }
/*
|
|--------------------------------------------------------------
|View Function Starts 
|--------------------------------------------------------------
|
*/
      viewAllData()
        {
            let viewParams={
              'intId':0,
            
            };
            this.loading=true;

            this.commonService.viewAll(viewParams,'adminconsole/ManageEmployeeType/view').subscribe({
              next: (response) => {  
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                if (respToken == verifyToken) {
                let res:any = Buffer.from(respData,'base64'); 
                res = JSON.parse(res.toString());
                  if(res.status==200){
              this.loading=false;
  
                      this.manage_employee_typelist=res.result;
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
|
|--------------------------------------------------------------
|For Pagination
|--------------------------------------------------------------
|
*/         
    onTableDataChange(event: any) {
    this.page = event;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }         
/*
|
|--------------------------------------------------------------
|viewAll Function Starts for preview
|--------------------------------------------------------------
|
*/
previewDetails(id:any)   {
  this.manage_employee_typelistPreview = [];
  let viewParams={
    'intId':id,
   };
   this.loading=true;
   this.commonService.viewAll(viewParams,'adminconsole/ManageEmployeeType/preview').subscribe({
    next: (response) => {  
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                if (respToken == verifyToken) {
      let res:any = Buffer.from(respData,'base64'); 
      res = JSON.parse(res.toString());
        if(res.status==200){
          this.loading=false;
  
            this.manage_employee_typelistPreview.push(res.result);
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
|
|--------------------------------------------------------------
|Edit Function Starts 
|--------------------------------------------------------------
|
*/
                 editData(id:any)
                 {
                    let encSchemeStr = this.encDec.encText(id.toString());
                    this.route.navigate(['/adminconsole/manage-employee-type',encSchemeStr]);
                 }       
         

/*
|
|--------------------------------------------------------------
|Delete Function Starts 
|--------------------------------------------------------------
|
*/
        deleteData(id:any)
        {
            let viewParams = {
                'intId':id
           };
           Swal.fire({
            title: 'Are you sure?',
            text:  'You Want to Delete This Record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result:any) => {

            if (result.isConfirmed) {
            this.loading=true;
            this.commonService.deleteRecord(viewParams,'adminconsole/ManageEmployeeType/delete').subscribe({
              next: (response) => {  
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
              if (respToken == verifyToken) {
                let res:any = Buffer.from(respData,'base64');
                res = JSON.parse(res.toString());
              if(res.status==200){
            this.loading=false;

                Swal.fire(
                  'Deleted!',
                   'Successfully!',
                  'success'
                )
                this.viewAllData();
                
              }
              else{
                this.loading=false;
                Swal.fire({
                  icon: 'error',
                  text:  'Error In Database!',
                  
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
          })
        }
            
}