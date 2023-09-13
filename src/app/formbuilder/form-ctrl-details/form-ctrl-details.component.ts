import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ManageformconfigService } from 'src/app/services/manageformconfig.service';
import Swal from 'sweetalert2';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from 'ng2-ckeditor';
import { environment } from 'src/environments/environment';
import * as CryptoJS from "crypto-js";

import { Buffer } from 'buffer';

@Component({
  selector: 'app-form-ctrl-details',
  templateUrl: './form-ctrl-details.component.html',
  styleUrls: ['./form-ctrl-details.component.scss']
})
export class FormCtrlDetailsComponent implements OnInit {

  @Input() formid: any;
  @Input() gridId: any;
  @Input() finalsubmitstatus: any;
  @Output() myOutput: EventEmitter<string> = new EventEmitter();
  
  editor: any ;
  loading = false;
  sectionCtrlDtls: any;
  arrAllFormCtrls: any = [];
  arrEditFormCtrls: any = [];
  langKey: any = 'en';
  constructor(private httpClient: HttpClient,
    private router: ActivatedRoute,
    public vldChkLst: ValidatorchecklistService,
    private ManageformconfigService: ManageformconfigService,
  ) { }

  ngOnInit(): void {
    this.previewDetails(this.formid);
    // this.addChangeEventForLabel();
    this.onlyoneCheckbox();
  }
  onlyoneCheckbox() {
    setTimeout(() => {
      let checkBoxes: any = document.querySelectorAll(".check_class");
      for (let chkBoxLoop of checkBoxes) {
        chkBoxLoop.addEventListener('click', () => {
          // console.log(chkBoxLoop.id)
          this.checkOne(chkBoxLoop.id);
        });
      }

    }, 800);
  }
  checkOne(id: any) {
    let checkBoxes: any = document.querySelectorAll(".check_class");
    for (let chkBoxLoop of checkBoxes) {
      (<HTMLInputElement>document.getElementById(chkBoxLoop.id)).checked = false;
      if (chkBoxLoop.id == id) {
        (<HTMLInputElement>document.getElementById(chkBoxLoop.id)).checked = true;
      }
    }
  }
  previewDetails(formid: any) {
    this.loading = true;
    let formParams = {
      "itemId": formid,
      "sectionId": "",
      "finalsubmitStatus": ""
    };
    this.ManageformconfigService.viewFormConfig(formParams).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        console.log(res);
        if (res.status == 200) {
          this.loading = false;
          this.sectionCtrlDtls = res.result;
          console.log(res);
          this.arrEditFormCtrls = (res.workFlowFormDetails != '') ? JSON.parse(res.workFlowFormDetails.workFlowFormDetails) : '';
        } else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: "Error in database",

          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error',
        });
      }
    });
  }

  setFormCtrls(formctrls: any, ctrlId: any) {
    this.arrAllFormCtrls[ctrlId] = formctrls;

  }
  setWorkFlow(evt: any) {
    let elemId: any = evt.target.getAttribute('data-ctrlid');
    let secId: any = evt.target.getAttribute('data-secid');//data-secid
    let formParms: any = {
      'secId': secId,
      'elemId': elemId,
      'formDetails': this.arrAllFormCtrls[elemId]
    }
    this.myOutput.emit(formParms);
  }
  // addChangeEventForLabel() {
  //   let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
  //   // let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
  //   setTimeout(() => {
  //     // this.langKey = sessionUserLang;
  //     let labelChangeEle: any = document.getElementById('languageListH');
  //     labelChangeEle.addEventListener('change', () => {
  //       // this.langKey = labelChangeEle.value;

  //     });
  //   }, 1000);

  // }

}
