import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import * as CryptoJS from 'crypto-js';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import {Buffer} from 'buffer';
import { DOCUMENT } from '@angular/common';
import { LeftmenuComponent } from 'src/app/includes/leftmenu/leftmenu.component';


@Component({
  selector: 'app-single-folderdetails',
  templateUrl: './single-folderdetails.component.html',
  styleUrls: ['./single-folderdetails.component.scss']
})
export class SingleFolderdetailsComponent implements OnInit {

  //\\ ======================== // Variables // ======================== //\\
  @Input() folderid: any;
    @Input() folderDelete: any;
    @Input() folderModify: any;
    @Input() roleId: any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  @ViewChild(LeftmenuComponent, { static: false }) childC: LeftmenuComponent;

  folderName:any='';
  folderlist:any;
  folderSize:any;
  parentFolderId:any;
  typeText:any;
  folderPermission:any=[];
  createdByName='';
  createdAt='';
  childSizeInKb:any;
  folderSizeType:any;
  parentSizeinKb:any;
  folderpermissions:any=[];
  noofFiles:any='-';
  noofFolders:any='-';
  typeoffiles:any;
//\\ ======================== // Variables // ======================== //\\

  constructor(
    private route: Router,
    public authService: AuthenticationService,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private authentication: AuthenticationService,
    public vldChkLst: ValidatorchecklistService,
    public encDec:EncrypyDecrpyService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit(): void {
    if(this.folderid != undefined){
    
      this.getFolders(this.folderid) 
    }
    if(this.roleId == '1'){
      this.folderDelete=true;
     
        this.folderModify=true;
  
    }
  }


 //\\ ======================== // Edit Folder // ======================== //\\
 getFolders(fldrId:any) {
  //this.resetform();
 // alert(fldrId)
  let dataParam = {
    "folderId": fldrId,
  };

  this.commonserveice.getFoldersSingle(dataParam).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult = JSON.parse(res)
  
  
  
      if (responseResult.status == '200') {
        let folderDetails:any = responseResult.result;
       
        if(folderDetails.length >0 ){
  //console.log(folderDetails[0])
        this.folderName = folderDetails[0].folderName;
         this.folderSize = folderDetails[0].folderSize;
         this.parentFolderId = folderDetails[0].parentFolderId;
         this.typeText = folderDetails[0].typeText;
        this.childSizeInKb= folderDetails[0].childSizeInKb;
      this.createdByName  = folderDetails[0].createdByName;
      this.createdAt  = folderDetails[0].createdAt;
   this.folderSizeType  = folderDetails[0].folderSizeType;
   this.parentSizeinKb = folderDetails[0].parentSizeinKb;
  
  
  
   let filecount = folderDetails[0].count;
   this.noofFiles=filecount.noOfFile;
   this.noofFolders=filecount.noOfSubFolder;
  this.typeoffiles=filecount.fileCountDetail
   
  //  console.log(filecount)
      this.callfunction.emit();
      // folderpermissions
    }
  
  
  
  
      }
      else if(responseResult.status==400){
        // Swal.fire({
        //   icon: 'error',
        //   text: responseResult.message
        // });
      }
      else if(responseResult.status==501){
          
        this.authService.directlogout();
      }
      
     else{
      this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
     }
    }
    else{
      
      this.authService.directlogout();
    }
    },
    error: (msg) => {
      this.authService.directlogout();
   }
 })



}
//\\ ======================== // Edit Folder // ======================== //\\
//\\ ======================== // Delete Folder // ======================== //\\
delete(fid:any){
  let formParams = {
    "folderId":fid,
    "deleteConfirmation":1
};

    Swal.fire({
      title: this.commonserveice.langReplace('Are you sure') +' ?',
      text:  this.commonserveice.langReplace("Files and Folders will be permanently deleted"),
      icon: 'warning',
      showCancelButton: true,

      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:this.commonserveice.langReplace('Cancel'),
      confirmButtonText: this.commonserveice.langReplace('Yes')+","+ this.commonserveice.langReplace('delete it')+' !'
    }).then((result:any) => {

      if (result.isConfirmed) {
        this.commonserveice.deleteFolder(formParams).subscribe({
          next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
  
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res:any = Buffer.from(respData,'base64'); 
              let responseResult = JSON.parse(res)
        
                if(responseResult.status==200){
                
                  Swal.fire({
                    title:this.commonserveice.langReplace('Deleted')+' !',
                    text:this.commonserveice.langReplace("Record has been trashed"),
                    icon: 'success',
                     confirmButtonText: this.commonserveice.langReplace('Ok'),
                    
                  }).then((result) => {
                   
                    if (result.isConfirmed) {
                    
        
                   let reData:any= this.parentFolderId+':'+'-1'
                   let encSchemeStr = this.encDec.encText(reData.toString());

                   
                 
                  this.route.navigate(['/admin/viewupload',encSchemeStr])
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                 
  
  
  
                    } 
                  })
        
                 
                 
                }
                else if(responseResult.status==400){
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message))
                
                }
                else if(responseResult.status==501){
                
                  this.authService.directlogout();
                }
                else{
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
                 
                }
            }
            else{
             
              this.authService.directlogout();
            }
          },
          error: (msg) => {
            this.authService.directlogout();
         }
       })
    
      }
    })
 }

//\\ ======================== // Delete Folder // ======================== //\\

//\\ ======================== //  Duplicate Folder // ======================== //\\
duplicateFolder(folderid:any){
  let formParams = {
    "folderId": folderid

  };

  this.commonserveice.duplicateFolder(formParams).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;

      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if(respToken == verifyToken){
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
        if (responseResult.status == 200) {

          Swal.fire({
            icon: 'success',
            text: this.commonserveice.langReplace("Duplicate Folder created successfully"),
            
            confirmButtonText: this.commonserveice.langReplace('Ok'),
           
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

            
             
              let encSchemeStr = this.encDec.encText(folderid.toString());
              // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);
              this.commonserveice.onFirstComponentButtonClick();    
             // this.route.navigate(['/admin/viewupload', encSchemeStr])
            }
          })


        

        }
        else if(responseResult.status==501){
        
          this.authService.directlogout();
        }
        else{
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
   
        }
      }
      else{
       
        this.authService.directlogout();
      }
    },
    error: (msg) => {
      this.authService.directlogout();
   }
 })

  
    
 
}
//\\ ======================== // File Duplicate // ======================== //\\


}
