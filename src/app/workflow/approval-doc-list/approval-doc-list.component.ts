import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { WorkflowService } from '../../services/workflow.service';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { environment } from '../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-approval-doc-list',
  templateUrl: './approval-doc-list.component.html',
  styleUrls: ['./approval-doc-list.component.scss']
})
export class ApprovalDocListComponent implements OnInit {

  @ViewChild("searchField") searchField: ElementRef;
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewSummaryApproval.config.json";

  letterID:any="";
  pendingDocList:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50,100,500,1000];
  downloadlink:any;
  downloaditem:any;
txtSearch:any;
searchColList:any=["Name","Document No.","Size","Document","Pending At","Created by","Meta","Tags"]
searchselcteditems:any=[];

lockstatus:any;
namesarray:any=[];
refnoarray:any=[];
filesizearray:any=[];
pendingat:any=[];
createdbyarray:any=[];
documentdetails:any=[];
metaarray: any = [];
tagsarray: any = [];
finalarray:any=[];
finalobj: any = {
  'Name':this.namesarray,
  'Reference':this.refnoarray,
  'Size':this.filesizearray,
  'Document':this.documentdetails,
  'pendingAtName':this.pendingat,
  'Createdby':this.createdbyarray,
  'Meta': this.metaarray,
  'Tags': this.tagsarray
}; 
roleId:any;
sessiontoken:any;
userLoginId:any;
loading:any=false;
filetype:any;
previewfileid:any;
filePath:any;
logId:any;


sortDir = 1;//1= 'ASE' -1= DSC
sortOrder: string = 'asc';
sortColumn: string = 'ticker';

tablecollist=[
  {"name":"Document No","cname":"fileRefNo","sortable":true },
    {"name":"Folder Name","cname":"folderName","sortable":true },
   
  {"name":"Name","cname":"fileName","sortable":true },

  {"name":"Size","cname":"fileSize","sortable":true },
  {"name":"Action Taken By","cname":"createdByName","sortable":true },
  {"name":"Action Taken On","cname":"CreatedOn","sortable":true },
]

@ViewChild('previewModal') previewModal: ElementRef;

  constructor(
    private route: Router,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private workFlowServices: WorkflowService,
    public encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.viewPendingList(this.finalobj);
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
     
    this.userLoginId=SeetionParsed.USER_LOGINID;
 
    this.roleId=SeetionParsed.ROLE_ID;  
  }
  
  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
         this.tablist=data[0].tabList;
           this.utillist=data[0].utils
           this.messaageslist=data[0].messages; 
           this.title = data[0].pagetitle;
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })
   }






   //\\ ======================== // get meta list // ======================== //\\
viewPendingList(searchitems:any){


 
  let dataParam = {
    "searchfilter":searchitems
    };
    this.loading=true;
    this.workFlowServices.summeylist(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
            
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
         
          if (responseResult.status == 200) {
            this.loading=false;
          this.pendingDocList = responseResult.result;
         
        
          }
          else if((responseResult.status==400)){
            this.loading=false;
            this.pendingDocList=[];
          }
         
          else{
            this.loading=false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
          }
            }
            else{
              this.loading = false;
              this.authService.directlogout();
            }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })



}
 //\\ ======================== // get Meta list // ======================== //\\

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




 //\\ ======================== // File Modify // ======================== //\\ 
 viewHistory(id:any) {
  let encSchemeStr = this.encDec.encText(id.toString());
  this.route.navigate(['/workflow/filehistory', encSchemeStr]);
}
//\\ ======================== // File Modify // ======================== //\\ 
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
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
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
    else if(responseResult.status==501){
        
      this.authService.directlogout();
    }
    else{
      this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
    }
      }
      else{
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

setSearchParam(searchref:any,txtSearch:any){
 
  this.txtSearch='';

  let obj: any = {};
  obj["searchkey"] = searchref ;
  obj["searchvalue"] = txtSearch;
  this.searchselcteditems.push(obj);

  this.searchField.nativeElement.focus();
  
  if(searchref == "Name"){

       this.namesarray.push(txtSearch);
    }
    else if(searchref =="Document No."){
      this.refnoarray.push(txtSearch)
    }
    else if(searchref =="Size"){
   
      this.filesizearray.push(txtSearch)
    }
    else if(searchref =="Document"){
      this.documentdetails.push(txtSearch)
     }
    else if(searchref =="Pending At"){
     this.pendingat.push(txtSearch)
    }
    
    else if(searchref =="Created by"){
      this.createdbyarray.push(txtSearch)
     }
     else if (searchref == "Meta") {
      this.metaarray.push(txtSearch)
    }

 else if (searchref == "Tags") {
      this.tagsarray.push(txtSearch)
    }
   //console.log(this.finalobj)
   this.page = 1;
   this.pendingDocList=[];
    this.viewPendingList(this.finalobj)
}
  removeselitems(i:any,searchkey:any,txtSearch:any){
   
     this.searchselcteditems.splice(i,1);
     this.searchField.nativeElement.focus();

  if(searchkey == "Name"){
  
    
    const index: number = this.namesarray.indexOf(txtSearch);
    if (index !== -1) {
        this.namesarray.splice(index, 1);
    }   


  }
  else if(searchkey =="Document No."){
    const index: number = this.refnoarray.indexOf(txtSearch);
    if (index !== -1) {
        this.refnoarray.splice(index, 1);
    }   

  }
  else if(searchkey =="Size"){
    const index: number = this.filesizearray.indexOf(txtSearch);
    if (index !== -1) {
        this.filesizearray.splice(index, 1);
    }   

  
  }
  else if(searchkey =="Pending At"){
    const index: number = this.pendingat.indexOf(txtSearch);
    if (index !== -1) {
        this.pendingat.splice(index, 1);
    }   

  
  }
  else if(searchkey =="Document"){
    const index: number = this.documentdetails.indexOf(txtSearch);
    if (index !== -1) {
        this.documentdetails.splice(index, 1);
    }   

  
  }
  else if(searchkey =="Created by"){
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
      'pendingAtName':this.pendingat=[],
      'Createdby': this.createdbyarray=[],
      'Meta':this.metaarray=[],
      'Tags':this.tagsarray=[]
    };
    this.viewPendingList(this.finalobj)
  }
  else{
    this.viewPendingList(this.finalobj)
  }
  
  }
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
   }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  closeModal(){
    this.modalService.dismissAll();
  }
  loadpreview(fileid:any,filePath:any,logid:any,fileName:any,lockStatus:any,fileType:any)
  {
  //  this.open(this.previewModal);
    
      //   this.previewfileid=fileid;
      //  this.filePath=filePath;
      //  this.logId=logid;
      //  this.lockstatus=lockStatus;
      // this.filetype=fileType;
      
      this.previewfileid=fileid;
      this.filePath=filePath;
      this.lockstatus=lockStatus;
      this.logId=logid;
      this.filetype=fileType;
    let encSchemeStr = this.encDec.encText((this.previewfileid+':'+this.filePath+':'+this.lockstatus+':'+this.logId+':'+this.filetype).toString());
   
    const url = environment.siteURL+`#/windowPrev/`+encSchemeStr;
    const w = screen.width * 0.9;
    const h = screen.height * 0.8;
    const left = (screen.width / 2) - (w / 2);
    const top = (screen.height / 2) - (h / 2);
    const randomnumber = Math.floor((Math.random() * 100) + 1);
    // tslint:disable-next-line:max-line-length
    window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
   
      
  }


   //\\ ======================== // Data sorting // ======================== //\\



}
