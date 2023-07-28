import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { LanguageService } from 'src/app/services/language.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';
import { CommonServicesService } from 'src/app/services/common-services.service';


@Component({
  selector: 'app-viewalllanguages',
  templateUrl: './viewalllanguages.component.html',
  styleUrls: ['./viewalllanguages.component.scss']
})
export class ViewalllanguagesComponent implements OnInit {
  showDelete: boolean = false;
  public loading = false;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  allLanguage: any = '';
  editLanguage: any;
  editStatus: boolean = false;
  isLangEng: any;
  browserLang: any;
  jsonurl = "assets/js/_configs/viewAllLanguage.config.json";

  //page------------
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes: any = [10, 20, 50, 100, 500, 1000];

  letterIdArray: any = [];
  sevName: any = 'language_module/deleteLableLanguages';
  language: any = [];
  status: boolean = false;
  langKey: any = 'en';
  first: any;
  indexNumber:any=0;
  constructor
  (private route: Router, 
    private httpClient: HttpClient, 

    public encDec: EncrypyDecrpyService,
     public vldChkLst: ValidatorchecklistService,
    public router: ActivatedRoute,
      private labelLanguage: LanguageService, 
      public commonserveice:CommonServicesService
      ) {
     // this.viewItems(); 

  }

  ngOnInit(): void {

  
    this.getLanguage();
    this.viewItems();
    this.loadconfig();
   
  }

  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      this.title = data[0].pagetitle
    })
  }



  onTableDataChange(event: any) {
    this.page = event;
    this.indexNumber=(this.page-1)*this.tableSize;

  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.indexNumber=0;
  }


  tempData: any;

  viewItems(searchDetails: any = '') {
    let listData = {
      'searchDetails': searchDetails,
      'intId':''
    };

    this.loading = true;
    this.labelLanguage.viewAllLanguages(listData).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {

          
          this.allLanguage = res.result;
         // console.log(this.allLanguage)
         this.letterIdArray=[]
        }
        else {
          console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: "environment.invalidResponseMsg",
        });

      }

    });


  }


  editForm(id: any) {
    // console.log("id is " + JSON.stringify(id));
    let encSchemeStr = this.encDec.encText(id.toString());
   
    this.route.navigate(['/admin/editLanguage', encSchemeStr]);

  }
  getLanguage() {
    let params = {
      "intId": '',
      "langName": ""

    }; 

    this.loading = true;
    this.labelLanguage.getlanguages(params).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res:any = Buffer.from(respData,'base64'); 
        res = JSON.parse(res.toString());
        if (res.status == 200) {
          this.loading = false;
          this.language = res.result;
        }
        else {
          console.log(res.messages)
        }
      }else{
        Swal.fire({
          icon: 'error',
          text: "environment.invalidResponseMsg",
        });
      }
      
    });
  }

 

 

  onChange(checkid: any, e: any) {
    if (e.target.checked) {
      if (!this.letterIdArray.includes(checkid)) {
        this.letterIdArray.push(checkid);
      }
    } else {
      let index = this.letterIdArray.indexOf(checkid);
      this.letterIdArray.splice(index, 1);
    }
    console.log("letterIdArray is " + this.letterIdArray);

  }

  selectAll(e: any) {
    let checkBoxes = document.querySelectorAll('.rowCheck');
    if (e.target.checked) {
      for (let i = 0; i < checkBoxes.length; i++) {
        let ids = checkBoxes[i].id;
        this.letterIdArray.push(parseInt(ids));
      }

      checkBoxes.forEach((ele: any) => ele.click());
      $(checkBoxes).prop('checked', true);
    }
    else {
      this.letterIdArray = [];
      $(checkBoxes).prop('checked', false);
    }
  }



  searchDetails()
    {
      let searchValue:any = (<HTMLInputElement>document.getElementById('formName')).value;
      if(!this.vldChkLst.blankCheck(searchValue,'english label'+' can not be left blank'))
        {
          return false;
        }

        this.viewItems(searchValue.toLowerCase());
        return true;
    }
    resetMe()
    { 
      (<HTMLInputElement>document.getElementById('formName')).value = "";
      this.viewItems();

    
    }

  
  
}

