import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../../services/authentication.service';

import * as CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewdraftdocument',
  templateUrl: './viewdraftdocument.component.html',
  styleUrls: ['./viewdraftdocument.component.scss']
})

export class ViewdraftdocumentComponent implements OnInit {

  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewdraftdocument.config.json";

  letterID:any="";
  metalist:any=[];
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50,100,500,1000];

mettypelist:any=['-','String','Date','Integer']
txtSearch:any;
searchColList:any=["Meta Name","Description","Type","Created By"]
searchselcteditems:any=[];
@ViewChild("searchField") searchField: ElementRef;
namesarray:any=[];
Descriptionarray:any=[];
filesizearray:any=[];
typearray:any=[];
createdbyarray:any=[];
finalarray:any=[];
finalobj: any = {
  'Meta Name':this.namesarray,
  'Description':this.Descriptionarray,
  'Type':this.typearray,
  'Createdby':this.createdbyarray
}; 
loading:any=false;


sortDir = 1;//1= 'ASE' -1= DSC
sortOrder: string = 'asc';
sortColumn: string = 'ticker';

tablecollist=[

  {"name":"File Name","cname":"fileName","sortable":true }, 
  
  {"name":"Created By","cname":"createdBy","sortable":true },
  {"name":"Created On","cname":"createdOn","sortable":true }
]


  constructor(
    private route: Router,
     private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    public encDec:EncrypyDecrpyService,
    public authService:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    this.viewDraftList();
    // console.log(this.mettypelist[0])
    // for(let kc of this.mettypelist)
    // {
    //   // console.log(kc);
    // }
  //  console.log(this.mettypelist)
  }
  
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





  gotoDraftEdit(draftId:any){

  let encSchemeStr = this.encDec.encText(draftId.toString());
  this.route.navigate(['../admin/createdoc',encSchemeStr]);


 }
   //\\ ======================== // get meta list // ======================== //\\
  viewDraftList(){


 
  let dataParam = {
    "intMetaId": ''
    };
    this.loading=true
    this.commonserveice.viewDraftFile(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
      
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult = JSON.parse(res)
            console.log(responseResult);
            //return false;
            if (responseResult.status == 200) {
              this.loading=false;
            this.metalist = responseResult.result;
            }
            else if(responseResult.status==501){
                
              this.authService.directlogout();
            }
            else{
              this.loading=false;
              // this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
            }
        }
        else{
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg:any) => {
        this.authService.directlogout();
     }
   })



}
 //\\ ======================== // get Meta list // ======================== //\\

 //\\ ======================== // Table Pagination // ======================== //\\
onTableDataChange(event: any) {
  this.page = event;
 // console.log(this.page +"==="+this.tableSize)
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;

}
 //\\ ======================== // Table Pagination // ======================== //\\
 deletDraft(draftId:any){

  let formParams = {
    "draftId":draftId
   
};

    Swal.fire({
      title: this.commonserveice.langReplace('Are you sure')+' ?',
      text:  this.commonserveice.langReplace(this.messaageslist.warningtype),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: this.commonserveice.langReplace('Cancel'),
      confirmButtonText: this.commonserveice.langReplace('Yes')+', '+this.commonserveice.langReplace('delete it')+' !'
    }).then((result:any) => {

      if (result.isConfirmed) {
        this.commonserveice.deleteMeta(formParams).subscribe({
          next: (response) => { let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
  
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if(respToken == verifyToken){
              
            let res:any = Buffer.from(respData,'base64'); 
            let responseResult = JSON.parse(res)
            if(responseResult.status==200){
              Swal.fire(
                this.commonserveice.langReplace('Deleted')+' !',
                this.commonserveice.langReplace(this.messaageslist.deleteMsg),
                'success'
              )
              //this.viewMetaLit()
              
            }
            else if(responseResult.status==400){
              this.commonserveice.swalfire('error',this.commonserveice.langReplace("Meta details used in different files"))
           
            }
            else if(responseResult.status==501){
            
              this.authService.directlogout();
            }
            
            else{
             
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
            }
            }
            else{
              this.loading = false;
            
            }},
          error: (msg) => {
            this.authService.directlogout();
         }
       })
     
      }
    })
 }

   //\\ ======================== // Data sorting // ======================== //\\



  
    //\\ ======================== // Data sorting // ======================== //\\


}
