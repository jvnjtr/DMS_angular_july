import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControlName, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { TranslateService } from '@ngx-translate/core';
import { Buffer } from 'buffer';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-set-role-permission',
  templateUrl: './set-role-permission.component.html',
  styleUrls: ['./set-role-permission.component.scss']
})
export class SetRolePermissionComponent {
  public loading = false;

  set_role_permission: FormGroup;


  title = 'Set Role Permission'
  serviceURL = environment.serviceURL;
  itemID: any;

  selSelectRolelist: any;
  selAdministrativeHierarchylist: any;
  selSelectUserlist: any;
  newArr: any = [];
  letterIdArray: any = [];
  rolelist: any = [];
  selDepartmentlist:any=[];
  allMenuList: any;








  dataModel = {
    chkPermission: [
      {
        vchLinkName: '',
        intId: '',
        intLinkType: '',
        LinkValue: ''

      }

    ]
  }


  constructor(private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private commonService: ConsoleservicesService,
    public vldChkLst: ValidatorchecklistService,
    public translate: TranslateService,
    private encDec: EncrypyDecrpyService,
    private _location: Location
  ) {


    this.set_role_permission = this.fb.group({
      intId: '',

      selPermissionFor: 0,
      selDepartment:0,
      selSelectRole: 0,
      selAdministrativeHierarchy: 0,
      selSelectUser: 0,
      chkPermission: this.fb.array([])
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

this.getDepartments()



      // let arrParam_ctrl_05082023113654 = {
      //   "method":"adminconsole/SetRolePermissionController/fillselAdministrativeHierarchyList"
      //   }
      //   this.commonService.fillDropDown(arrParam_ctrl_05082023113654,"fillDropDown").subscribe((response: any) => {
      //     let respData = response.RESPONSE_DATA;
      //     let respToken = response.RESPONSE_TOKEN;
      //     let res:any = Buffer.from(respData,"base64");
      //     res = JSON.parse(res.toString());
      //     if(res.result.length > 0)
      //         {
      //           this.selAdministrativeHierarchylist = res.result;
      //       }
      //   });

      let arrParam_ctrl_05082023113830 = {
        "method": "adminconsole/SetRolePermissionController/fillselSelectUserList"
      }
      this.loading = false;

      this.commonService.fillDropDown(arrParam_ctrl_05082023113830, "adminconsole/SetRolePermissionController/fillselSelectUserList").subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res: any = Buffer.from(respData, "base64");
        res = JSON.parse(res.toString());
        this.loading = false;

        if (res.result.length > 0) {
          this.selSelectUserlist = res.result;
        }
      });




    }
  }








  /*
  |------------------------------------------------------------------------------
  |This function is used for submit data /Insert data in to database
  |------------------------------------------------------------------------------
  */
  submitForm() {

    let errFlag = 0;

    let selPermissionFor = this.set_role_permission.value.selPermissionFor;
    let selDepartment = this.set_role_permission.value.selDepartment;
    let selSelectRole = this.set_role_permission.value.selSelectRole;
    let selAdministrativeHierarchy = this.set_role_permission.value.selAdministrativeHierarchy;
    let selSelectUser = this.set_role_permission.value.selSelectUser;


    if ((errFlag == 0) && (!this.vldChkLst.selectDropdown(selPermissionFor, `Permission For`))) {
      errFlag = 1;
    }
    if ((errFlag == 0) && (selPermissionFor == '1') && (!this.vldChkLst.selectDropdown(selDepartment, `Select Department`))) {
      errFlag = 1;
    }
    if ((errFlag == 0) && (selPermissionFor == '1') && (!this.vldChkLst.selectDropdown(selSelectRole, `Select Role`))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (selPermissionFor == '2') && (!this.vldChkLst.selectDropdown(selSelectUser, `Select User`))) {
      errFlag = 1;
    }

    if (errFlag == 0) {
      this.loading = true;
      this.commonService.insertData(this.set_role_permission.value, 'adminconsole/SetRolePermissionController/addEdit').subscribe({
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
                this.route.navigateByUrl('/adminconsole/viewset-role-permission');
                this.set_role_permission.reset();
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
                this.route.navigateByUrl('/adminconsole/viewset-role-permission');
                this.set_role_permission.reset();
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
            text: msg,

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
    this.commonService.viewAll(viewParams, 'adminconsole/SetRolePermissionController/preView').subscribe({
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
            this.set_role_permission.patchValue({
              intId: this.itemID,
              selPermissionFor: dataResult.intForPermission,
              selSelectRole: dataResult.intRole,
              selAdministrativeHierarchy: dataResult.intHierarchy,
              selSelectUser: dataResult.intSelUser,


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
          text: msg,

        });
      }
    })


  }



  /*
  |------------------------------------------------------------------------------
  |This function is used for file upload
  |------------------------------------------------------------------------------
  */

  viewAllData(roleid: any, permissionfor: any) {
    let viewParams = {
      'intId': 0,
      'roleid': roleid,
      'permissionfor': permissionfor
    };
    this.loading = true;

    this.commonService.viewAll(viewParams, 'adminconsole/SetRolePermissionController/bindAllMenuLinks').subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.loading = false;


            this.allMenuList = res.result;

            this.dataModel.chkPermission = [];

            for (let i = 0; i < this.allMenuList.length; i++) {
              let obj: any = {}

              obj["vchLinkName"] = this.allMenuList[i].vchLinkName;
              obj["intId"] = this.allMenuList[i].intId;
              obj["intLinkType"] = this.allMenuList[i].intLinkType;
              obj["LinkValue"] = this.allMenuList[i].vchLinkValue;
              obj["viewManageRight"] = this.allMenuList[i].intViewManageRight;
              // obj["addManageRight"]=this.allMenuList[i].intadd;

              ;


              this.dataModel.chkPermission.push(obj);
              //  console.log(this.dataModel)
              let products = this.set_role_permission.get('chkPermission') as FormArray;
              //  console.log(this.allMenuList);
              products.push(this.fb.group({

                ["moduleid"]: this.allMenuList[i].moduleid,
                ["intLinkId"]: this.allMenuList[i].intId,
                ["LinkName"]: this.allMenuList[i].vchLinkName,
                ["LinkValue"]: this.allMenuList[i].vchLinkValue == 1 ? new FormControl(true) : new FormControl(false),
                ["addManageRight"]: this.allMenuList[i].intadd == 1 ? new FormControl(true) : new FormControl(false),
                ["viewManageRight"]: this.allMenuList[i].intViewManageRight == 1 ? new FormControl(true) : new FormControl(false),
                ["editManageRight"]: this.allMenuList[i].intEditRight == 1 ? new FormControl(true) : new FormControl(false),
                ["deleteManageRight"]: this.allMenuList[i].intDelete == 1 ? new FormControl(true) : new FormControl(false),
                ["publishManageRight"]: this.allMenuList[i].publish == 1 ? new FormControl(true) : new FormControl(false),
                ["Intall"]: this.allMenuList[i].intall == 1 ? new FormControl(true) : new FormControl(false),




              }));

            }



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
          text: msg,

        });
      }
    })



  }

  loadLinks(selSelectUser: any, permissionfor: any) {
this.allMenuList=[];
    let products = this.set_role_permission.get('chkPermission') as FormArray;
    products.clear()
    this.viewAllData(selSelectUser, permissionfor);
  }

  userloadLinks(selSelectUser: any, permissionfor: any) {
    this.allMenuList=[];
    let products = this.set_role_permission.get('chkPermission') as FormArray;
    products.clear()
    this.viewAllData(selSelectUser, permissionfor);
  }

  loadPerFor(selid: any) {

    this.allMenuList = [];
    this.dataModel.chkPermission = [];
    // this.set_role_permission.value.selSelectRole
    this.set_role_permission.controls['selSelectRole'].setValue('0');
    let products = this.set_role_permission.get('chkPermission') as FormArray;
    products.clear()
  }


  chkClick(cindex: any, e: any, intId: any) {

    let checkval = e.target.checked;
    let products = this.set_role_permission.get('chkPermission') as FormArray;
    if (checkval == true) {

      products.at(cindex).patchValue({ "viewManageRight": "1" });
      let x = (<HTMLInputElement>document.getElementById(intId + "_1"));

      x.checked = true;

    }
    else {
      products.at(cindex).patchValue({ "viewManageRight": "0" })
    }


  }

  checkClick(cindex: any, e: any) {


    let radioval = e.target.checked;

    let products = this.set_role_permission.get('chkPermission') as FormArray;

    products.at(cindex).patchValue({ "LinkValue": true });


  }
  checkchanged(e: any, i: any) {


    // this.rolelist[i].permission[pi].selected= e.target.checked;



    let totalCheckbox: any = document.querySelectorAll('#rolerow_' + i + ' .permissionChk').length;

    let totalChecked: any = document.querySelectorAll('#rolerow_' + i + ' .permissionChk:checked').length;

    // alert(totalCheckbox+"----"+totalChecked)



    // if(this.rolelist[i].permission[pi].selected == true){

    // $('#rolerow_'+i).find('.roleselectAll').prop('checked',false);



    // $('#rolerow_'+i).find('.chkrole').prop('checked',true);

    if (totalCheckbox == totalChecked) {

      $('#rolerow_' + i).find('.roleselectAll').prop('checked', true);

    }

    // }

    // else{





    // if(totalChecked == 0) {



    //  $('#rolerow_'+i).find('.chkrole').prop('checked',false);

    // } 

    else {

      $('#rolerow_' + i).find('.roleselectAll').prop('checked', false);

    }

    // }   





  }
  checkUncheckone(e: any, i: any, intLinkId: any) {
    const controladdMoreMilestonesetting = <FormArray>this.set_role_permission.controls['chkPermission'];

    console.log(e.target);
  }

  checkUncheckAll(e: any, i: any, intLinkId: any, LinkName: any, LinkValue: any) {


    const controladdMoreMilestonesetting = <FormArray>this.set_role_permission.controls['chkPermission'];
    // var obj: any = {};

    //         obj["intLinkId"] = intLinkId;
    //         obj["LinkName"] = LinkName;
    //         obj["LinkValue"] = "22";
    //         obj["addManageRight"] = true;
    //         obj["viewManageRight"] = true;
    //         obj["editManageRight"] = true;
    //         obj["deleteManageRight"] = true;
    //         obj["publishManageRight"] = true;
    //         obj["viewManageRight"] = true;


    // controladdMoreMilestonesetting.at(i).patchValue(obj)



    if (e.target.checked == true) {

      var obj: any = {};

      obj["intLinkId"] = intLinkId;
      obj["LinkName"] = LinkName;
      obj["LinkValue"] = true;
      obj["addManageRight"] = true;
      obj["viewManageRight"] = true;
      obj["editManageRight"] = true;
      obj["deleteManageRight"] = true;
      obj["publishManageRight"] = true;
      obj["viewManageRight"] = true;
      obj["Intall"] = true;



      controladdMoreMilestonesetting.at(i).patchValue(obj)


      // for(let j=0;j<this.allMenuList[i].length;j++ ){

      // this.allMenuList[i].selected=e.target.checked




      // }

    }

    else {
      var obj: any = {};

      obj["intLinkId"] = intLinkId;
      obj["LinkName"] = LinkName;
      obj["LinkValue"] = false;
      obj["addManageRight"] = false;
      obj["viewManageRight"] = false;
      obj["editManageRight"] = false;
      obj["deleteManageRight"] = false;
      obj["publishManageRight"] = false;
      obj["viewManageRight"] = false;
      obj["Intall"] = false;


      //   $('#rolerow_'+i).find('.chkrole').prop('checked',false);    

      // for(let j=0;j<this.allMenuList[i].permission.length;j++ ){

      // this.allMenuList[i].permission[j].selected=e.target.checked

      controladdMoreMilestonesetting.at(i).patchValue(obj);

    }

  }





  // }
  rolechange(e: any, i: any) {

    if (e.target.checked == true) {

      for (let j = 0; j < this.rolelist[i].permission.length; j++
      ) {

        this.rolelist[i].permission[0].selected = e.target.checked

      }

    }

    else {

      $('#rolerow_' + i).find('.roleselectAll').prop('checked', false);


      for (let j = 0; j < this.rolelist[i].permission.length; j++
      ) {

        this.rolelist[i].permission[j].selected = e.target.checked

      }

    }






  }




  onReset() {
    this.allMenuList=[];
    let products = this.set_role_permission.get('chkPermission') as FormArray;
    products.clear()
    this.set_role_permission.reset();
  }
  onCancel() {
    this._location.back();
  }



  getDepartments(){
    let arrParam_ctrl = {
     
    }
    this.loading = true;
  
    this.commonService.fillDropDown(arrParam_ctrl, "adminconsole/ManageUser/fillselDepartmentList").subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res: any = Buffer.from(respData, "base64");
      res = JSON.parse(res.toString());
      this.loading = false;
  
      if (res.result.length > 0) {
        this.selDepartmentlist = res.result;
      }
    });
  }

  getRoleList(deptId:any){
    let arrParam_ctrl = {
      "deptId":deptId
    }
    this.loading = true;
    this.commonService.fillDropDown(arrParam_ctrl, "adminconsole/ManageUser/fillselRoleList").subscribe((response: any) => {
  
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res: any = Buffer.from(respData, "base64");
      res = JSON.parse(res.toString());
      this.loading = false;
  
      if (res.result.length > 0) {
        this.selSelectRolelist = res.result;
      }
    });
  }



}