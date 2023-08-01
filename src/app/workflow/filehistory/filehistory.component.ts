
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { WorkflowService } from '../../services/workflow.service';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';



@Component({
  selector: 'app-filehistory',
  templateUrl: './filehistory.component.html',
  styleUrls: ['./filehistory.component.scss']
})
export class FilehistoryComponent implements OnInit {
//\\ ======================== // Variables // ======================== //\\
title:any;
tablist:any;
utillist:any;
messaageslist:any;
jsonurl="assets/js/_configs/viewHistory.config.json";
letterID:any="";
metalist:any=[];
fileId:any;
folderId:any;
userActionList:any=[];



showFiles:any=false;
txtdata:any='';

txtFileName:any;

DemoDoc:any;
stageNo:any;
workflowFolderId:any;
intApprovalId:any;
loading:any=false;
radAction:any=0;
filePath:any;
filetype:any;
logid:any;
filename:any;
lockstatus:any;
//\\ ======================== // Variables // ======================== //\\

constructor( private route: Router,
  private router:ActivatedRoute,
  private httpClient: HttpClient,
  public commonserveice:CommonServicesService,
  private workFlowServices: WorkflowService,
  public encDec:EncrypyDecrpyService,
  public authService:AuthenticationService,
  public vldChkLst:ValidatorchecklistService) { 


  }

ngOnInit(): void {
  this.loadconfig();

  let encSchemeId = this.router.snapshot.paramMap.get('id');
  if(encSchemeId != ""){
    let schemeStr = this.encDec.decText(encSchemeId);
    let schemeArr:any = schemeStr.split(':');
    this.fileId = schemeArr[0];
    this.folderId = schemeArr[1];
    this.stageNo=schemeArr[2];
    this.workflowFolderId=schemeArr[3];
    this.intApprovalId=schemeArr[4];
    this.filePath=schemeArr[5];
    this.filename=schemeArr[6];
    this.logid=schemeArr[7];
    this.lockstatus=schemeArr[8];
    this.filetype=schemeArr[9];



   }


}

//\\ ======================== // Load Config // ======================== //\\
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
//\\ ======================== // Load Config // ======================== //\\
//\\ ======================== // Get Action List // ======================== //\\


 

}
