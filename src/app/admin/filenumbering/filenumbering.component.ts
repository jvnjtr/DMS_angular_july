import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { CommonServicesService } from '../../services/common-services.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-filenumbering',
  templateUrl: './filenumbering.component.html',
  styleUrls: ['./filenumbering.component.scss']
})
export class FilenumberingComponent implements OnInit {
//\\ ======================== // Variables // ======================== //\\
  @Input() folderid:any; 
  @Input() fileid:any; 
  @Input() fileRefNo:any; 
  @Input() fileName:any; 
  @Input() updatedate:any; 
  @Input() fsplitVal:any; 
  @Input() fsplitId:any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
    @Output("callfunction2") callfunction2:EventEmitter<any> = new EventEmitter();
  splitRefNo:any; 
  numbringdetails:any;
//\\ ======================== // Variables // ======================== //\\


  constructor(
    private route: Router,
    private httpClient: HttpClient,
    private router:ActivatedRoute,
    public encDec:EncrypyDecrpyService,
    public commonserveice:CommonServicesService,
  public authService:AuthenticationService,
  private modalService: NgbModal,
  public vldChkLst:ValidatorchecklistService
  ) { }
   
  ngOnInit(): void {
   


  }

 //\\ ======================== // Save Numbering // ======================== //\\ 
  saveNumber(){


 if(!this.vldChkLst.blankCheck(this.fsplitId,this.commonserveice.langReplace("Enter New Number"),'fsplitId')) {
    
   }

   else{
       let retentionparams={
       
        "fileRefNo":this.fsplitVal+this.fsplitId ,
         "fileId":this.fileid,
        
       }
      
       this.commonserveice.fileNumbreing(retentionparams).subscribe((response:any) => {
         let respData = response.RESPONSE_DATA;
         let respToken = response.RESPONSE_TOKEN;
         //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();
         let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
         if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult = JSON.parse(res)
         
           if (responseResult.status == 200) {
            
              Swal.fire({
                 
               text: this.commonserveice.langReplace("File number updated successfully"),
               icon: 'success',
               confirmButtonColor: '#3085d6',
               confirmButtonText: this.commonserveice.langReplace('Ok')
             }).then((result) => {
    let encSchemeStr = this.encDec.encText(this.folderid.toString());
               
                this.route.navigate(['/admin/viewupload', encSchemeStr])
                
              this.callfunction.emit(); 
              this.callfunction2.emit(); 
           
           
             })
   
   
            
            }
            else if(responseResult.status == 400){
  
              Swal.fire({
                icon: 'error',
                text:responseResult.message.fileRefNo[0]
                
              });
             
            }
          
   
            else if(responseResult.status==501){
          
              this.authService.directlogout();
            }
         else{
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong)
  });
         }
         }
         else{
          
          this.authService.directlogout();
         }



 
       
       }
      ,
    (error:any) =>{
      
      this.authService.directlogout();
    }) 
 
 
      }
    }
  //\\ ======================== // Save Numbering // ======================== //\\ 
 
  
 //\\ ======================== // Reset Form // ======================== //\\ 
  formReset(){
    this.fsplitId='';
    this.modalService.dismissAll();
  }
 //\\ ======================== // Reset Form // ======================== //\\



}
