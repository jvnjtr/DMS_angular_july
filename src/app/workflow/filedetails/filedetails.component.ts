import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-filedetails',
  templateUrl: './filedetails.component.html',
  styleUrls: ['./filedetails.component.scss']
})
export class FiledetailsComponent implements OnInit {

//\\ ======================== // Variables // ======================== //\\
  @Input() fileid:any;
  @Input() roleId:any;
  filedetails:any;
  files_dropped:any=[];
  txtFileName:any;
  txtFileNumber:any;
  metaListDetails:any=[];
  filesize:any;
  fileType:any;
  txtSubject:any;
  ocrLanguage:any;
  createdby:any;
  createdOn:any;
  txtExpDate:any;
  updatedOn:any;
  fileTags:any;
  metadetails:any;
  filePath:any;
  downloaditem:any;
  downloadlink:any;
  folderName:any;
  folderId:any;
  fileVersion:any;
  loading:any=false;
//\\ ======================== // Variables // ======================== //\\

  constructor(private route: Router,
    private router:ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
  public vldChkLst:ValidatorchecklistService,
  private modalService: NgbModal) { }

  ngOnInit(): void {
    // console.log(this.roleId);
    // console.log(this.folderFileDownload)
  
   
    this.viewFileDetails(this.fileid)
  
  }



//\\ ======================== // File details // ======================== //\\
  viewFileDetails(fileId:any){
    let dataParam = {
      "fileId": fileId
      
      };
      this.loading=true;


      this.commonserveice.getFileDetails(dataParam).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res:any = Buffer.from(respData,'base64'); 
              let responseResult = JSON.parse(res)
               
                if (responseResult.status == 200) {
                  this.loading=false;
                  this.filedetails = responseResult.result.fileDetails;
                 // console.log(this.filedetails)
                 this.files_dropped.push(this.filedetails);
                  this.metaListDetails=this.filedetails["metaDetail"];
                  this.txtFileName=this.filedetails.fileName;
          
                
                 this.txtFileNumber=this.filedetails.fileRefNo;
                 this.filesize=this.filedetails.fileSize;
                 this.fileType= this.commonserveice.getfiletype(this.filedetails.fileType);
                this.ocrLanguage=this.filedetails.ocrLanguage;
                 this.txtExpDate=this.filedetails.retentionDate;
                this.txtSubject=this.filedetails.subject;
                 this.filePath =this.filedetails.filePath;
                  this.fileid =this.filedetails.fileId;
                this.folderName=this.filedetails.folderName;
                this.createdby=this.filedetails.createdByName;
                this.createdOn=this.filedetails.CreatedOn ;
                this.updatedOn=this.filedetails.updatedOn;
                this.fileTags=JSON.parse(this.filedetails.fileTags);
                this.metadetails=this.filedetails.metaDetail;
                this.folderId =this.filedetails.folderId;
               
               this.fileVersion =this.filedetails.fileVersion;
                
                }
                if (responseResult.status == 400) {
                  this.loading=false;
                  this.filedetails = responseResult.result;
                }
                else if(responseResult.status==501){
                  
                  this.authService.directlogout();
                }
                else{
                
                }
            }
            else{
              this.loading = false;
              this.authService.directlogout();
            }
         
        },
        error: (msg) => {
          this.authService.directlogout();
       }
     })

  
   }
//\\ ======================== // File details // ======================== //\\


 //\\ ======================== // Download File // ======================== //\\ 
 downloadfils(fid: any, fpath: any) {
  let dataParam = {
    "fileId": fid,
    "url": fpath
  };
  
  this.commonserveice.fileDownload(dataParam).subscribe({
  next: (response) => {
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
      this.loading = false;
      this.authService.directlogout();
    }
  },
  error: (msg) => {
    this.authService.directlogout();
 }
})

}
//\\ ======================== // Download File // ======================== //\\ 


}
