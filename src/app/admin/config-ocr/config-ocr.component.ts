import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-config-ocr',
  templateUrl: './config-ocr.component.html',
  styleUrls: ['./config-ocr.component.scss']
})
export class ConfigOCRComponent implements OnInit {

  //\\ ======================== // Variables // ======================== //\\
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/ocr.config.json";
  letterID: any = "";
  files_dropped: File[] = [];
  loading: any = false;
  metaid: any;
  langKey: any = 'en';
  ocrStatus: any = '';
  ocrFrequency: any;
  ocrFrequencyDuration: any = '0';

  nameList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  userslist: any = [];
  configId: any = 0;
  //\\ ======================== // Variables // ======================== //\\

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public vldChkLst: ValidatorchecklistService
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');




    }
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.nameList = [
      { 'id': 1, 'itemName': '.pdf', 'displayValue': 'pdf' },
      { 'id': 2, 'itemName': '.docx', 'displayValue': 'docx' },
      { 'id': 3, 'itemName': '.xlsx', 'displayValue': 'xlsx' },
      { 'id': 4, 'itemName': 'Images', 'displayValue': 'png' },
    ]
    this.getOcrConfig();
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




  //\\ ======================== // Reset Form // ======================== //\\
  formReset() {
    this.ocrStatus = '';
    this.ocrFrequency = '';
    this.ocrFrequencyDuration = '0';
    this.selectedItems = [];
  }
  //\\ ======================== // Reset Form // ======================== //\\
  //\\ ======================== // Get meta list // ======================== //\\

  //\\ ======================== // Get Meta list // ======================== //\\


  //\\ ======================== // Create Meta // ======================== //\\
  configOcr() {


  }
  //\\ ======================== // Create Meta // ======================== //\\
  onItemSelect(item: any) {
    this.userslist = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
    }

  }
  OnItemDeSelect(item: any) {
    this.userslist = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
    }

  }
  onSelectAll(items: any) {
    this.userslist = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
    }

  }
  onDeSelectAll(items: any) {
    this.userslist = [];
    for (let i = 0; i < this.selectedItems.length; i++) {
      this.userslist.push(this.selectedItems[i].id);
    }

  }
  createOcrConfiguration() {

    let ocrStatus = this.ocrStatus;
    let ocrFrequency = this.ocrFrequency;
    let ocrFrequencyDuration = this.ocrFrequencyDuration;
    let ocrExtension = this.selectedItems;
    if (!this.vldChkLst.blankCheck(ocrStatus, this.commonserveice.langReplace(this.messaageslist.ocrStatus), 'inlineRadio1')) {

    } else if (!this.vldChkLst.blankCheck(ocrFrequency, this.commonserveice.langReplace(this.messaageslist.ocrFrequency), 'txtFrequency')) {

    } else if (!this.vldChkLst.blankCheck(ocrFrequencyDuration, this.commonserveice.langReplace(this.messaageslist.ocrFrequencyDuration), 'txtFrequencyDuration')) {

    } else if (!this.vldChkLst.blankCheck(ocrExtension, this.commonserveice.langReplace(this.messaageslist.ocrExtension), 'selectedItems')) {
    }
    else {
      let metaparams = {
        "configId": this.configId,
        "ocrStatus": ocrStatus,
        "ocrFrequency": ocrFrequency,
        "ocrFrequencyDuration": ocrFrequencyDuration,
        "ocrExtension": ocrExtension
      }
      this.loading = true;
      this.commonserveice.setOcrConfiguration(metaparams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;

          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)

            if (responseResult.status == 200) {
              this.loading = false;
              Swal.fire({

                text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {

                this.getOcrConfig();
              })

            }

            else if (responseResult.status == 202) {

              this.loading = false;

              Swal.fire({

                text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {

                this.getOcrConfig();
              })

            }
            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else if (responseResult.status == 400) {

              this.loading = false;
              this.commonserveice.swalfire('error', responseResult.message.metaName[0])
            }
            else {
              this.loading = false;
              this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))

            }
          }
          else {
            this.loading = false;
            this.authService.directlogout();
          }
        },
        error: (msg) => {
          this.authService.directlogout();
        }
      })

    }
  }
  getOcrConfig() {
    let metaparams = {
      "configId": this.configId,
    }
    this.loading = true;
    this.commonserveice.getOcrConfiguration(metaparams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;

        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          let responseResult = JSON.parse(res)

          if (responseResult.status == 200) {
            this.loading = false;
           // console.log(responseResult.result);
            this.configId = responseResult.result.configId;
            this.ocrStatus = responseResult.result.ocrStatus.toString();
            this.ocrFrequency = responseResult.result.ocrFrequency;
            this.ocrFrequencyDuration = responseResult.result.ocrFrequencyDuration;
            this.selectedItems = responseResult.result.ocrExtension;
          }

          else if (responseResult.status == 202) {

            this.loading = false;

            Swal.fire({

              text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok'
            }).then((result) => {

              this.formReset();
              this.route.navigate(['/admin/viewMeta'])
            })

          }
          else if (responseResult.status == 501) {

            this.authService.directlogout();
          }
          else if (responseResult.status == 400) {

            this.loading = false;
            this.commonserveice.swalfire('error', responseResult.message.metaName[0])
          }
          else {
            this.loading = false;
            this.commonserveice.swalfire('error', this.commonserveice.langReplace(environment.somethingWrong))

          }
        }
        else {
          this.loading = false;
          this.authService.directlogout();
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
  }
}
