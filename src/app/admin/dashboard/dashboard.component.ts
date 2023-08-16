// =============================================================================
// File Name		              : dashboard.component.ts
// Description 	              : This is the first page of the after login and it will display summary of overall applicatnt activities
// Created by                 : Bikash Kumar Panda
// Created on                 : 06-Jan-2023
// Designed by                : Bikash Kumar Panda
// Designed on                : 08-Jan-2023
// Developed by               : Bikash Kumar Panda
// Developed on               : 12-Apr-2023
// Style sheet                : dashboard.component.scss

// Used Function              : this.loadconfig(), this.documentSummery(), this.viewPendingList(this.finalobj), this.recentfilelist('1',this.finalobj), this.totalDocs(), getfiletype(filename:any),totalFolders(), recentActivity(), totalFilesShared(), summarygraph()
// =============================================================================

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../services/dashboard.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { CommonServicesService } from '../../services/common-services.service';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    //=============================================================================
    // Required Variables
    //=============================================================================
    @ViewChild('previewModal') previewModal: ElementRef;
    title: any;
    tablist: any;
    utillist: any;
    messaageslist: any;
    jsonurl = "assets/js/_configs/dashboard.config.json";
    Highcharts = Highcharts;
    chartOptions:any='';
    pendingDocList: any = [];
    recentlist: any = [];
    activitylist: any = [];
    graphdata: any = [];
    sessiontoken: any;
    userLoginId: any;
    downloaditem: any
    downloadlink: any
    finalobj: any = {
        'Name': [],
        'Reference': [],
        'Size': [],
        'Document': [],
        'pendingAtName': [],
        'Createdby': [],
        'Meta': [],
        'Tags': []
    };
    noofdocumets: any;
    sizeofdocuments: any;
    nooffolders: any;
    sizeoffolders: any;
    noofsharedfiles: any;
    sizeofsharedfiles: any;
    sizeofdocumentsingb:any;
    pendingLoader:any=false;
    recentdocLoader:any=false;
    logLoader:any=false;
    approvedfiles:any;
pendingfiles:any;
rejectfiles:any;
folderfreespace:any;  
filetype:any;
previewfileid:any;
filePath:any;
logId:any=0;
lockstatus:any;
    //=============================================================================
    // Required Variables
    //=============================================================================



    constructor(
        private route: Router,
        private httpClient: HttpClient,
        private dashboardServices: DashboardService,
        public encDec: EncrypyDecrpyService,
        public authService: AuthenticationService,
        public commonserveice: CommonServicesService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
        let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));

        this.userLoginId = SeetionParsed.USER_LOGINID;
        this.loadconfig();
        setTimeout(()=>{ 
          this.summarygraph();
       
          this.totalDocs();
          this.totalFolders();
          this.recentActivity();
          this.totalFilesShared()
          this.viewPendingList(this.finalobj);
          this.recentfilelist('1', this.finalobj);
        },1000);

     

    }
    //=============================================================================
    // Load Basic configuration of the page like tabs, messages, utils etc
    //=============================================================================
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
    //=============================================================================
    // Load Basic configuration of the page like tabs, messages, utils etc
    //=============================================================================


    previewDoc(id: any) {


        this.route.navigate(['/admin/previewfile', id]);


    }


    //=============================================================================
    // Pending Approval document List
    // Created by Bikash Kumar Panda on 13-Apr-2023
    //=============================================================================  
    viewPendingList(searchitems: any) {
        let dataParam = {
            "searchfilter": searchitems
        };
        this.pendingLoader=true;
       
        
        this.dashboardServices.pendingFileLIst(dataParam).subscribe({
          next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res: any = Buffer.from(respData, 'base64');
              let responseResult = JSON.parse(res)
              if (responseResult.status == 200) {
                  this.pendingLoader=false;
                  this.pendingDocList = responseResult.result;
                 
              }
              else if ((responseResult.status == 400)) {
                this.pendingLoader=false;
              }
              else if(responseResult.status==501){
          
                  this.authService.directlogout();
                }
              else {
                this.pendingLoader=false;
                this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
              }
            }
            else{
              this.pendingLoader=false;
            this.authService.directlogout();
            }

          },
          error: (msg) => {
               this.authService.directlogout();
         }
       })




    }
    //=============================================================================
    // Pending Approval document List
    //=============================================================================  



    //=============================================================================
    // Take Action
    // Created by Bikash Kumar Panda on 12-Apr-2023
    //============================================================================= 
    takeAction(id: any, checkinstatus:any) {
      if(!(checkinstatus == 2)){
        let encSchemeStr = this.encDec.encText(id.toString());
        this.route.navigate(['/workflow/takeaction', encSchemeStr]);
      }
      else{

        this.commonserveice.swalfire('error',this.commonserveice.langReplace("Someone checked out the document")+'. '+this.commonserveice.langReplace("Document must check in before being taken action on")+".")
       
      }
    }
    //=============================================================================
    // Take Action
    //============================================================================= 

    //=============================================================================
    // Download File
    // Created by Bikash Kumar Panda on 12-Apr-2023
    //============================================================================= 
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
              let res: any = Buffer.from(respData, 'base64');
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
                else{
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
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
    //=============================================================================
    // Download File
    //============================================================================= 

    //=============================================================================
    // Recent file List
    // Created by Bikash Kumar Panda on 12-Apr-2023
    //============================================================================= 
    recentfilelist(fid: any, searchitems: any) {

        let dataParam = {"searchfilter": searchitems,"mode":1};
        this.recentdocLoader=true;
        this.dashboardServices.recentFiles(dataParam).subscribe({
          next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;

            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res: any = Buffer.from(respData, 'base64');
              let responseResult = JSON.parse(res)
  
              if (responseResult.status == 200) {
                  this.recentdocLoader=false;
                  this.recentlist = responseResult.result;
                //  console.log(this.recentlist)
              }
             else if (responseResult.status == 400) {
                this.recentdocLoader=false;
                this.commonserveice.swalfire('error',responseResult.message)
                 
              }
              else if(responseResult.status==501){
          
                  this.authService.directlogout();
                }
                 else {
                  this.recentdocLoader=false;
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
              }
            }
            else{
              this.recentdocLoader=false;
            this.authService.directlogout();
            }
          },
          error: (msg) => {
               this.authService.directlogout();
         }
       })
        

    }
    //=============================================================================
    // Recent file List
    //============================================================================= 


    //=============================================================================
    // Total No of documents with size
    // Created by Bikash Kumar Panda on 13-Apr-2023
    //============================================================================= 
    totalDocs() {

        let dataParam = {"mode": 1};
        this.dashboardServices.gettotalDocuments(dataParam).subscribe({
          next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res: any = Buffer.from(respData, 'base64');
              let responseResult = JSON.parse(res)
  
              if (responseResult.status == 200) {

                  let docresult = responseResult.result[0];
                 
                  this.noofdocumets = docresult.totalDocumentCount;
                  this.sizeofdocuments = this.commonserveice.formatBytes(docresult.totalSize,2);
                  this.sizeofdocumentsingb = this.commonserveice.formatBytes(docresult.totalSize,2);
              }
              else if (responseResult.status == 400) {
  
                this.commonserveice.swalfire('error',responseResult.message)
              }
             
              else {
                this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
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
    //=============================================================================
    // Total No of documents with size
    //============================================================================= 


    //=============================================================================
    // Total No of Folders with size
    // Created by Bikash Kumar Panda on 13-Apr-2023
    //============================================================================= 
    totalFolders() {

      let dataParam = { };

      this.dashboardServices.gettotalFolder(dataParam).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)
  
            if (responseResult.status == 200) {
  
                let folderresult = responseResult.result;
               
                 this.nooffolders = folderresult.totalFolderCount;
                 this.sizeoffolders = this.commonserveice.formatBytes(folderresult.childsize,2) ;
                 this.folderfreespace=this.commonserveice.formatBytes(folderresult.freeSpaceLeft,2)
             
            }
           else if (responseResult.status == 400) {
  
            this.commonserveice.swalfire('error',responseResult.message)
            }
            else if(responseResult.status==501){
          
              this.authService.directlogout();
            }
           else{
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
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
  //=============================================================================
  // Total No of Folders with size
  //============================================================================= 
    //=============================================================================
    // Total Shared Files
    // Created by Bikash Kumar Panda on 13-Apr-2023
    //============================================================================= 
    totalFilesShared() {

      let dataParam = {

         
      };

      this.dashboardServices.totalSharedfiles(dataParam).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)
  
            if (responseResult.status == 200) {
  
                let sharedfilesList = responseResult.result[0];
                this.noofsharedfiles = sharedfilesList.totalDocumentCount;
                 this.sizeofsharedfiles = this.commonserveice.formatBytes(sharedfilesList.totalSize,2) ;
                
            }
            else if (responseResult.status == 400) {
  
              this.commonserveice.swalfire('error',responseResult.message)
            }
            else if(responseResult.status==501){
          
              this.authService.directlogout();
            }
            else {
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
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
  //=============================================================================
 // Total Shared Files
  //============================================================================= 
  //=============================================================================
  // Total Recent Activity List user login based
  // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 

  recentActivity(){


 
    let dataParam = {
     type:1
      };
      this.logLoader=true;
      this.dashboardServices.recentactivitylog(dataParam).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
        
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if(respToken == verifyToken){
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult = JSON.parse(res)
             
              if (responseResult.status == 200) {
                this.logLoader=false;
              this.activitylist = responseResult.result;
            
              
              }
              else if (responseResult.status == 400) {
                this.logLoader=false;
              }
              else if(responseResult.status==501){
                
                this.authService.directlogout();
              }
              else{
                this.logLoader=false;
                this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
              }
          }
          else{
            this.logLoader=false;
            this.authService.directlogout();
          }
         

        },
        error: (msg) => {
          this.authService.directlogout();
       }
     })

  
  
  }
//=============================================================================
// Total Recent Activity List user login based
//============================================================================= 
//=============================================================================
// View All
// Created by Bikash Kumar Panda on 13-Apr-2023
//=============================================================================  
viewAll(e:any){
  if(e==1){
    this.route.navigateByUrl('/workflow/pendingdocs');
  }
  else if(e==2){
    this.route.navigateByUrl('/admin/recentactivities');
  }
  else if(e==3){
    this.route.navigateByUrl('/admin/recentFiles');
  }
 
}
//=============================================================================
// View All
//=============================================================================  

  //=============================================================================
  // Total Recent Activity List user login based
  // Created by Bikash Kumar Panda on 13-Apr-2023
  //============================================================================= 

  summarygraph(){


 
    let dataParam = {
     
      };
      this.logLoader=true;
      this.dashboardServices.graphDetails(dataParam).subscribe({
        next: (response) => {

          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              let res:any = Buffer.from(respData,'base64'); 
              let responseResult = JSON.parse(res)
               
                if (responseResult.status == 200) {
                  this.logLoader=false;
                let summarylist = responseResult.result;
          
          this.approvedfiles=summarylist.approvedFile;
          this.pendingfiles=summarylist.pendingFile;
          this.rejectfiles=summarylist.rerejectedFile;
          setTimeout(()=>{ 
                  this.chartOptions = {
              chart: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  type: 'pie'
              },
              colors: ['#00bdab', '#ff6f6f', '#ffbc5a'],
              accessibility: {
                  description: ''
              },
              title: {
                  text: ''
              },
              credits: {
                  enabled: false,
              },
          
              tooltip: {
                  enable: false,
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      showInLegend: true,
                      cursor: 'pointer',
                      innerSize: '50%',
                      dataLabels: {
                          format: '{point.percentage:.1f} %',
                          enabled: true,
                          color: 'black',
                      },
          
          
                  },
              },
              series: [{
              
                  name: 'Documents',
                  data: [{
                      name: this.commonserveice.langReplace('Approved') ,
                      y: this.approvedfiles
                  }, {
                      name: this.commonserveice.langReplace('Reject') ,
                      y: this.rejectfiles 
          
                  }, {
                      name: this.commonserveice.langReplace('Inprogress') ,
                      y: this.pendingfiles
          
                  }]
              }]
          }  
          },200)                         
            
          
          
          
          
          
                }
                else if (responseResult.status == 400) {
                  this.logLoader=false;
                }
                else if(responseResult.status==501){
                  
                  this.authService.directlogout();
                }
                else{
                  this.logLoader=false;
                  this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
                }
            }
            else{
              this.logLoader=false;
              this.authService.directlogout();
            }

        },
        error: (msg) => {
          this.authService.directlogout();
       }
     })



  
  
  }
//=============================================================================
// Total Recent Activity List user login based
//============================================================================= 
//\\ ======================== // Modal Open // ======================== //\\ 
open(id: any) {

  //window.open()
  //   this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
  //  }, (reason: any) => { });
}
//\\ ======================== // Modal Open // ======================== //\\ 
closeModal(){
    this.modalService.dismissAll();
  }
  loadpreview(fileid:any,fileType:any,filePath:any,logid:any,lockStatus:any)
  {
  //  this.open(this.previewModal);
    
        this.previewfileid=fileid;
        this.filePath=filePath;
        this.lockstatus=lockStatus;
        this.logId=logid;
        this.filetype=fileType;
      let encSchemeStr = this.encDec.encText((this.previewfileid+':'+this.filePath+':'+this.lockstatus+':'+this.logId+':'+this.filetype).toString());
     
      const url = environment.siteURL+`#/windowPrev/`+encSchemeStr;
      const w = screen.width * 0.9;
      const h = screen.height * 0.8;
      const left = (screen.width / 2) - (w / 2);
      const top = (screen.height / 2) - (h / 2);
      const randomnumber = Math.floor((Math.random() * 100) + 1);
      // tslint:disable-next-line:max-line-length
      window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
     
       
        
      
  }



  formatBytes(bytes:any, decimals:any) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


}
