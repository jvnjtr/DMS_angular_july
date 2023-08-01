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
import { WorkflowService } from '../../services/workflow.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notinglist',
  templateUrl: './notinglist.component.html',
  styleUrls: ['./notinglist.component.scss']
})
export class NotinglistComponent implements OnInit {

//\\ ======================== // Variables // ======================== //\\
@Input() fileid:any;
siteUrl = environment.siteURL;
notingList:any;

loading:any=false;
//\\ ======================== // Variables // ======================== //\\

constructor(private route: Router,
  private router:ActivatedRoute,
  private httpClient: HttpClient,
  private workFlowServices:WorkflowService,
  private encDec:EncrypyDecrpyService,
  public authService:AuthenticationService,
public vldChkLst:ValidatorchecklistService,
public commonserveice:CommonServicesService,
private modalService: NgbModal) { }

ngOnInit(): void {
  // console.log(this.roleId);
  // console.log(this.folderFileDownload)

 
  this.notingDetails(this.fileid)

}



//\\ ======================== // File details // ======================== //\\
notingDetails(fileId:any){
  let dataParam = {
    "fileId": fileId
    
    };
    this.loading=true;
    this.workFlowServices.getNotingList(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
      
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult = JSON.parse(res)
           
            if (responseResult.status == 200) {
              this.loading=false;
              this.notingList = responseResult.result;
          //  console.log(this.notingList)
            
            }
            if (responseResult.status == 400) {
              this.loading=false;
              this.notingList = responseResult.result;
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
//\\ ======================== // File details // ======================== //\\




}
