import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { PreviewFormApplyComponent } from '../preview-form-apply/preview-form-apply.component';
@Component({
  selector: 'app-dynamicformspreview',
  templateUrl: './dynamicformspreview.component.html',
  styleUrls: ['./dynamicformspreview.component.scss']
})
export class DynamicformspreviewComponent implements OnInit {
  tablist:any;
  utillist:any;
  
  messaageslist:any;
  onlineServiceId:any;
  processId:any;
  currSecId:any;
  foradmin:any='admin';
  jsonurl="assets/js/_configs/dynamicformPreview.config.json";
  formName:any;
  formTemplateId:any;
  constructor(
    private router : ActivatedRoute,
    public vldChkLst : ValidatorchecklistService ,
     public encDec : EncrypyDecrpyService,
     private route: Router,
     private httpClient: HttpClient,
    
  ) { }

  ngOnInit(): void {

    let schemeArr:any = [];
   
    this.router.paramMap.subscribe((params: ParamMap) => {
     // this.processId = +params.get('id');
      let encSchemeId = params.get('id')
  //  console.log(encSchemeId)
  if(encSchemeId != ""){
    let schemeStr = this.encDec.decText(encSchemeId);
     schemeArr = schemeStr.split(':');
     this.processId         = schemeArr[0];
     this.onlineServiceId   = schemeArr[1];
     this.currSecId         = schemeArr[2];
     this.formTemplateId    = schemeArr[3];
     console.log(this.formTemplateId);
  }
      //this.processId =this.childprocessId;

      // this.getForms(this.processId)
      // this.dyprocessWiseView(this.processId)
     
     });
  
  
    this.loadconfig();
  }
  loadconfig(){
    this.httpClient.get<any>(this.jsonurl).subscribe((data:any)=>
     {
      this.tablist=data[0].tabList;
      this.utillist=data[0].utils
      this.messaageslist=data[0].messages; 
      // if(! this.formID )
      // {
      // this.title = this.multilingual(data[0].pagetitle);
      // }
      // else{
      //   this.title = "Edit Manage Form";
      // }
      
     })
   }
   multilingual(test:any)
   {
   return test;
   }
}
