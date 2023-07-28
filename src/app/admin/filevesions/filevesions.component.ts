import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServicesService } from '../../services/common-services.service';
import { HttpClient } from '@angular/common/http';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {Buffer} from 'buffer';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-filevesions',
  templateUrl: './filevesions.component.html',
  styleUrls: ['./filevesions.component.scss']
})
export class FilevesionsComponent implements OnInit {
  @ViewChild('previewModal') previewModal: ElementRef;
  @Input() fileid:any;
  filetype:any;
previewfileid:any;
  filevesions:any=[];

  downloaditem:any='';
  downloadlink:any='';
  loading:any=false;
  logId:any;
 vfilepath:any;
 lockstatus:any;

 sortDir = 1;//1= 'ASE' -1= DSC
 sortOrder: string = 'asc';
 sortColumn: string = 'ticker';
 
 tablecollist=[
   {"name":"Document No","cname":"fileRefNo","sortable":false },
     {"name":"Name","cname":"fileName","sortable":true },
    
   {"name":"Type","cname":"fileType","sortable":false },
   {"name":"Version","cname":"fileVersion","sortable":false },
   {"name":"Size","cname":"fileSize","sortable":true },
   {"name":"Created By","cname":"createdBy","sortable":true },
   {"name":"Changed By","cname":"changedBy","sortable":true },
 ]



  constructor(private route: Router,
    private router:ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
  public vldChkLst:ValidatorchecklistService,
  private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.loadVersions(this.fileid)
  }
 //\\ ======================== // GEt file versions // ======================== //\\ 
loadVersions(fid:any){

  let dataParam = {
    "fileId": fid
  
  };
  this.loading=true;
  this.commonserveice.getfileVersions(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;

    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
  
      if (responseResult.status == 200) {
        this.loading=false;
          this.filevesions=responseResult.result.fileDetails
      console.log(this.filevesions)
       }
      else if (responseResult.status == 400) {
        this.loading=false;
        Swal.fire({
          icon: 'error',
          text: responseResult.message,
  
        });
        //this.filevesions = responseResult.result;
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
 //\\ ======================== // GEt file versions // ======================== //\\ 
  //\\ ======================== // Download File // ======================== //\\ 
  downloadfils(fid: any, fpath: any,logId:any) {
    let dataParam = {
      "fileId": fid,
      "logId":logId
    };
    this.commonserveice.fileDownloadVer(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
  
      if (responseResult.status == 200) {
  
        
        this.downloaditem = responseResult.result;
        this.downloadlink = this.downloaditem.filePath;
     // console.log(this.downloadlink)
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
  //\\ ======================== // Download File // ======================== //\\ 

  //\\ ======================== // Modal Open // ======================== //\\ 
open(content: any) {
  this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
 }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 
closeModal(){
  this.modalService.dismissAll();
}
loadpreview(fileid:any,fileType:any,logId:any,filePath:any,lockStatus:any)
{
  this.open(this.previewModal);
  
      this.previewfileid=fileid;
     
      this.logId=logId;
      this.vfilepath=filePath;
      this.lockstatus=lockStatus;
      this.filetype=fileType;
      this.lockstatus=lockStatus;
    


  
    // let encSchemeStr = this.encDec.encText((this.previewfileid+':'+this.vfilepath+':'+this.lockstatus+':'+this.logId+':'+this.filetype).toString());
   
    // const url = environment.siteURL+`#/windowPrev/`+encSchemeStr;
    // const w = screen.width * 0.9;
    // const h = screen.height * 0.8;
    // const left = (screen.width / 2) - (w / 2);
    // const top = (screen.height / 2) - (h / 2);
    // const randomnumber = Math.floor((Math.random() * 100) + 1);
    // // tslint:disable-next-line:max-line-length
    // window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
   
     
    
}
    //\\ ======================== // Get file Type // ======================== //\\
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
   //\\ ======================== // Get file Type // ======================== //\\

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
      
      this.filevesions = this.filevesions.sort((a: any, b: any) => {
     
        if(this.sortOrder == 'asc'){
          return a[colName].localeCompare(b[colName], undefined, { numeric: true });
        }
        else{
          return b[colName].localeCompare(a[colName], undefined, { numeric: true });
        }
     
      })  
        
   
      
      
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
