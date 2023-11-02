
/// <reference types="@types/ckeditor" />
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonconfigService } from 'src/app/services/commonconfig.service';
import { ManageformconfigService } from 'src/app/services/manageformconfig.service';
import { environment } from 'src/environments/environment';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { CKEditorComponent } from 'ng2-ckeditor';

import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { DomSanitizer } from '@angular/platform-browser';
// import Adapter from '../../../services/ckeditor-adapter';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { I } from '@angular/cdk/keycodes';
import { FormbuilderService } from 'src/app/services/formbuilder.service';
@Component({
  selector: 'app-add-manageform',
  templateUrl: './add-manageform.component.html',
  styleUrls: ['./add-manageform.component.scss']
})
export class AddManageformComponent implements OnInit {


  public loading = false;
  serviceURL = environment.serviceURL;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/addManageform.config.json";

  isSelected: boolean = true;
  moduleNames: any;
  metaTemplateListNames: any;

  txtModuleName: any = null;
  txtFormName: any = null;
  fileFormicon: any = "";
  fileGuideline: any = "";
  hdfileFormicon: any = "";
  hdfileGuideline: any = "";
  tableExistStatus: any = 2;
  serviceMode: any = 0;
  basedType: any = 0;
  selModuleName: any = 0;
  apiUrl: any = null;
  apiUrlMethod: any = 0;
  referenceUrl: any = null;
  referenceUrlMethod: any = 0;
  statusUrl: any = null;
  statusUrlMethod: any = 0;
  redirectURL: any = null;
  formdescription: any = null;
  txtTableName: any = null;
  selFormType: any = 0;
  chkforCitizen: any = 0;
  chkforDocument: any = 0;
  chkforApproval: any = 0;
  chkforPayment: any = 0;
  selWndowType: any = 0;
  chkforAdminApplication: any = 0;
  chkforWebsit: any = 0;
  chkAPIAuthorization: any = 0;
  apiUrlAuthType: any = 0;
  basicauthUsername: any = null;
  basicauthPass: any = null;
  chkreferenceAuthorization: any = 0;
  refAuthType: any = 0;
  refauthUsername: any = null;
  refauthPass: any = null;
  chkStatusAuthorization: any = 0;
  statusAuthType: any = 0;
  statusauthUsername: any = null;
  statusauthPass: any = null;
  txtAddsectionName: any = [];
  txtviewsectionName: any = [];
  dynamicAPIArray: any = [];
  dynamicReferenceArray: any = [];
  dynamicstatusArray: any = [];
  configurationsItems: any[] = [];
  redirectapilIst: any = [];
  refrerenceapilIst: any = [];
  statusapilIst: any = [];
  iconurl: any = '';
  guidelineurl: any = '';
  chengestatus: any = 0;
  percentUploaded: any = [0];
  acceptedExtensions = 'jpg, jpeg, bmp, png, pdf, doc';
  sessiontoken: any;
  userId: any;
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  ckeConfig: any;
  data: any = `<p>Hello, world!</p>`;
  formID: any = "";
  formsList: any;
  randomno: any;
  readonly: boolean = true;
  formConfigurationStatus: any = 0;
  finalSubmitStatus: any = 0;
  iconChangeStatus: any = 0;
  selMetaTemplateId:any='0';
  
  constructor(private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    public vldChkLst: ValidatorchecklistService,
    private commonService: CommonconfigService,
    private formBuilderService: FormbuilderService,
    private ManageformconfigService: ManageformconfigService,
    private encDec: EncrypyDecrpyService,
    private _sanitizer: DomSanitizer
  ) {

    this.ckeConfig = environment.ckconfig;


  }

  ngOnInit(): void {
    this.loadconfig();
    this.getModuleNames();
    // this.getMetaTemplateList();
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));

    this.userId = SeetionParsed.USER_ID;

    let encSchemeId = this.router.snapshot.paramMap.get('id');

    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);

      let schemeArr: any = schemeStr.split(':');
      this.formID = schemeArr[0];

      if (this.formID != '') {
        this.getForminfo()
      }
    }
    //this.getMetaTemplateList();
    //  this.ckconfig = {
    //   // include any other configuration you want
    //   extraPlugins: [ this.customAdapterPlugin ]
    // };


  }
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      if (!this.formID) {
        this.title = this.multilingual(data[0].pagetitle);
      }
      else {
        this.title = "Edit Manage Form";
      }

    })
  }
  multilingual(test: any) {
    return test;
  }




  addSectionval() {


    this.randomno = Math.floor((Math.random() * 1000) + 1).toString();
    let rNo: any;
    rNo = this.randomno;
    if (!rNo == this.randomno) {
      rNo = this.randomno;
    }


    let lastChild = this.txtAddsectionName[this.txtAddsectionName.length - 1];
    if (this.txtAddsectionName.length > 0) {
      if (lastChild.sectionName === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgSectionName,

        });
      }
      else if (!this.searchForduplicatesecNames()) {
        let x: any = this.txtAddsectionName.length + 1;

        this.txtAddsectionName.push({ sectionid: rNo, slno: x, sectionName: "", sectionTableName: "" });

      }
    }
    else {
      let x: any = this.txtAddsectionName.length + 1;

      this.txtAddsectionName.push({ sectionid: rNo, slno: x, sectionName: "", sectionTableName: "" });

    }


  }


  removeSectionval(i: any) {
    this.txtAddsectionName.splice(i, 1);

    let temparray: any = this.txtAddsectionName;


    this.txtAddsectionName = [];


    for (var i: any = 0; i <= temparray.length; i++) {

      var obj: any = {};
      obj["slno"] = i + 1;
      obj["sectionName"] = temparray[i].sectionName;
      obj["sectionid"] = temparray[i].sectionid;
      obj["sectionTableName"] = temparray[i].sectionTableName;


      this.txtAddsectionName.push(obj);

      //console.log(this.txtAddsectionName)
    }

  }


  addAPIRow() {

    let lastChild = this.dynamicAPIArray[this.dynamicAPIArray.length - 1];
    if (this.dynamicAPIArray.length > 0) {
      if (lastChild.label === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgApilabel,

        });
      }
      else if (lastChild.key === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgApikey,

        });
      }
      else if (lastChild.type === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgApitype,

        });
      }
      else if (lastChild.value === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgApivalue,

        });
      }
      else {
        this.dynamicAPIArray.push({ label: '', key: '', type: '', value: '' });

      }
    }
    else {
      this.dynamicAPIArray.push({ label: '', key: '', type: '', value: '' });

    }



    //console.log(this.dynamicAPIArray);
  }
  deleteApiRow(i: any) {
    this.dynamicAPIArray.splice(i, 1);
  }
  addReferenceRow() {
    let lastChild = this.dynamicReferenceArray[this.dynamicReferenceArray.length - 1];
    if (this.dynamicReferenceArray.length > 0) {
      if (lastChild.label === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgReflabel,

        });
      }
      else if (lastChild.key === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgRefKey,

        });
      }
      else if (lastChild.type === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgReftype,

        });
      }
      else if (lastChild.value === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgRefvalue,

        });
      }
      else {
        this.dynamicReferenceArray.push({ label: '', key: '', type: '', value: '' });

      }
    }
    else {
      this.dynamicReferenceArray.push({ label: '', key: '', type: '', value: '' });

    }

    //console.log(this.dynamicReferenceArray);
  }
  deleteReferenceRow(i: any) {
    this.dynamicReferenceArray.splice(i, 1);
  }

  addStatusRow() {

    let lastChild = this.dynamicstatusArray[this.dynamicstatusArray.length - 1];
    if (this.dynamicstatusArray.length > 0) {
      if (lastChild.label === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgStalabel,

        });
      }
      else if (lastChild.key === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgStakey,

        });
      }
      else if (lastChild.type === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgStatype,

        });
      }
      else if (lastChild.value === "") {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgStavalue,

        });
      }
      else {
        this.dynamicstatusArray.push({ label: '', key: '', type: '', value: '' });

      }
    }
    else {
      this.dynamicstatusArray.push({ label: '', key: '', type: '', value: '' });

    }

    //console.log(this.dynamicstatusArray);
  }
  deleteStatusRow(i: any) {
    this.dynamicstatusArray.splice(i, 1);
  }


  Uploadicon($event: any): void {

    let file = $event.target.files[0];
    this.iconChangeStatus = 1;
    if (file) {
      let fileSize = 0;

      if ((file.type != 'image/jpeg') && (file.type != 'image/jpg') && (file.type != 'image/png')) {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgImgtype,
        });
      }
      else if (file.size > 1024 * 1024) {

        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgImgsize,

        });
      }

      else {
        this.readThisIcon($event.target);
      }
    }
  }

  readThisIcon(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.iconurl = myReader.result;
      this.fileFormicon = myReader.result;
      this.hdfileFormicon = this.fileFormicon;
    }
    myReader.readAsDataURL(file);
  }



  onSelectgideline(event: any) {
    let file = event.target.files[0];



    if (file) {
      let fileSize = 0;
      if (file.type != 'application/pdf') {
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgDocfile,

        });
      }
      else if (file.size >= 1024 * 5 * 1024) {

        Swal.fire({
          icon: 'error',
          text: this.messaageslist.msgDocfilesize,

        });
      }

      else {

        this.readThisGuideline(event.target);
      }

    }





  }
  readThisGuideline(inputValue: any): void {
    var file: File = inputValue.files[0];
    let flSize: any = (1024 * 5 * 1024);
    var myReader: FileReader = new FileReader();
    const fileData = new FormData();
    fileData.append("file", file);
    fileData.append("fileType", 'pdf');
    fileData.append("fileSize", flSize);
    fileData.append("fileSizeType", 'kb');
    this.commonService.saveFileToTemp(fileData).subscribe((res: any) => {
      if (res.status == 200) {
        document.getElementById('guideLineUrl')?.setAttribute('data-fileName', res.result.fileName);
        // this.arrUploadedFiles[fileId]  = {'fileName':res.result.fileName ,'fileForApproval':fileForApproval ,'fileType':fileType} ;
        document.getElementById('guideLineUrl')?.setAttribute('href', res.result.filePath);
        document.getElementById('guideLineUrl')?.classList.remove('d-none');
        //document.getElementById('fileDownloadDiv_'+fileId)?.classList.remove('d-none');
      }
      else {
        (<HTMLInputElement>document.getElementById('guideLineUrl')).value = '';
        Swal.fire({
          icon: 'error',
          text: 'error while uploading files'
        });
      }




    });

    // myReader.onloadend = (e) => {
    //   this.guidelineurl = myReader.result;
    //   this.fileGuideline=myReader.result;
    //   this.hdfileGuideline=this.fileGuideline;
    // }
    // myReader.readAsDataURL(file);
  }

  formtypechange(e: any) {
    if (e.target.value == 'master') {
      $('.configitems').addClass('d-none')
    }
    else {
      $('.configitems').removeClass('d-none')
    }
  }
  getModuleNames() {
    this.commonService.getModules().subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());

        if (res.status == 200) {
          this.moduleNames = res.result;
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
    });
  }
  getMetaTemplateList() {
    this.commonService.getMetaTemplateList().subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        console.log(res);
        if (res.status == 200) {
          // console.log('ji');
          this.metaTemplateListNames = res.result;
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
    });
  }
  // getModuleNames(){
  //   this.commonService.insertData(this.manage_department.value, 'adminconsole/ManageDepartment/addEdit').subscribe({
  //     next: (response) => {
  //       let respData = response.RESPONSE_DATA;
  //       let respToken = response.RESPONSE_TOKEN;
  //       let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
  //       if (respToken == verifyToken) {
  //         let res: any = Buffer.from(respData, 'base64');
  //         res = JSON.parse(res.toString());

  //         if (res.status == 200) {
  //           this.loading = false;

  //           Swal.fire({

  //             text: 'Record Inserted Successfully',
  //             icon: 'success',
  //             confirmButtonColor: '#3085d6',
  //             confirmButtonText: 'Ok'
  //           }).then((result) => {
  //             this.route.navigateByUrl('/adminconsole/viewmanage-department');
  //             this.manage_department.reset();
  //           })

  //         } else if (res.status == 401) {
  //           this.loading = false;

  //           Swal.fire({
  //             text: 'Department Name already exist!',
  //             icon: 'warning',
  //             confirmButtonText: 'Ok'
  //           })
  //         }
  //         else if (res.status == 202) {
  //           this.loading = false;

  //           Swal.fire({
  //             text: 'Record Updated Successfully',
  //             icon: 'success',
  //             confirmButtonColor: '#3085d6',
  //             confirmButtonText: 'Ok'
  //           }).then((result) => {
  //             this.route.navigateByUrl('/adminconsole/viewmanage-department');
  //             this.manage_department.reset();
  //           })
  //         }
  //         else {
  //           Swal.fire({
  //             icon: 'error',
  //             text: 'Something Went wrong',

  //           });
  //         }
  //       } else {
  //         Swal.fire({
  //           icon: 'error',
  //           text: 'Unauthorized Response!!',
  //         });
  //       }
  //     },
  //     error: (msg) => {
  //       Swal.fire({
  //         icon: 'error',
  //         text: 'Invalid Api ',

  //       });
  //     }





  //   })
  // }
  checkCpayment(event: any) {
    if (event.target.checked) {
      this.chkforPayment = 1;
    } else {
      this.chkforPayment = 0;
    }

  }
  checkCapproval(event: any) {
    if (event.target.checked) {
      this.chkforApproval = 1;
    } else {
      this.chkforApproval = 0;
    }

  }
  checkCdocument(event: any) {
    if (event.target.checked) {
      this.chkforDocument = 1;
    } else {
      this.chkforDocument = 0;
    }

  }
  checkCcitizen(event: any) {
    if (event.target.checked) {
      this.chkforCitizen = 1;
    } else {
      this.chkforCitizen = 0;
    }

  }

  checkAdminApp(event: any) {
    if (event.target.checked) {
      this.chkforAdminApplication = 1;
    } else {
      this.chkforAdminApplication = 0;
    }

  }

  checkWebsite(event: any) {
    if (event.target.checked) {
      this.chkforWebsit = 1;
    } else {
      this.chkforWebsit = 0;
    }

  }

  checkApiUrl(event: any) {
    if (event.target.checked) {
      this.chkAPIAuthorization = 1;
    } else {
      this.chkAPIAuthorization = 0;
    }

  }
  checkRefereneUrl(event: any) {
    if (event.target.checked) {
      this.chkreferenceAuthorization = 1;
    } else {
      this.chkreferenceAuthorization = 0;
    }

  }

  checkStatusUrl(event: any) {
    if (event.target.checked) {
      this.chkStatusAuthorization = 1;
    } else {
      this.chkStatusAuthorization = 0;
    }

  }


  createform() {
    let modulename;
    let modalId;

    if (this.selModuleName == "other") {
      modalId = "";
      modulename = this.txtModuleName;
    } else {
      modulename = "";
      modalId = this.selModuleName
    }

    let formicon = this.fileFormicon;
    let guideline = document.getElementById('guideLineUrl')?.getAttribute('data-fileName');
    let formName = this.txtFormName;
    let addsection = this.txtAddsectionName;
    let arrSecName: any = [];
    let secDupStatus = 0;
    let dupSecName = '';
    // for (let m of this.txtAddsectionName) {
    //   if (arrSecName.includes(m.sectionName)) {
    //     secDupStatus = 1;
    //     dupSecName = m.sectionName;
    //     break;
    //   }

    //   arrSecName.push(m.sectionName);
    // }
    // if (secDupStatus) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: dupSecName + " Section Name already exists",

    //   });
    //   return;
    // }
    // this.txtAddsectionName.sort(function (a: any, b: any) {
    //   return a.slno - b.slno;
    // });
    // this.formdescription=this.CkeditornewComponent.ckdesc;
    let serviceMode = this.serviceMode;
    let basedType = this.basedType;
    let apiUrl = this.apiUrl;
    let apidetails = this.dynamicAPIArray;
    let referenceUrl = this.referenceUrl;
    let referencedetails = this.dynamicReferenceArray;
    let statusUrl = this.statusUrl;
    let statusdetails = this.dynamicstatusArray;
    let redirectURL = this.redirectURL;
    let redirectWindowType = this.selWndowType;
    let formdescription = this.formdescription;
    let chkforCitizen = this.chkforCitizen;
    let chkforPayment = this.chkforPayment;
    let chkforApproval = this.chkforApproval;
    let chkforDocument = this.chkforDocument;
    let lastChild = this.txtAddsectionName[this.txtAddsectionName.length - 1];
    let apilastChild = this.dynamicAPIArray[this.dynamicAPIArray.length - 1];
    let referancelastChild = this.dynamicReferenceArray[this.dynamicReferenceArray.length - 1];
    let statuslastChild = this.dynamicstatusArray[this.dynamicstatusArray.length - 1];
    let formtype = this.selFormType;
    let tableName = this.txtTableName;
    let chkforAdmin = this.chkforAdminApplication;
    let chkformWeb = this.chkforWebsit;

    let apilistdetails


    let apiUrlMethod = this.apiUrlMethod;
    let redirectURLMethod = this.referenceUrlMethod;
    let statusUrlMethod = this.statusUrlMethod;

    let chkAPIAuthorization = this.chkAPIAuthorization;
    let apiUrlAuthType = this.apiUrlAuthType;
    let basicauthUsername = this.basicauthUsername;
    let basicauthPass = this.basicauthPass;

    let chkreferenceAuthorization = this.chkreferenceAuthorization;
    let refAuthType = this.refAuthType;
    let refauthUsername = this.refauthUsername;
    let refauthPass = this.refauthPass;


    let chkStatusAuthorization = this.chkStatusAuthorization;
    let statusAuthType = this.statusAuthType;
    let statusauthUsername = this.statusauthUsername;
    let statusauthPass = this.statusauthPass;
    let metaTemplateId=this.selMetaTemplateId;

    if (modalId == "0") {

      Swal.fire({
        icon: 'error',
        text: this.messaageslist.selctModule,

      });
    }
    else if ((modalId == "other") && (this.txtModuleName == '' || typeof (this.txtModuleName) == undefined || this.txtModuleName == null)) {
      Swal.fire({
        icon: 'error',
        text: this.messaageslist.txtModule,

      });
    }
    else if ((modalId == '' || modalId == null) && (modulename == '' || typeof (modulename) == undefined || modulename == null)) {

      Swal.fire({
        icon: 'error',
        text: this.messaageslist.txtModule,

      });
    }
    // else if(metaTemplateId==''|| metaTemplateId==null){
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.metaTemplate,

    //   });
    // }
    // else if (formtype == "0" || typeof (formtype) == undefined || formtype == null) {

    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgFormtype,

    //   });
    // }
    else if (formName == '' || typeof (formName) == undefined || formName == null) {

      Swal.fire({
        icon: 'error',
        text: this.messaageslist.msgFormName,


      });
    }

    else if (tableName == '' || typeof (tableName) == undefined || tableName == null) {

      Swal.fire({
        icon: 'error',
        text: this.messaageslist.msgTableName,


      });
    }

    else if (!this.vldChkLst.chkblankspace(this.txtTableName)) {
      Swal.fire({
        icon: 'error',
        text: this.messaageslist.msgBlankspace,


      });
    }

    // else if ((apiUrlAuthType == "1") && (basicauthUsername == '' || typeof (basicauthUsername) == undefined || basicauthUsername == null)) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgAuthname,


    //   });
    // }

    // else if ((apiUrlAuthType == "1") && (basicauthPass == '' || typeof (basicauthPass) == undefined || basicauthPass == null)) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgAuthpass,


    //   });
    // }
    // else if (this.txtAddsectionName.length > 0 && lastChild.addsectionName === "") {

    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgSectionName,
    //   });


    // }


    // else if (this.dynamicAPIArray.length > 0 && apilastChild.label === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgApilabel,


    //   });
    // }
    // else if (this.dynamicAPIArray.length > 0 && apilastChild.key === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgApikey,


    //   });
    // }
    // else if (this.dynamicAPIArray.length > 0 && apilastChild.type === 0) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgApitype,


    //   });
    // }
    // else if (this.dynamicAPIArray.length > 0 && apilastChild.value === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgApivalue,


    //   });
    // }

    // else if (serviceMode == 1 && basedType == 0 && !this.vldChkLst.is_url(this.referenceUrl)) {

    // }

    // else if ((refAuthType == 1) && (refauthUsername == '' || typeof (refauthUsername) == undefined || refauthUsername == null)) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgAuthname,


    //   });
    // }

    // else if ((refAuthType == 1) && (refauthPass == '' || typeof (refauthPass) == undefined || refauthPass == null)) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgAuthpass,


    //   });
    // }


    // else if (this.dynamicReferenceArray.length > 0 && referancelastChild.label === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgReflabel,


    //   });
    // }
    // else if (this.dynamicReferenceArray.length > 0 && referancelastChild.key === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgRefKey,


    //   });
    // }
    // else if (this.dynamicReferenceArray.length > 0 && referancelastChild.type === 0) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgReftype,


    //   });
    // }
    // else if (this.dynamicReferenceArray.length > 0 && referancelastChild.value === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgRefvalue,


    //   });
    // }
    // else if (serviceMode == 1 && basedType == 0 && !this.vldChkLst.is_url(this.statusUrl)) {

    // }


    // else if (this.dynamicstatusArray.length > 0 && statuslastChild.label === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgStalabel,

    //   });
    // }
    // else if ((statusAuthType == 1) && (statusauthUsername == '' || typeof (statusauthUsername) == undefined || statusauthUsername == null)) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgAuthname,


    //   });
    // }

    // else if ((statusAuthType == 1) && (statusauthPass == '' || typeof (statusauthPass) == undefined || statusauthPass == null)) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgAuthpass,


    //   });
    // }
    // else if (this.dynamicstatusArray.length > 0 && statuslastChild.key === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgStakey,

    //   });
    // }
    // else if (this.dynamicstatusArray.length > 0 && statuslastChild.type === 0) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgStatype,

    //   });
    // }
    // else if (this.dynamicstatusArray.length > 0 && statuslastChild.value === "") {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgStavalue,

    //   });
    // }


    // else if (serviceMode == 1 && basedType == 1 && redirectURL == '') {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgredirecturl,

    //   });
    // }


    // else if (serviceMode == 1 && basedType == 1 && !this.vldChkLst.is_url(redirectURL)) {

    // }

    // else if (serviceMode == 1 && basedType == 1 && redirectWindowType == '0') {
    //   Swal.fire({
    //     icon: 'error',
    //     text: this.messaageslist.msgredirectwindowtype,

    //   });
    // }
    else if (formdescription == '' || typeof (formdescription) == undefined || formdescription == null) {

      Swal.fire({
        icon: 'error',
        text: this.messaageslist.msgDesc,


      });
    }

    else {


      let formData = {

        "moduleId": modalId,
        "moduleName": modulename,
        "itemId": this.formID,
        "itemStatus": "",
        "formName": formName,
        "formType": formtype,
        "tableName": this.tablenameval(tableName),
        "addsection": addsection,
        "formicon": formicon,
        "guideline": guideline,
        "servicemode": serviceMode,
        "basedType": basedType,
        "redirectURL": redirectURL,
        "redirectWindowType": redirectWindowType,
        "formdescription": this.encDec.escapeHtml(formdescription),
        "configurationForpayment": chkforPayment,
        "configurationForapproval": chkforApproval,
        "configurationFordocument": chkforDocument,
        "configurationForviewcitizen": chkforCitizen,
        "enableToAdminapplication": chkforAdmin,
        "enableToWebsiteapplication": chkformWeb,
        "intCreatedBy": this.userId,
        "intUpdatedBy": this.userId,
        "tinTableExists": this.tableExistStatus,
        "apiUrldetails": [{ "url": apiUrl, "method": apiUrlMethod, "details": apidetails, 'authDetails': [{ 'authType': apiUrlAuthType, 'params': [{ 'userName': basicauthUsername, 'password': basicauthPass }] }] }],
        "referencedetails": [{ "url": referenceUrl, "method": this.referenceUrlMethod, "details": referencedetails, 'authDetails': [{ 'authType': refAuthType, 'params': [{ 'userName': refauthUsername, 'password': refauthPass }] }] }],
        "statusdetails": [{ "url": statusUrl, "method": statusUrlMethod, "details": statusdetails, 'authDetails': [{ 'authType': statusAuthType, 'params': [{ 'userName': statusauthUsername, 'password': statusauthPass }] }] }],
        "iconChangeStatus": this.iconChangeStatus,
        "fileFormicon": this.fileFormicon
        // "metaTemplateId":metaTemplateId
      };


      this.ManageformconfigService.addNewForm(formData).subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res = JSON.parse(atob(respData));
        console.log(res);
        if (res == 200) {


          Swal.fire({

            text: this.messaageslist.successMsg,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {

              this.route.navigate(['/formbuilder/viewManageform'])


            }
          })


          this.resetform()
        }
        else if (res == 202) {
          //console.log(formData)
          Swal.fire({

            text: this.messaageslist.updateMsg,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {

              this.route.navigate(['/formbuilder/viewManageform'])


            }
          })


        }
        else if (res == 400) {
          Swal.fire({
            icon: 'error',
            text: "Table Name Already exist"

          });
        }
        else if (res == 405) {
          Swal.fire({
            icon: 'error',
            text: "Form Name in same Module already exist"

          });
        }
        else if (res == 406) {
          Swal.fire({
            icon: 'error',
            text: "Duplicate section name exists"

          });
        }
        else {
          Swal.fire({
            icon: 'error',
            text: this.messaageslist.errorMsg

          });
        }


      });


    }
  }


  toDataURL(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }


  resetform() {
    this.selModuleName = 0;

    this.txtFormName = null;
    this.txtAddsectionName = [];
    this.fileFormicon = null;
    this.fileGuideline = null;
    this.serviceMode = 0;
    this.basedType = 0;
    this.apiUrl = null;
    this.dynamicAPIArray = [];
    this.referenceUrl = null;
    this.dynamicReferenceArray = [];
    this.statusUrl = null;
    this.dynamicstatusArray = [];
    this.redirectURL = null;
    this.formdescription = null;
    this.chkforCitizen = 0;
    this.chkforPayment = 0;
    this.chkforApproval = 0;
    this.chkforDocument = 0;
    this.iconurl = '';
    this.guidelineurl = '';
    this.chkforAdminApplication = 0;
    this.chkforWebsit = 0;
    this.selFormType = 0;
    this.txtTableName = null;
    this.selMetaTemplateId='0';
  }


  getForminfo() {


    let formParams = {
      "moduleId": "",
      "vchProcessName": "",
      "iteamId": this.formID
    };
    this.ManageformconfigService.viewManageForm(formParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res = JSON.parse(atob(respData));
      console.log(res);
      if (res.status == 200) {


        this.formsList = res.result;


        if (this.formsList.length > 0) {



          this.selModuleName = this.formsList[0].intModuleId;
          this.txtFormName = this.formsList[0].vchProcessName;
          this.selMetaTemplateId = this.formsList[0].metaTemplateId;
          this.formdescription = this.formsList[0].txtSchemeDescription;
          this.chkforPayment = this.formsList[0].intPayment;
          this.chkforApproval = this.formsList[0].intApproval;
          this.chkforDocument = this.formsList[0].intDocument;
          this.chkforCitizen = this.formsList[0].viewAtCitizen;
          this.serviceMode = this.formsList[0].intServiceMode;
          this.basedType = this.formsList[0].intBaseType;
          this.apiUrl = this.formsList[0].vchAPIURLDtls[0].url;
          this.apiUrlMethod = this.formsList[0].vchAPIURLDtls[0].method;

          this.referenceUrl = this.formsList[0].vchAPIReferenceURLDtls[0].url;
          this.referenceUrlMethod = this.formsList[0].vchAPIReferenceURLDtls[0].method;

          this.statusUrl = this.formsList[0].vchAPIStatusURLDtls[0].url;
          this.statusUrlMethod = this.formsList[0].vchAPIStatusURLDtls[0].method;

          this.redirectURL = this.formsList[0].vchRedirectURL;
          this.txtAddsectionName = this.formsList[0].vchSection;
          this.dynamicAPIArray = this.formsList[0].vchAPIURLDtls[0].details;
          this.dynamicReferenceArray = this.formsList[0].vchAPIReferenceURLDtls[0].details;
          this.dynamicstatusArray = this.formsList[0].vchAPIStatusURLDtls[0].details;


          if (this.formsList[0].vchAPIURLDtls[0].authDetails.length > 0) {
            this.chkAPIAuthorization = "1";
            this.apiUrlAuthType = this.formsList[0].vchAPIURLDtls[0].authDetails[0].authType;
            this.basicauthUsername = this.formsList[0].vchAPIURLDtls[0].authDetails[0].params[0].userName;
            this.basicauthPass = this.formsList[0].vchAPIURLDtls[0].authDetails[0].params[0].password;
          }
          if (this.formsList[0].vchAPIReferenceURLDtls[0].authDetails.length > 0) {
            this.chkreferenceAuthorization = "1";
            this.refAuthType = this.formsList[0].vchAPIReferenceURLDtls[0].authDetails[0].authType;
            this.refauthUsername = this.formsList[0].vchAPIReferenceURLDtls[0].authDetails[0].params[0].userName;
            this.refauthPass = this.formsList[0].vchAPIReferenceURLDtls[0].authDetails[0].params[0].password;
          }
          if (this.formsList[0].vchAPIStatusURLDtls[0].authDetails.length > 0) {
            this.chkStatusAuthorization = "1";
            this.statusAuthType = this.formsList[0].vchAPIStatusURLDtls[0].authDetails[0].authType;
            this.statusauthUsername = this.formsList[0].vchAPIStatusURLDtls[0].authDetails[0].params[0].userName;
            this.statusauthPass = this.formsList[0].vchAPIStatusURLDtls[0].authDetails[0].params[0].password;
          }


          this.fileFormicon = this.formsList[0].vchSchemePoster;
          this.fileGuideline = this.formsList[0].vchSchemeGuideline;

          this.iconurl = this.formsList[0].vchSchemePosterUrl;

          this.guidelineurl = this.formsList[0].vchSchemeGuidelineUrl;
          if (this.guidelineurl != '') {
            document.getElementById('guideLineUrl')?.setAttribute('data-fileName', this.fileGuideline);
            // this.arrUploadedFiles[fileId]  = {'fileName':res.result.fileName ,'fileForApproval':fileForApproval ,'fileType':fileType} ;
            document.getElementById('guideLineUrl')?.setAttribute('href', this.guidelineurl);
            document.getElementById('guideLineUrl')?.classList.remove('d-none');
          }
          this.selFormType = this.formsList[0].vchFormType;
          this.txtTableName = this.formsList[0].vchTableName;
          this.chkforAdminApplication = this.formsList[0].intAdminApplication;
          this.chkforWebsit = this.formsList[0].intWebsiteApplication;

          this.selWndowType = this.formsList[0].vchredirectWindowType;
          this.tableExistStatus = this.formsList[0].tinTableExists;
          this.formConfigurationStatus = this.formsList[0].formConfigurationStatus;
          this.finalSubmitStatus = this.formsList[0].tinFinalSubmitStatus;

        }
      }
      else {

        Swal.fire({
          icon: 'error',
          text: this.messaageslist.errorMsg,

        });
      }

    });
  }


  updateCancel() {
    this.route.navigate(['/formbuilder/viewManageform'])
  }

  fileSanitize(file: any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(file)
  }



  tablenameval(obj: any) {
    return obj.toUpperCase().replaceAll("-", "_");
  }
  searchForduplicatesecNames() {
    let arrSecTempStorage: any = [];
    let dupStaus = false;
    for (let i of this.txtAddsectionName) {
      if (arrSecTempStorage[i.sectionName] == undefined) {
        arrSecTempStorage[i.sectionName] = i;
      }
      else {
        Swal.fire({
          icon: 'error',
          text: "Section Name (" + i.sectionName + ") already exists",

        });
        dupStaus = true;
        break;
      }
    }
    return dupStaus;
  }
}
