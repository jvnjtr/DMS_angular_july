import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';
import { LetterconfigService } from 'src/app/services/letterconfig.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CommonconfigService } from 'src/app/services/commonconfig.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';


import * as CryptoJS from 'crypto-js';
// import { Alert } from 'src/app/_models/alert';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { CKEditorComponent } from 'ng2-ckeditor';
@Component({
  selector: 'app-template-config',
  templateUrl: './template-config.component.html',
  styleUrls: ['./template-config.component.scss']
})
export class TemplateConfigComponent implements OnInit {

  // @ViewChild(CKEditorComponent, { static: false }) CkeditornewComponent: CKEditorComponent;
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  @Output('getFormTemplateList') getFormTemplateList: EventEmitter<any> = new EventEmitter();
  @Output('closeGenerateLetterModal') closeGenerateLetterModal: EventEmitter<any> = new EventEmitter();
  @Input() templateProcessId:any;
  @Input() letterIdSend:any=0;
  ckeConfig: any;
  siteUrl = environment.siteURL;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/addLetter.config.json";


  respSts: any;
  moduleNames: any;
  name = 'Angular ';
  // editor: any = ClassicEditor;
  data: any = `<p>Hello, world!</p>`;
  isSelected: boolean = false;

  selModuleName: any = 0;
  selFormName: any = 0;
  selLetterType: any = 0;
  selSignType: any = 0;
  txtLetterName: any = null;
  txtLetterContent: any = null;
  txtEffeciveFrom: any = new Date();
  txtEffeciveTo: any = new Date();

  signStatus: any = 0;
  txtFormId: any = null;
  txtEfminDate: any = '';
  txtEtminDate: any = '';
  pipe = new DatePipe('en-US');
  getwaytypes: any;
  sessiontoken: any;
  userId: any;
  formNames: any;
  letterID: any = "";
  letterlist: any = null;
  letterParams: any;
  keysArray: any;
  langKey: any = 'en';
  intViewManageRight:any=1;
  intaddRight:any=1;
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    private LetterconfigService: LetterconfigService,
    public commonService: CommonconfigService,
    public vldChkLst: ValidatorchecklistService,
    private encDec: EncrypyDecrpyService,
    private readonly calendar: NgbCalendar, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    // alert(this.templateProcessId);
    this.loadconfig();
    // this.addChangeEventForLabel();
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    this.userId = SeetionParsed.USER_ID;
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
   
      this.letterID = schemeArr[0];
      //console.log(this.letterID);
      this.txtFormId = schemeArr[1];
      this.selFormName = schemeArr[2];
      
      if (this.letterID >  0) {
    
        this.getLetterinfo();
        // this.getGetwaytypes();
        this.getFormKeys();
      }else {
        this.txtFormId=this.templateProcessId;
        if(this.letterIdSend>0){
          this.getLetterinfo();
        }
        
        this.getFormKeys();

      }
    }
  }

  loadconfig() {
    console.log(this.letterID);
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      if (this.letterID == "0" || this.letterID == "") {
        this.title = this.multilingual(data[0].pagetitle);
      }
      else {
        this.title = "";
      }
    })
  }



  multilingual(test: any) {
    return test;
  };


  getGetwaytypes() {
    // getGetwayType
    this.commonService.getGetwayType().subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res:any = Buffer.from(respData,'base64'); 
        res = JSON.parse(res.toString());
        if (res.status == "200") {
          this.getwaytypes = res.result;
        }
        else {
          console.log(res.messages)
        }
      }else{
        Swal.fire({
          icon: 'error',
          text: this.commonService.langReplace(environment.invalidResponse),
        });
      }
      
    });
  }


  generateLetter() {

   // console.log(this.txtLetterContent);
    let FormName = this.txtFormId;
    let LetterName = this.txtLetterName;
    let LetterContent = this.txtLetterContent;
    let EffeciveFrom = this.txtEffeciveFrom;
    let EffeciveTo = this.txtEffeciveTo;
    let signstatus = this.signStatus;
    let signtype = this.selSignType;


    if (FormName == 0 || typeof (FormName) == undefined || FormName == null) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.fromname),


      });
    }

    else if (LetterName == ' ' || typeof (LetterName) == undefined || LetterName == null) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.lettername),

      }).then(function(){

        if(LetterName!='')

        {
          //alert("biswal");

          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById('LetterName');
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);

        }

      });
    }
    else if (EffeciveFrom == ' ' || typeof (EffeciveFrom) == undefined || EffeciveFrom == null) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.effectivefrom),

      });
    }
    else if (EffeciveTo == ' ' || typeof (EffeciveTo) == undefined || EffeciveTo == null) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.effectiveto),

      });
    }
    else if (EffeciveTo < EffeciveFrom) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.effectivefromto),

      });
    }
    else if (signstatus == 1 && signtype == 0) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.signtype),

      });
    }
    else if (LetterContent == ' ' || typeof (LetterContent) == undefined || LetterContent == null) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace(this.messaageslist.lettercontent),

      }).then(function () {
        if (LetterContent != null) {
          setTimeout(() => {
            const element = <HTMLInputElement>document.getElementById('LetterContent');
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 500);
        }
      });
    }
    else {
      let letterParams = {
        "itemId": this.letterIdSend,
        "formId": FormName,
        "effectiveFrom": EffeciveFrom,
        "effectiveTo": EffeciveTo,
        "lettername": LetterName,
        "letterContent": LetterContent,
        "intCreatedBy": this.userId,
        "intUpdatedBy": this.userId,
        "SignTypeStatus": signstatus,
        "SignType": signtype,
        "itemStatus": ""
      };
      this.LetterconfigService.newLetter(letterParams).subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res:any = Buffer.from(respData,'base64'); 
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            Swal.fire({
              icon: 'success',
              text: this.commonService.langReplace(this.messaageslist.successMsg),
            });
            
            this.closeGenerateLetterModal.emit(res.result);
            // this.getFormTemplateList.emit();
            // this.resetform();
            // this.route.navigate(['/formbuilder/viewTemplateConfig'])
          }else if (res == 202) {
            Swal.fire({
              icon: 'success',
              text: this.commonService.langReplace(this.messaageslist.updatesuccessMsg),
            });
            this.closeGenerateLetterModal.emit(this.letterIdSend);
            this.getFormTemplateList.emit();
            //this.route.navigate(['/formbuilder/viewTemplateConfig'])
            this.resetform();
          }else if(res.status==417){
            Swal.fire({
              icon: 'error',
              text: this.commonService.langReplace(environment.invalidRequestMsg),
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: this.commonService.langReplace(this.messaageslist.errorMsg),
  
            });
          }
        }else{
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidResponse),
          });
        }
      });
    }
  }

  resetform() {

    this.selFormName = "0";
    this.txtLetterName = null;
    this.txtLetterContent = null;
    this.txtEffeciveFrom = null;
    this.txtEffeciveTo = null;
    this.signStatus = 0;
    this.selSignType = 0;
  }

  updateCancel() {

    this.route.navigate(['/formbuilder/viewTemplateConfig'])
  }


  getLetterinfo() {


    let letterParams = {
      "formId": "",
      "LetterName": "",
      "intLetterConfigId": this.letterIdSend
    };
    this.LetterconfigService.viewLetters(letterParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res:any = Buffer.from(respData,'base64'); 
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.letterlist = res.result;
          if (this.letterlist.length > 0) {
            this.txtFormId = this.letterlist[0].intformId;
            this.selFormName = this.letterlist[0].vchFormName;
            this.txtLetterName = this.letterlist[0].vchLetterName;
            this.txtLetterContent = this.letterlist[0].txtLetterContent;
            this.txtEffeciveFrom = new Date(this.letterlist[0].vchEffectiveFrom);
            this.signStatus = this.letterlist[0].tinSignTypeSts
            this.selSignType = this.letterlist[0].intSignType;
            this.txtEffeciveTo = new Date(this.letterlist[0].vchEffectiveTo);
          }
        }else if(res.status == 417){
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidRequestMsg),
          });
        }
      }else{
        Swal.fire({
          icon: 'error',
          text: this.commonService.langReplace(environment.invalidResponse),
        });
      }
    });
  }
  //form key and description section----------------------------

  getFormKeys() {
    let keyParams = {
      "itemId": this.txtFormId
    };
    this.commonService.getConfigurationKeys(keyParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res:any = Buffer.from(respData,'base64'); 
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          console.log(res.result[0].formName);
          this.selFormName=res.result[0].formName;
          this.keysArray = res.result;
        }else if(res.status == 417){
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidRequestMsg),
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(this.messaageslist.errorMsg),
          });
        }
      }else{
        Swal.fire({
          icon: 'error',
          text: this.commonService.langReplace(environment.invalidResponse),
        });
      }
    });
  }
  addChangeEventForLabel() {
    let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
    let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    setTimeout(() => {
      this.langKey = sessionUserLang;
      let labelChangeEle: any = document.getElementById('languageListH');
      labelChangeEle.addEventListener('change', () => {
        this.langKey = labelChangeEle.value;
      });
    }, 1000);

  }

}
