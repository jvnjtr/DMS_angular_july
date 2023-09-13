import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { DropService } from 'src/app/services/drop.service';
import { environment } from 'src/environments/environment';
import { ManageformconfigService } from 'src/app/services/manageformconfig.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { LanguageService } from 'src/app/services/language.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { C } from '@angular/cdk/keycodes';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {
  languagelable: any = environment.languagelable;

  mysqlDataType: any = environment.mysqlDataType;
  attributetype: any = [];


  result: any;
  destination: any = [];
  ctrlElementList: any = [];
  formArray: any = [];
  cttypeid: any;
  itemindex: any;
  dependantlist: any = [];
  depOtherlist: any = [];
  ItemCtrllist: any = [];
  randomno: any;

  validateFileTypes: any = environment.validateFileTypes
  addmoredependantlist: any = [];
  getdynamicTbldataList: any = [];
  adgetdynamicTbldataList: any = [];
  dependantoptions: any = [];
  addmoredependantoptions: any = [];
  setbindval: any;
  textctrllist: any = [];
  addmoretextctrllist: any = [];
  fielids: any = [];
  amfielids: any = [];
  loading: boolean = false;
  adsetbindval: any;
  getLanguageList: any = [];
  addMoreArrHeadingDetails: any = [];
  //For textbox
  showInputs: any;;

  addmoreCtrlId: any;
  status: any = false;
  arrsecAddMoreColumnDetails: any[] = [];

  arrColumnMergeDetails: any = [];
  langKey: any = 'en';
  @Input() dynamicForm: FormGroup;
  @Input() dyformData: FormGroup;
  @Input() txtFormId: any;
  @Input() getsectionId: any;
  @Input() nextbtnval: any;
  @Input() arrsecColumnDetails: any = [];
  @Input() tableExistsCheck: any;

  defaultLan: any = 'en';
  origin = [
    { ctrlTypeId: 1, controlname: "Label", controltype: "label", ctrlicon: "icon-text-width-solid", ctrlclass: "UiLabelField" },
    { ctrlTypeId: 2, controlname: "TextBox", controltype: "text", ctrlicon: "icon-keyboard", ctrlclass: "UiTextField" },
    { ctrlTypeId: 3, controlname: "Dropdown", controltype: "select", ctrlicon: "icon-list-ul-solid", ctrlclass: "UiSelectField" },
    { ctrlTypeId: 4, controlname: "TextArea", controltype: "textarea", ctrlicon: "icon-tablet-solid", ctrlclass: "UiTextareaField" },
    { ctrlTypeId: 5, controlname: "Checkbox", controltype: "checkbox", ctrlicon: "icon-square", ctrlclass: "UiCheckField" },
    { ctrlTypeId: 6, controlname: "Radio", controltype: "radio", ctrlicon: "icon-circle", ctrlclass: "UiRadioField" },
    { ctrlTypeId: 7, controlname: "File Upload", controltype: "file", ctrlicon: "icon-upload-solid", ctrlclass: "UiFileField" },
  ];


  @Output("callfunction") callfunction: EventEmitter<any> = new EventEmitter();
  @ViewChild('addmorectrlType') addmorectrlType: ElementRef;
  constructor(
    public dropService: DropService,
    private fb: FormBuilder, private httpClient: HttpClient,
    public datepipe: DatePipe,

    private router: ActivatedRoute,
    private commonService: CommonServicesService,
    private ManageformconfigService: ManageformconfigService,
    public vldChkLst: ValidatorchecklistService,
    private encDec: EncrypyDecrpyService,
    public langServoce: LanguageService,
    public element: ElementRef) { }



  ngOnInit(): void {


    this.sectionChange(this.getsectionId)
    this.getLanguagesitems();
    // this.addChangeEventForLabel();



    let curr_obj: any = this;
    setTimeout(function () {

      var inputs = document.getElementsByTagName('input'), i = 0;

      do {
        if (inputs[i].classList.contains("mergeColumnLabel") == false || inputs[i].classList.contains("noOfColumnsMergerd") == false) {
          if (inputs[i].type == 'text') {
            inputs[i].addEventListener("keyup", function (e) {
              curr_obj.vldChkLst.blockspecialchar_first(e, false);
              //  curr_obj.vldChkLst.checkForSpecialCharacterAllPostion(e);
            });
          }
        }

      }
      while (inputs[++i])


    }, 2000);
    this.getvalidationlist(1);
  }

  getLanguagesitems() {
    this.loading = false;
    let dataLangParms = {
      "data": {
        "intId": "0",
        "langName": "",
        "aliasName": "",
      },
      "pageStatus": "implementation"
    }
    this.langServoce.viewLanguage(dataLangParms).subscribe((data: any) => {
      let respData = data.RESPONSE_DATA;
      let respToken = data.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.getLanguageList = res.result;
          // console.log(this.getLanguageList)
        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidResponse),
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace('Something Went wrong'),
          });

        }
      } else {
        Swal.fire({
          icon: 'error',
          text: this.commonService.langReplace(environment.invalidResponse),
        });
      }


    })
  }

  //\\=============== From Array Declaration =================//\\


  formDetails(): FormArray {
    return this.dyformData.get('formDetails') as FormArray;
  }

  tablecolDetails(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("tablecolDetails") as FormArray

  }

  addmorerowdata(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("addmorerowdata") as FormArray

  }

  dependctrlDetails(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("dependctrlDetails") as FormArray

  }


  cascadingCtrlDetails(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("cascadingCtrlDetails") as FormArray

  }




  // ctrlinputParams(ctrlIndex: any, apiIndex: any): FormArray {

  //   return this.apiCtrlDetails(ctrlIndex).at(apiIndex).get("ctrlinputParams") as FormArray

  // }
  // ctrloutputParams(ctrlIndex: any, apiIndex: any): FormArray {

  //   return this.apiCtrlDetails(ctrlIndex).at(apiIndex).get("ctrloutputParams") as FormArray

  // }
  ctrlStaticOptions(ctrlIndex: any, cascadingIndex: any): FormArray {

    return this.cascadingCtrlDetails(ctrlIndex).at(cascadingIndex).get("ctrlStaticOptions") as FormArray

  }


  calculationDetails(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("calculationDetails") as FormArray

  }

  ctrlCalcOptions(ctrlIndex: any, calcIndex: any): FormArray {

    return this.calculationDetails(ctrlIndex).at(calcIndex).get("ctrlCalcOptions") as FormArray

  }

  languageDetails(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("languageDetails") as FormArray
  }

  apiCtrlDetails(ctrlIndex: any): FormArray {

    return this.formDetails().at(ctrlIndex).get("apiCtrlDetails") as FormArray

  }

  addmoreColumnMergeCtlDetils(ctrlIndex: any): FormArray {
    return this.formDetails().at(ctrlIndex).get("addmoreMergeColumnDetails") as FormArray
  }
  //\\=============== From Array Declaration =================//\\
  //\\=============== AddMore From Array Declaration =================//\\
  addmoreDetails(ctrlIndex: any): FormArray {
    return this.formDetails().at(ctrlIndex).get("addmoreDetails") as FormArray
  }
  addmoretablecolDetails(ctrlIndex: any, addmoreIndex: any): FormArray {
    return this.addmoreDetails(ctrlIndex).at(addmoreIndex).get("addmoretablecolDetails") as FormArray
  }

  addmorelanguageDetails(ctrlIndex: any, addmoreIndex: any): FormArray {
    return this.addmoreDetails(ctrlIndex).at(addmoreIndex).get("addmorelanguageDetails") as FormArray
  }

  addmorecascadingCtrlDetails(ctrlIndex: any, addmoreIndex: any): FormArray {

    return this.addmoreDetails(ctrlIndex).at(addmoreIndex).get("addmorecascadingCtrlDetails") as FormArray

  }

  addmorectrlStaticOptions(ctrlIndex: any, addmoreIndex: any, cascadingIndex: any): FormArray {

    return this.addmorecascadingCtrlDetails(ctrlIndex, addmoreIndex).at(cascadingIndex).get("addmorectrlStaticOptions") as FormArray

  }
  addmorecalculationDetails(ctrlIndex: any, addmoreIndex: any): FormArray {


    return this.addmoreDetails(ctrlIndex).at(addmoreIndex).get("addmorecalculationDetails") as FormArray


  }

  addmorectrlCalcOptions(ctrlIndex: any, addmoreIndex: any, calcIndex: any): FormArray {


    return this.addmorecalculationDetails(ctrlIndex, addmoreIndex).at(calcIndex).get("addmorectrlCalcOptions") as FormArray
  }


  //\\=============== AddMore From Array Declaration =================//\\

  //\\=============== From Group Declaration =================//\\
  newidsDtls(): FormGroup {
    return this.fb.group({
      ctrlId: 'ctrl_' + this.datepipe.transform((new Date), 'MMddyyyyhhmmss'),
      ctrlDetails: this.fb.array([])
    })
  }

  newControl(): FormGroup {
    return this.fb.group({
      ctrlSlNo: '',
      ctrlTypeId: this.dropService.cttypeid,
      ctrlMandatory: false,
      ctrlforViePage: false,
      ctrlforSearch: false,
      ctrlId: 'ctrl_' + this.datepipe.transform((new Date), 'MMddyyyyhhmmss'),
      ctrlName: 'ctrl_' + this.datepipe.transform((new Date), 'MMddyyyyhhmmss'),
      ctrlLabel: '',
      ctrlLabelinOdia: '',
      ctrlhelptext: '',
      ctrlPlaceholder: '',
      ctrlClass: '',
      // ctrlLabelData: '',
      ctrlHeadingType: '0',
      ctrlOtherButtonClass: '0',
      ctrlbtnType: '0',
      ctrlAttributeType: '0',
      ctrlMinLength: '',
      ctrlMaxLength: '',
      ctrlFileMaxLength: '',
      ctrlFileSizeType: '0',
      ctrlForApproval: false,
      ctrlFileType: [[]],
      validationDetails: '0',
      gridClass: '0',
      blockSpecialChars: false,
      ctrlOthervalidation: '',
      ctrlTableName: '',
      radioAddmoreviewtype: '0',
      tablecolDetails: this.fb.array([]),
      dependctrlDetails: this.fb.array([]),
      cascadingCtrlDetails: this.fb.array([]),
      calculationDetails: this.fb.array([]),
      addmoreDetails: this.fb.array([]),
      addmorerowdata: this.fb.array([]),
      apiCtrlDetails: this.fb.array([]),
      languageDetails: this.fb.array([]),
      addmoreMergeColumnDetails: this.fb.array([]),
    })
  }



  newTableColDtls(): FormGroup {
    return this.fb.group({
      ctrlTblColName: '',
      ctrlTblColType: '0',
      ctrlTblColLength: '',
      ctrlTblColDeafult: '',
      ctrlTblColConstraints: '',
      ctrlTblColParentTbl: 0,
      ctrlTblColParentTblClmName: 0,
      ctrlTblColprecision: 0
      // ctrlTblExistColName:''
    })
  }


  newAddmoreTableColDtls(): FormGroup {
    return this.fb.group({
      ctrlTblColName: '',
      ctrlTblColType: '0',
      ctrlTblColLength: '',
      ctrlTblColDeafult: 0,
      ctrlTblColConstraints: '',
      ctrlTblColParentTbl: 0,
      ctrlTblColParentTblClmName: 0,
      ctrlTblColprecision: 0
    })
  }



  newDependants(): FormGroup {
    return this.fb.group({
      ctrlChkDepend: false,
      ctrlSelDependParent: 0,
      ctrlSelDependValue: [['0']]
    })
  }
  newcascadingCtrls(): FormGroup {
    return this.fb.group({
      ctrlCCbindDatatype: '',
      ctrlCCbinddepentfld: '0',
      ctrlCCbinddecldClm: '',
      ctrlCCbinddepentOther: 'no',
      ctrlCCDTableName: '',
      ctrlCCDTextColumnName: '',
      ctrlCCDValueColumnName: '',
      ctrlCCDAlias: '',
      ctrlCCDConditions: '',
      ctrlCCLabelData: '',
      ctrlStaticOptions: this.fb.array([])

    })
  }

  newStaticoptions(): FormGroup {
    return this.fb.group({
      ctrlCCStaticValue: '',
      ctrlCCStaticName: '',
      ctrlCCStaticFieldValue: '0'
    })
  }


  newcalcCtrls(): FormGroup {
    return this.fb.group({
      ctrlChkCalculation: false,
      ctrlCalcOptions: this.fb.array([])
    })
  }

  newCalcoptions(): FormGroup {
    return this.fb.group({
      ctrlCalcFieldtype: '0',
      ctrlCalcValue: ''
    })
  }
  newRowDataDtls(): FormGroup {
    return this.fb.group({
      ctrlRowdataSlNo: '',
      ctrlRowdataName: ''

    })
  }

  newLanguageDtls(): FormGroup {
    var obj: any = {};
    for (let i = 0; i < this.getLanguageList.length; i++) {
      if (this.getLanguageList[i].aliasName != 'en') {
        obj[this.getLanguageList[i].aliasName] = '';
      }


    }
    return this.fb.group(obj)
  }


  newApiCtrls(): FormGroup {
    return this.fb.group({
      APIChar: false,
      ctrlCCDFunctionName: '',
      ctrlCCDEventName: ''

    })
  }

  newctrlinputs(): FormGroup {
    return this.fb.group({
      ctrlinputparamKey: '',
      ctrlinputparamType: '0',
      ctrlinputparamValue: ''
    })
  }

  newctrloptParms(): FormGroup {
    return this.fb.group({
      ctrlOutparams: '0',
      ctrlOutparamKey: '',
      ctrlOutparamVal: ''

    })
  }
  newaddmoreColumnMerge(): FormGroup {
    return this.fb.group({
      initialColumnNameDataText: "",
      initalControlId: 0,
      mergeCtrlLabel: '',
      noOfColumnsMerged: 0
    });
  }
  // ctrlSelApiMethod:this.fb.array([])

  //\\=============== From Group Declaration =================//\\

  //\\=============== Addmore From Group Declaration =================//\\
  newAddmoreDtls(): FormGroup {
    return this.fb.group({
      ctrlSlNo: '',
      ctrlTypeId: this.addmoreCtrlId,
      ctrlMandatory: false,
      ctrlId: 'ctrl_' + this.datepipe.transform((new Date), 'MMddyyyyhhmmss'),
      ctrlName: 'ctrl_' + this.datepipe.transform((new Date), 'MMddyyyyhhmmss'),
      ctrlLabel: '',
      ctrlLabelinOdia: '',
      ctrlhelptext: '',
      ctrlPlaceholder: '',
      ctrlClass: '',
      totalCalcAddMore: false,
      ctrlAttributeType: '0',
      ctrlMinLength: '',
      ctrlMaxLength: '',
      ctrlFileMaxLength: '',
      ctrlFileSizeType: '0',
      ctrlForApproval: false,
      ctrlFileType: [[]],
      validationDetails: '0',
      blockSpecialChars: false,
      ctrlOthervalidation: '',
      ctrlTableName: '',
      addmoretablecolDetails: this.fb.array([]),
      addmorecascadingCtrlDetails: this.fb.array([]),
      addmorecalculationDetails: this.fb.array([]),
      addmorelanguageDetails: this.fb.array([]),
    })
  }
  newaddmorecascadingCtrls(): FormGroup {
    return this.fb.group({
      ctrlCCbindDatatype: '',
      AMctrlCCbinddepentfld: '0',
      ctrlCCbinddecldClm: '',
      AMctrlCCbinddepentOther: 'no',
      ctrlCCDTableName: '',
      ctrlCCDTextColumnName: '',
      ctrlCCDValueColumnName: '',
      ctrlCCDAlias: '',
      ctrlCCDConditions: '',
      ctrlCCLabelData: '',
      addmorectrlStaticOptions: this.fb.array([])

    })
  }
  newaddmorecalcCtrls(): FormGroup {
    return this.fb.group({
      ctrlChkCalculation: false,
      addmorectrlCalcOptions: this.fb.array([])
    })
  }

  newaddmoreCalcoptions(): FormGroup {
    return this.fb.group({
      ctrlCalcFieldtype: '0',
      ctrlCalcValue: ''
    })
  }

  //\\=============== Addmore From Group Declaration =================//\\

  //\\ =========================  Drop Item  =======================//\\
  onDrop(event: CdkDragDrop<any[]>) {
    let ctrlArrays: any = [];
    this.dropService.drop(event);
    this.ctrlElementList.push(this.dropService.ctrlitem)
    this.itemindex = this.ctrlElementList.length;
    this.formDetails().push(this.newControl())
    this.tablecolDetails(this.itemindex - 1).push(this.newTableColDtls());
    this.dependctrlDetails(this.itemindex - 1).push(this.newDependants());
    this.calculationDetails(this.itemindex - 1).push(this.newcalcCtrls());
    this.cascadingCtrlDetails(this.itemindex - 1).push(this.newcascadingCtrls());
    this.languageDetails(this.itemindex - 1).push(this.newLanguageDtls())
    this.apiCtrlDetails(this.itemindex - 1).push(this.newApiCtrls());
    this.addmoreColumnMergeCtlDetils(this.itemindex - 1).push(this.newaddmoreColumnMerge());
  }
  //\\ ========================= Drop Item  ====================//\\


  //\\========================= Cascading  =========================//\\
  optionChangecacding(ctrlIndex: any, selid: any, selval: any) {


    this.dependantoptions = [];
    let rowids: any = [];
    //  //console.log(this.dependantlist)
    //  $("#"+selid).parents('.question-box').find('.ccddepend-fld-value option:not(:first)').remove();
    $("#" + selid).parents('.question-box').find('.ccddepend-fld-value option:not(:first)').remove();
    for (let i = 0; i < this.dependantlist.length; i++) {

      if (selval == this.dependantlist[i].controlid) {
        let optionDetails = this.dependantlist[i].options;
        for (let j = 0; j < optionDetails.length; j++) {
          let ctrlCCStaticValue = optionDetails[j].ctrlCCStaticValue;
          let ctrlCCStaticName = optionDetails[j].ctrlCCStaticName;
          this.dependantoptions.push("<option value=" + ctrlCCStaticValue + ">" + ctrlCCStaticName + "</option>")
        }

      }

    }
    let rorid: any;

    //  ccddepend-fld-value
    $("#" + selid).parents('.question-box').find('.ccstaticTabledata tr').each(function () {

      rorid = $(this).attr('id');
      rowids.push(rorid)

    });

    let idslength: any = rowids.length - 1;

    // console.log(this.dependantoptions)
    // if(idslength > rowids.length-1){
    //$("#staticrow_"+ctrlIndex+'_'+idslength+' .ccddepend-fld-value').append(this.dependantoptions);
    // }
    // else{
    $("#" + selid).parents('.question-box').find('.ccddepend-fld-value').append(this.dependantoptions);
    //}
    //this.dependantoptions=[];
    //  $("#staticrow_"+ctrlIndex+'_'+idslength+' .ccddepend-fld-value').append(this.dependantoptions);
    //  $("#"+selid).parents('.question-box').find('.ccddepend-fld-value').append(this.dependantoptions);


  }


  addNewOptions(ctrlIndex: any, cascadingIndex: any, ctrlCCbinddepentOther: any, ctrlCCbinddepentfld: any, ctrlCCbinddepentfldv: any, ctrlCCbindDatatype: any) {



    if ((ctrlCCbindDatatype == 'static') && (ctrlCCbinddepentOther == 'yes')) {

      //this.dependantoptions=[];
      setTimeout(() => {

        // this.optionChangecacding(ctrlIndex,ctrlCCbinddepentfld,ctrlCCbinddepentfldv)

        this.dependantoptions = [];
        let rowids: any = [];

        for (let i = 0; i < this.dependantlist.length; i++) {

          if (ctrlCCbinddepentfldv == this.dependantlist[i].controlid) {
            let optionDetails = this.dependantlist[i].options;
            for (let j = 0; j < optionDetails.length; j++) {
              let ctrlCCStaticValue = optionDetails[j].ctrlCCStaticValue;
              let ctrlCCStaticName = optionDetails[j].ctrlCCStaticName;
              this.dependantoptions.push("<option value=" + ctrlCCStaticValue + ">" + ctrlCCStaticName + "</option>")
            }

          }

        }

        let rorid: any;
        $("#" + ctrlCCbinddepentfld).parents('.question-box').find('.ccstaticTabledata tr').each(function () {

          rorid = $(this).attr('id');
          rowids.push(rorid)

        });

        let idslength: any = rowids.length - 1;
        $("#staticrow_" + ctrlIndex + '_' + idslength + ' .ccddepend-fld-value').append(this.dependantoptions);
        //$("#"+ctrlCCbinddepentfld).parents('.question-box').find('.ccddepend-fld-value').append(this.dependantoptions);




        $("#" + ctrlIndex).parents('.question-box').find('.ccdependfieldSelect').removeClass('d-none');
        //
      }, 2000)

    }
    else {
      setTimeout(() => {

        $("#" + ctrlIndex).parents('.question-box').find('.ccdependfieldSelect').addClass('d-none');


      }, 2000)
    }

    if ((ctrlCCbinddepentOther == 'yes') && (ctrlCCbinddepentfldv == '0')) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Select Parent Field"),
      });
    }

    else {

      this.ctrlStaticOptions(ctrlIndex, cascadingIndex).push(this.newStaticoptions());
    }

  }
  addrowdataOptions(ctrlIndex: any) {

    this.addmorerowdata(ctrlIndex).push(this.newRowDataDtls());


  }

  removerowdataOptions(ctrlIndex: any, rowDataIndex: any) {
    this.addmorerowdata(ctrlIndex).removeAt(rowDataIndex);
  }

  // addapiInputParam(ctrlIndex: any, apiIndex: any) {


  //   this.ctrlinputParams(ctrlIndex, apiIndex).push(this.newctrlinputs());
  // }

  // addapiOutputParam(ctrlIndex: any, apiIndex: any) {


  //   this.ctrloutputParams(ctrlIndex, apiIndex).push(this.newctrloptParms());
  // }



  staticChange(ctrlIndex: any, dependonother: any, dependonotherval: any) {

    let elemTargt: any = ctrlIndex.target;
    let selValue = ctrlIndex.target.value;


    this.setbindval = selValue;

    this.dependantlist = [];

    this.loaddata(event);



  }






  rdaddmoreChange(selparentval: any, event: any) {
    // alert(selparentval)
    if (selparentval == 'table') {
      $("#" + event.target.id).parents('.question-box').find('.addmorerowdata').removeClass('d-none');
      // 
    }
    else {
      $("#" + event.target.id).parents('.question-box').find('.addmorerowdata').addClass('d-none');
    }
  }

  removeOption(ctrlIndex: any, cascadingIndex: any, stOptIndex: any) {
    this.ctrlStaticOptions(ctrlIndex, cascadingIndex).removeAt(stOptIndex);
  }

  // removeInputParam(ctrlIndex: any, apiIndex: any, apiInputparamIndex: any) {
  //   this.ctrlinputParams(ctrlIndex, apiIndex).removeAt(apiInputparamIndex);
  // }

  // removeOutParam(ctrlIndex: any, apiIndex: any, apiOutparamIndex: any) {
  //   this.ctrloutputParams(ctrlIndex, apiIndex).removeAt(apiOutparamIndex);
  // }



  // ========================= Cascading  ====================//

  // ========================= Dependant Details   ====================// 
  toggleShow(event: any) {
    // alert(event.target.id)
    if (event.target.checked) {


      $("#" + event.target.id).parents('.question-box').find('.displaydepend').removeClass('d-none');
      this.depOtherlist = [];
      // this.loaddata(event);
      for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

        let ctrlName = this.dynamicForm.value.formDetails[i].ctrlLabel;
        let ctrlId = this.dynamicForm.value.formDetails[i].ctrlId;
        let ctrlTypeId = this.dynamicForm.value.formDetails[i].ctrlTypeId;

        let optionsarry: any = [];
        let cascadingCtrlDetails = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlStaticOptions;
        for (let j = 0; j < cascadingCtrlDetails.length; j++) {
          let ctrlCCStaticValue = cascadingCtrlDetails[j].ctrlCCStaticValue;
          let ctrlCCStaticName = cascadingCtrlDetails[j].ctrlCCStaticName;
          optionsarry.push({ 'ctrlCCStaticValue': ctrlCCStaticValue, 'ctrlCCStaticName': ctrlCCStaticName })
        }


        if ((ctrlTypeId == 3 || ctrlTypeId == 5 || ctrlTypeId == 6) && (ctrlName != '')) {

          this.depOtherlist.push({ 'controlid': ctrlId, 'controlname': ctrlName, 'options': optionsarry })
          ////  //console.log(this.depOtherlist)
        }



      }



    } else {

      $("#" + event.target.id).parents('.question-box').find('.displaydepend').addClass('d-none');
    }

  }

  toggleApiDetails(event: any, ctrlId: any) {
    // alert(event.target.id)
    if (event.target.checked) {
      this.ItemCtrllist = [];
      this.loadControlfiels(ctrlId);
      $("#" + event.target.id).parents('.question-box').find('.displayAPIDetails').removeClass('d-none');

    } else {

      $("#" + event.target.id).parents('.question-box').find('.displayAPIDetails').addClass('d-none');
    }

  }


  loadDependantfiels(cctrlId: any) {


    for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

      let ctrlName = this.dynamicForm.value.formDetails[i].ctrlLabel;
      let ctrlId = this.dynamicForm.value.formDetails[i].ctrlId;
      let ctrlTypeId = this.dynamicForm.value.formDetails[i].ctrlTypeId;
      let optionsarry: any = [];


      let ctrlCCbindDatatype = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbindDatatype;
      let ctrlCCDTableName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDTableName;
      let ctrlCCDTextColumnName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDTextColumnName;
      let ctrlCCDValueColumnName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDValueColumnName;
      let ctrlCCDConditions = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDConditions;
      let ctrlCCLabelData = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCLabelData;
      let ctrlApiData = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDApiName;
      let getcols = ctrlCCDTextColumnName + ',' + ctrlCCDValueColumnName;


      if (ctrlCCbindDatatype == 'static') {
        // alert(1)
        let cascadingCtrlDetails = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlStaticOptions;
        for (let j = 0; j < cascadingCtrlDetails.length; j++) {
          let ctrlCCStaticValue = cascadingCtrlDetails[j].ctrlCCStaticValue;
          let ctrlCCStaticName = cascadingCtrlDetails[j].ctrlCCStaticName;
          optionsarry.push({ 'ctrlCCStaticValue': ctrlCCStaticValue, 'ctrlCCStaticName': ctrlCCStaticName })
        }
      } else if (ctrlCCbindDatatype == 'dynamic') {
        //alert(2)
        let formParams =
        {
          "tableName": ctrlCCDTableName,
          "columnName": getcols,
          "condition": ctrlCCDConditions
        };
        // this.commonService.tableColumnFetch(formParams).subscribe((resp: any) => {
        //   let respData = resp.RESPONSE_DATA;
        //   let respToken = resp.RESPONSE_TOKEN;
        //   let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        //   if (respToken == verifyToken) {
        //     let res: any = Buffer.from(respData, 'base64');
        //     res = JSON.parse(res.toString());
        //     if (res.status == 200) {
        //       this.getdynamicTbldataList = res.result;
        //       for (let j = 0; j < this.getdynamicTbldataList.length; j++) {
        //         let ctrlCCStaticValue = this.getdynamicTbldataList[j][ctrlCCDValueColumnName];
        //         let ctrlCCStaticName = this.getdynamicTbldataList[j][ctrlCCDTextColumnName];
        //         optionsarry.push({ 'ctrlCCStaticValue': ctrlCCStaticValue, 'ctrlCCStaticName': ctrlCCStaticName })
        //       }
        //     }else if(res.status ==417){
        //       Swal.fire({
        //         icon: 'error',
        //         text: this.commonService.langReplace(environment.invalidResponse),
        //       });
        //     }
        //   } else {
        //     Swal.fire({
        //       icon: 'error',
        //       text: this.commonService.langReplace(environment.invalidResponse),
        //     });
        //   }

        //   // else{
        //   ////  //console.log(res.messages)
        //   //  }
        // });


      }

      if ((ctrlTypeId == 3 || ctrlTypeId == 5 || ctrlTypeId == 6) && (ctrlName != '')) {

        this.dependantlist.push({ 'controlid': ctrlId, 'controlname': ctrlName, 'options': optionsarry })

      }



    }

  }



  loadControlfiels(cctrlId: any) {


    for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

      let ctrlName = this.dynamicForm.value.formDetails[i].ctrlLabel;
      let ctrlId = this.dynamicForm.value.formDetails[i].ctrlId;
      let ctrlTypeId = this.dynamicForm.value.formDetails[i].ctrlTypeId;



      this.ItemCtrllist.push({ 'controlid': ctrlId, 'controlname': ctrlName })





    }

  }


  loaddata(e: any) {
    //alert(0)
    let txtval = e.target.value;
    let txtid = e.target.id;

    this.loadDependantfiels(txtid);



  }
  //addmoreloadDependantfiels(ctrlval,ctrlId,event)
  addmoreloadDependantfiels(cctrlId: any) {
    //alert(cctrlId)
    // this.dependantlist=[];
    for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {
      //alert(1)
      let ctrlName = this.dynamicForm.value.formDetails[i].ctrlLabel;
      let ctrlId = this.dynamicForm.value.formDetails[i].ctrlId;
      let ctrlTypeId = this.dynamicForm.value.formDetails[i].ctrlTypeId;
      let addmoreDetails = this.dynamicForm.value.formDetails[i].addmoreDetails;
      if ((ctrlTypeId == 10) && (addmoreDetails.length > 0)) {

        for (let j = 0; j < addmoreDetails.length; j++) {


          let ctrlCCbindDatatype = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCbindDatatype;
          let adctrlTypeId = addmoreDetails[j].ctrlTypeId;
          let adctrlLabel = addmoreDetails[j].ctrlLabel;
          let adctrlId = addmoreDetails[j].ctrlId;


          let ctrlCCDTableName = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDTableName;
          let ctrlCCDTextColumnName = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDTextColumnName;
          let ctrlCCDValueColumnName = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDValueColumnName;
          let ctrlCCDConditions = addmoreDetails[j].addmorecascadingCtrlDetails[0].ctrlCCDConditions;
          let getcols = ctrlCCDTextColumnName + ',' + ctrlCCDValueColumnName;


          let addmoreoptionsarry: any = [];

          if (ctrlCCbindDatatype == 'static') {
            // alert(1)
            let cascadingCtrlDetails = addmoreDetails[j].addmorecascadingCtrlDetails[0].addmorectrlStaticOptions;

            for (let k = 0; k < cascadingCtrlDetails.length; k++) {
              let ctrlCCStaticValue = cascadingCtrlDetails[k].ctrlCCStaticValue;
              let ctrlCCStaticName = cascadingCtrlDetails[k].ctrlCCStaticName;
              addmoreoptionsarry.push({ 'ctrlCCStaticValue': ctrlCCStaticValue, 'ctrlCCStaticName': ctrlCCStaticName })
            }
          }
          else if (ctrlCCbindDatatype == 'dynamic') {

            let formParams =
            {
              "tableName": ctrlCCDTableName,
              "columnName": getcols,
              "condition": ctrlCCDConditions
            };



            // this.commonService.tableColumnFetch(formParams).subscribe((resp: any) => {
            //   let respData = resp.RESPONSE_DATA;
            //   let respToken = resp.RESPONSE_TOKEN;
            //   let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            //   if (respToken == verifyToken) {
            //     let res: any = Buffer.from(respData, 'base64');
            //     res = JSON.parse(res.toString());
            //     if (res.status == 200) {
            //       this.adgetdynamicTbldataList = res.result;
            //       for (let j = 0; j < this.adgetdynamicTbldataList.length; j++) {
            //         let ctrlCCStaticValue = this.adgetdynamicTbldataList[j][ctrlCCDValueColumnName];
            //         let ctrlCCStaticName = this.adgetdynamicTbldataList[j][ctrlCCDTextColumnName];
            //         addmoreoptionsarry.push({ 'ctrlCCStaticValue': ctrlCCStaticValue, 'ctrlCCStaticName': ctrlCCStaticName })
            //       }
            //     }else if(res.status == 417){
            //       Swal.fire({
            //         icon: 'error',
            //         text: this.commonService.langReplace(environment.invalidResponse),
            //       });
            //     }
            //     else {
            //       //  //console.log(res.messages)
            //     }
            //   } else {
            //     Swal.fire({
            //       icon: 'error',
            //       text: this.commonService.langReplace(environment.invalidResponse),
            //     });
            //   }

            // });



          }

          if ((adctrlTypeId == 3 || adctrlTypeId == 5 || adctrlTypeId == 6) && (adctrlLabel != '')) {
            this.addmoredependantlist.push({ 'controlid': adctrlId, 'controlname': adctrlLabel, 'options': addmoreoptionsarry })
            //// //console.log(this.addmoredependantlist)
          }

        }
      }

    }



  }



  optionChange(ctrlIndex: any, selval: any, selectid: any) {

    this.dependantoptions = [];
    let optionsarry: any = [];
    $("#" + selectid).parents('.question-box').find('.depend-fld-value option').remove();
    for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {
      let ctrlId = this.dynamicForm.value.formDetails[i].ctrlId;
      let ctrlCCbindDatatype = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCbindDatatype;
      let ctrlCCDTableName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDTableName;
      let ctrlCCDTextColumnName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDTextColumnName;
      let ctrlCCDValueColumnName = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDValueColumnName;
      let ctrlCCDConditions = this.dynamicForm.value.formDetails[i].cascadingCtrlDetails[0].ctrlCCDConditions;
      let getcols: any = ctrlCCDTextColumnName + ',' + ctrlCCDValueColumnName;

      if (ctrlId == selval) {

        if (ctrlCCbindDatatype == "static") {

          for (let i = 0; i < this.depOtherlist.length; i++) {
            if (selval == this.depOtherlist[i].controlid) {
              let optionDetails = this.depOtherlist[i].options;
              for (let j = 0; j < optionDetails.length; j++) {
                let ctrlCCStaticValue = optionDetails[j].ctrlCCStaticValue;
                let ctrlCCStaticName = optionDetails[j].ctrlCCStaticName;

                // this.dependantoptions.push({'ctrlCCStaticValue':ctrlCCStaticValue,'ctrlCCStaticName':ctrlCCStaticName})
                this.dependantoptions.push("<option value=" + ctrlCCStaticValue + ">" + ctrlCCStaticName + "</option>")
              }

            }

          }
          setTimeout(() => {
            $("#" + selectid).parents('.question-box').find('.depend-fld-value').append(this.dependantoptions);
          }, 2000)
        }
        else if (ctrlCCbindDatatype == "dynamic") {

          //alert(2)
          let formParams =
          {
            "tableName": ctrlCCDTableName,
            "columnName": getcols,
            "condition": ctrlCCDConditions
          };


          // this.commonService.tableColumnFetch(formParams).subscribe((resp: any) => {
          //   let respData = resp.RESPONSE_DATA;
          //   let respToken = resp.RESPONSE_TOKEN;
          //   let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          //   if (respToken == verifyToken) {
          //     let res: any = Buffer.from(respData, 'base64');
          //     res = JSON.parse(res.toString());
          //     if (res.status == 200) {
          //       this.getdynamicTbldataList = res.result;
          //       for (let j of this.getdynamicTbldataList) {
          //         let ctrlCCStaticValue = j[ctrlCCDValueColumnName];
          //         let ctrlCCStaticName = j[ctrlCCDTextColumnName];
          //         optionsarry.push("<option value=" + ctrlCCStaticValue + ">" + ctrlCCStaticName + "</option>")
          //       }
          //     }else if(res.status == 417){
          //       Swal.fire({
          //         icon: 'error',
          //         text: this.commonService.langReplace(environment.invalidResponse),
          //       });
          //     }
          //     // else{
          //     ////  //console.log(res.messages)
          //     //  }
          //   } else {
          //     Swal.fire({
          //       icon: 'error',
          //       text: this.commonService.langReplace(environment.invalidResponse),
          //     });
          //   }

          // });
          setTimeout(() => {
            $("#" + selectid).parents('.question-box').find('.depend-fld-value').append(optionsarry);
          }, 2000);

        }

      }
    }



    ////  //console.log(this.dependantoptions)
  }


  // ========================= Dependant Details   ====================//

  // ========================= Calculation Details   ====================//
  removeCalcOption(ctrlIndex: any, calcIndex: any, calcOptIndex: any) {
    this.ctrlCalcOptions(ctrlIndex, calcIndex).removeAt(calcOptIndex);
  }
  addcalcOptions(ctrlIndex: any, calcIndex: any, ctrlcalcField: any) {
    this.textctrllist = [];
    this.ctrlCalcOptions(ctrlIndex, calcIndex).push(this.newCalcoptions());

  }
  calccChange(ctrlCalcFieldId: any, txtctrlId: any) {

    this.textctrllist = [];
    this.fielids = [];
    $("#" + ctrlCalcFieldId).parents('tr').find('.txtfieldvalues option:not(:first)').remove();
    for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {
      let ctrlName = this.dynamicForm.value.formDetails[i].ctrlLabel;
      let ctrlId = this.dynamicForm.value.formDetails[i].ctrlId;
      let ctrlTypeId = this.dynamicForm.value.formDetails[i].ctrlTypeId;
      if ((ctrlTypeId == 2) && (ctrlId != txtctrlId)) {
        this.fielids.push("<option  value='" + ctrlId + "'>" + ctrlName + "</option>")
      }
    }
    setTimeout(() => {
      let fiedvalues = $("#" + ctrlCalcFieldId).parents('tr').find('.txtfieldvalues').attr('id');
      this.textctrllist = [];
      $('#' + fiedvalues).append(this.fielids)
    }, 1000)


  }

  toggleShowCalc(event: any) {
    // alert(event.target.id)
    if (event.target.checked) {

      $("#" + event.target.id).parents('.question-box').find('.displayCalculation').removeClass('d-none');

    } else {

      $("#" + event.target.id).parents('.question-box').find('.displayCalculation').addClass('d-none');
    }

  }
  // ========================= Calculation Details   ====================//
  // ========================= Delete Drop Item  ====================//   
  delete(event: any) {

    Swal.fire({
      title: '',
      text: this.commonService.langReplace("Want to delete") + " ?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.commonService.langReplace('Cancel'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.commonService.langReplace('Yes')
    }).then((result: any) => {
      if (result.isConfirmed) {
        $("#itemdelete" + event).parents('.question-box').remove();
        this.formDetails().removeAt(event);
        this.ctrlElementList.splice(event, 1);
      }
    });
  }

  // ========================= Delete Drop Item  ====================//

  // ========================= Edit Drop Item  ====================//
  editItem(ctrlId: any, event: any) {
    // alert(ctrlId)

    $("#itemEdit" + event).parents('.question-box').find('.ctrlproperies').toggleClass('d-none');



    // $("#itemEdit"+event).parents('.question-box').find('.ctrlproperies .ctrlName').val(this.currentDateTime+event) 
  }

  // ========================= Edit Drop Item  ====================// 
  // ========================= Close Drop Item  ====================// 
  closeItem(event: any) {
    $("#" + event.target.id).parents('.question-box').find('.ctrlproperies').addClass('d-none');
  }

  // ========================= Close Drop Item  ====================// 

  // ========================= Table Constant Change   ====================// 
  constraintsChange(selval: any, ctrlIndex: any) {
    if (selval == '') {

      $("#" + ctrlIndex.target.id).parents('.question-box').find('.constraintsfields').addClass('d-none');

    }
    else {

      $("#" + ctrlIndex.target.id).parents('.question-box').find('.constraintsfields').removeClass('d-none');
    }
  }


  //\\========================= Addmore Codes  =========================//\\
  addctrl(ctrlIndex: any, addmoreIndex: any, elementvalue: any, event: any) {
    // this.addmoretablecolDetails(ctrlIndex,addmoreIndex).patchValue([{
    //   ctrlTblColName:'aa',
    //   ctrlTblColType:'',
    //   ctrlTblColLength:'0',
    //   ctrlTblColDeafult:'',
    //   ctrlTblColConstraints:'',
    //   ctrlTblColParentTbl:0,
    //   ctrlTblColParentTblClmName:0,
    // }]);  

    // this.addmorerowdata(ctrlIndex).patchValue([{
    //   tablecolDetails:[{"ctrlTblColName":"Rohit"}]
    // }]);
    if (elementvalue == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Please Select Control"),
      });
    }
    else {
      this.addmoreCtrlId = elementvalue;
      this.addmoreDetails(ctrlIndex).push(this.newAddmoreDtls())
      this.addmoretablecolDetails(ctrlIndex, addmoreIndex).push(this.newTableColDtls())
      this.addmorecascadingCtrlDetails(ctrlIndex, addmoreIndex).push(this.newaddmorecascadingCtrls())
      this.addmorecalculationDetails(ctrlIndex, addmoreIndex).push(this.newaddmorecalcCtrls())
      this.addmorelanguageDetails(ctrlIndex, addmoreIndex).push(this.newLanguageDtls())
      event.target.closest('.row').querySelector('.form-select').value = 0;
    }

  }



  addmoreoptionChangecacding(ctrlIndex: any, addmoreIndex: any, selid: any, selval: any) {
    this.addmoredependantoptions = [];
    let rowids: any = [];
    //alert(selid)
    $("#" + selid).parents('.addmoreitem-box').find('.ccddepend-fld-value option:not(:first)').remove();
    //// //console.log(this.addmoredependantlist)
    for (let i = 0; i < this.addmoredependantlist.length; i++) {

      if (selval == this.addmoredependantlist[i].controlid) {

        let optionDetails = this.addmoredependantlist[i].options;
        for (let j = 0; j < optionDetails.length; j++) {

          let ctrlCCStaticValue = optionDetails[j].ctrlCCStaticValue;
          let ctrlCCStaticName = optionDetails[j].ctrlCCStaticName;


          this.addmoredependantoptions.push("<option value=" + ctrlCCStaticValue + ">" + ctrlCCStaticName + "</option>")
        }

      }

    }
    let rorid: any;

    //  ccddepend-fld-value

    $("#" + selid).parents('.question-box').find('.adccstaticTabledata tr').each(function () {

      rorid = $(this).attr('id');
      rowids.push(rorid)

    });

    let idslength: any = rowids.length - 1;
    //        
    $("#adstaticrow_" + ctrlIndex + '_' + addmoreIndex + '_' + idslength + ' .ccddepend-fld-value').append(this.dependantoptions);


    //// //console.log(this.addmoredependantoptions)
    $("#" + selid).parents('.addmoreitem-box').find('.ccddepend-fld-value').append(this.addmoredependantoptions);

  }
  AmaddNewOptions(ctrlIndex: any, addmoreIndex: any, cascadingIndex: any, ctrlCCbinddepentOther: any, ctrlCCbinddepentfld: any, ctrlCCbinddepentfldv: any) {


    if ((this.adsetbindval == 'static') && (ctrlCCbinddepentOther == 'yes')) {


      setTimeout(() => {

        $("#" + ctrlIndex).parents('.addmoreitem-box').find('.ccdependfieldSelect').removeClass('d-none');
        this.addmoreoptionChangecacding(ctrlIndex, addmoreIndex, ctrlCCbinddepentfld, ctrlCCbinddepentfldv)
      }, 2000)

    }
    else {
      setTimeout(() => {

        $("#" + ctrlIndex).parents('.addmoreitem-box').find('.ccdependfieldSelect').addClass('d-none');


      }, 2000)
    }

    if ((ctrlCCbinddepentOther == 'yes') && (ctrlCCbinddepentfldv == '0')) {

      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Select Parent Field"),
      });
    }

    else {
      this.addmorectrlStaticOptions(ctrlIndex, addmoreIndex, cascadingIndex).push(this.newStaticoptions());
    }
  }

  addmorestaticChange(ctrlIndex: any, dependonother: any, ctrlval: any) {

    //alert(0)
    let selValue = ctrlIndex.target.value;

    this.adsetbindval = selValue;
    // $('#'+dependonother+" option[value='no']").prop("selected","selected");
    this.addmoredependantlist = [];
    this.addmoreloadDependantfiels(ctrlval);


  }


  removeAmOption(ctrlIndex: any, addmoreIndex: any, cascadingIndex: any, stOptIndex: any) {
    this.addmorectrlStaticOptions(ctrlIndex, addmoreIndex, cascadingIndex).removeAt(stOptIndex);
  }
  Amdelete(ctrlIndex: any, addmoreIndex: any) {

    Swal.fire({
      title: '',
      text: this.commonService.langReplace("Want to delete") + " ? ",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.commonService.langReplace('Cancel'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.commonService.langReplace('Yes')
    }).then((result: any) => {
      if (result.isConfirmed) {
        // alert("#AMitemdelete"+ctrlIndex+'_'+addmoreIndex)
        $("#AMitemdelete" + ctrlIndex + '_' + addmoreIndex).parents('.addmoreitem-box').remove();
        this.addmoreDetails(ctrlIndex).removeAt(addmoreIndex);
        let tempIdDelete: any = this.dynamicForm.value.formDetails[ctrlIndex].ctrlId;

        // this.ctrlElementList.splice(event,1);
      }
    });
  }
  amtoggleShowCalc(event: any) {
    // alert(event.target.id)
    if (event.target.checked) {

      $("#" + event.target.id).parents('.addmoreitem-box').find('.displayCalculation').removeClass('d-none');

    } else {

      $("#" + event.target.id).parents('.addmoreitem-box').find('.displayCalculation').addClass('d-none');
    }

  }

  addmoreeditItem(ctrlval: any, ctrlId: any, event: any) {


    ////console.log(this.dependantlist)
    //  alert(ctrlId+'==='+event)
    $("#AMitemEdit" + ctrlId + '_' + event).parents('.addmoreitem-box').find('.addmorectrlproperies').toggleClass('d-none');

    //


    // $("#itemEdit"+event).parents('.question-box').find('.ctrlproperies .ctrlName').val(this.currentDateTime+event) 
  }


  addmorecloseItem(event: any) {
    $("#" + event.target.id).parents('.addmoreitem-box').find('.addmorectrlproperies').addClass('d-none');
  }

  amremoveCalcOption(ctrlIndex: any, addmoreIndex: any, calcIndex: any, calcOptIndex: any) {
    this.addmorectrlCalcOptions(ctrlIndex, addmoreIndex, calcIndex).removeAt(calcOptIndex);
  }
  amaddcalcOptions(ctrlIndex: any, addmoreIndex: any, calcIndex: any, ctrlcalcField: any) {
    this.addmoretextctrllist = [];
    // this.ctrlCalcOptions(ctrlIndex,calcIndex).push(this.newCalcoptions());
    this.addmorectrlCalcOptions(ctrlIndex, addmoreIndex, calcIndex).push(this.newaddmoreCalcoptions());
  }

  amcalccChange(ctrlCalcFieldId: any, txtctrlId: any) {

    this.addmoretextctrllist = [];
    this.amfielids = [];
    var valuesarray: any = [];
    $("#" + ctrlCalcFieldId).parents('tr').find('.txtfieldvalues option:not(:first)').remove();



    for (let i = 0; i < this.dynamicForm.value.formDetails.length; i++) {

      let addmoreDetails = this.dynamicForm.value.formDetails[i].addmoreDetails;
      if (addmoreDetails.length > 0) {
        for (let j = 0; j < addmoreDetails.length; j++) {


          let ctrlName = addmoreDetails[j].ctrlLabel;
          let ctrlId = addmoreDetails[j].ctrlId;
          let ctrlTypeId = addmoreDetails[j].ctrlTypeId;

          let addmorecalcdtls = addmoreDetails[j].addmorecalculationDetails[0].addmorectrlCalcOptions;
          if (addmorecalcdtls.length > 0) {
            for (let z = 0; z < addmorecalcdtls.length; z++) {
              // 
              let ctrlCalcFieldtype = addmorecalcdtls[z].ctrlCalcFieldtype;
              var ctrlCalcValue = addmorecalcdtls[z].ctrlCalcValue;


              //  alert(ctrlTypeId +"==="+ctrlId +"==="+ txtctrlId)
              valuesarray.push(ctrlCalcValue)
            }

          }
          if ((ctrlTypeId == 2) && (ctrlId != txtctrlId)) {


            this.amfielids.push("<option  value='" + ctrlId + "'>" + ctrlName + "</option>")
            // selected='"+valuesarray.includes('ctrl_10062022045411')+"'


          }


        }


      }
    }
    setTimeout(() => {
      let fiedvalues = $("#" + ctrlCalcFieldId).parents('tr').find('.txtfieldvalues').attr('id');
      this.addmoretextctrllist = [];
      $('#' + fiedvalues).append(this.amfielids)
    }, 1000)


  }

  //\\========================= Addmore Codes  =========================//\\


  chkDuplicate(event: any, ctrlId: any) {
    let idval = event.target.value;
    let slnoarr: any = [];


    //  // An array of objects
    //  let dctrldtls:any = this.dynamicForm.value.formDetails;

    //  // Find if the array contains an object by comparing the property value
    //  if(dctrldtls.some((ctrls:any) => ctrls.ctrlSlNo == idval)){

    //      Swal.fire({
    //       icon: 'error',
    //       text: ctrlId+' found duplicate id',
    //     });

    //  } 



  }


  // ========================= Table Constant Change   ====================// 
  sectionChange(sectionId: any) {
    this.ctrlElementList = [];

    this.getsectionId = sectionId;

    this.nextbtnval = true;
    this.loading = false;
    let formParams = {
      "itemId": this.txtFormId,
      "sectionId": sectionId
    };



    this.ManageformconfigService.viewFormConfig(formParams).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      // let res = JSON.parse(decodeURIComponent(escape(window.atob(respData))));
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          setTimeout(() => {
            this.loading = false;

          }, 10000);
          this.status = false;
          let formCtrlDetails = res.result;
          // console.log(formCtrlDetails)
          let iid = 0;
          let amiid = 0;
          //console.log(formCtrlDetails);
          if (formCtrlDetails.length > 0) {


            $('.dropzone').addClass('active')


            formCtrlDetails[0].formDetails.forEach((t: any) => {
              iid++;
              var fdtls: FormGroup = this.fb.group({
                ctrlSlNo: t.ctrlSlNo || '',
                ctrlTypeId: t.ctrlTypeId || '',
                ctrlMandatory: t.ctrlMandatory || false,
                ctrlforViePage: t.ctrlforViePage || false,
                ctrlforSearch: t.ctrlforSearch || false,
                ctrlId: t.ctrlId || '',
                ctrlName: t.ctrlName || '',
                ctrlPlaceholder: t.ctrlPlaceholder || '',
                ctrlLabel: t.ctrlLabel || '',
                ctrlLabelinOdia: t.ctrlLabelinOdia || '',
                // ctrlLabelData: t.ctrlLabelData || '',
                ctrlhelptext: t.ctrlhelptext || '',
                ctrlClass: t.ctrlClass || '',
                ctrlHeadingType: t.ctrlHeadingType || '0',
                ctrlOtherButtonClass: t.ctrlOtherButtonClass || '',
                ctrlbtnType: t.ctrlbtnType || '0',
                ctrlAttributeType: t.ctrlAttributeType || '0',
                ctrlMinLength: t.ctrlMinLength || '',
                ctrlMaxLength: t.ctrlMaxLength || '',
                ctrlFileMaxLength: t.ctrlFileMaxLength || '',
                ctrlFileSizeType: t.ctrlFileSizeType || '0',
                ctrlForApproval: t.ctrlForApproval || false,
                ctrlFileType: [t.ctrlFileType] || [[0]],
                validationDetails: t.validationDetails || '0',
                gridClass: t.gridClass || '0',
                blockSpecialChars: t.blockSpecialChars || false,
                ctrlOthervalidation: t.ctrlOthervalidation || '',
                ctrlTableName: t.ctrlTableName || '',
                radioAddmoreviewtype: t.radioAddmoreviewtype || '0',
                tablecolDetails: this.fb.array([]),
                languageDetails: this.fb.array([]),
                dependctrlDetails: this.fb.array([]),
                cascadingCtrlDetails: this.fb.array([]),
                calculationDetails: this.fb.array([]),
                apiCtrlDetails: this.fb.array([]),
                addmoreDetails: this.fb.array([]),
                addmorerowdata: this.fb.array([]),
                addmoreMergeColumnDetails: this.fb.array([]),
                //  this.addmoreColumnMergeCtlDetils(this.itemindex-1).push(this.newaddmoreColumnMerge());
              });
              //console.log(t.tablecolDetails);
              let z="attributeType_"+(iid - 1);
              setTimeout(() => {
                let selectIfElement:any =document.getElementById(z);
                if(selectIfElement != null || selectIfElement != undefined){
                  selectIfElement.dispatchEvent(new Event("change"));
             }
             },400)

              if (t.tablecolDetails != undefined) {
                t.tablecolDetails.forEach((td: any) => {
                  //console.log(td.ctrlTblColDeafult)
                  var tbldtls = this.fb.group({
                    ctrlTblColName: td.ctrlTblColName || '',
                    ctrlTblColType: td.ctrlTblColType || '0',
                    ctrlTblColLength: td.ctrlTblColLength || '',
                    ctrlTblColDeafult: (td.ctrlTblColDeafult != null && td.ctrlTblColDeafult != 'null' && td.ctrlTblColDeafult != '') ? td.ctrlTblColDeafult : '',
                    ctrlTblColConstraints: td.ctrlTblColConstraints || '',
                    ctrlTblColParentTbl: td.ctrlTblColParentTbl || '',
                    ctrlTblColParentTblClmName: td.ctrlTblColParentTblClmName || '',
                    ctrlTblColprecision: td.ctrlTblColprecision || ''
                  });

                  (fdtls.get("tablecolDetails") as FormArray).push(tbldtls)
                });
              }

              if (t.addmoreMergeColumnDetails != undefined) {

                t.addmoreMergeColumnDetails.forEach((td: any) => {
                  if (td.initialColumnNameDataText != "") {
                    let addmoreMergeColumnDetails = this.fb.group({
                      initialColumnNameDataText: td.initialColumnNameDataText || "",
                      initalControlId: td.initalControlId || 0,
                      mergeCtrlLabel: td.mergeCtrlLabel || '',
                      noOfColumnsMerged: td.noOfColumnsMerged || 0,
                    });
                    if (td.initialColumnNameDataText != "") {
                      this.arrColumnMergeDetails[iid - 1] = { "initalControlId": "0", "mergeCtrlLabel": "", "noOfColumnsMerged": "0" };
                    }
                    (fdtls.get("addmoreMergeColumnDetails") as FormArray).push(addmoreMergeColumnDetails)
                  }
                });
              }


              setTimeout(() => {
                if (t.languageDetails != '' && t.languageDetails != 'undefined' && t.languageDetails != undefined) {
                  this.getLanguagesitems();
                  t.languageDetails.forEach((lgb: any) => {
                    let obj: any = {};
                    for (let i = 0; i < this.getLanguageList.length; i++) {
                      if (this.getLanguageList[i].aliasName != 'en') {
                        obj[this.getLanguageList[i].aliasName] = lgb[this.getLanguageList[i].aliasName] || '';
                      }
                    }
                    let langdtls = this.fb.group(obj);
                    (fdtls.get("languageDetails") as FormArray).push(langdtls)
                  });
                } else {
                  this.getLanguagesitems();
                  let obj: any = {};
                  for (let i = 0; i < this.getLanguageList.length; i++) {
                    if (this.getLanguageList[i].aliasName != 'en') {
                      obj[this.getLanguageList[i].aliasName] = "";
                    }

                  }
                  let langdtls = this.fb.group(obj);
                  (fdtls.get("languageDetails") as FormArray).push(langdtls)
                }
              }, 2000)


              if (t.radioAddmoreviewtype == "table") {
                let z = "#dispalayother_" + (iid - 1);
                setTimeout(() => {

                  $(z).parents('.question-box').find('.addmorerowdata').removeClass('d-none')

                }, 2000)
              }


              if (t.addmorerowdata != undefined) {
                t.addmorerowdata.forEach((amrdls: any) => {
                  var amrowdtls = this.fb.group({
                    ctrlRowdataSlNo: amrdls.ctrlRowdataSlNo || '',
                    ctrlRowdataName: amrdls.ctrlRowdataName || '',

                  });

                  (fdtls.get("addmorerowdata") as FormArray).push(amrowdtls)
                });
              }

              // APi Bind Data
              if (t.apiCtrlDetails != undefined) {
                t.apiCtrlDetails.forEach((apiDts: any) => {
                  var apidtls = this.fb.group({
                    APIChar: apiDts.APIChar || '',
                    ctrlCCDFunctionName: apiDts.ctrlCCDFunctionName || '',
                    ctrlCCDEventName: apiDts.ctrlCCDEventName || '',

                  });
                  //  console.log(apiDts.APIChar);
                  if (apiDts.APIChar) {
                    setTimeout(() => {
                      let apieleArr: any = document.getElementById("api_" + (iid - 1));
                      const event = new Event('change');
                      apieleArr.dispatchEvent(event);
                    }, 500);


                  }
                  (fdtls.get("apiCtrlDetails") as FormArray).push(apidtls)
                });
              }

              if (t.dependctrlDetails != undefined) {
                t.dependctrlDetails.forEach((dd: any) => {

                  var depdtls = this.fb.group({
                    ctrlChkDepend: dd.ctrlChkDepend || false,
                    ctrlSelDependParent: (dd.ctrlChkDepend) ? dd.ctrlSelDependParent : '0' || '0',
                    ctrlSelDependValue: [dd.ctrlSelDependValue] || [['0']],
                  });



                  (fdtls.get("dependctrlDetails") as FormArray).push(depdtls);
                  if (dd.ctrlChkDepend == true) {
                    // alert(0)
                    let z = "#dispalayother_" + (iid - 1);
                    let parentfield = "dispalayother_" + (iid - 1);
                    let dependId = "parentfiels_" + (iid - 1);
                    let dependSelId = "parentfielsval_" + (iid - 1);



                    setTimeout(() => {



                      $(z).parents('.question-box').find('.displaydepend').removeClass('d-none')



                      let selectIfElement: any = document.getElementById(parentfield);

                      if (selectIfElement != null || selectIfElement != undefined) {



                        selectIfElement.dispatchEvent(

                          new Event("change")



                        );

                      }

                      setTimeout(() => {

                        $('#' + dependId).val(dd.ctrlSelDependParent);

                        let selectIfElement: any = document.getElementById(dependId);

                        if (selectIfElement != null || selectIfElement != undefined) {

                          selectIfElement.dispatchEvent(

                            new Event("change")



                          );

                          setTimeout(() => {

                            for (let i = 0; i < dd.ctrlSelDependValue.length; i++) {

                              $('#' + dependSelId + " option[value='" + dd.ctrlSelDependValue[i] + "']").prop("selected", "selected");

                            }

                          }, 4000);

                        }

                      }, 2000);



                      // for (let i = 0; i < dd.ctrlSelDependValue.length; i++) {

                      //   $('#' + dependSelId + " option[value='" + dd.ctrlSelDependValue[i] + "']").prop("selected", "selected");

                      // }

                    }, 5000)







                    // setTimeout(() => {

                    //   $(z).parents('.question-box').find('.displaydepend').removeClass('d-none')

                    //   let selectIfElement: any = document.getElementById(parentfield);
                    //   if (selectIfElement != null || selectIfElement != undefined) {

                    //     selectIfElement.dispatchEvent(
                    //       new Event("change")

                    //     );
                    //   }



                    // }, 4000)

                    // setTimeout(() => {

                    //   $('#' + dependId + " option[value='" + dd.ctrlSelDependParent + "']").prop("selected", "selected");

                    //   let selectIfElement: any = document.getElementById(dependId);
                    //   if (selectIfElement != null || selectIfElement != undefined) {
                    //     //alert(0)
                    //     selectIfElement.dispatchEvent(
                    //       new Event("change")

                    //     );
                    //   }
                    // }, 5000)
                    // setTimeout(() => {



                    //   for (let i = 0; i < dd.ctrlSelDependValue.length; i++) {
                    //     $('#' + dependSelId + " option[value='" + dd.ctrlSelDependValue[i] + "']").prop("selected", "selected");
                    //   }


                    // }, 8000)



                  }


                });
              }
              if (t.cascadingCtrlDetails != undefined) {
                t.cascadingCtrlDetails.forEach((cd: any) => {
                  var ccddtls = this.fb.group({
                    ctrlCCbindDatatype: cd.ctrlCCbindDatatype || '',
                    ctrlCCbinddepentfld: cd.ctrlCCbinddepentfld || '0',
                    ctrlCCbinddecldClm: cd.ctrlCCbinddecldClm || '',
                    ctrlCCbinddepentOther: cd.ctrlCCbinddepentOther || 'no',
                    ctrlCCDTableName: cd.ctrlCCDTableName || '',
                    ctrlCCDTextColumnName: cd.ctrlCCDTextColumnName || '',
                    ctrlCCDValueColumnName: cd.ctrlCCDValueColumnName || '',
                    ctrlCCDAlias: cd.ctrlCCDAlias || '',
                    ctrlCCDConditions: cd.ctrlCCDConditions || '',
                    ctrlCCLabelData: cd.ctrlCCLabelData || '',
                    ctrlStaticOptions: this.fb.array([])
                  });

                  if (cd.ctrlCCbinddepentOther == "yes") {


                    let radiobind = "radiobind_" + (iid - 1);
                    let radiodepend = "radiodepend_" + (iid - 1);
                    let dispalayccdother = "dispalayccdother_" + (iid - 1);
                    // alert(dispalayccdother)
                    setTimeout(() => {

                      let selectIfElement: any = document.getElementById(radiobind);
                      if (selectIfElement != null || selectIfElement != undefined) {
                        selectIfElement.dispatchEvent(
                          new Event("change")

                        );

                      }

                    }, 2000);
                    setTimeout(() => {

                      let selectIfElement: any = document.getElementById(radiodepend);
                      if (selectIfElement != null || selectIfElement != undefined) {
                        selectIfElement.dispatchEvent(
                          new Event("change")

                        );
                      }
                      // console.log(cd.ctrlCCbinddepentfld)
                      $('#' + dispalayccdother + " option[value='" + cd.ctrlCCbinddepentfld + "']").prop("selected", "selected");


                    }, 7000);
                    setTimeout(() => {
                      let selectIfElement: any = document.getElementById(dispalayccdother);
                      if (selectIfElement != null || selectIfElement != undefined) {
                        selectIfElement.dispatchEvent(
                          new Event("change")

                        );
                      }

                      if ((cd.ctrlCCbindDatatype == 'dynamic') && (cd.ctrlCCbinddepentOther == 'yes')) {
                        $("#" + radiodepend).parents('.question-box').find('.ccdependfieldcolumn').removeClass('d-none');
                      }
                      else {
                        $("#" + radiodepend).parents('.question-box').find('.ccdependfieldcolumn').addClass('d-none');
                      }
                    }, 6000);

                  }
                  (fdtls.get("cascadingCtrlDetails") as FormArray).push(ccddtls);



                  let optindex = 0;
                  if (cd.ctrlStaticOptions.length > 0) {
                    cd.ctrlStaticOptions.forEach((cdopt: any) => {
                      //console.log(cdopt);
                      optindex++;
                      var ccdOPTdtls = this.fb.group({
                        ctrlCCStaticValue: cdopt.ctrlCCStaticValue || '',
                        ctrlCCStaticName: cdopt.ctrlCCStaticName || '',
                        ctrlCCStaticFieldValue: cdopt.ctrlCCStaticFieldValue || '0'
                      });



                      let ctrlCCStaticFieldValue = "ctrlCCStaticFieldValue_" + (iid - 1) + "_" + (optindex - 1);

                      console.log(ccdOPTdtls);
                      setTimeout(() => {

                        //  alert(cdopt.ctrlCCStaticFieldValue)

                        $('#' + ctrlCCStaticFieldValue + " option[value='" + cdopt.ctrlCCStaticFieldValue + "']").prop("selected", "selected");

                      }, 7000);


                      (ccddtls.get("ctrlStaticOptions") as FormArray).push(ccdOPTdtls)
                    })
                  }




                });


              }


              if (t.calculationDetails != undefined) {


                t.calculationDetails.forEach((calcd: any) => {


                  var calcdtls = this.fb.group({
                    ctrlChkCalculation: calcd.ctrlChkCalculation || false,
                    ctrlCalcOptions: this.fb.array([])
                  });


                  (fdtls.get("calculationDetails") as FormArray).push(calcdtls);

                  let calcsub = 0;
                  if (calcd.ctrlCalcOptions != undefined) {
                    calcd.ctrlCalcOptions.forEach((calcopt: any) => {
                      calcsub++;
                      var calcOPTdtls = this.fb.group({
                        ctrlCalcFieldtype: calcopt.ctrlCalcFieldtype || '',
                        ctrlCalcValue: calcopt.ctrlCalcValue || '',

                      });


                      let calcchange = "calccChange" + (iid - 1) + "_" + (calcsub - 1);
                      let calcchangeValue = "calccfvalue_" + (iid - 1) + "_" + (calcsub - 1);

                      setTimeout(() => {


                        let selectIfElement: any = document.getElementById(calcchange);
                        if (selectIfElement != null || selectIfElement != undefined) {
                          selectIfElement.dispatchEvent(
                            new Event("change")

                          );
                        }
                      }, 4000)
                      setTimeout(() => {
                        $('#' + calcchangeValue + " option[value='" + calcopt.ctrlCalcValue + "']").prop("selected", "selected");

                      }, 5000);

                      (calcdtls.get("ctrlCalcOptions") as FormArray).push(calcOPTdtls);





                    })
                  }
                  if (calcd.ctrlChkCalculation == true) {

                    let z = "#dispalayCalc_" + (iid - 1);

                    setTimeout(() => {


                      $(z).parents('.question-box').find('.displayCalculation').removeClass('d-none');


                    }, 2000)
                  }






                })
              }


              if (t.ctrlTypeId == 10) {
                if (t.addmoreDetails != undefined) {
                  t.addmoreDetails.forEach((amctrls: any) => {
                    amiid++;

                    var addmoredtls: FormGroup = this.fb.group({
                      ctrlSlNo: amctrls.ctrlSlNo || '',
                      ctrlTypeId: amctrls.ctrlTypeId || '',
                      ctrlMandatory: amctrls.ctrlMandatory || false,
                      ctrlId: amctrls.ctrlId || '',
                      ctrlName: amctrls.ctrlName || '',
                      ctrlLabel: amctrls.ctrlLabel || '',
                      ctrlLabelinOdia: amctrls.ctrlLabelinOdia || '',

                      ctrlhelptext: amctrls.ctrlhelptext || '',
                      ctrlPlaceholder: amctrls.ctrlPlaceholder || '',
                      ctrlClass: amctrls.ctrlClass || '',
                      ctrlAttributeType: amctrls.ctrlAttributeType || '0',
                      ctrlMinLength: amctrls.ctrlMinLength || '',
                      ctrlMaxLength: amctrls.ctrlMaxLength || '',
                      ctrlFileMaxLength: amctrls.ctrlFileMaxLength || '',
                      ctrlFileSizeType: amctrls.ctrlFileSizeType || '0',
                      ctrlForApproval: amctrls.ctrlForApproval || false,
                      ctrlFileType: [amctrls.ctrlFileType] || [[0]],
                      validationDetails: amctrls.validationDetails || '0',
                      blockSpecialChars: amctrls.blockSpecialChars || false,
                      totalCalcAddMore: amctrls.totalCalcAddMore || false,
                      // ctrlLabelData:amctrls.ctrlLabelData || '',
                      ctrlOthervalidation: amctrls.ctrlOthervalidation || '',
                      ctrlTableName: amctrls.ctrlhelptext || '',
                      addmoretablecolDetails: this.fb.array([]),
                      addmorecascadingCtrlDetails: this.fb.array([]),
                      addmorecalculationDetails: this.fb.array([]),
                      addmorelanguageDetails: this.fb.array([])
                    });
                    let amattributeType="amattributeType_"+(iid - 1)+"_"+(amiid-1);
                    setTimeout(() => {
                   let selectIfElement:any =document.getElementById(amattributeType);
                     if(selectIfElement != null || selectIfElement != undefined){
                     selectIfElement.dispatchEvent(
                       new Event("change")
                     );
                    }
                  },1000);
                    (fdtls.get("addmoreDetails") as FormArray).push(addmoredtls);
                    this.storeAddMoreCtrlDetails(amctrls.ctrlTypeId, t.ctrlId, amctrls.ctrlLabel, amctrls.ctrlId);
                    if (amctrls.addmoretablecolDetails != undefined) {
                      amctrls.addmoretablecolDetails.forEach((amtd: any) => {
                        var amtbldtls = this.fb.group({
                          ctrlTblColName: amtd.ctrlTblColName || '',
                          ctrlTblColType: amtd.ctrlTblColType || '0',
                          ctrlTblColLength: amtd.ctrlTblColLength || '',
                          ctrlTblColDeafult: amtd.ctrlTblColDeafult || '',
                          ctrlTblColConstraints: amtd.ctrlTblColConstraints || '',
                          ctrlTblColParentTbl: amtd.ctrlTblColParentTbl || '',
                          ctrlTblColParentTblClmName: amtd.ctrlTblColParentTblClmName || '',
                          ctrlTblColprecision: amtd.ctrlTblColprecision || ''
                        });
                        (addmoredtls.get("addmoretablecolDetails") as FormArray).push(amtbldtls)
                      });
                    }


                    setTimeout(() => {
                      if (amctrls.addmorelanguageDetails != '' && amctrls.addmorelanguageDetails != 'undefined' && amctrls.addmorelanguageDetails != undefined) {
                        this.getLanguagesitems();
                        amctrls.addmorelanguageDetails.forEach((amlgb: any) => {
                          var obj: any = {};
                          for (let i = 0; i < this.getLanguageList.length; i++) {
                            if (this.getLanguageList[i].aliasName != 'en') {
                              obj[this.getLanguageList[i].aliasName] = amlgb[this.getLanguageList[i].aliasName] || '';
                            }
                          }
                          var amlangdtls = this.fb.group(obj);
                          (addmoredtls.get("addmorelanguageDetails") as FormArray).push(amlangdtls)
                        });
                      } else {
                        this.getLanguagesitems();
                        let obj: any = {};
                        for (let i = 0; i < this.getLanguageList.length; i++) {
                          if (this.getLanguageList[i].aliasName != 'en') {
                            obj[this.getLanguageList[i].aliasName] = "";
                          }
                        }
                        var amlangdtls = this.fb.group(obj);
                        (addmoredtls.get("addmorelanguageDetails") as FormArray).push(amlangdtls)
                      }
                    }, 2000)

                    if (amctrls.addmorecascadingCtrlDetails != undefined) {
                      amctrls.addmorecascadingCtrlDetails.forEach((amcd: any) => {
                        var amccddtls = this.fb.group({
                          ctrlCCbindDatatype: amcd.ctrlCCbindDatatype || '',
                          AMctrlCCbinddepentfld: amcd.AMctrlCCbinddepentfld || '0',
                          ctrlCCbinddecldClm: amcd.ctrlCCbinddecldClm || '',
                          AMctrlCCbinddepentOther: amcd.AMctrlCCbinddepentOther || 'no',
                          ctrlCCDTableName: amcd.ctrlCCDTableName || '',
                          ctrlCCDTextColumnName: amcd.ctrlCCDTextColumnName || '',
                          ctrlCCDValueColumnName: amcd.ctrlCCDValueColumnName || '',
                          ctrlCCDAlias: amcd.ctrlCCDAlias || '',
                          ctrlCCDConditions: amcd.ctrlCCDConditions || '',
                          ctrlCCLabelData: amcd.ctrlCCLabelData || '',
                          addmorectrlStaticOptions: this.fb.array([])
                        });


                        let amradiobind = "amradiobind_" + (iid - 1) + "_" + (amiid - 1);
                        let amradiodepend = "amradiodepend_" + (iid - 1) + "_" + (amiid - 1);
                        let amdispalayccdother = "amdispalayccdother_" + (iid - 1) + "_" + (amiid - 1);

                        setTimeout(() => {


                          let selectIfElement: any = document.getElementById(amradiobind);
                          if (selectIfElement != null || selectIfElement != undefined) {
                            selectIfElement.dispatchEvent(
                              new Event("change")

                            );
                          }
                        }, 2000);
                        setTimeout(() => {

                          let selectIfElement: any = document.getElementById(amradiodepend);

                          if (selectIfElement != null || selectIfElement != undefined) {
                            selectIfElement.dispatchEvent(
                              new Event("change")

                            );

                          }

                          $('#' + amdispalayccdother + " option[value='" + amcd.AMctrlCCbinddepentfld + "']").prop("selected", "selected");

                        }, 5000);


                        setTimeout(() => {
                          let selectIfElement: any = document.getElementById(amdispalayccdother);
                          if (selectIfElement != null || selectIfElement != undefined) {
                            selectIfElement.dispatchEvent(
                              new Event("change")

                            );
                          }
                          if ((amcd.ctrlCCbindDatatype == 'dynamic') && (amcd.AMctrlCCbinddepentOther == 'yes')) {
                            $("#" + amradiodepend).parents('.addmoreitem-box').find('.ccdependfieldcolumn').removeClass('d-none');
                          }
                          else {
                            $("#" + amradiodepend).parents('.addmoreitem-box').find('.ccdependfieldcolumn').addClass('d-none');
                          }
                        }, 7000);
                        (addmoredtls.get("addmorecascadingCtrlDetails") as FormArray).push(amccddtls)


                        let amoptindex = 0;
                        if (amcd.addmorectrlStaticOptions != undefined) {
                          amcd.addmorectrlStaticOptions.forEach((amcdopt: any) => {
                            amoptindex++;
                            var amccdOPTdtls = this.fb.group({
                              ctrlCCStaticValue: amcdopt.ctrlCCStaticValue || '',
                              ctrlCCStaticName: amcdopt.ctrlCCStaticName || '',
                              ctrlCCStaticFieldValue: amcdopt.ctrlCCStaticFieldValue || '0'
                            });



                            let amctrlCCStaticFieldValue = "amctrlCCStaticFieldValue_" + (iid - 1) + "_" + (amiid - 1) + "_" + (amoptindex - 1);
                            //alert(amctrlCCStaticFieldValue)
                            setTimeout(() => {



                              $('#' + amctrlCCStaticFieldValue + " option[value='" + amcdopt.ctrlCCStaticFieldValue + "']").prop("selected", "selected");

                            }, 7000);


                            (amccddtls.get("addmorectrlStaticOptions") as FormArray).push(amccdOPTdtls)
                          })
                        }
                      });

                    }
                    if (amctrls.addmorecalculationDetails != undefined) {
                      amctrls.addmorecalculationDetails.forEach((amcalcd: any) => {

                        var amcalcdtls = this.fb.group({
                          ctrlChkCalculation: amcalcd.ctrlChkCalculation || false,
                          addmorectrlCalcOptions: this.fb.array([])
                        });


                        (addmoredtls.get("addmorecalculationDetails") as FormArray).push(amcalcdtls);
                        let amcalcsub = 0;
                        if (amcalcd.addmorectrlCalcOptions != undefined) {
                          amcalcd.addmorectrlCalcOptions.forEach((amcalcopt: any) => {
                            ////console.log(calcopt)
                            amcalcsub++;
                            var amcalcOPTdtls = this.fb.group({
                              ctrlCalcFieldtype: amcalcopt.ctrlCalcFieldtype || '',
                              ctrlCalcValue: amcalcopt.ctrlCalcValue || '',

                            });

                            //amcalccChange_1_2_0
                            let calcchange = "amcalccChange_" + (iid - 1) + "_" + (amiid - 1) + "_" + (amcalcsub - 1);
                            let calcchangeValue = "amcalccfvalue_" + (iid - 1) + "_" + (amiid - 1) + "_" + (amcalcsub - 1);
                            // alert(calcchangeValue)
                            setTimeout(() => {


                              let selectIfElement: any = document.getElementById(calcchange);
                              if (selectIfElement != null || selectIfElement != undefined) {
                                selectIfElement.dispatchEvent(
                                  new Event("change")

                                );
                              }

                            }, 3000)
                            setTimeout(() => {
                              $('#' + calcchangeValue + " option[value='" + amcalcopt.ctrlCalcValue + "']").prop("selected", "selected");

                            }, 5000);

                            (amcalcdtls.get("addmorectrlCalcOptions") as FormArray).push(amcalcOPTdtls);


                          })
                        }
                        if (amcalcd.ctrlChkCalculation == true) {

                          let z = "#amdispalayCalc_" + (iid - 1) + '_' + (amiid - 1);
                          //alert(z)
                          setTimeout(() => {


                            $(z).parents('.addmoreitem-box').find('.displayCalculation').removeClass('d-none');


                          }, 2000)
                        }


                      });
                    }

                  });
                }

                // alert(1)
              }






              this.formDetails().push(fdtls);









              ////console.log(t.addmoreDetails)







              this.ctrlElementList.push(fdtls.value)
              ////console.log(this.ctrlElementList)
            });

          }

          else {
            $('.dropzone').removeClass('active')
          }


          // this.loading=false;

        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidResponse),
          });
        }
        else {

          Swal.fire({
            icon: 'error',
            text: " this.messaageslist.errorMsg",

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

  // loadTableDetails() {
  //   let tabulrParms = { 'processId': this.txtFormId };
  //   this.commonService.getTableDetails(tabulrParms).subscribe((resp: any) => {
  //     let respData = resp.RESPONSE_DATA;
  //     let res: any = Buffer.from(respData, 'base64');
  //     res = JSON.parse(res.toString());
  //     if (res.status == 200) {
  //       this.tableExistsCheck = res.result.tblExists;
  //       if (this.tableExistsCheck == 1) {
  //         let secColumnDetails: any = res.result.columnDetails;
  //         for (let secTblrLoop of secColumnDetails) {
  //           this.arrsecColumnDetails.push({ 'columnName': secTblrLoop.COLUMN_NAME, 'datatype': (secTblrLoop.DATA_TYPE).toUpperCase(), 'defDataValue': secTblrLoop.COLUMN_DEFAULT });

  //         }
  //       }

  //     }
  //   });
  // }
  setTabularDetails(evt: any, ctlIndx: any) {
    let colEvtTarget: any = evt.target as HTMLInputElement;
    let colSectedVal = colEvtTarget.options[colEvtTarget.selectedIndex].getAttribute('data-seccolval');//Number(colEvtTarget.value)-1;
    this.tablecolDetails(ctlIndx).patchValue([{
      ctrlTblColName: this.arrsecColumnDetails[colSectedVal]['columnName'],
      ctrlTblColType: this.arrsecColumnDetails[colSectedVal]['datatype'],
      ctrlTblColLength: '0',
      ctrlTblColDeafult: this.arrsecColumnDetails[colSectedVal]['defDataValue'],
      ctrlTblColprecision: 0,
      ctrlTblColConstraints: '',
      ctrlTblColParentTbl: 0,
      ctrlTblColParentTblClmName: 0,
    }]);
  }
  loadAddMoreTableDetails(addMoreTableName: any, addmoreCtrlIndx: any) {

    if (addMoreTableName.length > 0) {
      let tabulrParms = { 'tableName': addMoreTableName };
      // this.commonService.getAnyTableDetails(tabulrParms).subscribe((resp: any) => {
      //   let respData = resp.RESPONSE_DATA;
      //   let res: any = Buffer.from(respData, 'base64');
      //   res = JSON.parse(res.toString());
      //   if (res.status == 200) {
      //     if (this.arrsecAddMoreColumnDetails[addmoreCtrlIndx] != undefined) {

      //       delete this.arrsecAddMoreColumnDetails[addmoreCtrlIndx];
      //     }
      //     let addMoreSecDetails: any = res.result;

      //     for (let secAddMoreTblrLoop of addMoreSecDetails) {
      //       if (this.arrsecAddMoreColumnDetails[addmoreCtrlIndx] == undefined) {
      //         this.arrsecAddMoreColumnDetails[addmoreCtrlIndx] = [{ 'columnName': secAddMoreTblrLoop.COLUMN_NAME, 'datatype': (secAddMoreTblrLoop.DATA_TYPE).toUpperCase(), 'defDataValue': secAddMoreTblrLoop.COLUMN_DEFAULT }]
      //       }
      //       else {
      //         this.arrsecAddMoreColumnDetails[addmoreCtrlIndx].push({ 'columnName': secAddMoreTblrLoop.COLUMN_NAME, 'datatype': (secAddMoreTblrLoop.DATA_TYPE).toUpperCase(), 'defDataValue': secAddMoreTblrLoop.COLUMN_DEFAULT });
      //       }
      //     }

      //   }
      // });
    }
  }
  setAddmoreTabularDetails(evt: any, ctlIndx: any, addMoreIndx: any) {
    let colAddMoreEvtTarget: any = evt.target as HTMLInputElement;
    let colSectedVal = colAddMoreEvtTarget.options[colAddMoreEvtTarget.selectedIndex].getAttribute('data-seccolval');
    this.addmoretablecolDetails(ctlIndx, addMoreIndx).patchValue([{
      ctrlTblColName: this.arrsecAddMoreColumnDetails[ctlIndx][colSectedVal]['columnName'],
      ctrlTblColType: this.arrsecAddMoreColumnDetails[ctlIndx][colSectedVal]['datatype'],
      ctrlTblColLength: '0',
      ctrlTblColDeafult: this.arrsecAddMoreColumnDetails[ctlIndx][colSectedVal]['defDataValue'],
      ctrlTblColprecision: 0,
      ctrlTblColConstraints: '',
      ctrlTblColParentTbl: 0,
      ctrlTblColParentTblClmName: 0,
    }]);
  }
  addChangeEventForLabel() {
    let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
    let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    setTimeout(() => {
      this.langKey = sessionUserLang;
      let labelChangeEle: any = document.getElementById('languageListH');
      labelChangeEle.addEventListener('change', () => {
        this.langKey = labelChangeEle.value;
        //  console.log();
      });
      //console.log();
    }, 1000);

  }

  setValueColumn(evt: any, ctrlIndx: any, ctrlTypeIds: any) {
    if (ctrlTypeIds == 1) {
      this.cascadingCtrlDetails(ctrlIndx).patchValue([{
        ctrlCCDValueColumnName: evt.target.value
      }
      ]);
    }
  }
  setAddMoreValueColumn(evt: any, ctrlIndx: any, addmoreIndex: any, ctrlTypeIds: any) {
    if (ctrlTypeIds == 1) {
      this.addmorecascadingCtrlDetails(ctrlIndx, addmoreIndex).patchValue([{
        ctrlCCDValueColumnName: evt.target.value
      }
      ]);

    }

  }

  // For textbox
  apiCheck(evt: any) {
    if (evt.target.checked) {
      document.getElementById(evt.target.id)?.closest('.API-div')?.querySelector('.statictableAdd')?.classList.remove('d-none');
    }
    else {
      document.getElementById(evt.target.id)?.closest('.API-div')?.querySelector('.statictableAdd')?.classList.add('d-none');
    }

  }


  getvalidationlist(attrval: any) {
    let attributetype: any = [];
    if (attrval == 0) {
      this.attributetype = [];
    }
    else {
      attributetype = environment.attributetype;
      for (let i = 0; i < attributetype.length; i++) {

        if (attributetype[i].type == attrval) {

          this.attributetype = attributetype[i].typelist



        }



      }

    }





  }
  //  this.addmorectrls.value.ctrlLabel,this.addmorectrls.value.ctrlId

  storeAddMoreCtrlDetails(ctrlTypeId: any, ctlId: any, ctrlLabel: any, addMoreCtrlId: any) {
    if (this.addMoreArrHeadingDetails[ctlId] == undefined) {
      this.addMoreArrHeadingDetails[ctlId] = [{ 'ctrlLabel': ctrlLabel, 'addMoreCtrlId': addMoreCtrlId }];
    }
    else {
      let indxAddMoreLoop: any = 0;
      let changeStatus: any = 0;
      for (let kAddMoreLoop of this.addMoreArrHeadingDetails[ctlId]) {

        if (kAddMoreLoop.addMoreCtrlId == addMoreCtrlId) {
          this.addMoreArrHeadingDetails[ctlId][indxAddMoreLoop] = { 'ctrlLabel': ctrlLabel, 'addMoreCtrlId': addMoreCtrlId };
          changeStatus = 1;
          break;
        }
        indxAddMoreLoop += 1
      }
      if (changeStatus == 0) {
        this.addMoreArrHeadingDetails[ctlId].push({ 'ctrlLabel': ctrlLabel, 'addMoreCtrlId': addMoreCtrlId });
      }
    }
  }

  addctrlMerge(ctrlIndx: any, ctrlId: any) {

    let mergeColumnlabelData: any = (<HTMLInputElement>document.getElementById("mergeColumnlabel" + ctrlIndx)).value;
    // let elm:any=(<HTMLInputElement>document.getElementById("initialColumnName"+ctrlIndx)).value;
    let elm: any = (<HTMLInputElement>document.getElementById("initialColumnName" + ctrlIndx));
    let initialColumnNameData = elm.value;
    let initialColumnNameDataText = elm.options[elm.selectedIndex].text;
    let noOfColumnsMergerdData: any = (<HTMLInputElement>document.getElementById("noOfColumnsMergerd" + ctrlIndx)).value;
    if (mergeColumnlabelData.length == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Merge Column Label can not be left blank"),
      });
      return false;
    }
    if (initialColumnNameData == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Initial Column can not be left blank"),
      });
      return false;
    }
    if (noOfColumnsMergerdData.length == 0 || noOfColumnsMergerdData == 0) {
      Swal.fire({
        icon: 'error',
        text: this.commonService.langReplace("Number of columns to be merged can not be left blank"),
      });
      return false;
    }
    //initialColumnNameDataText
    this.addmoreColumnMergeCtlDetils(ctrlIndx).value.push({ "initialColumnNameDataText": initialColumnNameDataText, "initalControlId": initialColumnNameData, "mergeCtrlLabel": mergeColumnlabelData, "noOfColumnsMerged": noOfColumnsMergerdData });

    // else
    // {
    //   this.addmoreColumnMergeCtlDetils(ctrlIndx).patchValue([{"initialColumnNameDataText":initialColumnNameDataText,"initalControlId":initialColumnNameData,"mergeCtrlLabel":mergeColumnlabelData,"noOfColumnsMerged":noOfColumnsMergerdData}]);
    // }
    this.arrColumnMergeDetails[ctrlIndx] = { "initialColumnNameDataText": "", "initalControlId": "0", "mergeCtrlLabel": "", "noOfColumnsMerged": "0" };

    (<HTMLInputElement>document.getElementById("mergeColumnlabel" + ctrlIndx)).value = "";
    (<HTMLInputElement>document.getElementById("initialColumnName" + ctrlIndx)).value = "0";
    (<HTMLInputElement>document.getElementById("noOfColumnsMergerd" + ctrlIndx)).value = "";
    return true;

  }
  deleteAddMergeColumnDetails(ctrlIndex: any, indx: any) {
    this.dynamicForm.value.formDetails[ctrlIndex].addmoreMergeColumnDetails.splice(indx, 1);
    if (this.dynamicForm.value.formDetails[ctrlIndex].addmoreMergeColumnDetails.length == 0) {
      delete this.arrColumnMergeDetails[ctrlIndex];
    }

  }
}
