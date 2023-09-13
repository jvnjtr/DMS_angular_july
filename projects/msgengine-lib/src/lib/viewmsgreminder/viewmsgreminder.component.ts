import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MsgengineLibService } from '../msgengine-lib.service';
import * as CryptoJS from 'crypto-js';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import { VarlistService } from '../varlist.service';
import { Buffer } from 'buffer';
import * as $ from 'jquery'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorchecklistService } from '../validationchecklist.service';

@Component({
  selector: 'lib-viewmsgreminder',
  templateUrl: './viewmsgreminder.component.html',
  styleUrls: ['./viewmsgreminder.component.css']
})
export class ViewmsgreminderComponent implements OnInit {
  @ViewChild('createreminderModal') createreminderModal: ElementRef;
  // siteUrl = this.varlist.siteURL;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any= 
  {
  "successMsg":"Date saved successfully",
  "errorMsg":"Something Went Wrong",
  "warningtype":"You want to delete this record",
  "deleteMsg":"Record has been deleted",
  "schedularUrl":"Please Enter a URL",
  "schedularUrlValid":"Please Enter a Valid URL",
  "startDate":"Please select a Start Date",
  "freqType":" frequency Type",
  "freqDuration":"Please Enter frequency Duration"
};
  jsonurl:any=[
    {
      "pagetitle":"View Reminder",
      "tabList":[
        {"tabName":"Add","tabUrl":"../addmessageengine"},
        {"tabName":"View","tabUrl":"../viewmessageengine"},
        {"tabName":"Reminder","tabUrl":"./viewmessagereminder","tabClass":"active"}],
        
        
      "utils":[
       
        {"utilName":"search"},
        {"utilName":"print"},
        {"utilName":"delete"},
        {"utilName":"publish"},
        {"utilName":"unpublish"},
      
       
        ],
     
      
    }
  ];
  letterID: any = "";
  editor: any;
  isFlag = true;

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];

  loading = false;
  letterIdArray: any = [];
  pubUnpStatus: any[] = [];
  sevName: any = "";
  messageList: any;
  selFormName: any = 0;
  formNames: any;
  txtLetterName: any = null;
  intMessageConfigType: any;
  txtMessageConfigType: any;

  startDateTime: any;
  endDateTime: any;
  freqType: any = 0;
  freqDuration: any = null;
  messageId: any;
  sessiontoken: any;
  userId: any;
  encSchemeId: any;
  txtFormId: any = null;
  schedularUrl: any = null;
  schedularStatus: any = 0;
  excuteList: any;
  langKey: any = 'en';
 formenable:any;
 indexNumber: any = 0;
 sMintProcessId: any;
 sMintMessageConfigId: any;
 sMintMessageConfigType: any;

  constructor(private route: Router,
    private httpClient: HttpClient,
   
    public commonserveice:MsgengineLibService,
    private varlist:VarlistService, 
    private modalService: NgbModal, 
    public vldChkLst: ValidatorchecklistService,
    private encDec: EncrypyDecrpyService) { 
      this.formenable=this.varlist.formEnable;
      this.sevName=varlist.serviceModuleconfig;
    }

  ngOnInit(): void {
    this.loadconfig();
   
    this.viewItemsReminder('','','','',2);
    //this.addChangeEventForLabel();
    if(this.formenable==true){
      this.getForms();
    }
    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
    let SeetionParsed:any;
    if(this.varlist.sessionEncrypted == true){
        SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
        
    }
    else{
        SeetionParsed =JSON.parse(this.sessiontoken)
    }
    this.userId = SeetionParsed.USER_ID;

  }
  loadconfig() {
    
      this.tablist = this.jsonurl[0].tabList;
      this.utillist = this.jsonurl[0].utils
    
      this.title = this.jsonurl[0].pagetitle;
    
  }
  multilingual(test: any) {
    return test;
  }
  getForms() {
    let params={}
    this.commonserveice.getForms(params).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status === 200) {
            this.formNames = res.result;
          }
          else {
            console.log(res.messages)
          }
        } else {
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
        }
      },
      error: (msg) => {
             this.commonserveice.directlogoutlib()
     }
   })
   
  }
  selectAll(e: any) {
    let checkBoxes:any = document.querySelectorAll('.rowCheck');
    if (e.target.checked) {
      for (let i = 0; i < checkBoxes.length; i++) {

        let ids = checkBoxes[i].id;
        this.letterIdArray.push(parseInt(ids));
        this.pubUnpStatus.push({ 'letterId': ids, 'publishUnpublisStatus': checkBoxes[i].getAttribute("pubstatus") })
        checkBoxes[i].checked = true;
      }

     
    }
    else {
      this.pubUnpStatus = []
      this.letterIdArray = [];
      for (let i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].checked = false;
      }
    }
  }

  viewItemsReminder(intMessageConfigId:any,intMessageConfigType:any,formId:any,formName:any,messageType:any) {
    this.letterIdArray = [];
    this.txtMessageConfigType = 0;
    this.selFormName = null;
    let messageParams = {
      "intMessageConfigId": intMessageConfigId,
      "intMessageConfigType": intMessageConfigType,
      "formId": formId,
      "formName": formName,
      "messageType": messageType
    };
    this.loading = true;
    this.pubUnpStatus = [];
    this.commonserveice.viewMessage(messageParams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.messageList = res.result;
           // console.log(this.messageList)
            this.isFlag = true;
            this.loading = false;
          } else if (res.status == 417) {
            this.isFlag = false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
          } else {
            this.isFlag = false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
          }
        } else {
          this.isFlag = false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
        }
      },
      error: (msg) => {
             this.commonserveice.directlogoutlib()
     }
   })
   
  
  }
  viewSearchList() {
    let Formid = this.selFormName;
    let MessageConfigType = this.txtMessageConfigType;

   
    this.viewItemsReminder('',MessageConfigType,Formid,'',2)
  }
  createreminder(intProcessId:any,intMessageConfigId:any,intMessageConfigType:any){
    this.open(this.createreminderModal);
    this.sMintProcessId=intProcessId;
    this.sMintMessageConfigId=intMessageConfigId;
    this.sMintMessageConfigType=intMessageConfigType;
    
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.indexNumber = 0;
  }
  onChange(checkid: any, e: any, publishStatus: any) {
    let totalCheckbox:any = document.querySelectorAll('.rowCheck').length;
    let totalChecked:any = document.querySelectorAll('.rowCheck:checked').length;
    let parentcheck:any = document.querySelectorAll('.checkall');
   
    if(totalCheckbox == totalChecked) {
      parentcheck[0].checked = true;
    } else {
      parentcheck[0].checked = false;
    }
    if (e.target.checked) {
      if (!this.letterIdArray.includes(checkid)) {
        this.letterIdArray.push(checkid);
       
        this.pubUnpStatus.push({ 'letterId': checkid, 'publishUnpublisStatus': publishStatus });
      }
    } else {
      let index = this.letterIdArray.indexOf(checkid);
      let indxAdd: number = 0;
      for (let mk of this.pubUnpStatus) {
        if (mk.letterId == checkid) {
          this.pubUnpStatus.splice(indxAdd, 1);
          break;
        }
        indxAdd++;
      }
      this.letterIdArray.splice(index, 1);
    }
  }
  editReminder(messageStr: any) {
    let encSchemeStr = this.encDec.encText(messageStr.toString());
    this.route.navigate(['/admin/editReminderEngine', encSchemeStr]);
  }


 //\\ ======================== // Create Scheduler // ======================== //\\

  createSchedular() {

    let startDateVal = this.startDateTime;
    let freqTypeVal = this.freqType;
    let freqDurationVal = this.freqDuration;
  if (!this.vldChkLst.blankCheck(this.schedularUrl, this.commonserveice.langReplace(this.messaageslist.schedularUrl),'schedularUrl')) {}
  else if (!this.vldChkLst.is_url(this.schedularUrl)) {}
  else if (!this.vldChkLst.blankCheck(startDateVal, this.commonserveice.langReplace(this.messaageslist.startDate),'startDateTime')) {}
  else if (!this.vldChkLst.selectDropdown(freqTypeVal, this.commonserveice.langReplace(this.messaageslist.freqType),'freqType')) {}
  else if (!this.vldChkLst.blankCheck(freqDurationVal, this.commonserveice.langReplace(this.messaageslist.freqDuration),'freqDuration')) {}
  else {
      let messageParams = {
        "MessageConfigId": this.sMintMessageConfigId,
        "processId": this.sMintProcessId,
        "MessageConfigType": this.sMintMessageConfigType,
        "startDate": startDateVal,
        "endDate": this.endDateTime,
        "frequencyType": freqTypeVal,
        "frequencyDuration": this.freqDuration,
        "schedularUrl": this.schedularUrl,
        "SchedularStatus": this.schedularStatus
      };




      this.loading = true;

      this.commonserveice.reminderSchedular(messageParams).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());
            if (res.status == 200) {
              this.loading = false;
              this.isFlag = true;
  
              Swal.fire({
  
                text: this.commonserveice.langReplace("Your Schedular Created Successfully")+' !',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: this.commonserveice.langReplace('Ok')
            }).then((result) => {
  
              this.modalService.dismissAll();
              this.viewItemsReminder('','','','',2);
              this.resetSchedular()
  
  
            })
  
            
           
             
            }else if(res.status==417){
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
            }
            else {
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
            }
          }else{
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
          }
          
        },
        error: (msg) => {
               this.commonserveice.directlogoutlib()
       }
     })

   
    }
  }
   //\\ ======================== // Create Scheduler // ======================== //\\

 //\\ ======================== // Executed Scheduler // ======================== //\\

  executeSchedular(intMessageConfigId: any, intProcessId: any) {
    let messageParams = {
      "MessageConfigId": intMessageConfigId,
      "processId": intProcessId,
    };
    
    this.commonserveice.msgexecuteSchedular(messageParams).subscribe({
  next: (response) => {
    let respData = response.RESPONSE_DATA;
    let respToken = response.RESPONSE_TOKEN;
    let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
    if (respToken == verifyToken) {
      let res: any = Buffer.from(respData, 'base64');
      res = JSON.parse(res.toString());
      if (res.status == 200) {
        this.loading = false;
        this.isFlag = true;
        Swal.fire({
          icon: 'success',
          text:this.commonserveice.langReplace("Your Scheduler Execution Started")+' !',

        });
        this.viewItemsReminder('','','','',2);
        
      } else if (res.status == 417) {
        this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
      }
      else {
        this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
      }
    } else {
      this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
    }
  },
  error: (msg) => {
         this.commonserveice.directlogoutlib()
 }
})
 
  }
  //\\ ======================== // Executed Scheduler // ======================== //\\
  //\\ ======================== // Stop Scheduler // ======================== //\\
  stopSchedular(intMessageConfigId: any, intProcessId: any) {
    let messageParams = {
      "MessageConfigId": intMessageConfigId,
      "processId": intProcessId,
    };
    this.commonserveice.msgstopSchedular(messageParams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.loading = false;
            this.isFlag = true;
            Swal.fire({
              icon: 'success',
              text:this.commonserveice.langReplace("Your Scheduler Is Stopped")+' !',
  
            });
            this.viewItemsReminder('','','','',2);
            
          } else if (res.status == 417) {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
          }
          else {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
          }
        } else {
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
        }
      },
      error: (msg) => {
             this.commonserveice.directlogoutlib()
     }
   })
   
  }

  //\\ ======================== // Stop Scheduler // ======================== //\\
  resetSchedular() {
    this.startDateTime = '';
    this.endDateTime = '';
    this.freqType = 0;
    this.freqDuration = '';
    this.schedularUrl = '';

  }
   //\\ ======================== // Show Preview // ======================== //\\
  showPreview(intMessageConfigId: any, intProcessId: any) {

    let messageParams = {
      "intMessageConfigId": intMessageConfigId,
      "intMessageConfigType": "",
      "formId": intProcessId,
      "formName": "",
      "messageType": "2"
    };
   // console.log(messageParams)
    this.loading = true;
    this.commonserveice.viewMessage(messageParams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.excuteList = res.result;
            //console.log(this.excuteList)
            this.isFlag = true;
            this.loading = false;
          } else if (res.status == 417) {
            this.isFlag = false;
           
this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
          }
          else {
            this.isFlag = false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
          }
        } else {
          this.isFlag = false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.invalidResponse))
        }
      },
      error: (msg) => {
             this.commonserveice.directlogoutlib()
     }
   })
 

  }
   //\\ ======================== // Show Preview // ======================== //\\


  //\\ ======================== // Modal Open // ======================== //\\ 
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  closeModal() {
    this.modalService.dismissAll();
   this.resetSchedular()
  }
  //\\ ======================== // Modal Close // ======================== //\\
  htmldecode(data:any){
    let doc = new DOMParser().parseFromString(data, "text/html");
  return doc.documentElement.textContent;

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
}
