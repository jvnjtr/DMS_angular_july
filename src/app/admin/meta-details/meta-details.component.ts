import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../../services/common-services.service';
import Swal from 'sweetalert2';
import { EncrypyDecrpyService } from '../../services/encrypy-decrpy.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidatorchecklistService } from '../../services/validatorchecklist.service';
import {Buffer} from 'buffer';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meta-details',
  templateUrl: './meta-details.component.html',
  styleUrls: ['./meta-details.component.scss']
})
export class MetaDetailsComponent implements OnInit {
//\\ ======================== // Variables // ======================== //\\
  title:any;
  tablist:any;
  utillist:any;
  messaageslist:any;
  jsonurl="assets/js/_configs/addMeta.config.json";
  letterID:any="";
  files_dropped: File[] = [];
  loading:any=false; 
  txtFieldName:any='';
  txtFieldDesc:any='';
  selMetaType:any='0';
  txtTypeLabel:any='';
  metaid:any='';
  metalist:any=[];
  langKey: any = 'en';

templateArray:any=[];

//\\ ======================== // Variables // ======================== //\\

  constructor(
    private route: Router,
    private router:ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice:CommonServicesService,
    private encDec:EncrypyDecrpyService,
    public authService:AuthenticationService,
  public vldChkLst:ValidatorchecklistService,
  private _location:Location,
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if(encSchemeId != ""){
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr:any = schemeStr.split(':');
      this.metaid = schemeArr[0];
     
     //console.log(this.letterID+'-----'+this.txtFormId+'------'+this.selFormName)
      if(this.metaid != '' || this.metaid != 0){
     this.viewMetaLit(this.metaid);
    
      }
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
           if(this.metaid )
      {
        this.title =  "Edit Meta Configuration";
      }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })


   }
 //\\ ======================== // Config // ======================== //\\
 
 


//\\ ======================== // Reset Form // ======================== //\\
formReset(){
  this.txtFieldName='';
  this.txtFieldDesc='';
  this.selMetaType='0';
}
//\\ ======================== // Reset Form // ======================== //\\
//\\ ======================== // Get meta list // ======================== //\\
   viewMetaLit(metaid:any){
     let dataParam = {
      "intMetaId": metaid
      };
      this.loading=true;
      this.commonserveice.viewMeta(dataParam).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
  
    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult= JSON.parse(res)
           
            if (responseResult.status == 200) {
              this.loading=false;
      
              this.metalist = responseResult.result;
            
              if(this.metalist.length > 0){
      
              
               this.txtFieldName=this.metalist[0].templateName;
               this.txtFieldDesc=this.metalist[0].description;



               let templateArray:any=this.metalist[0].templateData;
               

               for(let i=0;i<templateArray.length;i++){

                let obj: any = {};
                obj['templatelabel'] = templateArray[i].labelName;
                obj["labeltype"] = templateArray[i].metaType;
          
               
                this.templateArray.push(obj)


               }

               

               
              }
        
              
            }
      
            else if(responseResult.status==501){
              
              this.authService.directlogout();
            }
            else{
              this.loading=false;
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
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
//\\ ======================== // Get Meta list // ======================== //\\


//\\ ======================== // Create Meta // ======================== //\\
createMeta(){
  let txtFieldName=this.txtFieldName;
  let txtFieldDesc=this.txtFieldDesc;
  let selMetaType=this.selMetaType;

 if(!this.vldChkLst.blankCheck(txtFieldName,this.commonserveice.langReplace(this.messaageslist.metaname),'txtFieldName')) {}
  else if (!this.vldChkLst.containsSpecialChars(txtFieldName)) {
    this.commonserveice.swalfire('error',this.commonserveice.langReplace('Special Char Not allowed in Field Name'))

  }


else if(!this.vldChkLst.blankCheck(txtFieldDesc,this.commonserveice.langReplace(this.messaageslist.metadesc),'txtFieldDesc')) {}

else if(this.templateArray.length == 0 ) {
  this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.messaageslist.addtemplate))
}  
  else{
      let metaparams={
        "intMetaId":this.metaid,
        "metaName":txtFieldName.trim(),
        "description":txtFieldDesc.trim(),
        "metaType":this.templateArray
      }
      this.loading=true;
      this.commonserveice.createMeta(metaparams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
    
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res:any = Buffer.from(respData,'base64'); 
          let responseResult = JSON.parse(res)
        
          if (responseResult.status == 200) {
            this.loading=false;
             Swal.fire({
                
              text: this.commonserveice.langReplace(this.messaageslist.successMsg),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              
              this.formReset();
              this.route.navigate(['/admin/viewMeta'])
            })
  
          }
  
          else if(responseResult.status == 202){
  
            this.loading=false;
           
            Swal.fire({
                
              text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              
              this.formReset();
              this.route.navigate(['/admin/viewMeta'])
            })
  
           }
           else if(responseResult.status==501){
          
            this.authService.directlogout();
          }
           else if(responseResult.status == 400){
  
            this.loading=false;
            this.commonserveice.swalfire('error',responseResult.message.metaName[0])
            }
           else{
            this.loading=false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))
          
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


}
//\\ ======================== // Create Meta // ======================== //\\

  //\\ ======================== // Add Meta Value  // ======================== //\\
  addMetaVals(){
 if(!this.vldChkLst.blankCheck(this.txtTypeLabel,this.commonserveice.langReplace(this.messaageslist.templatelabel),'txtTypeLabel')) {}
 else if(!this.vldChkLst.selectDropdown(this.selMetaType,this.commonserveice.langReplace(this.messaageslist.templatelabelType),'selMetaType') ) {}
 else{

      let obj: any = {};
      obj['templatelabel'] = this.txtTypeLabel.trim();
      obj["labeltype"] = this.selMetaType;

     
      this.templateArray.push(obj)
     
      this.txtTypeLabel=''; 
      this.selMetaType='0';

    }
  }
   //\\ ======================== // Add Meta Value  // ======================== //\\
    //\\ ======================== // Remove Meta  // ======================== //\\
  removeSectionval(i:any){
      this.templateArray.splice(i,1);
 }
  //\\ ======================== // Remove Meta  // ======================== //\\

  onReset() {

   this.txtFieldName='';
   this.txtFieldDesc='';
   this.templateArray=[];
   this.txtTypeLabel='';
   this.selMetaType='0'

  }

  onCancel() {

    this._location.back();

  }
}
