import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControlName, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage-department.component.html',
  styleUrls: ['./manage-department.component.scss']
})
export class ManageDepartmentComponent {
  public loading = false;

  manage_department: FormGroup;


  title = 'Manage Department'
  serviceURL = environment.serviceURL;
  itemID: any;





  constructor(private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private commonService: ConsoleservicesService,
    public vldChkLst: ValidatorchecklistService,
    public translate: TranslateService,
    private encDec: EncrypyDecrpyService,
    private _location: Location,
  ) {


    this.manage_department = this.fb.group({
      intId: '',
      txtDepartmentName: '',
      txtAliasName: '',
    });

  }


  ngOnInit(): void {
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != '') {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.itemID = schemeArr[0];
      if (this.itemID > 0) {
        this.previewDetails(this.itemID);
      }
    }
  }








  /*
  |------------------------------------------------------------------------------
  |This function is used for submit data /Insert data in to database
  |------------------------------------------------------------------------------
  */
  submitForm() {

    let errFlag = 0;

    let txtDepartmentName = this.manage_department.value.txtDepartmentName;
    let txtAliasName = this.manage_department.value.txtAliasName;


    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtDepartmentName, `Department Name Cannot be Blank!`,'txtDepartmentName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.minLength(txtDepartmentName, 2, `Department Name`,'txtDepartmentName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.maxLength(txtDepartmentName, 100, `Department Name`,'txtDepartmentName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.minLength(txtAliasName, 2, `Alias Name`,'txtAliasName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.maxLength(txtAliasName, 10, `Alias Name`,'txtAliasName'))) {
      errFlag = 1;
    }

    if (errFlag == 0) {
      this.loading = true;





      this.commonService.insertData(this.manage_department.value, 'adminconsole/ManageDepartment/addEdit').subscribe({
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
                this.route.navigateByUrl('/adminconsole/viewmanage-department');
                this.manage_department.reset();
              })

            } else if (res.status == 401) {
              this.loading = false;

              Swal.fire({
                text: 'Department Name already exist!',
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
                this.route.navigateByUrl('/adminconsole/viewmanage-department');
                this.manage_department.reset();
              })
            }
            else {
              Swal.fire({
                icon: 'error',
                text: 'Something Went wrong',

              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Unauthorized Response!!',
            });
          }
        },
        error: (msg) => {
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

    this.commonService.viewAll(viewParams, 'adminconsole/ManageDepartment/preView').subscribe({
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
            this.manage_department.patchValue({
              intId: this.itemID,
              txtDepartmentName: dataResult.vchDeptName,
              txtAliasName: dataResult.vchAliasName,


            });



          }
          else {
            Swal.fire({
              icon: 'error',
              text: 'Something Went Wrong!',

            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Unauthorized Response!!',
          });
        }
      },
      error: (msg) => {
        Swal.fire({
          icon: 'error',
          text: 'Invalid Api ',

        });
      }
    })





  }



  onReset() {
    this.manage_department.reset();
  }
  onCancel() {
    this._location.back();
  }

}