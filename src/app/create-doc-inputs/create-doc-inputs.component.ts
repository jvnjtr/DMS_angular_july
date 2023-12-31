import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../services/common-services.service';
import { WorkflowService } from '../services/workflow.service';
import { ValidatorchecklistService } from '../services/validatorchecklist.service';
import { EncrypyDecrpyService } from '../services/encrypy-decrpy.service';
import { environment } from 'src/environments/environment';
import { UploadfilesService } from '../services/uploadfiles.service';
import { DomSanitizer } from '@angular/platform-browser';

import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';

import Swal from 'sweetalert2';
import { FormApplyComponent } from '../formbuilder/form-apply/form-apply.component';

@Component({
  selector: 'app-create-doc-inputs',
  templateUrl: './create-doc-inputs.component.html',
  styleUrls: ['./create-doc-inputs.component.scss']
})
export class CreateDocInputsComponent implements OnInit {

  folderid: any = '0';
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @ViewChild(FormApplyComponent, { static: false }) formapplyItems: FormApplyComponent;
  txtDocuemntName: any = ''
  rdoDocuemntType: any = "1";
  pdfweriterURL: any;
  excelweriterURL: any;
  token: any;

  createPDFURL: any = environment.createPDFURL;
  createExcelURL: any = environment.createExcelURL;

  date = new Date;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/createdocument.config.json";
  letterID: any = "";
  files_dropped: File[] = [];
  file: any = null;
  viewer: any = 'google';
  selectedType: any = 'docx';
  DemoDoc: any;
  chkIndexing: any = true;
  txtTags: any = [];
  selMeta: any = '0';
  txtSubject: any;
  selFolderName: any = '0';
  txtFileName: any = "";
  folderlist: any = [];
  folderlists: any = []
  rdoSetretention: any = "2";
  metalist: any = [];
  dropdownSettings: any;
  metasellist: any = [];
  tags: any = [];
  loading: any = false;
  getmetaType: any;
  metatype: any = '';
  metaDesable: any = false;
  metaListDetails: any = [];
  fileId: any = 0;
  txtEfminDate: any = '';
  txtEtminDate: any = '';
  txtExpDate: any = null;
  selOcrLang: any = '0';
  txtFileNumber: any = '';
  metatypelist: any = [];
  filedetails: any;
  fileLoading: any = false;
  sessiontoken: any;
  permissionlist: any;
  rolewisepermissions: any = [];
  userwisepermissions: any = [];
  getmetaTypeList: any = [];
  permissionlistitems: any = [
    { label: 'Read' },
    { label: 'Write' },
    { label: 'Download' },
    { label: 'Create Folder' },
    { label: 'Delete' },
    { label: 'Rename' },
    { label: 'Archive' },
    { label: 'WorkFlow' },
    { label: 'Move to folder' }


  ]

  folderName: any;
  publicurl: any;
  currenttime: Date = new Date();
  fileeList: any = [];

  getfiletype: any;
  previewFile: any = false;
  otherDetails: any = false;
  filename: any;
  filetype: any;
  workflowMode: any = "1";
  showForwardAuthority: any = false;
  authorityRoleId: any = 0;
  logedinRoleId: any;
  roleArr: any = [];
  processId: any = '0';
  formlist: any = [];
  loadDynamicForm: any;
  foradmin: any = 'admin';
  fileUploadStatus: any = 0;
  fileUploadData: any = [];
  createdDocumentVal:any=0;
  constructor(private route: Router,
    private httpClient: HttpClient,
    private uploadfiles: UploadfilesService,
    public commonserveice: CommonServicesService,
    public authService: AuthenticationService,
    public encDec: EncrypyDecrpyService,
    private router: ActivatedRoute,
    private vldChkLst: ValidatorchecklistService,
    private sanitizer: DomSanitizer, private workFlowServices: WorkflowService) {

    /// console.log(route.url);

  }

  ngOnInit(): void {

    this.token = sessionStorage.getItem('TOKEN');

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Meta',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    this.loadconfig();
    // console.log(this.folderid)
    //this.getFolderbased(this.folderid);
    // this.getPermissions(this.folderid)
    this.viewDynFormList()
    this.getFolders();
    //this.getFolderbased(this.folderid);
    //console.log(window.location.href)
    this.router.paramMap.subscribe((params: any) => {
      let encSchemeId = params.get("id");
      console.log(encSchemeId);
      let schemeArr: any = encSchemeId.split(':');
      let urldetails: any = schemeArr[1];
      if (!(encSchemeId == "" || encSchemeId == null)) {

        this.otherDetails = true;
        let schemeStr = this.encDec.decText(urldetails);

        let schemeArr: any = schemeStr.split(':');
        this.txtFileName = schemeArr[0];
        this.filetype = schemeArr[1];

        let filepath: any = environment.tempurl + this.txtFileName;

        this.loadDocPreview(this.filetype, filepath)

      }


    });

    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    this.logedinRoleId = SeetionParsed.ROLE_ID;

  }








  //\\ ======================== // Config // ======================== //\\
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
        this.tablist = data[0].tabList;
        this.utillist = data[0].utils
        this.messaageslist = data[0].messages;
        this.title = data[0].pagetitle;
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
  }
  //\\ ======================== // Config // ======================== //\\




  onRemove(event: any) {
    this.fileeList.splice(this.fileeList.indexOf(event), 1);
    this.previewFile = false;
    //this.resetform()
  }


  //\\ ======================== // get Folders // ======================== //\\
  getFolders() {
    let dataParam = {
      "folderId": 0,
    };
    this.commonserveice.getFolders(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)


          if (responseResult.status == '200') {
            this.folderlists = responseResult.result;

          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))

          }
        }
        else {

          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })




  }
  //\\ ======================== // get Folders // ======================== //\\






  //\\ ======================== // get Folders // ======================== //\\
  getFolderbased(folderid: any) {
    let dataParam = {
      "folderId": folderid,
    };
    this.commonserveice.getFoldersSingle(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)


          if (responseResult.status == '200') {

            this.folderlist = responseResult.result;
            console.log(this.folderlist)
            if (this.folderlist.length > 0) {
              this.folderName = this.folderlist[0].folderName;
              //this.selFolderName=this.folderlist[0].parentFolderId;
              this.permissionlist = this.folderlist[0].folderPermission;

            }

          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            // this.authService.directlogout();
          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })





  }
  //\\ ======================== // get Folders // ======================== //\\

  //\\ ======================== // get meta list // ======================== //\\
  viewMetaList() {



    let dataParam = {
      "intMetaId": ''
    };
    this.commonserveice.viewMeta(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {


            this.metalist = responseResult.result;




          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })



  }
  //\\ ======================== // Get Mata Type // ======================== //\\


  //\\ ======================== // Get Mata Type // ======================== //\\
  getMetaType(metaId: any) {

    this.metaDesable = true;
    this.getmetaTypeList = []
    let dataParam = {
      "intMetaId": metaId
    };
    this.commonserveice.viewMeta(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {

            let metalist = responseResult.result;

            let metaarrayList: any = [];
            metaarrayList = metalist[0].templateData;

            for (let i = 0; i < metaarrayList.length; i++) {
              let obj: any = {};
              obj['metaId'] = metaarrayList[i].metaId;
              obj['labelName'] = metaarrayList[i].labelName;
              obj['metaType'] = metaarrayList[i].metaType;
              obj['value'] = '';
              this.getmetaTypeList.push(obj);
            }



          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })




  }
  //\\ ======================== // Get Mata Type // ======================== //\\

  onTagsChanged(e: any) {

  }


  rtrdoClick(e: any) {
    let rdval = e.target.value;

    this.txtExpDate = '';
  }
  //\\ ======================== // Final File upload  // ======================== //\\

  metavalid() {
    let metavalidstatus = true;
    for (let i = 0; i < this.getmetaTypeList.length; i++) {

      if (!this.vldChkLst.blankCheck(this.getmetaTypeList[i].value, this.commonserveice.langReplace(this.getmetaTypeList[i].labelName + " Can not be blank"), this.getmetaTypeList[i].labelName)) {
        metavalidstatus = false;
        break;
      }

    }
    return metavalidstatus;
  }



  finalfileupload() {




    let fileName = this.txtFileName;
    let folderName = this.selFolderName;
    let subject = this.txtSubject;
    let metaitems = this.metasellist;
    let tags = this.txtTags;
    let fileindexing = true;
    let templateid = this.selMeta;
    if (!(this.vldChkLst.selectDropdown(this.folderid, this.commonserveice.langReplace(this.messaageslist.selFolder), 'selfolder'))) { }

    else if ((this.rdoSetretention == 1) && (!this.vldChkLst.blankCheck(this.txtExpDate, this.commonserveice.langReplace("Please select the retention date"), 'expiryDate'))) { }
    else if (!this.vldChkLst.blankCheck(subject, this.commonserveice.langReplace(this.messaageslist.subject), 'txtSubject')) { }
    else if (this.processId < 1) {
      Swal.fire({
  
        text: this.commonserveice.langReplace("Please Select Meta"),
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: this.commonserveice.langReplace('Ok')
      }).then((result) => {
        window.setTimeout(function () { 
          $('#selDynForm').focus(); 
      }, 200); 
      })
    }


    else {


      let counter: any = 0;




      let uploadParams = {
        "folderId": this.folderid,
        "fileName": this.txtFileName,
        "subject": this.txtSubject,
        "templateId": this.selMeta,
        "meta": this.getmetaTypeList,
        "tags": this.txtTags,
        "indexing": fileindexing,
        "expiryDate": this.txtExpDate,
        "ocrLanguage": this.selOcrLang,
        "filePermission": this.permissionlist,
        "processId": this.processId,
      }

      this.fileUploadData.push(uploadParams);
      this.formapplyItems.doSchemeApply();

      // this.loading = true;
      // this.uploadfiles.finaluploadFile(uploadParams).subscribe({
      //   next: (response) => {
      //     let respData = response.RESPONSE_DATA;
      //     let respToken = response.RESPONSE_TOKEN;
      //     //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();

      //     let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      //     if (respToken == verifyToken) {
      //       let res: any = Buffer.from(respData, 'base64');
      //       let responseResult = JSON.parse(res)

      //       if (responseResult.status == 200) {



      //         this.loading = false;
      //         Swal.fire({

      //           text: this.commonserveice.langReplace(this.messaageslist.successMsg),
      //           icon: 'success',
      //           confirmButtonColor: '#3085d6',
      //           confirmButtonText: this.commonserveice.langReplace('Ok')
      //         }).then((result) => {


      //           this.resetform();
      //           this.commonserveice.reloadpage()

      //         })




      //       }
      //       else if (responseResult.status == 400) {
      //         this.loading = false;
      //         this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message))

      //       }
      //       else if (responseResult.status == 500) {
      //         this.loading = false;
      //         this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message))

      //       }
      //       else if (responseResult.status == 501) {

      //         this.authService.directlogout();
      //       }
      //       else {
      //         this.loading = false;
      //         //  this.authService.directlogout();
      //       }
      //     }
      //     else {
      //       this.loading = false;
      //       this.authService.directlogout();
      //     }
      //   },
      //   error: (msg) => {
      //     this.authService.directlogout();
      //   }
      // })





      //   // txtFileNumber:any='';
      //  // console.log(uploadParams)
      //   this.loading=true;





    }

  }

  //\\ ======================== // Final File upload  // ======================== //\\
  //\\ ======================== // Reset Form  // ======================== //\\
  resetform() {
    this.txtFileName = '';
    this.selFolderName = '0';
    this.txtSubject = '';
    this.metasellist = [];
    this.txtTags = [];
    this.chkIndexing = false;
    this.rolewisepermissions = [];
    this.userwisepermissions = [];
    this.fileeList = [];
    this.commonserveice.reloadpage()
  }
  //\\ ======================== // Reset Form  // ======================== //\\
  //\\ ======================== // Add Meta Value  // ======================== //\\
  addMetaVals() {


    if (!this.vldChkLst.selectDropdown(this.selMeta, this.commonserveice.langReplace(this.messaageslist.selMeta), 'selMeta')) {

    }
    else if (!this.vldChkLst.blankCheck(this.metatype, this.commonserveice.langReplace(this.messaageslist.entermetadesc), 'metatype')) {

    }
    else {
      let elm: any = (<HTMLInputElement>document.getElementById("selMetaType"));
      let elmValText = elm.options[elm.selectedIndex].text;

      // metaListDetails
      let obj: any = {};
      obj['metaId'] = this.selMeta;
      obj["metaName"] = elmValText;
      obj['metaDetails'] = this.metatype;

      this.metaListDetails.push(obj)

      this.metatype = '';
      this.selMeta = '0';
      this.metaDesable = false;
    }
  }
  //\\ ======================== // Add Meta Value  // ======================== //\\
  //\\ ======================== // Remove Meta  // ======================== //\\
  removeSectionval(i: any) {
    this.metaListDetails.splice(i, 1);
  }
  //\\ ======================== // Remove Meta  // ======================== //\\


  //\\ ======================== // Get file Type // ======================== //\\
  getfiletypeicon(ftype: any) {


    let icon: any;
    if (ftype == 'pdf') {
      icon = 'bi-file-pdf text-danger';
    }
    else if (ftype == 'jpg' || ftype == 'jpeg' || ftype == 'png' || ftype == 'gif') {
      icon = 'bi-card-image';
    }
    else if (ftype == 'mp4' || ftype == 'mkv') {
      icon = 'bi-camera-video';
    }
    else if (ftype == 'mp3' || ftype == 'WAV') {
      icon = 'bi-file-earmark-music';
    }
    else if (ftype == 'doc' || ftype == 'docx') {
      icon = 'bi-filetype-doc text-primary';
    }
    else if (ftype == 'ppt' || ftype == 'pptx') {
      icon = 'bi-filetype-ppt text-danger';
    }
    else if (ftype == 'xls' || ftype == 'xlsx' || ftype == 'ods') {
      icon = 'bi-filetype-xls text-success';
    }
    else if (ftype == 'zip') {
      icon = 'bi-file-zip text-warning';
    }
    else {
      icon = 'bi-folder-fill text-warning';
    }
    return icon;

  }
  //\\ ======================== // Get file Type // ======================== //\\

  //\\ ======================== // Load Preview // ======================== //\\
  loadDocPreview(getfiletype: any, filepath: any) {
    this.previewFile = true;
    this.getfiletype = getfiletype;
    setTimeout(() => {

      this.fileLoading = false;

      let dangerousVideoUrl = `${environment.iframeviewURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${filepath}`;
      this.publicurl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);


    }, 1000)

  }
  workflowModedoClick(e: any) {
    let userSelection = e.target.value;
    if (userSelection == 2) {
      this.workflowMode = userSelection;
      this.showForwardAuthority = true;
      if (this.folderid < 1) {

        Swal.fire({
          title: 'Please Select Folder',
          confirmButtonText: 'Ok',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.workflowMode = "1";
            this.showForwardAuthority = false;
          }
        })

      } else {
        this.getRoles(this.folderid);
      }

    } else {
      this.workflowMode = "1";
      this.showForwardAuthority = false;
    }
  }
  //\\ ======================== // Authorities // ======================== //\\ 
  getRoles(folderid: any) {
    let dataParam = {
      "folderId": folderid
    };
    this.workFlowServices.getAdminRoles(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
        if (responseResult.status == '200') {
          let authorities: any = responseResult.result;
          this.folderName = authorities.folderName;

          let result: any = [];
          result = authorities.data;
          for (let i = 0; i < result.length; i++) {
            let obj: any = {};

            if (this.logedinRoleId != result[i].roleId) {
              obj['fileOrFolderId'] = result[i].fileOrFolderId;
              obj['intId'] = result[i].intId;
              obj['type'] = result[i].type;
              obj['roleName'] = result[i].roleName;
              obj['userFullName'] = result[i].userFullName;
              obj['roleId'] = result[i].roleId;
              let permissions: any = JSON.parse(result[i].permission);
              for (let j = 0; j < permissions.length; j++) {
                if (permissions[j].label == 'WorkFlow' && permissions[j].selected == true) {
                  obj['permission'] = permissions[j].label
                }
              }

              this.roleArr.push(obj);
            }



          }
          console.log(this.roleArr);
        }

        else if ((responseResult.status == 500)) {
          Swal.fire({
            icon: 'error',
            text: responseResult.message
          });
        }
      }
      else {
        this.loading = false;
        this.authService.directlogout();
      }





    },
      (error: any) => {
        this.authService.directlogout();
      })





  }

  //\\ ======================== // Authorities // ======================== //\\ 
  getFOrwardAuthority(e: any) {
    this.authorityRoleId = e.target.value;
  }
  metaSubmit(){
    this.formapplyItems.doSchemeApply();
  }
  viewDynFormList(){
  
   
    let dataParam = {
      "processId": ''
      };
      this.commonserveice.viewDynFormList(dataParam).subscribe({
        next: (response) => {    let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
        
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult = JSON.parse(res)
           
            if (responseResult.status == 200) {
        
              
           this.formlist = responseResult.result;
  
  
   
      
            }
            else if(responseResult.status==501){
              
              this.authService.directlogout();
            }
          }
          else{
            this.loading = false;
            this.authService.directlogout();
          }},
        error: (msg) => {
          this.authService.directlogout();
       }
     })
  
  
  
  }
  showDynamicForm(processId:any){
    if(processId>1){
      this.createdDocumentVal=processId;
      this.fileeList.push('documentCreation');
      this.fileUploadStatus=1;
      this.loadDynamicForm=1;
     
    }else{
      this.fileUploadStatus=0;
      this.loadDynamicForm=0;
      
    }
    
  }
  fileUploadSuccess(event:any){
    if(event>0){
      Swal.fire({
                
        text: this.commonserveice.langReplace(this.messaageslist.successMsg),
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: this.commonserveice.langReplace('Ok')
      }).then((result) => {
        
       
       let reData:any= this.folderid+':'+'0'
        
        let encSchemeStr = this.encDec.encText(reData.toString());
       // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);
    
        this.route.navigate(['/admin/viewupload',encSchemeStr])
  
    
      this.resetform();
      })
    }else{
      
      this.commonserveice.swalfire('error',this.commonserveice.langReplace('Error in File Upload'))
    }
  }

}
