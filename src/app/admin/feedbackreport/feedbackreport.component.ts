
/// <reference types="@types/ckeditor" />
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import Swal from 'sweetalert2';
import { UploadfilesService } from '../../services/uploadfiles.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import {FormArray,FormBuilder, FormControlName,FormGroup,FormControl} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { ReportsService } from 'src/app/services/reports.service';
import { Observable, Subscription, fromEvent } from 'rxjs'

@Component({
  selector: 'app-feedbackreport',
  templateUrl: './feedbackreport.component.html',
  styleUrls: ['./feedbackreport.component.scss']
})
export class FeedbackreportComponent implements OnInit {
  name = 'ng2-ckeditor';
  ckeConfig: CKEDITOR.config;
  mycontent: string;
  mycontent2:any=[];
  
  log: string = '';
  @ViewChild('fileuploadModal') fileuploadModal: ElementRef;
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  showFiles:any=false;
  txtdata:any='';

  txtFileName:any;

DemoDoc:any;


myForm : FormGroup;
serviceURL = environment.serviceURL;
  itemID:any;
  sessiontoken:any;
  useremail:any='';
  userid:any=0;
  username:any='';
  resubmitstatus:any=0;
  chkHobbies:any=[
{ name:'Dancing',value:'Dancing' },
{ name:'Singing',value:'Singing' },
{ name:'Playing',value:'Playing' },
];
    
chkSkills:any=[
{ name:"1",value:'React' },  
{ name:"2",value:'Dotnet' },
{ name:"3",value:'java' },
{ name:"4",value:'Python' },
{ name:"5",value:'PHP' },
{ name:"6",value:'Angular' },
];  
userlist:any=[];




myDateValue: Date;
bsInlineValue: Date;
isOpen: boolean = false;
@ViewChild('dp') dp : ElementRef;
customButtonsSubscription : Subscription;
customButtons$:any;
error : boolean = true

dpCustomButtons : string = `<div class="d-flex justify-content-between py-1">
<button id="dpTodayButton" class="two btn btn-success dpCustomButton">Today</button>
<button id="dpResetButton" class="two btn btn-primary dpCustomButton ">Reset</button>
<button id="dpCloseButton" class="two btn btn-danger dpCustomButton">Close</button>
</div>`;


minDate:Date;
maxDate:Date;



  constructor(private modalService: NgbModal,
     private httpClient: HttpClient,
     public encDec:EncrypyDecrpyService,
     private uploadfiles:UploadfilesService,public fb: FormBuilder,  
     private router: ActivatedRoute,  public vldChkLst : ValidatorchecklistService,
     public reportService:ReportsService,
     private el : ElementRef
     
     ) {
      this.minDate=new Date();
      this.maxDate=new Date();
      this.bsInlineValue=new Date();
this.loadusers(0)

    this.mycontent = `<p>My html content</p>`;


  this.myForm = this.fb.group({
   
    dob:new Date(),
    afterdates:new Date(),
    alldates:new Date(),
  });





   }



  
  



  ngOnInit(): void {
    this.myDateValue = new Date();
    this.mycontent2['test'] = 'testval';
    
    // this.ckeConfig = {
    //   allowedContent: false,
    //   extraPlugins: 'divarea',
    //   forcePasteAsPlainText: true,
    //   removePlugins: 'exportpdf'
    // };
  //   this.ckeConfig = {
  //     height: 400,
  //     language: "en",
  //     allowedContent: true,
     
  // };
    this.ckeConfig = {
      allowedContent: true,
      extraPlugins: 'uploadimage',
      removeButtons: 'exportPdf,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteFromWord,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Anchor,Flash,Smiley,SpecialChar,Iframe,Maximize,ShowBlocks,About',
      disallowedContent: '*{*color}; *{*align}',
     filebrowserBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html',
      filebrowserImageBrowseUrl:
        'https://ckeditor.com/apps/ckfinder/3.4.5/ckfinder.html?type=Images',
      filebrowserUploadUrl:
        'http://172.27.30.93:7001/dms_php_admin/admin/ckEditorFileUpload',
      filebrowserImageUploadUrl:
        'http://172.27.30.93:7001/dms_php_admin/admin/ckEditorImageUpload',
    
    };
    let encSchemeId= this.router.snapshot.paramMap.get('id');
    if(encSchemeId != ''){
    let schemeStr = this.encDec.decText(encSchemeId);
    let schemeArr:any = schemeStr.split(':');
    this.itemID = schemeArr[0];
    this.resubmitstatus = schemeArr[1];
      if(this.itemID > 0){
       this. previewDetails(this.itemID);
      }
 

           
      }
  }
 


//\\ ======================== // Modal Open // ======================== //\\ 
open(content: any) {
  this.modalService.open(content, { size: 'md', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
 }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 

  
          
/*
|------------------------------------------------------------------------------
|This function is used for submit data /Insert data in to database
|------------------------------------------------------------------------------

|------------------------------------------------------------------------------
|This function is used for preview all data from database for preview button
|------------------------------------------------------------------------------
*/         
  previewDetails(id:any)   {
   let viewParams={
     'intId':id,
    };

   
   }
   
/*
|------------------------------------------------------------------------------
|This function is used for load and remove checked box array for Hobbies 
|------------------------------------------------------------------------------
*/          
                   
   //\\ ======================== // Load User List // ======================== //\\ 
loadusers(userId:any) {
 
  let dataParam = {
    "userId": userId,
    "fileId":''
  };
  this.reportService.getUserlist(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;

    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
     let res:any = Buffer.from(respData,'base64'); 
     let responseResult = JSON.parse(res)

     if (responseResult.status == 200) {

     let userlist:any=responseResult.result;
for(let i=0;i<userlist.length;i++){
  let obj:any={}
  obj["name"]=userlist[i].userFullName;
  obj["value"]=userlist[i].userId;
  this.userlist.push(obj)

}

 
     }
     if (responseResult.status == 400) {
     
       this.userlist = responseResult.result;
     }
     if (responseResult.status == 500) {
      
      this.userlist = responseResult.result;
    }
    else if(responseResult.status==501){
     
    }
    else{
   
     
    }
    }
    else{
     
    }



  },
  (error:any) =>{
  
  })

}
//\\ ======================== // Load User List // ======================== //\\ 
 
/*
|------------------------------------------------------------------------------
|This function is used for file upload
|------------------------------------------------------------------------------
*/          
 UploadFile(e:any,filesize:any,filesizeType:any,fileType:any){
   let file = e.target.files[0];
   let fileid=e.target.id;
   let flagStatus=true;
   if (!this.vldChkLst.validateFile(file.type, fileType)) // File Type Validation Check
   {
     flagStatus=false;
     Swal.fire({
       icon: 'error',
       text: 'invalid file type'
     });
   }
   if(!this.vldChkLst.validateFileSize(file.size,filesize,filesizeType)) // File Size Validation Check
   {
     flagStatus=false;
     let filesizeMsg ='';
     if (filesizeType.toLowerCase() == 'kb')
     {
         filesizeMsg = 'File size exceeds ' + filesize + 'KB.';
     }
     else
     {
         filesizeMsg = 'File size exceeds ' + filesize + 'MB.';
     }
    
     Swal.fire({
       icon: 'error',
       text: filesizeMsg
     });
   }
   if(flagStatus){
     const fileData = new FormData();
           fileData.append('file', file);
   
   }
 }











}
