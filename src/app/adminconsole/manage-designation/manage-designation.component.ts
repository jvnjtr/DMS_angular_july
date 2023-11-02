import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControlName, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { Buffer } from 'buffer';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
import { Location } from '@angular/common';





@Component({
  selector: 'app-manage-designation',
  templateUrl: './manage-designation.component.html',
  styleUrls: ['./manage-designation.component.scss']
})
export class ManageDesignationComponent {
  public loading = false;
  manage_designation: FormGroup;


  title = 'Manage Designation'
  serviceURL = environment.serviceURL;
  itemID: any;





  constructor(private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private commonService: ConsoleservicesService,
    public vldChkLst: ValidatorchecklistService,
    public translate: TranslateService,
    private encDec: EncrypyDecrpyService,
    private _location: Location
  ) {



    this.manage_designation = this.fb.group({
      intId: '',

      txtDesignationName: '',
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

    let txtDesignationName = this.manage_designation.value.txtDesignationName;
    let txtAliasName = this.manage_designation.value.txtAliasName;


    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtDesignationName, `Designation Name Cannot be Blank!`,'txtDesignationName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.minLength(txtDesignationName, 2, `Designation Name`,'txtDesignationName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.maxLength(txtDesignationName, 100, `Designation Name`,'txtDesignationName'))) {
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

      this.commonService.insertData(this.manage_designation.value, 'adminconsole/ManageDesignation/addEdit').subscribe({
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
                this.route.navigateByUrl('/adminconsole/viewmanage-designation');
                this.manage_designation.reset();
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
                this.route.navigateByUrl('/adminconsole/viewmanage-designation');
                this.manage_designation.reset();
              })
            }
            else if (res.status == 401) {
              this.loading = false;

              Swal.fire({
                text: 'Designation Name already exist!',
                icon: 'warning',
                confirmButtonText: 'Ok'
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
    this.commonService.viewAll(viewParams, 'adminconsole/ManageDesignation/preView').subscribe({
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
            this.manage_designation.patchValue({
              intId: this.itemID,
              txtDesignationName: dataResult.vchDesignation,
              txtAliasName: dataResult.vchAliasName,


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
            text: 'Unauthorised Response!!',
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




  onReset() {
    this.manage_designation.reset();
  }
  onCancel() {
    this._location.back();
  }
}