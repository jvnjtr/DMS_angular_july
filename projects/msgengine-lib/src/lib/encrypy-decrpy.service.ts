import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { VarlistService } from './varlist.service';



@Injectable({
  providedIn: 'root'
})
export class EncrypyDecrpyService {




  constructor(private varlist:VarlistService) { }

 
  encText(plainText:any) {
    let encKey = this.varlist.apiHashingKey;
    let text = plainText;
    let iv = CryptoJS.enc.Hex.parse(this.varlist.encryptIV);
    return btoa(CryptoJS.AES.encrypt(text, encKey, { iv: iv }).toString());
  }

  decText(encryptedText:any) {
    encryptedText = atob(encryptedText);
    let encKey = this.varlist.apiHashingKey;
    let iv = CryptoJS.enc.Hex.parse(this.varlist.encryptIV);
    var decryptText = CryptoJS.AES.decrypt(encryptedText, encKey, { iv: iv });
    return decryptText.toString(CryptoJS.enc.Utf8);
  }



   escapeHtml(text:string) {
     if(text=='')
     {
        return text;
     }
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&quot;");
  }

   decodeHtml(str:any)
{
  if(str)
  {
    var map:any =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m:any) {return map[m];});
}
else
{
  return  str;
}
}
}
