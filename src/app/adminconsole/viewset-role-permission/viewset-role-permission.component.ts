import { Component } from '@angular/core';

import {FormArray,FormBuilder, FormControlName,FormGroup,FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import {Buffer} from 'buffer';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
@Component({
  selector: 'app-viewset-role-permission',
  templateUrl: './viewset-role-permission.component.html',
  styleUrls: ['./viewset-role-permission.component.scss']
})
export class ViewsetRolePermissionComponent {
  public loading=false;

set_role_permissionlist : any;
 set_role_permissionlistPreview : any=[];
set_role_permission: FormGroup;

    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    pageSizes = [10, 20, 50,100,500,1000];
    rolename:any='';
    permission:any='';
    vchfullName:any='';



serviceURL = environment.serviceURL;
title='Set Role Permission'
fileURL=environment.tempurl;
formName='set_role_permission/' 
constructor( private fb: FormBuilder,
              private route: Router,
              private router: ActivatedRoute, 
              private commonService:ConsoleservicesService,
              public vldChkLst : ValidatorchecklistService,
              private encDec:EncrypyDecrpyService
            ){

    this.set_role_permission = this.fb.group({
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
          //alert("jj");
            let viewParams={
              'intId':0,
            
            };
            this.loading=true;

            this.commonService.viewAll(viewParams,'adminconsole/SetRolePermissionController/view').subscribe({
              next: (response) => {  
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let res:any = Buffer.from(respData,'base64'); 
                res = JSON.parse(res.toString());
              
                  if(res.status==200){
              this.loading=false;
              
                      this.set_role_permissionlist=res.result;
                      console.log(this.set_role_permissionlist);
                    }
                    else{
                      this.loading=false;
                      Swal.fire({
                        icon: 'error',
                        text: 'Something Went Wrong!',
                        
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

previewDetails(id:any,rolename:any,permission:any,userid:any,vchfullName:any)   {
  // console.log(id);
  this.set_role_permissionlistPreview = [];
  this.rolename=rolename;
  this.vchfullName=vchfullName;
  this.permission=permission;
  let viewParams={
    'roleId':id,
    'user':userid
   };
  
   this.loading=true;
   this.commonService.viewAll(viewParams,'adminconsole/SetRolePermissionController/preview').subscribe({
    next: (response) => {  
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res:any = Buffer.from(respData,'base64'); 
      res = JSON.parse(res.toString());
        // console.log(res);
        if(res.status==200){
          this.loading=false;
  
         
            //this.set_role_permissionlistPreview.push(res.result);
           this.set_role_permissionlistPreview=res.result;
             console.log(this.set_role_permissionlistPreview)
          }
          else{
            this.loading=false;
            Swal.fire({
              icon: 'error',
              text: 'Something Went Wrong!',
              
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
                    this.route.navigate(['/admin-console/set-role-permission',encSchemeStr]);
                 }       
         

/*
|
|--------------------------------------------------------------
|Delete Function Starts 
|--------------------------------------------------------------
|
*/
        deleteData(permissionfor:any,roleId:any,userId:any)
        {
            let viewParams = {
                'permissionfor':permissionfor,
                'roleId':roleId,
                'userId':userId
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
            this.commonService.deleteRecord(viewParams,'adminconsole/SetRolePermissionController/delete').subscribe({
              next: (response) => {  
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
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
