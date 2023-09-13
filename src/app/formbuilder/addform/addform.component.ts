import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropComponent } from '../drop/drop.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ManageformconfigService } from 'src/app/services/manageformconfig.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { CommonconfigService } from 'src/app/services/commonconfig.service';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.scss']
})
export class AddformComponent implements OnInit {
  public loading = false;
  submitted = false;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/addForm.config.json";
  txtModuleId: any = null;
  txtFormId: any = null;
  sectionlistList: any;
  sectionitems: any;
  formNames: any = null;
  currentDateTime: any;
  txtFormName: any = null;
  txtModuleName: any = null;
  cttypeid: any;
  arrsecColumnDetails: any[] = [];
  tableExistsCheck: any = 2;
  existingTableName: any = null;
  langKey: any = 'en';
  origin = [
    { ctrlTypeId: 1, controlname: "Label", controltype: "label", ctrlicon: "icon-text-width-solid", ctrlclass: "UiLabelField" },
    { ctrlTypeId: 2, controlname: "TextBox", controltype: "text", ctrlicon: "icon-keyboard", ctrlclass: "UiTextField" },
    { ctrlTypeId: 3, controlname: "Dropdown", controltype: "select", ctrlicon: "icon-list-ul-solid", ctrlclass: "UiSelectField" },
    { ctrlTypeId: 4, controlname: "TextArea", controltype: "textarea", ctrlicon: "icon-tablet-solid", ctrlclass: "UiTextareaField" },
    { ctrlTypeId: 5, controlname: "Checkbox", controltype: "checkbox", ctrlicon: "icon-square", ctrlclass: "UiCheckField" },
    { ctrlTypeId: 6, controlname: "Radio", controltype: "radio", ctrlicon: "icon-circle", ctrlclass: "UiRadioField" },
    { ctrlTypeId: 7, controlname: "File Upload", controltype: "file", ctrlicon: "icon-upload-solid", ctrlclass: "UiFileField" },
    { ctrlTypeId: 8, controlname: "Heading", controltype: "Heading", ctrlicon: "icon-heading-solid", ctrlclass: "UiHeadingField" },
    { ctrlTypeId: 9, controlname: "Link Button", controltype: "button", ctrlicon: "icon-closed-captioning", ctrlclass: "UiBtnField" },
    { ctrlTypeId: 11, controlname: "Hidden", controltype: "hidden", ctrlicon: "icon-keyboard", ctrlclass: "UiHiddenField" },
    { ctrlTypeId: 12, controlname: "Paragraph", controltype: "paragraph", ctrlicon: "icon-paragraph-solid", ctrlclass: "UiParagraphField" },
    { ctrlTypeId: 10, controlname: "Addmore", controltype: "addmore", ctrlicon: "icon-plus-solid", ctrlclass: "UiAddmoreField" },
  ];

  @ViewChild(DropComponent, { static: false }) dropItems: DropComponent;

  dynamicForm: FormGroup;
  destination: any = [];
  formArray: any = [];
  itemsArray: any = [];
  isShown: any = false;
  sessiontoken: any;
  userId: any;
  binddatatypestatic: any = "static";
  binddatatypedynamic: any = "dynamic";
  ctrldependno: any = 'no';
  setbindval: any = " ";
  setbinddepet = 2;
  getsectionId: any;
  viectrtypeid: any = [];
  prevbtnDisabled: any = true;
  nextbtnDisabled: any = false;
  i: any = 0;
  formPreviewArray: any = [];
  sectionCtrlDtls: any = [];
  dependantlist: any = [];
  dependantoptions: any = [];
  textctrllist: any = [];
  getdynamicTbldataList: any = [];
  fielids: any = [];
  ccdindexid: any;
  itemindex: any;

  loadComponent: boolean = true;
  validationStatus: boolean = false;
  
  constructor(
    private route: Router,
    private httpClient: HttpClient,
    public datepipe: DatePipe,
    private router: ActivatedRoute,
    public commonService: CommonconfigService,
    private fb: FormBuilder,
    private ManageformconfigService: ManageformconfigService,
    public vldChkLst: ValidatorchecklistService,
    private encDec: EncrypyDecrpyService
  ) { 
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);

      let schemeArr: any = schemeStr.split(':');
      this.txtModuleId = schemeArr[0];
      this.txtFormId = schemeArr[1];
      this.getsectionId = schemeArr[2];

    }
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    this.userId = SeetionParsed.USER_ID;
    this.dynamicForm = this.fb.group({

      itemId: [this.txtFormId],
      sectionId: [this.getsectionId],
      formDetails: this.fb.array([]),
      status: 0,
      otherStatus: '',
      updatedBy: [this.userId],
      createdBy: [this.userId]
    });


  }

  ngOnInit(): void {

    this.loadTableDetails();
    this.loadconfig();
    // this.addChangeEventForLabel();
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));

    this.userId = SeetionParsed.USER_ID;

    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.txtModuleId = schemeArr[0];
      this.txtFormId = schemeArr[1];


      if (this.txtFormId != '' && this.txtModuleId != '') {


        this.getForms()
        this.getForminfo();

      }
    }

    setTimeout(() => {
      const elements = document.getElementsByClassName("ctrlCalcFieldtype");
      for (let i = 0; i < elements.length; i++) {
        let clickEvent = new Event('change');
        elements[i].dispatchEvent(clickEvent);
      }
    }, 2000)



  }



  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      this.title = this.multilingual(data[0].pagetitle);
    })
  }



  multilingual(test: any) {
    return test;
  }

  getForms() {

    let formParams =
    {
      "moduleId": this.txtModuleId,
      "processId": this.txtFormId
    };

    this.commonService.getFormName(formParams).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.formNames = res.result;
          if (this.formNames.length > 0) {
  
            this.txtModuleName = this.formNames[0].vchModuleName;
            this.txtFormName = this.formNames[0].vchProcessName;
          }
        }else if(res.status==417){
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidResponse),
          });
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
  getForminfo() {


    let formParams = {
      "moduleId": "",
      "vchProcessName": "",
      "iteamId": this.txtFormId
    };
    this.loading = true;
    this.ManageformconfigService.viewManageForm(formParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.loading = false;
          this.sectionlistList = res.result;
          if (this.sectionlistList[0].vchSection.length > 0) {
            this.sectionitems = this.sectionlistList[0].vchSection;
            this.getsectionId = this.sectionlistList[0].vchSection[0].sectionid;
          }
          this.tableExistsCheck = this.sectionlistList[0].tinTableExists;
        }else if(res.status==417){
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidResponse),
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(this.messaageslist.errorMsg),
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: this.commonService.langReplace(environment.invalidResponse),
        });
      }




    });
  }
  amstaticoptionValid() {
    if (this.dynamicForm.value.formDetails != '') {
      let amvalidationStatus = true;

      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {


        let addmoreDetails = this.dynamicForm.value.formDetails[i].addmoreDetails;



        for (let j = 0; j < addmoreDetails.length; j++) {

          let amctrlName = addmoreDetails[j].ctrlName;
          let addmorectrlStaticOptions = addmoreDetails[j].addmorecascadingCtrlDetails[0].addmorectrlStaticOptions;

          let ctrlCCbindDatatype = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCbindDatatype;
          let AMctrlCCbinddepentOther = addmoreDetails[j].addmorecascadingCtrlDetails[0].AMctrlCCbinddepentOther;
          let AMctrlCCbinddepentfld = addmoreDetails[j].addmorecascadingCtrlDetails[0].AMctrlCCbinddepentfld;




          for (let z = 0; z < addmorectrlStaticOptions.length; z++) {
            let ctrlCCStaticValue = addmorectrlStaticOptions[z].ctrlCCStaticValue;
            let ctrlCCStaticName = addmorectrlStaticOptions[z].ctrlCCStaticName;
            let ctrlCCStaticFieldValue = addmorectrlStaticOptions[z].ctrlCCStaticFieldValue;

            



            if (ctrlCCStaticValue == '' || typeof (ctrlCCStaticValue) == undefined || ctrlCCStaticValue == null) {

              Swal.fire({
                icon: 'error',
                text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCStaticValue),
              });
              amvalidationStatus = false;
              break;

            }
            else if (ctrlCCStaticName == '' || typeof (ctrlCCStaticName) == undefined || ctrlCCStaticName == null) {

              Swal.fire({
                icon: 'error',
                text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCStaticName),
              });
              amvalidationStatus = false;
              break;

            }
            else if ((ctrlCCbindDatatype == 'static') && (AMctrlCCbinddepentOther == 'yes') && (ctrlCCStaticFieldValue == '' || typeof (ctrlCCStaticFieldValue) == undefined || ctrlCCStaticFieldValue == null)) {

              Swal.fire({
                icon: 'error',
                text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCStaticFieldValue),
              });
              amvalidationStatus = false;
              break;

            }


          }




        }

      }

      return amvalidationStatus;
    }
    else {
      return false;
    }
  }

  amcalculationvalid() {
    if (this.dynamicForm.value.formDetails != '') {
      let amvalidationStatus = true;

      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {


        let addmoreDetails = this.dynamicForm.value.formDetails[i].addmoreDetails;



        for (let j = 0; j < addmoreDetails.length; j++) {

          let amctrlName = addmoreDetails[j].ctrlName;
          let addmorectrlCalcOptions = addmoreDetails[j].addmorecalculationDetails[0].addmorectrlCalcOptions;






          for (let z = 0; z < addmorectrlCalcOptions.length; z++) {

            let ctrlCalcFieldtype = addmorectrlCalcOptions[z].ctrlCalcFieldtype;
            let ctrlCalcValue = addmorectrlCalcOptions[z].ctrlCalcValue;



            if (ctrlCalcFieldtype == '0' || typeof (ctrlCalcFieldtype) == undefined || ctrlCalcFieldtype == null) {

              Swal.fire({
                icon: 'error',
                text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCalcFieldtype),
              });
              amvalidationStatus = false;
              break;

            }
            else if (ctrlCalcValue == '' || typeof (ctrlCalcValue) == undefined || ctrlCalcValue == null) {

              Swal.fire({
                icon: 'error',
                text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCalcValue),
              });
              amvalidationStatus = false;
              break;

            }

          }




        }

      }

      return amvalidationStatus;
    }
    else {
      return false;
    }
  }

  addmorevalid() {
    if (this.dynamicForm.value.formDetails != '') {
      let validationStatus = true;

      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {
        let dupAddMoreTableName: any = [];
        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let addmoreDetails = this.dynamicForm.value.formDetails[i].addmoreDetails;
        console.log(addmoreDetails);
        let ctrlTableName = this.dynamicForm.value.formDetails[i].ctrlTableName;

        for (let j = 0; j < addmoreDetails.length; j++) {
          let amctrllabel = addmoreDetails[j].ctrlLabel;
          let amctrlType = addmoreDetails[j].ctrlTypeId;

          let amctrlSlNo = addmoreDetails[j].ctrlSlNo;
          let amctrlName = addmoreDetails[j].ctrlName;
          let amctrlFileSizeType = addmoreDetails[j].ctrlFileSizeType;
          let amctrlFileMaxLength = addmoreDetails[j].ctrlFileMaxLength;
          let amctrlFileType = addmoreDetails[j].ctrlFileType;
          //let amctrlLabelData = addmoreDetails[j].ctrlLabelData;



          let amtableclmName = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColName;
          let amtableclmType = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColType;
          let amtableAttributeType = addmoreDetails[j].ctrlAttributeType;
          let amtableclmLength = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColLength;
          let amtableclmDefault = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColDeafult;
          let amtblclmprecision = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColprecision;
          // alert(amtblclmprecision);
          let amtableclmConstraints = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColConstraints;
          let amtableclmParentTbl = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColParentTbl;
          let amtableclmParentTblClmName = addmoreDetails[j].addmoretablecolDetails[0].ctrlTblColParentTblClmName;

          let ctrlCCbindDatatype = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCbindDatatype;
          let AMctrlCCbinddepentOther = addmoreDetails[j].addmorecascadingCtrlDetails[0].AMctrlCCbinddepentOther;
          let AMctrlCCbinddepentfld = addmoreDetails[j].addmorecascadingCtrlDetails[0].AMctrlCCbinddepentfld;
          let addmorectrlStaticOptions = addmoreDetails[j].addmorecascadingCtrlDetails[0].addmorectrlStaticOptions;
          let ctrlCCLabelData          = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCLabelData
          let ctrlCCDTableName = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDTableName;
          let ctrlCCDTextColumnName = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDTextColumnName;
          let ctrlCCDValueColumnName = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDValueColumnName;
          let ctrlCCbinddecldClm = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCbinddecldClm;
        
          let ctrlChkCalculation = addmoreDetails[j].addmorecalculationDetails[0].ctrlChkCalculation;
          let addmorectrlCalcOptions = addmoreDetails[j].addmorecalculationDetails[0].addmorectrlCalcOptions;
         
          if (amctrlSlNo == '' || typeof (amctrlSlNo) == undefined || amctrlSlNo == null) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlSlno),
            });
            validationStatus = false;
            break;
          }
          else if (amctrllabel == '' || typeof (amctrllabel) == undefined || amctrllabel == null) {

            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlLabel),
            });
            validationStatus = false;
            break;

          }
          // else if ((amctrlType == 1) && (amctrlLabelData == ' ' || typeof (amctrlLabelData) == undefined || amctrlLabelData == 0)) {
          //   Swal.fire({
          //     icon: 'error',
          //     text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlLabelData),
          //   });
          //   validationStatus = false;
          //   break;
          // }

          else if ((amctrlType == 7) && (amctrlFileMaxLength == '' || typeof (amctrlFileMaxLength) == undefined || amctrlFileMaxLength == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlFileMaxLength),
            });
            validationStatus = false;
            break;

          }
          else if ((amctrlType == 7) && (amctrlFileSizeType == '0' || typeof (amctrlFileSizeType) == undefined || amctrlFileSizeType == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlFileSizeType),
            });
            validationStatus = false;
            break;
          }
          else if ((amctrlType == 7) && (amctrlFileType == '0' || typeof (amctrlFileType) == undefined || amctrlFileType == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlFileType),
            });
            validationStatus = false;
            break;
          }
          else if ((amctrlType == 1  || amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (ctrlCCbindDatatype == '0' || typeof (ctrlCCbindDatatype) == undefined || ctrlCCbindDatatype == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgBinddatatype),
            });
            validationStatus = false;
            break;
          }
          else if (( amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (AMctrlCCbinddepentOther == 'yes') && (AMctrlCCbinddepentfld == '0' || typeof (AMctrlCCbinddepentfld) == undefined || AMctrlCCbinddepentfld == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgSelectfield),
            });
            validationStatus = false;
            break;
          }
          else if (amctrlType == 1 && ctrlCCbindDatatype == 'static'  &&  (ctrlCCLabelData == undefined || ctrlCCLabelData == '') ){
           
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlLabelData),
            });

            validationStatus = false;
            break;

          }
          else if ((amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (ctrlCCbindDatatype == 'static') && (addmorectrlStaticOptions.length == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgStaticOption),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10 && amctrlType == 2 && this.tableExistsCheck != 1) && (amtableAttributeType == '' || typeof (amtableAttributeType) == undefined || amtableAttributeType == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlAttributetype),
            });
            validationStatus = false;
            break;
          }
          
          else if ((amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (!this.amstaticoptionValid())) {

            validationStatus = false;
            break;

          }

          

          else if ((amctrlType == 1 || amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (AMctrlCCbinddepentOther == 'yes') && (ctrlCCbinddecldClm == '' || typeof (ctrlCCbinddecldClm) == undefined || ctrlCCbinddecldClm == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgtgchildColumn),
            });
            validationStatus = false;
            break;
          }

          else if ((amctrlType == 1 || amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCDTableName == '' || typeof (ctrlCCDTableName) == undefined || ctrlCCDTableName == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgcstableName),
            });
            validationStatus = false;
            break;
          }

          else if ((amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCDValueColumnName == '' || typeof (ctrlCCDValueColumnName) == undefined || ctrlCCDValueColumnName == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCDValueColumnName),
            });
            validationStatus = false;
            break;
          }
          else if ((amctrlType == 1 ||amctrlType == 3 || amctrlType == 5 || amctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCDTextColumnName == '' || typeof (ctrlCCDTextColumnName) == undefined || ctrlCCDTextColumnName == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCDTextColumnName),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10) && (ctrlChkCalculation == true) && (addmorectrlCalcOptions.length == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCalulationfields),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10) && (ctrlChkCalculation == true) && (!this.amcalculationvalid())) {
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10) && (amtableclmName == '' || typeof (amtableclmName) == undefined || amtableclmName == null)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblName),
            });
            validationStatus = false;
            break;

          }
          else if (!this.vldChkLst.chkblankspace(amtableclmName)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgBlankspace),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10 &&  ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == '' || typeof (amtableclmType) == undefined || amtableclmType == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblType),
            });
            validationStatus = false;
            break;
          }

          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == '' || typeof (amtableclmType) == undefined || amtableclmType == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblType),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == 'VARCHAR') && (amtableclmLength == '' || typeof (amtableclmLength) == undefined || amtableclmLength == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblLength),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == 'TINYINT' || amtableclmType == 'SMALLINT' || amtableclmType == 'MEDIUMINT' || amtableclmType == 'BIGINT') && (amtableclmLength == '' || typeof (amtableclmLength) == undefined || amtableclmLength == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblLength),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == 'DECIMAL' || amtableclmType == 'FLOAT' || amtableclmType == 'DOUBLE') && (amtableclmLength == '' || typeof (amtableclmLength) == undefined || amtableclmLength == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblLength),
            });
            validationStatus = false;
            break;
          }
          // (Number.isInteger(parseInt(amtblclmprecision)) == false)
          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) &&(amtableclmType == 'DECIMAL' || amtableclmType == 'FLOAT' || amtableclmType == 'DOUBLE' ) && (amtblclmprecision == '' || typeof (amtblclmprecision) == undefined || amtblclmprecision == 0)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgPecisionDefault),
            });
            validationStatus = false;
            break;
          }

          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) &&(amtableclmType == 'DECIMAL' || amtableclmType == 'FLOAT' || amtableclmType == 'DOUBLE' ) && (parseInt(amtblclmprecision) > parseInt(amtableclmLength))) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgprecisionless),
            });
            validationStatus = false;
            break;
          }

          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == 'INT' || amtableclmType == 'UNSIGNED_INTEGER') && (Number.isInteger(parseInt(amtableclmDefault)) == false)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgIntDefault),
            });
            validationStatus = false;
            break;
          }
          else if ((ctrlType == 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (amtableclmType == 'VARCHAR' || amtableclmType == 'DATETIME' || amtableclmType == 'DATE' || amtableclmType == 'TIME' || amtableclmType == 'TIMESTAMP' || amtableclmType == 'TEXT' || amtableclmType == 'LONGTEXT') && (Number.isInteger(parseInt(amtableclmDefault)) == true)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgOtherDefault),
            });
            validationStatus = false;
            break;
          }

          if (dupAddMoreTableName.includes(amtableclmName)) {
            Swal.fire({
              icon: 'error',
              text: amctrlName + ' ' + this.commonService.langReplace("column name") + " (" + amtableclmName + ") " + this.commonService.langReplace("already exist") + ".",
            });
            validationStatus = false;
            break;
          }
          dupAddMoreTableName.push(amtableclmName);

        }

      }
      return validationStatus;
    }
    else {
      return false;
    }

  }
  rowdataValid() {
    if (this.dynamicForm.value.formDetails != '') {
      let validationStatus = true;
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlName;
        let addmorerowdata = this.dynamicForm.value.formDetails[i].addmorerowdata;


        for (let j = 0; j < addmorerowdata.length; j++) {
          let ctrlRowdataSlNo = addmorerowdata[j].ctrlRowdataSlNo;
          let ctrlRowdataName = addmorerowdata[j].ctrlRowdataName;



          if (ctrlRowdataSlNo == '' || typeof (ctrlRowdataSlNo) == undefined || ctrlRowdataSlNo == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlRowdataSlNo),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlRowdataName == '' || typeof (ctrlRowdataName) == undefined || ctrlRowdataName == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlRowdataName),
            });
            validationStatus = false;
            break;

          }

        }

      }
      return validationStatus;
    }
    else {
      return false;
    }
  }

  staticoptionValid() {
    if (this.dynamicForm.value.formDetails != '') {
      let validationStatus = true;
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlName;
        let cascadingCtrlDetails = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlStaticOptions;
        let ctrlCCbinddepentOther = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbinddepentOther;
        let ctrlCCbindDatatype = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbindDatatype;

        for (let j = 0; j < cascadingCtrlDetails.length; j++) {

          let ctrlCCStaticValue = cascadingCtrlDetails[j].ctrlCCStaticValue;
          let ctrlCCStaticName = cascadingCtrlDetails[j].ctrlCCStaticName;
          let ctrlCCStaticFieldValue = cascadingCtrlDetails[j].ctrlCCStaticFieldValue;


          if (ctrlCCStaticValue == '' || typeof (ctrlCCStaticValue) == undefined || ctrlCCStaticValue == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCStaticValue),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlCCStaticName == '' || typeof (ctrlCCStaticName) == undefined || ctrlCCStaticName == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCStaticName),
            });
            validationStatus = false;
            break;

          }
          else if ((ctrlCCbindDatatype == 'static') && (ctrlCCbinddepentOther == 'yes') && (ctrlCCStaticFieldValue == '' || typeof (ctrlCCStaticFieldValue) == undefined || ctrlCCStaticFieldValue == null)) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCStaticFieldValue),
            });
            validationStatus = false;
            break;

          }
        }

      }
      return validationStatus;
    }
    else {
      return false;
    }
  }


  calculationvalid() {
    if (this.dynamicForm.value.formDetails != '') {
      let validationStatus = true;
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlName;
        let ctrlCalcOptions = this.dynamicForm.value.formDetails[i].calculationDetails[0].ctrlCalcOptions;


        for (let j = 0; j < ctrlCalcOptions.length; j++) {

          let ctrlCalcFieldtype = ctrlCalcOptions[j].ctrlCalcFieldtype;
          let ctrlCalcValue = ctrlCalcOptions[j].ctrlCalcValue;



          if (ctrlCalcFieldtype == '0' || typeof (ctrlCalcFieldtype) == undefined || ctrlCalcFieldtype == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCalcFieldtype),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlCalcValue == '' || typeof (ctrlCalcValue) == undefined || ctrlCalcValue == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCalcValue),
            });
            validationStatus = false;
            break;

          }

        }

      }
      return validationStatus;
    }
    else {
      return false;
    }
  }



  inputparamvalid() {
    if (this.dynamicForm.value.formDetails != '') {
      let validationStatus = true;
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlName;
        let ctrlinputParams = this.dynamicForm.value.formDetails[i].apiCtrlDetails[0].ctrlinputParams;


        for (let j = 0; j < ctrlinputParams.length; j++) {

          let ctrlinputparamKey = ctrlinputParams[j].ctrlinputparamKey;
          let ctrlinputparamType = ctrlinputParams[j].ctrlinputparamType;
          let ctrlinputparamValue = ctrlinputParams[j].ctrlinputparamValue;


          if (ctrlinputparamKey == '' || typeof (ctrlinputparamKey) == undefined || ctrlinputparamKey == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlinputparamKey),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlinputparamType == '0' || typeof (ctrlinputparamType) == undefined || ctrlinputparamType == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlinputparamType),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlinputparamValue == '0' || ctrlinputparamValue == '' || typeof (ctrlinputparamValue) == undefined || ctrlinputparamValue == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlinputparamValue),
            });
            validationStatus = false;
            break;

          }
        }

      }
      return validationStatus;
    }
    else {
      return false;
    }
  }
  outparamvalid() {
    if (this.dynamicForm.value.formDetails != '') {
      let validationStatus = true;
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlName;
        let ctrloutputParams = this.dynamicForm.value.formDetails[i].apiCtrlDetails[0].ctrloutputParams;


        for (let j = 0; j < ctrloutputParams.length; j++) {

          let ctrlOutparams = ctrloutputParams[j].ctrlOutparams;
          let ctrlOutparamKey = ctrloutputParams[j].ctrlOutparamKey;
          let ctrlOutparamVal = ctrloutputParams[j].ctrlOutparamVal;


          if (ctrlOutparams == '0' || typeof (ctrlOutparams) == undefined || ctrlOutparams == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlOutparams),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlOutparamKey == '' || typeof (ctrlOutparamKey) == undefined || ctrlOutparamKey == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlOutparamKey),
            });
            validationStatus = false;
            break;

          }
          else if (ctrlOutparamVal == '' || typeof (ctrlOutparamVal) == undefined || ctrlOutparamVal == null) {

            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlOutparamVal),
            });
            validationStatus = false;
            break;

          }
        }

      }
      return validationStatus;
    }
    else {
      return false;
    }
  }
  createForm(sectionId: any) {
    if (this.dynamicForm.value.formDetails != '') {
      let dupTableName: any[] = [];
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {
        let ctrlSlNo = this.dynamicForm.value.formDetails[i].ctrlSlNo;
        let ctrllabel = this.dynamicForm.value.formDetails[i].ctrlLabel;
      //  let ctrlLabelData = this.dynamicForm.value.formDetails[i].ctrlLabelData;
        let ctrlType = this.dynamicForm.value.formDetails[i].ctrlTypeId;
        let ctrlMaxLength = this.dynamicForm.value.formDetails[i].ctrlMaxLength;
        let ctrlMinLength = this.dynamicForm.value.formDetails[i].ctrlMinLength;

        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlName;
        let ctrlFileSizeType = this.dynamicForm.value.formDetails[i].ctrlFileSizeType;
        let ctrlFileType = this.dynamicForm.value.formDetails[i].ctrlFileType;
        // console.log("ROHIT");
        // console.log(ctrlFileType);
        let ctrlFileMaxLength = this.dynamicForm.value.formDetails[i].ctrlFileMaxLength;
        let ctrlTableName = this.dynamicForm.value.formDetails[i].ctrlTableName;
        let radioAddmoreviewtype = this.dynamicForm.value.formDetails[i].radioAddmoreviewtype;

        let tableclmName = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColName;
        let tableclmType = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColType;
        let tableclmLength = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColLength;
        let tableclmDefault = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColDeafult;
        let tblclmprecision = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColprecision;
        // alert(amtblclmprecision);

        tableclmDefault = (tableclmDefault != null && tableclmDefault != 'null' && tableclmDefault != '') ? tableclmDefault : '';
        let tableclmConstraints = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColConstraints;
        let tableclmParentTbl = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColParentTbl;
        let tableclmParentTblClmName = this.dynamicForm.value.formDetails[i].tablecolDetails[0].ctrlTblColParentTblClmName;

        
        let ctrlChkDepend = this.dynamicForm.value.formDetails[i].dependctrlDetails[0].ctrlChkDepend;

        let ctrlSelDependParent = (ctrlChkDepend) ? this.dynamicForm.value.formDetails[i].dependctrlDetails[0].ctrlSelDependParent : '';
        let ctrlSelDependValue = (ctrlChkDepend) ? this.dynamicForm.value.formDetails[i].dependctrlDetails[0].ctrlSelDependValue : '';
        let addmoreDetails = this.dynamicForm.value.formDetails[i].addmoreDetails;
        let addmorerowdata = this.dynamicForm.value.formDetails[i].addmorerowdata;


        let ctrlCCbindDatatype = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbindDatatype;
        let ctrlStaticOptions = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlStaticOptions;
        let ctrlCCbinddepentOther = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbinddepentOther;
        let ctrlCCbinddepentfld = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbinddepentfld;
        let ctrlLabelData  = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCLabelData;
        // console.log("-------------------");
        // console.log(ctrlLabelData);
        // console.log("======================");

        let ctrlCCDTableName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDTableName;
        let ctrlCCDTextColumnName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDTextColumnName;
        let ctrlCCDValueColumnName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDValueColumnName;
        let ctrlCCbinddecldClm = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbinddecldClm;

        let calculationDetails = this.dynamicForm.value.formDetails[i].calculationDetails;
        let ctrlChkCalculation = this.dynamicForm.value.formDetails[i].calculationDetails[0].ctrlChkCalculation;
        let ctrlCalcOptions = this.dynamicForm.value.formDetails[i].calculationDetails[0].ctrlCalcOptions;
        let tableAttributeType = this.dynamicForm.value.formDetails[i].ctrlAttributeType;



        // console.log(tableclmLength,tblclmprecision);
        if (ctrlSlNo == '' || typeof (ctrlSlNo) == undefined || ctrlSlNo == null) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlSlno),
          });
          break;
        }
        else if (ctrllabel == '' || typeof (ctrllabel) == undefined || ctrllabel == null) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlLabel),
          });
          break;
        }
        
        // else if ((ctrlType == 2) &&  (ctrlMaxLength == '' || typeof (ctrlMaxLength) == undefined || ctrlMaxLength == 0)) {
        //   Swal.fire({
        //     icon: 'error',
        //     text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlMaxLength),
        //   });
        //   break;
        // }
        else if ((ctrlType != 1 && ctrlType != 3 && ctrlType != 4 && ctrlType != 5 && ctrlType != 6 && ctrlType != 7 && ctrlType != 8 && ctrlType != 9 && ctrlType != 10 && ctrlType != 11 && ctrlType != 12) && (tableAttributeType == '' || typeof (tableAttributeType) == undefined || tableAttributeType == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlAttributetype),
          });
          break;
        }
        else if ((ctrlType == 2) &&  (ctrlMaxLength < ctrlMinLength)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlMaxLengthmustgrter),
          });
          break;
        }
        else if ((ctrlType == 7) && (ctrlFileMaxLength == '' || typeof (ctrlFileMaxLength) == undefined || ctrlFileMaxLength == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlFileMaxLength),
          });
          break;
        }
        else if ((ctrlType == 7) && (ctrlFileSizeType == '0' || typeof (ctrlFileSizeType) == undefined || ctrlFileSizeType == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlFileSizeType),
          });
          break;
        }
        else if ((ctrlType == 7) && (ctrlFileType.length ==0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlFileType),
          });
          break;
        }


        else if ((ctrlType == 10) && (radioAddmoreviewtype == '' || typeof (radioAddmoreviewtype) == undefined || radioAddmoreviewtype == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgradioAddmoreviewtype),
          });
          break;
        }

        else if ((ctrlType == 10) && (ctrlTableName == '' || typeof (ctrlTableName) == undefined || ctrlTableName == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlTablename),
          });
          break;
        }
        else if (!this.vldChkLst.chkblankspace(ctrlTableName)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgTableBlankspace),


          });
          break;
        }

        else if ((ctrlType == 10) && ((radioAddmoreviewtype == 'table') && (addmorerowdata.length == 0))) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgrowData),
          });
          break;
        }
        else if ((ctrlType == 10) && (!this.rowdataValid())) {


          break;

        }

        else if ((ctrlChkDepend == true) && (ctrlSelDependParent == '' || typeof (ctrlSelDependParent) == undefined || ctrlSelDependParent == 0)) {

          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlDependantParent),
          });
          break;
        }

        else if ((ctrlChkDepend == true) && (ctrlSelDependValue == '' || typeof (ctrlSelDependValue) == undefined || ctrlSelDependValue == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlDependantvalue),
          });
          break;
        }
        else if ((ctrlType == 1 || ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbindDatatype == '0' || typeof (ctrlCCbindDatatype) == undefined || ctrlCCbindDatatype == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgBinddatatype),
          });
          break;
        }
        else if ((ctrlType == 1 || ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbinddepentOther == 'yes') && (ctrlCCbinddepentfld == '0' || typeof (ctrlCCbinddepentfld) == undefined || ctrlCCbinddepentfld == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgSelectfield),
          });

          break;
        }
        else if ((ctrlType == 1 && ctrlCCbindDatatype=='static') && (ctrlLabelData == '' || typeof (ctrlLabelData) == undefined || ctrlLabelData == 0) ) {
      
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlLabelData),
          });
          break;
        }
        else if ((ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbindDatatype == 'static') && (ctrlStaticOptions.length == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgStaticOption),
          });
          break;
        }
        
        else if ((ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (!this.staticoptionValid())) {


          break;

        }
        else if ((ctrlType == 1 || ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCbinddepentOther == 'yes') && (ctrlCCbinddecldClm == '' || typeof (ctrlCCbinddecldClm) == undefined || ctrlCCbinddecldClm == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgtgchildColumn),
          });
          break;
        }
        else if ((ctrlType == 1 || ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCDTableName == '' || typeof (ctrlCCDTableName) == undefined || ctrlCCDTableName == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgcstableName),
          });
          break;
        }
        else if ((ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCDValueColumnName == '' || typeof (ctrlCCDValueColumnName) == undefined || ctrlCCDValueColumnName == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCDValueColumnName),
          });
          break;
        }
        else if ((ctrlType == 1  || ctrlType == 3 || ctrlType == 5 || ctrlType == 6) && (ctrlCCbindDatatype == 'dynamic') && (ctrlCCDTextColumnName == '' || typeof (ctrlCCDTextColumnName) == undefined || ctrlCCDTextColumnName == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgctrlCCDTextColumnName),
          });
          break;
        }
        else if ((ctrlChkCalculation == true) && (ctrlCalcOptions.length == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCalulationfields),
          });

          break;
        }
        else if ((ctrlChkCalculation == true) && (!this.calculationvalid())) {
          break;
        }
        else if ((ctrlType == 10) && (addmoreDetails.length == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgAddcontrol),
          });

          break;
        }
        else if ((ctrlType == 10) && (!this.addmorevalid())) {


          break;

        }
        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12) && (tableclmName == '' || typeof (tableclmName) == undefined || tableclmName == null)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblName),
          });
          break;
        }
        else if (!this.vldChkLst.chkblankspace(tableclmName)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgBlankspace),


          });
          break;
        }
        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12) && (tableclmType == '' || typeof (tableclmType) == undefined || tableclmType == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblType),
          });
          break;
        }
        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (tableclmType == 'VARCHAR') && (tableclmLength == '' || typeof (tableclmLength) == undefined || tableclmLength == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblLength),
          });
          break;
        }
        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (tableclmType == 'TINYINT' || tableclmType == 'SMALLINT' || tableclmType == 'MEDIUMINT' || tableclmType == 'BIGINT' ) && (tableclmLength == '' || typeof (tableclmLength) == undefined || tableclmLength == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblLength),
          });
          break;
        }
        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (tableclmType == 'DECIMAL' || tableclmType == 'FLOAT' || tableclmType == 'DOUBLE' ) && (tableclmLength == '' || typeof (tableclmLength) == undefined || tableclmLength == 0)) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgCtrlTblLength),
          });
          break;
        }
        else if ((ctrlType == 2 && ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1 ) &&(tableclmType == 'DECIMAL' || tableclmType == 'FLOAT' || tableclmType == 'DOUBLE' ) && ((tblclmprecision == null) || (tblclmprecision == ''))) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgPecisionDefault),
          });
          
          break;
        }

        else if ((ctrlType == 2 && ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) &&(tableclmType == 'DECIMAL' || tableclmType == 'FLOAT' || tableclmType == 'DOUBLE' ) && (parseInt(tblclmprecision) > parseInt(tableclmLength))) {
          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgprecisionless),
          });
         
          break;
        }

        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (tableclmType == 'INT' || tableclmType == 'UNSIGNED_INTEGER') && (Number.isInteger(parseInt(tableclmDefault)) == false)) {

          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgIntDefault),
          });
          break;
        }
        else if ((ctrlType != 10 && ctrlType != 8 && ctrlType != 12 && this.tableExistsCheck != 1) && (tableclmType == 'VARCHAR' || tableclmType == 'DATETIME' || tableclmType == 'DATE' || tableclmType == 'TIME' || tableclmType == 'TIMESTAMP' || tableclmType == 'TEXT' || tableclmType == 'LONGTEXT') && (Number.isInteger(parseInt(tableclmDefault)) == true)) {

          Swal.fire({
            icon: 'error',
            text: ctrlName + ' ' + this.commonService.langReplace(this.messaageslist.msgOtherDefault),
          });
          break;
        }





        else {
          if (ctrlType != 10 && ctrlType != 8 && ctrlType != 12 &&  dupTableName.includes(tableclmName)) {
            Swal.fire({
              icon: 'error',
              text: ctrlName + ' ' + this.commonService.langReplace("column name") + " (" + tableclmName + ") " + this.commonService.langReplace("already exist") + ".",
            });
            break;
          }
          dupTableName.push(tableclmName)

          Swal.fire({
            title: '',
            text: this.commonService.langReplace("Procced to Submit"),
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: this.commonService.langReplace('Cancel'),
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.commonService.langReplace('Yes')
          }).then((result: any) => {
            if (result.isConfirmed) {
              this.loading = true;
              let formParams: any = this.dynamicForm.value;


              this.sortAsc(formParams.formDetails).forEach((element: any) => {
                element.addmoreDetails = this.sortAsc2(element.addmoreDetails);
              });

              this.ManageformconfigService.addNewFormConfig(JSON.stringify(formParams)).subscribe((res: any) => {

                if (res.status == 200) {
                  this.loading = false;

                  Swal.fire({

                    text: this.commonService.langReplace(this.messaageslist.successMsg),
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: this.commonService.langReplace('Ok')
                  }).then((result) => {

                    if (result.isConfirmed) {
                      if ((sectionId == 0) || (this.i == this.sectionitems.length - 1)) {
                        let encSchemeStr = this.encDec.encText(this.txtFormId.toString());
                        this.route.navigate(['/formbuilder/formPreview', encSchemeStr]);

                      }
                      else {
                   
                        this.submitted = true;
                        this.destination = [];
                    //    this.dropItems.ctrlElementList = [];
                        this.dynamicForm.reset();
                        this.loading = true;

                        this.getsectionId = this.sectionitems[this.i + 1].sectionid;

                        this.dynamicForm = this.fb.group({
                          itemId: [this.txtFormId],
                          sectionId: [this.getsectionId],
                          formDetails: this.fb.array([]),
                          status: 0,
                          otherStatus: '',
                          updatedBy: [this.userId],
                          createdBy: [this.userId]
                        });
                        this.prevbtnDisabled = false;
                        this.i++;
                        (<HTMLElement>document.getElementById(this.getsectionId)).click();
                      //  this.dropItems.sectionChange(this.getsectionId);
                        this.loading = false;
                        return;

                      }

                    }
                  })

                }
                else if (res.status == 202) {
                  this.loading = false;

                  Swal.fire({

                    text: this.commonService.langReplace(this.messaageslist.successMsg),
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: this.commonService.langReplace('Ok')
                  }).then((result) => {
                    if (result.isConfirmed) {

                      if ((sectionId == 0) || (this.i == this.sectionitems.length - 1)) {

                        let encSchemeStr = this.encDec.encText(this.txtFormId.toString());
                        this.route.navigate(['/formbuilder/formPreview', encSchemeStr]);
                      }
                      else {

                        this.submitted = true;
                        this.destination = [];
                        //this.dropItems.ctrlElementList = [];
                        this.dynamicForm.reset();
                        this.loading = true;
                        this.getsectionId = this.sectionitems[this.i + 1].sectionid;
                        this.arrsecColumnDetails=[];
                        this.loadTableDetails();
                        this.dynamicForm = this.fb.group({
                          itemId: [this.txtFormId],
                          sectionId: [this.getsectionId],
                          formDetails: this.fb.array([]),
                          status: 0,
                          otherStatus: '',
                          updatedBy: [this.userId],
                          createdBy: [this.userId]
                        });
                        this.prevbtnDisabled = false;

                        this.i++;
                        (<HTMLElement>document.getElementById(this.getsectionId)).click();

                        //this.dropItems.sectionChange(this.getsectionId);

                        this.loading = false;
                        return;
                      }

                    }
                  })
                }
                else {
                  Swal.fire({
                    icon: 'error',
                    text: this.commonService.langReplace(this.messaageslist.errorMsg),

                  });
                }


              });


            }
          })



        }

      }

    }
    else {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Please Add a control"),

      });
    }





  }
  public sortAsc(arrayList: any) {
    let array = [];
    return array = arrayList.sort(function (a: any, b: any) {
      return a.ctrlSlNo - b.ctrlSlNo;
    });


  }
  public sortAsc2(arrayList: any) {
    let array = [];
    return array = arrayList.sort(function (a: any, b: any) {
      return a.ctrlSlNo - b.ctrlSlNo;
    });


  }
  prevBtn(sectionId: any) {


    this.i = this.i - 1;
    if (this.i < this.sectionitems.length && this.i > 0) {
      this.getsectionId = this.sectionitems[this.i].sectionid;

      this.prevbtnDisabled = false;
      this.destination = [];
     // this.dropItems.ctrlElementList = [];

      this.dynamicForm.reset();
      this.dynamicForm = this.fb.group({
        itemId: [this.txtFormId],
        sectionId: [this.getsectionId],
        formDetails: this.fb.array([]),
        status: 0,
        otherStatus: '',
        updatedBy: [this.userId],
        createdBy: [this.userId]
      });
      this.nextbtnDisabled = false;
     // this.dropItems.sectionChange(this.getsectionId);


    } else {
      this.prevbtnDisabled = true;

      this.getsectionId = this.sectionitems[this.i].sectionid;
      this.destination = [];
      this.dynamicForm.reset();
      this.dynamicForm = this.fb.group({
        itemId: [this.txtFormId],
        sectionId: [this.getsectionId],
        formDetails: this.fb.array([]),
        status: 0,
        otherStatus: '',
        updatedBy: [this.userId],
        createdBy: [this.userId]
      });
     // this.dropItems.ctrlElementList = [];
      this.nextbtnDisabled = false;
     // this.dropItems.sectionChange(this.getsectionId);


    }
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

  loadTableDetails() {
    let tabulrParms = { 'processId': this.txtFormId , 'secId': this.getsectionId};
    this.commonService.getTableDetails(tabulrParms).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let res: any = Buffer.from(respData, 'base64');
      res = JSON.parse(res.toString());
      if (res.status == 200) {
        this.tableExistsCheck = res.result.tblExists;
        console.log( res.result.columnDetails);
        if (this.tableExistsCheck == 1) {
          let secColumnDetails: any = res.result.columnDetails;
          for (let secTblrLoop of secColumnDetails) {
            this.arrsecColumnDetails.push({ 'columnName': secTblrLoop.COLUMN_NAME, 'datatype': (secTblrLoop.DATA_TYPE).toUpperCase(), 'defDataValue': secTblrLoop.COLUMN_DEFAULT });

          }
        }

      }
    });
  }

}
