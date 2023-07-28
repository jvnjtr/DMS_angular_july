// =============================================================================
// File Name		              : view-document.component.ts
// Description 	              : This page display all uploaded files and folders with details
// Created by                 : Bikash Kumar Panda
// Created on                 : 06-Jan-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 06-Jan-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 01-Feb-2023
// Style sheet                : view-document.component.scss

// =============================================================================

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilepropertiesComponent } from '../fileproperties/fileproperties.component';
import { SingleFolderdetailsComponent } from '../single-folderdetails/single-folderdetails.component';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { UploadfilesService } from '../../services/uploadfiles.service';



@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  //\\ ======================== // Variables // ======================== //\\ 
  @Input() folderid: any;
  @ViewChild('movetoFolderModal') movetoFolderModal: ElementRef;
  @ViewChild('scanFailureModal') scanFailureModal: ElementRef;
  @ViewChild("selectedFiles") selectedFiles: ElementRef;
  @ViewChild("searchField") searchField: ElementRef;
  @ViewChild(FilepropertiesComponent, { static: false }) childC: FilepropertiesComponent;
  @ViewChild(SingleFolderdetailsComponent, { static: false }) FchildC: SingleFolderdetailsComponent;
  @ViewChild('checkoutStatus') checkoutStatus: ElementRef;
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @Output("callfunction2") callfunction2: EventEmitter<any> = new EventEmitter();
  apkpath = environment.apkpath;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/createdocument.config.json";
  letterID: any = "";
  dimensions: any = [];
  dataArr: any = [];
  movefileid: any;
  ffdetailsArr: any = [];
  metalist: any = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  dataviewtype: any = 1;
  downloadlink: any = '';
  downloaditem: any;
  folderName: any;
  fileid: any = '';
  bookmarktype: any = ''
  filenumber: any;
  retensionid: any = '';
  retensionFolderid: any = '';
  filesName: any = '';
  updatedate: any;
  splitVal: any;
  splitId: any;
  nfolderid: any;
  retenstionDate: any;
  moveFolderid: any;
  movefilerefNo: any;
  movefileName: any;
  folderHierarchy: any = [];
  loading: any = false;
  txtSearch: any;
  fileversions: any;

  searchColList: any = ["Name", "Document No.", "Size", "Document", "Created by","Meta","Tags"]
  searchselcteditems: any = [];



  namesarray: any = [];
  refnoarray: any = [];
  filesizearray: any = [];
  documentdetails: any = [];
  createdbyarray: any = [];
  metaarray: any = [];
  tagsarray: any = [];
  finalarray: any = [];
  finalobj: any = {
    'Name': this.namesarray,
    'Reference': this.refnoarray,
    'Size': this.filesizearray,
    'Document': this.documentdetails,
    'Createdby': this.createdbyarray,
    'Meta': this.metaarray,
    'Tags': this.tagsarray
  };
  nobj: any = {};
  selectedfileid: any;
  selectedfolderid: any;
  selectedrtention: any;
  selectedfileRefNo: any;
  selectedfileName: any;
  selectedCreatedOn: any;
  loadFileversions: any = false;
  loadFileLogs:any=false;
  filePrperties: any;
  loadFileproperties: any = false;
  loadFileModify: any = false;
  loadFileretention: any = false;
  loadFilenumbering: any = false;
  loadFilemove: any = false;
  loaduploadfile: any = false;
  scannerTempUpload: any = false;
  createDoc:any=false;
  selectedfileType: any;
  fileModifyid: any;
  rowClicked: any;


  shareedid: any;
  shareedFolderid: any;
  loadsharefile: any = false;
  previewfileid: any;
  loadpreviewfile: any;
  toggle: boolean = false;
  clickvalue: any;
  folderinfo: any;
  filecheckStatus:any;



  loadFolderproperties: any = false;
  folderPropId: any=0;

  uploadNewFile: any = false;
  sessiontoken: any;
  desgId: any;

  loadSubFolder: any = false;
  parentfolderId: any;
  modifyFolderproperties: any = false;
  modifyfolderid: any;
  filefolderPropId: any;
  roleId: any;
  userPermissions: any;
  workflowfolderid: any;
  scannerfolderid: any;
  folderRead: any = false;
  folderModify: any = false;
  folderFileUpload: any = false;
  folderWorkflow: any = false;
  folderCreatesub: any = false;
  folderDelete: any = false;
  folderFileDownload: any = false;
  filemocetofolder: any = false;
  folderfildeDelete: any = false;
  createfolderid:any;
  hfolderName: any;
  prvlockfile: any;
  loadWorkFlow: any = false;
  filetype: any;
  fileCheckinCheckoutStatus: any;
  checkinCheckoutAllow: any = false;
  checkinModify:any;
  checkinFileId: any=0;
  selDiv: any = "";
  storedFiles: any = [];
  filelockStatus: any;
  scanfileeList: any = []

  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';
  tablecollist = [
    { "name": "Document No", "cname": "fileRefNo", "sortable": true },
    { "name": "Type", "cname": "fileType", "sortable": false },
    { "name": "Name", "cname": "fileName", "sortable": true },
    { "name": "Version", "cname": "fileVersion", "sortable": false },
    { "name": "Size", "cname": "fileSize", "sortable": true },
    { "name": "Created By", "cname": "createdByName", "sortable": true }
  ]


  //\\ ======================== // Variables // ======================== //\\ 

  constructor(private route: Router,
    private httpClient: HttpClient,
    private router: ActivatedRoute,
    public encDec: EncrypyDecrpyService,
    public commonserveice: CommonServicesService,
    public authService: AuthenticationService,
    private modalService: NgbModal,

    private uploadfiles: UploadfilesService,
  ) { }

  ngOnInit(): void {
    this.loadconfig();

/// ===== get Session values ===== \\\
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    this.desgId = SeetionParsed.USER_ID;
    this.roleId = SeetionParsed.ROLE_ID;
/// ===== get Session values ===== \\\


  /// ===== get Data using parammmap ===== \\\
    this.router.paramMap.subscribe((params: any) => {
      let encSchemeId = params.get("id");
      // alert(encSchemeId);
      let schemeStr = this.encDec.decText(encSchemeId);
      // console.log(schemeStr);
      let schemeArr: any = schemeStr.split(':');
      //console.log(schemeArr);
      this.folderid = schemeArr[0];
      this.bookmarktype = schemeArr[1];
      this.clickvalue = schemeArr[2];
      this.checkinFileId = schemeArr[3];
      this.viewDetails(this.folderid, this.finalobj)
      this.folderinfo = this.folderid;
    
      if(this.roleId == '1' ){
          this.folderRead=true;
          this.folderModify=true;
          this.folderFileUpload=true;
          this.folderWorkflow=true;
          this.folderCreatesub=true;
          this.folderDelete=true;
          this.filemocetofolder=true;
      
       }
      else{
        this.getFolderPermission(this.folderid)
      }
    

       if(this.checkinFileId > 1){
       
        this.clearFolderProperties();
        this.loadFileModify=true;
        this.loadFolderproperties=false;
        this.folderModify=true;
        this.checkinCheckoutAllow=false;
        this.checkinModify=false;
        this.loadFileModify=true;
        this.fileModify(
          this.selectedfileid,
          this.folderid,
          this.selectedfileName,
          this.filelockStatus,
          this.selectedfileType
        );
      

      }
       else{
    
        this.folderinfo=this.folderid;
        this.loadFolderproperties=false;
         this.folderRead=true;
          this.folderModify=true;
          this.folderWorkflow=true;
          this.folderCreatesub=true;
          this.checkinModify=false;
        this.folderproperties(this.folderid,-1);

        if(this.folderid != undefined){
          this.folderPropId=this.folderid;
          this.FchildC.getFolders(this.folderid);
        
         }
         
       }
  
    });
  /// ===== get Data using parammmap ===== \\\





  }

  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      this.title = data[0].pagetitle;
    },
      (error: any) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: error
        });
      })
  }




  //\\ ======================== // Load Data // ======================== //\\ 


  //\\ ======================== // Edit Folder // ======================== //\\
  getFolderPermission(fldrId: any) {
    //this.resetform();

    let dataParam = {
      "folderId": fldrId,
    };
    this.commonserveice.getFoldersSingle(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)


        if (responseResult.status == '200') {
          let folderDetails: any = responseResult.result;

          if (folderDetails.length > 0) {

            let permission: any = folderDetails[0].folderPermission[0].rolebased;

            for (let i = 0; i < permission.length; i++) {
              //console.log(permission[i].roleId)

              if (this.roleId == permission[i].roleId) {


                this.userPermissions = permission[i].permission;
                //console.log(this.userPermissions)
                /// ------------Read Permission------------- ///  
                if ((this.userPermissions[0].label == 'Read') && (this.userPermissions[0].selected == true)) {
                  this.folderRead = true;
                  
                } else {
                  this.folderRead = false;
                }
                /// ------------Read Permission------------- /// 

                /// ------------Write Permission------------- ///  
                if ((this.userPermissions[1].label == 'Write') && (this.userPermissions[1].selected == true)) {
                  this.folderModify = true;
                }
                else {
                  this.folderModify = false;
                }
                /// ------------Write Permission------------- ///
                /// ------------Download Permission------------- ///
                if ((this.userPermissions[2].label == 'Download') && (this.userPermissions[2].selected == true)) {
                  this.folderFileDownload = true;
                }
                else {
                  this.folderFileDownload = false;
                }
                /// ------------Download Permission------------- ///
                /// ------------Create Folder Permission------------- ///
                if ((this.userPermissions[3].label == 'Create Folder') && (this.userPermissions[3].selected == true)) {
                  this.folderCreatesub = true;
                }
                else {
                  this.folderCreatesub = false;
                }
                /// ------------Create Folder Permission------------- ///
                /// ------------Delete Permission------------- ///
                if ((this.userPermissions[4].label == 'Delete') && (this.userPermissions[4].selected == true)) {
                  this.folderDelete = true;
                }
                else {
                  this.folderDelete = false;
                }
                /// ------------Create Folder Permission------------- ///
                /// ------------Rename Permission------------- ///
                if ((this.userPermissions[5].label == 'Rename') && (this.userPermissions[5].selected == true)) {

                }
                else {

                }
                /// ------------Rename Permission------------- ///
                /// ------------Archive Permission------------- ///
                if ((this.userPermissions[6].label == 'Archive') && (this.userPermissions[6].selected == true)) {
                  this.folderfildeDelete = true;
                }
                else {
                  this.folderfildeDelete = false;
                }
                /// ------------Archive Permission------------- ///
                /// ------------WorkFlow Permission------------- ///
                if ((this.userPermissions[7].label == 'WorkFlow') && (this.userPermissions[7].selected == true)) {
                  this.folderWorkflow = true;
                }
                else {
                  this.folderWorkflow = false;
                }
                /// ------------WorkFlow Permission------------- ///
                /// ------------Move to folde Permission------------- ///
                if ((this.userPermissions[8].label == 'Move to folder') && (this.userPermissions[8].selected == true)) {
                  this.filemocetofolder = true;
                }
                else {
                  this.filemocetofolder = false;

                }
                /// ------------Move to folde Permission------------- ///


                //   {label: 'Read', selected: true}
                //   {label: 'Write', selected: false}
                //  {label: 'Download', selected: true}
                //  {label: 'Create Folder', selected: false}
                //  {label: 'Delete', selected: false}
                //  {label: 'Rename', selected: false}
                // {label: 'Archive', selected: false}
                // {label: 'WorkFlow', selected: false}
                //  {label: 'Move to folder', selected: false}
              }
            }


          }




        }
        else if (responseResult.status == 400) {
          Swal.fire({
            icon: 'error',
            text: responseResult.message
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
      })


  }
  //\\ ======================== // Edit Folder // ======================== //\\


  viewDetails(fid: any, searchitems: any) {

    this.loading = true;
    let dataParam = {
      "folderId": fid,
      "bookmarkStatus": this.bookmarktype,
      "searchfilter": searchitems
    };
    //  console.log(dataParam)
    this.commonserveice.folderWiseDetails(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
     
        if (responseResult.status == 200) {
          this.loading = false;
          
          this.ffdetailsArr = responseResult.result;
         this.loadHierarchy(this.folderid);
         this.rowClicked = -1;
        
        }
        else if (responseResult.status == 400) {
          this.loading = false;
          // Swal.fire({
          //   icon: 'error',
          //   text: responseResult.message,

          // });
        }
        else if (responseResult.status == 501) {

          this.authService.directlogout();
        }
        else {
          this.loading = false;
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
        this.loading = false;
        this.authService.directlogout();
      })

  }
  //\\ ======================== // Load Data // ======================== //\\ 
  //\\ ======================== // Table Pagination // ======================== //\\
  onTableDataChange(event: any) {
    this.page = event;
    // console.log(this.page +"==="+this.tableSize)
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }
  //\\ ======================== // Table Pagination // ======================== //\\
  //\\ ======================== // View Type // ======================== //\\ 
  tableview() { this.dataviewtype = 1; }
  boxview() { this.dataviewtype = 2; }
  //\\ ======================== // View Type // ======================== //\\ 

  //\\ ======================== // Relaod Folder Data // ======================== //\\ 
  loadFolderData(folderid: any) {
    this.rowClicked = -1
    this.searchselcteditems = [];
    this.finalobj = {
      'Name': this.namesarray,
    'Reference': this.refnoarray,
    'Size': this.filesizearray,
    'Document': this.documentdetails,
    'Createdby': this.createdbyarray,
    'Meta':this.metaarray,
    'Tags':this.tagsarray
    };
    let encSchemeStr = this.encDec.encText(folderid.toString());
    this.route.navigate(['/admin/viewupload', encSchemeStr])
    // this.loadHierarchy(folderid);
  }
  //\\ ======================== // Relaod Folder Data // ======================== //\\  
  //\\ ======================== // Load All // ======================== //\\  
  all() {
    let folderid: any = 1 + ':' + '0';
    let encSchemeStr = this.encDec.encText(folderid.toString());
    this.route.navigate(['/admin/viewupload', encSchemeStr])
  }
  //\\ ======================== // Load All // ======================== //\\  

  //\\ ======================== // Edit Folder // ======================== //\\
  getFolders(fldrId: any) {
    //this.resetform();

    let dataParam = {
      "folderId": fldrId,
    };
    this.commonserveice.getFoldersSingle(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)
        if (responseResult.status == '200') {
          let folderDetails: any = responseResult.result;

          if (folderDetails.length > 0) {

            //  console.log(this.hfolderName)  
            this.hfolderName = folderDetails[0].folderName;
            // folderpermissions
          }
        }
        else if (responseResult.status == 400) {
          Swal.fire({
            icon: 'error',
            text: responseResult.message
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
      })
  }
  //\\ ======================== // Edit Folder // ======================== //\\

  //\\ ======================== // Folder Hierarchy // ======================== //\\
  loadHierarchy(folderId: any) {

    this.folderHierarchy = [];
    this.loading = true;
    let dataParam = {
      "folderId": folderId,
      "bookmarkStatus": 0,
      "searchfilter": ''
    };
    this.commonserveice.getFoldersSingle(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == '200') {
          this.loading = false;
          let datares = responseResult.result;

          if (datares.length > 0) {
            this.folderHierarchy = [];
            let folderHierarchydetails: any;
            let gethyrachychild: any
            folderHierarchydetails = typeof datares[0].folderHierarchy == 'string' ? JSON.parse(datares[0].folderHierarchy) : datares[0].folderHierarchy;

            gethyrachychild = folderHierarchydetails.child;
            // console.log(gethyrachychild);
            for (let i = 0; i < gethyrachychild.length; i++) {

              this.folderHierarchy.push(gethyrachychild[i])
            }
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
      (error: any) => {
        this.loading = false;
        this.authService.directlogout();
      })
  }
  //\\ ======================== // Folder Hierarchy // ======================== //\\

  //\\ ======================== // Bookmark file // ======================== //\\ 
  addBookmark(fileId: any, folderId: any, fileBookmarkStatus: any) {
    let dataParam = {
      "fileId": fileId,
      "fileBookmarkStatus": fileBookmarkStatus,
      "folderId": folderId,

    };
    this.commonserveice.fileBookmark(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == 200) {
          if (fileBookmarkStatus == '1') {

            Swal.fire({
              icon: 'success',
              text: this.commonserveice.langReplace("Bookmarked Successfully"),
              confirmButtonText: ('Ok'),

            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                let fdetails: any = this.folderid + ":" + this.bookmarktype;
                let encSchemeStr = this.encDec.encText(fdetails.toString());
                this.route.navigate(['/admin/viewupload', encSchemeStr])

              }
            })


          }
          else {

            Swal.fire({
              icon: 'success',
              text: this.commonserveice.langReplace("Bookmark Removed Successfully"),
              confirmButtonText: this.commonserveice.langReplace('Ok'),

            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                let fdetails: any = this.folderid + ":" + this.bookmarktype;
                let encSchemeStr = this.encDec.encText(fdetails.toString());
                this.route.navigate(['/admin/viewupload', encSchemeStr])

              }
            })


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
      (error: any) => {
        this.loading = false;
        this.authService.directlogout();
      })

  }
  //\\ ======================== // Bookmark file // ======================== //\\   


  //\\ ======================== // Modal Open // ======================== //\\ 
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 


  closeModal() {
    this.modalService.dismissAll();
  }


  b64_to_utf8(str: any) {

    return decodeURIComponent(escape(window.atob(str)));
  }


  setSearchParam(searchref: any, txtSearch: any) {
    this.selectedfileid = '';
    this.txtSearch = '';

    let obj: any = {};
    obj["searchkey"] = searchref;
    obj["searchvalue"] = txtSearch;
    this.searchselcteditems.push(obj);

    this.searchField.nativeElement.focus();

    if (searchref == "Name") {

      this.namesarray.push(txtSearch);
    }
    else if (searchref == "Document No.") {
      this.refnoarray.push(txtSearch)
    }
    else if (searchref == "Size") {

      this.filesizearray.push(txtSearch)
    }
    else if (searchref == "Document") {
      this.documentdetails.push(txtSearch)
    }
    else if (searchref == "Created by") {
      this.createdbyarray.push(txtSearch)
    }
 else if (searchref == "Meta") {
      this.metaarray.push(txtSearch)
    }

 else if (searchref == "Tags") {
      this.tagsarray.push(txtSearch)
    }

    //console.log(this.finalobj)
   // this.cleartabdata()
    //this.folderid=1;
    //this.folderPropId=1;
    this.page = 1;
    // this.ffdetailsArr=[];
    console.log(this.finalobj)
    this.viewDetails(this.folderid, this.finalobj)
  }
  removeselitems(i: any, searchkey: any, txtSearch: any) {


    //this.ffdetailsArr = [];
   // this.cleartabdata()
    this.searchselcteditems.splice(i, 1);
    this.searchField.nativeElement.focus();

    if (searchkey == "Name") {


      const index: number = this.namesarray.indexOf(txtSearch);
      if (index !== -1) {
        this.namesarray.splice(index, 1);
      }


    }
    else if (searchkey == "Document No.") {
      const index: number = this.refnoarray.indexOf(txtSearch);
      if (index !== -1) {
        this.refnoarray.splice(index, 1);
      }

    }
    else if (searchkey == "Size") {
      const index: number = this.filesizearray.indexOf(txtSearch);
      if (index !== -1) {
        this.filesizearray.splice(index, 1);
      }


    }
    else if (searchkey == "Document") {
      const index: number = this.documentdetails.indexOf(txtSearch);
      if (index !== -1) {
        this.documentdetails.splice(index, 1);
      }


    }
    else if (searchkey == "Created by") {
      const index: number = this.createdbyarray.indexOf(txtSearch);
      if (index !== -1) {
        this.createdbyarray.splice(index, 1);
      }
    }
    else if (searchkey == "Meta") {
      const index: number = this.createdbyarray.indexOf(txtSearch);
      if (index !== -1) {
        this.metaarray.splice(index, 1);
      }
    }

    else if (searchkey == "Tags") {
      const index: number = this.createdbyarray.indexOf(txtSearch);
      if (index !== -1) {
        this.tagsarray.splice(index, 1);
      }
    }

if(this.searchselcteditems.length == 0){
  this.finalobj = {
    'Name': this.namesarray=[],
    'Reference': this.refnoarray=[],
    'Size': this.filesizearray=[],
    'Document': this.documentdetails=[],
    'Createdby': this.createdbyarray=[],
    'Meta':this.metaarray=[],
    'Tags':this.tagsarray=[]
  };
  this.viewDetails(this.folderid, this.finalobj)
}
else{
  this.viewDetails(this.folderid, this.finalobj)
}
    
  }


  //\\ ======================== // Row Click // ======================== //\\
  rowClick(fid: any, i: any, folderid: any, retention: any, fileRefNo: any, fileName: any, CreatedOn: any, lockStatus: any, fileType: any, checkInCheckoutStatus: any) {

    if (this.rowClicked === i) {

      this.rowClicked = -1;

    }
    else {

      if (checkInCheckoutStatus == 2) {
        this.checkinCheckoutAllow = false;
      } else {
        this.checkinCheckoutAllow = true;
        this.checkinFileId='';
      }
      this.rowClicked = i;
      this.folderPropId = '';
      this.selectedfolderid = '';
      this.selectedrtention = '';
      this.selectedfileid = '';
      this.selectedfileRefNo = '';
      this.selectedfileName = '';
      this.selectedCreatedOn = '';
      this.selectedfileType = '';
      this.filelockStatus = '';
      this.filecheckStatus='';
      this.selectedfileid = fid;
      this.selectedfolderid = folderid;
      this.selectedrtention = retention;

      this.selectedfileRefNo = fileRefNo;
      this.selectedfileName = fileName;
      this.selectedCreatedOn = CreatedOn;
      this.filelockStatus = lockStatus;
      this.selectedfileType = fileType;
      this.loadFileproperties = false;
      this.filePrperties = fid;
      this.filecheckStatus=checkInCheckoutStatus;
      this.clearProperties();
      this.loadFileproperties = true;

      this.childC.viewFileDetails(this.filePrperties);

    }


  }
  //\\ ======================== // Row Click // ======================== //\\
  cleartabdata() {
    this.rowClicked = -1;
    this.selectedfileid = '';
    this.loadFileproperties = false;
    this.clearProperties();
    // this.viewDetails(this.folderid,this.finalobj )
  }

  clearProperties() {
    //this.folderPropId='';
    this.loadFileversions = false;
    this.loadFileModify = false;
    this.loadFileproperties = false;
    this.loadFileversions = false;
    this.loadFileretention = false;
    this.loadsharefile = false;
    this.loadFilenumbering = false;
    this.loadpreviewfile = false;

    this.loadFilemove = false;
    this.loadFileLogs = false;
  }
  //\\ ======================== // Row Click // ======================== //\\
  fileproperties(fileId: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.filePrperties = fileId;
    this.clearProperties();
    this.loadFileproperties = true;

  }
  //\\ ======================== // Row Click // ======================== //\\

  //\\ ======================== // File Modify // ======================== //\\ 
  fileModify(id: any, folderid: any, fileName: any, filelockStatus: any, selectedfileType: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.fileModifyid = id;
    this.filefolderPropId = folderid;
    this.prvlockfile = filelockStatus;
    this.filetype = selectedfileType;


    this.clearProperties();
    this.loadFileModify = true;

  }
  //\\ ======================== // File Modify // ======================== //\\ 


  //\\ ======================== // File versions // ======================== //\\ 
  viewVersions(fileId: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.fileversions = fileId;
    this.clearProperties();
    this.loadFileversions = true;

  }
  //\\ ======================== // File versions // ======================== //\\ 
   //\\ ======================== // File logs // ======================== //\\ 
   viewFileLogs(fileId: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.fileversions = fileId;
    this.clearProperties();
    this.loadFileLogs = true;

  }
  //\\ ======================== // File logs // ======================== //\\ 
  //\\ ======================== // Retention file // ======================== //\\ 
  retentionFile(fileid: any, folderId: any, retentionDate: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.retensionid = fileid;
    this.retensionFolderid = folderId;
    this.retenstionDate = retentionDate;
    this.clearProperties();
    this.loadFileretention = true;
  }
  //\\ ======================== // Retention file // ======================== //\\ 

  //\\ ======================== // Share Document // ======================== //\\   
  shareDoc(fileid: any, folderId: any) {
    this.shareedid = fileid;
    this.shareedFolderid = folderId;
    this.clearProperties();
    this.loadsharefile = true;
    // let encSchemeStr = this.encDec.encText(id.toString());
    // this.route.navigate(['/admin/shareFile', encSchemeStr]);
    // $('.portletfix-height2').removeClass('overflohidden');
  }
  //\\ ======================== // Share Document // ======================== //\\
  //\\ ======================== // Preview Document // ======================== //\\ 
  previewDoc(fileid: any, fileName: any, filelockStatus: any, selectedfileType: any) {
    //alert('0')
    // $('.portletfix-height2').addClass('overflohidden')
    this.resizediv(1)
    this.previewfileid = fileid;
    this.prvlockfile = filelockStatus;
    this.filetype = selectedfileType;

    this.clearProperties();
    this.loadpreviewfile = true;

  }
  //\\ ======================== // Preview Document // ======================== //\\ 

  //\\ ======================== // File Numbering // ======================== //\\
  filenumbering(fid: any, filenumber: any, fileName: any, updatedate: any, folderId: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    //this.open(this.numberingModal);
    this.clearProperties();
    this.loadFilenumbering = true;
    this.fileid = fid;
    this.filenumber = filenumber;
    this.filesName = fileName;
    this.updatedate = updatedate;
    this.nfolderid = folderId;
    const words = filenumber.split('/');
    this.splitVal = words[0] + '/' + words[1] + '/' + words[2] + '/';
    this.splitId = words[3];
  }
  //\\ ======================== // File Numbering // ======================== //\\ 


  //\\ ======================== // Move file // ======================== //\\ 
  moveFile(fileid: any, folderId: any, fileRefNo: any, fileName: any) {
    //this.open(this.movetoFolderModal);
    this.clearProperties();
    this.movefileid = fileid;
    this.moveFolderid = folderId;
    this.movefilerefNo = fileRefNo;
    this.movefileName = fileName;

    this.loadFilemove = true
  }
  //\\ ======================== // Move file // ======================== //\\

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
  resizediv(openflag: any) {
    this.toggle = !this.toggle;
    let fcard = <HTMLInputElement>document.getElementById('first-card');
    let fileproperties = <HTMLInputElement>document.getElementById('filepropertiessection');

    if (this.toggle == true || openflag == 1) {



      fcard.style.height = "0px";
      fcard.style.overflow = "hidden";
      fileproperties.style.height = "80vh";

    }
    else {

      fcard.style.height = "430px";
      fcard.style.overflow = "hidden";
      fileproperties.style.height = "35vh";


    }
  }

  //\\ ======================== // Folder click // ======================== //\\
  folderproperties(folderId: any, i: any) {
    this.rowClicked = -1

    this.selectedfileid = '';
    this.clearFolderProperties()
    this.folderPropId = folderId;

    this.loadFolderproperties = true;
// console.log(this.FchildC)
  this.FchildC.getFolders(this.folderPropId)

  }
  modifyfolderproperties(folderId: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.clearFolderProperties()
    this.modifyfolderid = folderId;
    this.modifyFolderproperties = true;

  }


  //\\ ======================== // Folder click // ======================== //\\
  createFolder(folderid: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    let encSchemeStr = this.encDec.encText(folderid.toString());
    this.route.navigateByUrl('/admin/newfolder')

  }
  createsubFolder(folderid: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.clearFolderProperties();
    this.parentfolderId = folderid;
    this.loadSubFolder = true;
  }

  configureWorkflow(folderid: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.clearFolderProperties();
    this.workflowfolderid = folderid;
    this.loadWorkFlow = true;
  }

  uploadFile(folderid: any) {
    // $('.portletfix-height2').removeClass('overflohidden');
    this.clearFolderProperties()
    this.folderPropId = folderid;
    this.uploadNewFile = true;


  }

  clearFolderProperties() {

    this.loadFolderproperties = false;
    this.uploadNewFile = false;
    this.loadSubFolder = false;
    this.modifyFolderproperties = false;
    this.loadWorkFlow = false;
    this.loaduploadfile = false;
    this.loaduploadfile = false;
    this.scannerTempUpload = false;
   // this.createDoc = false;
  }

  async dataURLtoFile(dataurl: any, filename: any, ftype: any) {


    const blob = await (await fetch(dataurl)).blob()
    return new File([blob], filename, { type: blob.type })

  }
  loadScanner(folderid: any) {
    this.clearFolderProperties();
    this.scannerfolderid = folderid;
    this.scannerTempUpload=true;
  
  }

  // loadCreateDocuemnt(folderid: any) {
  //   this.clearFolderProperties();
  //   this.createfolderid = folderid;
  //   this.createDoc=true;
  
  // }



 
  //\\ ======================== // Data sorting // ======================== //\\



  onSortClick(name: any, event: any) {

    let target = event.currentTarget,
      classList = target.classList;


    if (classList.contains('bi-arrow-up')) {
      classList.remove('bi-arrow-up');
      classList.add('bi-arrow-down');
      this.sortDir = -1;
    } else {
      classList.add('bi-arrow-up');
      classList.remove('bi-arrow-down');
      this.sortDir = 1;
    }
    this.sortArr(name);

    //this.sortArr('departmentName');
  }

  sortArr(colName: any) {

    this.sortColumn = colName;
    if (this.sortOrder == 'asc') {
      this.sortOrder = 'desc';
    }
    else {
      this.sortOrder = 'asc';
    }

    this.ffdetailsArr = this.ffdetailsArr.sort((a: any, b: any) => {
     
      if(this.sortOrder == 'asc'){
        return a[colName].localeCompare(b[colName], 'en', { numeric: true });
      }
      else{
        return b[colName].localeCompare(a[colName], 'en', { numeric: true });
      }
   
    })






  }

  //\\ ======================== // Data sorting // ======================== //\\

  formatBytes(bytes: any, decimals: any) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  //===================this function will show only the file last checkout status.================//
  showCheckIncheckoutStatus(fileId: any, checkInCheckoutStatus: any) {
    if (checkInCheckoutStatus == 2) {
      // this.open(this.checkoutStatus);
      let remark = '';
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
         // console.log(responseResult);
          if (responseResult.status == 200) {
            // this.downloadfils(fileId, this.filePath);
            Swal.fire({
              icon: 'success',
              text: 'File Check out Successful',

            }).then((result: any) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
                let encSchemeStr = this.encDec.encText(fileId.toString());
                // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);

                this.route.navigate(['/admin/viewupload', encSchemeStr])

                // this.callfunction.emit();
                // this.callfunction2.emit();

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
              text: this.commonserveice.langReplace(environment.somethingWrong),

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
  //===================this function will show only the file last checkout status.================//


}
