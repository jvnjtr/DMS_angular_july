import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { WorkflowService } from '../../services/workflow.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';


@Component({
  selector: 'app-doc-prev-only',
  templateUrl: './doc-prev-only.component.html',
  styleUrls: ['./doc-prev-only.component.scss']
})
export class DocPrevOnlyComponent implements OnInit {
  @Input() fileId:any;
  @Input() logid:any;
  @Input() vfilepath:any;
  fileLoading:any=false;
  @Input() filetype:any;
publicurl:any;
filedetails:any=[];
downloaditem:any;
downloadlink:any; 

token:any;
filepath:any;
dcoSrc:any;
currenttime: Date = new Date();
@Input() lockstatus:any;
txtPassword:any;
prevstatus:any=false;
  constructor(private route: Router,
    private router:ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private workFlowServices: WorkflowService,
    public encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
    public vldChkLst:ValidatorchecklistService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.token=sessionStorage.getItem('TOKEN');
   
    
    
    if(this.lockstatus == 1){
      setTimeout(() => {
       
      },200)
     }else{
      this.prevstatus=true;
      this.downloadfils(this.fileId, this.vfilepath) 
     }
       

// })
this.publicurl='';

  }


    downloadfils(fid: any, fpath: any) {
    
      let dataParam = {
        "fileId": fid,
        "url": fpath
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
            this.downloadlink = this.downloaditem.filePath;
            this.dcoSrc=this.downloaditem.filePath;
            console.log(responseResult);
            console.log(this.filetype);
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
          
          }else if(this.filetype == 'xlsx'){
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
         }
         else{
         
          this.authService.directlogout();
         }

      
      },(error:any) =>{
        this.fileLoading=false;
       
      })
    }
    //\\ ======================== // Download File // ======================== //\\ 
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
  
    this.downloadfils(this.fileId, this.vfilepath) 
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
    text: this.commonserveice.langReplace(environment.somethingWrong),
    
  });
  }
}
else{
 
  this.authService.directlogout();
}






},
(error:any) =>{
this.authService.directlogout();
});

  }



}


}
