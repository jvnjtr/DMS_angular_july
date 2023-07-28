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
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonServicesService } from 'src/app/services/common-services.service';


@Component({
  selector: 'app-languagelabels',
  templateUrl: './languagelabels.component.html',
  styleUrls: ['./languagelabels.component.scss']
})
export class LanguagelabelsComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  pageSizes = [10, 20, 50, 100, 500, 1000];
  editData: any = '';

  jsonurl = "assets/js/_configs/LabelLanguage.config.json";
  tablist: any;
  public loading = false;
  utillist: any;
  messaageslist: any;
  title: any;
  newDynamic: any = {};
 
  dynamicListArray: any;
  saveRowList: any;
  english: any = null;
  hindi: any = null;
  odia: any = null;
  txtPageName: any = null;
  isLangEng: any;
  browserLang: any;
  rowList: any = [];
  schemeStr: any = '0'
  languageList: any;
  selFormType: any;
  editStatus: boolean = false;
  langKey: any = 'en';
  public langDynaic:any=[];
  langmap:any={};
  allLanguage: any;


  constructor(
    private route: Router, 
    private httpClient: HttpClient, 
    public encDec: EncrypyDecrpyService,
   private labelLanguage: LanguageService, 
   public validatorCheck: ValidatorchecklistService, 
   private authService:AuthenticationService,
   public router: ActivatedRoute, 
   public commonserveice:CommonServicesService,
   ) {


  
    
    this.isLangEng = JSON.parse(sessionStorage.getItem("setLang") + "");

    // translate.addLangs(['en', 'or', 'hn']);
    // translate.setDefaultLang('or');
  }

  ngOnInit(): void {


    this.getLanguage('');

    this.loadconfig()
    let encSchemeId = this.router.snapshot.paramMap.get('id');
  



    if (encSchemeId != "" && encSchemeId != null) {
      this.editStatus = true;
      this.schemeStr = this.encDec.decText(encSchemeId);
     // alert(this.schemeStr)
     setTimeout(() => {
      this.editLableLanguage(this.schemeStr);
     }, 100);
     

    } else {
      this.schemeStr = '0'
    }


   



  }




  loadconfig() {
    this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
      this.tablist = data[0].tabList;
      this.utillist = data[0].utils
      this.messaageslist = data[0].messages;
      this.title = data[0].pagetitle;
      if(this.schemeStr!='0')

      {

        let allTabList:any={};

        this.tablist.map((v: any) =>{

        if(v.tabName == "View Label")

          {

          

            Object.assign(v, { tabUrl: "../viewAllLanguage" })

          }}

        // 

      );

     

      }
    })
  }
//\\ ======================== // Get Languages // ======================== //\\
  getLanguage(intid:any) {
   
    let params = {
      
'intId':intid
    };

    this.loading = true;
    this.labelLanguage.getlanguages(params).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {

          
          this.languageList = res.result;
        //  console.log(this.languageList)
          for(let i=0;i<this.languageList.length;i++){
            let obj:any={}
            obj["name"]=this.languageList[i].vchLanguageName;
            obj["aliasName"]=this.languageList[i].vchAliasName;
            obj["value"]="";


            this.langDynaic.push(obj)
          }
        // console.log(this.langDynaic)
        }
        else {
          console.log(res.messages)
        }
      } else {
        Swal.fire({
          icon: 'error',
           text:this.commonserveice.langReplace(environment.invalidResponse)
        });

      }

    });
  }
//\\ ======================== // Get Languages // ======================== //\\


  //\\ ======================== // Validate form // ======================== //\\
  validateForm(): boolean {
    let validate = true;
    let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    for(let i=0;i<this.langDynaic.length;i++){
            if (!this.validatorCheck.blankCheck(this.langDynaic[i].value, this.commonserveice.langReplace("Enter language label of")+" "+ this.commonserveice.langReplace(this.langDynaic[i].name) ,'lang_'+i)) {
            return false;
          }
          else if (this.langDynaic[i].value.match(format)) {
            Swal.fire("warning !!", this.commonserveice.langReplace("Label Name should not have any special character") , "warning");
            
            return false;
            
          }




          
    }
       
 

    return true;
  }

  //\\ ======================== // Validate form // ======================== //\\

//\\ ======================== // Submit Data // ======================== //\\
  doSubmit() {
    if (this.validateForm()) {
      let obj:any={}
      let langkey:any='';
for(let i=0;i<this.langDynaic.length;i++){

obj[this.langDynaic[i].aliasName]=this.langDynaic[i].value;
if(this.langDynaic[i].aliasName == 'en')
{
  langkey=this.langDynaic[i].value
}
}

this.langmap=obj

let formData = {
        "data": this.langmap,
        "vchLabel": langkey.toLowerCase(),
        "intId": parseInt(this.schemeStr)
      };
    
      this.labelLanguage.submitlables(formData).subscribe((resp: any) => {
        let respData = resp.RESPONSE_DATA;
        let respToken = resp.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
            Swal.fire({
              icon: 'success',
              text:this.commonserveice.langReplace(this.messaageslist.successMsg),
            }).then((e) => {
             if(this.editStatus){
              this.route.navigate(['/admin/viewAllLanguage']);
             }
             else{
              this.resetform()
             }
             
            
            });

          }  else if (res.status == 400) {
            Swal.fire({
              icon: 'warning',
              text: this.commonserveice.langReplace("Label name already in the database"),
            });
          } else if (res.status == 417) {
            Swal.fire({
              icon: 'error',
              text:this.commonserveice.langReplace(environment.invalidResponse)
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: this.commonserveice.langReplace(this.messaageslist.errorMsg),
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
             text:this.commonserveice.langReplace(environment.invalidResponse)
          });

        }


      },
        (error) => {
          this.authService.directlogout();
        });



    }


  }
//\\ ======================== // Submit Data // ======================== //\\

  switchLanguage(language: any) {
    // localStorage.setItem("browserLang", language.target.value);
    // this.translate.use(language.target.value);
  }









  editLableLanguage(id: any) {
   
    this.loading = true;
    let param = {
      intId: id
    }

    this.labelLanguage.editLableLanguageById(param).subscribe((resp: any) => {
      let respData = resp.RESPONSE_DATA;
      let respToken = resp.RESPONSE_TOKEN;
      let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
      if (respToken == verifyToken) {
        let res: any = Buffer.from(respData, 'base64');
        res = JSON.parse(res.toString());
        if (res.status == 200) {
         
          this.loading = false;
        // 
       
           this.editData = JSON.parse(res.result.vchOtherLabel);
           


for(let i=0;i<this.langDynaic.length;i++){

    this.langDynaic[i].value= this.editData[this.langDynaic[i].aliasName]
    

  
}

           this.english = this.editData.en;
         
        } 
        else if (res.status == 417) {
          Swal.fire({
            icon: 'error',
            text:this.commonserveice.langReplace(environment.invalidResponse)
          });
        }
        else {
          Swal.fire({
            icon: 'error',
            text: this.commonserveice.langReplace(environment.somethingWrong)
          });
         
        }
      } else {
        Swal.fire({
          icon: 'error',
           text:this.commonserveice.langReplace(environment.invalidResponse)
        });
      }


    });
  }

  resetform() {
    this.ngOnInit();
    this.langDynaic = [];
  }

  cancel() {
    this.route.navigate(['/admin/viewAllLanguage']);
  }



}