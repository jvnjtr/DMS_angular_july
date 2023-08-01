import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';
import { LanguageService } from 'src/app/services/language.service';
import { ValidatorchecklistService } from 'src/app/services/validatorchecklist.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';

@Component({
  selector: 'app-manage-language',
  templateUrl: './manage-language.component.html',
  styleUrls: ['./manage-language.component.scss']
})
export class ManageLanguageComponent implements OnInit {
  
  public loading = false;
  langForm!: FormGroup;
  title: any;
  tablist: any;
  utillist: any;
  messaageslist: any;
  jsonurl = "assets/js/_configs/manageLanguage.config.json";

  //For pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];

  dynamicListArray: any = [];
  rowList: any = [];
  intId: any;
  vchLabel: any;
  vchKey: any;
  ManagelanguageService: any;
  langName: any;
  aliasName: any;
  languageName: any;
  getLanguageList: any = [];
  editLanguage: any;
  editStatus: boolean = false;
  letterIdArray: any = [];
  sevName: any = "language_module/manageLanguage";
  newDynamic: any = {};
  deleteStatus = false;
  pubUnpStatus: any[] = [];
  langKey: any = 'en';
  isLangEng: any;
  defaultLanguage: any = 'en';
  indexNumber: any = 0;


  txtLangName:any='';
  txtAliasName:any='';
  messageid:any='';


  constructor(private route: Router, 
    private httpClient: HttpClient,
    private fb: FormBuilder,
     private manageLanguage: LanguageService, 
     public encDec: EncrypyDecrpyService,
  private validationService: ValidatorchecklistService,
  private authService:AuthenticationService,
  public commonserveice:CommonServicesService
  ) {

  }

  ngOnInit(): void {

    this.resetform();
    this.getLanguages('0');
    this.loadconfig();
  

    this.letterIdArray = [];
   
  }
  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe({
      next: (data) => {
         this.tablist=data[0].tabList;
           this.utillist=data[0].utils
           this.messaageslist=data[0].messages; 
           this.title = data[0].pagetitle;
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })
   
  }
  multilingual(test: any) {
    return test;
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
    let checkBoxes = document.querySelectorAll('.rowCheck');
    if (e.target.checked) {
      for (var i = 0; i < checkBoxes.length; i++) {
        var ids = checkBoxes[i].id;
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

  //\\ ======================== // Validate form // ======================== //\\
  validateForm(): boolean {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    var languageName = this.txtLangName.trim();
    var aliasName = this.txtAliasName.trim();
    if (!this.validationService.blankCheck(languageName, this.commonserveice.langReplace("Enter Language Name"),'txtLangName')) {
      return false;
    }
    else if (languageName.match(format)) {
      this.commonserveice.swalfire('warning',this.commonserveice.langReplace("Language Name should not have any special character"))
      
      return false;
    }
    else if (!this.validationService.blankCheck(aliasName, this.commonserveice.langReplace("Enter Alias Name"),'txtAliasName')) {
      return false;
    }
    else if (!this.validationService.maxLength(aliasName, 8, this.commonserveice.langReplace("Alias Name"),'txtAliasName')) {
      return false;
    }
   
    // else if (aliasName.match(format)) {
    //   Swal.fire("warning !!", this.commonService.langReplace("Alias Name should not have any special character"), "warning");
    //   return false;
    // }



    return true;
  }

  //\\ ======================== // Validate form // ======================== //\\

  //\\ ======================== // Save Language // ======================== //\\
  onSubmit() {
    if (this.validateForm()) {

   let listData = { 
        'intId':this.messageid,
        'languageName':this.txtLangName,
        'aliasName':this.txtAliasName
       };
      
       this.manageLanguage.addLanguage(listData).subscribe({
        next: (response) => {
          let respData = response.RESPONSE_DATA;
          let respToken = response.RESPONSE_TOKEN;
          let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
          if (respToken == verifyToken) {
            let res: any = Buffer.from(respData, 'base64');
            res = JSON.parse(res.toString());
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                text: this.commonserveice.langReplace(this.messaageslist.successMsg),
              }).then((e) => {
                this.resetform()
                this.ngOnInit();
              });
  
            }  else if (res.status == 400) {
              Swal.fire({
                icon: 'warning',
                text: res.message,
              });
            } else if (res.status == 417) {
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
            } else {
              this.commonserveice.swalfire('error',this.commonserveice.langReplace(this.messaageslist.errorMsg))
             
            }
          } else {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.errorApiResponse))
          
  
          }
        },
        error: (msg) => {
          this.authService.directlogout();
       }
     })
   
      }
  }
 
  //\\ ======================== // Save Language // ======================== //\\



  resetform() {
    this.editStatus = false;
    this.rowList = [];
    this.dynamicListArray = [];
    this.txtAliasName='';
    this.txtLangName='';
    this.deleteStatus = false;
    this.messageid=''
  }

//\\ ======================== // Get Languages // ======================== //\\

  getLanguages(langid:any) {
    let listData = { 
      "data": "", 
      pageStatus: "configuration",
      'intId':langid
    
    };
    this.manageLanguage.viewLanguage(listData).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            this.getLanguageList = res.result;
          // console.log(this.getLanguageList)
          } else if (res.status == 417) {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse ))
           
          } 
          else if(res.status==501){
            
            this.authService.directlogout();
          }
          
          else {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
          }
        } else {
        
            this.loading = false;
            this.authService.directlogout();
          
        }
      },
      error: (msg) => {
           this.authService.directlogout();
     }
   })
    
  }

//\\ ======================== // Get Languages // ======================== //\\


  editForm(id: any) {
    this.messageid=id;
    this.editStatus = true;
    let listData = { 
      "data": "", 
      pageStatus: "configuration",
      'intId':id
    
    };
    this.manageLanguage.viewLanguage(listData).subscribe({
      next: (response) => { let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
  
            let langlist=res.result;
            this.txtLangName=langlist[0].langName
            this.txtAliasName=langlist[0].aliasName
         
            
          } else if (res.status == 417) {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse ))
          } 
          else if(res.status==501){
            
            this.authService.directlogout();
          }
          
          else {
            this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong ))
        
          }
        } else {
        
            this.loading = false;
            this.authService.directlogout();
          
        }},
      error: (msg) => {
           this.authService.directlogout();
     }
   })

  
  }


  cancel() {
    this.resetform();
    this.ngOnInit();
  }

  nullidsArray() {
    this.letterIdArray = [];
  }

}


