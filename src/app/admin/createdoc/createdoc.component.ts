import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  constructor(private route: Router,
    private httpClient: HttpClient,
    private uploadfiles: UploadfilesService,
    public commonserveice: CommonServicesService,
    public formserveice: CommonconfigService,
    public authService: AuthenticationService,
    public encDec: EncrypyDecrpyService,
    private router: ActivatedRoute,
    private vldChkLst: ValidatorchecklistService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.token = sessionStorage.getItem('TOKEN');
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      console.log(schemeArr);
      this.draftId = schemeArr[0];
      //console.log(this.draftId);
      let nfileType = schemeArr[1];
      this.nfileName = schemeArr[2];
      console.log(schemeArr[3]);
      if(schemeArr[3] !=undefined ){
        console.log('hello');
        this.rdoDocuemntFrom='1';
        this.documentCreateFrom=1;
        this.getDynamicFormNames();
        this.processId=schemeArr[3];
        this.onlineServiceId=schemeArr[4];
        this.selectedEvent=this.processId;
        this.showFormApply(this.processId);
      }else{
        this.getDynamicFormNames();
      }
      //console.log(nfileType);
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
   
      this.loadDynamicForm = 1;
      this.processId = formId;
      // console.log(this.selectedEvent);
      // console.log(formId);
      // console.log(this.processId);
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
          console.log(res.result);
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
            console.log(res);
            this.formName = this.formNames[0].vchProcessName;
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
}
