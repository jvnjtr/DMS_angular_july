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
import { CommonconfigService } from 'src/app/services/commonconfig.service';

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
templateArraydb:any=[];
nameList: any = [];
fieldList: any = [];
formId:any='0';
formDetail:any;
fieldId:any='0';
departmentId:any='0';
departmentsList:any=[];
rolelist:any=[];
rolelistPermissions:any=[];
roleIdSelected:any=[];
fetchedRole:any=[];
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
  public formserveice: CommonconfigService
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
     this.getDynamicFormNames();
     this.getDepartmentList();
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
      this.commonserveice.viewMetaNew(dataParam).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
  
    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
    if(respToken == verifyToken){
      let res:any = Buffer.from(respData,'base64'); 
      let responseResult= JSON.parse(res)
           
            if (responseResult.status == 200) {
              this.loading=false;
              console.log(responseResult.result);
              this.metalist = responseResult.result;
            
              if(this.metalist.length > 0){
      
              
               this.txtFieldName=this.metalist[0].templateName;
               this.departmentId=JSON.parse(this.metalist[0].metaPermission)[0].deptId;
               this.fetchedRole=JSON.parse(this.metalist[0].metaPermission)[0].roleList;
               this.getRole(this.departmentId);
              //  this.rolelist=JSON.parse(this.metalist[0].metaPermission)[0].roleList
              //  this.txtFieldDesc=this.metalist[0].description;



               let templateArray:any=this.metalist[0].templateData;
               

               for(let i=0;i<templateArray.length;i++){

                let obj: any = {};
                obj['templatelabel'] = templateArray[i].formId;
                obj['templatelabelDisplay'] = templateArray[i].formName;
                obj["labeltypeDisplay"] = templateArray[i].fieldName;
                obj["labeltype"] = templateArray[i].fieldId;
          
               
                this.templateArray.push(obj)
                let nobj: any = {};
                nobj['templatelabel'] = templateArray[i].formId;
                nobj["labeltype"] = templateArray[i].fieldId;
                this.templateArraydb.push(nobj)

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
  let templateArray=this.templateArraydb;
   
 if(!this.vldChkLst.blankCheck(txtFieldName,this.commonserveice.langReplace(this.messaageslist.metaname),'txtFieldName')) {}
  else if (!this.vldChkLst.containsSpecialChars(txtFieldName)) {
    this.commonserveice.swalfire('error',this.commonserveice.langReplace('Special Char Not allowed in Field Name'))

  }

else if(this.templateArraydb.length == 0 ) {
  this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.messaageslist.addtemplate))
}  
else if(!this.vldChkLst.blankCheck(this.departmentId,this.commonserveice.langReplace(this.messaageslist.department),'selectedDepartment')) {} 
  else{
    let permission:any=[];
    let obj:any={};
    obj['deptId']=this.departmentId;
    obj['roleList']=this.roleIdSelected;
    permission.push(obj);
      let metaparams={
        "intMetaId":this.metaid,
        "metaName":txtFieldName.trim(),
        "metaType":templateArray,
        "permissionDetails":permission
      }
      console.log(metaparams);
    
      this.loading=true;
      this.commonserveice.createMetaNew(metaparams).subscribe({
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
                
              text: this.commonserveice.langReplace(responseResult.message),
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
    
    let formVal=$('#addMoreTr #selectedItems option:selected').attr('id');
    
    let fieldVal=$('#addMoreTr #selMetaType option:selected').attr('id');
     if(!this.vldChkLst.blankCheck(this.txtFieldName,this.commonserveice.langReplace(this.messaageslist.metaname),'txtFieldName')) {

     }else{
      let obj: any = {};
      obj['templatelabel'] = formVal;
      obj['templatelabelDisplay'] = formVal;
      obj["labeltype"] = fieldVal;
      obj["labeltypeDisplay"] = fieldVal;
      let nobj: any = {};
      nobj['templatelabel'] = this.formId;
      nobj["labeltype"] = this.fieldId;
      var isPresent = this.templateArray.some(function(el:any){ return (el.templatelabel === obj['templatelabel']&&el.labeltype === obj["labeltype"])});
      if(isPresent=== true) {
        Swal.fire({
          icon: 'error',
          text: this.commonserveice.langReplace('Form Name & Form Field Already Exists'),
        });
      }else{
        this.templateArraydb.push(nobj)
        this.templateArray.push(obj)
        this.formId='0';
        this.fieldId='0';
        this.txtTypeLabel=''; 
        this.selMetaType='0';
      }  
     }
     console.log(this.templateArray);
     console.log(this.templateArraydb);
//  if(!this.vldChkLst.blankCheck(this.txtTypeLabel,this.commonserveice.langReplace(this.messaageslist.templatelabel),'txtTypeLabel')) {}
//  else if(!this.vldChkLst.selectDropdown(this.selMetaType,this.commonserveice.langReplace(this.messaageslist.templatelabelType),'selMetaType') ) {}
//  else{

//       let obj: any = {};
//       obj['templatelabel'] = this.txtTypeLabel.trim();
//       obj["labeltype"] = this.selMetaType;

     
//       this.templateArray.push(obj)
     
//       this.txtTypeLabel=''; 
//       this.selMetaType='0';

//     }
         
  }
   //\\ ======================== // Add Meta Value  // ======================== //\\
    //\\ ======================== // Remove Meta  // ======================== //\\
  removeSectionval(i:any){
      this.templateArray.splice(i,1);
      this.templateArraydb.splice(i,1);
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
  getDynamicFormNames() {
    let formParams = {
      // 'fileId':1
    };
    this.formserveice.getallFormName(formParams).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          //console.log(res.result);
          let result = res.result;
          for (let i = 0; i < result.length; i++) {
            let obj: any = {};
            obj['vchProcessName'] = result[i].vchProcessName;
            obj['intProcessId'] = result[i].intProcessId;
            //console.log(obj)
            this.nameList.push(obj);
          }
        }
        else {
          console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: this.commonserveice.langReplace(environment.invalidResponse),
        });
      }


    });



  }
  getFormFieldList(formId:any){
    this.fieldList=[];
    if(formId>0){
      let formParams = {
        'processId':formId
      };
      this.formserveice.getFormFieldList(formParams).subscribe((resp: any) => {
        let respData = resp.RESPONSE_DATA;
        let respToken = resp.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          //console.log(res);
          if (res.status == 200) {
            //console.log(res.result);
            this.formDetail=JSON.parse(res.result[0].formDetails);
           
            for (let i = 0; i < this.formDetail.length; i++) {
              let obj: any = {};
              obj['ctrlLabel'] = this.formDetail[i].ctrlLabel;
              obj['ctrlId'] = this.formDetail[i].ctrlId;
              this.fieldList.push(obj);
            }
          }
          else {
            console.log(res.messages)
          }
        } else {
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.invalidResponse),
          });
        }
  
  
      });
    }
  }
  getDepartmentList() {
    let dataParam = {
      "deptId": "",
    };
    this.commonserveice.loadDepartment(dataParam).subscribe({
      next: (response) => {   let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res: any = { 'status': 0, 'result': {} };
  
          res = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
      
      
      
            if (responseResult.status == '200') {
              this.departmentsList = responseResult.result;
      
            
      
           
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
          this.authService.directlogout();
        }},
      error: (msg) => {
           this.authService.directlogout();
     }
   })


    
  }
  getRole(deptId:any) {
   
    
    this.rolelist = [];
    let dataParam = {
      "roleId": '0',
      "deptId": deptId
    };

    this.commonserveice.getRoles(dataParam).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if(respToken == verifyToken){
          let res: any = { 'status': 0, 'result': {} };
  
          res = Buffer.from(respData,'base64'); 
          let responseResult= JSON.parse(res)
      
          console.log(this.fetchedRole);
          if (responseResult.status == 200) {
            let result = responseResult.result;
            for (let i = 0; i < result.length; i++) {
              let obj: any = {};
              obj['roleName'] = result[i].roleName;
              obj['roleId'] = result[i].roleId;
              if(this.fetchedRole.length > 0) {
                let a =this.fetchedRole.indexOf(result[i].roleId);
                if(a >= 0) {
                  obj['checked'] = true; 
                }else{
                  obj['checked'] = false;
                }
              }else{
                obj['checked'] = false;
              }
              
    
             
              this.rolelist.push(obj);
              // {label: 'Archive', selected: false},
            }
           
         //console.log(this.rolelist)
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
  rolechange(e:any,i:any,roleId:any){
    if(e.target.checked == true){
     
      this.roleIdSelected.push(roleId);
    }
    else{
      const index = this.roleIdSelected.indexOf(roleId);
      if(index > -1){
        this.roleIdSelected.splice(index,1);
      }
    }

   
  }
}
