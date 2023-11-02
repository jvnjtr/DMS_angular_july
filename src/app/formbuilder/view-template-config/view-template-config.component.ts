import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonconfigService } from 'src/app/services/commonconfig.service';
import { LetterconfigService } from 'src/app/services/letterconfig.service';

import Swal from 'sweetalert2';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-view-template-config',
  templateUrl: './view-template-config.component.html',
  styleUrls: ['./view-template-config.component.scss']
})
export class ViewTemplateConfigComponent implements OnInit {

  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/viewLetter.config.json";

  letterlist: any;
  txtLetterName: any = null;
  selFormName: any = 0;
  isFlag = true;
  loading = false;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  formNames: any;
  message: any;
  letterIdArray: any = [];
  pubUnpStatus: any[] = [];
  chkAll: any = 0;
  sevName: any = "letterconfig";
  langKey: any = 'en';
  indexNumber: any = 0;
  @Output('closeModalafterDelete') closeModalafterDelete: EventEmitter<any> = new EventEmitter();


  userPermissionDetails:any;
  intDeleteRight:any=0;
  intEditRight:any=0;
  intViewManageRight:any=0;
  intaddRight:any=0;
  intallRight:any=0;
  publishRight:any=0;
  processId:any='C2';
  admin_privilege: any;



  public limit:any=10;
  public offset:any=1;

  constructor(private route: Router,
    private httpClient: HttpClient,
    public commonService: CommonconfigService,
    private LetterconfigService: LetterconfigService,
    public vldChkLst: ValidatorchecklistService,
    private encDec: EncrypyDecrpyService
  ) { }

  ngOnInit(): void {
    // let USER_PERMISSIONTOKEN: any = sessionStorage.getItem('ADMIN_SESSION');
    // let USER_PERMISSION_DETAILS = JSON.parse(
    //   CryptoJS.AES.decrypt(
    //     USER_PERMISSIONTOKEN,
    //     environment.apiHashingKey
    //   ).toString(CryptoJS.enc.Utf8)
    // );
    // this.userPermissionDetails=USER_PERMISSION_DETAILS.USER_PERMISSION;
    // this.admin_privilege= USER_PERMISSION_DETAILS.ADMIN_PRIVILEGE;
    // console.log(this.admin_privilege);
    
    // if(this.admin_privilege==1 || this.admin_privilege==2){
    //   this.intDeleteRight=1;
    //   this.intEditRight=1;
    //   this.intViewManageRight=1;
    //   this.intaddRight=1;
    //   this.intallRight=1;
    //   this.publishRight=1;

    // }
    // else{
    //     this.allPermissionList(this.processId);

    // }




    this.loadconfig();
    this.viewItems(this.limit,this.offset)
    this.getForms();
    // this.addChangeEventForLabel();
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
    let letterParams = {};
    this.commonService.getForms(letterParams).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
       
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status === 200) {
         
          this.formNames = res.result;
          console.log(this.formNames);
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

  onTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.viewItems(this.tableSize ,event);

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.indexNumber = 0;
  }
  viewItems(limit:any,offset:any) {
    this.letterIdArray = [];
    this.selFormName = 0;
    this.txtLetterName = null;
    let letterParams = {
      "formId": "",
      "LetterName": "",
      "intLetterConfigId": "",
      "limit": limit,
      "offset": offset
    };
    this.loading = true;
    this.pubUnpStatus = [];
    this.LetterconfigService.viewLetters(letterParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.letterlist = res.result;
          this.count=res.totalCount;
          this.isFlag = true;
          this.loading = false;
        }else if(res.status == 417){
          this.isFlag = false;
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidRequestMsg),

          });
        } else {
          this.isFlag = false;
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
  viewSearchList() {
    let Formid = this.selFormName;
    let LetterName = this.txtLetterName;
    let letterParams = {
      "formId": Formid,
      "LetterName": LetterName,
      "intLetterConfigId": ""
    };
    this.loading = true;
    this.LetterconfigService.viewLetters(letterParams).subscribe((response: any) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.letterlist = res.result;
          this.isFlag = true;
          this.loading = false;
        }else if(res.status==417){
          this.isFlag = false;
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(environment.invalidRequestMsg),
          });
        } else {
          this.isFlag = false;
          Swal.fire({
            icon: 'error',
            text: this.commonService.langReplace(this.messaageslist.errorMsg),
          });
        }
      } else {
        this.isFlag = false;
        Swal.fire({
          icon: 'error',
          text: this.commonService.langReplace(environment.invalidResponse),
        });
      }
    });
  }


  deleteLetter(letterId: any) {

    let letterParams = {
      "itemId": letterId,
      "itemStatus": "1"
    };


    Swal.fire({
      title: this.commonService.langReplace('Are you sure') + "?",
      text: this.messaageslist.warningtype,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.commonService.langReplace('Cancel'),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.commonService.langReplace('Yes') + ', ' + this.commonService.langReplace('delete it') + "!"
    }).then((result: any) => {

      if (result.isConfirmed) {
        this.LetterconfigService.newLetter(letterParams).subscribe((response: any) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());
            if (res.status == 200) {
              Swal.fire(
                'Deleted!',
                this.commonService.langReplace(this.messaageslist.deleteMsg),
                'success'
              )
              this.closeModalafterDelete.emit(res.status);
              // this.viewItems(this.limit,this.offset)
            }else if(res.status==417){
              Swal.fire({
                icon: 'error',
                text: this.commonService.langReplace(environment.invalidRequestMsg),
              });
            } else {
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
    })
  }
  editLetter(letterStr: any) {
    let encSchemeStr = this.encDec.encText(letterStr.toString());
    this.route.navigate(['/formbuilder/templateConfigEdit', encSchemeStr]);
  }

  onChange(checkid: any, e: any, publishStatusm: any) {

    if (e.target.checked) {
      if (!this.letterIdArray.includes(checkid)) {
        this.letterIdArray.push(checkid);
        this.pubUnpStatus.push({ 'letterId': checkid, 'publishUnpublisStatus': publishStatusm});
      }
      console.log(this.pubUnpStatus);
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
    let checkBoxes = document.querySelectorAll('.rowCheck');
    if (e.target.checked) {
      for (let i = 0; i < checkBoxes.length; i++) {
        let ids = checkBoxes[i].id;
        this.letterIdArray.push(parseInt(ids));
        this.pubUnpStatus.push({ 'letterId': ids, 'publishUnpublisStatus': checkBoxes[i].getAttribute("pubstatus") })

      }
      checkBoxes.forEach((ele: any) => ele.click());
      $(checkBoxes).prop('checked', true);
    }
    else {

      this.letterIdArray = [];
      this.pubUnpStatus = []
      $(checkBoxes).prop('checked', false);
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




  



  allPermissionList(processId:any){
    this.userPermissionDetails.forEach((ele: any) => {
      if(ele.intLinkId == processId){
        console.log(processId);

        this.intDeleteRight         = ele.intDelete;
        this.intEditRight           = ele.intEditRight;
        this.intViewManageRight     = ele.intViewManageRight;
        this.intaddRight            = ele.intadd;
        this.intallRight            = ele.intall;
        this.publishRight           = ele.publish;

        
      }
      
    });
  }

}
