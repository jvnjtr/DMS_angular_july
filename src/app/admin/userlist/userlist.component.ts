// =============================================================================
// File Name		              : userlist.component.ts
// Description 	              : This page display userlist
// Created by                 : Bikash Kumar Panda
// Created on                 : 12-Feb-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 12-Feb-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 12-Apr-2023
// Style sheet                : userlist.component.scss

// Used Function              : loadconfig(), viewDetails()
// =============================================================================


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Buffer} from 'buffer';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {


 
  Name:any=[];
 //\\ ======================== // Variables // ======================== //\\ 
 @ViewChild("searchField") searchField: ElementRef;
 title: any;
 tablist: any;
 utillist: any;
 messaageslist: any;
 jsonurl = "assets/js/_configs/userList.config.json";
 letterID: any = "";
dimensions: any = [];
 dataArr: any = [];
 movefileid:any;
 userList: any = [];
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
searchColList:any=["Name","Role","Email","Phone"]
searchselcteditems:any=[];
namesarray:any=[];
rolesarray:any=[];
emailarray:any=[];
phonearray:any=[];
finalarray:any=[];
finalobj: any = {
  'Name':this.namesarray,
  'Role':this.rolesarray,
  'Email':this.emailarray,
  'Phone':this.phonearray
}; 
nobj: any = {};
departmentsList:any=[];
sortDir = 1;//1= 'ASE' -1= DSC
sortOrder: string = 'asc';
sortColumn: string = 'ticker';

tablecollist=[
  {"name":"Name","cname":"userFullName","sortable":true },
  {"name":"Department","cname":"departmentName","sortable":false },
  {"name":"Role","cname":"roleName","sortable":true },
  {"name":"Email","cname":"userMailId","sortable":true },
  {"name":"Phone Number","cname":"userMobile","sortable":true }
 
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
 viewDetails(searchitems:any) {
   this.loading=true;
   let dataParam = {
    "searchfilter":searchitems
   };
   this.commonserveice.getuserList(dataParam).subscribe((response: any) => {
     let respData = response.RESPONSE_DATA;
     let respToken = response.RESPONSE_TOKEN;

     let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
     if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
 
      if (responseResult.status == 200) {
 
        this.loading=false;
        this.userList = responseResult.result;
      // console.log(this.userList) 
 
      }
      if (responseResult.status == 400) {
        this.loading=false;
        this.userList = responseResult.result;
      }
      if (responseResult.status == 500) {
       this.loading=false;
       this.userList = responseResult.result;
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
   (error:any) =>{
    this.loading=false;
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


//\\ ======================== // Modal Open // ======================== //\\ 
open(content: any) {
   this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
  }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 
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
    else if(searchref =="Role"){
      this.rolesarray.push(txtSearch)
    }
    else if(searchref =="Email"){
   
      this.emailarray.push(txtSearch)
    }
    else if(searchref =="Phone"){
     this.phonearray.push(txtSearch)
    }

     //this.finalarray.push(this.finalobj)
     this.page = 1;
     this.finalarray=[];
     this.viewDetails(this.finalobj)

   
  

   


     
  }
  removeselitems(i:any,searchkey:any,txtSearch:any){
     this.searchselcteditems.splice(i,1);
     this.searchField.nativeElement.focus();

  if(searchkey == "Name"){
  
    
    const index: number = this.namesarray.indexOf(txtSearch);
    if (index !== -1) {
        this.namesarray.splice(index, 1);
    }   

   //  this.namesarray.push(txtSearch);

  }
  else if(searchkey =="Role"){
    const index: number = this.rolesarray.indexOf(txtSearch);
    if (index !== -1) {
        this.rolesarray.splice(index, 1);
    }   

  }
  else if(searchkey =="Email"){
    const index: number = this.emailarray.indexOf(txtSearch);
    if (index !== -1) {
        this.emailarray.splice(index, 1);
    }   

  
  }
  else if(searchkey =="Phone"){
    const index: number = this.phonearray.indexOf(txtSearch);
    if (index !== -1) {
        this.phonearray.splice(index, 1);
    }   

  
  }

  this.viewDetails(this.finalobj)
  }


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
  
    
    this.userList = this.userList.sort((a:any, b:any) => {
      if (a[colName] < b[colName])
        return this.sortOrder == 'asc' ? -1 : 1;
      if (a[colName] > b[colName])
        return this.sortOrder == 'asc' ? 1 : -1;
      return 0;
    })


  }


}
