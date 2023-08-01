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
  selector: 'app-file-log',
  templateUrl: './file-log.component.html',
  styleUrls: ['./file-log.component.scss']
})
// export class FileLogComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
export class FileLogComponent implements OnInit {
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
  {"name":"Document Name","cname":"fileName","sortable":false },
  {"name":"Activity Performed","cname":"activityPerformed","sortable":false },
  {"name":"Created By","cname":"createdBy","sortable":true },
  {"name":"Created On","cname":"createdBy","sortable":true },
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
    
    this.loadFileLogs(this.fileid)
  }
 //\\ ======================== // GEt file FileLogs // ======================== //\\ 
loadFileLogs(fid:any){

  let dataParam = {
    "fileId": fid
  
  };
this.loading=true;
this.commonserveice.getfileLogs(dataParam).subscribe({
  next: (response) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;

    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
  
      if (responseResult.status == 200) {
        this.loading=false;
          this.filevesions=responseResult.result
      //console.log(this.filevesions)
       }
      else if (responseResult.status == 400) {
        this.loading=false;
     
        this.commonserveice.swalfire('error',responseResult.message)
        //this.filevesions = responseResult.result;
      }
      else if(responseResult.status==501){
          
        this.authService.directlogout();
      }
      else{
        this.loading=false;
        this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
  
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
 //\\ ======================== // GEt file versions // ======================== //\\ 
  //\\ ======================== // Download File // ======================== //\\ 
  downloadfils(fid: any, fpath: any,logId:any) {
    let dataParam = {
      "fileId": fid,
      "logId":logId
    };
    this.commonserveice.fileDownloadVer(dataParam).subscribe({
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
       // //console.log(this.downloadlink)
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
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
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
  // //console.log(fileid+':'+this.filetype+':'+logId+':'+filePath)
  this.open(this.previewModal);
  
      this.previewfileid=fileid;
     
      this.logId=logId;
      this.vfilepath=filePath;
      this.lockstatus=lockStatus;
      this.filetype=fileType;
     
      
    
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


      
  
      
}
