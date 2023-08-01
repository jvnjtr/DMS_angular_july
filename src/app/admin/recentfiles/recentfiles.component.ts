// =============================================================================
// File Name		              : recenetfiles.component.ts
// Description 	              : This page display all recently viewd files
// Created by                 : Bikash Kumar Panda
// Created on                 : 06-Jan-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 06-Jan-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 01-Feb-2023
// Style sheet                : recenetfiles.component.scss

// =============================================================================
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilepropertiesComponent } from '../fileproperties/fileproperties.component';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recentfiles',
  templateUrl: './recentfiles.component.html',
  styleUrls: ['./recentfiles.component.scss']
})
export class RecentfilesComponent implements OnInit {

 //\\ ======================== // Variables // ======================== //\\ 
 @Input() folderid: any;
 @ViewChild('movetoFolderModal') movetoFolderModal: ElementRef;
 @ViewChild("searchField") searchField: ElementRef;
 @ViewChild(FilepropertiesComponent, { static: false }) childC: FilepropertiesComponent;


 title: any;
 tablist: any;
 utillist: any;
 messaageslist: any;
 jsonurl = "assets/js/_configs/viewRecentfiles.config.json";
 letterID: any = "";
 dimensions: any = [];
 dataArr: any = [];
 movefileid:any;
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
 moveFolderid:any;
movefilerefNo:any;
movefileName:any;
folderHierarchy: any;
loading:any=false;
txtSearch:any;
fileversions:any;

searchColList:any=["Name","Document No.","Size","Document","Created by","Meta","Tags"]
searchselcteditems:any=[];



namesarray:any=[];
refnoarray:any=[];
filesizearray:any=[];
documentdetails:any=[];
createdbyarray:any=[];
metaarray: any = [];
tagsarray: any = [];
finalarray:any=[];
finalobj: any = {
  'Name':this.namesarray,
  'Reference':this.refnoarray,
  'Size':this.filesizearray,
  'Document':this.documentdetails,
  'Createdby':this.createdbyarray,
  'Meta': this.metaarray,
  'Tags': this.tagsarray
}; 
nobj: any = {};
selectedfileid:any;
selectedfolderid:any;
selectedrtention:any;
selectedfileRefNo:any;
selectedfileName:any;
selectedCreatedOn:any;
loadFileversions:any=false;
filePrperties:any;
selectedfileType:any;
loadFileproperties:any=false;
loadFileModify:any=false;
loadFileretention:any=false;
loadFilenumbering:any=false;
fileModifyid:any;
rowClicked:any;


shareedid:any;
shareedFolderid:any;
loadsharefile:any=false;
previewfileid:any;
loadpreviewfile:any;
toggle:boolean = false;
filetype:any;
filelockStatus:any;
prvlockfile:any;

sortDir = 1;//1= 'ASE' -1= DSC
sortOrder: string = 'asc';
sortColumn: string = 'ticker';

tablecollist=[
  {"name":"Document No","cname":"fileRefNo","sortable":true },
    {"name":"Folder Name","cname":"folderName","sortable":true },
    {"name":"Name","cname":"fileName","sortable":true },


  {"name":"Version","cname":"fileVersion","sortable":false },
  {"name":"Size","cname":"fileSize","sortable":true },
  {"name":"Created By","cname":"createdByName","sortable":true },
  {"name":"Created On","cname":"CreatedOn","sortable":true }
]
	



//\\ ======================== // Variables // ======================== //\\ 

 constructor(private route: Router,
   private httpClient: HttpClient,
   private router: ActivatedRoute,
   public encDec: EncrypyDecrpyService,
   public commonserveice: CommonServicesService,
   public authService: AuthenticationService,
   private modalService: NgbModal,
 ) { }

 ngOnInit(): void {
   this.loadconfig();
     this.router.paramMap.subscribe((params: any) => {
       let encSchemeId = params.get("id");
       let schemeStr = this.encDec.decText(encSchemeId);
       let schemeArr: any = schemeStr.split(':');
       this.folderid = schemeArr[0];
     
       this.bookmarktype = schemeArr[1];
       this.viewDetails(this.folderid,this.finalobj )
       this.loadHierarchy(this.folderid)
     });

 }

 loadconfig() {
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
 



//\\ ======================== // Load Data // ======================== //\\ 
 viewDetails(fid: any,searchitems:any) {
   this.loading=true;
   let dataParam = {
    
     "searchfilter":searchitems
   };
   this.commonserveice.getrecentFiles(dataParam).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
       let res:any = Buffer.from(respData,'base64'); 
       let responseResult = JSON.parse(res)
  
       if (responseResult.status == 200) {
         this.loading=false;
           this.ffdetailsArr = responseResult.result;
          console.log(this.ffdetailsArr)
          this.rowClicked = -1;
        }
       if (responseResult.status == 400) {
         this.loading=false;
         this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message ))
        
       }
       else if(responseResult.status==501){
          
        this.authService.directlogout();
      }
       else{
       
         this.loading=false;
   
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
   let encSchemeStr = this.encDec.encText(folderid.toString());
   this.route.navigate(['/admin/viewupload', encSchemeStr])
 }
 //\\ ======================== // Relaod Folder Data // ======================== //\\  
 //\\ ======================== // Load All // ======================== //\\  
 all() {
   let folderid: any = 0 + ':' + '0';
   let encSchemeStr = this.encDec.encText(folderid.toString());
   this.route.navigate(['/admin/viewupload', encSchemeStr])
  }
//\\ ======================== // Load All // ======================== //\\  
//\\ ======================== // Folder Hierarchy // ======================== //\\
 loadHierarchy(folderId: any) {
   
   let dataParam = {
     "folderId": folderId,
   };
   this.commonserveice.folderHierarchy(dataParam).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
     let respToken = response.RESPONSE_TOKEN;

     let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
     if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
     let responseResult = JSON.parse(res)

     if (responseResult.status == '200') {
       this.folderHierarchy = responseResult.result.folderDetails;
      // cleartabdata()
      this.rowClicked = -1;
      this.selectedfileid='';
      this.clearProperties();
     }
     else if(responseResult.status==501){
        
      this.authService.directlogout();
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
//\\ ======================== // Folder Hierarchy // ======================== //\\

//\\ ======================== // Bookmark file // ======================== //\\ 
 addBookmark(fileId: any, folderId: any, fileBookmarkStatus: any) {
    let dataParam = {
     "fileId": fileId,
     "fileBookmarkStatus": fileBookmarkStatus,
     "folderId": folderId,

   };
   this.commonserveice.fileBookmark(dataParam).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
 
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
       let res:any = Buffer.from(respData,'base64'); 
       let responseResult = JSON.parse(res)
  
       if (responseResult.status == 200) {
         if (fileBookmarkStatus == '1') {
  
           Swal.fire({
             icon: 'success',
             text:  this.commonserveice.langReplace("Bookmarked Successfully"),
             confirmButtonText: this.commonserveice.langReplace('Ok'),
            
           }).then((result) => {
             /* Read more about isConfirmed, isDenied below */
             if (result.isConfirmed) {
               window.location.reload();
              
             }
           })
  
          
     }
         else {
  
           Swal.fire({
             icon: 'success',
             text:  this.commonserveice.langReplace("Bookmark Removed Successfully"),
             confirmButtonText: this.commonserveice.langReplace('Ok'),
            
           }).then((result) => {
             /* Read more about isConfirmed, isDenied below */
             if (result.isConfirmed) {
               window.location.reload();
              
             }
           })
  
        
         }
  
  
       }
       else if(responseResult.status==501){
          
        this.authService.directlogout();
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
//\\ ======================== // Bookmark file // ======================== //\\   

//\\ ======================== // Move file // ======================== //\\ 
moveFile(fileid: any,folderId:any,fileRefNo:any,fileName:any) {
   this.open(this.movetoFolderModal);
   this.movefileid = fileid;
   this.moveFolderid = folderId;
   this.movefilerefNo = fileRefNo;
   this.movefileName = fileName;
}
//\\ ======================== // Move file // ======================== //\\
//\\ ======================== // Modal Open // ======================== //\\ 
 open(content: any) {
     this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
 }
//\\ ======================== // Modal Open // ======================== //\\ 



closeModal(){
 this.modalService.dismissAll();
}
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
   else if(searchref =="Created by"){
     this.createdbyarray.push(txtSearch)
    }
    else if (searchref == "Meta") {
      this.metaarray.push(txtSearch)
    }

 else if (searchref == "Tags") {
      this.tagsarray.push(txtSearch)
    }
    this.page = 1;
    this.ffdetailsArr=[];
   this.viewDetails(this.folderid,this.finalobj)
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
 rowClick(fid:any,i:any,folderid:any,retention:any,fileRefNo:any,fileName:any,CreatedOn:any,lockStatus:any,fileType:any){
 // $('.portletfix-height2').removeClass('overflohidden');
  /// alert(i+"==="+this.rowClicked)

   if(this.rowClicked === i){
      this.rowClicked = -1;
    
   } 
  else 
  {
   this.rowClicked = i; 
   this.selectedfolderid='';
   this.selectedrtention='';
   this.selectedfileid='';

   this.selectedfileRefNo='';
   this.selectedfileName='';
   this.selectedCreatedOn='';
   this.selectedfileType='';
   this.filelockStatus='';
    this.selectedfileid=fid;
   this.selectedfolderid=folderid;
   this.selectedrtention=retention;
   this.filelockStatus=lockStatus;
   this.selectedfileRefNo=fileRefNo;
   this.selectedfileName=fileName;
   this.selectedCreatedOn=CreatedOn;
   this.selectedfileType=fileType;
   this.loadFileproperties=false;
   this.filePrperties=fid;
 
   this.clearProperties();
   this.loadFileproperties=true;
   this.childC.viewFileDetails(fid)

   }
  
  
 }
 //\\ ======================== // Row Click // ======================== //\\
cleartabdata(){
 this.rowClicked = -1;
 this.selectedfileid='';
 this.loadFileproperties=false;
 this.clearProperties();
 this.viewDetails(this.folderid,this.finalobj )
}

clearProperties(){
   this.loadFileversions=false;
   this.loadFileModify=false;
   this.loadFileproperties=false;
   this.loadFileversions=false;
   this.loadFileretention=false;
   this.loadsharefile=false;
    this.loadFilenumbering=false;
     this.loadpreviewfile=false;
}
 //\\ ======================== // Row Click // ======================== //\\
 fileproperties(fileId:any){
 // $('.portletfix-height2').removeClass('overflohidden');
   this.filePrperties=fileId;
   this.clearProperties();
   this.loadFileproperties=true;
 }
 //\\ ======================== // Row Click // ======================== //\\

//\\ ======================== // File Modify // ======================== //\\ 
fileModify(id:any) {
 // $('.portletfix-height2').removeClass('overflohidden');
 this.fileModifyid=id;
 this.clearProperties();
 this.loadFileModify=true;
 
}
//\\ ======================== // File Modify // ======================== //\\ 


//\\ ======================== // File versions // ======================== //\\ 
viewVersions(fileId:any){
 // $('.portletfix-height2').removeClass('overflohidden');
 this.fileversions=fileId;
 this.clearProperties();
 this.loadFileversions=true;

}
//\\ ======================== // File versions // ======================== //\\ 
//\\ ======================== // Retention file // ======================== //\\ 
retentionFile(fileid: any, folderId: any, retentionDate: any) {
 // $('.portletfix-height2').removeClass('overflohidden');
 this.retensionid = fileid;
 this.retensionFolderid = folderId;
 this.retenstionDate = retentionDate;
 this.clearProperties();
 this.loadFileretention=true;
}
//\\ ======================== // Retention file // ======================== //\\ 

//\\ ======================== // Share Document // ======================== //\\   
shareDoc(fileid: any, folderId: any) {
 // $('.portletfix-height2').removeClass('overflohidden');
 this.shareedid = fileid;
 this.shareedFolderid = folderId;
 this.clearProperties();
 this.loadsharefile=true;
 // let encSchemeStr = this.encDec.encText(id.toString());
 // this.route.navigate(['/admin/shareFile', encSchemeStr]);

}
//\\ ======================== // Share Document // ======================== //\\
//\\ ======================== // Preview Document // ======================== //\\ 
previewDoc(fileid:any,fileName:any,filelockStatus:any,selectedfileType:any) {
 // $('.portletfix-height2').addClass('overflohidden');
 this.resizediv(1)
  this.previewfileid=fileid;
  const myArray = fileName.split(".");
  let ftype:any=myArray[1];
  this.prvlockfile=filelockStatus;
  this.filetype=selectedfileType;
  this.clearProperties();
  this.loadpreviewfile=true;
  
}
//\\ ======================== // Preview Document // ======================== //\\ 

//\\ ======================== // File Numbering // ======================== //\\
filenumbering(fid: any, filenumber: any, fileName: any, updatedate: any, folderId: any) {
 // $('.portletfix-height2').removeClass('overflohidden');
 //this.open(this.numberingModal);
 this.clearProperties();
 this.loadFilenumbering=true;
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

resizediv(openflag:any){
 this.toggle = !this.toggle;
 let fcard=<HTMLInputElement>document.getElementById('first-card');
 let fileproperties=<HTMLInputElement>document.getElementById('filepropertiessection');
 if(this.toggle == true || openflag == 1){
  
  
   fcard.style.transitionDelay = "2s";
   fcard.style.height = "0px";
   fcard.style.overflow = "hidden";
   fileproperties.style.height="80vh";
   
 }
else{
 fcard.style.transitionDelay = "2s";
 fcard.style.height="auto";
 fcard.style.overflow = "hidden";
 fileproperties.style.height="35vh";

 
}
}

  //\\ ======================== // Data sorting // ======================== //\\



    //\\ ======================== // Data sorting // ======================== //\\


}
