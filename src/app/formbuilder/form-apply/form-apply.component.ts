import { Component, ComponentFactoryResolver, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { WebcommonservicesService } from 'src/app/services/webcommonservices.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import Swal from 'sweetalert2';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
// import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import Adapter from 'src/app/services/ckeditor-adapter';
import * as CryptoJS from 'crypto-js';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Q } from '@angular/cdk/keycodes';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-form-apply',
  templateUrl: './form-apply.component.html',
  styleUrls: ['./form-apply.component.scss'],

})
export class FormApplyComponent {
  @Input() childprocessId: any;
  @Input() fromadmin: any;
  //@Output() onInitEvent = new EventEmitter();
  arrSelectedCheckbox: any[] = [];
  @Input() processId: any = 0;
  @Input() formTemplateId: any = 0;
  @Input() intOnlineServiceIdFileEdit: any = 0;
  @Input() fileUpload: any = 0;
  @Input() createDoc: any = 0;
  @Input() fileUploadData: any = [];
  @Input() fileeList: any = [];
  @Input() createdDocument:any=0;
  @Output('fileUploadSuccess') fileUploadSuccess: EventEmitter<any> = new EventEmitter();
  intProfileId: any = 0;
  dynamicCtrlDetails: any = [];
  dynamicCtrlDetKeys: any = [];
  ctrlarray: any;
  currSecTabKey: any = 0;
  currSecId: any = 0;
  loading = false;
  onlineServiceId: any = 0;
  formName: any = '';
  arralldynVal: any[] = [];
  arrallCascadingDetails: any[] = [];
  arrCascadingBindDependtDetails: any[] = [];
  arrEventListnerDependtStatus: any = [];
  arrallStaticDependtDetails: any[] = [];
  arrallStaticBindDetails: any[] = [];
  prevdipStatus: any = 'd-none';
  // editor:any = ClassicEditor;
  ckEdtorCls = environment.ckEdiorClass;
  arrckEdtorVal: any[] = [];
  arrUploadedFiles: any[] = [];
  arrDeletedUploadedFiles: any = [];
  secDisable: any = true;
  arrCalcFields: any[] = [];
  arrAddmoreDetails: any[] = [];
  arrAddmoreFilledData: any[] = [];
  arrAddmoreElemntKeys: any[] = [];
  arrAllAddMoreFormData: any[] = [];
  tempurl = environment.tempurl;
  arrAddMoreEditData: any = [];
  editIndex: any = '';
  ckconfig: any = '';
  storagePath: any = environment.serviceURL + 'storage/app/uploads/';
  dependtCtrlArr: any[] = [];
  btnSaveNextDisableStatus = false; // if false then btn is enabled else disabled
  private _location: any;
  sessiontoken: any;
  parentDetVal: any[] = [];
  dynamickeditor: any = [];
  addMoreTddynamickeditor: any = [];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '250px',
    maxHeight: '250px',
    width: '100%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    uploadWithCredentials: false,
    uploadUrl: environment.serviceURL + 'ckEditorfileUpload'
  };

  // === ifsc Code === //
  @ViewChild('someModal') someModalRef: ElementRef;
  ifscdistrictname: any = '0';
  ifscbankname: any = '0';
  error: any;
  DistrictNames: any;
  BankNames: any;
  ifscForm: any;
  Banks: any;
  siteURL = environment.siteURL;
  apiUrl = environment.serviceURL;
  ifscSubmitted = false;
  isIFSCFlag = false;
  // === ifsc Code === //

  constructor(private router: ActivatedRoute, private WebCommonService: WebcommonservicesService, public vldChkLst: ValidatorchecklistService,
    public encDec: EncrypyDecrpyService, private route: Router,
    private modalService: NgbModal,
    private scroller: ViewportScroller,
  ) { }



  ngOnInit(): void {

    //this.userRole = SeetionParsed.USER_ROLE;
    this.secDisable = false;
    let schemeArr: any = [];
    let encSchemeId: any;
    //console.log(this.intOnlineServiceIdFileEdit);
    if (this.intOnlineServiceIdFileEdit > 0) {
      this.onlineServiceId = this.intOnlineServiceIdFileEdit;
    }
    // console.log(this.processId);
    // this.ckconfig = {
    //   // include any other configuration you want
    //   extraPlugins: [ this.customAdapterPlugin ]
    // };
    this.router.paramMap.subscribe((params: ParamMap) => {
      let encSchemeId = params.get('id')
      // console.log(encSchemeId)
      if(this.createdDocument==0){
        if (encSchemeId != "") {
          let schemeStr = this.encDec.decText(encSchemeId);
          schemeArr = schemeStr.split(':');
          //console.log(schemeArr);
          if (schemeArr[3] > 0) {
            this.processId = schemeArr[3];
            this.onlineServiceId = schemeArr[4];
            this.currSecId = schemeArr[5];
            // this.intProfileId = (schemeArr[3] == undefined) ? 0 : schemeArr[3];
            this.intProfileId = 0;
          }
  
        }
      }
      
      //console.log(this.processId);
      if (this.processId > 0) {
        let dynSchmCtrlParms = {
          'intProcessId': this.processId,
          'intOnlineServiceId': this.onlineServiceId,
          'sectionId': this.currSecId,
          'intProfileId': this.intProfileId
        }
        this.loadDynamicCtrls(dynSchmCtrlParms);
      }


    });
    //  if(this.processId==environment.helpDeskModuleProcessId)
    //   { 
    //     setTimeout(() => {
    //       this.getAdminUserData();
    //      }, 4000);

    //   }



  }

  // onReadyCkeditor(editor:any)
  // {
  //   editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader:any ) => {

  //     return new Adapter(loader, editor.config);;
  //   };
  // }

  // customAdapterPlugin(editor:any) {
  //   editor.plugins.get('FileRepository').createUploadAdapter = (loader:any) => {
  //     return new Adapter(loader, editor.config);
  //   };
  // }
  setHtmlData(data: any, idx: any) {
    let editordata = this.encDec.decodeHtml(data);
    if (this.dynamickeditor[idx] == null) {
      this.dynamickeditor[idx] = editordata;
    }

  }


  loadDynamicCtrls(dynSchmCtrlParms: any) {

    this.WebCommonService.schemeDynCtrl(dynSchmCtrlParms).subscribe(resp => {
      this.loading = true;
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.dynamicCtrlDetails = res.result;
          this.formName = res.formName;
          this.dynamicCtrlDetails = res.result;

          this.formName = res.formName;

          let arrDynmCtrlKeys = Object.keys(this.dynamicCtrlDetails); // For Section sorting
          for (let secLoop of arrDynmCtrlKeys) {
            if (secLoop == 'sec_0') {
              this.dynamicCtrlDetKeys[0] = secLoop;
              break;
            }
            this.dynamicCtrlDetKeys[Number(secLoop.split('_')[1]) - 1] = secLoop;
          }

          setTimeout(() => {
            this.loadDynamicValue();
          }, 4000);

          setTimeout(() => {

            let dynBindType: any = document.querySelectorAll("[data-dynbindflag=true]");

            for (let dynbndtype of dynBindType) {

              let dynCtrlId = dynbndtype.getAttribute('data-id');
              let dataTypeID = dynbndtype.getAttribute('data-typeid');
              this.loadDynDepend(dynCtrlId, dataTypeID);
              // let dynCtrlId         = dynbndtype.getAttribute('data-id');
              // let dynbindconditions = this.arrallCascadingDetails[dynCtrlId].ctrlCCDConditions;
              // let dynbindtbl        = this.arrallCascadingDetails[dynCtrlId].ctrlCCDTableName; 
              // let dynbindtxtclmname = this.arrallCascadingDetails[dynCtrlId].ctrlCCDTextColumnName;
              // let dynbinddependflag = dynbndtype.getAttribute('data-dynbinddependflag');
              // let dynbindvalclmn    = this.arrallCascadingDetails[dynCtrlId].ctrlCCDValueColumnName;
              // if(dynbinddependflag == 'true')
              //   {  
              //   let parms             = {
              //     'tableName'          : dynbindtbl,
              //     'columnName'         : dynbindtxtclmname+','+dynbindvalclmn,
              //     'condition'          : dynbindconditions
              //   }
              //   this.dynmaicValApi(parms,dynCtrlId);
              // }
            }
          }, 2000);
          setTimeout(() => {
            this.loadDependCtrls();
            this.setCalcFields();
            this.loadstaticDpndBndData();
            if (this.onlineServiceId > 0) {


              // For Edit Case of Dependend Fields
              let prntIds: any = document.querySelectorAll("[data-dependctrlId]");

              for (let prntDet of prntIds) {
                let prntDetFields = prntDet.getAttribute('data-dependctrlId');
                if (prntDet.getAttribute('data-dependctrlId') != 0) {
                  let parentDetailsElements: any = document.getElementsByName(prntDetFields);

                  for (let loopOfParendetails of parentDetailsElements) {
                    let dependntTypeID = loopOfParendetails.getAttribute('data-typeid');
                    //console.log(dependntTypeID);
                    if (dependntTypeID == 5) {
                      if (loopOfParendetails.checked == true) {
                        this.loadDependchkBoxDetails(loopOfParendetails);
                      }
                    }
                    else if (dependntTypeID == 6) {
                      if (loopOfParendetails.checked == true) {
                        loopOfParendetails.click();
                      }
                    }
                    else if (dependntTypeID == 3) {
                      var event = new Event('change');
                      loopOfParendetails.dispatchEvent(event);
                    }

                  }

                }


              }
              // For Edit Case of Static Dependend Fields
              // let loadStaicDependedFields:any = document.querySelectorAll("[data-dependentbindother=yes]");
              // console.log(loadStaicDependedFields);
              // for(let loopStaticDetails of loadStaicDependedFields)
              //   {
              //     console.log(loopStaticDetails);


              // if(staticTypeID == 3) // For DropDown
              // {
              //   var event = new Event('change');
              //   loopStaticDetails.dispatchEvent(event);
              // }

              // else if(staticTypeID == 6)
              //   {
              //     let staticID          = loopStaticDetails.getAttribute('data-id');
              //     let spltStaticID      = staticID.split(':');
              //     let rdStaticid        = spltStaticID[1];
              //     let rdStaticEle:any
              //     setTimeout(() => {
              //      rdStaticEle   = document.getElementsByName(rdStaticid); 
              //         for(let rdStaticEleloop of rdStaticEle)
              //        {
              //          //if(rdStaticEleloop.checked=true)
              //          // {
              //           //  alert("Rohioh");
              //            // rdStaticEleloop.click()
              //          // }

              //       }
              //     },500);



              //   }

              //    }



            }
            (<HTMLInputElement>document.getElementById('buttons')).style.display = "block";
            this.loading = false;
          }, 6000);


          if (this.currSecTabKey == 0 && this.currSecId == 0) {
            // console.log(this.dynamicCtrlDetails);
            this.currSecTabKey = this.dynamicCtrlDetKeys[0];

            this.currSecId = this.dynamicCtrlDetails[this.currSecTabKey]['sectionid'];
          }
        }
        else {
          console.log(res.messages)
        }
      } else {
        // console.log(res.messages)
      }

    });
  }


  storeCasDetials(cascadingDetails: any, id: any) {
    let cascTypeId: any = document.getElementById(id)?.getAttribute("data-typeid");
    if (Number(cascTypeId) == 3) {
      if (cascadingDetails['addmorectrlStaticOptions'] != undefined) {
        const sorter1 = (a: any, b: any) => a.ctrlCCStaticName.toLowerCase() > b.ctrlCCStaticName.toLowerCase() ? 1 : -1;
        cascadingDetails['addmorectrlStaticOptions'].sort(sorter1);
      }
      else {
        const sorter1 = (a: any, b: any) => a.ctrlCCStaticName.trim().toLowerCase() > b.ctrlCCStaticName.trim().toLowerCase() ? 1 : -1;
        cascadingDetails['ctrlStaticOptions'].sort(sorter1);
      }
      this.arrallCascadingDetails[id] = cascadingDetails;
    }
    else {
      this.arrallCascadingDetails[id] = cascadingDetails;
    }

    //   this.arrallCascadingDetails[id] = cascadingDetails;

  }
  curSelectedSec(sectionKey: any) {

    this.currSecTabKey = sectionKey;
    this.currSecId = this.dynamicCtrlDetails[sectionKey]['sectionid']
    let dynSchmCtrlParms = {
      'intProcessId': this.processId,
      'sectionId': this.currSecId,
      'intOnlineServiceId': this.onlineServiceId,
      'intProfileId': this.intProfileId
    }
    this.loadDynamicCtrls(dynSchmCtrlParms);
  }

  /* loadDependCtrls()
   {
     
     let prntIds:any = document.querySelectorAll("[data-parentflag]");
   // let prntIds:any = document.querySelectorAll("[data-dependctrlId]")
 
     for(let prntDet of prntIds)
     {
       let dependntTypeID  = prntDet.getAttribute('data-typeid');
       
       // if(prntDet.getAttribute('data-dependflagstatus') == 'false')
       // {
       //   continue;
       // }
       if(dependntTypeID ==6 || dependntTypeID ==5) // For Radio and checkbox
         {
           let id  = prntDet.name;
         
           let chldDetls :any =  document.querySelectorAll("[data-dependctrlId="+id+"]");
           prntDet.addEventListener('click', ()=>{
             for (let loopChldDet of chldDetls)
             {
               let lopdependval = loopChldDet.getAttribute('data-dependentvalue');
               lopdependval = lopdependval.split(',');
               if(lopdependval.includes(prntDet.value))
               {
                 
                 if(prntDet.checked)
                   {
                     loopChldDet.closest(".dynGridCls").classList.remove('d-none');
                     loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.remove('d-none');    
                     loopChldDet.classList.remove('d-none');
                 // loopChldDet.closest(".control-holder").querySelector('.form-group').classList.remove('d-none');
                   
                     let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).?;
                     lblEmnt?.classList.remove('d-none');
 
                    }
                     else 
                     {
                       loopChldDet.closest(".dynGridCls").classList.add('d-none');
                       loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');
                       loopChldDet.classList.remove('d-none');  
                       loopChldDet.classList.add('d-none');
                           let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).?;
                           lblEmnt?.classList.add('d-none');
                       let tpId   = loopChldDet.getAttribute('data-typeid');
                       if(tpId == 2)
                       {
                         (<HTMLInputElement>document.getElementById(loopChldDet.id)).value='';
                       }
                       else if(tpId == 3)
                       {
                         (<HTMLInputElement>document.getElementById(loopChldDet.id)).value='0';
                       }
                 
                     }
                   
             
               }
               else
               {
                 loopChldDet.closest(".dynGridCls").classList.add('d-none');
                 loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');
                 loopChldDet.classList.remove('d-none');  
                 loopChldDet.classList.add('d-none');
                     let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).?;
                     lblEmnt?.classList.add('d-none');
                 let tpId   = loopChldDet.getAttribute('data-typeid');
                 if(tpId == 2)
                 {
                   (<HTMLInputElement>document.getElementById(loopChldDet.id)).value='';
                 }
                 else if(tpId == 3)
                 {
                   (<HTMLInputElement>document.getElementById(loopChldDet.id)).value='0';
                 }
               }
               
              
 
            
             }
           });
          
         }
       
             else // For Dropdown
             {
             let chldDetls :any =  document.querySelectorAll("[data-dependctrlId="+prntDet.id+"]");
             
             prntDet.addEventListener('change', ()=>{
               
               for (let loopChldDet of chldDetls)
               {
                // console.log("Rihuittt"+loopChldDet.id);
                 let lopdependval = loopChldDet.getAttribute('data-dependentvalue');
                 lopdependval = lopdependval.split(',');
              
                 if(lopdependval.includes(prntDet.value))
                 {
                   
                //  $(loopChldDet.id).closest(".dynGridCls").removeClass('d-none')
                   loopChldDet.closest(".dynGridCls").classList.remove('d-none');
                   loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.remove('d-none');
                   // loopChldDet.closest(".control-holder").querySelector('.form-group').classList.remove('d-none');
                   loopChldDet.classList.remove('d-none');
 
                   if(loopChldDet.getAttribute('data-typeid') == 6 || loopChldDet.getAttribute('data-typeid') == 5)
                   {
                     let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
                     lblEmnt?.classList.remove('d-none')
                   
                   }
 
                 }
                else
                 {
                   // console.log(prntDet.id);
                   // console.log(loopChldDet);
                  this.hideAllChildParent(prntDet,lopdependval);
                   loopChldDet.closest(".dynGridCls").classList.add('d-none');
                   loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');
               
                   // loopChldDet.closest(".control-holder").querySelector('.form-group').classList.add('d-none');
                   loopChldDet.classList.add('d-none');
                   if(loopChldDet.getAttribute('data-typeid') == 6 || loopChldDet.getAttribute('data-typeid') == 5)
                   {
                     let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
                     lblEmnt?.classList.add('d-none');
                   }
 
                   let tpId   = loopChldDet.getAttribute('data-typeid');
                   if(tpId == 2)
                   {
                     (<HTMLInputElement>document.getElementById(loopChldDet.id)).value='';
                   }
                   else if(tpId == 3)
                   {
                     (<HTMLInputElement>document.getElementById(loopChldDet.id)).value='0';
                   }
 
                 }
 
               }
 
             });
 
           } 
 
     }
 
   }*/

  loadDependCtrls() {

    let prntIds: any = document.querySelectorAll("[data-parentflag]");
    // let prntIds:any = document.querySelectorAll("[data-dependctrlId]")

    for (let prntDet of prntIds) {
      let dependntTypeID = prntDet.getAttribute('data-typeid');
      if (dependntTypeID == 6 || dependntTypeID == 5) // For Radio and checkbox
      {
        let id = prntDet.name;

        let chldDetls: any = document.querySelectorAll("[data-dependctrlId=" + id + "]");
        prntDet.addEventListener('click', () => {
          for (let loopChldDet of chldDetls) {
            let lopdependval = loopChldDet.getAttribute('data-dependentvalue');
            lopdependval = lopdependval.split(',');
            if (lopdependval.includes(prntDet.value)) {

              if (prntDet.checked) {
                loopChldDet.closest(".dynGridCls").classList.remove('d-none');
                loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.remove('d-none');
                loopChldDet.classList.remove('d-none');
                // loopChldDet.closest(".control-holder").querySelector('small').classList.remove('d-none');

                let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
                lblEmnt?.classList.remove('d-none');

              }
              else {
                loopChldDet.closest(".dynGridCls").classList.add('d-none');
                loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');
                loopChldDet.classList.remove('d-none');
                loopChldDet.classList.add('d-none');
                let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
                lblEmnt?.classList.add('d-none');
                let tpId = loopChldDet.getAttribute('data-typeid');
                if (tpId == 2) {

                  (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '';
                }
                else if (tpId == 3) {
                  (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '0';
                }

                else if (tpId == 4) {
                  let elmle: any = (<HTMLInputElement>document.getElementById(loopChldDet.id));
                  elmle.options[elmle.selectedIndex].text = '';

                }
                else if (tpId == 5 || tpId == 6) {
                  let chckboxClear: any = (document.getElementsByName(loopChldDet.id));
                  for (let dynrdobndtype of chckboxClear) {
                    if (dynrdobndtype.checked) {
                      dynrdobndtype.checked = false;
                    }

                  }
                }

                else {

                  (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '';
                  document.getElementById('fileDownloadDiv_' + loopChldDet.id)?.querySelector('.downloadbtn')?.setAttribute('href', '');
                  document.getElementById('fileDownloadDiv_' + loopChldDet.id)?.classList.add('d-none');
                  delete this.arrUploadedFiles[loopChldDet.id];
                }

              }


            }
            else if (dependntTypeID == 6) {
              loopChldDet.closest(".dynGridCls").classList.add('d-none');
              loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');
              loopChldDet.classList.remove('d-none');
              loopChldDet.classList.add('d-none');
              let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
              lblEmnt?.classList.add('d-none');
              let tpId = loopChldDet.getAttribute('data-typeid');
              if (tpId == 2) {
                (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '';
              }
              else if (tpId == 3) {
                (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '0';
              }
              else if (tpId == 4) {
                let elmle: any = (<HTMLInputElement>document.getElementById(loopChldDet.id));
                elmle.options[elmle.selectedIndex].text = '';
              }
              else if (tpId == 5 || tpId == 6) {
                let chckboxClear: any = (document.getElementsByName(loopChldDet.id));
                for (let dynrdobndtype of chckboxClear) {
                  if (dynrdobndtype.checked) {
                    dynrdobndtype.checked = false;
                  }

                }
              }

              else {

                (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '';
                document.getElementById('fileDownloadDiv_' + loopChldDet.id)?.querySelector('.downloadbtn')?.setAttribute('href', '');
                document.getElementById('fileDownloadDiv_' + loopChldDet.id)?.classList.add('d-none');
                delete this.arrUploadedFiles[loopChldDet.id];
              }
            }




          }
        });

      }

      else // For Dropdown
      {
        let chldDetls: any = document.querySelectorAll("[data-dependctrlId=" + prntDet.id + "]");

        prntDet.addEventListener('change', () => {
          for (let loopChldDet of chldDetls) {
            let lopdependval = loopChldDet.getAttribute('data-dependentvalue');
            lopdependval = lopdependval.split(',');
            //    parentDetVal = 

            if (lopdependval.includes(prntDet.value)) {
              loopChldDet.closest(".dynGridCls").classList.remove('d-none');
              loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.remove('d-none');
              // loopChldDet.closest(".control-holder").querySelector('small').classList.remove('d-none');
              loopChldDet.classList.remove('d-none');

              if (loopChldDet.getAttribute('data-typeid') == 6 || loopChldDet.getAttribute('data-typeid') == 5) {
                let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
                lblEmnt?.classList.remove('d-none')

              }

            }
            else {
              //parentDetVal[]
              this.hideAllChildParent(prntDet, lopdependval);
              loopChldDet.closest(".dynGridCls").classList.add('d-none');
              loopChldDet.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');

              // loopChldDet.closest(".control-holder").querySelector('small').classList.add('d-none');
              loopChldDet.classList.add('d-none');
              if (loopChldDet.getAttribute('data-typeid') == 6 || loopChldDet.getAttribute('data-typeid') == 5) {
                let lblEmnt = (<HTMLInputElement>document.getElementById(loopChldDet.id)).nextElementSibling;
                lblEmnt?.classList.add('d-none');
              }

              let tpId = loopChldDet.getAttribute('data-typeid');
              if (tpId == 2) {

                (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '';
              }
              else if (tpId == 3) {
                (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '0';
              }

              else if (tpId == 4) {
                let elmle: any = (<HTMLInputElement>document.getElementById(loopChldDet.id));
                elmle.options[elmle.selectedIndex].text = '';

              }
              else if (tpId == 5 || tpId == 6) {
                let chckboxClear: any = (document.getElementsByName(loopChldDet.id));
                for (let dynrdobndtype of chckboxClear) {
                  if (dynrdobndtype.checked) {
                    dynrdobndtype.checked = false;
                  }

                }
              }

              else {
                (<HTMLInputElement>document.getElementById(loopChldDet.id)).value = '';
                document.getElementById('fileDownloadDiv_' + loopChldDet.id)?.querySelector('.downloadbtn')?.setAttribute('href', '');
                document.getElementById('fileDownloadDiv_' + loopChldDet.id)?.classList.add('d-none');
                delete this.arrUploadedFiles[loopChldDet.id];
              }

            }

          }

        });

      }

    }

  }

  loadDynamicValue() {
    let dynBindType: any = document.querySelectorAll("[data-dynbindFlag=true]");
    for (let dynbndtype of dynBindType) {
      let dynCtrlId = dynbndtype.getAttribute('data-id');
      let dynbindconditions = this.arrallCascadingDetails[dynCtrlId].ctrlCCDConditions;
      let dynbindtbl = this.arrallCascadingDetails[dynCtrlId].ctrlCCDTableName;
      let dynbindtxtclmname = this.arrallCascadingDetails[dynCtrlId].ctrlCCDTextColumnName;
      let dynbinddependflag = dynbndtype.getAttribute('data-dynbinddependflag');
      let dynbindvalclmn = this.arrallCascadingDetails[dynCtrlId].ctrlCCDValueColumnName;
      if (dynbinddependflag == 'false') // if not dependent on parent 
      {
        let parms = {
          'tableName': this.encDec.escapeHtml(dynbindtbl),
          'columnName': this.encDec.escapeHtml(dynbindtxtclmname + ',' + dynbindvalclmn),
          'condition': this.encDec.escapeHtml(dynbindconditions)
        }
        this.dynmaicValApi(parms, dynCtrlId);
      }
    }

  }
  dynmaicValApi(params: any, dynbindCtrlId: any) {
    this.WebCommonService.loadDynamicBindDetails(params).subscribe(res => {

      if (res.status == 200) {
        this.arralldynVal[dynbindCtrlId] = res.result;
      }
    });
  }

  loadDynDepend(ctrlId: any, typeId: any = 0) {

    let dynBindType: any;
    let dynBndVal: any;
    if (typeId == 5 || typeId == 6) {
      dynBindType = (document.getElementsByName(ctrlId));
      for (let dynrdobndtype of dynBindType) {
        if (dynrdobndtype.checked) {
          dynBndVal = dynrdobndtype.value;
          break;
        }


      }

    }

    else {
      dynBindType = (<HTMLInputElement>document.getElementById(ctrlId));
      dynBndVal = dynBindType.value
    }


    let bnddpndfld: any = document.querySelectorAll("[data-dynbinddependctlfldid=" + ctrlId + "]");

    for (let dynbndtype of bnddpndfld) {
      let dynCtrlId = dynbndtype.getAttribute('data-id');
      let dynbindvalclmn = this.arrallCascadingDetails[dynCtrlId].ctrlCCbinddecldClm;
      let bindconditions = (dynbindvalclmn + '=' + "'" + dynBndVal + "'");

      let dynbindconditions = this.arrallCascadingDetails[dynCtrlId].ctrlCCDConditions;
      let dynfnlBind = '';
      if (dynbindconditions.length > 0) {
        dynfnlBind = dynbindconditions + ' and ';
        //dynfnlBind   = dynbindconditions + ' and ';
      }
      dynfnlBind += bindconditions;

      if (dynbndtype.getAttribute('data-dynbinddependflag') == 'true') {
        let parms = {
          'tableName': this.encDec.escapeHtml(this.arrallCascadingDetails[dynCtrlId].ctrlCCDTableName),
          'columnName': this.encDec.escapeHtml(this.arrallCascadingDetails[dynCtrlId].ctrlCCDTextColumnName + ',' + this.arrallCascadingDetails[dynCtrlId].ctrlCCDValueColumnName),
          'condition': this.encDec.escapeHtml(dynfnlBind)
        }
        this.dynmaicValApi(parms, dynCtrlId)
      }
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

  doSchemeApply() {
    // console.log(this.dynamicCtrlDetails);
    // console.log(this.currSecTabKey);
    let schemeWiseFormDetails = this.dynamicCtrlDetails["sec_0"]['formDetails'];
    const formData = new FormData();
    let uploadFile: any;
    let validatonStatus = true;
    let validateArray: any[] = [];
    let arrJsnTxtDet: any = [];
    for (let schemeWiseFormCtr of schemeWiseFormDetails) {
      let arrAddMoreElement: any = '';
      let ctrlTypeId = schemeWiseFormCtr.ctrlTypeId;
      let elmVal: any = '';
      let elmValText: any = '';
      let elmId = schemeWiseFormCtr.ctrlId;
      let elmName = schemeWiseFormCtr.ctrlName;
      let lblName = schemeWiseFormCtr.ctrlLabel;
      let mandatoryDetails = schemeWiseFormCtr.ctrlMandatory;
      let attrType = schemeWiseFormCtr.ctrlAttributeType;
      let ctrlMaxLength = schemeWiseFormCtr.ctrlMaxLength;
      let ctrlMinLength = schemeWiseFormCtr.ctrlMinLength;
      let elmClass = schemeWiseFormCtr.ctrlClass;
      let addMoreElementData = '';
      // console.log(elmClass);
      if (ctrlTypeId == 2) // For Textbox 
      {
        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) {
          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          let dependElemVal
          if (validateArray[dependElemId] == undefined) {
            continue;
          }
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let depndAllSelectElementValues: any = [];
            let dependElem: any = document.getElementsByName(dependElemId);

            for (let i of dependElem) {

              if (i.checked) {
                depndAllSelectElementValues.push(i.value);

              }

            }

            var compareDpndFields = dependElemdCondVal.filter(function (obj: any) {
              return depndAllSelectElementValues.indexOf(obj) !== -1;
            });
            if (compareDpndFields.length == 0) {
              continue;
            }



          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
            if (!dependElemdCondVal.includes(dependElemVal)) {
              continue;
            }
          }


        }
        elmVal = (<HTMLInputElement>document.getElementById(elmId)).value;

        if (mandatoryDetails) // For Mandatory
        {

          if (!this.vldChkLst.blankCheck(elmVal, lblName + ' can not be left blank')) {
            // (<HTMLInputElement>document.getElementById(elmId)).scrollIntoView({
            //   behavior: "smooth",
            //   block: "start",
            //   inline: "nearest"
            // });
            this.scroller.scrollToAnchor(elmId);
            (<HTMLInputElement>document.getElementById(elmId)).focus();


            validatonStatus = false;
            break;
          }

        }

        if (ctrlMaxLength != '') // For Max length
        {
          if (!this.vldChkLst.maxLength(elmVal, ctrlMaxLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }
        }

        if (ctrlMinLength != '')// For Min length
        {
          if (!this.vldChkLst.minLength(elmVal, ctrlMinLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        if (attrType == 'email') // For Valid Email
        {
          if (!this.vldChkLst.validEmail(elmVal)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        else if (attrType == 'telephone') // For Valid Mobile
        {
          if (!this.vldChkLst.validMob(elmVal)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        else if (attrType == 'password') // For password Validation
        {
          if (!this.vldChkLst.validPassword(elmVal)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

      }

      else if (ctrlTypeId == 3) // For DropDown
      {
        let elm: any = (<HTMLInputElement>document.getElementById(elmId));
        elmVal = elm.value;
        elmValText = elm.options[elm.selectedIndex].text;


        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) {
          let depndAllSelectElementValues: any = [];
          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          //  console.log(dependElemdCondVal);
          // dependElemdCondVal      = dependElemdCondVal.split(',');
          let dependElemVal
          if (validateArray[dependElemId] == undefined) {
            continue;
          }
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let dependElem: any = document.getElementsByName(dependElemId);
            for (let i of dependElem) {
              if (i.checked) {
                depndAllSelectElementValues.push(i.value);
                // break;
              }

            }
            var compareDpndFields = dependElemdCondVal.filter(function (obj: any) {
              return depndAllSelectElementValues.indexOf(obj) !== -1;
            });
            if (compareDpndFields.length == 0) {
              continue;
            }
          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
            if (!dependElemdCondVal.includes(dependElemVal)) {
              continue;
            }
          }



        }

        if (mandatoryDetails) // For Mandatory
        {

          if (!this.vldChkLst.selectDropdown(elmVal, lblName)) {

            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

      }

      else if (ctrlTypeId == 4) // For TextArea
      {
        if (elmClass == this.ckEdtorCls) {
          //  console.log(elmClass);
          elmVal = (<HTMLInputElement>document.getElementById(elmId)).getAttribute("ng-reflect-model");
          // ng-reflect-model
          // console.log(elmVal);
        }
        else {
          elmVal = (<HTMLInputElement>document.getElementById(elmId)).value;
          // console.log(elmVal)
        }

        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) {
          let depndAllSelectElementValues: any = [];
          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          //  console.log(dependElemdCondVal);
          // dependElemdCondVal      = dependElemdCondVal.split(',');
          let dependElemVal
          if (validateArray[dependElemId] == undefined) {
            continue;
          }
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let dependElem: any = document.getElementsByName(dependElemId);
            for (let i of dependElem) {
              if (i.checked) {
                depndAllSelectElementValues.push(i.value);
                // break;
              }

            }
            var compareDpndFields = dependElemdCondVal.filter(function (obj: any) {
              return depndAllSelectElementValues.indexOf(obj) !== -1;
            });
            if (compareDpndFields.length == 0) {
              continue;
            }
          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
            if (!dependElemdCondVal.includes(dependElemVal)) {
              continue;
            }
          }



        }
        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.blankCheck(elmVal, lblName + ' can not be left blank')) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }
        }
        if (ctrlMaxLength != '') // For Max length
        {
          if (!this.vldChkLst.maxLength(elmVal, ctrlMaxLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }


        }

        if (ctrlMinLength != '')// For Min length
        {
          if (!this.vldChkLst.minLength(elmVal, ctrlMinLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }
      }

      else if (ctrlTypeId == 5) // For Checkbox
      {

        let chkdVal: any = '';
        let chkdTxt: any = '';
        var checkboxes: any = document.getElementsByName(elmId);




        for (var checkbox of checkboxes) {
          if (checkbox.checked) {
            if (chkdVal.length > 0) {
              chkdVal += ',' + checkbox.value;
              let el = document.querySelector(`label[for="${checkbox.id}"]`);
              chkdTxt += ',' + el?.textContent;
            }
            else {
              chkdVal += checkbox.value;
              let el = document.querySelector(`label[for="${checkbox.id}"]`);
              chkdTxt += el?.textContent;
            }

          }
        }
        elmVal = chkdVal;
        elmValText = chkdTxt;
        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) {
          let depndAllSelectElementValues: any = [];
          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          let dependElemVal
          if (validateArray[dependElemId] == undefined) {
            continue;
          }
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let dependElem: any = document.getElementsByName(dependElemId);
            for (let i of dependElem) {
              if (i.checked) {
                depndAllSelectElementValues.push(i.value);
                // break;
              }

            }
            var compareDpndFields = dependElemdCondVal.filter(function (obj: any) {
              return depndAllSelectElementValues.indexOf(obj) !== -1;
            });
            if (compareDpndFields.length == 0) {
              continue;
            }
          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
            if (!dependElemdCondVal.includes(dependElemVal)) {
              continue;
            }
          }



        }

        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.blankCheckRdoDynamic(elmId, lblName)) {
            validatonStatus = false;
            break;
          }
        }
      }

      else if (ctrlTypeId == 6) // For Radio Btn
      {
        var radioBtnElmn = document.getElementsByName(elmId);
        for (var i = 0, length = radioBtnElmn.length; i < length; i++) {
          if ((<HTMLInputElement>radioBtnElmn[i]).checked) {
            elmVal = (<HTMLInputElement>radioBtnElmn[i]).value;
            let rdId = (<HTMLInputElement>radioBtnElmn[i]).id;
            let el = document.querySelector(`label[for="${rdId}"]`);
            elmValText = el?.textContent;
          }
        }
        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) {
          let depndAllSelectElementValues: any = [];
          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          let dependElemVal
          if (validateArray[dependElemId] == undefined) {
            continue;
          }
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let dependElem: any = document.getElementsByName(dependElemId);
            for (let i of dependElem) {
              if (i.checked) {
                depndAllSelectElementValues.push(i.value);
              }

            }
            var compareDpndFields = dependElemdCondVal.filter(function (obj: any) {
              return depndAllSelectElementValues.indexOf(obj) !== -1;
            });
            if (compareDpndFields.length == 0) {
              continue;
            }
          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
            if (!dependElemdCondVal.includes(dependElemVal)) {
              continue;
            }
          }



        }
        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.blankCheckRdoDynamic(elmId, lblName)) {
            validatonStatus = false;
            break;
          }
        }
      }

      else if (ctrlTypeId == 7) {
        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) {
          let depndAllSelectElementValues: any = [];
          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          let dependElemVal
          if (validateArray[dependElemId] == undefined) {
            continue;
          }
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let dependElem: any = document.getElementsByName(dependElemId);
            for (let i of dependElem) {
              if (i.checked) {
                depndAllSelectElementValues.push(i.value);

              }

            }
            var compareDpndFields = dependElemdCondVal.filter(function (obj: any) {
              return depndAllSelectElementValues.indexOf(obj) !== -1;
            });
            if (compareDpndFields.length == 0) {
              continue;
            }
          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
            if (!dependElemdCondVal.includes(dependElemVal)) {
              continue;
            }
          }



        }
        uploadFile = this.arrUploadedFiles[elmId];
        if (mandatoryDetails) // For Mandatory
        {
          if (uploadFile == '' || uploadFile == undefined || uploadFile['fileName'] == '' || uploadFile['fileName'] == undefined) {
            Swal.fire({
              icon: 'error',
              text: 'Please upload ' + lblName
            });
            validatonStatus = false;
            break;
          }
        }
      }

      else if (ctrlTypeId == 10) //For AddMore
      {

        if (schemeWiseFormCtr['dependctrlDetails'][0]['ctrlChkDepend']) // For Dependent Check
        {

          let dependElemId = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependParent'];
          let dependElemdCondVal = schemeWiseFormCtr['dependctrlDetails'][0]['ctrlSelDependValue'];
          let dependElemVal
          // dependElemdCondVal      = dependElemdCondVal.split(',');
          if (validateArray[dependElemId]['ctrlTypeId'] == 6 || validateArray[dependElemId]['ctrlTypeId'] == 5) {
            let dependElem: any = document.getElementsByName(dependElemId);
            for (let i of dependElem) {
              if (i.checked) {
                dependElemVal = i.value;
                break;
              }

            }
          }
          else {
            dependElemVal = (<HTMLInputElement>document.getElementById(dependElemId)).value;
          }
          if (!dependElemdCondVal.includes(dependElemVal)) {
            continue;
          }

        }



        if (schemeWiseFormCtr['radioAddmoreviewtype'] == 'table') {
          let addMoreTbulrRes = this.addAddMoreArrTabularWise(schemeWiseFormCtr);
          // console.log(addMoreTbulrRes.arrAddmoreFilledTabularData);
          if (addMoreTbulrRes.validationStatus) {
            addMoreElementData = JSON.stringify(addMoreTbulrRes.arrAddmoreFilledTabularData);
          }

          else {
            validatonStatus = false;
            break;
          }


          //     console.log(addMoreElementData);

          // if(!this.addAddMoreArrTabularWise(schemeWiseFormCtr))
          //   {
          //     validatonStatus =  false;
          //     break;
          //   }
          //   else
          //   {
          // addMoreElementData = JSON.stringify(this.arrAddmoreFilledTabularData[elmId]);
          // }

        }
        else {
          let addmoreAllCtrlWiseData = this.arrAddmoreFilledData[elmId];
          if (addmoreAllCtrlWiseData == undefined) {
            addmoreAllCtrlWiseData = [];
          }
          if (!this.addMoreValidation(addmoreAllCtrlWiseData, schemeWiseFormCtr['addmoreDetails'])) {
            validatonStatus = false;
            break;
          }
          else {

            //   console.log(this.arrAddmoreFilledData[elmId]);
            addMoreElementData = JSON.stringify(this.arrAddmoreFilledData[elmId]);
            // this.sortAsc(addMoreElementData).forEach((element:any) => {
            //   element.addmoreDetails = this.sortAsc2(element.addmoreDetails);
            // });

            // addMoreElementData = JSON.stringify(this.arrAddmoreFilledData[elmId]);
          }
        }
      }


      validateArray[elmId] = {
        'ctrlValue': elmVal,
        'ctrlTypeId': ctrlTypeId
      };
      formData.append('ctrlTypeId[' + elmId + ']', ctrlTypeId);
      formData.append('ctrlId[' + elmId + ']', elmId);
      formData.append('ctrlName[' + elmId + ']', elmName);
      formData.append('lblName[' + elmId + ']', this.encDec.escapeHtml(lblName));
      formData.append('ctrlValue[' + elmId + ']', elmVal);
      // formData.append( 'ctrlValueText['+elmId+']', elmValText);
      formData.append('ctrlText[' + elmId + ']', elmValText);
      formData.append('uploadedFiles[' + elmId + ']', JSON.stringify(uploadFile));
      formData.append('addMoreElementData[' + elmId + ']', addMoreElementData);
    }

    formData.append('processId', this.processId);
    formData.append('secId', this.currSecId);
    formData.append('intOnlineServiceId', this.onlineServiceId);
    formData.append('intProfileId', this.intProfileId);
    formData.append('fileData', JSON.stringify(this.fileUploadData));

    var object: any = {};
    // formData.forEach((value, key) => object[key] = value);

    //  var json = JSON.stringify(object);
    //     let hmacFormData =  CryptoJS.HmacSHA256(this.orderFormData(formData), environment.apiHashingKey).toString();
    //     formData.append('hmacFormData', hmacFormData);

    if (validatonStatus) {
      if(this.createDoc>0){
        
        this.WebCommonService.schemeApplyFileInsert(formData).subscribe((res: any) => {
          let validationMsg = (res.result.validationMsg != '') ? res.result.validationMsg : 'error';
          if (res.status == 200) {
            this.fileUploadSuccess.emit(res.status);

          }

          else {
            Swal.fire({
              icon: 'error',
              text: validationMsg
            });
          }
        });
      }
      if (this.fileUpload > 0 && this.createDoc==0) {
        let filelistlength: any = this.fileeList.length;
        let counter: any = 0;
        // console.log(this.fileeList.length);
        if (this.fileeList.length == 0) {
          this.WebCommonService.schemeApplyEdit(formData).subscribe((res: any) => {
            let validationMsg = (res.result.validationMsg != '') ? res.result.validationMsg : 'error';
            if (res.status == 200) {
              this.fileUploadSuccess.emit(res.status);

            }

            else {
              this.fileUploadSuccess.emit(res.status);
              // Swal.fire({
              //   icon: 'error',
              //   text: validationMsg
              // });
            }
          });
        } else {
          for (let i = 0; i < this.fileeList.length; i++) {
            this.WebCommonService.schemeApplyFileInsert(formData).subscribe((res: any) => {
              let validationMsg = (res.result.validationMsg != '') ? res.result.validationMsg : 'error';
              if (res.status == 200) {
                counter++
                if (filelistlength == counter) {
                  this.fileUploadSuccess.emit(res.status);
                } else {
                  this.fileUploadSuccess.emit(res.status);
                }

              }

              else {
                Swal.fire({
                  icon: 'error',
                  text: validationMsg
                });
              }
            });
          }
        }

      } else {
        if(this.createDoc==0){
          this.WebCommonService.schemeApply(formData).subscribe((res: any) => {
            let validationMsg = (res.result.validationMsg != '') ? res.result.validationMsg : 'error';
            if (res.status == 200) {
              this.onlineServiceId = res.result.intOnlineServiceId;
              if (this.dynamicCtrlDetKeys.length > this.dynamicCtrlDetKeys.indexOf(this.currSecTabKey) + 1) {
                let latestDynCtlkeyIndex = Number(this.dynamicCtrlDetKeys.indexOf(this.currSecTabKey)) + 1
                this.currSecTabKey = this.dynamicCtrlDetKeys[latestDynCtlkeyIndex];
                this.currSecId = this.dynamicCtrlDetails[this.currSecTabKey]['sectionid'];
                this.prevdipStatus = '';
                this.secDisable = false;
                (<HTMLElement>document.getElementById("sec-tab-" + this.dynamicCtrlDetKeys[latestDynCtlkeyIndex])).click();
                // this.secDisable   = true;
              }
              else {
                let formParms = this.processId + ':' + this.onlineServiceId + ':' + 1 + ':' + this.formTemplateId;
                let encSchemeStr = this.encDec.encText(formParms.toString());
                if (this.fromadmin == 'admin') {
                  // let formParms  = this.processId+':'+0+':'+0;
                  // let encSchemeStr = this.encDec.encText(formParms.toString());
  
                  http://172.27.28.73:4200/#/admin/configuration/dynamicFormsPreview/VTJGc2RHVmtYMTlDM29tUTU2WXhDMGNadXVvZkZBNDltU3NZZmJ6SFNZcz0%3D
                  if (this.fileUpload > 0) {
  
                    // this.finalfileupload.emit(this.onlineServiceId);
                  } else {
                    this.route.navigate(['./formbuilder/dynamicFormsPreview', encSchemeStr]);
                  }
  
  
                  //       this.route.navigate(['/website/formPreview',encSchemeStr]);
                }
                else {
  
                  Swal.fire({
                    icon: 'success',
                    text: 'Success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ok'
                  }).then((result) => {
  
                    let formParms = this.processId + ':' + 0 + ':' + 0;
                    let encSchemeStr = this.encDec.encText(formParms.toString());
  
  
                    this.route.navigate(['./formbuilder/dynamicFormsview', encSchemeStr]);
                  });
  
  
                }
              }
            }
  
            else {
              Swal.fire({
                icon: 'error',
                text: validationMsg
              });
            }
          });
        }
        
      }

      console.log(this.fileUploadData);

    }
  }

  goToPrevious() {
    if ((this.dynamicCtrlDetKeys.indexOf(this.currSecTabKey) == 0) && (this.fromadmin != 'admin')) {
      this.route.navigate(['/website/servicelisting']);
    }

    else {

      let latestDynCtlkeyIndex = Number(this.dynamicCtrlDetKeys.indexOf(this.currSecTabKey)) - 1
      this.currSecTabKey = this.dynamicCtrlDetKeys[latestDynCtlkeyIndex];
      this.currSecId = this.dynamicCtrlDetails[this.currSecTabKey]['sectionid'];
      this.prevdipStatus = '';
      this.secDisable = false;
      (<HTMLElement>document.getElementById("sec-tab-" + this.dynamicCtrlDetKeys[latestDynCtlkeyIndex])).click();
      this.secDisable = true;
    }
  }

  reset() {
    if (this.currSecTabKey == 'sec_0') {
      location.reload();
      return
    }
    (<HTMLElement>document.getElementById("sec-tab-" + this.currSecTabKey)).click();
  }
  // setCkEdtorValue({ editor }: ChangeEvent , ckId:any)
  // {
  //   this.arrckEdtorVal[ckId] = editor.getData();
  // }

  setCkedtorArr(ckVal: any, ckId: any) // To set the ck editor value in array while page submit
  {
    this.arrckEdtorVal[ckId] = ckVal;
  }
  saveFileTemp(event: any, fileId: any, fileType: any, fileSize: any, fileForApproval: any, fileSizeType: any) // This function is used to save the file in temporary Folder
  {
    const target = event.target as HTMLInputElement;
    const files: any = target.files as FileList;
    const uploadedfleSize = files[0].size;
    const uploadedfileType = files[0].type;
    let validFileStatus = true;
    if (!this.vldChkLst.validateFile(uploadedfileType, fileType)) // File Type Validation Check
    {
      validFileStatus = false;
      Swal.fire({
        icon: 'error',
        text: 'invalid file type'
      });
    }
    if (!this.vldChkLst.validateFileSize(uploadedfleSize, fileSize, fileSizeType)) // File Size Validation Check
    {
      let filesizeMsg = '';
      if (fileSizeType.toLowerCase() == 'kb') {
        filesizeMsg = 'File size exceeds ' + fileSize + 'KB.';
      }
      else {
        filesizeMsg = 'File size exceeds ' + fileSize + 'MB.';
      }
      validFileStatus = false;
      Swal.fire({
        icon: 'error',
        text: filesizeMsg
      });
    }
    if (!validFileStatus) {
      (<HTMLInputElement>document.getElementById(fileId)).value = '';
      document.getElementById('fileDownloadDiv_' + fileId)?.querySelector('.downloadbtn')?.setAttribute('href', '');
      document.getElementById('fileDownloadDiv_' + fileId)?.classList.add('d-none');
      delete this.arrUploadedFiles[fileId];
      return false;
    }
    const fileData = new FormData();
    fileData.append("file", files[0]);
    fileData.append("fileType", fileType);
    fileData.append("fileSize", fileSize);
    fileData.append("fileSizeType", fileSizeType);
    this.btnSaveNextDisableStatus = true;
    this.WebCommonService.saveFileToTemp(fileData).subscribe((res: any) => {
      if (res.status == 200) {

        this.arrUploadedFiles[fileId] = { 'fileName': res.result.fileName, 'fileForApproval': fileForApproval, 'fileType': fileType };
        document.getElementById('fileDownloadDiv_' + fileId)?.querySelector('.downloadbtn')?.setAttribute('href', res.result.filePath);
        document.getElementById('fileDownloadDiv_' + fileId)?.classList.remove('d-none');
      }
      else {
        (<HTMLInputElement>document.getElementById(fileId)).value = '';
        Swal.fire({
          icon: 'error',
          text: 'error while uploading files'
        });
      }

      this.btnSaveNextDisableStatus = false;
    });
    return true;
  }

  removeFile(ctrlId: any) {
    (<HTMLInputElement>document.getElementById(ctrlId)).value = '';
    document.getElementById('fileDownloadDiv_' + ctrlId)?.querySelector('.downloadbtn')?.setAttribute('href', '');
    document.getElementById('fileDownloadDiv_' + ctrlId)?.classList.add('d-none');
    delete this.arrUploadedFiles[ctrlId];
    this.arrDeletedUploadedFiles.push(ctrlId);
  }

  showUploadFile(fileName: any, ctrlId: any, fileForApproval: any, fileType: any) {
    if (fileName != null && fileName != '' && !this.arrDeletedUploadedFiles.includes(ctrlId)) {
      document.getElementById('fileDownloadDiv_' + ctrlId)?.querySelector('.downloadbtn')?.setAttribute('href', environment.serviceURL + 'storage/app/uploads/' + fileName);
      document.getElementById('fileDownloadDiv_' + ctrlId)?.classList.remove('d-none');
      this.arrUploadedFiles[ctrlId] = { 'fileName': fileName, 'fileForApproval': fileForApproval, 'fileType': fileType };
    }
  }

  setCalcFieldValue(ctrlCalcFieldData: any, ctrlId: any) {
    this.arrCalcFields[ctrlId] = ctrlCalcFieldData;

  }
  setCalcFields() {
    let dynCalc: any = document.querySelectorAll("[data-calcflag='true']");
    for (let loopdynCalc of dynCalc) {
      (<HTMLInputElement>document.getElementById(loopdynCalc.id)).readOnly = true;
      for (let clcloop of this.arrCalcFields[loopdynCalc.id]) {

        if (clcloop.ctrlCalcFieldtype == 'fieldValue') {
          let clcElement = (<HTMLInputElement>document.getElementById(clcloop.ctrlCalcValue));
          clcElement.classList.add('clsCalcFieldChange');
          /* clcElement.addEventListener('keyup', ()=>{
             this.calculate(this.arrCalcFields[loopdynCalc.id],loopdynCalc.id);
             });*/
          clcElement.addEventListener('change', () => {
            this.calculate(this.arrCalcFields[loopdynCalc.id], loopdynCalc.id);
          });
        }

      }

    }

    // var event = new Event('change');
    //                     loopOfParendetails.dispatchEvent(event);
    return;
  }


  calculate(calcDetails: any, ctrlId: any) // This function is used for Calculation purpose 
  {
    let clc: any = 0;
    let valuate: any = '';
    for (let calcloop of calcDetails) {
      if (calcloop.ctrlCalcFieldtype == 'fieldValue') {
        let fldValue = (<HTMLInputElement>(document.getElementById(calcloop.ctrlCalcValue))).value
        clc = (fldValue.length > 0) ? fldValue : 0;
      }
      else if (calcloop.ctrlCalcFieldtype == 'constant') {
        clc = calcloop.ctrlCalcValue;
      }
      else {
        clc = calcloop.ctrlCalcValue;
      }
      valuate += clc;
    }
    (<HTMLInputElement>(document.getElementById(ctrlId))).value = eval(valuate);



    let allCalcEle: any = document.getElementsByClassName('clsCalcFieldChange');


    for (let loopCalcEle of allCalcEle) {
      var event = new Event('keyup');

      $("#" + loopCalcEle.id).trigger("change");
      // $("#"+loopCalcEle.id).trigger("keyup");
      //loopCalcEle.dispatchEvent(event);

    }

    return;

  }

  backClicked() {
    this._location.back();
  }

  setArrAddMoreDetails(ctrlId: any, addMoreparams: any) {  // This function is used to set the configured data of Add more 
    this.arrAddmoreDetails[ctrlId] = addMoreparams;
    // console.log(this.arrAddmoreDetails);
  }

  addMoreData(addMorectrlId: any) {
    let validateArray: any[] = [];
    let validatonStatus = true;
    let arrAddMoreElementWiseData: any[] = [];
    let uploadFile: any;
    let indx = 0;
    let clearAddMoreValue = [];
    for (let schemeWiseFormCtr of this.arrAddmoreDetails[addMorectrlId]) {
      let ctrlTypeId = schemeWiseFormCtr.ctrlTypeId;
      let elmVal: any = '';
      let elmValText: any = '';
      let elmId = schemeWiseFormCtr.ctrlId;
      let elmName = schemeWiseFormCtr.ctrlName;
      let lblName = schemeWiseFormCtr.ctrlLabel;
      let mandatoryDetails = schemeWiseFormCtr.ctrlMandatory;
      let attrType = schemeWiseFormCtr.ctrlAttributeType;
      let ctrlMaxLength = schemeWiseFormCtr.ctrlMaxLength;
      let ctrlMinLength = schemeWiseFormCtr.ctrlMinLength;
      let elmClass = schemeWiseFormCtr.ctrlClass;
      let bndDataType = schemeWiseFormCtr.addmorecascadingCtrlDetails[0].ctrlCCbindDatatype;
      let bndDataTypeDpndOther = schemeWiseFormCtr.addmorecascadingCtrlDetails[0].AMctrlCCbinddepentOther
      clearAddMoreValue.push({ 'elmId': elmId, 'elmtypeId': ctrlTypeId, 'elmClass': elmClass, 'bindDataType': bndDataType, 'bndDataTypeDpndOther': bndDataTypeDpndOther });
      if (ctrlTypeId == 2) // For Textbox 
      {

        elmVal = (<HTMLInputElement>document.getElementById(elmId)).value;

        if (mandatoryDetails) // For Mandatory
        {

          if (!this.vldChkLst.blankCheck(elmVal, lblName + ' can not be left blank')) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        if (ctrlMaxLength != '') // For Max length
        {
          if (!this.vldChkLst.maxLength(elmVal, ctrlMaxLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }
        }

        if (ctrlMinLength != '')// For Min length
        {
          if (!this.vldChkLst.minLength(elmVal, ctrlMinLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        if (attrType == 'email') // For Valid Email
        {
          if (!this.vldChkLst.validEmail(elmVal)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        else if (attrType == 'telephone') // For Valid Mobile
        {
          if (!this.vldChkLst.validMob(elmVal)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

        else if (attrType == 'password') // For password Validation
        {
          if (!this.vldChkLst.validPassword(elmVal)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

      }

      else if (ctrlTypeId == 3) // For DropDown
      {
        let elm: any = (<HTMLInputElement>document.getElementById(elmId));
        elmVal = elm.value;
        if (elmVal == 0 || elmVal == undefined || elmVal == '') {
          elmValText = '--';
        }
        else {
          elmValText = elm.options[elm.selectedIndex].text;
        }




        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.selectDropdown(elmVal, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }

      }

      else if (ctrlTypeId == 4) // For TextArea
      {
        if (elmClass == this.ckEdtorCls) {
          elmVal = (<HTMLInputElement>document.getElementById(elmId)).getAttribute("ng-reflect-model");
          //    elmVal   =  this.arrckEdtorVal[elmId];

        }
        else {
          elmVal = (<HTMLInputElement>document.getElementById(elmId)).value;

        }


        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.blankCheck(elmVal, lblName + ' can not be left blank')) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }
        }
        if (ctrlMaxLength != '') // For Max length
        {
          if (!this.vldChkLst.maxLength(elmVal, ctrlMaxLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }


        }

        if (ctrlMinLength != '')// For Min length
        {
          if (!this.vldChkLst.minLength(elmVal, ctrlMinLength, lblName)) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            validatonStatus = false;
            break;
          }

        }
      }

      else if (ctrlTypeId == 5) // For Checkbox
      {

        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.blankCheckRdoDynamic(elmId, lblName)) {
            validatonStatus = false;
            break;
          }
        }
        let chkdVal: any = '';
        let chkdTxt: any = '';
        var checkboxes: any = document.getElementsByName(elmId);
        for (var checkbox of checkboxes) {
          if (checkbox.checked) {
            if (chkdVal.length > 0) {
              chkdVal += ',' + checkbox.value;
              let el = document.querySelector(`label[for="${checkbox.id}"]`);
              chkdTxt += ',' + el?.textContent;
            }
            else {
              chkdVal += checkbox.value;
              let el = document.querySelector(`label[for="${checkbox.id}"]`);
              chkdTxt += el?.textContent;
            }



          }
        }
        elmVal = chkdVal.toString();
        if (chkdVal != '') {
          elmValText = chkdTxt;
        }
        else {
          elmValText = '--';
        }

      }

      else if (ctrlTypeId == 6) // For Radio Btn
      {
        if (mandatoryDetails) // For Mandatory
        {
          if (!this.vldChkLst.blankCheckRdoDynamic(elmId, lblName)) {
            validatonStatus = false;
            break;
          }
        }


        var radioBtnElmn = document.getElementsByName(elmId);



        for (var i = 0, length = radioBtnElmn.length; i < length; i++) {
          if ((<HTMLInputElement>radioBtnElmn[i]).checked) {
            elmVal = (<HTMLInputElement>radioBtnElmn[i]).value;
            let rdId = (<HTMLInputElement>radioBtnElmn[i]).id;
            if (elmVal == 0 || elmVal == undefined || elmVal == '') {
              elmValText = '--';
            }
            else {
              let el = document.querySelector(`label[for="${rdId}"]`);
              elmValText = el?.textContent;
            }




          }


        }

      }

      else if (ctrlTypeId == 7) {
        uploadFile = this.arrUploadedFiles[elmId];

        if (mandatoryDetails) // For Mandatory
        {
          if (uploadFile == '' || uploadFile == undefined) {
            (<HTMLInputElement>document.getElementById(elmId)).focus();
            Swal.fire({
              icon: 'error',
              text: 'Please upload ' + lblName
            });
            validatonStatus = false;
            break;
          }
        }
      }
      validateArray[elmId] = {
        'ctrlValue': elmVal,
        'ctrlTypeId': ctrlTypeId
      };

      arrAddMoreElementWiseData.push(
        {
          'ctrlTypeId': ctrlTypeId,
          'ctrlId': elmId,
          'ctrlName': elmName,
          'lblName': lblName,
          'ctrlValue': elmVal,
          'ctrlText': elmValText,
          'uploadFile': uploadFile,
          'editStaus': 0
        });

      indx++;
    }
    if (validatonStatus) {
      if (clearAddMoreValue.length > 0) { // Clear All the add More elements
        for (let addMoreClearloop of clearAddMoreValue) {
          if (addMoreClearloop['elmtypeId'] == 2) {
            (<HTMLInputElement>document.getElementById(addMoreClearloop['elmId'])).value = ''
          }
          else if (addMoreClearloop['elmtypeId'] == 3) {
            (<HTMLInputElement>document.getElementById(addMoreClearloop['elmId'])).value = '0';

            // if(addMoreClearloop['bindDataType'] == 'dynamic' && addMoreClearloop['bndDataTypeDpndOther'] == 0)
            //   {  
            //    console.log(this.arralldynVal[addMoreClearloop['elmId']].splice(Object.keys(this.arralldynVal).indexOf(addMoreClearloop['elmId']),500));
            //    console.log(this.arralldynVal[addMoreClearloop['elmId']]);
            //   }
            // 
          }
          else if (addMoreClearloop['elmtypeId'] == 4) {
            if (addMoreClearloop['elmClass'] == this.ckEdtorCls) {
              this.arrckEdtorVal[addMoreClearloop['elmId']] = '';
            }
            else {
              (<HTMLInputElement>document.getElementById(addMoreClearloop['elmId'])).value = '';
            }
          }

          else if (addMoreClearloop['elmtypeId'] == 5) {
            var checkboxes: any = document.getElementsByName(addMoreClearloop['elmId']);
            for (var checkbox of checkboxes) {
              if (checkbox.checked) {
                (<HTMLInputElement>document.getElementById(checkbox.id)).checked = false;
              }
            }
          }

          else if (addMoreClearloop['elmtypeId'] == 6) {
            var radioBtnElmn = document.getElementsByName(addMoreClearloop['elmId']);

            for (var i = 0, length = radioBtnElmn.length; i < length; i++) {
              if ((<HTMLInputElement>radioBtnElmn[i]).checked) {
                let rdId = (<HTMLInputElement>radioBtnElmn[i]).id;
                (<HTMLInputElement>document.getElementById(rdId)).checked = false;
              }
            }
          }

          else if (addMoreClearloop['elmtypeId'] == 7) {
            document.getElementById('fileDownloadDiv_' + addMoreClearloop['elmId'])?.querySelector('.downloadbtn')?.setAttribute('href', '');
            document.getElementById('fileDownloadDiv_' + addMoreClearloop['elmId'])?.classList.add('d-none');
            (<HTMLInputElement>document.getElementById(addMoreClearloop['elmId'])).value = '';
          }

        }
      }

      // First store using index of add more id  in this.arrAddmoreFilledData and then push it in this.arrAddmoreFilledData
      if (this.arrAddmoreFilledData[addMorectrlId] != undefined) {
        this.arrAddmoreFilledData[addMorectrlId].push(arrAddMoreElementWiseData);

      }
      else {
        this.arrAddmoreFilledData[addMorectrlId] = [arrAddMoreElementWiseData];
      }
      this.arrAddmoreElemntKeys[addMorectrlId] = (Object.keys(arrAddMoreElementWiseData));
      this.editIndex = '';
    }
    // console.log(arrAddMoreElementWiseData);
  }


  // editAddMore(event:any,ctrlId:any,indx:any)
  // {
  //   this.editIndex = indx;
  //  if(this.arrAddMoreEditData.length > 0)
  //  {
  //   this.arrAddMoreEditData = [];
  //  }
  //   this.arrAddMoreEditData.push(this.arrAddmoreFilledData[ctrlId][indx]);
  //   console.log(this.arrAddMoreEditData);
  // }
  setDynRadioBtn(dynSetVal: any, ctrlValue: any) {
    if (dynSetVal != null) {
      let arrRadioDetails = dynSetVal.toString().split(',');
      return arrRadioDetails.includes(ctrlValue)
    }
    else {
      return false;
    }
  }

  deleteAddMore(event: any, ctrlId: any, indx: any) {
    this.arrAddmoreFilledData[ctrlId].splice(indx, 1);
  }

  fillAddMoreArray(addMorectrlId: any, addMoreFormConfigData: any, addMoreFormResult: any) // when page is loaded this function set's add more array
  {
    // console.log(addMoreFormResult);
    if (addMoreFormResult[addMorectrlId] != undefined && !(Object.keys(this.arrAddmoreElemntKeys)).includes(addMorectrlId)) {
      let arrAddMoreElementWiseData = [];
      if (addMoreFormResult[addMorectrlId]['addMoreDataValue'] != '') {
        for (let addmoreloop of addMoreFormResult[addMorectrlId]['addMoreDataValue']) {
          let optAddMoreValue = '';
          arrAddMoreElementWiseData = [];
          if (addmoreloop.jsonOptTxtDetails != '' && addmoreloop.jsonOptTxtDetails != undefined) {

            optAddMoreValue = JSON.parse(addmoreloop.jsonOptTxtDetails);

            //   optVal   = 
          }
          let addMoreConfKey: number = 0;
          for (let addMoreConfigloop of addMoreFormConfigData) {
            let optVal = (optAddMoreValue != undefined) ? optAddMoreValue[addMoreConfigloop['addmoretablecolDetails'][0]['ctrlTblColName']] : '';
            arrAddMoreElementWiseData.push(
              {
                'ctrlTypeId': addMoreConfigloop.ctrlTypeId,
                'ctrlId': addMoreConfigloop.ctrlId,
                'ctrlName': addMoreConfigloop.ctrlName,
                'lblName': addMoreConfigloop.ctrlLabel,
                'ctrlValue': (addMoreConfigloop.ctrlTypeId != 7) ? addmoreloop[addMoreConfigloop['addmoretablecolDetails'][0]['ctrlTblColName']] : '',
                'ctrlText': optVal,
                'uploadFile': (addMoreConfigloop.ctrlTypeId == 7) ? { 'fileName': addmoreloop[addMoreConfigloop['addmoretablecolDetails'][0]['ctrlTblColName']], 'fileForApproval': addMoreConfigloop.ctrlForApproval, 'fileType': addMoreConfigloop.ctrlFileType }
                  : '',
                'editStaus': 1
              });
            addMoreConfKey++;
          }
          if (this.arrAddmoreFilledData[addMorectrlId] != undefined) {
            this.arrAddmoreFilledData[addMorectrlId].push(arrAddMoreElementWiseData);
          }
          else {
            this.arrAddmoreFilledData[addMorectrlId] = [arrAddMoreElementWiseData];
          }
        }
        // First store using index of add more id  in this.arrAddmoreFilledData and then push it in this.arrAddmoreFilledData
        this.arrAddmoreElemntKeys[addMorectrlId] = (Object.keys(arrAddMoreElementWiseData));

      }
    }

  }

  addMoreValidation(addmoreData: any, addmoreConfiguredData: any) {
    let arrAddMoreValdiator: any[] = [];
    let addmreValidStaus = true;

    for (let addMoreConfiguredValidatorloop of addmoreConfiguredData) {
      let addMoreerrorMsg: any = '';
      if (addMoreConfiguredValidatorloop.ctrlMandatory && addmoreData.length == 0) {
        if (addMoreConfiguredValidatorloop.ctrlTypeId == 3 || addMoreConfiguredValidatorloop.ctrlTypeId == 5 || addMoreConfiguredValidatorloop.ctrlTypeId == 6) {
          addMoreerrorMsg = 'Select ' + addMoreConfiguredValidatorloop.ctrlLabel;
          (<HTMLInputElement>document.getElementById(addMoreConfiguredValidatorloop.ctrlId)).focus();
        }
        else {
          (<HTMLInputElement>document.getElementById(addMoreConfiguredValidatorloop.ctrlId)).focus();
          addMoreerrorMsg = addMoreConfiguredValidatorloop.ctrlLabel + ' can not be left blank';
        }
        Swal.fire({
          icon: 'error',
          text: addMoreerrorMsg
        });
        addmreValidStaus = false;
        break;
      }
      arrAddMoreValdiator[addMoreConfiguredValidatorloop.ctrlId] = { 'ctrlTypeId': addMoreConfiguredValidatorloop.ctrlTypeId, 'ctrlMandatory': addMoreConfiguredValidatorloop.ctrlMandatory, 'ctrlMaxLength': addMoreConfiguredValidatorloop.ctrlMaxLength, 'ctrlMinLength': addMoreConfiguredValidatorloop.ctrlMinLength, 'ctrlAttributeType': addMoreConfiguredValidatorloop.ctrlAttributeType, 'ctrlLabel': addMoreConfiguredValidatorloop.ctrlLabel }
    }
    if (addmreValidStaus && addmoreData != undefined) {
      for (let addMoreTrDataValidatorloop of addmoreData) //TR
      {
        let addMoreValidCtrlId: any = [];
        let addMoreValidctrlName: any = [];
        let addMoreValidctrlText: any = [];
        let addMoreValidctrlTypeId: any = [];
        let addMoreValidctrlValue: any = [];
        let addMoreValideditStaus: any = [];
        let addMoreValidlblName: any = [];
        let addMoreValiduploadFile: any = [];
        for (let addMoreTdDataValidatorloop of addMoreTrDataValidatorloop) //TD
        {
          if (addMoreTdDataValidatorloop['ctrlTypeId'] == 2) // Textbox Validation
          {
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMandatory']) // For Mandatory
            {
              if (!this.vldChkLst.blankCheck(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'] + ' can not be left blank')) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMaxLength'] != '') // For Max length
            {
              if (!this.vldChkLst.maxLength(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMaxLength'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }

            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMinLength'] != '')// For Min length
            {
              if (!this.vldChkLst.minLength(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMinLength'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }

            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlAttributeType'] == 'email') // For Valid Email
            {
              if (!this.vldChkLst.validEmail(addMoreTdDataValidatorloop['ctrlValue'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }

            }

            else if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlAttributeType'] == 'telephone') // For Valid Mobile
            {
              if (!this.vldChkLst.validMob(addMoreTdDataValidatorloop['ctrlValue'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }

            else if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlAttributeType'] == 'password') // For password Validation
            {
              if (!this.vldChkLst.validPassword(addMoreTdDataValidatorloop['ctrlValue'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }

            }
          }
          else if (addMoreTdDataValidatorloop['ctrlTypeId'] == 3) // Dropdown Validation
          {
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMandatory']) // For Mandatory
            {
              if (!this.vldChkLst.selectDropdown(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }
          }
          else if (addMoreTdDataValidatorloop['ctrlTypeId'] == 4) // Text Area and ckeditor Validation
          {
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMandatory']) // For Mandatory
            {
              if (!this.vldChkLst.blankCheck(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'] + ' can not be left blank')) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }

            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMaxLength'] != '') // For Max length
            {
              if (!this.vldChkLst.maxLength(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMaxLength'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }

            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMinLength'] != '')// For Min length
            {
              if (!this.vldChkLst.minLength(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMinLength'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'])) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }
          }

          else if (addMoreTdDataValidatorloop['ctrlTypeId'] == 5) // Checkbox Validation
          {
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMandatory']) // For Mandatory
            {
              if (!this.vldChkLst.blankCheck(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'] + ' can not be left blank')) {
                addmreValidStaus = false;
                break;
              }
            }
          }

          else if (addMoreTdDataValidatorloop['ctrlTypeId'] == 6) // Radio Validation
          {
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMandatory']) // For Mandatory
            {
              if (!this.vldChkLst.blankCheck(addMoreTdDataValidatorloop['ctrlValue'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'] + ' can not be left blank')) {
                addmreValidStaus = false;
                break;
              }
            }
          }
          else if (addMoreTdDataValidatorloop['ctrlTypeId'] == 7) // File Validation
          {
            if (arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlMandatory']) // For Mandatory
            {
              if (!this.vldChkLst.blankCheck(addMoreTdDataValidatorloop['uploadFile']['fileName'], arrAddMoreValdiator[addMoreTdDataValidatorloop['ctrlId']]['ctrlLabel'] + ' can not be left blank')) {
                (<HTMLInputElement>document.getElementById(addMoreTdDataValidatorloop['ctrlId'])).focus();
                addmreValidStaus = false;
                break;
              }
            }
          }
          // Below push is used for encryption purpose
          ///   addMoreValidCtrlId.push({addMoreTdDataValidatorloop['ctrlId']});//addMoreTdDataValidatorloop['ctrlId']
          addMoreValidctrlName.push(addMoreTdDataValidatorloop['ctrlName']);
          addMoreValidctrlText.push(addMoreTdDataValidatorloop['ctrlText']);
          addMoreValidctrlTypeId.push(addMoreTdDataValidatorloop['ctrlTypeId']);
          addMoreValidctrlValue.push(addMoreTdDataValidatorloop['ctrlValue']);
          addMoreValideditStaus.push(addMoreTdDataValidatorloop['editStaus']);
          addMoreValidlblName.push(addMoreTdDataValidatorloop['lblName']);
          addMoreValiduploadFile.push(addMoreTdDataValidatorloop['uploadFile']);

        }

      }

    }
    return addmreValidStaus
  }
  setStaticDependBindArr(casDetails: any, parentCtrlId: any) // Set the static array if depended Static Details exists
  {

    if (!Object.keys(this.arrallStaticDependtDetails).includes(parentCtrlId)) {
      this.arrallStaticDependtDetails[parentCtrlId] = casDetails;
    }
  }

  loadStaticDetails(ctrlId: any, ctrlTypeId: any) // Load The depended Static Details if exist
  {

    if (Object.keys(this.arrallStaticDependtDetails).includes(ctrlId)) {
      let parnetStaticValue = ''
      if (ctrlTypeId == 6) {
        var radioBtnElmn = document.getElementsByName(ctrlId);
        // console.log(radioBtnElmn);
        for (var i = 0, length = radioBtnElmn.length; i < length; i++) {

          if ((<HTMLInputElement>radioBtnElmn[i]).checked) {
            parnetStaticValue = (<HTMLInputElement>radioBtnElmn[i]).value;
          }
        }
      }
      else {
        parnetStaticValue = (<HTMLInputElement>document.getElementById(ctrlId)).value;
      }

      if (this.arrCascadingBindDependtDetails[ctrlId] != undefined) {


        this.arrCascadingBindDependtDetails[ctrlId].splice(0, this.arrCascadingBindDependtDetails[ctrlId].length);

      }

      for (let staticCasLoop of this.arrallStaticDependtDetails[ctrlId]) {
        if (staticCasLoop['ctrlCCStaticFieldValue'] == parnetStaticValue) {
          if (this.arrCascadingBindDependtDetails[ctrlId] == undefined) {
            this.arrCascadingBindDependtDetails[ctrlId] = [{ 'ctrlCCStaticName': staticCasLoop['ctrlCCStaticName'], 'ctrlCCStaticValue': staticCasLoop['ctrlCCStaticValue'] }];
          }
          else {
            this.arrCascadingBindDependtDetails[ctrlId].push({ 'ctrlCCStaticName': staticCasLoop['ctrlCCStaticName'], 'ctrlCCStaticValue': staticCasLoop['ctrlCCStaticValue'] });
          }
        }

      }

    }
  }

  // For Add More Tabular Wise
  addAddMoreArrTabularWise(arrAllAddMoreData: any) {
    let addmreTabularValidStaus = true;
    let addMreTrIndx = 0;
    let addMreTdIndx = 0;
    let addMoreTabularElmVal: any = '';
    let addMoreTabularelmValText: any = '';
    let addMoreTabularuploadFile: any = '';
    let addMrePushDetails: any = [];
    let addMoreTabularElementCtrlId;
    let arrAddmoreFilledTabularData: any[] = [];
    for (let addMoreTrTabularLoop of arrAllAddMoreData['addmorerowdata']) //TR Loop
    {

      let rowDataName = addMoreTrTabularLoop['ctrlRowdataName']
      addMreTdIndx = 0;
      addMrePushDetails = [];

      for (let addMoreTdTabularLoop of arrAllAddMoreData['addmoreDetails']) // TD Loop
      {
        addMoreTabularElmVal = '';
        addMoreTabularuploadFile = '';
        addMoreTabularelmValText = '';
        addMoreTabularElementCtrlId = addMoreTdTabularLoop['ctrlId'] + addMreTrIndx + addMreTdIndx;
        addMreTdIndx += 1;
        if (addMoreTdTabularLoop['ctrlTypeId'] == 2) // Textbox Validation
        {
          addMoreTabularElmVal = (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).value;

          if (addMoreTdTabularLoop['ctrlMandatory']) // For Mandatory
          {
            if (!this.vldChkLst.blankCheck(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ') can not be left blank')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }

          if (addMoreTdTabularLoop['ctrlMaxLength'] != '') // For Max length
          {
            if (!this.vldChkLst.maxLength(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlMaxLength'], addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }

          if (addMoreTdTabularLoop['ctrlMinLength'] != '')// For Min length
          {
            if (!this.vldChkLst.minLength(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlMinLength'], addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }

          if (addMoreTdTabularLoop['ctrlAttributeType'] == 'email') // For Valid Email
          {
            if (!this.vldChkLst.validEmail(addMoreTabularElmVal)) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }

          }

          else if (addMoreTdTabularLoop['ctrlAttributeType'] == 'telephone') // For Valid Mobile
          {
            if (!this.vldChkLst.validMob(addMoreTabularElmVal)) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }

          else if (addMoreTdTabularLoop['ctrlAttributeType'] == 'password') // For password Validation
          {
            if (!this.vldChkLst.validPassword(addMoreTabularElmVal)) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }

          }
        }
        else if (addMoreTdTabularLoop['ctrlTypeId'] == 3) // Dropdown Validation
        {
          let elm: any = (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId));
          addMoreTabularElmVal = elm.value;
          addMoreTabularelmValText = elm.options[elm.selectedIndex].text;
          if (addMoreTdTabularLoop['ctrlMandatory']) // For Mandatory
          {
            if (!this.vldChkLst.selectDropdown(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }
        }
        else if (addMoreTdTabularLoop['ctrlTypeId'] == 4) // Text Area and ckeditor Validation
        {

          if (addMoreTdTabularLoop['ctrlClass'] == this.ckEdtorCls) {
            addMoreTabularElmVal = (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).getAttribute("ng-reflect-model");
          }
          else {
            addMoreTabularElmVal = (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).value;
          }

          if (addMoreTdTabularLoop['ctrlMandatory']) // For Mandatory
          {
            if (!this.vldChkLst.blankCheck(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')' + ' can not be left blank')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }

          if (addMoreTdTabularLoop['ctrlMaxLength'] != '') // For Max length
          {
            if (!this.vldChkLst.maxLength(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlMaxLength'], addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }

          if (addMoreTdTabularLoop['ctrlMinLength'] != '')// For Min length
          {
            if (!this.vldChkLst.minLength(addMoreTabularElmVal, addMoreTdTabularLoop['ctrlMinLength'], addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              addmreTabularValidStaus = false;
              break;
            }
          }
        }

        else if (addMoreTdTabularLoop['ctrlTypeId'] == 5) // Checkbox Validation
        {
          if (addMoreTdTabularLoop['ctrlMandatory']) // For Mandatory
          {
            if (!this.vldChkLst.blankCheckRdoDynamic(addMoreTabularElementCtrlId, addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              addmreTabularValidStaus = false;
              break;
            }
          }
          let chkdVal: any = '';
          let chkdTxt: any = '';
          var checkboxes: any = document.getElementsByName(addMoreTabularElementCtrlId);
          for (var checkbox of checkboxes) {
            if (checkbox.checked) {
              if (chkdVal.length > 0) {
                chkdVal += ',' + checkbox.value;
                let el = document.querySelector(`label[for="${checkbox.id}"]`);
                chkdTxt += ',' + el?.textContent;
              }
              else {
                chkdVal += checkbox.value;
                let el = document.querySelector(`label[for="${checkbox.id}"]`);
                chkdTxt += el?.textContent;
              }



            }
          }
          addMoreTabularElmVal = chkdVal.toString();
          addMoreTabularelmValText = chkdTxt;

        }

        else if (addMoreTdTabularLoop['ctrlTypeId'] == 6) // Radio Validation
        {
          if (addMoreTdTabularLoop['ctrlMandatory']) // For Mandatory
          {
            if (!this.vldChkLst.blankCheckRdoDynamic(addMoreTabularElementCtrlId, addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')')) {
              addmreTabularValidStaus = false;
              break;
            }
          }

          var radioBtnElmn = document.getElementsByName(addMoreTabularElementCtrlId);
          for (var i = 0, length = radioBtnElmn.length; i < length; i++) {
            if ((<HTMLInputElement>radioBtnElmn[i]).checked) {
              addMoreTabularElmVal = (<HTMLInputElement>radioBtnElmn[i]).value;
              let rdId = (<HTMLInputElement>radioBtnElmn[i]).id;
              let el = document.querySelector(`label[for="${rdId}"]`);
              addMoreTabularelmValText = el?.textContent;
            }
          }
        }
        else if (addMoreTdTabularLoop['ctrlTypeId'] == 7) // File Validation
        {

          addMoreTabularuploadFile = this.arrUploadedFiles[addMoreTabularElementCtrlId];
          if (addMoreTdTabularLoop['ctrlMandatory']) // For Mandatory
          {
            if (addMoreTabularuploadFile == '' || addMoreTabularuploadFile == undefined || addMoreTabularuploadFile['fileName'] == '' || addMoreTabularuploadFile['fileName'] == undefined) {
              (<HTMLInputElement>document.getElementById(addMoreTabularElementCtrlId)).focus();
              Swal.fire({
                icon: 'error',
                text: 'Please upload ' + addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')'
              });
              addmreTabularValidStaus = false;
              break;
            }
          }

        }

        addMrePushDetails.push(
          {
            'ctrlTypeId': addMoreTdTabularLoop['ctrlTypeId'],
            'ctrlId': addMoreTdTabularLoop['ctrlId'],
            'ctrlName': addMoreTdTabularLoop['ctrlName'],
            'lblName': addMoreTdTabularLoop['ctrlLabel'],
            'ctrlValue': addMoreTabularElmVal,
            'ctrlText': addMoreTabularelmValText,
            'uploadFile': addMoreTabularuploadFile,
            'addMoreslNo': addMoreTrTabularLoop.ctrlRowdataSlNo,
            'addMoreTabularCtrlId': addMoreTabularElementCtrlId,
            'addMoreTabularCtrlLblName': addMoreTdTabularLoop['ctrlLabel'] + ' (' + rowDataName + ')'
          });
      }


      if (!addmreTabularValidStaus) {
        break;
      }
      addMreTrIndx += 1;
      arrAddmoreFilledTabularData.push(addMrePushDetails);

    }


    return { 'validationStatus': addmreTabularValidStaus, arrAddmoreFilledTabularData: arrAddmoreFilledTabularData }

  }

  setArrhAllchildOfParent(ids: any) {
    let allParms: any = document.querySelectorAll("[data-dependctrlId=" + ids + "]");
    if (allParms.length == 0) {
      return;
    }
    else {
      for (let allParmsLoop of allParms) {

        this.parentDetVal.push(allParmsLoop.id);
        this.setArrhAllchildOfParent(allParmsLoop.id);
      }
    }
  }

  hideAllChildParent(parentDetails: any, dpndval: any) {

    let parentId = parentDetails.id;
    this.setArrhAllchildOfParent(parentId);

    for (let allChilds of this.parentDetVal) {
      let childEle: any = document.getElementById(allChilds);
      childEle.closest(".dynGridCls").classList.add('d-none');
      childEle.closest(".dynGridCls").querySelector('.dynlabel').classList.add('d-none');
      childEle.classList.add('d-none');
      let tpId = childEle.getAttribute('data-typeid');
      if (tpId == 2) {

        (<HTMLInputElement>document.getElementById(childEle.id)).value = '';
      }
      else if (tpId == 3) {
        (<HTMLInputElement>document.getElementById(childEle.id)).value = '0';
      }

      else if (tpId == 4) {
        let elmle: any = (<HTMLInputElement>document.getElementById(childEle.id));
        elmle.options[elmle.selectedIndex].text = '';

      }
      else if (tpId == 5 || tpId == 6) {
        let chckboxClear: any = (document.getElementsByName(childEle.id));
        for (let dynrdobndtype of chckboxClear) {
          if (dynrdobndtype.checked) {
            dynrdobndtype.checked = false;
          }

        }
      }

      else {
        (<HTMLInputElement>document.getElementById(childEle.id)).value = '';
        document.getElementById('fileDownloadDiv_' + childEle.id)?.querySelector('.downloadbtn')?.setAttribute('href', '');
        document.getElementById('fileDownloadDiv_' + childEle.id)?.classList.add('d-none');
        delete this.arrUploadedFiles[childEle.id];
      }
    }

    this.parentDetVal.splice(0, this.parentDetVal.length);

  }



  // ===============  GET IFSC CODE  =============== // 
  // getIFSC(){

  //   this.Banks = [];

  //  this.loading=true;
  //   let params = { };
  //  this.WebCommonService.getIfscCode(params).subscribe((res:any)=>{

  //   if(res.status=='200'){

  //     this.loading=false;
  //     this.BankNames = res.result['bankDetails'];
  //     this.DistrictNames = res.result['districtDetails'];

  //   }

  //       },
  //       (error:any) => {
  //         this.error = error
  //         this.BankNames = []
  //         this.DistrictNames = []
  //       }

  //     );
  //     this.open(this.someModalRef);


  // }

  searchIFSC() {
    let ifscdistrictname = this.ifscdistrictname;
    let ifscbankname = this.ifscbankname;
    if (ifscbankname == 0 || typeof (ifscbankname) == undefined || ifscbankname == null) {

      Swal.fire({
        icon: 'error',
        text: "Please Select Bank Name",


      });
    }
    else if (ifscdistrictname == 0 || typeof (ifscdistrictname) == undefined || ifscdistrictname == null) {

      Swal.fire({
        icon: 'error',
        text: "Please Select District Name",

      });
    }
    else {
      let params = {
        bankName: ifscbankname,
        distName: ifscdistrictname
      }
      //console.log(params)
      this.loading = true;
      // this.WebCommonService.getifscDetails(params)
      //   .subscribe(
      //     (data: any)=> {
      //       if(data.status=='200'){
      //         this.loading=false;
      //         this.Banks = data.result;

      //         this.isIFSCFlag = true;

      //       }else{
      //         this.loading=false;
      //         this.isIFSCFlag = false;
      //         Swal.fire({
      //           icon: 'error',
      //           text: data.errMsg
      //         });
      //       }

      //     },
      // (error:any) => {
      //   this.error = error
      //   this.Banks = [];
      //  // console.log(error);
      //   Swal.fire({
      //     icon: 'error',
      //     text: 'No Records Found!'
      //   });
      // }

      // );
    }

  }


  selectIFSC(ifscdistrictname: any, ifscbankname: any, branchName: any, ifscCode: any, int_Min_Account_No: any, int_Max_Account_No: any) {
    let ifscarr: any = [
      { 'itemclass': 'ifsc_branch', 'itemvalue': branchName },
      { 'itemclass': 'ifsc_code', 'itemvalue': ifscCode },
      { 'itemclass': 'ifsc_bank', 'itemvalue': ifscbankname },
      { 'itemclass': 'ifsc_dist', 'itemvalue': ifscdistrictname }
    ]

    for (let i = 0; i <= ifscarr.length; i++) {
      // console.log(ifscarr[i])
      if (document.getElementsByClassName(ifscarr[i].itemclass).length > 0) {
        let ifsc_branch_field: any = document.getElementsByClassName(ifscarr[i].itemclass)[0];
        let ifsc_branch_name: any = ifsc_branch_field.getAttribute('name');
        ifsc_branch_field.value = ifscarr[i].itemvalue;
      }
      this.modalService.dismissAll();
    }


  }


  // ===============  GET IFSC CODE  =============== // 

  open(content: any) {

    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  close(content: any) {

    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  checkAddMoreTabularkeyExists(addMoreTabularKeySlno: any, addMoreTabularId: any, addMoreTavularColumnName: any, allAddMoreTabularData: any, tabularAddMoreTypeId: any = 0, ctrlCCStaticValue: any = '', ctrlTabularFileForApproval: any = '', ctrlTabularAddMoreFileType: any = '') {
    if (allAddMoreTabularData[addMoreTabularKeySlno + addMoreTabularId] == undefined) {
      return '';
    }

    else if (tabularAddMoreTypeId == 5) // For Checkbox
    {
      return this.setDynRadioBtn(allAddMoreTabularData[addMoreTabularKeySlno + addMoreTabularId][addMoreTabularId]['addMoreDataValue'][addMoreTavularColumnName], ctrlCCStaticValue);
    }

    else if (tabularAddMoreTypeId == 7) // for file upload
    {

      this.showUploadFile(allAddMoreTabularData[addMoreTabularKeySlno + addMoreTabularId][addMoreTabularId]['addMoreDataValue'][addMoreTavularColumnName], ctrlCCStaticValue, ctrlTabularFileForApproval, ctrlTabularAddMoreFileType);
      return '';
    }

    else if (tabularAddMoreTypeId == 4 && ctrlCCStaticValue == 1) // for ckeditor  here ctrlCCStaticValue status is mantained for ckeditor  
    {
      this.setHtmlData(allAddMoreTabularData[addMoreTabularKeySlno + addMoreTabularId][addMoreTabularId]['addMoreDataValue'][addMoreTavularColumnName], ctrlTabularFileForApproval);

      // checkAddMoreTabularkeyExists
    }
    else {
      return allAddMoreTabularData[addMoreTabularKeySlno + addMoreTabularId][addMoreTabularId]['addMoreDataValue'][addMoreTavularColumnName];
    }

  }



  postFormFieldsAsJson(formData: any) {
    //Create an object from the form data entries
    let formDataObject = Object.fromEntries(formData.entries());
    // Format the plain form data as JSON
    // let formDataJsonString = JSON.stringify(formDataObject);



    return formDataObject;
  }
  orderFormData(allFormData: any) // Order Form Data
  {
    //   console.log(allFormData.entries().serialize)
    let jsnFormData = Object.fromEntries(allFormData.entries());
    let arrVal = '';

    const ordered = Object.keys(jsnFormData).sort()
      .reduce(
        (obj: any, key: any) => {

          // obj[key] = 't';//(jsnFormData[key]!='')?jsnFormData[key]:''; 

          arrVal += "|" + jsnFormData[key];
          return obj;
        },

      )
    //  console.log(arrVal);
    //   let odrdStringIfy = JSON.stringify(ordered);
    //   console.log(odrdStringIfy);
    // let result = odrdStringIfy.replace(/{|}|/gi, function (x:any) {
    //   return '';
    // });

    return arrVal;

  }

  loadDependchkBoxDetails(chkbxDetails: any) {
    let chldDetlsDpnd: any = document.querySelectorAll("[data-dependctrlId=" + chkbxDetails.name + "]");
    for (let dpndx of chldDetlsDpnd) {
      if (dpndx.getAttribute('data-dependentvalue') != chkbxDetails.value) {
        continue;
      }
      dpndx.closest(".dynGridCls").classList.remove('d-none');
      dpndx.closest(".dynGridCls").querySelector('.dynlabel').classList.remove('d-none');
      dpndx.classList.remove('d-none');
      // dpndx.closest(".control-holder").querySelector('.form-group').classList.remove('d-none');

      let lblEmnt = (<HTMLInputElement>document.getElementById(dpndx.id)).nextElementSibling;
      lblEmnt?.classList.remove('d-none');
    }
  }
  loadstaticDpndBndData() {
    let eleStaticDaata: any = document.querySelectorAll("[data-dependentbindother=yes]");
    for (let dynbndtype of eleStaticDaata) {
      let eleStaticTypeId: any = dynbndtype.getAttribute('data-typeid');

      if (eleStaticTypeId == 3) {
        let ctrlId = dynbndtype.getAttribute('data-id');
        let eleStaticDaata: any = document.querySelector("[data-id=" + this.arrallCascadingDetails[ctrlId].ctrlCCbinddepentfld + "]");
        let eleStaticCascOptns: any = this.arrallCascadingDetails[ctrlId].ctrlStaticOptions;
        let eleStaticDaataTypeId = eleStaticDaata.getAttribute('data-typeid');
        eleStaticDaata.addEventListener('change', () => {
          if (eleStaticDaataTypeId == 3) {
            let arrStaticSelectedValue: any = [];
            for (let staticDpndloop of eleStaticCascOptns) { //ctrl_01192023031924
              if (staticDpndloop.ctrlCCStaticFieldValue == eleStaticDaata.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {
                arrStaticSelectedValue.push(dynbndtype.value);
                dynbndtype?.classList.remove('d-none');

              } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                dynbndtype?.classList.add('d-none');
              }
            }
          } else if (eleStaticDaataTypeId == 5) {
            let staticEleId = eleStaticDaata.getAttribute('data-id');
            let staticEleName: any = document.getElementsByName(staticEleId);
            let arrStaticSelectedValue: any = [];
            for (let staticEleLoop of staticEleName) {
              if (staticEleLoop.checked) {
                for (let staticDpndloop of eleStaticCascOptns) {
                  if (staticDpndloop.ctrlCCStaticFieldValue == staticEleLoop.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {

                    arrStaticSelectedValue.push(dynbndtype.value);
                    dynbndtype?.classList.remove('d-none');
                  } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {

                    dynbndtype?.classList.add('d-none');
                  }

                }
              } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                dynbndtype?.classList.add('d-none');
              }
            }
          } else if (eleStaticDaataTypeId == 6) {

            let staticEleId = eleStaticDaata.getAttribute('data-id');
            let staticEleName: any = document.getElementsByName(staticEleId);
            let arrStaticSelectedValue: any = [];
            for (let staticEleLoop of staticEleName) {
              if (staticEleLoop.checked) {
                for (let staticDpndloop of eleStaticCascOptns) {
                  if (staticDpndloop.ctrlCCStaticFieldValue == staticEleLoop.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {
                    arrStaticSelectedValue.push(dynbndtype.value);
                    dynbndtype?.classList.remove('d-none');
                  } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                    dynbndtype?.classList.add('d-none');
                  }

                }
              }
            }
          }

        });
        if (this.onlineServiceId > 0) {
          var event = new Event('change');
          eleStaticDaata.dispatchEvent(event);
        }

      }
      else if (eleStaticTypeId == 5) {


        let ctrlId = dynbndtype.name;

        let eleStaticDaata: any = document.querySelector("[data-id=" + this.arrallCascadingDetails[ctrlId].ctrlCCbinddepentfld + "]");

        let eleStaticCascOptns: any = this.arrallCascadingDetails[ctrlId].ctrlStaticOptions;

        let eleStaticDaataTypeId = eleStaticDaata.getAttribute('data-typeid');

        eleStaticDaata.addEventListener('change', () => {

          let arrStaticSelectedValue: any = [];
          if (eleStaticDaataTypeId == 3) {
            let staticDashDependnt: any = document.getElementById('divStaticDpnd_' + ctrlId);

            for (let staticDpndloop of eleStaticCascOptns) {

              if (staticDpndloop.ctrlCCStaticFieldValue == eleStaticDaata.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {
                arrStaticSelectedValue.push(dynbndtype.value);
                staticDashDependnt?.classList.add('d-none');
                dynbndtype.closest('div')?.classList.remove('d-none');
                dynbndtype?.classList.remove('d-none');
                dynbndtype.nextElementSibling?.classList.remove('d-none');
                //  dynbndtype.classList.remove('d-none');
              } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {

                dynbndtype.closest('div')?.classList.add('d-none');
                dynbndtype?.classList.add('d-none');
                dynbndtype.nextElementSibling?.classList.add('d-none');

              }
              //  console.log();
            }

            // if(arrStaticSelectedValue.length == 0)
            //           {
            //             console.log(arrStaticSelectedValue);
            //             staticDashDependnt?.classList.remove('d-none');
            //           }
          } else if (eleStaticDaataTypeId == 5) {
            let staticEleId = eleStaticDaata.getAttribute('data-id');
            let staticEleName: any = document.getElementsByName(staticEleId);
            for (let staticEleLoop of staticEleName) {
              if (staticEleLoop.checked) {
                let staticDashDependnt: any = document.getElementById('divStaticDpnd_' + ctrlId);
                for (let staticDpndloop of eleStaticCascOptns) {
                  if (staticDpndloop.ctrlCCStaticValue == staticEleLoop.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {

                    arrStaticSelectedValue.push(staticEleLoop.value);
                    staticDashDependnt?.classList.add('d-none');
                    dynbndtype.closest('div')?.classList.remove('d-none');
                    dynbndtype?.classList.remove('d-none');
                    dynbndtype.nextElementSibling?.classList.remove('d-none');
                    //  dynbndtype.classList.remove('d-none');
                  } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                    dynbndtype.closest('div')?.classList.add('d-none');
                    dynbndtype?.classList.add('d-none');
                    dynbndtype.nextElementSibling?.classList.add('d-none');
                  }

                }
              } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                dynbndtype.closest('div')?.classList.add('d-none');
                dynbndtype?.classList.add('d-none');
                dynbndtype.nextElementSibling?.classList.add('d-none');
              }

            }



            // if(arrStaticSelectedValue.length == 0)
            //           {
            //             console.log(arrStaticSelectedValue);
            //             staticDashDependnt?.classList.remove('d-none');
            //           }
          } else if (eleStaticDaataTypeId == 6) {

            let staticEleId = eleStaticDaata.getAttribute('data-id');
            let staticEleName: any = document.getElementsByName(staticEleId);
            let staticDashDependnt: any = document.getElementById('divStaticDpnd_' + ctrlId);

            for (let staticEleLoop of staticEleName) {
              if (staticEleLoop.checked) {
                for (let staticDpndloop of eleStaticCascOptns) {

                  if (staticDpndloop.ctrlCCStaticFieldValue == staticEleLoop.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {

                    arrStaticSelectedValue.push(staticEleLoop.value);
                    dynbndtype.closest('div')?.classList.remove('d-none');
                    dynbndtype?.classList.remove('d-none');
                    dynbndtype.nextElementSibling?.classList.remove('d-none');
                    staticDashDependnt?.classList.add('d-none');


                    //  dynbndtype.classList.remove('d-none');
                  } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                    dynbndtype?.classList.add('d-none');
                    dynbndtype.closest('div')?.classList.add('d-none');
                    dynbndtype.nextElementSibling?.classList.add('d-none');

                  }

                }
              }
            }
          }
        });
        if (this.onlineServiceId > 0) {
          var event = new Event('change');
          eleStaticDaata.dispatchEvent(event);
        }
      } else if (eleStaticTypeId == 6) {

        let ctrlId = dynbndtype.name;

        let eleStaticDaata: any = document.querySelector("[data-id=" + this.arrallCascadingDetails[ctrlId].ctrlCCbinddepentfld + "]");

        let eleStaticCascOptns: any = this.arrallCascadingDetails[ctrlId].ctrlStaticOptions;
        let eleStaticDaataTypeId = eleStaticDaata.getAttribute('data-typeid');
        console.log(eleStaticDaataTypeId);
        eleStaticDaata.addEventListener('change', () => {

          let arrStaticSelectedValue: any = [];

          if (eleStaticDaataTypeId == 3) {
            let staticDashDependnt: any = document.getElementById('divStaticDpnd_' + ctrlId);
            let arrStaticSelectedValue: any = [];
            for (let staticDpndloop of eleStaticCascOptns) {
              if (staticDpndloop.ctrlCCStaticFieldValue == eleStaticDaata.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {
                arrStaticSelectedValue.push(dynbndtype.value);
                staticDashDependnt?.classList.add('d-none');
                dynbndtype.closest('div')?.classList.remove('d-none');
                dynbndtype?.classList.remove('d-none');
                dynbndtype.nextElementSibling?.classList.remove('d-none');
                //  dynbndtype.classList.remove('d-none');
              } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {

                dynbndtype.closest('div')?.classList.add('d-none');
                dynbndtype?.classList.add('d-none');
                // dynbndtype.nextElementSibling?.classList.add('d-none');

              }
              //  console.log();
            }

            // if(arrStaticSelectedValue.length == 0)
            //           {
            //             console.log(arrStaticSelectedValue);
            //             staticDashDependnt?.classList.remove('d-none');
            //           }
          } else if (eleStaticDaataTypeId == 5) {
            let staticEleId = eleStaticDaata.getAttribute('data-id');
            let staticEleName: any = document.getElementsByName(staticEleId);
            for (let staticEleLoop of staticEleName) {
              if (staticEleLoop.checked) {
                let staticDashDependnt: any = document.getElementById('divStaticDpnd_' + ctrlId);
                for (let staticDpndloop of eleStaticCascOptns) {
                  if (staticDpndloop.ctrlCCStaticValue == staticEleLoop.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {

                    arrStaticSelectedValue.push(staticEleLoop.value);
                    staticDashDependnt?.classList.add('d-none');
                    dynbndtype.closest('div')?.classList.remove('d-none');
                    dynbndtype?.classList.remove('d-none');
                    dynbndtype.nextElementSibling?.classList.remove('d-none');
                    //  dynbndtype.classList.remove('d-none');
                  } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                    dynbndtype.closest('div')?.classList.add('d-none');
                    dynbndtype?.classList.add('d-none');
                    dynbndtype.nextElementSibling?.classList.add('d-none');
                  }

                }
              } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                dynbndtype.closest('div')?.classList.add('d-none');
                dynbndtype?.classList.add('d-none');
                dynbndtype.nextElementSibling?.classList.add('d-none');
              }

            }



            // if(arrStaticSelectedValue.length == 0)
            //           {
            //             console.log(arrStaticSelectedValue);
            //             staticDashDependnt?.classList.remove('d-none');
            //           }
          } else if (eleStaticDaataTypeId == 6) {

            let staticEleId = eleStaticDaata.getAttribute('data-id');
            let staticEleName: any = document.getElementsByName(staticEleId);
            let staticDashDependnt: any = document.getElementById('divStaticDpnd_' + ctrlId);
            for (let staticEleLoop of staticEleName) {
              if (staticEleLoop.checked) {
                for (let staticDpndloop of eleStaticCascOptns) {

                  if (staticDpndloop.ctrlCCStaticFieldValue == staticEleLoop.value && dynbndtype.value == staticDpndloop.ctrlCCStaticValue) {

                    arrStaticSelectedValue.push(staticEleLoop.value);
                    dynbndtype.closest('div')?.classList.remove('d-none');
                    dynbndtype?.classList.remove('d-none');
                    dynbndtype.nextElementSibling?.classList.remove('d-none');
                    staticDashDependnt?.classList.add('d-none');


                    //  dynbndtype.classList.remove('d-none');
                  } else if (!(arrStaticSelectedValue.includes(dynbndtype.value))) {
                    dynbndtype?.classList.add('d-none');
                    dynbndtype.closest('div')?.classList.add('d-none');
                    dynbndtype.nextElementSibling?.classList.add('d-none');

                  }

                }
              }
            }
          }

        });
        if (this.onlineServiceId > 0) {
          var event = new Event('change');
          eleStaticDaata.dispatchEvent(event);
        }

      }
    }
  }

  getAdminUserData() {
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    if (SeetionParsed.USER_ID != 1) {
      $('.hlpDeskName').val(SeetionParsed.USER_NAME);
      $('.mobileNo').val(SeetionParsed.USER_MOBILE);
      $('.emailId').val(SeetionParsed.USER_EMAIL);

      let adminFormParms: any = { 'intDesignationId': SeetionParsed.USER_DESIGNATION };
      this.WebCommonService.getDesigantionDetails(adminFormParms).subscribe(res => {
        let desRes: any = Buffer.from(res.RESPONSE_DATA, 'base64');
        desRes = JSON.parse(desRes.toString());
        if (desRes.status == 200) {
          $('.adminDesignation').val(desRes.result.userData.VCH_DESG_NAME);
        }

        //console.log(desRes.status);
      });
    }


    console.log(SeetionParsed);
    //USER_EMAIL USER_ID USER_DESIGNATION




    // this.WebCommonService.getDesigantionDetails().subscribe(res => { 

    // });
    //let adminformParms ={'intUserId':}; 
    //   this.WebCommonService.schemeDynCtrl().subscribe(res => { 
  }
}