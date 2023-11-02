import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import WebViewer from '@pdftron/webviewer';
import { environment } from '../../../environments/environment';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import * as pdfjsLib from "pdfjs-dist";
import { DomSanitizer } from '@angular/platform-browser';
import {Buffer} from 'buffer';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-preview-file',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.scss']
})
export class PreviewFileComponent implements OnInit {

  @Input() fileId:any;
   @Input() filetype:any;
    @Input() logid:any;
     @Input() vfilepath:any;
         @Input() lockstatus:any; 
       
  canvas!: ElementRef;
siteURL=environment.siteURL;
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/filePreview.config.json";

  letterID:any="";
  
   viewer:any = 'pdf';  
  selectedType:any = 'docx';   
  DemoDoc:any="https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"  
 
  dcoSrc:any;
  @ViewChild('viewer') viewerRef: ElementRef;
  filedetails:any;
  loading:any=false;
  fileLoading:any=false;
  downloaditem:any;
  downloadlink:any; 
  txtPassword:any;
  token:any;
  filepath:any;
  publicurl:any;
  currenttime: Date = new Date();
  fileext:any;
  getfiletype:any;
  prevstatus:any;
  show = false;
  password: any = 'password';
  constructor(private route: Router,private httpClient: HttpClient,
private router:ActivatedRoute,
public encDec: EncrypyDecrpyService,
public commonserveice: CommonServicesService,
public authService: AuthenticationService,
private sanitizer: DomSanitizer,
private modalService: NgbModal,
public vldChkLst:ValidatorchecklistService,
   ) {
  
    
  
   }



  ngOnInit(): void {
    this.token=sessionStorage.getItem('TOKEN');
    this.loadconfig();
    this.fileLoading=true;
    
      // this.viewFileDetails(this.fileId,this.logid)
      // 
    // })
    this.publicurl='';

 if(this.lockstatus == 1){

 }else{
  this.prevstatus=true;
  this.downloadfils(this.fileId,this.vfilepath)
 }
      
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
 
 
 

  
  //\\ ======================== // Download File // ======================== //\\ 
downloadfils(fid: any, fpath: any) {
  
  let dataParam = {
    "fileId": fid,
    "url": fpath,
    'logId':this.logid
  };

  this.commonserveice.fileDownload(dataParam).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
       this.fileLoading=true; 
  
       let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
       if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
  
    if (responseResult.status == 200) {
  
    
      this.downloaditem = responseResult.result;
      this.downloadlink = this.downloaditem.filePath;
      this.dcoSrc=this.downloaditem.filePath;
      // console.log(responseResult);
      // console.log(this.filetype);
      if(this.filetype == "pdf"){
        setTimeout(() => {
          this.fileLoading=true;
         let dangerouframeUrl = `${environment.iframeviewURL}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}`;
          this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
         
        this.fileLoading=false;
        },1000)
      }  
   else if(this.filetype == "mp4"){
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
        
          let element=<HTMLInputElement>document.getElementById("videopreviewdiv")
          element.innerHTML="";
          element.appendChild(video)
          this.fileLoading=false; 
      },200)
    
    }else if(this.filetype == 'xlsx' || this.filetype == 'csv'){
      //alert();
      setTimeout(() => {
    
        this.fileLoading=true; 
      let dangerouframeUrl = `${environment.excelViewer}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}+&type=1`;
    
      this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
      this.fileLoading=false; 
    
    
    },200)
    }
    else if(this.filetype == 'docx'){
      //alert();
      setTimeout(() => {
    
        this.fileLoading=true; 
      let dangerouframeUrl = `${environment.iframeURL}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}+&type=1`;
    
      this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
      this.fileLoading=false; 
    
    
    },200)
    }
    else if(this.filetype == "mp3"){
      setTimeout(() => {
  
        const audio = document.createElement("AUDIO");
    
        audio.setAttribute("src",this.dcoSrc);
        audio.setAttribute("controls", "controls");
        document.body.appendChild(audio);
    
        let element=<HTMLInputElement>document.getElementById("audiopreviewdiv")
          element.innerHTML="";
          element.appendChild(audio)
      },200)
      this.fileLoading=false; 
     }
  else if(this.filetype =="zip" ){
       
  setTimeout(() => {
  
  const zip = document.createElement("a");
  const t = document.createTextNode("Downlod .zip File");
   zip.setAttribute("target", "_blank");
  zip.setAttribute("href", this.dcoSrc);
  zip.classList.add("btn","btn-primary");
  zip.appendChild(t);
  let element=<HTMLInputElement>document.getElementById("zipdiv")
      element.innerHTML="";
      element.appendChild(zip)
  },200)
  
  this.fileLoading=false; 
  }
  else{
  setTimeout(() => {
    
    this.fileLoading=true; 
  let dangerouframeUrl = `${environment.iframeviewURL}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}+type=1`;
  
  this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
  this.fileLoading=false; 
  
  
  },200)
  
  }     
  
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
        this.fileLoading = false;
        this.authService.directlogout();
       }
    },
    error: (msg) => {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
   }
 })


}
//\\ ======================== // Download File // ======================== //\\ 

  


onError(error: any) {
  console.log("some thing went wrong")
}
 
//\\ ======================== // Share Document // ======================== //\\   
shareDoc(id: any) {
  let encSchemeStr = this.encDec.encText(id.toString());
  this.route.navigate(['/admin/shareFile', encSchemeStr]);

 }
//\\ ======================== // Share Document // ======================== //\\

//\\ ======================== // Modal Open // ======================== //\\ 
open(content: any) {
  this.modalService.open(content, { size: '', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
 }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 
closeModal(){
  this.modalService.dismissAll();
}
//\\ ======================== // Modal Close // ======================== //\\
 
//\\ ======================== // Unlock File // ======================== //\\
unsetPassword(){
 
  let password=this.txtPassword;
 
 
  if(!this.vldChkLst.blankCheck(password,this.commonserveice.langReplace("Please Enter Password"),'txtPassword')) {
    
  }

  else{
  
     let formParams = {
     "fileId":this.fileId,
      "password":password,
      "action":3
      };
    
   // console.log(formParams) 
   this.commonserveice.fileLockUnlock(formParams).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
let respToken = response.RESPONSE_TOKEN;
let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
if(respToken == verifyToken){
  let res:any = Buffer.from(respData,'base64'); 
  let responseResult = JSON.parse(res)
  
  if(responseResult.status == 200){
    this.prevstatus=true;
    this.downloadfils(this.fileId,this.vfilepath)
  
  }
  else if(responseResult.status == 400){
    this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message))
 
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

}
