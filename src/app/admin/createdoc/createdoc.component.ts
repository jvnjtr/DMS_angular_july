import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { UploadfilesService } from 'src/app/services/uploadfiles.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-createdoc',
  templateUrl: './createdoc.component.html',
  styleUrls: ['./createdoc.component.scss']
})
export class CreatedocComponent implements OnInit {
  @Input() folderid: any;
  @Output("callfunction") callfunction:EventEmitter<any> = new EventEmitter();
  txtDocuemntName:any=''
  rdoDocuemntType:any="1";
  pdfweriterURL:any;
  excelweriterURL:any;
  token:any;

  createPDFURL:any=environment.createPDFURL;
createExcelURL:any=environment.createExcelURL;

date = new Date;
title:any;
tablist:any;
utillist:any;
messaageslist:any;
jsonurl="assets/js/_configs/createdocument.config.json";



loading:any=false;
getfiletype:any;
previewFile:any=false;
otherDetails:any=false;

  constructor(  private route: Router,
   private httpClient: HttpClient,
   private uploadfiles:UploadfilesService,
   public commonserveice:CommonServicesService,
   public authService:AuthenticationService,
   public encDec:EncrypyDecrpyService,
   private router:ActivatedRoute,
   private vldChkLst:ValidatorchecklistService,
   private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.token=sessionStorage.getItem('TOKEN');
    this.loadCreateeditor(this.rdoDocuemntType)
    this.loadconfig();



  }




  loadCreateeditor(doctype:any){
    this.loading=true;
    if(doctype == '1'){
      setTimeout(() => {
       
        let iframeurl:any=`${this.createPDFURL}?token=${this.token}&`;
        this.pdfweriterURL=this.sanitizer.bypassSecurityTrustResourceUrl(iframeurl);
        this.loading=false;
   
      },500)
     
    }else{
      setTimeout(() => {
        
        let iframeurl:any=`${this.createExcelURL}?token=${this.token}`;
        this.pdfweriterURL=this.sanitizer.bypassSecurityTrustResourceUrl(iframeurl);
        this.loading=false;
   
      },500)
     
    }

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




}
