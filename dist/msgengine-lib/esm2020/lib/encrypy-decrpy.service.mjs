import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as i0 from "@angular/core";
import * as i1 from "./varlist.service";
export class EncrypyDecrpyService {
    constructor(varlist) {
        this.varlist = varlist;
    }
    encText(plainText) {
        let encKey = this.varlist.apiHashingKey;
        let text = plainText;
        let iv = CryptoJS.enc.Hex.parse(this.varlist.encryptIV);
        return btoa(CryptoJS.AES.encrypt(text, encKey, { iv: iv }).toString());
    }
    decText(encryptedText) {
        encryptedText = atob(encryptedText);
        let encKey = this.varlist.apiHashingKey;
        let iv = CryptoJS.enc.Hex.parse(this.varlist.encryptIV);
        var decryptText = CryptoJS.AES.decrypt(encryptedText, encKey, { iv: iv });
        return decryptText.toString(CryptoJS.enc.Utf8);
    }
    escapeHtml(text) {
        if (text == '') {
            return text;
        }
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&quot;");
    }
    decodeHtml(str) {
        if (str) {
            var map = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': '"',
                '&#039;': "'"
            };
            return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) { return map[m]; });
        }
        else {
            return str;
        }
    }
}
EncrypyDecrpyService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: EncrypyDecrpyService, deps: [{ token: i1.VarlistService }], target: i0.ɵɵFactoryTarget.Injectable });
EncrypyDecrpyService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: EncrypyDecrpyService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: EncrypyDecrpyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.VarlistService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jcnlweS1kZWNycHkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21zZ2VuZ2luZS1saWIvc3JjL2xpYi9lbmNyeXB5LWRlY3JweS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLFFBQVEsTUFBTSxXQUFXLENBQUM7OztBQVF0QyxNQUFNLE9BQU8sb0JBQW9CO0lBSy9CLFlBQW9CLE9BQXNCO1FBQXRCLFlBQU8sR0FBUCxPQUFPLENBQWU7SUFBSSxDQUFDO0lBRy9DLE9BQU8sQ0FBQyxTQUFhO1FBQ25CLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUNyQixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsT0FBTyxDQUFDLGFBQWlCO1FBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEQsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFJQSxVQUFVLENBQUMsSUFBVztRQUNwQixJQUFHLElBQUksSUFBRSxFQUFFLEVBQ1g7WUFDRyxPQUFPLElBQUksQ0FBQztTQUNkO1FBQ0YsT0FBTyxJQUFJO2FBQ04sT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7YUFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7YUFDckIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7YUFDckIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUM7YUFDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUEsVUFBVSxDQUFDLEdBQU87UUFFbkIsSUFBRyxHQUFHLEVBQ047WUFDRSxJQUFJLEdBQUcsR0FDUDtnQkFDSSxPQUFPLEVBQUUsR0FBRztnQkFDWixNQUFNLEVBQUUsR0FBRztnQkFDWCxNQUFNLEVBQUUsR0FBRztnQkFDWCxRQUFRLEVBQUUsR0FBRztnQkFDYixRQUFRLEVBQUUsR0FBRzthQUNoQixDQUFDO1lBQ0YsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLFVBQVMsQ0FBSyxJQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7U0FDMUY7YUFFRDtZQUNFLE9BQVEsR0FBRyxDQUFDO1NBQ2I7SUFDRCxDQUFDOztrSEF4RFksb0JBQW9CO3NIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs0RkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgKiBhcyBDcnlwdG9KUyBmcm9tICdjcnlwdG8tanMnO1xuaW1wb3J0IHsgVmFybGlzdFNlcnZpY2UgfSBmcm9tICcuL3Zhcmxpc3Quc2VydmljZSc7XG5cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFbmNyeXB5RGVjcnB5U2VydmljZSB7XG5cblxuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2YXJsaXN0OlZhcmxpc3RTZXJ2aWNlKSB7IH1cblxuIFxuICBlbmNUZXh0KHBsYWluVGV4dDphbnkpIHtcbiAgICBsZXQgZW5jS2V5ID0gdGhpcy52YXJsaXN0LmFwaUhhc2hpbmdLZXk7XG4gICAgbGV0IHRleHQgPSBwbGFpblRleHQ7XG4gICAgbGV0IGl2ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZSh0aGlzLnZhcmxpc3QuZW5jcnlwdElWKTtcbiAgICByZXR1cm4gYnRvYShDcnlwdG9KUy5BRVMuZW5jcnlwdCh0ZXh0LCBlbmNLZXksIHsgaXY6IGl2IH0pLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgZGVjVGV4dChlbmNyeXB0ZWRUZXh0OmFueSkge1xuICAgIGVuY3J5cHRlZFRleHQgPSBhdG9iKGVuY3J5cHRlZFRleHQpO1xuICAgIGxldCBlbmNLZXkgPSB0aGlzLnZhcmxpc3QuYXBpSGFzaGluZ0tleTtcbiAgICBsZXQgaXYgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKHRoaXMudmFybGlzdC5lbmNyeXB0SVYpO1xuICAgIHZhciBkZWNyeXB0VGV4dCA9IENyeXB0b0pTLkFFUy5kZWNyeXB0KGVuY3J5cHRlZFRleHQsIGVuY0tleSwgeyBpdjogaXYgfSk7XG4gICAgcmV0dXJuIGRlY3J5cHRUZXh0LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcbiAgfVxuXG5cblxuICAgZXNjYXBlSHRtbCh0ZXh0OnN0cmluZykge1xuICAgICBpZih0ZXh0PT0nJylcbiAgICAge1xuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgfVxuICAgIHJldHVybiB0ZXh0XG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxuICAgICAgICAucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIilcbiAgICAgICAgLnJlcGxhY2UoLycvZywgXCImcXVvdDtcIik7XG4gIH1cblxuICAgZGVjb2RlSHRtbChzdHI6YW55KVxue1xuICBpZihzdHIpXG4gIHtcbiAgICB2YXIgbWFwOmFueSA9XG4gICAge1xuICAgICAgICAnJmFtcDsnOiAnJicsXG4gICAgICAgICcmbHQ7JzogJzwnLFxuICAgICAgICAnJmd0Oyc6ICc+JyxcbiAgICAgICAgJyZxdW90Oyc6ICdcIicsXG4gICAgICAgICcmIzAzOTsnOiBcIidcIlxuICAgIH07XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mYW1wO3wmbHQ7fCZndDt8JnF1b3Q7fCYjMDM5Oy9nLCBmdW5jdGlvbihtOmFueSkge3JldHVybiBtYXBbbV07fSk7XG59XG5lbHNlXG57XG4gIHJldHVybiAgc3RyO1xufVxufVxufVxuIl19