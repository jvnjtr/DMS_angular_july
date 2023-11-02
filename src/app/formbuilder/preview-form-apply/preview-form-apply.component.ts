import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { WebcommonservicesService } from 'src/app/services/webcommonservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-preview-form-apply',
  templateUrl: './preview-form-apply.component.html',
  styleUrls: ['./preview-form-apply.component.scss']
})
export class PreviewFormApplyComponent implements OnInit {
  @ViewChildren('previewFormDetailForPdf') ces: QueryList<ElementRef>;
  public loading = false;
  dynamicpreviewDetails: any;
  formName: any;
  dynamicCtrlPreviewKeys: any = {};
  sectionwise = true;
  gridtype: any;
  intProfileId: any = 0;
  addMoreTabularData: any[] = [];
  templateList:any=[];
  // previewFormDetailForPdf:any;
  formTemplateId:any='0';
  generatedLetter:any;
  showTemplateDataDiv:any=false;
  mappedMeta:any=[];
  @Input() fromadmin: any;

  @Input() processId: any = 0;
  @Input() onlineServiceId: any = 0;
  @Input() btnShow: any = 0;
  @Input() historyId: any = 0;
  @Input() nextbtnval: any = 0;
  @Input() formTemplateIdSend: any = 0;

  constructor(private router: ActivatedRoute, private WebCommonService: WebcommonservicesService, public encDec: EncrypyDecrpyService, private route: Router, private elRef: ElementRef,public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.formTemplateIdSend);
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    let schemeArr: any = [];
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      schemeArr = schemeStr.split(':');
    }
    console.log(schemeArr);
    this.processId = schemeArr[0];
    this.onlineServiceId = schemeArr[1];
    this.btnShow = schemeArr[2];
    this.historyId = (schemeArr[4] != '' && schemeArr[4] != undefined) ? schemeArr[4] : 0;

    if (this.historyId == 0) {
      let ctrlParms = {
        'intProcessId': this.processId,
        'intOnlineServiceId': this.onlineServiceId,
        'intProfileId': this.intProfileId
      }
      this.getTemplateDetail(this.formTemplateIdSend)
      // this.getFormTemplateList(this.processId);
      this.previewDynamicForm(ctrlParms);
    }
    else {
      let ctrlParms = {
        'intProcessId': this.processId,
        'intOnlineServiceId': this.onlineServiceId,
        'intProfileId': this.intProfileId,
        'intHistoryId': this.historyId
      }

      this.previewHistoryDynamicForm(ctrlParms);
    }

  }

  previewDynamicForm(params: any) {
    this.loading = true;

    this.WebCommonService.previewDynamicForm(params).subscribe(resp => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        //console.log(res);
        if (res.status == 200) {
          this.loading = false;

          var serviceResult: any = res.result
          //console.log(serviceResult)
          this.gridtype = serviceResult.tinGridType;
          this.dynamicpreviewDetails = serviceResult.arrSecFormDetails;
          //console.log(this.dynamicpreviewDetails.sec_0.arrFormWiseValue);
          let formValue=this.dynamicpreviewDetails.sec_0.arrFormWiseValue;
          for(var i=0;i<formValue.length;i++){
            if(formValue[i].metaTemplateFieldId>0){
              let obj: any = {};
              obj['metaId'] = formValue[i].metaTemplateFieldId;
              obj['value'] = formValue[i].ctrlValue;
              this.mappedMeta.push(obj);
            }
          }
          // console.log(this.mappedMeta);
          this.formName = serviceResult.formName;
          this.dynamicCtrlPreviewKeys = Object.keys(serviceResult.arrSecFormDetails).sort();
          if (this.dynamicCtrlPreviewKeys[0] == 'sec_0') {
            this.sectionwise = false;
          }
        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        else {
          console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Invalid',
        });
      }
      // if (res.status == 200) {
      //   this.loading = false;

      //   var serviceResult: any = res.result
      //   this.gridtype = serviceResult.tinGridType;
      //   this.dynamicpreviewDetails = serviceResult.arrSecFormDetails;
      //   this.formName = serviceResult.formName;
      //   this.dynamicCtrlPreviewKeys = Object.keys(serviceResult.arrSecFormDetails).sort();
      //   if (this.dynamicCtrlPreviewKeys[0] == 'sec_0') {
      //     this.sectionwise = false;
      //   }
      // }
    });
  }

  previewHistoryDynamicForm(parms: any) {
    this.loading = true;

    this.WebCommonService.previewDynamicFormOfHistory(parms).subscribe(res => {

      if (res.status == 200) {
        this.loading = false;

        var serviceResult: any = res.result
        this.gridtype = serviceResult.tinGridType;
        this.dynamicpreviewDetails = serviceResult.arrSecFormDetails;
        this.formName = serviceResult.formName;
        this.dynamicCtrlPreviewKeys = Object.keys(serviceResult.arrSecFormDetails).sort();
        if (this.dynamicCtrlPreviewKeys[0] == 'sec_0') {
          this.sectionwise = false;
        }
      }
    });
  }
  applyForProcess() {
    // console.log(document.getElementById('previewFormDetailForPdf')?.innerHTML);
    // console.log(this.elRef.nativeElement.innerHTML);
    if(this.formTemplateIdSend=='0'){
      Swal.fire({
        icon: 'error',
        text: 'Please Select A Form Template',
      });
    }else{
      let params: any =
      {
        'intProcessId': this.processId,
        'intOnlineServiceId': this.onlineServiceId,
        'intProfileId': this.intProfileId
      }
      this.loading = true;
  
      this.WebCommonService.applyForProcess(params).subscribe(resp => {
        let respData = resp.RESPONSE_DATA;
        let respToken = resp.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          //console.log(res);
          if (res.status == 200) {
            this.loading = false;
            let text = '';
            if (this.processId == '438') {
              text = "Your query has been submitted successfully.";
            }
            else {
              text = "Your Form Has Been Submitted Successfully";
            }
  
            Swal.fire({
              icon: 'success',
              text: text,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {
              // let formParms = this.processId + ':' + 0 + ':' + 0;
              // let encSchemeStr = this.encDec.encText(formParms.toString());
  
              // this.route.navigate(['/admin/configuration/dynamicForms', encSchemeStr]);
              // this.route.navigate(['/website/servicelisting']); 
              this.formToPdfgeneration(document.getElementById('mydynamicform')?.innerHTML);
              // this.formToPdfgeneration(this.elRef.nativeElement.innerHTML);
            });
          } else if (res.status == 417) {
            Swal.fire({
              icon: 'error',
              text: 'Invalid',
            });
          }
          else {
            console.log(res.messages)
          }
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        //console.log(res.result);
        // if (res.status == 200) {
        //   this.loading = false;
        //   let text = '';
        //   if (this.processId == '438') {
        //     text = "Your query has been submitted successfully.";
        //   }
        //   else {
        //     text = "Your query has been submitted successfully.Your ticket number is " + res.result;
        //   }
  
        //   Swal.fire({
        //     icon: 'success',
        //     text: text,
        //     confirmButtonColor: '#3085d6',
        //     confirmButtonText: 'Ok'
        //   }).then((result) => {
        //     let formParms = this.processId + ':' + 0 + ':' + 0;
        //     let encSchemeStr = this.encDec.encText(formParms.toString());
  
        //     this.route.navigate(['/admin/configuration/dynamicForms', encSchemeStr]);
        //     // this.route.navigate(['/website/servicelisting']); 
        //   });
        // }
      });
    }
    
  }

  gotToPrev() {

    let formParms = this.processId + ':' + this.onlineServiceId + ':' + 0;
    let encSchemeStr = this.encDec.encText(formParms.toString());

    this.route.navigate(['/website/formapply', encSchemeStr]);

  }

  shortTabularWiseData(addMoreTabularDetails: any, keys: any) {
    if (this.addMoreTabularData[keys] == undefined) {
      this.addMoreTabularData[keys] = Object.keys(addMoreTabularDetails).sort();
    }
  }

  gotToPrevAdmin() {
    let formParms =':' +':' + ':' +this.processId + ':' + this.onlineServiceId + ':' + 0 +':'+this.formTemplateIdSend;
    let encSchemeStr = this.encDec.encText(formParms.toString());

    this.route.navigate(['/admin/createdoc', encSchemeStr]);
  }
  formToPdfgeneration(html:any){
    
    let params: any =
    {
      // 'html': html,
      'html': this.generatedLetter,
      'processId': this.processId,
      'mappedMeta':this.mappedMeta
    }
    this.loading = true;

    this.WebCommonService.formToPdfgeneration(params).subscribe(resp => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        //console.log(res);
        if (res.status == 200) {
          this.loading = false;
          //console.log(res.result);
          let filePath=res.result.filePath;
          let fileName=res.result.fileName;
          let fileType=res.result.fileType;
          let processId=res.result.processId;
          let onlineServiceId=this.onlineServiceId
          // let mappedMeta=res.result.mappedMeta;
          // console.log(JSON.parse(mappedMeta));
          let formParms = fileName + '*' + fileName + '*' + fileType + '*' + processId + '*'+ onlineServiceId + '*' + JSON.stringify(this.mappedMeta);
          // console.log(formParms.toString())
          let encSchemeStr = this.encDec.encText(formParms.toString());
          //
          // let _key = CryptoJS.enc.Utf8.parse('22CSMTOOL2022');
          // let _iv = CryptoJS.enc.Utf8.parse('26102021@qwI');
          // let encrypted = CryptoJS.AES.encrypt(
          //   JSON.stringify(formParms), _key, {
          //     keySize: 16,
          //     iv: _iv,
          //     mode: CryptoJS.mode.ECB,
          //     padding: CryptoJS.pad.Pkcs7
          //   });
          // let encryptedFinal = encrypted.toString();
          // console.log(encryptedFinal);
          
          // this.route.navigate(['/createdocument', encSchemeStr]);
          this.route.navigate(['/admin/dynamicformToPdf', encSchemeStr]);
          
        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        else {
          //console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Invalid',
        });
      }
    });
  }
  getFormTemplateList(processId:any){
    let params: any =
    {
      'processId': processId,
    }
    this.loading = true;

    this.WebCommonService.getFormWiseTemplateList(params).subscribe(resp => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        //console.log(res);
        if (res.status == 200) {
          this.loading = false;
          this.templateList=res.result;
          
        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        else {
          //console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Invalid',
        });
      }
    });
  }
  getTemplateDetail(templateId:any){
    let params: any =
    {
      'intLetterConfigId': templateId,
      'processId': this.processId,
      'intOnlineServiceId': this.onlineServiceId
    }
    this.loading = true;

    this.WebCommonService.getLetterData(params).subscribe(resp => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        //console.log(res);
        if (res.status == 200) {
          this.loading = false;
          
          if(res.result.txtLetterContent!=''){
            this.showTemplateDataDiv=true;
            this.generatedLetter=this.sanitizer.bypassSecurityTrustHtml(res.result.txtLetterContent);
            // document.getElementById('templateData')?.innerHTML(this.generatedLetter);
          }
        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        else {
          //console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Invalid',
        });
      }
    });
  }
}
