import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UploadfilesService } from '../../services/uploadfiles.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { CommonServicesService } from '../../services/common-services.service';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from '../../services/authentication.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import {Buffer} from 'buffer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.scss']
})
export class UploadfileComponent implements OnInit {
  //\\ ======================== // Variables // ======================== //\\
  @Input() folderid:any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/uploadDocument.config.json";
  letterID:any="";
  files_dropped: File[] = [];
  file: any = null;
  viewer:any = 'google';  
  selectedType:any = 'docx';   
  DemoDoc:any;  
  chkIndexing:any=false; 
  txtTags:any=[]; 
  selMeta:any='0';
  txtSubject:any;
  selFolderName:any='0';
  txtFileName:any="";
  folderlist:any=[];
  metalist:any=[];
  dropdownSettings:any;
  metasellist:any=[];
  tags:any=[];
  loading:any=false;
  getmetaType:any;
  metatype:any='';
  metaDesable:any=false;
  metaListDetails:any=[];
  fileId:any=0;
  txtEfminDate:any='';
  txtEtminDate:any='';
  txtExpDate:any;
  selOcrLang:any='0';
  txtFileNumber:any='';
  metatypelist:any=[];
  filedetails:any;
  fileLoading:any=false; 
  sessiontoken:any;
  permissionlist:any;
  rolewisepermissions:any=[];
  userwisepermissions:any=[];
  permissionlistitems:any=[
    {label: 'Read'},
    {label: 'Write'},
    {label: 'Download'},
    {label: 'Create Folder'},
    {label: 'Delete'},
    {label: 'Rename'},
    {label: 'Archive'},
    {label: 'WorkFlow'},
    {label: 'Move to folder'}
  

  ]
 
folderName:any;
publicurl:any;
currenttime: Date = new Date();
token:any;
getfiletype:any
  //\\ ======================== // Variables // ======================== //\\
  constructor(
    private route: Router,
    private httpClient: HttpClient,
   private uploadfiles:UploadfilesService,
   private commonserveice:CommonServicesService,
   public authService:AuthenticationService,
   public encDec:EncrypyDecrpyService,
   private router:ActivatedRoute,
   private vldChkLst:ValidatorchecklistService,
   private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.token=sessionStorage.getItem('TOKEN');
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Meta',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    this.loadconfig();
   // console.log(this.folderid)
    //this.getFolderbased(this.folderid);
   // this.getPermissions(this.folderid)
    this.viewMetaList()

    this.router.paramMap.subscribe((params:any) => {
      let encSchemeId = params.get("id");
     // if(encSchemeId != ""){
      let schemeStr = this.encDec.decText(encSchemeId);

        let schemeArr:any = schemeStr.split(':');
        this.fileId = schemeArr[0];
     
        
       
      // }


    });

    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 

    // let SeetionParsed =JSON.parse(this.sessiontoken).toString(); 
    let SeetionParsed =JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
     //console.log(SeetionParsed)
    // this.username=SeetionParsed.USER_NAME;
    // this.desgId=SeetionParsed.USER_ID;

   }
     //\\ ======================== // Config // ======================== //\\
   loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = data[0].pagetitle;
     },
     (error:any) =>{
       Swal.fire({
         icon: 'error',
         text: error
       });
     })
   }
  //\\ ======================== // Config // ======================== //\\

  //\\ ======================== // Temp Uplaoad On select // ======================== //\\
   onSelect(event:any) {


    let newFile:FormData = new FormData();
    newFile.append('file',event.addedFiles[0])
    let filetype=event.addedFiles[0].name;
    this.fileLoading=true; 
   let splititems=filetype.split('.',2)
  
   newFile.append('fileType',splititems[1])
    newFile.append('folderId',this.folderid)
   this.uploadfiles.uploadFile(newFile).subscribe((response:any) => {
     
      
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
    
 if (responseResult.status == 200) {
    
  this.files_dropped.push(event.addedFiles);
  this.txtFileName=responseResult.result.fileName;
  
//console.log(responseResult.result)

  this.DemoDoc=responseResult.result.filePath;
 let filetype=responseResult.result.fileType;
this.getfiletype=responseResult.result.fileType;
if(this.getfiletype =='mp4' || this.getfiletype =='MP4' || this.getfiletype =='MKV' ||  this.getfiletype =='AVI' ||  this.getfiletype =='WebM' || this.getfiletype =='mkv' ||  this.getfiletype =='avi' ||  this.getfiletype =='webm' ){

  setTimeout(() => {
    const video = document.createElement("video");
  
    // video.classList.add("frame");
      video.controls = true;
      video.muted = false;

      if (video.canPlayType('video/mp4')) {
        video.src = this.DemoDoc;
      } else if (video.canPlayType('video/ogg')) {
        video.src = this.DemoDoc;
      } else {
        // Provide video link to user  video.src = this.DemoDoc;
      }

      video.height = 320; // in px
      video.width = 400; 
     // document.getElementById("previewdiv").appendChild(para);
      let element=<HTMLInputElement>document.getElementById("videopreviewdiv")
      element.innerHTML="";
      element.appendChild(video)
      this.fileLoading=false; 
  },200)

}
else if(this.getfiletype =='mp3' || this.getfiletype =='MP3'){
  setTimeout(() => {

    const audio = document.createElement("AUDIO");
    audio.setAttribute("src",this.DemoDoc);
    audio.setAttribute("controls", "controls");
    
    document.body.appendChild(audio);

    let element=<HTMLInputElement>document.getElementById("audiopreviewdiv")
      element.innerHTML="";
      element.appendChild(audio)
  },200)
  

}
else if(this.getfiletype =='zip' || this.getfiletype =='ZIP'){
  setTimeout(() => {

const zip = document.createElement("a");
  const t = document.createTextNode("Downlod .zip File");
   zip.setAttribute("target", "_blank");
  zip.setAttribute("href", this.DemoDoc);
  zip.classList.add("btn","btn-primary");
  zip.appendChild(t);
  let element=<HTMLInputElement>document.getElementById("zipdiv")
      element.innerHTML="";
      element.appendChild(zip)
  },200)
  

}
else{
  setTimeout(() => {

    this.fileLoading=false; 

    let dangerousVideoUrl = `${environment.iframeURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${this.DemoDoc}`;
this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
// if(filetype == "pdf"){
//   let dangerouframeUrl = `${environment.pdfiframeURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${this.DemoDoc}`;
//   this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
//  }
//  else{
//   let dangerouframeUrl = `${environment.iframeURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${this.DemoDoc}`;

//   this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerouframeUrl);
//  }



},2000)
}
 




  this.getFolderbased(this.folderid);
  setTimeout(() => {
    var today = new Date().toISOString().split('T')[0];
    let elm:any      = (<HTMLInputElement>document.getElementById("expiryDate"));
    elm.setAttribute('min', today);
    },2000)      
       
       }
       else if(responseResult.status == 400){
        Swal.fire({
          icon: 'error',
          text:responseResult.message,
          
        });
       }
       else if(responseResult.status==501){
        
        this.authService.directlogout();
      }
       else{
        //this.authService.directlogout();
       }
    
    },
    (error:any) =>{
      this.authService.directlogout();
    })

  
    
	}
   //\\ ======================== // Temp Uplaoad On select // ======================== //\\

 onRemove(event:any) {
this.files_dropped.splice(this.files_dropped.indexOf(event), 1);
this.resetform()
 }


 //\\ ======================== // get Folders // ======================== //\\
 getFolderbased(folderid:any){
  let dataParam = {
    "folderId": folderid,
    };
    
this.commonserveice.getFoldersSingle(dataParam).subscribe((response:any) => {
  let respData = response.RESPONSE_DATA;
  let respToken = response.RESPONSE_TOKEN;
 
 
  let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
   
  
    if(responseResult.status == '200'){

      this.folderlist=responseResult.result;
     
      if(this.folderlist.length > 0){
      this.folderName=this.folderlist[0].folderName;
      this.selFolderName=this.folderlist[0].parentFolderId;
      this.permissionlist=this.folderlist[0].folderPermission;
     
      }
 
    }
    else if(responseResult.status==501){
        
      this.authService.directlogout();
    }
    else{
     // this.authService.directlogout();
    }

  
} ,(error:any) => {
  this.authService.directlogout();
 
})
    


}
//\\ ======================== // get Folders // ======================== //\\





   //\\ ======================== // get meta list // ======================== //\\
   viewMetaList(){


 
    let dataParam = {
      "intMetaId": ''
      };
  this.commonserveice.viewMeta(dataParam).subscribe((response:any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
  
   
   
    let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
     
      if (responseResult.status == 200) {
  
        this.metalist = responseResult.result;
     

      }
      else if(responseResult.status==501){
        
        this.authService.directlogout();
      }
  })
  
  
  }
  //\\ ======================== // Get Mata Type // ======================== //\\
  getMetaType(metaId:any){

    this.metaDesable=true;
 
    let dataParam = {
      "intMetaId": metaId
      };
  this.commonserveice.viewMeta(dataParam).subscribe((response:any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
  
   
   
    let res:any = Buffer.from(respData,'base64'); 
    let responseResult = JSON.parse(res)
     
      if (responseResult.status == 200) {
  
        let metalist = responseResult.result;
        this.getmetaType=metalist[0].metaType;

      

      }
      else if(responseResult.status==501){
        
        this.authService.directlogout();
      }
  })
  
  
  }
//\\ ======================== // Get Mata Type // ======================== //\\
  
  onTagsChanged(e:any){

  }
 
//\\ ======================== // Final File upload  // ======================== //\\
  finalfileupload(){
    let fileName=this.txtFileName;
    let folderName=this.selFolderName;
    let subject=this.txtSubject;
    let metaitems=this.metasellist;
    let tags=this.txtTags;
    let fileindexing=this.chkIndexing;






    if(!this.vldChkLst.blankCheck(fileName,this.messaageslist.filename)) {
      
   
    } 
  

    else if(!this.vldChkLst.blankCheck(subject,this.messaageslist.subject)) {
      
      Swal.fire({
        icon: 'error',
        text: this.messaageslist.subject
       });
    } 
    else if(this.metaListDetails.length == 0) {
      
      Swal.fire({
        icon: 'error',
        text: this.messaageslist.addMeta
       });
    } 
   
    
    else{

      


      let uploadParams={
        "folderId":this.folderid,
        "fileName":fileName,
        "subject":this.txtSubject,
        "meta":this.metaListDetails,
        "tags":this.txtTags,
        "indexing":fileindexing,
        "expiryDate":this.txtExpDate,
        "ocrLanguage":this.selOcrLang,
        "filePermission":this.permissionlist
       
      }
      // txtFileNumber:any='';
     // console.log(uploadParams)
      this.loading=true;
      this.uploadfiles.finaluploadFile(uploadParams).subscribe((response:any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
      
        if (responseResult.status == 200) {
          this.loading=false;
          Swal.fire({
              
            text: this.messaageslist.successMsg,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            
           
           let reData:any= this.folderid+':'+'0'
            
            let encSchemeStr = this.encDec.encText(reData.toString());
           // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);
        
            this.route.navigate(['/admin/viewupload',encSchemeStr])

        
          this.resetform();
          })


         }
         else if(responseResult.status==400){
          this.loading=false;
          Swal.fire({
            icon: 'error',
            text:responseResult.message,
            
          });
        }
         else if(responseResult.status==500){
          this.loading=false;
          Swal.fire({
            icon: 'error',
            text:responseResult.message,
            
          });
        }
        else if(responseResult.status==501){
        
          this.authService.directlogout();
        }
         else{
          this.loading=false;
          this.authService.directlogout();
         }
      
      },
      (error:any) =>{
        this.loading=false;
        this.authService.directlogout();
      }) 
      


      
    }

  }

//\\ ======================== // Final File upload  // ======================== //\\
//\\ ======================== // Reset Form  // ======================== //\\
  resetform(){
    this.txtFileName='';
    this.selFolderName='0';
    this.txtSubject='';
    this.metasellist=[];
    this.txtTags=[];
    this.chkIndexing=false;
    this.rolewisepermissions=[];
    this.userwisepermissions=[];
  }
  //\\ ======================== // Reset Form  // ======================== //\\
  //\\ ======================== // Add Meta Value  // ======================== //\\
  addMetaVals(){


    if(!this.vldChkLst.selectDropdown(this.selMeta,this.messaageslist.selMeta) ) {
    
    }
    else if(!this.vldChkLst.blankCheck(this.metatype,this.messaageslist.entermetadesc)) {
  
    }
    else{
      let elm:any      = (<HTMLInputElement>document.getElementById("selMetaType"));
      let elmValText        = elm.options[elm.selectedIndex].text;
     
      // metaListDetails
      let obj: any = {};
      obj['metaId'] = this.selMeta;
      obj["metaName"] = elmValText;
      obj['metaDetails'] = this.metatype;
     
      this.metaListDetails.push(obj)
     
      this.metatype=''; 
      this.selMeta='0';
      this.metaDesable=false;
    }
  }
   //\\ ======================== // Add Meta Value  // ======================== //\\
    //\\ ======================== // Remove Meta  // ======================== //\\
  removeSectionval(i:any){
     this.metaListDetails.splice(i,1);
 }
  //\\ ======================== // Remove Meta  // ======================== //\\
}
