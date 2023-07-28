/// <reference types="@types/ckeditor" />
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MsgengineLibService } from '../msgengine-lib.service';
import { ValidatorchecklistService } from '../validationchecklist.service';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import { CKEditorComponent } from 'ng2-ckeditor';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import { VarlistService } from '../varlist.service';

@Component({
  selector: 'lib-addmsgengine',
  templateUrl: './addmsgengine.component.html',
  styleUrls: ['./addmsgengine.component.css']
})
export class AddmsgengineComponent implements OnInit {
  // @ViewChild(CkeditornewComponent, { static: false }) CkeditornewComponent: CkeditornewComponent | undefined;
  // siteUrl = this.varlist.siteURL;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any = {
      "successMsg": "New Message Generated Successfully",
      "updatesuccessMsg": "Updated Successfully",
      "errorMsg": "Error in Message creation",
      "configtype": "Configuration Type",
      "formnames": "Please a Select Form Name",
      "smsTempId": "Please Enter smsTempId",
      "messageType": "Message Type",
      "eventType": " a Event ",
      "smsSubject": "Please Enter SMS Subject",
      "smscontent": "Please Enter SMS content",
      "intMailTemplate": "Template",
      "intDocumentType": "Document Type",
      "vchDocument": "Please Choose a Document",
      "vchLanguage": "Please Choose a Language",
      "emailId": "Please Enter email id key",
      "to": "Please select to",
      "mobileNo": "Please enter mobile no key",
      "gateWayDetails": "Configuration",
      "formtype": "Form Name"
  };
  @ViewChild("myckeditor") ckeditor: CKEditorComponent;
  ckeConfig: any;

  jsonurl: any = [{
      "pagetitle": "Add Message Engine",
      "tabList": [

          {
              "tabName": "Add",
              "tabUrl": "",
              "tabClass": "active add d-none"
          },
          {
              "tabName": "Edit",
              "tabUrl": "",
              "tabClass": "active edit d-none"
          },
          {
              "tabName": "View",
              "tabUrl": "../viewmessageengine"
          },
          {
              "tabName": "Reminder",
              "tabUrl": "../viewmessagereminder"
          }
      ],
      "utils": [{
              "utilName": "mandatory"
          },
          {
              "utilName": "back"
          }

      ],

  }];
  messageId: any = "";
  txtFormId: any=0;
  formNameslist: any;
  configtype: any = 0;
  smsTempId: any = '';
  smsSubject: any = '';
  messageContent: any = '';
  messageType: any = 0;
  eventType: any = 0;
  formnames: any = 0;
  intMailTemplate: any = 0;
  fileType: any = 0;
  documentFile: any = '';
  documentUrl: any;
  sessiontoken: any;
  userId: any;
  messageList: any;
  txtProcessName: any;
  selFormName: any = 0;
  keysArray: any;
  StatickeysArray: any;
  vchLanguage: any = 0;
  languageList: any;
  langKey: any = 'en';
  mailsmstoApplicant: any = 0;
  mailsmstoAuthority: any = 0;
  emailId: any = '';
  mobileNo: any = '';
  gatewayconfigDetails: any = '';
  gateWayconfigtype: any = 0;
  getStaticConfigurationKeys: any;
  fileeList: any = [];
  formenable: any;
  dynamicForm:any;
  selformId:any=0;


  constructor(private route: Router,
      private router: ActivatedRoute,
      private httpClient: HttpClient,
      public vldChkLst: ValidatorchecklistService,
      private encDec: EncrypyDecrpyService,
      public commonserveice: MsgengineLibService,
      private varlist: VarlistService) {
      this.ckeConfig = this.varlist.ckconfig
      this.formenable = this.varlist.formEnable;
      this.dynamicForm = this.varlist.dynamicForm;

      
  }

  ngOnInit(): void {

      this.loadconfig();
      if(this.varlist.formEnable == true){
        this.getForms();
      }
      else{
        this.txtFormId=this.varlist.formId
      }
     
      this.getLanguage();
      this.getStaticFormKeys();
      //this.addChangeEventForLabel();
      this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    //  console.log(this.sessiontoken)
    let SeetionParsed:any;
    if(this.varlist.sessionEncrypted == true){
        SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
        
    }
    else{
        SeetionParsed =JSON.parse(this.sessiontoken)
    }
     

      this.userId = SeetionParsed.USER_ID;
      
      let encSchemeId = this.router.snapshot.paramMap.get('id');

      if (encSchemeId != "") {
          let schemeStr = this.encDec.decText(encSchemeId);
         
          let schemeArr: any = schemeStr.split(':');

          this.messageId = schemeArr[0];
          this.txtFormId = schemeArr[1];
          this.txtProcessName = schemeArr[2];
          this.formnames = this.txtFormId;
          if (this.messageId != '' || this.messageId != 0) {
              this.getMessageinfo();
              this.getFormKeys();
          }
      }




  }
  changedocType() {
      this.fileeList = [];
      this.documentFile = '';
      this.documentUrl = '';
  }
  loadconfig() {
      this.tablist = this.jsonurl[0].tabList;
      this.utillist = this.jsonurl[0].utils
      if (this.messageId == "") {
          this.title = this.multilingual(this.jsonurl[0].pagetitle);
      } else {
          this.title = "Edit Message Engine";
      }
     
  }
  multilingual(test: any) {
      return test;
  };

  getForms() {
    let params={}
       this.commonserveice.getForms(params).subscribe((resp: any) => {
         let respData = resp.RESPONSE_DATA;
         let respToken = resp.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          //console.log('res');
          if (res.status === 200) {
            this.formNameslist = res.result;
           
          }
          else {
            console.log(res.messages)
          }
        } else {
          Swal.fire({
            icon: 'error',
             text:this.commonserveice.langReplace(this.varlist.invalidResponse),
          });
        }

       });
  }




  //\\ ======================== // Temp Uplaoad On select // ======================== //\\
  onSelect(event: any) {

      if (!this.vldChkLst.selectDropdown(this.fileType, this.messaageslist.intDocumentType)) {} else {


          let newFile: FormData = new FormData();

          let filetype: any = event.addedFiles[0].name;
          let filesize: any = event.addedFiles[0].size;
          let splititems: any = filetype.split('.', 2)
        
          if ((this.fileType == 1) && !(splititems[1] == 'mp3' || splititems[1] == 'mpeg')) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace("Only accept mp3 and mpeg file"),
              });
          } else if ((this.fileType == 1) && (filesize > 1024 * 1024 * 5)) {

              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace("Max allow file size 5 MB"),

              });
          } else if ((this.fileType == 2) && !(splititems[1] == 'mp4' || splititems[1] == 'wmv' || splititems[1] == 'webm')) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace("Only mp4,wmv, webm file"),
              });
          } else if ((this.fileType == 2) && (filesize > 131072 * 10)) {

              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace("Max allow file size 10 MB"),

              });
          } else if ((this.fileType == 3) && !(splititems[1] == 'jpeg' || splititems[1] == 'jpg' || splititems[1] == 'png')) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace("Only Upload .jpg, .jpeg, .png file"),
              });
          } else if ((this.fileType == 3) && (filesize > 131072)) {
              Swal.fire({
                  icon: 'error',
                  text: this.commonserveice.langReplace("Max allow file size 1 MB"),

              });
          } else {
              newFile.append('file', event.addedFiles[0])
              newFile.append('fileType', splititems[1])
              console.log(filesize);
              this.commonserveice.msguploadFile(newFile).subscribe((response: any) => {


                      let respData = response.RESPONSE_DATA;
                      let respToken = response.RESPONSE_TOKEN;

                      let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                      if (respToken == verifyToken) {
                          let res: any = Buffer.from(respData, 'base64');
                          let responseResult = JSON.parse(res)

                          if (responseResult.status == 200) {

                              //  this.files_dropped.push(event.addedFiles);
                              let obj: any = {};
                              obj['fileName'] = responseResult.result.fileName;
                              obj['filePath'] = responseResult.result.filePath;
                              obj['fileType'] = responseResult.result.fileType;
                              this.fileeList.push(obj)

                              this.documentFile = responseResult.result.fileName;
                             

                          } else if (responseResult.status == 400) {
                              Swal.fire({
                                  icon: 'error',
                                  text: responseResult.message,

                              });
                          }  else {

                            
                            this.commonserveice.directlogoutlib()
                          }
                      } else {
                          //   this.loading = false;
                          Swal.fire({
                              icon: 'error',
                               text:this.commonserveice.langReplace(this.varlist.invalidResponse),

                          });
                      }




                  },
                  (error: any) => {
                      this.commonserveice.directlogoutlib()
                  })
          }


      }
      //console.log(event.addedFiles);



  }
  //\\ ======================== // Temp Uplaoad On select // ======================== //\\

  onRemove(event: any) {
      this.fileeList.splice(this.fileeList.indexOf(event), 1);
      // this.previewFile=false;
      //this.resetform()
  }

  //\\ ======================== // Get file Type // ======================== //\\
  getfiletypeicon(ftype: any) {


      let icon: any;
      if (ftype == 'pdf') {
          icon = 'bi-file-pdf text-danger';
      } else if (ftype == 'jpg' || ftype == 'jpeg' || ftype == 'png' || ftype == 'gif') {
          icon = 'bi-card-image';
      } else if (ftype == 'mp4' || ftype == 'mkv') {
          icon = 'bi-camera-video';
      } else if (ftype == 'mp3' || ftype == 'WAV') {
          icon = 'bi-file-earmark-music';
      } else if (ftype == 'doc' || ftype == 'docx') {
          icon = 'bi-filetype-doc text-primary';
      } else if (ftype == 'ppt' || ftype == 'pptx') {
          icon = 'bi-filetype-ppt text-danger';
      } else if (ftype == 'xls' || ftype == 'xlsx' || ftype == 'ods') {
          icon = 'bi-filetype-xls text-success';
      } else if (ftype == 'zip') {
          icon = 'bi-file-zip text-warning';
      } else {
          icon = 'bi-folder-fill text-warning';
      }
      return icon;

  }
  //\\ ======================== // Get file Type // ======================== //\\
  newGenerateMessage() {

      // this.messageContent = this.CkeditornewComponent.ckdesc;
      let configtypeVal = this.configtype;
      let smsTempIdVal = this.smsTempId;
      let messageTypeVal = this.messageType;
      let eventTypeVal = this.eventType;
      let smsSubjectVal = this.smsSubject;
      //console.log('smsSubjectVal');
      let messageContentVal = this.messageContent;
      let intMailTemplateVal = this.intMailTemplate;
      let intDocumentType = this.fileType;
      let vchDocument = this.documentFile;
      let vchLanguage = this.vchLanguage;


      
   if ((this.varlist.formEnable == true) && (this.varlist.dynamicForm == true) && (!this.vldChkLst.blankCheck(this.formnames, this.commonserveice.langReplace(this.messaageslist.formnames)))) {}
       else if (!this.vldChkLst.selectDropdown(configtypeVal, this.commonserveice.langReplace(this.messaageslist.configtype),'configtype')) {} 
       else if (!this.vldChkLst.selectDropdown(this.gateWayconfigtype, this.commonserveice.langReplace(this.messaageslist.gateWayDetails),'gatewayConfigurationType')) {} 
       else if (!this.vldChkLst.selectDropdown(this.messageType, this.commonserveice.langReplace(this.messaageslist.messageType),'messageType')) {} 
       else if (!this.vldChkLst.blankCheck(vchLanguage, this.commonserveice.langReplace(this.messaageslist.vchLanguage),'vchLanguage')) {} 
       else if ((configtypeVal == 2) && (!this.vldChkLst.blankCheck(this.smsTempId, this.commonserveice.langReplace(this.messaageslist.smsTempId),'smsTempId'))) {} 
       else if (!this.vldChkLst.selectDropdown(messageTypeVal, this.commonserveice.langReplace(this.messaageslist.messageType),'messageType')) {} 
       else if ((this.messageType == 1) && (!this.vldChkLst.selectDropdown(eventTypeVal, this.commonserveice.langReplace(this.messaageslist.eventType),'eventType'))) {} 
       else if ((this.mailsmstoApplicant == '') && (!this.vldChkLst.blankCheck(this.mailsmstoAuthority, this.commonserveice.langReplace(this.messaageslist.to)))) {} 
       else if ((configtypeVal == 1) && (this.mailsmstoApplicant == 1) && (!this.vldChkLst.blankCheck(this.emailId, this.commonserveice.langReplace(this.messaageslist.emailId),'emailId'))) {} 
       else if ((configtypeVal != 1) && (this.mailsmstoApplicant == 1) && (!this.vldChkLst.blankCheck(this.mobileNo, this.commonserveice.langReplace(this.messaageslist.mobileNo),'mobileNo'))) {} 
       else if (!this.vldChkLst.blankCheck(smsSubjectVal, this.commonserveice.langReplace(this.messaageslist.smsSubject),'smsSubject')) {}
      // else if ((configtypeVal == 1) && (!this.vldChkLst.blankCheck(intMailTemplateVal,this.messaageslist.intMailTemplate))) {}
      else if ((configtypeVal == 3) && (!this.vldChkLst.selectDropdown(intDocumentType, this.commonserveice.langReplace(this.messaageslist.intDocumentType),'fileType'))) {} 
      else if ((configtypeVal == 3) && (!this.vldChkLst.selectDropdown(vchDocument, this.commonserveice.langReplace(this.messaageslist.vchDocument),'documentFile'))) {} 
      else if (!this.vldChkLst.blankCheck(messageContentVal, this.commonserveice.langReplace(this.messaageslist.smscontent),'messageContent')) {} 
      else {
          if (this.varlist.formEnable == false) {
              this.txtFormId = this.varlist.formId;
          }
          else if((this.varlist.formEnable == true) && (this.varlist.dynamicForm == false)) {
            this.txtFormId = this.selformId;
        }
          messageContentVal = this.encDec.escapeHtml(messageContentVal);
          let mailSmsApp: any = '';
          if (this.mailsmstoApplicant && this.mailsmstoAuthority) {
              mailSmsApp = '1,2';
          } else if (this.mailsmstoAuthority) {
              mailSmsApp = '2';
          } else if (this.mailsmstoApplicant) {
              mailSmsApp = '1';
          }

          let formparams = {
              "itemId": this.messageId,
              "formId": this.txtFormId,
              "messageConfType": configtypeVal,
              "smsTemplateId": smsTempIdVal,
              "messageType": messageTypeVal,
              "eventType": eventTypeVal,
              "subject": smsSubjectVal,
              "messageContent": messageContentVal,
              "intCreatedBy": this.userId,
              "intUpdatedBy": this.userId,
              "intMailTemplate": this.intMailTemplate,
              "intDocumentType": intDocumentType,
              "vchDocument": vchDocument,
              "vchLanguage": vchLanguage,
              "itemStatus": '',
              "vchEmailIdKey": this.emailId,
              "vchMobileKey": this.mobileNo,
              "gateWayconfigId": this.gateWayconfigtype,
              "mailSmsTo": mailSmsApp
          }

          


          this.commonserveice.newMessage(formparams).subscribe((response: any) => {
                  let respData = response.RESPONSE_DATA;
                  let respToken = response.RESPONSE_TOKEN;
                  let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                  if (respToken == verifyToken) {
                      let res: any = Buffer.from(respData, 'base64');
                      let responseResult = JSON.parse(res)

                      if (responseResult.status == 200) {

                          Swal.fire({

                              text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                              icon: 'success',
                              confirmButtonColor: '#3085d6',
                              confirmButtonText: this.commonserveice.langReplace('Ok')
                          }).then((result) => {


                              if (messageTypeVal == 1) {
                                  this.route.navigate(['/admin/viewmessageengine'])
                              } else {

                                  this.route.navigate(['/admin/viewmessagereminder'])
                              }
                              this.resetform();


                          })

                      } else if (responseResult.status == 202) {

                          // this.loading=false;

                          Swal.fire({

                              text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                              icon: 'success',
                              confirmButtonColor: '#3085d6',
                              confirmButtonText: this.commonserveice.langReplace('Ok')
                          }).then((result) => {


                              if (messageTypeVal == 1) {

                                  this.route.navigate(['../viewmessageengine'])
                              } else {

                                  this.route.navigate(['..viewmessagereminder'])
                              }
                              this.resetform();
                          })

                      } else if (responseResult.status == 501) {

                          this.commonserveice.directlogoutlib()
                      } else if (responseResult.status == 400) {

                          // this.loading=false;
                          Swal.fire({
                              icon: 'error',
                              text: responseResult.message.metaName[0],

                          });


                      } else {
                          //this.loading=false;
                          Swal.fire({
                              icon: 'error',
                              text: this.commonserveice.langReplace(this.varlist.somethingWrong)
                          });
                      }
                  } else {

                      Swal.fire({
                          icon: 'error',
                          text: this.messaageslist.errorMsg,

                      });
                  }
              },
              (error: any) => {
                  // this.loading=false;
                  Swal.fire({
                      icon: 'error',
                      text:this.commonserveice.langReplace(this.varlist.errorApiResponse),
                  });
              })




      }

  }

  getMessageinfo() {
      let messageParams = {
          "intMessageConfigId": this.messageId,
          "intMessageConfigType": '',
          "formId": "",
          "formName": ''
      };
      this.commonserveice.viewMessage(messageParams).subscribe((resp: any) => {
          let respData = resp.RESPONSE_DATA;
          let respToken = resp.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
          if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              res = JSON.parse(res.toString());
              if (res.status == 200) {
                  this.messageList = res.result;
                  if (this.messageList.length > 0) {
                    setTimeout(()=>{                          
                        this.selformId = this.messageList[0].intProcessId;
                    },1000);
                  
                     

                      this.configtype = this.messageList[0].intMessageConfigType;
                      this.formnames = this.messageList[0].intProcessId;
                      this.messageType = this.messageList[0].intmessageType;
                      this.eventType = this.messageList[0].intEventType;
                      this.smsSubject = this.messageList[0].vchSubject;
                      this.messageContent = this.encDec.decodeHtml(this.messageList[0].vchMessageContent);
                      // this.messageContent = this.messageList[0].vchMessageContent;
                      // console.log(this.encDec.decodeHtml(this.messageList[0].vchMessageContent));
                      // console.log(this.messageList[0].vchMessageContent);
                      this.smsTempId = this.messageList[0].vchSmsTemplateId;
                      this.fileType = this.messageList[0].intDocumentType;
                      this.documentUrl = this.messageList[0].vchDocument;
                      this.intMailTemplate = this.messageList[0].intMailTemplate;
                      this.vchLanguage = this.messageList[0].vchLanguage;
                      this.emailId = this.messageList[0].vchEmailIdKey;
                      this.mobileNo = this.messageList[0].vchMobileKey;
                      let explodedAllMailValue = (this.messageList[0].vchMailSmsTo).split(',');
                      this.gateWayconfigtype = this.messageList[0].intGateWayConfigId;
                      this.getGateWayConfigDetails();
                      if (explodedAllMailValue.includes('1')) {
                          this.mailsmstoApplicant = '1';
                      }
                      if (explodedAllMailValue.includes('2')) {
                          this.mailsmstoAuthority = '2';
                      }
                      // alert(this.messageList[0].vchLanguage);
                  }
              } else if (res.status == 417) {
                  Swal.fire({
                      icon: 'error',
                      text:this.commonserveice.langReplace(this.varlist.errorApiResponse)
                  });
              } else {
                  Swal.fire({
                      icon: 'error',
                      text: this.commonserveice.langReplace(this.varlist.somethingWrong)
                  });
              }
          } else {
              Swal.fire({
                  icon: 'error',
                  text:this.commonserveice.langReplace(this.varlist.errorApiResponse)
              });
          }
      });
  };

  resetform() {
      this.configtype = "0";
      this.formnames = "0";
      this.smsTempId = null;
      this.messageType = null;
      this.eventType = null;
      this.smsSubject = null;
      this.messageContent = 0;
      this.intMailTemplate = 0;
      this.fileType = 0;
      this.documentFile = null;
      this.vchLanguage = 0;

  }
  //form key and description section----------------------------

  getFormKeys() {
      let keyParams = {
          "itemId": this.txtFormId
      };
      this.commonserveice.getConfigurationKeys(keyParams).subscribe((response: any) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.keysArray = res.result;
          } else if (res.status == 417) {
            Swal.fire({
              icon: 'error',
              text:this.commonserveice.langReplace(this.varlist.invalidResponse)
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(this.varlist.somethingWrong)
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
             text:this.commonserveice.langReplace(this.varlist.invalidResponse),
          });
        }
      });
  }
  //



  getStaticFormKeys() {
      let keyParams = {

      };

      this.commonserveice.getStaticConfigurationKeys(keyParams).subscribe((response: any) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
          if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              res = JSON.parse(res.toString());
              if (res.status == 200) {
                  this.StatickeysArray = res.result;
              } else if (res.status == 417) {
                  Swal.fire({
                      icon: 'error',
                      text:this.commonserveice.langReplace(this.varlist.invalidResponse)
                  });
              } else {
                  Swal.fire({
                      icon: 'error',
                      text: this.commonserveice.langReplace(this.varlist.somethingWrong)
                  });
              }
          } else {
              Swal.fire({
                  icon: 'error',
                  text:this.commonserveice.langReplace(this.varlist.invalidResponse)
              });
          }
      });




  }



  getLanguage() {
      let params = {
          "intId": '',

      };

      this.commonserveice.getLanguage(params).subscribe((resp: any) => {
          let respData = resp.RESPONSE_DATA;
          let respToken = resp.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
          if (respToken == verifyToken) {
              let res: any = Buffer.from(respData, 'base64');
              res = JSON.parse(res.toString());
              if (res.status == 200) {
                  this.languageList = res.result;
               //   console.log(this.languageList)
              } else {
                  console.log(res.messages)
              }
          } else {
              Swal.fire({
                  icon: 'error',
                  text:this.commonserveice.langReplace(this.varlist.invalidResponse)
              });
          }

      });
  }
  // addChangeEventForLabel() {
  //   let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
  //   let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
  //   setTimeout(() => {
  //     this.langKey = sessionUserLang;
  //     let labelChangeEle: any = document.getElementById('languageListH');
  //     labelChangeEle.addEventListener('change', () => {
  //       this.langKey = labelChangeEle.value;
  //     });
  //   }, 1000);

  // }

  mailSmsTo(evt: any) {
      let elemnt: any = evt.target;
      if (elemnt.checked) {
          if (evt.target.value == 1) {
              this.mailsmstoApplicant = evt.target.value;
          } else {
              this.mailsmstoAuthority = evt.target.value;
          }


      } else {
          if (evt.target.value == 1) {
              this.mailsmstoApplicant = 0;
          } else {
              this.mailsmstoAuthority = 0;
          }
      }
  }
  getGateWayConfigDetails() {
      let params = {
          "tinType": this.configtype,
      };
      this.commonserveice.getFetchPublishRecord(params).subscribe((response: any) => {
          let respToken = response.RESPONSE_TOKEN;
          let respData = response.RESPONSE_DATA
          let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
          if (respToken == verifyToken) {
              let respData = response.RESPONSE_DATA;
              let res: any = Buffer.from(respData, 'base64');
              res = JSON.parse(res.toString());
              if (res.status == 200) {
                  this.gatewayconfigDetails = res.result;
              } else if (res.status == 400) {
                  Swal.fire({
                      icon: 'error',
                      text: "error",
                  });
              }

          }
      });
  }

}