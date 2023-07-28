import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from "crypto-js";
@Pipe({
  name: 'langReplace'
})
export class LangReplacePipe implements PipeTransform {

  transform(languageText:any): unknown {

    if(languageText==''|| languageText==undefined || languageText=='undefined' || sessionStorage.getItem("ALL_LANG_LIST")==undefined ||  sessionStorage.getItem("ALL_LANG_LIST")=='undefined')
        {
        
          return languageText;
        }
       
        let lngToLower : any = languageText.toLowerCase();
        let allLangListResult:any = sessionStorage.getItem("ALL_LANG_LIST");
        let SeetionParsedLangRes =JSON.parse(CryptoJS.AES.decrypt(allLangListResult, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 

        let userallLangListResult:any = sessionStorage.getItem("USER_LANGPREF");
        let userSeetionParsedLangRes =JSON.parse(CryptoJS.AES.decrypt(userallLangListResult, environment.apiHashingKey).toString(CryptoJS.enc.Utf8)); 



        if(SeetionParsedLangRes[lngToLower] != undefined)
        {
          let allParsedLang = JSON.parse(SeetionParsedLangRes[lngToLower]);
          

          return allParsedLang[userSeetionParsedLangRes];


        }
        else
         {
            return languageText;
         }
  }

}
