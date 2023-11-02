import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { ManageformconfigService } from 'src/app/services/manageformconfig.service';
import { CommonconfigService } from 'src/app/services/commonconfig.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-view-manageform',
  templateUrl: './view-manageform.component.html',
  styleUrls: ['./view-manageform.component.scss']
})
export class ViewManageformComponent implements OnInit {

  public loading = false;
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/viewManageform.config.json";


  formsList:any;
  isFlag=true;
  POSTS: any;
  page: number = 1;
   count: number = 0;
   tableSize: number = 10;
   pageSizes = [10, 20, 50,100,500,1000];
   formNames:any;
  txtFormName:any;
   selModuleName:any=0;
   moduleNames:any;
  letterIdArray:any = [];
  pubUnpStatus:any[]=[];
  chkAll:any=0;
  sevName:any="addManageForm"; 

  constructor(private route: Router,private httpClient: HttpClient,
    private commonService: CommonconfigService, 
    private ManageformconfigService:ManageformconfigService,
    private encDec:EncrypyDecrpyService
 ) { }

  ngOnInit(): void {  
    this.loadconfig();
    this.viewItems();
    this.getModuleNames();
  }
  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      this.title = this.multilingual(data[0].pagetitle);
     })
   }
   multilingual(test:any)
   {
   return test;
   }

   getModuleNames(){
    this.loading=true;
    this.commonService.getModules().subscribe((response:any)=>{
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());

        if (res.status == 200) {
          this.moduleNames = res.result;
        }
        else {
          Swal.fire({
            icon: 'error',
            text: 'Something Went wrong',

          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Unauthorized Response!!',
        });
      }
    ///
      // if(res.status === 200){
      //   this.loading=false;
      //   this.moduleNames=res.result;
      // }
      // else{
      //  console.log(res.messages)
      //  }
      //  });
    });
   }
   viewItems(){
    this.selModuleName=0; 
    this.txtFormName=null;
    let formParams = { 
       "moduleId":"",
       "iteamId":"",
       "vchProcessName":""

    };
     this.loading=true;
     this.ManageformconfigService.viewManageForm(formParams).subscribe((response:any)=>{
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let res = JSON.parse(atob(respData)); 
  
      if(res.status==200){
        this.loading=false;
        this.formsList=res.result;
console.log(this.formsList)
      }
      else{
        
        Swal.fire({
          icon: 'error',
          text: 'Something Went Wrong',
          
        }); 
      }
       
       });
   }
   onTableDataChange(event: any) {
    this.page = event;
 
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;

  }



   viewSearchList(){
    let moduleId =this.selModuleName; 
    let formName= this.txtFormName;
    this.loading=true;
    let formParams = {
      "moduleId":moduleId,
      "iteamId":"",
      "vchProcessName":formName 
     
    };
      this.ManageformconfigService.viewManageForm(formParams).subscribe((response:any)=>{
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res = JSON.parse(atob(respData));  
      
      if(res.status==200){
        this.loading=false;
        this.formsList=res.result;
       //console.log(this.formsList)
        this.isFlag = true;
      }
      else{
        this.isFlag = false;
        Swal.fire({
          icon: 'error',
          text: this.messaageslist.errorMsg,
          
        }); 
      }
       
       });
   }
   deleteform(formId:any){
    let encSchemeStr = this.encDec.encText(formId.toString());
    let formParams = {
      "itemId":formId,
      "itemStatus" :"1" 
 };

      Swal.fire({
        title: 'Are you sure?',
        text:  this.messaageslist[2].warningtype,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result:any) => {

        if (result.isConfirmed) {
          this.ManageformconfigService.addNewForm(formParams).subscribe((response:any)=>{
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            let res = JSON.parse(atob(respData));
          if(res.status==200){
            Swal.fire(
              'Deleted!',
              this.messaageslist.deleteMsg,
              'success'
            )
            this.viewItems()
            
          }
          else{
           
            Swal.fire({
              icon: 'error',
              text:  this.messaageslist.errorMsg,
              
            }); 
          }
        });
        }
      })
   }
   editForm(letterStr : any){
    let encSchemeStr = this.encDec.encText(letterStr.toString());
    this.route.navigate(['/formbuilder/editManageform',encSchemeStr]);
   }
   onChange(checkid:any, e:any,publishStatus:any) {
    
    if(e.target.checked) {
      if(! this.letterIdArray.includes(checkid)){
      //  {'letterId':checkid ,'publishUnpublisStatus':publishStatus }
        this.letterIdArray.push(checkid);
       this.pubUnpStatus.push({'letterId':checkid ,'publishUnpublisStatus':publishStatus});
      }
      } else {
      let index = this.letterIdArray.indexOf(checkid); 
      let indxAdd:number = 0;
      for(let mk of this.pubUnpStatus)
        {
          if(mk.letterId == checkid)
            {
              this.pubUnpStatus.splice(indxAdd,1);
              break;
            }
         // console.log(mk.letterId == checkid);
        }
      this.letterIdArray.splice(index,1);
    }
}

selectAll(e:any) {
  let encSchemeStr = this.encDec.encText(e.toString());
  let checkBoxes = document.querySelectorAll('.rowCheck');
  if(e.target.checked) {
    for(var i = 0; i < checkBoxes.length; i++) {

      var ids = checkBoxes[i].id;
      this.letterIdArray.push(parseInt(ids));
      this.pubUnpStatus.push({'letterId':ids ,'publishUnpublisStatus':checkBoxes[i].getAttribute("pubstatus")})
    }
  
    checkBoxes.forEach( (ele:any) => ele.click());
  $(checkBoxes).prop('checked',true);
}
else{
  
  this.letterIdArray=[];
  this.pubUnpStatus=[]
  $(checkBoxes).prop('checked',false);
//  checkBoxes.forEach( (ele:any) => ele.click());
}
}

gotoFormConfig(formId:any){
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/formbuilder/addForm',encSchemeStr]);
 }
 gotoLetterConfig(formId:any){
  // console.log(formId);
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/formbuilder/templateConfig',encSchemeStr]);
 }

 gotoMessageConfig(formId:any){
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/admin/configuration/messageEngine',encSchemeStr]);
 }

 gotoWorkflowConfig(formId:any){
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/admin/configuration/addWorlflowConfig',encSchemeStr]);
 }
 gotoDocConfig(formId:any){
  
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/admin/configuration/addDocumentConfig',encSchemeStr]);
 }

 gotoRuleEngine(formId:any){
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/admin/configuration/Ruleengine',encSchemeStr]);
 }
 showPreview(formId:any){
  let encSchemeStr = this.encDec.encText(formId.toString());
  this.route.navigate(['/formbuilder/formPreview',encSchemeStr]);
 }



nullidsArray(){
  this.letterIdArray=[];
}

}
