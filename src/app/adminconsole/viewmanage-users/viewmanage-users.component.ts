import { Component } from '@angular/core';

import {FormArray,FormBuilder, FormControlName,FormGroup,FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { HttpClient } from '@angular/common/http';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
@Component({
  selector: 'app-viewmanage-users',
  templateUrl: './viewmanage-users.component.html',
  styleUrls: ['./viewmanage-users.component.scss']
})
export class ViewmanageUsersComponent {
  public loading=false;

  manage_userslist : any;
  manage_userslistPreview : any=[];
  manage_users: FormGroup;
  siteUrl:any=environment.siteURL;
      page: number = 1;
      count: number = 0;
      tableSize: number = 10;
      pageSizes = [10, 20, 50,100,500,1000];
      utillist: any=[];
      activeDeactiveStatus:any=[];
    letterIdArray: any = [];
    funcName:any= "adminconsole/ManageUser/userActInact";
    jsonurl = "assets/js/_configs/viewManageUser.config.json";
  
    messaageslist: any;
  
  serviceURL = environment.serviceURL;
  title='Manage Users'
  fileURL=environment.serviceURL+'storage/';
  formName='admin_console/'
  constructor( private fb: FormBuilder,
                private route: Router,
                private router: ActivatedRoute, 
                private commonService:ConsoleservicesService,
                public vldChkLst : ValidatorchecklistService,
                private encDec:EncrypyDecrpyService,
                private httpClient: HttpClient
              ){
  
      this.manage_users = this.fb.group({
        intId:'',
        
              });
               }
    ngOnInit(): void {
        this.loadconfig();
        this.viewAllData();
      }
  
               loadconfig() {
                this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
                
                  // this.tablist = data[0].tabList;
                  this.utillist = data[0].utils;
                  console.log(data[0].utils);
                  this.messaageslist = data[0].messages;
                  this.title = this.multilingual(data[0].pagetitle);
                })
              }
  
  
  
  
              multilingual(test: any) {
                return test;
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
              this.commonService.viewAll(viewParams,'adminconsole/ManageUser/view').subscribe({
                next: (response) => {  
                  let respData = response.RESPONSE_DATA;
                  let respToken = response.RESPONSE_TOKEN;
                  let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
                  if (respToken == verifyToken) {
                  let res:any = Buffer.from(respData,'base64'); 
                  res = JSON.parse(res.toString());
                    if(res.status==200){
                    this.loading=false;
  
                        this.manage_userslist=res.result;
                        console.log(res.result);
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
    this.manage_userslistPreview = [];
    let viewParams={
      'intId':id,
     };
     this.loading=true;
     this.commonService.viewAll(viewParams,'adminconsole/ManageUser/preview').subscribe({
      next: (response) => { 
        
        let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
      let res:any = Buffer.from(respData,'base64'); 
      res = JSON.parse(res.toString());
        if(res.status==200){
          this.loading=false;

            this.manage_userslistPreview.push(res.result);
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
                      this.route.navigate(['/adminconsole/manage-users',encSchemeStr]);
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
              this.commonService.deleteRecord(viewParams,'adminconsole/ManageUser/delete').subscribe({
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
  
  
          selectAll(e: any) {
            let checkBoxes = document.querySelectorAll('.rowCheck');
            // console.log(checkBoxes);
  
            if (e.target.checked) {
              for (let i = 0; i < checkBoxes.length; i++) {
        
                let ids = checkBoxes[i].id;
                this.letterIdArray.push(parseInt(ids));
                this.activeDeactiveStatus.push({ 'letterId': ids, 'activeDeactiveStatus': checkBoxes[i].getAttribute("activeDeactiveStatus") })
              }
        
              checkBoxes.forEach((ele: any) => ele.click());
              $(checkBoxes).prop('checked', true);
            }
            else {
        
              this.letterIdArray = [];
              this.activeDeactiveStatus = [];
              $(checkBoxes).prop('checked', false);
            }
          }
          nullidsArray() {
            this.letterIdArray = [];
          }
  
          onChange(checkid: any, e: any, activeDeactiveStatus: any) {
  
            if (e.target.checked) {
              if (!this.letterIdArray.includes(checkid)) {
                this.letterIdArray.push(checkid);
                this.activeDeactiveStatus.push({ 'letterId': checkid, 'activeDeactiveStatus': activeDeactiveStatus });
              }
            } else {
              let index = this.letterIdArray.indexOf(checkid);
              let indxAdd: number = 0;
              for (let mk of this.activeDeactiveStatus) {
                if (mk.letterId == checkid) {
                  this.activeDeactiveStatus.splice(indxAdd, 1);
                  break;
                }
              }
              this.letterIdArray.splice(index, 1);
            }
          }
  
  
  


            
}