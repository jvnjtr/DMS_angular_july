import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Buffer} from 'buffer';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-retention',
  templateUrl: './retention.component.html',
  styleUrls: ['./retention.component.scss']
})
export class RetentionComponent implements OnInit {
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewDocument.config.json";


  @Input() rfileid:any;
  @Input() rfolderid:any;
  @Input() rdate:any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  @Output("callfunction2") callfunction2:EventEmitter<any> = new EventEmitter();
  txtAfter:any=''
  selType:any='0';
  selActionType:any='0';

  constructor( private route: Router,
    private router:ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
  public vldChkLst:ValidatorchecklistService,
  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadconfig();
  }
  //\\ ======================== // Config // ======================== //\\
  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = data[0].pagetitle;
     })
   }
//\\ ======================== // Config // ======================== //\\
  //\\ ======================== // Save Retention // ======================== //\\
  saveRetenstion(){
    // 
  // console.log(this.rfileid+"==========="+this.txtAfter+"========="+this.selType+"======="+this.selActionType)
   let txtafter=this.txtAfter;
   let selType=this.selType;
   let selActionType=this.selActionType;
        //   if (!this.vldChkLst.selectDropdown(foldername,this.messaageslist.foldername)) {
  //   }
  //   else if (!this.vldChkLst.blankCheck(foldername,this.messaageslist.foldername)) {
  //  }
  if(!this.vldChkLst.blankCheck(txtafter,this.commonserveice.langReplace(this.messaageslist.afterdata),'txtAfter')) {
   
   }
else if(!this.vldChkLst.selectDropdown(selType,this.commonserveice.langReplace(this.messaageslist.seldaysType),'selType')) {

   }
 else if(!this.vldChkLst.selectDropdown(selActionType,this.commonserveice.langReplace(this.messaageslist.actionType),'selActionType')) {
       

   }
   
   else{
       let retentionparams={
        "type":2,
        "folderId":this.rfolderid ,
         "fileId":this.rfileid,
         "retentionPeriod":txtafter,
         "periodType":selType,
         "retentionAction":selActionType
       }
      
       this.commonserveice.fileRetention(retentionparams).subscribe((response:any) => {
         let respData = response.RESPONSE_DATA;
         let respToken = response.RESPONSE_TOKEN;
         //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();

         let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
         if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult = JSON.parse(res)
        
          if (responseResult.status == 200) {
           
             Swal.fire({
                
              text: this.commonserveice.langReplace(this.messaageslist.rsuccessMsg),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: this.commonserveice.langReplace('Ok')
            }).then((result) => {
                let encSchemeStr = this.encDec.encText(this.rfolderid.toString());
               // this.route.navigate(['/admin/configuration/formPreview',encSchemeStr]);
     
               this.route.navigate(['/admin/viewupload', encSchemeStr])
               
         
             this.callfunction.emit(); 
              this.callfunction2.emit(); 
              this.formReset();
             
            })
  
  
           
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

      
       
       },
       (error:any) =>{
         
        this.authService.directlogout();
       }) 
 
 
      }
    }
 
  //\\ ======================== // Save Retention // ======================== //\\
  
//\\ ======================== // Reset Form // ======================== //\\
  formReset(){
    this.rfileid='';
    this.txtAfter=''
    this.selType='0';
    this.selActionType='0';
    this.modalService.dismissAll();
  }
//\\ ======================== // Reset Form // ======================== //\\
}

