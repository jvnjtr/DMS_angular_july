import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { UploadfilesService } from 'src/app/services/uploadfiles.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-fileproperties',
  templateUrl: './fileproperties.component.html',
  styleUrls: ['./fileproperties.component.scss']
})
export class FilepropertiesComponent implements OnInit {
  @Input() fileid: any;
  @Input() folderFileDownload: any;
  @Input() folderDelete: any;
  @Input() folderModify: any;

  @Input() roleId: any;
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @Output("callfunction2") callfunction2: EventEmitter<any> = new EventEmitter();
  @ViewChild('lockModal') lockModal: ElementRef;
  @ViewChild('checkinCheckoutModal') checkinCheckoutModal: ElementRef;

  filedetails: any;
  files_dropped: any = [];
  txtFileName: any;
  txtFileNumber: any;
  metaListDetails: any = [];
  filesize: any;
  fileType: any;
  txtSubject: any;
  ocrLanguage: any;
  createdby: any;
  createdOn: any;
  txtExpDate: any;
  updatedOn: any;
  fileTags: any;
  metadetails: any;
  filePath: any;
  downloaditem: any;
  downloadlink: any;

  folderId: any;
  fileVersion: any;
  loading: any = false;
  sessiontoken: any;
  desgId: any;
  lockStatus: any;
  fileCreatedById: any;
  showlockfields: any = true;


  txtConPassword: any;
  txtPassword: any;
  txtUPassword: any;
  show: any = false;
  password: any = 'password';
  cshow: any = false;
  cpassword: any = 'password';
  ushow: any = false;
  upassword: any = 'password';

  //for checkin and checckout
  checkInCheckoutStatus: any;
  showCheckinCheckoutField: any = true;
  userRemark: any;
  checkinEligibility: any;
  fileLoading: boolean;
  fileeList: any = [];
  previewFile: any = false;
  getfiletypePreview: any;
  publicurl: any;
  token: any;
  currenttime: Date = new Date();
  checkinfileName: any;
  //for checkin and checckout
  constructor(private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public vldChkLst: ValidatorchecklistService,
    private modalService: NgbModal, private uploadfiles: UploadfilesService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // console.log(this.roleId);
    // console.log(this.folderFileDownload)
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    this.token = sessionStorage.getItem('TOKEN');

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    // console.log(SeetionParsed)
    this.desgId = SeetionParsed.USER_ID;
    this.roleId = SeetionParsed.ROLE_ID;


    if (this.roleId == '1') {
      this.folderDelete = true;
      this.folderFileDownload = true;
      this.folderModify = true;
    }

    this.viewFileDetails(this.fileid)

  }




  viewFileDetails(fileId: any) {
    
    let dataParam = {
      "fileId": fileId

    };
    this.loading = true;
    this.commonserveice.getFileDetails(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
        
        if (responseResult.status == 200) {
          this.loading = false;
         
          this.filedetails = responseResult.result.fileDetails;
          this.files_dropped.push(this.filedetails);
         // console.log( this.filedetails)

          this.metaListDetails = this.filedetails["metaDetail"];
          this.txtFileName = this.filedetails.fileName;


          this.txtFileNumber = this.filedetails.fileRefNo;
          this.filesize = this.filedetails.fileSize;
          this.fileType = this.getfiletype(this.filedetails.fileType);
          this.ocrLanguage = this.filedetails.ocrLanguage;
          this.txtExpDate = this.filedetails.retentionDate;
          this.txtSubject = this.filedetails.subject;
          this.filePath = this.filedetails.filePath;
          this.fileid = this.filedetails.fileId;

          this.createdby = this.filedetails.createdByName;

          this.fileCreatedById = this.filedetails.fileCreatedBy;
          this.createdOn = this.filedetails.CreatedOn;
          this.updatedOn = this.filedetails.updatedOn;
          // this.fileTags 
          let filetaglists:any = JSON.parse(this.filedetails.fileTags);
          let  fileTagsarr:any=[]
for(let i=0;i<filetaglists.length;i++){
  
  fileTagsarr.push(filetaglists[i].displayValue);

}

this.fileTags = fileTagsarr.join()
          this.metadetails = this.filedetails.metaDetail;
          this.folderId = this.filedetails.folderId;
          this.lockStatus = this.filedetails.lockStatus;
          this.fileVersion = this.filedetails.fileVersion;
          this.checkInCheckoutStatus = this.filedetails.checkInCheckoutStatus;
          this.checkinEligibility = this.filedetails.checkinEligibility;
        }
        if (responseResult.status == 400) {
          this.loading = false;
          this.filedetails = responseResult.result;
        }
        else if (responseResult.status == 501) {

          this.authService.directlogout();
        }
        else {
          this.loading = false;


        }
      }
      else {
        this.loading = false;
         this.authService.directlogout();
      }


    }, (error: any) => {
      this.loading = false;
      this.authService.directlogout();
    })

  }
  //\\ ======================== // Get file Type // ======================== //\\
  getfiletype(filename: any) {

    let icon: any;
    let iconsGroups: any = environment.iconsGroups;
    for (let i = 0; i < iconsGroups.length; i++) {
      let filetype: any = iconsGroups[i].groups.includes(filename);
      if (filetype == true) {
        icon = iconsGroups[i].name;
      }

    }
    return icon;

  }
  //\\ ======================== // Get file Type // ======================== //\\
  //\\ ======================== // File Modify // ======================== //\\ 
  fileModify(id: any) {
    let encSchemeStr = this.encDec.encText(id.toString());
    this.route.navigate(['/admin/modifyfile', encSchemeStr]);
  }
  //\\ ======================== // File Modify // ======================== //\\ 
  //\\ ======================== // Download File // ======================== //\\ 
  downloadfils(fid: any, fpath: any) {
    let dataParam = {
      "fileId": fid,
      "url": fpath
    };
    this.commonserveice.fileDownload(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == 200) {


          this.downloaditem = responseResult.result;
          this.downloadlink = this.downloaditem.filePath;
          let link: any = document.createElement("a");
          link.download = this.downloadlink;
          link.href = this.downloadlink;
          link.target = "_blank";
          link.click();

        }
        else if (responseResult.status == 501) {

          this.authService.directlogout();
        }
        else {
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong)
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
  //\\ ======================== // Download File // ======================== //\\ 

  //\\ ======================== // Move To Trash // ======================== //\\
  moveTrash(fileId: any, folderId: any) {
    let formParams = {
      "fileId": fileId

    };

    Swal.fire({
      title: this.commonserveice.langReplace('Are you sure')+' ?',
      text: this.commonserveice.langReplace("Files will be move to trash"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.commonserveice.langReplace('No'),
      confirmButtonText: this.commonserveice.langReplace('Yes')
    }).then((result: any) => {

      if (result.isConfirmed) {
        this.commonserveice.moveToTash(formParams).subscribe((response: any) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;

          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)
            if (responseResult.status == 200) {



              Swal.fire({
                icon: 'success',
                text: this.commonserveice.langReplace("Record has been trashed"),
                confirmButtonText: this.commonserveice.langReplace('Ok'),

              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  let encSchemeStr = this.encDec.encText(folderId.toString());
                  // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

                  this.route.navigate(['/admin/viewupload', encSchemeStr])
                  this.callfunction.emit();
                  this.callfunction2.emit();

                }
              })





            }
            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else {
              Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace(environment.somethingWrong)
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
          });
      }
    })
  }
  //\\ ======================== // Move To Trash // ======================== //\\
  //\\ ======================== // File Duplicate // ======================== //\\
  fileDuplicate(fileId: any, folderId: any) {
    let formParams = {
      "fileId": fileId

    };


    this.commonserveice.createDuplicate(formParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;


      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
        if (responseResult.status == 200) {

          Swal.fire({
            icon: 'success',
            text: this.commonserveice.langReplace("Duplicate file created successfully"),
            confirmButtonText: this.commonserveice.langReplace('Ok'),

          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {



              let encSchemeStr = this.encDec.encText(folderId.toString());
              // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

              this.route.navigate(['/admin/viewupload', encSchemeStr])

              this.callfunction.emit();
              this.callfunction2.emit();
            }
          })




        }
        else if (responseResult.status == 501) {

          this.authService.directlogout();
        }
        else {
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong)
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
      });


  }
  //\\ ======================== // File Duplicate // ======================== //\\
  //\\ ======================== // Modal Open // ======================== //\\ 
  open(content: any) {
    this.modalService.open(content, { size: '', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  closeModal() {
    this.modalService.dismissAll();
  }
  //\\ ======================== // Modal Close // ======================== //\\
  //\\ ======================== // Lock File // ======================== //\\
  lockFile(fileId: any, folderId: any, lockstatus: any) {
    this.open(this.lockModal);

    if (lockstatus == 1) {
      this.showlockfields = false;

    }
    else {
      this.showlockfields = true;

    }

  }


  //\\ ======================== // Lock File // ======================== //\\


  setPassword(folderId: any) {

    let password = this.txtPassword;
    let confpass = this.txtConPassword;

    if (!this.vldChkLst.blankCheck(password, this.commonserveice.langReplace("Please Enter Password",'txtPassword'),'txtPassword')) {

    }

    else if (!this.vldChkLst.chkPassword(password)) {

    }
    else if (!this.vldChkLst.blankCheck(confpass, this.commonserveice.langReplace("Enter Confirm Password",'txtConPassword'),'txtConPassword')) {

    }
    else if (!this.vldChkLst.chkPassword(confpass)) {

    }
    else if (password !== confpass) {
      Swal.fire({
        icon: 'error',
        text: this.commonserveice.langReplace('Entered password and Confirm Password not matched'),

      });
    }
    else {

      let formParams = {
        "fileId": this.fileid,
        "password": password,
        "action": 1
      };

      // console.log(formParams) 
      this.commonserveice.fileLockUnlock(formParams).subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            Swal.fire({
              icon: 'success',
              
              text: this.commonserveice.langReplace("File Locked Successfully")
            }).then((result: any) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
                let encSchemeStr = this.encDec.encText(folderId.toString());
                // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

                this.route.navigate(['/admin/viewupload', encSchemeStr])

                this.callfunction.emit();
                this.callfunction2.emit();

              }
            });


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
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(environment.somethingWrong)

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
        });

    }



  }
  //\\ ======================== // Lock File // ======================== //\\
  //\\ ======================== // Unlock File // ======================== //\\
  unsetPassword(folderId: any) {

    let password = this.txtUPassword;


    if (!this.vldChkLst.blankCheck(password, this.commonserveice.langReplace("Please Enter Password"),'txtUPassword')) {

    }

    else {

      let formParams = {
        "fileId": this.fileid,
        "password": password,
        "action": 2
      };

      // console.log(formParams) 
      this.commonserveice.fileLockUnlock(formParams).subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            Swal.fire({
              icon: 'success',
              text: this.commonserveice.langReplace('File Unlocked Successfully') ,

            }).then((result: any) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
                let encSchemeStr = this.encDec.encText(folderId.toString());
                // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

                this.route.navigate(['/admin/viewupload', encSchemeStr])

                this.callfunction.emit();
                this.callfunction2.emit();

              }
            });


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
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(environment.somethingWrong)

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
        });

    }



  }
  toggleFieldTextType() {
    if (this.password == 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }

  }

  toggleFieldCTextType() {
    if (this.cpassword == 'password') {
      this.cpassword = 'text';
      this.cshow = true;
    } else {
      this.cpassword = 'password';
      this.cshow = false;
    }

  }
  toggleFieldUTextType() {
    if (this.upassword == 'password') {
      this.upassword = 'text';
      this.ushow = true;
    } else {
      this.upassword = 'password';
      this.ushow = false;
    }

  }


  formatBytes(bytes: any, decimals: any) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
  //function for checkin checkout
  checkinCheckoutFile(fileid: any, folderId: any, checkInCheckoutStatus: any) {
    if (checkInCheckoutStatus <= 1) {
      this.showCheckinCheckoutField = false;
      this.open(this.checkinCheckoutModal);
    }
    else if(checkInCheckoutStatus == 2){
      this.showCheckinCheckoutField = true;
      let encSchemeStr = this.encDec.encText((this.folderId+":"+''+":"+''+":"+fileid).toString());
    
      this.route.navigate(['/admin/viewupload', encSchemeStr])
      // this.callfunction.emit();
      // this.callfunction2.emit();
    }
  }
  checkoutFile(fileId: any) {

    let remark = this.userRemark;


    if (!this.vldChkLst.blankCheck(remark, this.commonserveice.langReplace("Please Enter Remark"),'userRemark')) {

    }

    else {

      let formParams = {
        "fileId": fileId,
        "remark": remark,
        "action": 2
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
            Swal.fire({
              icon: 'success',
              text: 'File Check out Successful',

            }).then((result: any) => {
              if (result.isConfirmed) {
                this.downloadfils(fileId, this.filePath);
                this.modalService.dismissAll();
                let encSchemeStr = this.encDec.encText(this.folderId.toString());
                // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);
                this.route.navigate(['/admin/viewupload', encSchemeStr])
                this.callfunction.emit();
                this.callfunction2.emit();

              }
            });
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
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(environment.somethingWrong)

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
        });

    }
  }

  //function for checkin checkout
  //\\ ======================== // Temp Uplaoad On select // ======================== //\\
  onSelect(event: any) {
    this.files_dropped.push(...event.addedFiles);
    let addFilesLength = event.addedFiles.length;
    let newFile: FormData = new FormData();
    newFile.append('file', event.addedFiles[0])
    let filetype = event.addedFiles[0].name;
    this.fileLoading = true;
    let splititems = filetype.split('.', 2)
    newFile.append('fileType', splititems[1])
    newFile.append('folderId', this.folderId)
    //console.log(newFile);
    this.uploadfiles.uploadFile(newFile).subscribe((response: any) => {


      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == 200) {

          //  this.files_dropped.push(event.addedFiles);
          let obj: any = {};
          obj['fileName'] = responseResult.result.fileName;
          this.checkinfileName = responseResult.result.fileName;
          obj['filePath'] = responseResult.result.filePath;
          obj['fileType'] = responseResult.result.fileType;
          this.fileeList.push(obj)
          if (addFilesLength == 1) {
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
      (error: any) => {
        this.authService.directlogout();
      })
  }
  //\\ ======================== // Temp Uplaoad On select // ======================== //\\
  loadDocPreview(getfiletype: any, filepath: any) {
    this.previewFile = true;

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

        this.fileLoading = false;

        let dangerousVideoUrl = `${environment.iframeviewURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${filepath}`;
        this.publicurl = this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);


      }, 1000)
    }
  }
  onRemove(event: any) {
    this.fileeList.splice(this.fileeList.indexOf(event), 1);
    this.previewFile = false;
    //this.resetform()
  }
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
}
