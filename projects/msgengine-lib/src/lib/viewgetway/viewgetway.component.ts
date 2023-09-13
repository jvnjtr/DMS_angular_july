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

@Component({
  selector: 'lib-viewgetway',
  templateUrl: './viewgetway.component.html',
  styleUrls: ['./viewgetway.component.css']
})
export class ViewgetwayComponent implements OnInit {
  @ViewChild('previewModal') previewModal: ElementRef;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl:any = [
    {
      "pagetitle":"View Gateway Config",
      "tabList":[
     
        {"tabName":"Add","tabUrl":"../addgateway"},
        {"tabName":"View","tabUrl":"../viewgateway" ,"tabClass":"active"}
      ],
        "utils":[
        {"utilName":"search"},
        {"utilName":"print"},
        {"utilName":"delete"},
        {"utilName":"publish"},
        {"utilName":"unpublish"}
       
        ],
      "messages":
        {
          "successMsg":"Date saved successfully",
        "errorMsg":"Error in database",
        "warningtype":"You want to delete this record",
        "deleteMsg":"Record has been deleted"
        }
      
    }
  ];

  getwaytypes: any;
  selType: any = 0;
  txtName: any = '';
  getwayList: any;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];

  getwayIdArray: any = [];
  pubUnpStatus: any[] = [];
  getDetailslist: any;
  getwayDetails:any;
  chkAll: any = 0;
  sevName: any = " ";
  loading: boolean;
  langKey: any = 'en';
  indexNumber: any = 0;
  typeName:any;

  constructor(private route: Router, private httpClient: HttpClient,
    
    public commonserveice:MsgengineLibService,
    private varlist:VarlistService, 
    private modalService: NgbModal, 
    private encDec: EncrypyDecrpyService) {

this.sevName=varlist.serviceName;
     }

  ngOnInit(): void {

    this.loadvarlist();
    this.getGetwaytypes();
    this.viewAllrecrds(this.selType,this.txtName);
    
    // console.log(this.viewAllrecrds());
    //this.addChangeEventForLabel();

  }
  loadvarlist() {
    // this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = this.jsonurl[0].tabList;
      this.utillist = this.jsonurl[0].utils
      this.messaageslist = this.jsonurl[0].messages;
      this.title = this.jsonurl[0].pagetitle;
    // })
  }
  multilingual(test: any) {
    return test;
  }


//\\ ======================== // Get getway types // ======================== //\\ 
getGetwaytypes() {
   let getwayparm={}
   this.commonserveice.viewGatwayTypes(getwayparm).subscribe({
    next: (response) => {
      let respData = response.RESPONSE_DATA;
      let respToken = response.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
     
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == "200") {
          this.getwaytypes = res.result;
        
        }
        else if(res.status==501){
        
          this.commonserveice.directlogoutlib()
        }
       
        else {
          console.log(res.messages)
        }
       }
       else{
        //this.loading=false;
        this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
     
       }
    },
    error: (msg) => {
           this.commonserveice.directlogoutlib()
   }
 })

 }

//\\ ======================== // Get getway types // ======================== //\\ 

  onTableDataChange(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.indexNumber = 0;
  }


//\\ ======================== // View All records // ======================== //\\ 
  viewAllrecrds(typeid:any,name:any) {
   // getGetwayType
    this.selType = 0;
    this.txtName = '';
    let formParams = {
      "typeId": typeid,
      "formName": name
      };
    this.loading = true;
    this.pubUnpStatus = [];
    this.commonserveice.viewGetwayConfig(formParams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
      
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
          
           if (respToken == verifyToken) {
       
        let res:any = Buffer.from(respData,'base64'); 
        let responseResult = JSON.parse(res)
         
      
      
          if (responseResult.status == 200) {
            this.loading=false;
            this.getwayList = responseResult.result;
          // console.log(this.getwayList)
          }
          else if(responseResult.status==501){
              
            this.commonserveice.directlogoutlib()
          }
          else{
            this.loading=false;
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
           
          }
        }
        else{
         //this.loading=false;
         this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
        }
      },
      error: (msg) => {
             this.commonserveice.directlogoutlib()
     }
   })

  }
// //\\ ======================== // View All records // ======================== //\\ 
 


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
      if (!this.getwayIdArray.includes(checkid)) {
        this.getwayIdArray.push(checkid);
        this.pubUnpStatus.push({ 'letterId': checkid, 'publishUnpublisStatus': publishStatus });
      }
 
    } else {
      let index = this.getwayIdArray.indexOf(checkid);
      let indxAdd: number = 0;
      for (let mk of this.pubUnpStatus) {
        if (mk.letterId == checkid) {
          this.pubUnpStatus.splice(indxAdd, 1);
          break;
        }
        indxAdd++;
      }
      this.getwayIdArray.splice(index, 1);
    }
  }


  selectAll(e: any) {
    let allid=e.target.id;
   // alert(allid)
    
    let checkBoxes:any = document.querySelectorAll('.rowCheck');
 
    if (e.target.checked) {
     
      for (let i = 0; i < checkBoxes.length; i++) {
        let ids = checkBoxes[i].id;
        this.getwayIdArray.push(parseInt(ids));
        this.pubUnpStatus.push({ 'letterId': ids, 'publishUnpublisStatus': checkBoxes[i].getAttribute("pubstatus") })

        checkBoxes[i].checked = true;

      }

   
      
    }
    else {
     
      this.getwayIdArray = [];
      for (let i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
      }
      this.pubUnpStatus = []
    }
  }

// //\\ ======================== // Get old getway details // ======================== //\\
   filedata(intId: any, typeId: any,typeName:any) {
    this.open(this.previewModal);
    let formParams =
    {
      "typeId": typeId,
      "intId": intId
    };
    this.typeName=typeName;
    
    this.commonserveice.getPrevDetails(formParams).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
       
        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
           
        if (respToken == verifyToken) {
       let res:any = Buffer.from(respData,'base64'); 
       let responseResult= JSON.parse(res)
         
          if (responseResult.status == 200) {
           this.getwayDetails = responseResult.result.data;
          // console.log(responseResult.result)
            this.getDetailslist = responseResult.result.result;
           
         
            
           }
       
          else if(responseResult.status==501){
            
          //this.commonserveice.directlogoutlib()
          }
          else{
           
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
          }
         }
         else{
          //this.loading=false;
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.varlist.somethingWrong))
         }
      },
      error: (msg) => {
             this.commonserveice.directlogoutlib()
     }
   })


  }

//\\ ======================== // Get old getway details // ======================== //\\

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
  //\\ ======================== // Modal Open // ======================== //\\ 
  open(content: any) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result: any) => {
    }, (reason: any) => { });
  }
  //\\ ======================== // Modal Open // ======================== //\\ 
  closeModal() {
    this.modalService.dismissAll();
  }
  //\\ ======================== // Modal Close // ======================== //\\
}
