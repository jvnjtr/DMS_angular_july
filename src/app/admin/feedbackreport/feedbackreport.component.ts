
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


apply_check_two : FormGroup;
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
  { name:'React',value:'React' },  
{ name:'Dotnet',value:'Dotnet' },
{ name:'java',value:'java' },
{ name:'Python',value:'Python' },
{ name:'PHP',value:'PHP' },
{ name:'Angular',value:'Angular' },
];  
userlist:any=[];
  constructor(private modalService: NgbModal,
     private httpClient: HttpClient,
     public encDec:EncrypyDecrpyService,
     private uploadfiles:UploadfilesService,public fb: FormBuilder,  
     private router: ActivatedRoute,  public vldChkLst : ValidatorchecklistService,
     public reportService:ReportsService
     
     ) {

this.loadusers(0)

    this.mycontent = `<p>My html content</p>`;
setTimeout(() => {
  const ctrls = this.chkSkills.map((control:any) => this.fb.control(false));
  const userlistctrls = this.userlist.map((control:any) => this.fb.control(false));

  this.apply_check_two = this.fb.group({
    intId:'',
    intCreatedBy: this.userid ,
    intUpdatedBy: this.userid ,
    
txtName : '',

chkSkills : this.fb.array(ctrls),
userlist : this.fb.array(userlistctrls),      
});

}, 500);



   }



  
  



  ngOnInit(): void {
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
        'http://172.27.30.93:7001/DMS_PHP/admin/ckEditorFileUpload',
      filebrowserImageUploadUrl:
        'http://172.27.30.93:7001/DMS_PHP/admin/ckEditorImageUpload',
    
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
 
  get chkSkillsArr() {
    return this.apply_check_two.get('chkSkills') as FormArray;
  }

  get userlistArr() {
    return this.apply_check_two.get('userlist') as FormArray;
  }


//\\ ======================== // Modal Open // ======================== //\\ 
open(content: any) {
  this.modalService.open(content, { size: 'md', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
 }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 
closeModal(){
  this.modalService.dismissAll();
 }
  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  onFileUploadRequest($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  onFileUploadResponse($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }
  
  
          
/*
|------------------------------------------------------------------------------
|This function is used for submit data /Insert data in to database
|------------------------------------------------------------------------------
*/             
submitForm(){
console.log(this.apply_check_two.value)
}
/*
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

 removeFile(UploadFile:any) {
   let upurl:any = document.getElementById(UploadFile);
   upurl.value=[];
   this.apply_check_two.controls[UploadFile].setValue('');
 }

 onchkHobbiesChange(e:any){
  const checkArray: FormArray = this.apply_check_two.get('userlist') as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;
    checkArray.controls.forEach((item: any) => {
      if (item.value == e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }

 }
setvaluesss(){

  let rolePermissionList:any = ["React"];
  let luserList:any = [4,8];
  this.apply_check_two.patchValue({
    intId:'',
    intCreatedBy: this.userid ,
    intUpdatedBy: this.userid ,
    txtName : 'Bikash',
   // chkHobbies:[]
    });


    this.chkSkills.map((perm:any, i:any) => {
      if (rolePermissionList.indexOf(perm.name) !== -1) {
        this.chkSkillsArr.at(i).patchValue(true)
       
      }
    })
console.log( this.userlist)
    this.userlist.map((perm:any, i:any) => {
      if (luserList.indexOf(perm.value) !== -1) {
        this.userlistArr.at(i).patchValue(true)
       
      }
    })
   
}
getIframeContent(){
  let frameObj:any = document.getElementById("frameID");
 var frameContent = frameObj.contentWindow.document.body.innerHTML;
  
alert("frame content : " + frameContent);
}
}
