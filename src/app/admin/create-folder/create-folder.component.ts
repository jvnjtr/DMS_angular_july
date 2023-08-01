import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import {Buffer} from 'buffer';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss']
})
export class CreateFolderComponent implements OnInit {

  @Input() parentfolderid: any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
//\\ ======================== // Variables // ======================== //\\
title: any;
tablist: any;
utillist: any;
messaageslist: any;
jsonurl = "assets/js/_configs/newsubFolder.config.json";
letterID: any = "";
files_dropped: File[] = [];
folderlist: any = [];
sizetypelist: any = ['-', 'KB', 'MB', 'GB', 'TB']
page: number = 1;
count: number = 0;
tableSize: number = 10;
pageSizes = [10, 20, 50, 100, 500, 1000];
selParentFolderName: any = '0';
txtFolderName: any = '';
rdoPermissiontype: any = '0';
isSelected: boolean = true;
nameList: any = [];
selectedItems: any;
dropdownSettings: any;
txtAllowSize: any;
selSizeType: any = '0';
rolelist: any = [];
selectroleList: any[] = [];
userslist: any = [];
selection: any;
folderId: any = '';
dataviewtype:any=1;
txtSearch:any;
sessiontoken:any;
userid:any;
designationid:any;
username:any;
permissionlist:any;
rolewisepermissions:any=[];
userwisepermissions:any=[];


rolepermissions:any=[];

permissionlistitems:any=[
  {label: 'Read'},
  {label: 'Write'},
  {label: 'Download'},
  {label: 'Create Folder'},
  {label: 'Delete'},
  {label: 'Rename'},
  
  {label: 'WorkFlow'},
  {label: 'Move to folder'}


]
folderName:any;
selFolderName:any;
folderSizeType:any;
parentSizeinKb:any;
childSizeInKb:any;
txtAllowFileSize:any;
selFileSizeType:any='0';
selDepartmentName:any;
//\\ ======================== // Variables // ======================== //\\

constructor(
  private route: Router,
  public authService: AuthenticationService,
  private httpClient: HttpClient,
  public commonserveice: CommonServicesService,
  private authentication: AuthenticationService,
  public vldChkLst: ValidatorchecklistService,
  public encDec:EncrypyDecrpyService
) { }

ngOnInit(): void {

  this.dropdownSettings = {
    singleSelection: false,
    text: 'Select Name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: 'myclass custom-class'
  };


  this.loadconfig();
  this.getFolders(this.parentfolderid);
 
  this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION'); 

  let SeetionParsed =JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
 
   this.username=SeetionParsed.USER_NAME;
  this.userid=SeetionParsed.USER_ID;
 
  this.getPermissions(this.parentfolderid)
  
 
}
//\\ ======================== // Config // ======================== //\\
loadconfig() {
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
//\\ ======================== // Config // ======================== //\\

 //\\ ======================== // get Folders // ======================== //\\
 getFolders(folderid:any){
  let dataParam = {
    "folderId": folderid,
    };
    this.commonserveice.getFoldersSingle(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
       
       
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
         
        
          if(responseResult.status == '200'){
      
            this.folderlist=responseResult.result;
            //console.log(this.folderlist)
            if(this.folderlist.length > 0){
      
      
      
              this.folderSizeType=this.folderlist[0].folderSizeType;
              this.parentSizeinKb =this.folderlist[0].parentSizeinKb;
               this.childSizeInKb=this.folderlist[0].childSizeInKb ;
      
            this.folderName=this.folderlist[0].folderName
            this.selFolderName=this.folderlist[0].parentFolderId;
            this.selectroleList = this.folderlist[0].folderPermission;
            this.selDepartmentName=this.folderlist[0].departmentId;
            }
        // console.log(this.selectroleList)
          }
          else if(responseResult.status==501){
              
            this.authService.directlogout();
          }
         else{
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
         }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })

    


}
//\\ ======================== // get Folders // ======================== //\\

//\\ ======================== // Reset Form // ======================== //\\
resetform() {
  this.folderId = '';
  this.selParentFolderName = '0';
  this.txtFolderName = '';
  this.rdoPermissiontype = '0';
  this.txtAllowSize = '';
  this.selSizeType = '0';
  this.userslist = [];
  this.rolelist = [];
  this.txtAllowFileSize='';
  this.selFileSizeType='0'
}
//\\ ======================== // Reset Form // ======================== //\\


//\\ ======================== // Createing New Folder // ======================== //\\

crateFolder() {
 
  let parentfolder = this.parentfolderid;
  let foldername = this.txtFolderName;
  let permissiontype = this.rdoPermissiontype;
  let allowSize = this.txtAllowSize;
  let sizeType = this.selSizeType;
  let allowfileSize = this.txtAllowFileSize;
  let sizefileType = this.selFileSizeType;

  const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!this.vldChkLst.blankCheck(foldername,this.commonserveice.langReplace(this.messaageslist.foldername),'txtFolderName')) {
 }
 else if (specialChars.test(foldername)) {
  this.commonserveice.swalfire('error',this.commonserveice.langReplace('Special Char Not allowed in foldername'))
  
}

else if (!this.vldChkLst.blankCheck(allowSize,this.commonserveice.langReplace(this.messaageslist.allowsize),'txtAllowSize')) {}
else if ((allowSize != '') && (!this.vldChkLst.selectDropdown(sizeType,this.commonserveice.langReplace(this.messaageslist.allowsizeType),'selSizeType'))) {}
else if (!this.vldChkLst.blankCheck(allowfileSize,this.commonserveice.langReplace(this.messaageslist.allowfileSize),'txtAllowFileSize')) { }
else if ((allowfileSize != '') && (!this.vldChkLst.selectDropdown(sizefileType,this.commonserveice.langReplace(this.messaageslist.allowfilesizeType),'selFileSizeType'))) {}
  else {

  
    let forlderParams = {
      "folderId": this.folderId,
      "parentFolderId": parentfolder,
      "folderName": foldername.trim(),
      "folderPermission": this.selectroleList,
      "allowedSize": allowSize,
      "allowedSizeType": sizeType,
      "allowedFileSize": allowfileSize,
      "allowedFileSizeType": sizefileType,
      "deptId": this.selDepartmentName,
      "retentionDate": '',
      "archieveDate": ''
    }
   // console.log(forlderParams)


   this.commonserveice.createFolders(forlderParams).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)

      if (responseResult.status == 200) {
        Swal.fire({

          text: this.commonserveice.langReplace(this.messaageslist.successMsg),
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: this.commonserveice.langReplace('Ok')
        }).then((result) => {
          let reData:any= this.parentfolderid+':'+'0'
            
          let encSchemeStr = this.encDec.encText(reData.toString());
         // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);
         window.location.reload()
          this.route.navigate(['/admin/viewupload',encSchemeStr])
          this.getFolders(this.parentfolderid);
          this.resetform();
        })



      }
   
      else if(responseResult.status == 400){

        this.commonserveice.swalfire('error',responseResult.message)
       

    
       }
       else if(responseResult.status == 401){

        
        this.commonserveice.swalfire('error',responseResult.message)

    
       }
       else if(responseResult.status == 500){

        this.commonserveice.swalfire('error',responseResult.message)

    
       }
        
       else if(responseResult.status==501){
        
        this.authService.directlogout();
      }
     else{
      this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
     }


    },
    error: (msg) => {
      this.authService.directlogout();
   }
 })


  




  }
 

}
//\\ ======================== // Createing New Folder // ======================== //\\
formatFileSize(bytes:any,decimalPoint:any) {
  if(bytes == 0) return '0 Bytes';
  var k = 1000,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

//\\ ======================== // get Folders Permissions// ======================== //\\
getPermissions(folderid:any){

  this.rolewisepermissions=[];
let dataParam = {
    "folderId": folderid,
    };
   
    this.commonserveice.getFolders(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
  let respToken = response.RESPONSE_TOKEN;
 
 
  let res:any = Buffer.from(respData,'base64'); 
  let responseResult = JSON.parse(res)
   
  
    if(responseResult.status == '200'){
      this.permissionlist=responseResult.result;
     // console.log( this.permissionlist)
      if(this.permissionlist.length > 0){
        let foldrpermissions:any=JSON.parse(this.permissionlist[0].folderPermission)
        let rolewisepermissions=foldrpermissions[0].rolebased;
        let userwisepermissions=foldrpermissions[0].userbased;

        for (let i = 0; i < rolewisepermissions.length; i++) {
          let obj: any = {};
          obj['roleName'] = rolewisepermissions[i].roleName;
          obj['roleId'] = rolewisepermissions[i].roleId;
          obj['checked'] = rolewisepermissions[i].checked;
          obj['permission'] = rolewisepermissions[i].permission;
          obj['deptId'] = this.selDepartmentName;
          this.rolewisepermissions.push(obj);
        }

      


      }

    }
    else if(responseResult.status==501){
        
      this.authService.directlogout();
    }
   else{
    this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
   }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })   



    


}
//\\ ======================== // get Folders // ======================== //\\


formatBytes(bytes:any, decimals:any) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

}
