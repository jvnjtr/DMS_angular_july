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
  selector: 'app-scanupload',
  templateUrl: './scanupload.component.html',
  styleUrls: ['./scanupload.component.scss']
})
export class ScanuploadComponent implements OnInit {

 //\\ ======================== // Variables // ======================== //\\
 @Input() folderid:any;
scanfileeList:any=[];
  
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
 chkIndexing:any=true; 
 txtTags:any=[]; 
 selMeta:any='0';
 txtSubject:any;
 selFolderName:any='0';
 rdoSetretention:any='2';
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
 txtExpDate:any=null;
 selOcrLang:any='0';
 txtFileNumber:any='';
 metatypelist:any=[];
 filedetails:any;
 fileLoading:any=false; 
 disableBtn:any=false; 
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
 apkpath = environment.apkpath;
folderName:any;
publicurl:any;
currenttime: Date = new Date();
fileeList:any=[];
token:any;
getfiletype:any;
previewFile:any=false;

scannerfolderid: any;
loaduploadfile:any;

 //\\ ======================== // Variables // ======================== //\\
 constructor(
   private route: Router,
   private httpClient: HttpClient,
  private uploadfiles:UploadfilesService,
  public commonserveice:CommonServicesService,
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

   this.viewMetaList()
   this.getFolderbased(this.folderid);


   
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

 

onRemove(event:any) {
this.scanfileeList.splice(this.scanfileeList.indexOf(event), 1);
this.previewFile=false;

if(this.scanfileeList.length==0){
  window.location.reload()
}
}


//\\ ======================== // get Folders // ======================== //\\
getFolderbased(folderid:any){
 let dataParam = {
   "folderId": folderid,
   };
   
this.commonserveice.getFoldersSingle(dataParam).subscribe((response:any) => {
 let respData = response.RESPONSE_DATA;
 let respToken = response.RESPONSE_TOKEN;
 let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
 if(respToken == verifyToken){
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
 Swal.fire({
   icon: 'error',
   text: this.commonserveice.langReplace(environment.somethingWrong),
});
}
 }
 else{
   this.loading = false;
   this.authService.directlogout();
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
 
   let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
   if(respToken == verifyToken){
    let res:any = Buffer.from(respData,'base64'); 
    let responseResult = JSON.parse(res)
   
    if (responseResult.status == 200) {

      this.metalist = responseResult.result;
   

    }
    else if(responseResult.status==501){
      
      this.authService.directlogout();
    }
   }
   else{
     this.loading = false;
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
 
   let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
   if(respToken == verifyToken){
    let res:any = Buffer.from(respData,'base64'); 
    let responseResult = JSON.parse(res)
     
      if (responseResult.status == 200) {
  
        let metalist = responseResult.result;
        this.getmetaType=metalist[0].metaType;
 
      
 
      }
      else if(responseResult.status==501){
        
        this.authService.directlogout();
      }
   }
   else{
     this.loading = false;
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
   let fileindexing=true;

   if((this.rdoSetretention == 1) && (!this.vldChkLst.blankCheck(this.txtExpDate,this.commonserveice.langReplace("Please select the retention date"),'expiryDate'))){} 
  
   else if(!this.vldChkLst.blankCheck(subject,this.commonserveice.langReplace(this.messaageslist.subject),'txtSubject')) {
    
   } 
   else if(this.metaListDetails.length == 0) {
     
     Swal.fire({
       icon: 'error',
       text: this.commonserveice.langReplace(this.messaageslist.addMeta)
      });
   } 
  
   
   else{

     let filelistlength:any=this.scanfileeList.length;
     let counter:any=0;
     console.log(this.scanfileeList)
for(let i=0;i<this.scanfileeList.length;i++){


    let uploadParams={
       "folderId":this.folderid,
       "fileName":this.scanfileeList[i].fileName,
       "subject":this.txtSubject,
       "meta":this.metaListDetails,
       "tags":this.txtTags,
       "indexing":fileindexing,
       "expiryDate":this.txtExpDate,
       "ocrLanguage":this.selOcrLang,
       "filePermission":this.permissionlist
      
     }

   
    this.loading=true;
    
   // console.log(uploadParams)
          this.uploadfiles.finaluploadFile(uploadParams).subscribe((response:any) => {
       let respData = response.RESPONSE_DATA;
       let respToken = response.RESPONSE_TOKEN;
       //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();

       let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
       if(respToken == verifyToken){
        
       let res:any = Buffer.from(respData,'base64'); 
       let responseResult = JSON.parse(res)
     
       if (responseResult.status == 200) {
         counter++

         if(filelistlength == counter){
    this.loading=false;
         Swal.fire({
             
           text: this.commonserveice.langReplace(this.messaageslist.successMsg),
           icon: 'success',
           confirmButtonColor: '#3085d6',
           confirmButtonText: this.commonserveice.langReplace('Ok')
         }).then((result) => {
           
          
          let reData:any= this.folderid+':'+'0'
           let encSchemeStr = this.encDec.encText(reData.toString());
           this.route.navigate(['/admin/viewupload',encSchemeStr])

     
         })
         }
    


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
         Swal.fire({
          icon: 'error',
          text: this.commonserveice.langReplace(environment.somethingWrong),
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

 
   //   // txtFileNumber:any='';
   //  // console.log(uploadParams)
   //   this.loading=true;

     


     
   }

 }

//\\ ======================== // Final File upload  // ======================== //\\
//\\ ======================== // Reset Form  // ======================== //\\
 resetform(){
 
   this.scanfileeList=[];
   window.location.reload()

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


     //\\ ======================== // Get file Type // ======================== //\\
     getfiletypeicon(ftype:any){
 
     
     
       let icon:any;
       let iconsGroups:any=environment.iconsGroups;
        for(let i=0;i<iconsGroups.length;i++){
        let filetype:any= iconsGroups[i].groups.includes(ftype);
          if(filetype==true){
            icon=iconsGroups[i].name;
          }
         
        }
      return icon;


   
     
     }
    //\\ ======================== // Get file Type // ======================== //\\

//\\ ======================== // Load Preview // ======================== //\\
loadDocPreview(getfiletype:any,filepath:any){
this.previewFile=true;

 if(getfiletype =='mp4' || getfiletype =='MP4' || getfiletype =='MKV' ||  getfiletype =='AVI' ||  getfiletype =='WebM' || getfiletype =='mkv' ||  getfiletype =='avi' ||  getfiletype =='webm' ){

   setTimeout(() => {
     const video = document.createElement("video");
   
     // video.classList.add("frame");
       video.controls = true;
       video.muted = false;
 
       if (video.canPlayType('video/mp4')) {
         video.src = filepath;
       } else if (video.canPlayType('video/ogg')) {
         video.src = filepath;
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
   },1000)
 
 }
 else if(getfiletype =='mp3' || getfiletype =='MP3'){
   setTimeout(() => {
 
     const audio = document.createElement("AUDIO");
     audio.setAttribute("src",filepath);
     audio.setAttribute("controls", "controls");
     
     document.body.appendChild(audio);
 
     let element=<HTMLInputElement>document.getElementById("audiopreviewdiv")
       element.innerHTML="";
       element.appendChild(audio)
   },1000)
   
 
 }
 else if(getfiletype =='zip' || getfiletype =='ZIP'){
   setTimeout(() => {
 
 const zip = document.createElement("a");
   const t = document.createTextNode("Downlod .zip File");
    zip.setAttribute("target", "_blank");
   zip.setAttribute("href", filepath);
   zip.classList.add("btn","btn-primary");
   zip.appendChild(t);
   let element=<HTMLInputElement>document.getElementById("zipdiv")
       element.innerHTML="";
       element.appendChild(zip)
   },1000)
   
 
 }

 else{
   setTimeout(() => {
 
     this.fileLoading=false; 
 
     let dangerousVideoUrl = `${environment.iframeviewURL}?fileId=''+&token=${this.token}+&date=${this.currenttime}+&filePath=${filepath}`;
     this.publicurl=this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
 
 
 },1000)
 }
}
rtrdoClick(e:any){
  let rdval=e.target.value;
 
  this.txtExpDate='';
}

async dataURLtoFile(dataurl: any, filename: any, ftype: any) {


  const blob = await (await fetch(dataurl)).blob()
  return new File([blob], filename, { type: blob.type })

}


scanImage(folderid: any) {

  // var wsImpl = window.WebSocket || window.MozWebSocket;
  this.scanfileeList = []
  let socket = new WebSocket("ws://localhost:5158/");
  let i = 0;
  let currObj = this;

  let storedFiles: any = [];
  socket.onopen = function (e) {
       socket.send("1100");
  };

  socket.onmessage = async function (event) {
    currObj.scanfileeList = []
    
    if (typeof event.data === "string") {
      //IF Received Data is String

      storedFiles = [];
      i++;
     
      let f: any = JSON.parse(event.data);

      f.name = "File" + i;
      storedFiles.push(f.FileData);



      let filetype;
      if (f.FileType.toLowerCase() == 'pdf') {
        filetype = "data:application/pdf;base64,";
      }
      else {
        filetype = "data:image/jpeg;base64,"
      }


      var file: any = currObj.dataURLtoFile(`${filetype}${f.FileData}`, f.FileName + '.' + f.FileType.toLowerCase(), f.FileType);

      let newFile: FormData = new FormData();
      newFile.append('file', await file)
      newFile.append('fileType', f.FileType.toLowerCase())
      newFile.append('folderId', currObj.folderid)

      currObj.uploadfiles.uploadFile(newFile).subscribe((response: any) => {

        // alert(0)
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            
           
            currObj.scannerfolderid = folderid;
           
            let obj: any = {};
            obj['fileName'] = responseResult.result.fileName;
            obj['filePath'] = responseResult.result.filePath;
            obj['fileType'] = responseResult.result.fileType;
            currObj.scanfileeList.push(obj);


            if(currObj.scanfileeList.length==1){
              let filetype=currObj.scanfileeList[0].fileType
              let filepath=currObj.scanfileeList[0].filePath
              currObj.loadDocPreview(filetype,filepath)
           }
           else{
            currObj.previewFile=false;
           }


          }
          else if (responseResult.status == 400) {
            Swal.fire({
              icon: 'error',
              text: responseResult.message,

            });
          }
          else if (responseResult.status == 501) {

          }
          else {
           
          }
        }
        else {

          Swal.fire({
            icon: 'error',
            text: "Invalid Response",

          });
        }


      },
        (error: any) => {
          alert("error")
        })

  
    }
    else if (event.data instanceof ArrayBuffer) {  }
    else if (event.data instanceof Blob) {}

  };

  socket.onclose = function (event) {
    //this.open(this.scanFailureModal);
    // $('.dalert').modal('show');
    if (event.wasClean) {
      Swal.fire({
        icon: 'error',
        text: `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,

      });
  
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      Swal.fire({
        icon: 'error',
        text: "Scanner app not started please start.",

      });
      
    }
  };

  socket.onerror = function (error) {
    // alert(`[error]`);
  };

}


clearScandata() {
  Swal.fire({
    title: this.commonserveice.langReplace('Confirm') ,
    text: this.commonserveice.langReplace("You want to cancel to upload the current scan file"),
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: this.commonserveice.langReplace('Cancel'),
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: this.commonserveice.langReplace("Yes") 
  }).then((result: any) => {

    if (result.isConfirmed) {
      window.location.reload()
    }
  })

}


}
