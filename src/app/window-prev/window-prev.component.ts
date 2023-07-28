import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { EncrypyDecrpyService } from '../services/encrypy-decrpy.service';
import { CommonServicesService } from '../services/common-services.service';
import { AuthenticationService } from '../services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorchecklistService } from '../services/validatorchecklist.service';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-window-prev',
  templateUrl: './window-prev.component.html',
  styleUrls: ['./window-prev.component.scss']
})
export class WindowPrevComponent implements OnInit {

   fileId:any;
   filetype:any;
   logid:any;
   vfilepath:any;
   lockstatus:any; 
       
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
  fileType:any
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


    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if(encSchemeId != ""){
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr:any = schemeStr.split(':');

    

       this.fileId = schemeArr[0];
       this.vfilepath=schemeArr[1];
       this.lockstatus=schemeArr[2];
       this.logid=schemeArr[3]
      this.fileType = schemeArr[4];
     

     
      if(this.lockstatus != 1){
        this.prevstatus=true;
        this.downloadfils(this.fileId,this.vfilepath,this.fileType)
      }



      

     }






      
   }

   loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = data[0].pagetitle;
     })
   }
 
 
 

  
  //\\ ======================== // Download File // ======================== //\\ 
downloadfils(fid: any, fpath: any,filetype:any) {
  
  let dataParam = {
    "fileId": fid,
    "url": fpath,
    'logId':this.logid
  };
  this.commonserveice.fileDownload(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
     this.fileLoading=true; 

     let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
     if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)

  if (responseResult.status == 200) {

  
    this.downloaditem = responseResult.result;

   // console.log(responseResult.result)
    this.downloadlink = this.downloaditem.filePath;
    this.dcoSrc=this.downloaditem.filePath;
   
    if(filetype == "pdf"){
      setTimeout(() => {
        this.fileLoading=true;
       let dangerouframeUrl = `${environment.iframeviewURL}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}`;
        this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
       
      this.fileLoading=false;
      },1000)
    }  
 else if(filetype == "mp4"){

  this.publicurl='';
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
      
        let element=<HTMLInputElement>document.getElementById("videopreviewdiv1")
       
        element.appendChild(video)
        this.fileLoading=false; 
    },2000)
  
  }else if(filetype == 'xlsx'){
    //alert();
    setTimeout(() => {
  
      this.fileLoading=true; 
    let dangerouframeUrl = `${environment.excelViewer}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}+&type=1`;
  
    this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
    this.fileLoading=false; 
  
  
  },200)
  }
  else if(filetype == 'docx'){
    //alert();
    setTimeout(() => {
  
      this.fileLoading=true; 
    let dangerouframeUrl = `${environment.iframeURL}?fileId=${this.fileId}+&logId=${this.logid > 0 ? this.logid : 0}+&token=${this.token}+&date=${this.currenttime}+&type=1`;
  
    this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
    this.fileLoading=false; 
  
  
  },200)
  }
  else if(filetype == "mp3"){
    this.publicurl='';
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
else if(filetype =="zip" ){
     
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
    Swal.fire({
      icon: 'error',
      text: this.commonserveice.langReplace(environment.somethingWrong)
});
  }
     }
     else{
      this.fileLoading = false;
      this.authService.directlogout();
     }

   
  },(error:any) =>{
    this.loading=false;
    this.authService.directlogout();
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
this.commonserveice.fileLockUnlock(formParams).subscribe((response:any)=>{
let respData = response.RESPONSE_DATA;
let respToken = response.RESPONSE_TOKEN;
let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
if(respToken == verifyToken){
  let res:any = Buffer.from(respData,'base64'); 
  let responseResult = JSON.parse(res)
  
  if(responseResult.status == 200){
    this.prevstatus=true;
    this.downloadfils(this.fileId,this.vfilepath,this.filetype)
  
  }
  else if(responseResult.status == 400){
  Swal.fire({
    icon: 'error',
    text: responseResult.message,
    
  });
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
});

  }



}

}



