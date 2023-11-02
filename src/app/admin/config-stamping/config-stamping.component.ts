import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';
import { WorkflowService } from '../../services/workflow.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-config-stamping',
  templateUrl: './config-stamping.component.html',
  styleUrls: ['./config-stamping.component.scss']
})
export class ConfigStampingComponent implements OnInit {

  //\\ ======================== // Variables // ======================== //\\
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/stamping.config.json";
  letterID: any = "";
  files_dropped: File[] = [];
  loading: any = false;

  metaid: any = '';

  langKey: any = 'en';

  rdoType: any = 0;
  txtcolorpicker: any = "#000000"
  txtsetcolorpicker: any = '';
  nameList: any = [];
  selectedItems: any = '0';
  selectedEvent: any = "0";
  dropdownSettings: any = {};
  userslist: any = [];
  approvalActions: any;
  stampingImage: any = '';
  stampingText: any = '';
  fontArray: any = [];
  rotationArray: any = [];
  txtPage: any = '0';
  txtOpacity: any;
  txtRotation: any = '0';
  txtXaxis: any;
  txtYaxis: any;
  txtFontSize: any = '0';
  configId: any = 0;
  eventId: any = 0;
  showEventImage:any='';
  stampImageUploadStatus:any=0;
  //\\ ======================== // Variables // ======================== //\\

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    public commonserveice: CommonServicesService,
    private encDec: EncrypyDecrpyService,
    public authService: AuthenticationService,
    public vldChkLst: ValidatorchecklistService,
    private workFlowServices: WorkflowService
  ) { }

  ngOnInit(): void {
    this.loadconfig();
    let encSchemeId = this.router.snapshot.paramMap.get('id');
    if (encSchemeId != "") {
      let schemeStr = this.encDec.decText(encSchemeId);
      let schemeArr: any = schemeStr.split(':');
      this.configId = schemeArr[0];

      //console.log(this.letterID+'-----'+this.txtFormId+'------'+this.selFormName)
      if (this.configId != '' || this.configId != 0) {

          console.log('hi');
      }
    }
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    for (var i = 1; i < 100; i++) {
      let obj: any = {};
      obj['name'] = i + ' px ';
      obj['value'] = i;
      this.fontArray.push(obj);
    }
    for (var i = 0; i < 360; i++) {
      let obj: any = {};
      obj['name'] = i + ' Degree ';
      obj['value'] = i;
      this.rotationArray.push(obj);
    }
    this.loadEvents();
    this.getStampingConfig(this.configId,this.eventId);
  }
  //\\ ======================== // Config // ======================== //\\
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
        this.tablist = data[0].tabList;
        this.utillist = data[0].utils
        this.messaageslist = data[0].messages;
        this.title = data[0].pagetitle;
        if(this.configId )
        {
          this.title =  "Edit Stamping Configuration";
        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
  }
  //\\ ======================== // Config // ======================== //\\




  //\\ ======================== // Reset Form // ======================== //\\
  formReset() {
    this.rdoType = '';
    this.stampingImage = '';
    this.stampingText = '';
    this.txtPage = '0';
    this.txtOpacity = '';
    this.txtRotation = '0';
    this.txtXaxis = '';
    this.txtYaxis = '';
    this.txtFontSize = '0';
    this.txtcolorpicker = '#000000';
    this.selectedItems = [];
    // this.selectedEvent = "0";
    this.stampImageUploadStatus=0;
  }
  formResetEvent() {
    this.configId=0;
    this.rdoType = '';
    this.stampingImage = '';
    this.stampingText = '';
    this.txtPage = '0';
    this.txtOpacity = '';
    this.txtRotation = '0';
    this.txtXaxis = '';
    this.txtYaxis = '';
    this.txtFontSize = '0';
    this.txtcolorpicker = '#000000';
    this.selectedItems = [];
    this.showEventImage='';
    this.stampImageUploadStatus=0;
    
  }
  
  //\\ ======================== // Reset Form // ======================== //\\
  //\\ ======================== // Get meta list // ======================== //\\
  viewMetaLit(metaid: any) {



  }
  //\\ ======================== // Get Meta list // ======================== //\\


  //\\ ======================== // Create Meta // ======================== //\\
  createStamping() {
    let rdoType = this.rdoType;
    let stampingImage = this.stampingImage;
    let stampingText = this.stampingText;
    let txtPage = this.txtPage;
    let txtOpacity = this.txtOpacity;
    let txtRotation = this.txtRotation;
    let txtPosition = [{ 'x-axis': this.txtXaxis, 'y-axis': this.txtYaxis }];
    let eventList = this.selectedEvent;
    let txtFontSize = this.txtFontSize;
    let txtcolorpicker = this.txtcolorpicker;
    if (!this.vldChkLst.blankCheck(eventList, this.commonserveice.langReplace(this.messaageslist.eventList), 'selectedItems')) {

    } else if (!this.vldChkLst.blankCheck(rdoType, this.commonserveice.langReplace(this.messaageslist.rdoType), 'rdoType1')) {
      if (rdoType == 1) {
        if (!this.vldChkLst.blankCheck(stampingText, this.commonserveice.langReplace(this.messaageslist.stampingText), 'txtStampingText')) {

        }
      } else if (rdoType == 2) {
        if (!this.vldChkLst.blankCheck(stampingImage, this.commonserveice.langReplace(this.messaageslist.stampingImage), 'txtStampingImage')) {

        }
      }

    } else if (!this.vldChkLst.blankCheck(txtPage, this.commonserveice.langReplace(this.messaageslist.txtPage), 'txtPage')) {

    }
    else {
      let metaparams = {
        "configId": this.configId,
        "stampEventId": eventList,
        "stampType": rdoType,
        "stampImage": stampingImage,
        "stampText": stampingText,
        "stampPosition": txtPosition,
        "stampRotation":txtRotation,
        "stampOpacity":txtOpacity,
        "stampPage":txtPage,
        "stampTextColor":txtcolorpicker,
        "stampTextFontSize":txtFontSize,
        "imageUploadStatus":this.stampImageUploadStatus
      }
      this.loading = true;
      this.commonserveice.setStampConfiguration(metaparams).subscribe({
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
                // this.formReset();
                this.getStampingConfig(this.configId,this.eventId);
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

                this.getStampingConfig(this.configId,this.eventId);
              })

            }
            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else if (responseResult.status == 400) {

              this.loading = false;
              this.commonserveice.swalfire('error', responseResult.message)
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
  getStampingConfig(configId:any,eventId:any) {
    
      let metaparams = {
        "configId": this.configId,
        "stampEventId": eventId,
      }
      this.loading = true;
      this.commonserveice.getStampConfiguration(metaparams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;

          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)

            if (responseResult.status == 200) {
              this.loading = false;
              //console.log(responseResult.result);
              if(responseResult.result){
                this.configId=responseResult.result.configId;
                this.selectedEvent=responseResult.result.stampEventId.toString();
                this.rdoType=responseResult.result.stampType.toString();
                
                if(responseResult.result.stampPosition.length > 0) {
                  this.txtXaxis=responseResult.result.stampPosition[0]['x-axis'];
                  this.txtYaxis=responseResult.result.stampPosition[0]['y-axis'];
                }
                if(responseResult.result.stampType==1){
                  this.stampingText=responseResult.result.stampText;
                  this.showEventImage='';
                }else{
                  if(responseResult.result.stampImage){
                    this.showEventImage=responseResult.result.stampImage;
                  }
                }
                this.txtRotation=responseResult.result.stampRotation;
                this.txtOpacity=responseResult.result.stampOpacity;
                this.txtPage=responseResult.result.stampPage;
                this.txtcolorpicker=responseResult.result.stampTextColor;
                this.txtcolorpicker=responseResult.result.stampTextColor;
                this.txtsetcolorpicker=responseResult.result.stampTextColor;
                
                if(responseResult.result.stampTextFontSize){
                  this.txtFontSize=responseResult.result.stampTextFontSize;
                }else{
                  this.txtFontSize='0';
                }
              }else{
                this.formResetEvent();
              }
              
              
            }

            else if (responseResult.status == 202) {

              this.loading = false;

              Swal.fire({

                text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
              }).then((result) => {

                // this.getOcrConfig();
              })

            }
            else if (responseResult.status == 501) {

              this.authService.directlogout();
            }
            else if (responseResult.status == 400) {

              this.loading = false;
              this.commonserveice.swalfire('error', responseResult.message)
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
  //\\ ======================== // Create Meta // ======================== //\\
  setColor(txtcolorpicker: any) {
    this.txtcolorpicker = txtcolorpicker;
    this.txtsetcolorpicker = txtcolorpicker;
    console.log(txtcolorpicker);
  }
  setColorValue(color: any) {
    var reg = /^#([0-9a-f]{3}){1,2}$/i;
    //console.log(reg.test(color)); //true
    if (reg.test(color)) {
      if (color.length == 7) {
        this.txtcolorpicker = color.toString();
      }
    } else {
      this.commonserveice.swalfire('error', this.commonserveice.langReplace('Invalid Color Value'))
    }

  }
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
    this.nameList = [];
    let result = this.approvalActions;

    for (let i = 0; i < result.length; i++) {


      let obj: any = {};

      obj['itemName'] = result[i].vchActionName;
      obj['id'] = result[i].tinApprovalActionId;
      //console.log(obj)
      this.nameList.push(obj);
    }

  }
  //\\ ======================== // Eventes List // ======================== //\\ 
  loadEvents() {
    let params: any = [];
    this.workFlowServices.getEvents(params).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == '200') {


          this.approvalActions = responseResult.result;
          // console.log(this.approvalActions);
          let result = this.approvalActions;

          for (let i = 0; i < result.length; i++) {


            let obj: any = {};

            obj['itemName'] = result[i].vchActionName;
            obj['id'] = result[i].tinApprovalActionId;
            //console.log(obj)
            this.nameList.push(obj);
          }

        }

        else if ((responseResult.status == 500)) {
          this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message))

        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })



  }
  //\\ ======================== // Eventes List // ======================== //\\ 
  onSelect(event: any) {
    // console.log(event.target.files[0]);
    let newFile: FormData = new FormData();
    newFile.append('file', event.target.files[0]);
    let filetype = event.target.files[0].name;
    let splititems = filetype.split('.', 2)
    newFile.append('fileType', splititems[1])
    let params: any = [];
    this.commonserveice.stampImageUpload(newFile).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let res: any = Buffer.from(respData, 'base64');
        let responseResult = JSON.parse(res)

        if (responseResult.status == '200') {
          this.stampingImage = responseResult.result.fileName;
          this.showEventImage=responseResult.result.fileUrl;
          this.stampImageUploadStatus=1;
        }else if(responseResult.status == '400'){
          event.target.value = '';
          Swal.fire({

            text: this.commonserveice.langReplace(responseResult.message),
            icon: 'error',
          })
        } else if ((responseResult.status == 500)) {
          this.stampImageUploadStatus=0;
          this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message))

        }
      },
      error: (msg) => {
        this.authService.directlogout();
      }
    })
  }
}
