import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControlName, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { Buffer } from 'buffer';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';

import * as CryptoJS from 'crypto-js';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
import { Location } from '@angular/common';
import { CommonServicesService } from 'src/app/services/common-services.service';


@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.scss']
})
export class ManageRoleComponent {
  public loading = false;

  manage_role: FormGroup;


  title = 'Manage Role'
  serviceURL = environment.serviceURL;
  itemID: any;

  selectedUtils: any = [];
  selectcheckbox: any = [];
  departmentsList:any=[]






  constructor(private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private commonService: ConsoleservicesService,
    public vldChkLst: ValidatorchecklistService,
    public translate: TranslateService,
    private encDec: EncrypyDecrpyService,
    private _location: Location,
    public commonserveiceweb: CommonServicesService,
  ) {



    this.manage_role = this.fb.group({
      intId: '',
      deptId:'0',
      txtRoleName: '',
      // chkDesignation: new FormArray([]),

    });

  }


  ngOnInit(): void {
    this.getDepartmentList()
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != '') {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.itemID = schemeArr[0];
      if (this.itemID > 0) {
        this.previewDetails(this.itemID);
      }
      let arrParam_ctrl_05022023032434 = {
        "method": "adminconsole/ManageRole/fillselDesignationList"
      }
      this.loading = false;






    }
  }








  /*
  |------------------------------------------------------------------------------
  |This function is used for submit data /Insert data in to database
  |------------------------------------------------------------------------------
  */
  submitForm() {

    let errFlag = 0;

    let txtRoleName = this.manage_role.value.txtRoleName;
    let deptId=this.manage_role.value.deptId;
    // let chkDesignation = this.manage_role.value.chkDesignation;
   if ((errFlag == 0) && (!this.vldChkLst.selectDropdown(deptId, `Department`,'deptId'))) {
      errFlag = 1;
    }


    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtRoleName, `Role Name Cannot be Blank!`,'txtRoleName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.minLength(txtRoleName, 2, `Role Name`,'txtRoleName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.maxLength(txtRoleName, 100, `Role Name`,'txtRoleName'))) {
      errFlag = 1;
    }

    // if ((errFlag == 0) && (!this.vldChkLst.BlankCheckRdoDropChk(chkDesignation, `Designation`))) {
    //   errFlag = 1;
    // }

    if (errFlag == 0) {
      this.loading = true;
      this.commonService.insertData(this.manage_role.value, 'adminconsole/ManageRole/addEdit').subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());

            if (res.status == 200) {
              this.loading = false;

              Swal.fire({

                text: 'Record Inserted Successfully',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.route.navigateByUrl('/adminconsole/viewmanage-role');
                this.manage_role.reset();
              })

            }
            else if (res.status == 401) {
              this.loading = false;

              Swal.fire({
                text: 'Role Name already exist!',
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
            }
            else if (res.status == 202) {
              this.loading = false;

              Swal.fire({
                text: 'Record Updated Successfully',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.route.navigateByUrl('/adminconsole/viewmanage-role');
                this.manage_role.reset();
              })
            }
            else {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                text: 'Something Went wrong',

              });
            }
          } else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: 'Unauthorized Response!!',
            });
          }
        },
        error: (msg) => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: 'Invalid Api ',

          });
        }
      })

    }
  }
  /*
  |------------------------------------------------------------------------------
  |This function is used for preview all data from database for preview button
  |------------------------------------------------------------------------------
  */
  previewDetails(id: any) {
    let viewParams = {
      'intId': id,
    };
    this.loading = true;
    this.commonService.viewAll(viewParams, 'adminconsole/ManageRole/preView').subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.loading = false;

            let dataResult = res.result;
            // this.selectedUtils=dataResult.intId;
          
            this.manage_role.patchValue({
              intId: this.itemID,
              deptId: dataResult.deptId,
              txtRoleName: dataResult.vchRolename,
              // chkDesignation: dataResult.vchRoleDesgn,


            });



          }
          else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: 'Something Went Wrong!',

            });
          }
        } else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: 'Unauthorized Response!!',
          });
        }
      },
      error: (msg) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: 'Invalid Api ',

        });
      }
    })


  }

  /*
  |------------------------------------------------------------------------------
  |This function is used for load and remove checked box array for Designation 
  |------------------------------------------------------------------------------
  */




    //\\ ======================== // get Department list wise data // ======================== //\\
    getDepartmentList() {
      let dataParam = {
        "deptId": "",
      };
      this.commonserveiceweb.loadDepartment(dataParam).subscribe({
        next: (response) => {   let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res: any = { 'status': 0, 'result': {} };
    
            res = Buffer.from(respData,'base64'); 
            let responseResult= JSON.parse(res)
        
        
        
              if (responseResult.status == '200') {
                this.departmentsList = responseResult.result;
        
              
        
             
              }
              else if(responseResult.status==501){
              
                Swal.fire({
                  icon: 'error',
                  text: 'Unauthorized Response!!',
                });
              }
            else{
              this.commonserveiceweb.swalfire('error',this.commonserveiceweb.langReplace(environment.somethingWrong))
            }
          }
          else{
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: 'Unauthorized Response!!',
            });
          }},
        error: (msg) => {
          Swal.fire({
            icon: 'error',
            text: 'Invalid Api ',
  
          });
       }
     })


      
    }
   //\\ ======================== // get Department list wise data // ======================== //\\


  onReset() {
    this.manage_role.reset();
  }
  onCancel() {
    this._location.back();
  }
}