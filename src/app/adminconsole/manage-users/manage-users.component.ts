import { Component } from '@angular/core';

import { FormArray, FormBuilder, FormControlName, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { Buffer } from 'buffer';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';


import * as CryptoJS from 'crypto-js';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { ConsoleservicesService } from 'src/app/services/consoleservices.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  public loading = false;

  manage_users: FormGroup;
  siteUrl:any=environment.siteURL;

  title = 'Manage Users'
  serviceURL = environment.serviceURL;
  storagePath = environment.serviceURL + 'storage/temp/';
  itemID: any;

  selRolelist: any;
  selDesignationlist: any;
  selEmployeeTypelist: any;
  selDepartmentlist: any;
  selGrouplist: any;
  selHierarchylist: any = [];






  public loadContent: boolean = false;

  dataList: any = [];
  settings: any = {};

  fileName: any;
  fileNameSignatue: any;
  arrUploadedFiles: any[] = [];
  arrDeletedUploadedFiles: any = [];

  //.........................................................


  editId = 0;
  userphoto: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  //..........................................................

  // txtXaxis: any;
  // txtYaxis: any;
  userSignature:any='';
  imageUploadStatus:any=0;
  signatureUploadStatus:any=0;



  constructor(private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private commonService: ConsoleservicesService,
    public vldChkLst: ValidatorchecklistService,
    public translate: TranslateService,
    private encDec: EncrypyDecrpyService,
    private _location: Location
  ) {

 

    this.manage_users = this.fb.group({

      intId: '',

      txtFullName: '',
      selGender: 0,
      filePhoto: '',
      fileSignature: '',
      txtMobileNo: '',
      txtEmailId: '',
      txtAlternateMobileNumber: '',
      txtDateOfJoining: '',
      txtrAddress: '',
      selRole: 0,
      selDesignation: 0,
      selEmployeeType: 0,
      selDepartment: 0,
      selGroup: 0,
      selHierarchy: 0,
      txtUserId: '',
      txtPassword: '',
      txtConfirmPassword: '',
      txtPrevilege: '',
      txtXaxis:'',
      txtYaxis:'',
      imageUploadStatus:0,
      signatureUploadStatus:0

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
this.getDepartments();
this.getDesignations();
  this.getEmployeetypes();
this.getGroupList();  



    }
  }


  onItemSelect(item: any) {
    // console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    // console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  onDeSelectAll(items: any) {
    // console.log(items);
  }





  /*
  |------------------------------------------------------------------------------
  |This function is used for submit data /Insert data in to database
  |------------------------------------------------------------------------------
  */
  submitForm() {

    let errFlag = 0;

    let txtFullName = this.manage_users.value.txtFullName;
    let selGender = this.manage_users.value.selGender;
    this.manage_users.value.filePhoto = this.fileName;
    this.manage_users.value.fileSignature = this.fileNameSignatue;
    this.manage_users.value.imageUploadStatus=this.imageUploadStatus;
    this.manage_users.value.signatureUploadStatus=this.signatureUploadStatus;
    let txtMobileNo = this.manage_users.value.txtMobileNo;
    let txtEmailId = this.manage_users.value.txtEmailId;
    let txtAlternateMobileNumber = this.manage_users.value.txtAlternateMobileNumber;
    let txtDateOfJoining = this.manage_users.value.txtDateOfJoining;
    let txtrAddress = this.manage_users.value.txtrAddress;
    let selRole = this.manage_users.value.selRole;
    let selDesignation = this.manage_users.value.selDesignation;
    let selEmployeeType = this.manage_users.value.selEmployeeType;
    let selDepartment = this.manage_users.value.selDepartment;
    let selGroup = this.manage_users.value.selGroup;
    let selHierarchy = this.manage_users.value.selHierarchy;
    let txtUserId = this.manage_users.value.txtUserId;
    let txtPassword = this.manage_users.value.txtPassword;
    let txtConfirmPassword = this.manage_users.value.txtConfirmPassword;
    let txtPrevilege = this.manage_users.value.txtPrevilege;
    if (txtPrevilege == true) {
      this.manage_users.value.txtPrevilege = 2;
    }
    else if (txtPrevilege == false || txtPrevilege == '') {
      this.manage_users.value.txtPrevilege = 3;
    }

    //  + environment.loginSaltedvalue

    // this.manage_users.value.enPassword = CryptoJS.HmacSHA256(txtPassword, environment.apiHashingKey).toString();

    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtFullName, `Full Name Cannot be Blank!`,'txtFullName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.minLength(txtFullName, 2, `Full Name`,'txtFullName'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.maxLength(txtFullName, 100, `Full Name`,'txtFullName'))) {
      errFlag = 1;
    }
 if ((errFlag == 0) && (!this.vldChkLst.selectDropdown(selGender,  `Gender`,selGender))) {
      errFlag = 1;
    }

    
    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtEmailId, `Email Id Cannot be Blank!`,'txtEmailId'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.validEmail(txtEmailId, `Email Id`))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtMobileNo, `Mobile No Cannot be Blank!`,'txtMobileNo'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.validMob(txtMobileNo, `Mobile No`))) {
      errFlag = 1;
    }

    if((errFlag == 0) && (!this.vldChkLst.isNumberKey(txtMobileNo))){
                                      errFlag = 1; 
                                    }


    if ((errFlag == 0) && (!this.vldChkLst.maxLength(txtrAddress, 500, `Address`,'txtrAddress'))) {
      errFlag = 1;
    }
    if ((errFlag == 0) && (!this.vldChkLst.selectDropdown(selDepartment,  `Department`,'selDepartment'))) {
      errFlag = 1;
    }
    if ((errFlag == 0) && (!this.vldChkLst.selectDropdown(selRole,  `Role`,'selRole'))) {
      errFlag = 1;
    }
    if ((errFlag == 0) && (!this.vldChkLst.selectDropdown(selDesignation,  `Designation`,'selDesignation'))) {
      errFlag = 1;
    }
    if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtUserId, `User Id Cannot be Blank!`,'txtUserId'))) {
      errFlag = 1;
    }

    if ((errFlag == 0) && (!this.vldChkLst.isAlphaNumeric(txtUserId))) {
      errFlag = 1;
    }
 


    if (this.editId == 0) {

 
     
      if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtPassword, `Password Cannot be Blank!`,'txtPassword'))) {
        errFlag = 1;
      }
      if ((errFlag == 0) && (!this.vldChkLst.validPassword(txtPassword))) {
        errFlag = 1;
      }

      if ((errFlag == 0) && (!this.vldChkLst.blankCheck(txtConfirmPassword, `Confirm Password Cannot be Blank!`,'txtConfirmPassword'))) {
        errFlag = 1;
      }

      if ((errFlag == 0) && (!this.vldChkLst.validPassword(txtConfirmPassword))) {
        errFlag = 1;
      }
      if ((errFlag == 0) && (txtPassword != txtConfirmPassword)) {
        errFlag = 1;
        Swal.fire({
          icon: 'error',
          text: 'password & confirm Password Must be same!'
        });
      }
    }

    if (errFlag == 0) {
      // console.log(this.manage_users.value);



      this.loading = true;
      this.commonService.insertData(this.manage_users.value, 'adminconsole/ManageUser/addEdit').subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());
            // console.log(res);
            if (res.status == 200) {
              this.loading = false;

              Swal.fire({

                text: 'Record Inserted Successfully',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {
                this.route.navigateByUrl('/adminconsole/viewmanage-users');
                this.manage_users.reset();
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
                this.route.navigateByUrl('/adminconsole/viewmanage-users');
                this.manage_users.reset();
              })
            }
            else if (res.status == 401) {
              this.loading = false;

              Swal.fire({
                text: 'User id already exist!',
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
    this.editId = id;
    let viewParams = {
      'intId': id,
    };
    this.loading = true;
    this.commonService.viewAll(viewParams, 'adminconsole/ManageUser/preview').subscribe({
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
            //console.log(dataResult);

            this.fileName = dataResult.vchPhoto;
            // let rtxtXaxis='';
            // let rtxtYaxis='';
            // if(dataResult.vchSignaturePosition){
            //   rtxtXaxis=dataResult.vchSignaturePosition.x;
            //   rtxtYaxis=dataResult.vchSignaturePosition.y;
            // }
           if(dataResult.vchSignature){
             this.userSignature=this.storagePath+dataResult.vchSignature;
           }
          //  console.log(this.userSignature);
            this.manage_users.patchValue({
              intId: this.itemID,
              txtFullName: dataResult.vchFullName,
              selGender: dataResult.intgender,
              filePhoto: dataResult.vchPhoto,
              fileSignature: dataResult.vchSignature,
              txtMobileNo: dataResult.vchMobileNo,
              txtEmailId: dataResult.vchEmailId,
              txtAlternateMobileNumber: dataResult.vchAltrMobileNo,
              txtDateOfJoining: dataResult.vchDtOfJoining,
              txtrAddress: dataResult.vchAddress,
              selRole: dataResult.intRoleId,
              selDesignation: dataResult.intDesignantion,
              selEmployeeType: dataResult.intEmployeeType,
              selDepartment: dataResult.intDepartment,
              selGroup: dataResult.intGroup,
              selHierarchy: dataResult.intHierarchy,
              txtUserId: dataResult.vchUserId,
              txtPassword:dataResult.vchPassword,
              txtConfirmPassword:dataResult.vchConpass,
              txtPrevilege: dataResult.vchPrevilege,
              // txtXaxis:rtxtXaxis,
              // txtYaxis:rtxtYaxis,



            });


if(dataResult.intDepartment > 0){

  setTimeout(() => {



    let selectFolderIfElement: any = document.getElementById("selDepartment");
    if (selectFolderIfElement != null || selectFolderIfElement != undefined) {
      selectFolderIfElement.dispatchEvent(
        new Event("change")
  
  
      );
    }
  
      },500)
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
  UploadFile(e: any, filesize: any, filesizeType: any) {
    let file = e.target.files[0];
    // console.log(file.type);
    let fileid = e.target.id;

    if (!this.vldChkLst.validateFileSize(file.size, filesize, filesizeType)) // File Size Validation Check
    {
      let filesizeMsg = '';
      if (filesizeType.toLowerCase() == 'kb') {
        filesizeMsg = 'File size exceeds ' + filesize + 'KB.';
      }
      else {
        filesizeMsg = 'File size exceeds ' + filesize + 'MB.';
      }

      Swal.fire({
        icon: 'error',
        text: filesizeMsg
      });
    }
    else {
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('fileSize', filesize);
      fileData.append('fileType', "image");
      fileData.append('fileSizeType', filesizeType);
      this.commonService.saveFileToTemp(fileData).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;

          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult:any = JSON.parse(res)
            if (responseResult.status == 200) {
                   this.fileName = (responseResult.result.fileName);
                  this.imageUploadStatus=1;
                   console.log(this.fileName)
             this.manage_users.controls[fileid].setValue(this.fileName);
           
          
          
          }
     else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: 'Invalid file type'
            });
          }

          }   else{
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: 'Invalid Response ',

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
  UploadFileSignature(e: any, filesize: any, filesizeType: any) {
    let file = e.target.files[0];
    // console.log(file.type);
    let fileidSignature = e.target.id;

    if (!this.vldChkLst.validateFileSize(file.size, filesize, filesizeType)) // File Size Validation Check
    {
      let filesizeMsg = '';
      if (filesizeType.toLowerCase() == 'kb') {
        filesizeMsg = 'File size exceeds ' + filesize + 'KB.';
      }
      else {
        filesizeMsg = 'File size exceeds ' + filesize + 'MB.';
      }

      Swal.fire({
        icon: 'error',
        text: filesizeMsg
      });
    }
    else {
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('fileSize', filesize);
      fileData.append('fileType', "image");
      fileData.append('fileSizeType', filesizeType);
      this.commonService.saveFileToTemp(fileData).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;

          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult:any = JSON.parse(res)
            if (responseResult.status == 200) {
                   this.fileNameSignatue = (responseResult.result.fileName);
                   this.signatureUploadStatus=1;
                   console.log(this.fileName)
            //  this.manage_users.controls[fileidSignature].setValue(this.fileNameSignatue);
             this.userSignature=responseResult.result.fileUrl;
           
          
          
          }
     else {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              text: 'Invalid file type'
            });
          }

          }   else{
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: 'Invalid Response ',

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

  removeFile() {
    this.fileName = '';
    let photoname = (<HTMLInputElement><unknown>(document.getElementById("filePhoto")));
    // console.log(photoname.value);
    photoname.value = '';


    let ctrl_fieldId = (<HTMLInputElement><unknown>(document.getElementById("fileDownloadDiv_filePhoto")));
    // console.log(ctrl_fieldId);
    if (ctrl_fieldId.classList.contains('d-flex')) {
      ctrl_fieldId.classList.add('d-none');
    }
  }
  removeFileSignature() {
    this.fileNameSignatue = '';
    this.userSignature='';
    let photoname = (<HTMLInputElement><unknown>(document.getElementById("filePhotoSignature")));
    // console.log(photoname.value);
    photoname.value = '';


    let ctrl_fieldId = (<HTMLInputElement><unknown>(document.getElementById("fileDownloadDiv_filePhotoSignature")));
    // console.log(ctrl_fieldId);
    if (ctrl_fieldId.classList.contains('d-flex')) {
      ctrl_fieldId.classList.add('d-none');
    }
  }
  // Hierarchylist(){
  //   let list = this.selHierarchylist;

  //   return [];
  // }


  onReset() {
    this.manage_users.reset();
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
      this.selRolelist = res.result;
    }
  });
}

getDesignations(){
  
  let arrParam_ctrl = {
  
  }
  this.loading = true;

  this.commonService.fillDropDown(arrParam_ctrl, "adminconsole/ManageUser/fillselDesignationList").subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let res: any = Buffer.from(respData, "base64");
    res = JSON.parse(res.toString());
    this.loading = false;

    if (res.result.length > 0) {
      this.selDesignationlist = res.result;
    }
  });

}
getEmployeetypes(){
  
  let arrParam_ctrl = {
    
  }
  this.loading = true;

  this.commonService.fillDropDown(arrParam_ctrl, "adminconsole/ManageUser/fillselEmployeeTypeList").subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let res: any = Buffer.from(respData, "base64");
    res = JSON.parse(res.toString());
    this.loading = false;

    if (res.result.length > 0) {
      this.selEmployeeTypelist = res.result;
    }
  });
}


getGroupList(){
  let arrParam_ctrl = {
    
  }
  this.loading = true;

  this.commonService.fillDropDown(arrParam_ctrl, "adminconsole/ManageUser/fillselGroupList").subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let res: any = Buffer.from(respData, "base64");
    res = JSON.parse(res.toString());
    this.loading = false;

    if (res.result.length > 0) {
      this.selGrouplist = res.result;
    }
  });
}

}