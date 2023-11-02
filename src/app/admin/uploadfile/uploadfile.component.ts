import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UploadfilesService } from '../../services/uploadfiles.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { CommonServicesService } from '../../services/common-services.service';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../../services/authentication.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { Buffer } from 'buffer';
import { DomSanitizer } from '@angular/platform-browser';
import { FormApplyComponent } from 'src/app/formbuilder/form-apply/form-apply.component';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {
  //\\ ======================== // Variables // ======================== //\\
  @Input() folderid: any;
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @ViewChild(FormApplyComponent, { static: false }) formapplyItems: FormApplyComponent;
  date = new Date;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/uploadDocument.config.json";
  letterID: any = "";
  files_dropped: File[] = [];
  file: any = null;
  viewer: any = 'google';
  selectedType: any = 'docx';
  DemoDoc: any;
  chkIndexing: any = true;
  txtTags: any = [];
  limit: any = 5;
  selMeta: any = '0';
  txtSubject: any;
  selFolderName: any = '0';
  txtFileName: any = "";
  folderlist: any = [];
  rdoSetretention: any = "2";
  metalist: any = [];
  dropdownSettings: any;
  metasellist: any = [];
  tags: any = [];
  loading: any = false;
  getmetaTypeList: any = [];
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
  token: any;
  getfiletype: any;
  previewFile: any = false;
  processId: any = '0';
  formlist: any = [];
  loadDynamicForm: any;
  foradmin: any = 'admin';
  fileUploadStatus: any = 0;
  fileUploadData: any = [];
  //\\ ======================== // Variables // ======================== //\\
  constructor(
    private route: Router,
    private httpClient: HttpClient,
    private uploadfiles: UploadfilesService,
    public commonserveice: CommonServicesService,
    public authService: AuthenticationService,
    public encDec: EncrypyDecrpyService,
    private router: ActivatedRoute,
    public vldChkLst: ValidatorchecklistService,
    private sanitizer: DomSanitizer
  ) { }

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
    // this.viewMetaList()
    this.viewDynFormList()
    this.getFolderbased(this.folderid);

    this.router.paramMap.subscribe((params: any) => {
      let encSchemeId = params.get("id");
      // if(encSchemeId != ""){
      let schemeStr = this.encDec.decText(encSchemeId);

      let schemeArr: any = schemeStr.split(':');
      this.fileId = schemeArr[0];



      // }


    });

    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    //console.log(SeetionParsed)
    // this.username=SeetionParsed.USER_NAME;
    // this.desgId=SeetionParsed.USER_ID;

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
        Swal.fire({
          icon: 'error',
          text: "Error In api response " + msg
        });
      }
    })
  }
  //\\ ======================== // Config // ======================== //\\

  //\\ ======================== // Temp Uplaoad On select // ======================== //\\
  onSelect(event: any) {

    //console.log(event.addedFiles);
    this.files_dropped.push(...event.addedFiles);
    let addFilesLength = event.addedFiles.length;
    //alert(addFilesLength)
    for (let i = 0; i < event.addedFiles.length; i++) {
      //console.log(event.addedFiles[i].name);
      let newFile: FormData = new FormData();
      newFile.append('file', event.addedFiles[i])
      let filetype = event.addedFiles[i].name;
      this.fileLoading = true;
      let splititems = filetype.split('.', 2)
      newFile.append('fileType', splititems[1])
      newFile.append('folderId', this.folderid)


      // console.log(event.addedFiles[i])
      this.uploadfiles.uploadFile(newFile).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;

          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            let responseResult: any = JSON.parse(res)

            if (responseResult.status == 200) {
              console.log(responseResult)
              //  this.files_dropped.push(event.addedFiles);
              let obj: any = {};
              obj['fileName'] = responseResult.result.fileName;
              obj['filePath'] = responseResult.result.filePath;
              obj['fileType'] = responseResult.result.fileType;
              this.fileeList.push(obj)
              if (addFilesLength == 1) {
                this.getfiletype = responseResult.result.fileType;

                this.loadDocPreview(responseResult.result.fileType, responseResult.result.filePath)
              }
              else {
                this.previewFile = false;
              }



            }
            else if (responseResult.status == 400) {
              Swal.fire({
                icon: 'error',
                text: responseResult.message,

              });
            }
            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else {
              //this.authService.directlogout();
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





  }
  //\\ ======================== // Temp Uplaoad On select // ======================== //\\

  onRemove(event: any) {
    this.fileeList.splice(this.fileeList.indexOf(event), 1);

    if (this.fileeList.length == 0) {
      this.previewFile = false;
      this.resetform()
    }

  }


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

            if (this.folderlist.length > 0) {
              this.folderName = this.folderlist[0].folderName;
              this.selFolderName = this.folderlist[0].parentFolderId;
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
  //\\ ======================== // get Dyn FOrm Name // ======================== //\\
  viewDynFormList() {


    let dataParam = {
      "processId": ''
    };
    this.commonserveice.viewDynFormList(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {


            this.formlist = responseResult.result;




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
  //\\ ======================== // Get Dyn FOrm Name // ======================== //\\




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
    let metaitems: any = this.getmetaTypeList;
    let tags = this.txtTags;
    let fileindexing = true;
    let processId = this.processId;
    let templateid = this.selMeta;
    //alert(this.processId);
    if ((this.rdoSetretention == 1) && (!this.vldChkLst.blankCheck(this.txtExpDate, this.commonserveice.langReplace("Please select the retention date"), 'expiryDate'))) { }
    else if (!this.vldChkLst.blankCheck(subject, this.commonserveice.langReplace(this.messaageslist.subject), 'txtSubject')) { }

    // else if(!this.vldChkLst.selectDropdown(templateid,this.commonserveice.langReplace(this.messaageslist.template),'selMeta')) { } 
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
    // else if(!(event>0)){//online serviceid

    // }
    // else if (!this.metavalid()) { }
    else {

      //       let filelistlength:any=this.fileeList.length;
      //       let counter:any=0;

      // for(let i=0;i<this.fileeList.length;i++){


      let uploadParams = {
        "folderId": this.folderid,
        "fileName": this.fileeList[0].fileName,
        // "fileName":fileName,
        "subject": this.txtSubject,
        "templateId": this.selMeta,
        "meta": this.getmetaTypeList,
        "tags": this.txtTags,
        "indexing": fileindexing,
        "expiryDate": this.txtExpDate,
        "ocrLanguage": this.selOcrLang,
        "filePermission": this.permissionlist,
        "processId": processId,

      }
      //console.log(uploadParams)
      this.fileUploadData.push(uploadParams);
      this.formapplyItems.doSchemeApply();
      //    this.loading=true;
      //    this.uploadfiles.finaluploadFile(uploadParams).subscribe({
      //     next: (response) => {
      //       let respData = response.RESPONSE_DATA;
      //       let respToken = response.RESPONSE_TOKEN;
      //       //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();

      //       let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      //       if(respToken == verifyToken){
      //         let res:any = Buffer.from(respData,'base64'); 
      //         let responseResult = JSON.parse(res)

      //         if (responseResult.status == 200) {
      //           counter++

      //           if(filelistlength == counter){
      //      this.loading=false;
      //           Swal.fire({

      //             text: this.commonserveice.langReplace(this.messaageslist.successMsg),
      //             icon: 'success',
      //             confirmButtonColor: '#3085d6',
      //             confirmButtonText: this.commonserveice.langReplace('Ok')
      //           }).then((result) => {


      //            let reData:any= this.folderid+':'+'0'

      //             let encSchemeStr = this.encDec.encText(reData.toString());
      //            // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

      //             this.route.navigate(['/admin/viewupload',encSchemeStr])


      //           this.resetform();
      //           })
      //           }



      //          }
      //          else if(responseResult.status==400){
      //           this.loading=false;
      //           this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message))

      //         }
      //          else if(responseResult.status==500){
      //           this.loading=false;
      //           this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message))

      //         }
      //         else if(responseResult.status==501){

      //           this.authService.directlogout();
      //         }
      //          else{
      //           this.loading=false;
      //         //  this.authService.directlogout();
      //          }
      //       }
      //       else{
      //         this.loading = false;
      //         this.authService.directlogout();
      //       }
      //     },
      //     error: (msg) => {
      //       this.authService.directlogout();
      //    }
      //  })

      // }


      //   // txtFileNumber:any='';
      //  // console.log(uploadParams)
      //   this.loading=true;





    }

  }
  fileUploadSuccess(event: any) {
    if (event > 0) {
      Swal.fire({

        text: this.commonserveice.langReplace(this.messaageslist.successMsg),
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: this.commonserveice.langReplace('Ok')
      }).then((result) => {


        let reData: any = this.folderid + ':' + '0'

        let encSchemeStr = this.encDec.encText(reData.toString());
        // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

        this.route.navigate(['/admin/viewupload', encSchemeStr])


        this.resetform();
      })
    } else {

      this.commonserveice.swalfire('error', this.commonserveice.langReplace('Error in File Upload'))
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
    this.selOcrLang = '0';
    this.rdoSetretention = '2';
    this.txtExpDate = '';
    this.metaListDetails = [];
    this.selMeta = 0;
    this.getmetaTypeList = []
  }
  //\\ ======================== // Reset Form  // ======================== //\\

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
    if (getfiletype == 'mp4' || getfiletype == 'MP4' || getfiletype == 'MKV' || getfiletype == 'AVI' || getfiletype == 'WebM' || getfiletype == 'mkv' || getfiletype == 'avi' || getfiletype == 'webm') {

      setTimeout(() => {
        const video = document.createElement("video");

        // video.classList.add("frame");
        video.controls = true;
        video.muted = false;

        if (video.canPlayType('video/mp4')) {
          video.src = filepath;
        } else if (video.canPlayType('video/ogg')) {
          video.src = filepath;
        } else {
          // Provide video link to user  video.src = this.DemoDoc;
        }

        video.height = 320; // in px
        video.width = 400;
        // document.getElementById("previewdiv").appendChild(para);
        let element: any = <HTMLInputElement>document.getElementById("videopreviewdiv")

        element.appendChild(video)
        this.fileLoading = false;
      }, 200)

    }
    else if (getfiletype == 'mp3' || getfiletype == 'MP3') {
      setTimeout(() => {

        let audio: any = document.createElement("AUDIO");
        audio.setAttribute("src", filepath);
        audio.setAttribute("controls", "controls");

        //document.body.appendChild(audio);

        let element: any = document.getElementById("audiopreviewdiv")
        element.innerHTML = "";
        element.appendChild(audio);
        this.fileLoading = false;
      }, 200)


    }
    else if (getfiletype == 'zip' || getfiletype == 'ZIP') {
      setTimeout(() => {

        const zip = document.createElement("a");
        const t = document.createTextNode("Downlod .zip File");
        zip.setAttribute("target", "_blank");
        zip.setAttribute("href", filepath);
        zip.classList.add("btn", "btn-primary");
        zip.appendChild(t);
        let element = <HTMLInputElement>document.getElementById("zipdiv")
        element.innerHTML = "";
        element.appendChild(zip)
        this.fileLoading = false;
      }, 200)


    }

    else {
      setTimeout(() => {

        this.fileLoading = false;

        let dangerousVideoUrl = `${environment.iframeviewURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${filepath}`;
        this.publicurl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);


      }, 1000)
    }
  }
  showDynamicForm(processId: any) {
    if (processId > 1) {
      this.fileUploadStatus = 1;
      this.loadDynamicForm = 1;

    } else {
      this.fileUploadStatus = 0;
      this.loadDynamicForm = 0;

    }

  }
  metaSubmit() {
    this.formapplyItems.doSchemeApply();
  }
}
