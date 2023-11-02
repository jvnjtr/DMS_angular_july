import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { UploadfilesService } from 'src/app/services/uploadfiles.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { CommonconfigService } from 'src/app/services/commonconfig.service';
import { FormApplyComponent } from 'src/app/formbuilder/form-apply/form-apply.component';
import { WebcommonservicesService } from 'src/app/services/webcommonservices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorComponent } from 'ng2-ckeditor';
import { ViewTemplateConfigComponent } from 'src/app/formbuilder/view-template-config/view-template-config.component';
import { LetterconfigService } from 'src/app/services/letterconfig.service';

@Component({
  selector: 'app-createdoc',
  templateUrl: './createdoc.component.html',
  styleUrls: ['./createdoc.component.scss']
})
export class CreatedocComponent implements OnInit {
  @Input() folderid: any;
  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  txtDocuemntName: any = '';
  rdoDocuemntType: any = "1";
  pdfweriterURL: any;
  excelweriterURL: any;
  token: any;

  createPDFURL: any = environment.createPDFURL;
  createExcelURL: any = environment.createExcelURL;

  date = new Date;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/createdocument.config.json";



  loading: any = false;
  getfiletype: any;
  previewFile: any = false;
  otherDetails: any = false;
  draftId: any = 0;
  fileType: any;
  nfileName: any;
  rdoDocuemntFrom: any = '0';
  documentCreateFrom: any = 0;
  showTemplateDropDown: any = 0;
  selectedEvent: any = '0';
  nameList: any = [];
  loadDynamicForm: any = 0;
  foradmin: any = 'admin';

  @ViewChild(FormApplyComponent, { static: false }) formapplyItems: FormApplyComponent;
  @ViewChild('receiptModal') receiptModal: ElementRef;
  @ViewChild('sendfileModal') sendfileModal: ElementRef;
  @ViewChild('sendfileModalEdit') sendfileModalEdit: ElementRef;
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  ckeConfig: any;
  txtLetterContent:any='';
  processId: any = 0;
  cprocessid: any = 0;
  formName: any;
  onlineServiceId: any = 0;
  currSecId: any = 0;
  formNames: any;


  userPermissionDetails: any;
  intDeleteRight: any = 0;
  intEditRight: any = 0;
  intViewManageRight: any = 0;
  intaddRight: any = 0;
  intallRight: any = 0;
  publishRight: any = 0;
  admin_privilege: any;
  templateList:any=[];
  showFormTemplate=0;
  formTemplateId:any='0';
  letterPreview:any;
  modalTemplateId:any='0';
  letterIdSend:any;
  constructor(private route: Router,
    private httpClient: HttpClient,
    private uploadfiles: UploadfilesService,
    public commonserveice: CommonServicesService,
    public formserveice: CommonconfigService,
    private WebCommonService: WebcommonservicesService,
    public authService: AuthenticationService,
    public encDec: EncrypyDecrpyService,
    private router: ActivatedRoute,
    private vldChkLst: ValidatorchecklistService,
    private LetterconfigService: LetterconfigService,
    private sanitizer: DomSanitizer,private modalService: NgbModal) { }

  ngOnInit(): void {
    
    this.token = sessionStorage.getItem('TOKEN');
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      // console.log(schemeArr);
      this.draftId = schemeArr[0];
      if(this.draftId>0){
        this.rdoDocuemntFrom='2';
        this.chooseDocumentCreationType(2);
      }
      let nfileType = schemeArr[1];
      this.nfileName = schemeArr[2];
      console.log(schemeArr[3]);
      if(schemeArr[3] !=undefined ){
        this.rdoDocuemntFrom='1';
        this.documentCreateFrom=1;
        this.getDynamicFormNames();
        this.processId=schemeArr[3];
        this.onlineServiceId=schemeArr[4];
        let template = schemeArr[6];
        //console.log(template);
        if(template>0){
         // alert(template);
          this.showFormTemplate=template;
          this.getFormTemplateList(this.processId);
          this.formTemplateId=template;
        }
        this.selectedEvent=this.processId;
        this.showFormApply(this.processId);
        
      }else{
        this.getDynamicFormNames();
      }
      if (nfileType == 'pdf') {
        this.rdoDocuemntType = "1";
      } else if (nfileType == 'docx') {
        this.rdoDocuemntType = "1";
      } else if (nfileType == 'xlsx') {
        this.rdoDocuemntType = "2";
      }
    }
    this.loadCreateeditor(this.rdoDocuemntType)
    this.loadconfig();


  }

  chooseDocumentCreationType(creationType: any) {
    //console.log(creationType);
    if (creationType == 2) {
      this.documentCreateFrom = 2;
      this.showTemplateDropDown = 1;
    } else if (creationType == 1) {
      this.documentCreateFrom = 1;
    }
  }
  loadCreateeditor(doctype: any) {
    this.loading = true;
    if (doctype == '1') {
      setTimeout(() => {

        let iframeurl: any = `${this.createPDFURL}?token=${this.token}&draftId=${this.draftId}&fileName=${this.nfileName}&`;
        this.pdfweriterURL = this.sanitizer.bypassSecurityTrustResourceUrl(iframeurl);
        this.loading = false;

      }, 500)

    } else {
      setTimeout(() => {

        let iframeurl: any = `${this.createExcelURL}?token=${this.token}&draftId=${this.draftId}&fileName=${this.nfileName}&`;
        this.pdfweriterURL = this.sanitizer.bypassSecurityTrustResourceUrl(iframeurl);
        this.loading = false;

      }, 500)

    }

  }

  showFormApply(formId: any) {
    //console.log(formId);
    if(formId=='new'){
      this.letterIdSend=0;
      this.open(this.sendfileModal);
      
    }
    else{
      this.loadDynamicForm = 1;
      this.processId = this.selectedEvent;
      this.getForms(this.processId);
      let dynSchmCtrlParms = {
        'intProcessId'       : this.processId,
        'intOnlineServiceId' :this.onlineServiceId,
        'sectionId'          :this.currSecId,
        'intProfileId'       :''
      }
      //console.log(dynSchmCtrlParms);
      this.formapplyItems.loadDynamicCtrls(dynSchmCtrlParms);
    }
      
    
  }


  //\\ ======================== // Config // ======================== //\\
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
        this.tablist = data[0].tabList;
        this.utillist = data[0].utils
        this.messaageslist = data[0].messages;
        this.title = data[0].pagetitle;
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
  }
  //\\ ======================== // Config // ======================== //\\

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

  getForms(processid: any) {
   //console.log(processid);
    let formParams =
    {
      "moduleId": "",
      "processId": processid
    };

    this.formserveice.getFormName(formParams).subscribe((resp: any) => {
      
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.formNames = res.result;
          if (this.formNames.length > 0) {
            //console.log(res);
            this.formName = this.formNames[0].vchProcessName;
          }
        }
        else {
         // console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: this.commonserveice.langReplace(environment.invalidResponse),
        });
      }
      // if(res.status == 200){
      //   this.formNames=res.result;

      //   if(this.formNames.length > 0){


      //     this.formName =this.formNames[0].vchProcessName;
      //   }

      // }
      // else{
      //  console.log(res.messages)
      //  }
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
          this.showFormTemplate=1;
        } else if (res.status == 417) {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        else {
          this.showFormTemplate=1;
          this.loading = false;
          Swal.fire({
            icon: 'error',
            text: 'No Form Template Found',
          });
        }
      } else {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          text: 'Invalid',
        });
      }
    });
  }
   //\\ ======================== // Modal Open // ======================== //\\ 
   open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  closeModal() {
    this.modalService.dismissAll();
  }
  //\\ ======================== // Modal Close // ======================== //\\
  receiptsDetails(){
    this.open(this.receiptModal);
    if(this.formTemplateId > 0){
      //
        let params: any =
        {
          'intLetterConfigId': this.formTemplateId,
          'processId': this.processId,
          'intOnlineServiceId': this.onlineServiceId
        }
        this.loading = true;
    
        this.WebCommonService.getTemplateDetail(params).subscribe(resp => {
          let respData = resp.RESPONSE_DATA;
          let respToken = resp.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res);
            if (res.status == 200) {
              this.loading = false;
              if(res.result[0].letterContent!=''){
                
                  this.letterPreview=this.sanitizer.bypassSecurityTrustHtml(res.result[0].letterContent);
                
               
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
      
      //
      
    }else{
      Swal.fire({
        icon: 'error',
        text: 'Please Select a Template',
      });
    }
    
  }
  generateLetter(){
    this.closeModal()
  }
  resetform(){
    this.closeModal()
  }
  closeGenerateLetterModal(event:any){
    // alert(event);
    this.closeModal();
    this.formTemplateId='0';
    this.setNewParameters(event);
    // console.log(event);
    // this.closeModal()
    // if(event>0){
    //   this.modalTemplateId=event;
    //   let that=this;
    //   this.showFormApply(this.formTemplateId);
    //   setTimeout(function(){
    //     that.formTemplateId=event.toString();
    //   },3000);
    //   console.log(this.formTemplateId);
    // }
  }
  setNewParameters(letterId:any){
    this.getFormTemplateList(this.selectedEvent);
      let that=this;
       setTimeout(function(){
        that.formTemplateId=letterId.toString();
      },3000);
    this.showFormApply(this.formTemplateId);
    
  }
  editThisLetter(templateId:any,formId:any){
    this.closeModal();
    this.open(this.sendfileModalEdit);
  }
  deleteLetter(letterId: any) {

    let letterParams = {
      "itemId": letterId,
      "itemStatus": "1"
    };


    Swal.fire({
      title: this.formserveice.langReplace('Are you sure') + "?",
      text: this.messaageslist.warningtype,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.formserveice.langReplace('Cancel'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.formserveice.langReplace('Yes') + ', ' + this.formserveice.langReplace('delete it') + "!"
    }).then((result: any) => {

      if (result.isConfirmed) {
        this.LetterconfigService.newLetter(letterParams).subscribe((response: any) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());
            if (res.status == 200) {
              Swal.fire(
                'Deleted!',
                this.formserveice.langReplace('Template Deleted Successfully'),
                'success'
              )
              this.closeModal();
              this.getFormTemplateList(this.selectedEvent);
              // this.viewItems(this.limit,this.offset)
            }else if(res.status==417){
              Swal.fire({
                icon: 'error',
                text: this.formserveice.langReplace(environment.invalidRequestMsg),
              });
            } else {
              Swal.fire({
                icon: 'error',
                text: this.formserveice.langReplace(this.messaageslist.errorMsg),
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              text: this.formserveice.langReplace(environment.invalidResponse),
            });
          }

        });
      }
    })
  }
  closeModalafterDelete(event:any){
    this.getFormTemplateList(this.selectedEvent);

  }
}
