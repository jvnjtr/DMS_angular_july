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
  selector: 'app-update-folder',
  templateUrl: './update-folder.component.html',
  styleUrls: ['./update-folder.component.scss']
})
export class UpdateFolderComponent implements OnInit {

  @Input() folderid: any;
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

selParentFolderId: any = '0';
txtFolderName: any = '';
rdoPermissiontype: any = '0';
isSelected: boolean = true;
nameList: any = [];
selectedItems: any;
dropdownSettings: any;
txtAllowSize: any;
selSizeType: any = '0';
rolelist: any = [];
selectroleList: any = [];
userslist: any = [];
selection: any;

dataviewtype:any=1;
txtSearch:any;
sessiontoken:any;
userid:any;
designationid:any;
username:any;
permissionlist:any;

folderName:any;
selFolderName:any
parentfolderName:any;
loading:any;
selDepartmentName:any='0';
txtAllowFileSize:any;
selFileSizeType:any='0';
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
  this.loadconfig();
  this.viewfolderDetails(this.folderid);
}
//\\ ======================== // Config // ======================== //\\
loadconfig() {
  this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
    this.tablist = data[0].tabList;
    this.utillist = data[0].utils
    this.messaageslist = data[0].messages;
    this.title = data[0].pagetitle;
  },
  (error:any) =>{
    Swal.fire({
      icon: 'error',
      text: error
    });
  })
}

 //\\ ======================== // get Folders // ======================== //\\
 getFolders(folderid:any){
  let dataParam = {
    "folderId": folderid,
    };
    this.loading=true;    
this.commonserveice.getFolders(dataParam).subscribe((response:any) => {
  let respData = response.RESPONSE_DATA;
  let respToken = response.RESPONSE_TOKEN;
  let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
  if(respToken == verifyToken){
    let res:any = Buffer.from(respData,'base64'); 
    let responseResult = JSON.parse(res)
if(responseResult.status == '200'){
this.loading=false;    
this.folderlist=responseResult.result;
  if(this.folderlist.length > 0){
  this.parentfolderName=this.folderlist[0].folderName
  }
// console.log(this.folderlist)
}
else if(responseResult.status==501){
    
  this.authService.directlogout();
}
else{
  this.loading=false; 
  this.authService.directlogout();
}
  }
  else{
    this.loading = false;
    this.authService.directlogout();
  }
 


  
} ,(error:any) => {
  this.loading=false; 
  this.authService.directlogout();
 
})
    


}
//\\ ======================== // get Folders // ======================== //\\


//\\ ======================== // Edit Folder // ======================== //\\
viewfolderDetails(fldrId: any) {
  //this.resetform();
  this.loading=true; 
  let dataParam = {
    "folderId": fldrId,
  };
  
  this.commonserveice.getFoldersSingle(dataParam).subscribe((response: any) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
if (responseResult.status == '200') {
this.loading=false; 
    let folderDetails = responseResult.result;



    this.selParentFolderId = folderDetails[0].parentFolderId;
    this.getFolders(folderDetails[0].parentFolderId)
    this.txtFolderName = folderDetails[0].folderName;
    this.selSizeType = folderDetails[0].folderSizeType;
    this.txtAllowSize = Math.round(folderDetails[0].folderSize);
    this.selectroleList = folderDetails[0].folderPermission;
    this.txtAllowFileSize=Math.round(folderDetails[0].allowedFileSize);
    this.selFileSizeType= folderDetails[0].allowedFileSizeType;
    this.selDepartmentName= folderDetails[0].departmentId;
   }
   else if(responseResult.status==501){
      
    this.authService.directlogout();
  }
  else {
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
//\\ ======================== // Edit Folder // ======================== //\\


//\\ ======================== // Reset Form // ======================== //\\
resetform() {
  let encSchemeStr = this.encDec.encText(this.folderid.toString());
 
  this.route.navigate(['/admin/viewupload', encSchemeStr])

  
}
//\\ ======================== // Reset Form // ======================== //\\


//\\ ======================== // Createing New Folder // ======================== //\\

updateFolder() {
 
  let parentfolder = this.selParentFolderId;
  let foldername = this.txtFolderName;
  let permissiontype = this.rdoPermissiontype;
  let allowSize = this.txtAllowSize;
  let sizeType = this.selSizeType;
  let department = this.selDepartmentName;
    let allowfileSize = this.txtAllowFileSize;
    let sizefileType = this.selFileSizeType;

        
  if (!this.vldChkLst.blankCheck(foldername,this.commonserveice.langReplace(this.messaageslist.foldername),'txtFolderName')) {}
  else if (!this.vldChkLst.containsSpecialChars(foldername)) {
    Swal.fire({
      icon: 'error',
      text: this.commonserveice.langReplace('Special Char Not allowed in foldername')
    });
  }
  else if (!this.vldChkLst.blankCheck(allowSize,this.commonserveice.langReplace(this.messaageslist.allowsize),'txtAllowSize')) { }
  else if ((allowSize != '') && (!this.vldChkLst.selectDropdown(sizeType,this.commonserveice.langReplace(this.messaageslist.allowsizeType),'selSizeType'))) { }
  else if (!this.vldChkLst.blankCheck(allowfileSize,this.commonserveice.langReplace(this.messaageslist.allowfileSize),'txtAllowFileSize')) {}
  else if ((allowfileSize != '') && (!this.vldChkLst.selectDropdown(sizefileType,this.commonserveice.langReplace(this.messaageslist.allowfilesizeType),'selFileSizeType'))) { }
  else {
    let forlderParams = {
      "folderId": this.folderid,
      "parentFolderId": parentfolder,
      "folderName": foldername.trim(),
      "folderPermission": this.selectroleList,
      "allowedSize": allowSize,
      "allowedSizeType": sizeType,
      "retentionDate": '',
      "allowedFileSize": allowfileSize,
      "allowedFileSizeType": sizefileType,
      "deptId": department,
      "archieveDate": ''
    }
   

    this.commonserveice.createFolders(forlderParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
  
        if (responseResult.status == 202) {
          Swal.fire({
  
            text: this.messaageslist.updatesuccessMsg,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            let reData:any= this.folderid+':'+'0'
              
            let encSchemeStr = this.encDec.encText(reData.toString());
            this.route.navigate(['/admin/viewupload',encSchemeStr])
           
            this.resetform();
          })
  
  
  
        }
        
        else if(responseResult.status == 400){
  
          
          Swal.fire({
            icon: 'error',
            text:responseResult.message,
            
          });
  
      
         }
         else if(responseResult.status == 401){
  
          
          Swal.fire({
            icon: 'error',
            text:responseResult.message
            
          });
  
      
         }
         else if(responseResult.status == 500){
  
          
          Swal.fire({
            icon: 'error',
            text:responseResult.message
            
          });
  
      
         }
         else if(responseResult.status==501){
          
          this.authService.directlogout();
        }
        else {
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
      this.authService.directlogout();
    })




  }
 

}
//\\ ======================== // Createing New Folder // ======================== //\\









}
