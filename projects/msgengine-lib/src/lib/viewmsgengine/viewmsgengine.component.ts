import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MsgengineLibService } from '../msgengine-lib.service';
import * as CryptoJS from 'crypto-js';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import { VarlistService } from '../varlist.service';
import { Buffer } from 'buffer';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-viewmsgengine',
  templateUrl: './viewmsgengine.component.html',
  styleUrls: ['./viewmsgengine.component.css']
})
export class ViewmsgengineComponent implements OnInit {

  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl:any = [
    {
      "pagetitle":"View Message Engine",
      "tabList":[
        {"tabName":"Add","tabUrl":"../addmessageengine"},
        {"tabName":"View","tabUrl":"../viewmessageengine","tabClass":"active"},
        {"tabName":"Reminder","tabUrl":"../viewmessagereminder"}],
    
        
      "utils":[
       
        {"utilName":"search"},
        {"utilName":"print"},
        {"utilName":"delete"},
        {"utilName":"publish"},
        {"utilName":"unpublish"},
      
        ],
      "messages":
        {
        "successMsg":"Date saved successfully",
        "errorMsg":"Something Went Wrong",
        "warningtype":"You want to delete this record",
        "deleteMsg":"Record has been deleted"
      }
      
    }
  ];
  letterID: any = "";
  editor: any;
  // editor: any = ClassicEditor;
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
  langKey: any = 'en';
  indexNumber: any = 0;
  formenable:any;

  constructor(private route: Router,
    private httpClient: HttpClient,
   
    // public commonserveice: CommonvarlistService,
    // private getwayService: GetwayvarlistuartionService,
    public commonserveice:MsgengineLibService,
    private varlist:VarlistService, 
    private modalService: NgbModal, 
    private encDec: EncrypyDecrpyService
    ) { 
    
      this.formenable=this.varlist.formEnable;
      this.sevName=varlist.serviceModuleconfig;
    } 

  ngOnInit(): void {
    this.loadconfig();
    this.viewItems('','','','',1);
    this.getForms();
    //this.addChangeEventForLabel();

  }
  loadconfig() {
   
      this.tablist = this.jsonurl[0].tabList;
      this.utillist = this.jsonurl[0].utils
      this.messaageslist = this.jsonurl[0].messages;
      this.title = this.jsonurl[0].pagetitle;
 
  }
  multilingual(test: any) {
    return test;
  }
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
         this.formNames = res.result;
        
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
  viewItems(MessageConfigId:any,intMessageConfigType:any,formId:any,formName:any,messageType:any) {
    this.letterIdArray = [];
    this.txtMessageConfigType = 0;
    this.selFormName = null;
    let messageParams = {
      "intMessageConfigId": MessageConfigId,
      "intMessageConfigType": intMessageConfigType,
      "formId": formId,
      "formName": formName,
      "messageType": messageType
    };
    this.loading = true;
    this.pubUnpStatus = [];
    this.commonserveice.viewMessage(messageParams).subscribe((response: any) => {
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
          Swal.fire({
            icon: 'error',
            text:this.commonserveice.langReplace(this.varlist.invalidResponse),
          });
        } else {
          this.isFlag = false;
          Swal.fire({
            icon: 'error',
            text:this.commonserveice.langReplace(this.varlist.errorApiResponse)
          });
        }
      } else {
        this.isFlag = false;
        Swal.fire({
          icon: 'error',
          text:this.commonserveice.langReplace(this.varlist.invalidResponse),
        });
      }
    });
  }
  viewSearchList() {
    let Formid = this.selFormName;
    let MessageConfigType = this.txtMessageConfigType;
    this.viewItems('',MessageConfigType,Formid,'',1);
 
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
      this.pubUnpStatus = [];
      this.letterIdArray = [];
      for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
      }
    }
  }

  //edit function call for edit id================================
  editMessage(messageStr: any) {
    
    let encSchemeStr = this.encDec.encText(messageStr.toString());
    this.route.navigate(['/admin/addmessageengine', encSchemeStr]);
  }
  deleteLetter(messageId: any) {
    let messageParams = {
      "itemId": messageId,
      "itemStatus": "1"
    };
    Swal.fire({
      title: 'Are you sure' + '?',
      text: this.messaageslist.warningtype,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes' + ', ' + 'delete it' + "!"
    }).then((result: any) => {

      if (result.isConfirmed) {
        this.commonserveice.newMessage(messageParams).subscribe((res: any) => {
          if (res.status == 200) {
            Swal.fire(
              'Deleted!',
              "this.messaageslist.deleteMsg",
              'success'
            )
            this.viewItems('','','','',1)

          }
          else {

            Swal.fire({
              icon: 'error',
              text: "this.messaageslist.errorMsg",

            });
          }
        });
      }
    })
  }
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
