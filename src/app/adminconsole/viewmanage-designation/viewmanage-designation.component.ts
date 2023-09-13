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
  selector: 'app-viewmanage-designation',
  templateUrl: './viewmanage-designation.component.html',
  styleUrls: ['./viewmanage-designation.component.scss']
})
export class ViewmanageDesignationComponent {
public loading = false;
manage_designationlist : any;
manage_designationlistPreview : any=[];
manage_designation: FormGroup;

    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    pageSizes = [10, 20, 50,100,500,1000];


serviceURL = environment.serviceURL;
title='Manage Designation'
fileURL=environment.tempurl;
formName='manage_designation/' 
constructor( private fb: FormBuilder,
              private route: Router,
              private router: ActivatedRoute, 
              private commonService:ConsoleservicesService,
              public vldChkLst : ValidatorchecklistService,
              private encDec:EncrypyDecrpyService
            ){

    this.manage_designation = this.fb.group({
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
            this.commonService.viewAll(viewParams,'adminconsole/ManageDesignation/view').subscribe({
              next: (response) => {  
                this.loading=false;
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                if (respToken == verifyToken) {
                let res:any = Buffer.from(respData,'base64'); 
                res = JSON.parse(res.toString());
                  if(res.status==200){
                      this.manage_designationlist=res.result;
                    }
                    else{
                      this.loading=false;
                      Swal.fire({
                        icon: 'error',
                        text: 'Something Went Wrong!',
                        
                      }); 
                    } }else{
                      this.loading=false;
                      Swal.fire({
                        icon: 'error',
                        text: 'Unauthorised Response',
                      });
                    }
              },
              error: (msg) => {
              this.loading=false;
                Swal.fire({
                  icon: 'error',
                  text: msg,
                  
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
  this.manage_designationlistPreview = [];
  let viewParams={
    'intId':id,
   };
   this.loading = true;
   this.commonService.viewAll(viewParams,'adminconsole/ManageDesignation/preview').subscribe({
    next: (response) => {  
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                if (respToken == verifyToken) {
      let res:any = Buffer.from(respData,'base64'); 
      res = JSON.parse(res.toString());
        if(res.status==200){
      this.loading = false;
  
            this.manage_designationlistPreview.push(res.result);
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
            text: 'Unauthorised Response',
          });
        }
    },
    error: (msg) => {
    this.loading=false;
      Swal.fire({
        icon: 'error',
        text: msg,
        
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
                    this.route.navigate(['/adminconsole/manage-designation',encSchemeStr]);
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
           this.loading = true;
           this.commonService.deleteRecord(viewParams,'adminconsole/ManageDesignation/delete').subscribe({
            next: (response) => {  
              let respData = response.RESPONSE_DATA;
              let respToken = response.RESPONSE_TOKEN;
              let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
              if (respToken == verifyToken) {
              let res:any = Buffer.from(respData,'base64');
              res = JSON.parse(res.toString());
            if(res.status==200){
         this.loading = false;

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
              text: 'Unauthorised Response',
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