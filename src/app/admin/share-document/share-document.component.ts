import { Component, OnInit, Input } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-document',
  templateUrl: './share-document.component.html',
  styleUrls: ['./share-document.component.scss'],
  providers: [DatePipe]
})
export class ShareDocumentComponent implements OnInit {

  @Input() fileId:any;
  @Input() folderid:any;

  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/shareFile.config.json";
  letterID:any="";
  
  nameList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  userslist: any = [];

  toselectedItems:any = [];
  tonameList:any = [];
  todropdownSettings:any = {};
  touserslist: any = [];

  ccselectedItems:any = [];
  ccnameList:any = [];
  ccdropdownSettings:any = {};
  ccuserslist: any = [];

  bccselectedItems:any = [];
  bccnameList:any = [];
  bccdropdownSettings:any = {};
  bccuserslist: any = [];
  txtSubject:any;
 downloaditem:any;
 downloadlink:any; 

  txtEfminDate:any='';
  txtEtminDate:any='';
  rdoSharethrough:any="1";
  txtEffeciveFrom:any=new Date();
  ckdesc: any;
 
  filepath:any;
  filedetails:any;
  fileName:any;
  rdofileper:any=1;
 

  txtExpireDate:any;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '250px',
    maxHeight: '250px',
    width: '100%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  sanitize: true,
  toolbarPosition: 'top',
  uploadWithCredentials: false,

    };
  // uploadUrl:environment.apiUrl+'ckEditorfileUpload'

btntext:any='Share';
  constructor( 
    private readonly calendar: NgbCalendar,
    private route: Router,
    private httpClient: HttpClient,
    private router: ActivatedRoute,
    private encDec:EncrypyDecrpyService,
public commonserveice:CommonServicesService,
private authService:AuthenticationService,
private vldChkLst:ValidatorchecklistService
    
  ) { }

  ngOnInit(): void {
    this.loadconfig();


    this.viewFileDetails(this.fileId)

  





    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.todropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll:false
    };
    this.ccdropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll:false
    };
    this.bccdropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      enableCheckAll:false
    };


    // tonameList:any = [];
    // todropdownSettings:any = {};
  

    this.getUsers();
  }


  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = this.commonserveice.langReplace(data[0].pagetitle);
     })
   }
  onItemSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.selectedItems.length; i++) {
        this.userslist.push(this.selectedItems[i].id);
    }

  }
  OnItemDeSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
  }
  
  }
  onSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
  }
 
  }
  onDeSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
  }
  
  }

  toonItemSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.toselectedItems.length; i++) {
        this.touserslist.push(this.toselectedItems[i].id);
    }

  }
  toOnItemDeSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.toselectedItems.length; i++) {
      this.touserslist.push(this.toselectedItems[i].id);
  }
  
  }
  toonSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.toselectedItems.length; i++) {
      this.touserslist.push(this.toselectedItems[i].id);
  }
 
  }
  toonDeSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.toselectedItems.length; i++) {
      this.touserslist.push(this.toselectedItems[i].id);
  }
  
  }


  cconItemSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.ccselectedItems.length; i++) {
        this.ccuserslist.push(this.ccselectedItems[i].id);
    }

  }
  ccOnItemDeSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.ccselectedItems.length; i++) {
      this.ccuserslist.push(this.ccselectedItems[i].id);
  }
  
  }
  cconSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.ccselectedItems.length; i++) {
      this.ccuserslist.push(this.ccselectedItems[i].id);
  }
 
  }

  cconDeSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.ccselectedItems.length; i++) {
      this.ccuserslist.push(this.ccselectedItems[i].id);
  }
  
  }


  bcconItemSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.bccselectedItems.length; i++) {
        this.bccuserslist.push(this.bccselectedItems[i].id);
    }

  }
  bccOnItemDeSelect(item: any) {
    this.userslist=[];
    for (let i = 0; i < this.bccselectedItems.length; i++) {
      this.bccuserslist.push(this.bccselectedItems[i].id);
  }
  
  }
  bcconSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.bccselectedItems.length; i++) {
      this.bccuserslist.push(this.bccselectedItems[i].id);
  }
 
  }
  bcconDeSelectAll(items: any) {
    this.userslist=[];
    for (let i = 0; i < this.bccselectedItems.length; i++) {
      this.bccuserslist.push(this.bccselectedItems[i].id);
  }
  
  }

  viewFileDetails(fileId:any){
    let dataParam = {
      "fileId": fileId
      
      };
  this.commonserveice.getFileDetails(dataParam).subscribe((response:any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
  
    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
       
        if (responseResult.status == 200) {
          this.filedetails = responseResult.result.fileDetails;
        // console.log(this.filedetails)
          this.fileName=this.filedetails.fileName;
          this.filepath=this.filedetails["filePath"];
         }
        if (responseResult.status == 400) {
          this.filedetails = responseResult.result;
        }
        else if(responseResult.status==501){
          
          this.authService.directlogout();
        }
        else{
          
        }
    }
    else{
     
     this.authService.directlogout();
    }
   

  },
  (error:any) =>{
    
   this.authService.directlogout();
  })
  
   }
  

  //\\ ======================== // get user list // ======================== //\\
  getUsers() {
    this.nameList = [];
    let dataParam = {
      "userId": '',
      "fileId":this.fileId
    };
    this.commonserveice.getUserlist(dataParam).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
     
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
  
        if (responseResult.status == 200) {
  
          let result = responseResult.result;

          for (let i = 0; i < result.length; i++) {
  
  
            let obj: any = {};
  
            obj['itemName'] = result[i].userFullName;
            obj['id'] = result[i].userId;
            //console.log(obj)
            this.nameList.push(obj);
            this.tonameList.push(obj);
            this.ccnameList.push(obj);
            this.bccnameList.push(obj);
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
       
        this.authService.directlogout();
      }
 
    },
    (error:any) =>{
      
      this.authService.directlogout();
    })
  }
  //\\ ======================== // get user list // ======================== //\\

//\\ ======================== // Download File // ======================== //\\ 
downloadfils(fid: any, fpath: any) {
  let dataParam = {
    "fileId": fid,
    "url": fpath
  };
  this.commonserveice.fileDownload(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;

    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
  
      if (responseResult.status == 200) {
  
        
        this.downloaditem = responseResult.result;
        this.downloadlink = this.downloaditem.filePath;
        let link: any = document.createElement("a");
        link.download = this.downloadlink;
        link.href = this.downloadlink;
        link.target = "_blank";
        link.click();
        
      }
      else if(responseResult.status==501){
          
        this.authService.directlogout();
      }
    }
    else{
    
     this.authService.directlogout();
    }


 
  },
  (error:any) =>{
    
   this.authService.directlogout();
  })
}
//\\ ======================== // Download File // ======================== //\\ 

  shareFile(fileid:any){
  
let sharethrough=this.rdoSharethrough;
let permisssionType=this.rdofileper;
let expireDate=this.txtExpireDate;
let mailSubject=this.txtSubject;
let mailDesc=this.ckdesc;
if ((sharethrough == '1') && (this.userslist.length == 0)) {
  Swal.fire({
    icon: 'error',
    text: this.commonserveice.langReplace(this.messaageslist.selectuser),
  });

}  




else if ((sharethrough == '1') && (!this.vldChkLst.blankCheck(expireDate,this.commonserveice.langReplace(this.messaageslist.expDate),''))) {

  
}
else if ((sharethrough == '2') && (this.touserslist.length == 0)) {

  Swal.fire({
    icon: 'error',
    text: this.commonserveice.langReplace(this.messaageslist.selecttouser),
  });
}
else if ((sharethrough == '2') && (!this.vldChkLst.blankCheck(mailSubject,this.commonserveice.langReplace(this.messaageslist.txtsubject),'txtSubject'))) {

 
}
else if ((sharethrough == '2') && (!this.vldChkLst.blankCheck(mailDesc,this.commonserveice.langReplace(this.messaageslist.maildesc),'ckdesc'))) {


}

else{
  let shareParams:any;
if(sharethrough == 1){
  shareParams={
    "fileId":fileid,
    "shareThrough":sharethrough,
    "shareTo":this.userslist,
    "filePermission":permisssionType,
    "expiryDate":expireDate
      }
}
else{
  shareParams={
    "fileId":fileid,
    "fileName":this.fileName,
    "shareThrough":sharethrough,
    "shareTo":this.touserslist,
    "mailCC":this.ccuserslist,
    "mailBCC":this.bccuserslist,
    "mailSubject":mailSubject.trim(),
    "mailContent":mailDesc.trim(),
   }

     
      
    

}

//console.log(shareParams)
this.commonserveice.fileShare(shareParams).subscribe((response: any) => {
  let respData = response.RESPONSE_DATA;
  let respToken = response.RESPONSE_TOKEN;

  let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
  let responseResult = JSON.parse(res)

  if (responseResult.status == 200) {
    Swal.fire({

      text: this.commonserveice.langReplace(this.messaageslist.successMsg),
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then((result) => {


      let encSchemeStr = this.encDec.encText(this.folderid.toString());
      this.route.navigate(['/admin/viewupload', encSchemeStr])
      // this.getFolders();
      // this.resetform();
    })



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
  Swal.fire({
    icon: 'error',
    text: this.commonserveice.langReplace(environment.somethingWrong),
});

 }
      }
      else{
       
        this.authService.directlogout();
      }

  //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();
 

},
(error:any) =>{
  
  this.authService.directlogout();
})


}
  }

}
