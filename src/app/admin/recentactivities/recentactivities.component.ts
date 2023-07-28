import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import {Buffer} from 'buffer';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-recentactivities',
  templateUrl: './recentactivities.component.html',
  styleUrls: ['./recentactivities.component.scss']
})
export class RecentactivitiesComponent implements OnInit {
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewLogs.config.json";

  letterID:any="";
  loglist:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 20;
  pageSizes = [10, 20, 50,100,500,1000];

mettypelist:any=['-','String','Date','Intiger']
txtSearch:any;
searchColList:any=["Meta Name","Description","Type","Created By"]
searchselcteditems:any=[];
searchField:any;
loading:any=false;

selUserId:any='0';
txtFromDate:any;
txtToDate:any; 
selType:any='0';
logactivitytypeList=environment.logactivitytype;
userlist:any=[]
sessiontoken:any;
desgId:any;
roleId:any;

sortDir = 1;//1= 'ASE' -1= DSC
sortOrder: string = 'asc';
sortColumn: string = 'ticker';

tablecollist=[
  {"name":"User","cname":"createdBy","sortable":true },
    {"name":"Activity Details","cname":"activityPerformed","sortable":true },
   
  {"name":"Date","cname":"createdOn","sortable":true },


]


  constructor(
    private route: Router,
     private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    public encDec:EncrypyDecrpyService,
    public authService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.viewLog(this.selUserId,this.selType,this.txtFromDate,this.txtToDate);
    this.getUsers();

    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed =JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
   
     this.desgId=SeetionParsed.USER_ID;
     this.roleId=SeetionParsed.ROLE_ID;

  }
  
  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = data[0].pagetitle ;
     },
     (error:any) =>{
      this.authService.directlogout();
     })
   }

   reset(){
    this.viewLog(0,0,'','');
    this.selUserId='0';
this.txtFromDate='';
this.txtToDate=''; 
this.selType='0';
   }

   //\\ ======================== // get meta list // ======================== //\\
viewLog(userId:any,activityType:any,fromDate:any,toDate:any){


 
  let dataParam = {
    "userId":userId,
    "activityType":activityType,
    "fromDate":fromDate,
    "toDate":toDate
    };
    this.loading=true;
this.commonserveice.activitylog(dataParam).subscribe((response:any) => {
  let respData = response.RESPONSE_DATA;
  let respToken = response.RESPONSE_TOKEN;
  let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
         
          if (responseResult.status == 200) {
            this.loading=false;
          this.loglist = responseResult.result;
        //console.log(this.loglist)
          }
         else if (responseResult.status == 400) {
            this.loading=false;
            this.loglist=[];
          }
          else if(responseResult.status==501){
              
            this.authService.directlogout();
          }
          else{
            this.loading=false;
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(environment.somethingWrong)
      });
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
 
 setSearchParam(searchref:any,txtSearch:any){
  this.txtSearch='';
    let obj: any = {};
    obj["searchkey"] = searchref;
    obj["searchvalue"] = txtSearch;
    this.searchselcteditems.push(obj);
  //  console.log(this.searchselcteditems)
    this.searchField.nativeElement.focus();
  
  
  }
  removeselitems(i:any){
    this.searchselcteditems.splice(i,1);
    this.searchField.nativeElement.focus();
    //console.log(this.searchselcteditems)
  }

  //\\ ======================== // get user list // ======================== //\\
  getUsers() {
    //this.userlist = [];
    let dataParam = {
      "userId": ''
    };
    this.commonserveice.getUserlist(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
     
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
  
        if (responseResult.status == 200) {
  
          this.userlist = responseResult.result;
  
  
        }
        else if(responseResult.status==501){
          
          this.authService.directlogout();
        }
        else{
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong)
   });
        }
      }
      else{
        this.loading = false;
     this.authService.directlogout();
      }
    
    },
    (error:any) =>{
      
      this.authService.directlogout();
    })
  }
  //\\ ======================== // get user list // ======================== //\\
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
  
      
    
    this.loglist = this.loglist.sort((a:any, b:any) => {
      if (a[colName] < b[colName])
        return this.sortOrder == 'asc' ? -1 : 1;
      if (a[colName] > b[colName])
        return this.sortOrder == 'asc' ? 1 : -1;
      return 0;
    })
  
  
  }
  
    //\\ ======================== // Data sorting // ======================== //\\

}
