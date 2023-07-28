import { Component, ViewChild, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';


  ngOnInit(): void {


    //sessionStorage.setItem("USER_LANGPREF",CryptoJS.AES.encrypt(JSON.stringify("Hn"),environment.apiHashingKey).toString());

//     let sessionUserLangtoken:any = sessionStorage.getItem('USER_LANGPREF'); 
// if(!sessionUserLangtoken){
//   alert(0)
//  sessionStorage.setItem("USER_LANGPREF",CryptoJS.AES.encrypt(JSON.stringify("en"),environment.apiHashingKey).toString());
// }
  // let sessionUserLang =JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 
  }
 

  
}
