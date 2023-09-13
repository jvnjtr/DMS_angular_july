import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageformconfigService } from 'src/app/services/manageformconfig.service';
import Swal from 'sweetalert2';
import {Location} from '@angular/common';
import { CommonconfigService } from 'src/app/services/commonconfig.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent implements OnInit {

  title: any = "Form Preview";

  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/addForm.config.json";

  isSelected: boolean = true;
  sectionCtrlDtls: any;
  txtFormId: any;
  gridType: any = 1;
  formNames: any;
  txtFormName: any;
  loadcomponent: boolean = false;
  sessiontoken: any;
  userId: any;
  loading = false;
  finalsubmitsttus: any;
  arrAllFormData: any = '';
  langKey: any = 'en';
  constructor(
    private httpClient: HttpClient,
    private router: ActivatedRoute,
    private route: Router,
    public commonService: CommonconfigService,
    private ManageformconfigService: ManageformconfigService,
    private _location: Location,
    private encDec: EncrypyDecrpyService,
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    // this.addChangeEventForLabel();
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));

    this.userId = SeetionParsed.USER_ID;

    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {

      let schemeStr: any = this.encDec.decText(encSchemeId);;
      let schemeArr: any = schemeStr.split(':');
      this.txtFormId = schemeArr[0];

      this.finalsubmitsttus = schemeArr[1];
      if (this.finalsubmitsttus == undefined) {
        this.finalsubmitsttus = 0
      }
      this.gridType = schemeArr[2];
      if (this.gridType == undefined) {
        this.gridType = 1
      }

      this.getForms()



    }
  }
  GetChildData(data: any) {
    this.arrAllFormData = data;
   
  }
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {

      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;

    })
  }

  backClicked() {
    this._location.back();
  }
  gridClick(e: any) {
    this.loadcomponent = true
    this.gridType = e;


  }
  getForms() {
    this.loading = true;
    let formParams =
    {
      "moduleId": "",
      "processId": this.txtFormId
    };

    this.commonService.getFormName(formParams).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        console.log(res);
        if (res.status == 200) {
          this.formNames = res.result;
          this.loading = false;
          if (this.formNames.length > 0) {
            this.txtFormName = this.formNames[0].vchProcessName;
          }
        }else if(res.status==417){
          Swal.fire({
            icon: 'error',
            text: 'Invalid',
          });
        }
        else {
          console.log(res.messages)
        }
      }else{
        Swal.fire({
          icon: 'error',
          text: 'Invalid',
        });
      }
    });
  }

  createNewForm() {

    let formid = this.txtFormId;
    let gridType = this.gridType;

    if (gridType == '' || typeof (gridType) == undefined || gridType == null) {
      Swal.fire({
        icon: 'error',
        text: this.messaageslist.gridmsg,


      });
    }
    else {
      let formParams =
      {

        "itemId": formid,
        "finalsubmitStatus": "1",
        "gridType": gridType,
        "updatedBy": this.userId,
        "workFlowformDetails": this.arrAllFormData
      };
      Swal.fire({
        title: '',
        text: "Procced to Submit",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result: any) => {
        this.loading = true;
        if (result.isConfirmed) {
          this.ManageformconfigService.createFormConfig(formParams).subscribe((resp: any) => {
            let respData = resp.RESPONSE_DATA;
            let respToken = resp.RESPONSE_TOKEN;
            let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
            if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              res = JSON.parse(res.toString());
              if (res.status == 200) {
              this.loading = false;
                Swal.fire({
                  icon: 'success',
                  text: this.messaageslist.generateformSuccess,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                }).then((result: any) => {
                  this.route.navigate(['/formbuilder/viewManageform'])
                });
  
              }
              else if (res.status == 202) {
                this.loading = false;
                Swal.fire({
                  icon: 'success',
                  text: this.messaageslist.generateformSuccess,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                }).then((result: any) => {
                  this.route.navigate(['/formbuilder/viewManageform'])
                });
              }else if(res.status == 417){
                this.loading = false;
                Swal.fire({
                  icon: 'error',
                  text: 'Invalidaaa',
                });
              }
              else {
                Swal.fire({
                  icon: 'error',
                  text: 'Error'
  
                });
              }
            }else{
              Swal.fire({
                icon: 'error',
                text: 'Invalidfff',
              });
            }
          });
        }
      })
    }
  }

  // addChangeEventForLabel() {
  //   let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
  //   let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
  //   setTimeout(() => {
  //     this.langKey = sessionUserLang;
  //     let labelChangeEle: any = document.getElementById('languageListH');
  //     labelChangeEle.addEventListener('change', () => {
  //       this.langKey = labelChangeEle.value;
  //     });
  //   }, 1000);

  // }

}
