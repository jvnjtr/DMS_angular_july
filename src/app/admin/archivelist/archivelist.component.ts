import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Buffer } from 'buffer';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { LangReplacePipe } from 'src/app/lang-replace.pipe';

@Component({
  selector: 'app-archivelist',
  templateUrl: './archivelist.component.html',
  styleUrls: ['./archivelist.component.scss']
})
export class ArchivelistComponent implements OnInit {

  //\\ ======================== // Variables // ======================== //\\ 
  @ViewChild('previewModal') previewModal: ElementRef;
  @ViewChild("searchField") searchField: ElementRef;
  filetype:any;
previewfileid:any;

  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/archiveList.config.json";
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


  filesName: any = '';
  folderHierarchy: any;
  loading: any = false;
  txtSearch: any;

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
  logId:any;
  vfilepath:any;
  lockstatus:any;

  sortDir = 1;//1= 'ASE' -1= DSC
  sortOrder: string = 'asc';
  sortColumn: string = 'ticker';
  
  tablecollist=[
    {"name":"Document No","cname":"fileRefNo","sortable":true },
      {"name":"Folder Name","cname":"folderName","sortable":true },
     
    {"name":"Name","cname":"fileName","sortable":true },
    {"name":"Type","cname":"fileType","sortable":true },
    {"name":"Size","cname":"fileSize","sortable":true },
    {"name":"Created By","cname":"createdByName","sortable":true },
  ]
  langKey: any = 'en';

  //\\ ======================== // Variables // ======================== //\\ 



  constructor(private route: Router,
    private httpClient: HttpClient,
    private router: ActivatedRoute,
    public encDec: EncrypyDecrpyService,
    public commonserveice: CommonServicesService,
    public authService: AuthenticationService,
    private modalService: NgbModal,
    private pipeName: LangReplacePipe
  ) { }


  ngOnInit(): void {
    this.loadconfig();
    this.viewDetails(this.finalobj)
  }

  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      this.title = data[0].pagetitle;
    })
  }







  //\\ ======================== // Load Data // ======================== //\\ 
  viewDetails(searchitems: any) {
    this.loading = true;
    let dataParam = {
      "searchfilter": searchitems
    };
    this.commonserveice.getArchiveFiles(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res.toString());
  
        if (responseResult.status == 200) {
  
          this.loading = false;
          this.ffdetailsArr = responseResult.result;
         
  
        }
       else if (responseResult.status == 400) {
          this.loading = false;
          this.ffdetailsArr = responseResult.result;
        }
        else if (responseResult.status == 501) {
  
          this.authService.directlogout();
        }
        else{
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong ),
  
          });
        }
      }
      else{
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




  //\\ ======================== // Delete // ======================== //\\
  delete(fileId: any) {
    let formParams = {
      "fileId": fileId,
      "archieveAction": 1
    };

    Swal.fire({
      title: this.commonserveice.langReplace('Are you sure')+ ' ?',
      text: this.commonserveice.langReplace(this.messaageslist.deleteWarn),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.commonserveice.langReplace('Cancel'),
      confirmButtonText: this.commonserveice.langReplace('Yes')
    }).then((result: any) => {

      if (result.isConfirmed) {
        this.commonserveice.archiveAction(formParams).subscribe((response: any) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res.toString());
          if (responseResult.status == 200) {

            Swal.fire(
              this.commonserveice.langReplace('Deleted')+' !',
              this.messaageslist.deleteMsg,
              'success'
            )
            this.viewDetails(this.finalobj)

          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else if (responseResult.status == 400) {

            Swal.fire({
              icon: 'error',
              text: responseResult.message,

            });
          }
          else {
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(environment.somethingWrong),
    
            });

          }
          }
          else{
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


  //\\ ======================== // Delete // ======================== //\\
  //\\ ======================== // restore file // ======================== //\\
  restore(fileId: any) {
    let formParams = {
      "fileId": fileId,
      "archieveAction": 0
    };

    //console.log(formParams);


    this.commonserveice.archiveAction(formParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res.toString());
  
  
        if (responseResult.status == 200) {
  
          Swal.fire({
            icon: 'success',
            text: this.commonserveice.langReplace(this.messaageslist.restoreSuccess),
  
          });
          this.viewDetails(this.finalobj)
  
        }
        else if (responseResult.status == 501) {
  
          this.authService.directlogout();
        }
        else if (responseResult.status == 400) {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: responseResult.message,
  
          });
        }
        else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong),
  
          });
        }
      }
      else{
        this.loading = false;
       this.authService.directlogout();
      }



    },
      (error: any) => {
        this.loading = false;
      this.authService.directlogout();
      });


  }
  //\\ ======================== // restore file // ======================== //\\
  setSearchParam(searchref: any, txtSearch: any) {
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
    this.ffdetailsArr = [];

    this.page = 1;
    this.viewDetails(this.finalobj)
  }
  removeselitems(i: any, searchkey: any, txtSearch: any) {


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
      this.viewDetails(this.finalobj)
    }
    else{
      this.viewDetails(this.finalobj)
    }
  }

  loadpreview(fileid:any,fileType:any,logId:any,filePath:any,lockStatus:any)
{
  this.open(this.previewModal);
  
      this.previewfileid=fileid;
     
      this.logId=logId;
      this.vfilepath=filePath;
      this.lockstatus=lockStatus;
      this.filetype=fileType
     
     
      
    
}


open(content: any) {
  this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
 }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 
closeModal(){
  this.modalService.dismissAll();
}



getfiletype(filename:any){
  
  let icon:any;
  let iconsGroups:any=environment.iconsGroups;
   for(let i=0;i<iconsGroups.length;i++){
   let filetype:any= iconsGroups[i].groups.includes(filename);
     if(filetype==true){
       icon=iconsGroups[i].name;
     }
    
   }
 return icon;

}


   //\\ ======================== // Data sorting // ======================== //\\



   onSortClick(name:any,event:any) {
   
    let target = event.currentTarget,
      classList = target.classList;
  
  
    if (classList.contains('bi-arrow-up')) {
      classList.remove('bi-arrow-up');
      classList.add('bi-arrow-down');
      this.sortDir=-1;
    } else {
      classList.add('bi-arrow-up');
      classList.remove('bi-arrow-down');
      this.sortDir=1;
    }
    this.sortArr(name);
    
    //this.sortArr('departmentName');
  }
  
  sortArr(colName:any){
   
   this.sortColumn = colName;
   if (this.sortOrder == 'asc'){
    this.sortOrder = 'desc';
   }
  else{
    this.sortOrder = 'asc';
  }
  
     this.ffdetailsArr = this.ffdetailsArr.sort((a: any, b: any) => {
     
    if(this.sortOrder == 'asc'){
      return a[colName].localeCompare(b[colName], undefined, { numeric: true });
    }
    else{
      return b[colName].localeCompare(a[colName], undefined, { numeric: true });
    }
 
  })    
    
    // this.ffdetailsArr = this.ffdetailsArr.sort((a:any, b:any) => {
    //   if (a[colName] < b[colName])
    //     return this.sortOrder == 'asc' ? -1 : 1;
    //   if (a[colName] > b[colName])
    //     return this.sortOrder == 'asc' ? 1 : -1;
    //   return 0;
    // })
  
  
  }
  
    //\\ ======================== // Data sorting // ======================== //\\
    formatBytes(bytes:any, decimals:any) {
      if (!+bytes) return '0 Bytes'
  
      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
      const i = Math.floor(Math.log(bytes) / Math.log(k))
  
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }
  

}

