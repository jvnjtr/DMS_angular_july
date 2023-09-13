import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import * as $ from 'jquery';
import { AuthenticationService } from '../../services/authentication.service';
import * as CryptoJS from 'crypto-js';
import { CommonServicesService } from '../../services/common-services.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { EncrypyDecrpyService } from 'src/app/services/encrypy-decrpy.service';


@Component({
  selector: 'app-cheader',
  templateUrl: './cheader.component.html',
  styleUrls: ['./cheader.component.scss']
})
export class CheaderComponent implements OnInit {

  siteUrl = environment.siteURL;
  decrypted: any;
  secretCode = " ";
  sessiontoken: any;
  username: any;
  desgId: any;
  designationlist: any;
  roleName: any;
  desgName: any;
  findURL: any = "/admin/dashboard";
  languageList: any = []
  sessionStoreduserId: any = 0;
  prefrenceLang: any;
  roleId: any;
  totalNotificationCount: any;
  notificationList: any = [];
  //\\ ======================== // Variables // ======================== //\\



  constructor(private authService: AuthenticationService, private router: Router,
    public commonserveice: CommonServicesService,
    private route: ActivatedRoute,
    private encDec:EncrypyDecrpyService,
    private labelLanguage: LanguageService
  ) {




  }

  notificationsec = document.getElementsByClassName("notification-sec");




  ngOnInit(): void {



    // window.location.reload();
    this.getLanguage('')

    this.getUserNotification()


    let sessionUserLangtoken: any = sessionStorage.getItem('USER_LANGPREF');
    if (sessionUserLangtoken) {
      // alert(1)
      let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
      //console.log(sessionUserLang);

      this.prefrenceLang = sessionUserLang;

    }
    else {
      sessionStorage.setItem("USER_LANGPREF", CryptoJS.AES.encrypt(JSON.stringify(environment.default_lang), environment.apiHashingKey).toString());


    }


    if (!sessionStorage.getItem('ALL_LANG_LIST')) {
      this.saveAllLanguageLabel();
    }

    this.router.events.subscribe((value: any) => {

      this.findURL = this.router.url.toString()
      // console.log('current route: ', this.router.url.toString());
    });







    if (localStorage.getItem('theme') === 'theme-dark') {
      this.setTheme('theme-dark');
      $('#slider').prop("checked", true)

    } else {
      this.setTheme('theme-light');
      $('#slider').prop("checked", false)
    }






    this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');


    let SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8));
    //console.log(SeetionParsed)
    this.username = SeetionParsed.USER_NAME;
    this.desgId = SeetionParsed.USER_ID;
    this.roleName = SeetionParsed.ROLE_NAME;
    this.desgName = SeetionParsed.DESG_NAME;
    this.roleId = SeetionParsed.ROLE_ID;


    let pagecontent: any = document.querySelector('.page-container');

    // Full width less than 800
    var windowWidth = window.outerWidth;
    if (windowWidth < 800) {
      pagecontent.classList.add("display-full");

    }
    else {
      pagecontent.classList.remove("display-full");
    }
    // Full width less than 800



  }


  changeLang(language: string) {
    // localStorage.setItem('locale', language);
    // this.translate.use(language);

    let selectedLangCode = language;
    let languageparms = { 'userID': this.sessionStoreduserId, 'selectedLanguage': selectedLangCode };

    // console.log(selectedLangCode)
    sessionStorage.setItem("USER_LANGPREF", CryptoJS.AES.encrypt(JSON.stringify(selectedLangCode), environment.apiHashingKey).toString())
    window.location.reload();
    // this.commonserveice.saveAdminLanguageLabel(languageparms).subscribe((res: any) => {
    //   if(res.status ==200)
    //     {

    //         sessionStorage.setItem("USER_LANGPREF",CryptoJS.AES.encrypt(JSON.stringify(selectedLangCode),environment.apiHashingKey).toString())
    //         // window.location.reload();
    //     }
    // });
  }


  saveAllLanguageLabel() {


    //
    this.commonserveice.saveAllLanguageLabel().subscribe({
      next: (response) => {
        let allLangResult = '';
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
  
  
            allLangResult = res.result;
            //console.log(allLangResult);
            sessionStorage.setItem("ALL_LANG_LIST", CryptoJS.AES.encrypt(JSON.stringify(allLangResult), environment.apiHashingKey).toString());
  
            location.reload()
  
          }
          else {
            console.log(res.messages)
          }
        } else {
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
  
        }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })
 


  }
  //\\ ======================== // Get Languages // ======================== //\\
  getLanguage(intid: any) {

    let params = {

      'intId': intid
    };
    this.labelLanguage.getlanguages(params).subscribe({
      next: (response) => {
        let respData = response.RESPONSE_DATA;
        let respToken = response.RESPONSE_TOKEN;
        let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();
        if (respToken == verifyToken) {
          let res: any = Buffer.from(respData, 'base64');
          res = JSON.parse(res.toString());
          if (res.status == 200) {
  
  
            this.languageList = res.result;
            //console.log(this.languageList)
  
          }
          else {
            console.log(res.messages)
          }
        } else {
          this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.invalidResponse))
  
        }
      },
      error: (msg) => {
        this.authService.directlogout();
     }
   })

   
  }
  //\\ ======================== // Get Languages // ======================== //\\

  notificationOpen() {
    $(this.notificationsec).toggleClass("active");
  }

  divclose() {
    $(this.notificationsec).toggleClass("active");
  }

  setTheme(themeName: any) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }
  // function to toggle between light and dark theme
  toggleTheme() {

    if (localStorage.getItem('theme') === 'theme-dark') {
      this.setTheme('theme-light');
    } else {
      this.setTheme('theme-dark');
    }
  }
  togglemenu() {

    var windowWidth = window.outerWidth;

    $(".nav-toggle-btn").toggleClass("on");
    $('.page-container').toggleClass("display-full");
    $('.sidemenu').toggleClass("active");
    $('.fixed-topmenu').toggleClass("active");
  }

  logout() {

    // logoutResponse

    let forlderParams = {}

    Swal.fire({
      text: this.commonserveice.langReplace('You want to log out') + ' ?',
      showDenyButton: true,
      denyButtonText: this.commonserveice.langReplace('No'),
      confirmButtonText: this.commonserveice.langReplace('Yes'),

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.authService.logout(forlderParams).subscribe({
          next: (response) => {
            let respData = response.RESPONSE_DATA;
            let respToken = response.RESPONSE_TOKEN;
            //let verifyToken = CryptoJS.HmacSHA256(letterParams, environment.apiHashingKey).toString();
  
            let res: any = Buffer.from(respData, 'base64');
            let responseResult = JSON.parse(res)
            if (responseResult.status == 200) {
  
              sessionStorage.removeItem('ADMIN_SESSION');
              sessionStorage.removeItem('TOKEN');
              sessionStorage.removeItem('USER_LANGPREF');
              sessionStorage.removeItem('ALL_LANG_LIST');
              this.router.navigateByUrl('/login');
  
            }
            else {
              sessionStorage.removeItem('ADMIN_SESSION');
              sessionStorage.removeItem('TOKEN');
              sessionStorage.removeItem('USER_LANGPREF');
              sessionStorage.removeItem('ALL_LANG_LIST');
              this.router.navigateByUrl('/login');
            }
          },
          error: (msg) => {
            sessionStorage.removeItem('ADMIN_SESSION');
            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('USER_LANGPREF');
            sessionStorage.removeItem('ALL_LANG_LIST');
            this.router.navigateByUrl('/login');
            this.authService.directlogout();
         }
       })

       



      }
    })




  }

  getUserNotification() {

    let formParams = {

    };

    
    this.commonserveice.showUserNotification(formParams).subscribe({
  next: (response) => {   let respData = response.RESPONSE_DATA;

    let respToken = response.RESPONSE_TOKEN;



    let verifyToken = CryptoJS.HmacSHA256(respData, environment.apiHashingKey).toString();

    if (respToken == verifyToken) {

      let res: any = Buffer.from(respData, 'base64');

      let responseResult = JSON.parse(res)

      //console.log(responseResult);

      if (responseResult.status == 200) {

        this.totalNotificationCount = responseResult.result.length;
        this.notificationList = responseResult.result;



      }

      else if (responseResult.status == 400) {



      }

      else if (responseResult.status == 501) {



        this.authService.directlogout();

      }

      else {

        this.commonserveice.swalfire('error',this.commonserveice.langReplace(environment.somethingWrong))

      }

    }

    else {

      this.authService.directlogout();

    }},
  error: (msg) => {
    this.authService.directlogout();
 }
})
 

  }

  loadpreview(fileid:any,fileType:any,filePath:any,logid:any,lockStatus:any)
  {
  //  this.open(this.previewModal);
    
       
      let encSchemeStr = this.encDec.encText((fileid+':'+filePath+':'+lockStatus+':'+logid+':'+fileType).toString());
     
      const url = environment.siteURL+`#/windowPrev/`+encSchemeStr;
      const w = screen.width * 0.9;
      const h = screen.height * 0.8;
      const left = (screen.width / 2) - (w / 2);
      const top = (screen.height / 2) - (h / 2);
      const randomnumber = Math.floor((Math.random() * 100) + 1);
      // tslint:disable-next-line:max-line-length
      window.open(url, '_blank', 'PopUp' + randomnumber + ',scrollbars=1,menubar=0,resizable=1,width = ' + w + ', height = ' + h + ', top = ' + top + ', left = ' + left);
     
       
        
      
  }


}
