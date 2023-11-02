import { Pipe } from '@angular/core';
import * as CryptoJS from "crypto-js";
import * as i0 from "@angular/core";
import * as i1 from "./varlist.service";
export class TranslatePipe {
    constructor(varlist) {
        this.varlist = varlist;
    }
    transform(languageText) {
        if (languageText == '' || languageText == undefined || languageText == 'undefined' || sessionStorage.getItem("ALL_LANG_LIST") == undefined || sessionStorage.getItem("ALL_LANG_LIST") == 'undefined') {
            return languageText;
        }
        let lngToLower = languageText.toLowerCase();
        let allLangListResult = sessionStorage.getItem("ALL_LANG_LIST");
        let SeetionParsedLangRes = JSON.parse(CryptoJS.AES.decrypt(allLangListResult, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
        let userallLangListResult = sessionStorage.getItem("USER_LANGPREF");
        let userSeetionParsedLangRes = JSON.parse(CryptoJS.AES.decrypt(userallLangListResult, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
        if (SeetionParsedLangRes[lngToLower] != undefined) {
            let allParsedLang = JSON.parse(SeetionParsedLangRes[lngToLower]);
            return allParsedLang[userSeetionParsedLangRes];
        }
        else {
            return languageText;
        }
    }
}
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TranslatePipe, deps: [{ token: i1.VarlistService }], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: TranslatePipe, name: "translate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate'
                }]
        }], ctorParameters: function () { return [{ type: i1.VarlistService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tc2dlbmdpbmUtbGliL3NyYy9saWIvdHJhbnNsYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFHcEQsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7OztBQUl0QyxNQUFNLE9BQU8sYUFBYTtJQUV4QixZQUFtQixPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtJQUFHLENBQUM7SUFDOUMsU0FBUyxDQUFDLFlBQWdCO1FBRXhCLElBQUcsWUFBWSxJQUFFLEVBQUUsSUFBRyxZQUFZLElBQUUsU0FBUyxJQUFJLFlBQVksSUFBRSxXQUFXLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBRSxTQUFTLElBQUssY0FBYyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBRSxXQUFXLEVBQ3JMO1lBRUUsT0FBTyxZQUFZLENBQUM7U0FDckI7UUFFRCxJQUFJLFVBQVUsR0FBUyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEQsSUFBSSxpQkFBaUIsR0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BFLElBQUksb0JBQW9CLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFdEksSUFBSSxxQkFBcUIsR0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksd0JBQXdCLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFJOUksSUFBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxTQUFTLEVBQ2hEO1lBQ0UsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBR2pFLE9BQU8sYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FHaEQ7YUFFQTtZQUNHLE9BQU8sWUFBWSxDQUFDO1NBQ3RCO0lBQ1IsQ0FBQzs7MkdBakNVLGFBQWE7eUdBQWIsYUFBYTs0RkFBYixhQUFhO2tCQUh6QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxXQUFXO2lCQUNsQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFZhcmxpc3RTZXJ2aWNlIH0gZnJvbSAnLi92YXJsaXN0LnNlcnZpY2UnO1xyXG5pbXBvcnQgKiBhcyBDcnlwdG9KUyBmcm9tIFwiY3J5cHRvLWpzXCI7XHJcbkBQaXBlKHtcclxuICBuYW1lOiAndHJhbnNsYXRlJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFybGlzdDogVmFybGlzdFNlcnZpY2UpIHt9XHJcbiAgdHJhbnNmb3JtKGxhbmd1YWdlVGV4dDphbnkpOiB1bmtub3duIHtcclxuXHJcbiAgICBpZihsYW5ndWFnZVRleHQ9PScnfHwgbGFuZ3VhZ2VUZXh0PT11bmRlZmluZWQgfHwgbGFuZ3VhZ2VUZXh0PT0ndW5kZWZpbmVkJyB8fCBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQUxMX0xBTkdfTElTVFwiKT09dW5kZWZpbmVkIHx8ICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQUxMX0xBTkdfTElTVFwiKT09J3VuZGVmaW5lZCcpXHJcbiAgICAgICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIGxhbmd1YWdlVGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBsZXQgbG5nVG9Mb3dlciA6IGFueSA9IGxhbmd1YWdlVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBhbGxMYW5nTGlzdFJlc3VsdDphbnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQUxMX0xBTkdfTElTVFwiKTtcclxuICAgICAgICBsZXQgU2VldGlvblBhcnNlZExhbmdSZXMgPUpTT04ucGFyc2UoQ3J5cHRvSlMuQUVTLmRlY3J5cHQoYWxsTGFuZ0xpc3RSZXN1bHQsIHRoaXMudmFybGlzdC5hcGlIYXNoaW5nS2V5KS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCkpOyBcclxuXHJcbiAgICAgICAgbGV0IHVzZXJhbGxMYW5nTGlzdFJlc3VsdDphbnkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiVVNFUl9MQU5HUFJFRlwiKTtcclxuICAgICAgICBsZXQgdXNlclNlZXRpb25QYXJzZWRMYW5nUmVzID1KU09OLnBhcnNlKENyeXB0b0pTLkFFUy5kZWNyeXB0KHVzZXJhbGxMYW5nTGlzdFJlc3VsdCwgdGhpcy52YXJsaXN0LmFwaUhhc2hpbmdLZXkpLnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KSk7IFxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmKFNlZXRpb25QYXJzZWRMYW5nUmVzW2xuZ1RvTG93ZXJdICE9IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsZXQgYWxsUGFyc2VkTGFuZyA9IEpTT04ucGFyc2UoU2VldGlvblBhcnNlZExhbmdSZXNbbG5nVG9Mb3dlcl0pO1xyXG4gICAgICAgICAgXHJcblxyXG4gICAgICAgICAgcmV0dXJuIGFsbFBhcnNlZExhbmdbdXNlclNlZXRpb25QYXJzZWRMYW5nUmVzXTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlVGV4dDtcclxuICAgICAgICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19