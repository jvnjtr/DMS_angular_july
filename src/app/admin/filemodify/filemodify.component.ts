import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';
import { FormApplyComponent } from 'src/app/formbuilder/form-apply/form-apply.component';

@Component({
  selector: 'app-filemodify',
  templateUrl: './filemodify.component.html',
  styleUrls: ['./filemodify.component.scss']
})
export class FilemodifyComponent implements OnInit {


  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/fileModify.config.json";
  @Input() fileid: any;

  @Input() folderid: any;
  @Input() filetype: any;

  @Input() lockstatus: any;
  @Input() checkinFileId: any = 0;
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @Output("callfunction2") callfunction2: EventEmitter<any> = new EventEmitter();
  @ViewChild(FormApplyComponent, { static: false }) formapplyItems: FormApplyComponent;
  userRemark: any;
  checkinfileName: any;
  fileeList: any = [];
  checkinUpload: any;
  letterID: any = "";
  files_dropped: File[] = [];
  file: any = null;


  viewer: any = 'google';
  selectedType: any = 'docx';
  dcoSrc: any;

  fileLoading: any = true;
  chkIndexing: any = true;
  txtTags: any = [];
  selMeta: any = '0';
  txtSubject: any;
  selFolderName: any = '0';
  txtFileName: any = "";
  folderlist: any = [];
  metalist: any = [];
  dropdownSettings: any;
  metasellist: any = [];
  tags: any = [];
  loading: any = false;
  getmetaType: any;
  metatype: any = '';
  metaDesable: any = false;
  metaListDetails: any = [];

  txtEfminDate: any = '';
  txtEtminDate: any = '';
  txtExpDate: any = null;
  selOcrLang: any = '0';
  rdoSetretention: any = '2';
  txtFileNumber: any = '';
  fileVersion: any;
  fileUploadingStatus: any = 0;
  token: any;
  metatypelist: any = [];
  filedetails: any;
  downloaditem: any;
  downloadlink: any;

  filepath: any;
  permissionlist: any;
  rolewisepermissions: any = [];
  userwisepermissions: any = [];
  publicurl: any;
  public src = 'https://investodisha.gov.in/download/IT_Policy_2022.pdf';
  folderName: any;
  currenttime: Date = new Date();
  fileTypeitem: any;
  checkinoutstatus: any;
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


  ];
  getmetaTypeList: any = [];
  txtPassword: any;
  getfiletype: any;
  prevstatus: any;

  loadDynamicForm: any;
  foradmin: any = 'admin';
  fileUploadStatus: any = 0;
  formlist: any = [];
  processId: any;
  onlineServiceId: any;
  fileUploadData:any=[];
  constructor(
    private route: Router,
    private httpClient: HttpClient,
    private uploadfiles: UploadfilesService,
    public commonserveice: CommonServicesService,
    public authService: AuthenticationService,
    public encDec: EncrypyDecrpyService,
    private router: ActivatedRoute,
    private vldChkLst: ValidatorchecklistService,
    private sanitizer: DomSanitizer
  ) {



  }

  ngOnInit(): void {
    if (this.checkinFileId > 1) {
      this.fileid = this.checkinFileId;
      this.prevstatus = false;
      this.checkinUpload = true;
    }
    this.token = sessionStorage.getItem('TOKEN');
    //console.log(this.token);

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Meta',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    this.loadconfig();

    this.getFolders(this.folderid);
    // this.viewMetaList()

    this.viewFileDetails(this.fileid)
    this.viewDynFormList();

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


  //\\ ======================== // Temp Uplaoad On select // ======================== //\\
  onSelect(event: any) {
    this.publicurl = '';

    let newFile: FormData = new FormData();
    newFile.append('file', event.addedFiles[0])
    let filetype = event.addedFiles[0].name;
    let splititems = filetype.split('.', 2)

    newFile.append('fileType', splititems[1])
    newFile.append('folderId', this.folderid)

    this.uploadfiles.uploadFile(newFile).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {

            this.files_dropped.push(event.addedFiles);
            this.txtFileName = responseResult.result.fileName;
            this.checkinfileName = responseResult.result.fileName;
            this.dcoSrc = responseResult.result.filePath;
            let filetype = responseResult.result.fileType;
            this.getfiletype = responseResult.result.fileType;
            this.loadDocPreview(this.getfiletype, responseResult.result.filePath)
            this.fileUploadingStatus = 1;
            this.checkinUpload = false;
          }
          else if (responseResult.status == 400) {
            this.commonserveice.swalfire('error', responseResult.message)
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

  //\\ ======================== // Temp Uplaoad On select // ======================== //\\

  //\\ ======================== // get Folders // ======================== //\\
  getFolders(folderid: any) {
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
              this.folderName = this.folderlist[0].folderName
              this.selFolderName = this.folderlist[0].parentFolderId
              this.permissionlist = this.folderlist[0].folderPermission;
            }
            // console.log(this.permissionlist)
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




  //\\ ======================== // get Meta list // ======================== //\\

  onTagsChanged(e: any) {

  }

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
    let templateid = this.selMeta;

    if (!this.vldChkLst.blankCheck(fileName, this.commonserveice.langReplace(this.messaageslist.filename), 'txtFileName')) { }
    else if ((this.rdoSetretention == 1) && (!this.vldChkLst.blankCheck(this.txtExpDate, this.commonserveice.langReplace("Please select the retention date"), 'expiryDate'))) { }
    else if (!this.vldChkLst.blankCheck(subject, this.commonserveice.langReplace(this.messaageslist.subject), 'txtSubject')) { }
    // else if (!this.vldChkLst.selectDropdown(templateid, this.commonserveice.langReplace(this.messaageslist.template), 'selMeta')) { }
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

      let uploadParams = {
        "fileId": this.fileid,
        "folderId": this.folderid,
        "fileName": fileName,
        "subject": this.txtSubject,
        "templateId": this.selMeta,
        "meta": this.getmetaTypeList,
        "tags": this.txtTags,
        "indexing": 0,
        "processId":this.processId,
        "intOnlineServiceId": this.onlineServiceId,
        "expiryDate": this.txtExpDate,
        "ocrLanguage": this.selOcrLang,
        "fileVersion": this.fileVersion,
        "filePermission": this.permissionlist,
        "fileUploadingStatus": this.fileUploadingStatus
      }

      // console.log(uploadParams)
      // this.loading = true;
      this.fileUploadData.push(uploadParams);
      this.formapplyItems.doSchemeApply();
      // this.uploadfiles.fileEdit(uploadParams).subscribe({
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




      //           let reData: any = this.folderid + ':' + '0'

      //           let encSchemeStr = this.encDec.encText(reData.toString());

      //           this.route.navigate(['/admin/viewupload', encSchemeStr])

      //           this.viewFileDetails(this.fileid);

      //         })


      //       }
      //       else if (responseResult.status == 400) {
      //         this.loading = false;
      //         this.commonserveice.swalfire('error', responseResult.message)
      //       }
      //       else if (responseResult.status == 500) {
      //         this.loading = false;
      //         this.commonserveice.swalfire('error', responseResult.message)
      //       }
      //       else if (responseResult.status == 501) {

      //         this.authService.directlogout();
      //       }
      //       else {
      //         this.loading = false;
      //         this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
      //       }
      //     }
      //     else {
      //       this.loading = false;
      //       this.authService.directlogout();
      //     }
      //   },
      //   error: (msg) => {
      //     this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
      //   }
      // })





    }

  }



  resetform() {
    let encSchemeStr = this.encDec.encText(this.folderid.toString());

    this.route.navigate(['/admin/viewupload', encSchemeStr])
    // this.txtFileName = '';
    // this.selFolderName = '0';
    // this.txtSubject = '';
    // this.metasellist = [];
    // this.txtTags = [];
    // this.chkIndexing = false;
    // this.rolewisepermissions = [];
    // this.userwisepermissions = [];
  }
  //   if (!this.vldChkLst.selectDropdown(parentfolder,this.messaageslist.parentfolder)) {
  //   }
  //   else if (!this.vldChkLst.blankCheck(foldername,this.messaageslist.foldername)) {
  //  }


  removeSectionval(i: any) {
    this.metaListDetails.splice(i, 1);
  }


  rtrdoClick(e: any) {
    let rdval = e.target.value;

    this.txtExpDate = '';
  }


  viewFileDetails(fileid: any) {

    let dataParam = {
      "fileId": fileid

    };
    this.loading = true;
    this.commonserveice.getFileDetails(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {

            this.loading = false;
            this.filedetails = responseResult.result.fileDetails;
            //this.files_dropped.push(this.filedetails);

            console.log(this.filedetails)

            this.txtFileName = this.filedetails.fileName;
            this.selFolderName = this.filedetails.folderId;
            this.txtFileNumber = this.filedetails.fileRefNo;
            this.selOcrLang = this.filedetails.ocrLanguage ? this.filedetails.ocrLanguage : '0';
            this.txtExpDate = this.filedetails.retentionDateDB;
            this.txtSubject = this.filedetails.subject;
            this.fileVersion = this.filedetails.fileVersion;
            this.processId = this.filedetails.processId;
            this.onlineServiceId = this.filedetails.onlineServiceId;
            
            this.checkinoutstatus = this.filedetails.checkInCheckoutStatus;
            this.selMeta = this.filedetails.templateId;

            if (!(this.txtExpDate == '' || this.txtExpDate == null)) {
              this.rdoSetretention = '1';

            }
            else {
              this.rdoSetretention = '2';

            }
            let metadetils: any = [];


            metadetils = this.filedetails.metaDetail;
            // console.log(metadetils)
            setTimeout(() => {
              this.txtTags = JSON.parse(this.filedetails.fileTags);

            }, 2000)




            for (let i = 0; i < metadetils.length; i++) {
              let obj: any = {};
              obj['metaId'] = metadetils[i].metaId;
              obj['labelName'] = metadetils[i].labelName;
              obj['metaType'] = metadetils[i].metaType;
              obj['value'] = metadetils[i].metaDetails;
              this.getmetaTypeList.push(obj);
            }

            setTimeout(() => {


              let selectIfElement: any = document.getElementById("selfolder");



              let foldrpermissions: any = JSON.parse(this.filedetails.filePermission)
              let rolewisepermissions = foldrpermissions.rolebased;
              let userwisepermissions = foldrpermissions.userbased;

              for (let i = 0; i < rolewisepermissions.length; i++) {
                let obj: any = {};
                obj['roleName'] = rolewisepermissions[i].roleName;
                obj['roleId'] = rolewisepermissions[i].roleId;
                obj['checked'] = rolewisepermissions[i].checked;
                obj['permission'] = rolewisepermissions[i].permission;
                this.rolewisepermissions.push(obj);
              }

              for (let j = 0; j < userwisepermissions.length; j++) {



                let obj: any = {};
                obj['itemName'] = userwisepermissions[j].itemName;

                obj['permission'] = userwisepermissions[j].permission;
                obj['checked'] = userwisepermissions[j].checked;
                this.userwisepermissions.push(obj);

              }





            }, 2000)



            this.filepath = this.filedetails["filePath"];

            this.fileTypeitem = this.filedetails["fileType"];
            // console.log(datasrc)

            if (this.lockstatus == 1) {
              setTimeout(() => {

              }, 200)
            } else {
              this.prevstatus = true;
              this.downloadfils(fileid, this.filepath)
            }

            if (this.onlineServiceId > 0) {
              this.loadDynamicForm = 1;
              this.fileUploadStatus = this.processId;
              let dynSchmCtrlParms = {
                'intProcessId'       : this.processId,
                'intOnlineServiceId' :this.onlineServiceId,
                'sectionId'          :0,
                'intProfileId'       :''
              }
              setTimeout(() => {
               this.formapplyItems.loadDynamicCtrls(dynSchmCtrlParms);
  
              }, 5000)
              
            }

            //  setTimeout(() => {
            //   this.loadDocPreview(this.filedetails["fileType"],this.filepath)
            // },2000)


          }
          if (responseResult.status == 400) {
            this.loading = false;
            this.filedetails = responseResult.result;
          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {

          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }

      },
      error: (msg) => {
        this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
      }
    })



  }

  //\\ ======================== // Download File // ======================== //\\ 
  downloadfils(fid: any, fpath: any) {

    let dataParam = {
      "fileId": fid,
      "url": fpath
    };
    this.commonserveice.fileDownload(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        this.fileLoading = true;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {


            this.downloaditem = responseResult.result;
            this.downloadlink = this.downloaditem.filePath;
            this.dcoSrc = this.downloaditem.filePath;

            this.fileLoading = false;



            if (this.filetype == "mp4") {
              setTimeout(() => {
                const video = document.createElement("video");

                // video.classList.add("frame");
                video.controls = true;
                video.muted = false;

                if (video.canPlayType('video/mp4')) {
                  video.src = this.dcoSrc;
                } else if (video.canPlayType('video/ogg')) {
                  video.src = this.dcoSrc;
                } else {
                  // Provide video link to user  video.src = this.DemoDoc;
                }

                video.height = 380; // in px
                video.width = 560;

                let element = <HTMLInputElement>document.getElementById("videopreviewdiv")
                element.innerHTML = "";
                element.appendChild(video)
                this.fileLoading = false;
              }, 200)

            }
            else if (this.filetype == "mp3") {
              setTimeout(() => {

                const audio = document.createElement("AUDIO");

                audio.setAttribute("src", this.dcoSrc);
                audio.setAttribute("controls", "controls");
                document.body.appendChild(audio);

                let element = <HTMLInputElement>document.getElementById("audiopreviewdiv")
                element.innerHTML = "";
                element.appendChild(audio)
              }, 200)
              this.fileLoading = false;
            }

            else if (this.filetype == 'zip') {

              setTimeout(() => {

                const zip = document.createElement("A");
                const t = document.createTextNode("Downlod .zip File");
                zip.setAttribute("target", "_blank");
                zip.setAttribute("href", this.dcoSrc);
                zip.classList.add("text-primary");
                zip.appendChild(t);
                let element = <HTMLInputElement>document.getElementById("zipdiv")
                element.classList.add("border", "bg-light", "p-4", "text-center");
                element.innerHTML = "";
                element.appendChild(zip)
              }, 200)

              this.fileLoading = false;
            }
            else {
              let dangerouframeUrl = `${environment.iframeviewURL}?fileId=${this.fileid}+&token=${this.token}+&date=${this.currenttime}`;
              this.publicurl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
            }


          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
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
  //\\ ======================== // Download File // ======================== //\\ 
  onError(error: any) {
    console.log("some thing went wrong")
  }


  //\\ ======================== // Load Preview // ======================== //\\
  loadDocPreview(getfiletype: any, filepath: any) {


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
        let element = <HTMLInputElement>document.getElementById("videopreviewdiv")
        element.innerHTML = "";
        element.appendChild(video)
        this.fileLoading = false;
      }, 200)

    }
    else if (getfiletype == 'mp3' || getfiletype == 'MP3') {
      setTimeout(() => {

        const audio = document.createElement("AUDIO");
        audio.setAttribute("src", filepath);
        audio.setAttribute("controls", "controls");

        document.body.appendChild(audio);

        let element = <HTMLInputElement>document.getElementById("audiopreviewdiv")
        element.innerHTML = "";
        element.appendChild(audio)
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
      }, 200)


    }

    else {
      setTimeout(() => {
        //alert(0)
        this.fileLoading = false;

        let dangerousVideoUrl = `${environment.iframeviewURL}?fileId='${this.fileid}'+&token=${this.token}+&date=${this.currenttime}+&filePath=${this.dcoSrc}`;
        this.publicurl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);





      }, 1000)
    }
  }

  //\\ ======================== // Unlock File // ======================== //\\
  unsetPassword() {

    let password = this.txtPassword;


    if (!this.vldChkLst.blankCheck(password, this.commonserveice.langReplace("Please Enter Password"), 'txtPassword')) {

    }

    else {

      let formParams = {
        "fileId": this.fileid,
        "password": password,
        "action": 3
      };
      this.commonserveice.fileLockUnlock(formParams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)

            if (responseResult.status == 200) {
              this.prevstatus = true;
              // this.downloadfils(this.fileId,this.vfilepath)
              this.downloadfils(this.fileid, this.filepath)

            }
            else if (responseResult.status == 400) {
              this.commonserveice.swalfire('error', responseResult.message)
            }
            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else {
              this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
            }
          }
          else {
            this.loading = false;
            this.authService.directlogout();
          }

        },
        error: (msg) => {
          this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
        }
      })


    }



  }
  checkinFile(fileId: any) {

    let remark = this.userRemark;
    let newfileName = this.checkinfileName;

    if (!this.vldChkLst.blankCheck(remark, this.commonserveice.langReplace("Please Enter Remark"), 'userRemark')) {

    } else if (!this.vldChkLst.blankCheck(newfileName, this.commonserveice.langReplace("Please Upload the file"), 'checkinfileName')) {

    } else if (!this.vldChkLst.blankCheck(this.selOcrLang, this.commonserveice.langReplace("Please Select Ocr Language"), 'selOcrLang')) {

    } else {

      let formParams = {
        "fileId": fileId,
        "fileName": newfileName,
        "ocrLanguage": this.selOcrLang,
        "remark": remark,
        "action": 1
      };

      // console.log(formParams) 
      this.commonserveice.checkinCheckout(formParams).subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            // this.downloadfils(fileId, this.filePath);
            Swal.fire({
              icon: 'success',
              text: this.commonserveice.langReplace('File Check In Successful'),

            }).then((result: any) => {
              if (result.isConfirmed) {
                // alert(this.folderid);
                // this.modalService.dismissAll();
                let encSchemeStr = this.encDec.encText(this.folderid.toString());
                // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

                this.route.navigate(['/admin/viewupload', encSchemeStr])

                this.callfunction.emit();
                this.callfunction2.emit();

              }
            });
          }
          else if (responseResult.status == 400) {
            this.commonserveice.swalfire('error', responseResult.message)
          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))
          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
        (error: any) => {
          this.authService.directlogout();
        });

    }
  }


  //\\ ======================== // Get Mata Type // ======================== //\\
  getMetaType(metaId: any) {

    this.getmetaTypeList = [];


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
            this.getmetaTypeList = [];

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
            console.log(this.getmetaTypeList)


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
  showDynamicForm(processId: any) {
    if (processId > 1) {
      this.fileUploadStatus = 1;
      this.loadDynamicForm = 1;

    } else {
      this.fileUploadStatus = 0;
      this.loadDynamicForm = 0;

    }

  }
  //\\ ======================== // get Dyn FOrm Name // ======================== //\\
  viewDynFormList() {


    let dataParam = {
      "processId": this.processId,
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
  fileUploadSuccess(event:any){
    if(event>0){
      Swal.fire({
                
        text: this.commonserveice.langReplace('File Upldated Successfully'),
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
