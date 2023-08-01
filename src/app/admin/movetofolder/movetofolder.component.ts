import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movetofolder',
  templateUrl: './movetofolder.component.html',
  styleUrls: ['./movetofolder.component.scss']
})
export class MovetofolderComponent implements OnInit {
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewDocument.config.json";

 
  folderlist:any;

  @Input() mfileid:any;
  @Input() mFolderid:any;
  @Input() mFileName:any;
  @Input() mrefNo:any;
  selFolderName:any=0;
  
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  
 
  constructor( private route: Router,
    private router:ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
  public vldChkLst:ValidatorchecklistService,
  private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.loadconfig();

   this.getFolders();
  }
  //\\ ======================== // Config // ======================== //\\
  loadconfig(){
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


  //\\ ======================== // Save Files // ======================== //\\
   saveMoveFile(){
   
  
   let newFolder =this.selFolderName;


if(!(this.vldChkLst.selectDropdown(newFolder,this.commonserveice.langReplace(this.messaageslist.selnewFolder),'selFolderName'))) {
       
    
   }

   else{
       let moveParams={
        "fileId":this.mfileid,
        "folderId":newFolder
       }
       this.commonserveice.moveTofolder(moveParams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
 
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
           let res:any = Buffer.from(respData,'base64'); 
           let responseResult = JSON.parse(res)
          
            if (responseResult.status == 200) {
             
               Swal.fire({
                  
                text: this.commonserveice.langReplace(this.messaageslist.movesuccessMsg),
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: this.commonserveice.langReplace('Ok')
              }).then((result) => {
               let encSchemeStr = this.encDec.encText(this.mFolderid.toString());
                
               this.route.navigate(['/admin/viewupload', encSchemeStr])
               
             this.callfunction.emit(); 
             
              })
    
    
             
             }
             else if(responseResult.status == 400){
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(responseResult.message ))
              
              
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
    }
 
  //\\ ======================== // Save Files // ======================== //\\
//\\ ======================== // Reset Form // ======================== //\\
  formReset(){
   
   this.selFolderName=0;
    this.modalService.dismissAll();
  }
 //\\ ======================== // Reset Form // ======================== //\\
   //\\ ======================== // get Folders // ======================== //\\
 getFolders(){
  let dataParam = {
    "folderId": 0,
    };
    this.commonserveice.getFolders(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
       
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
         
        
          if(responseResult.status == '200'){
            this.folderlist=responseResult.result;
           
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
//\\ ======================== // get Folders // ======================== //\\
}
