import * as i0 from '@angular/core';
import { Injectable, Component, Pipe, Input, EventEmitter, Output, ViewChild, NgModule } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';
import * as i1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as i7 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i8 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i9 from 'ngx-dropzone';
import { NgxDropzoneModule } from 'ngx-dropzone';
import * as i5 from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as i12 from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import * as i11 from 'ckeditor4-angular';
import { CKEditorModule } from 'ckeditor4-angular';

class VarlistService {
    constructor() {
        this.apiHashingKey = '22CSMTOOL2022';
        this.encryptIV = '26102021@qwI';
        this.serviceURL = 'http://172.27.30.93:7001/dms_php_admin/admin/message_module';
        this.serviceName = '/publishUnpublish';
        this.serviceModuleconfig = '/manageMessageConfig';
        this.formEnable = false;
        this.dynamicForm = false;
        this.sessionEncrypted = true;
        this.formId = "0";
        this.somethingWrong = 'something went wrong';
        this.invalidResponse = 'Invalid Response';
        this.errorApiResponse = 'Error in API response';
        this.ckconfig = {
            language: "en",
            allowedContent: true,
            height: 200,
            forcePasteAsPlainText: true,
            font_names: 'Arial;Times New Roman;Verdana',
            extraPlugins: 'divarea',
            removePlugins: 'exportpdf',
            toolbarGroups: [
                { name: 'document', groups: ['mode', 'document', 'doctools'] },
                { name: 'clipboard', groups: ['clipboard', 'undo'] },
                { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                { name: 'forms', groups: ['forms'] },
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                { name: 'links', groups: ['links'] },
                { name: 'insert', groups: ['insert'] },
                { name: 'styles', groups: ['styles'] },
                { name: 'colors', groups: ['colors'] },
                { name: 'tools', groups: ['tools'] },
                { name: 'others', groups: ['others'] },
                { name: 'about', groups: ['about'] }
            ],
            removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
        };
    }
}
VarlistService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: VarlistService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
VarlistService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: VarlistService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: VarlistService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });

class MsgengineLibService {
    constructor(router, http, varlist) {
        this.router = router;
        this.http = http;
        this.varlist = varlist;
    }
    directlogoutlib() {
        sessionStorage.removeItem('ADMIN_SESSION');
        sessionStorage.removeItem('TOKEN');
        this.router.navigateByUrl('/login');
    }
    getGetwayName(formParams) {
        let requestParam = Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceURL = this.varlist.serviceURL + '/getwayConfiguration';
        let desnResponse = this.http.post(serviceURL, reqData);
        return desnResponse;
    }
    viewGatwayTypes(formParams) {
        let requestParam = Buffer.from(JSON.stringify(formParams), 'utf8').toString('base64');
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceURL = this.varlist.serviceURL + '/getwayType';
        let desnResponse = this.http.post(serviceURL, reqData);
        return desnResponse;
    }
    newGetwayConfig(docParams) {
        let requestParam = btoa(JSON.stringify(docParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/insertGatewayConfiguration';
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    viewGetwayConfig(docParams) {
        let requestParam = btoa(JSON.stringify(docParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/viewConfiguration';
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    getPrevDetails(docParams) {
        let requestParam = btoa(JSON.stringify(docParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/fillAll';
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    deleteGetwayConfig(docParams) {
        let requestParam = btoa(JSON.stringify(docParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/deletegetwayDocument';
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    deleteAll(formParams, fname) {
        let requestParam = btoa(JSON.stringify(formParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = {
            REQUEST_DATA: requestParam,
            REQUEST_TOKEN: requestToken
        };
        let serviceUrl = this.varlist.serviceURL + fname;
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    publishAll(formParams, fname) {
        let requestParam = btoa(JSON.stringify(formParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = {
            REQUEST_DATA: requestParam,
            REQUEST_TOKEN: requestToken
        };
        let serviceUrl = this.varlist.serviceURL + fname;
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    unpublishAll(formParams, fname) {
        let requestParam = btoa(JSON.stringify(formParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = {
            REQUEST_DATA: requestParam,
            REQUEST_TOKEN: requestToken
        };
        let serviceUrl = this.varlist.serviceURL + fname;
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    newMessage(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        let reqData = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/addMessageConfig';
        let serviceRes = this.http.post(serviceUrl, reqData);
        return serviceRes;
    }
    // newMessage(messageParams: any): Observable<any> {
    //   let serviceUrl = this.varlist.serviceURL + 'addMessageConfig';
    //   let serviceRes = this.http.post(serviceUrl, messageParams);
    //   return serviceRes;
    // }
    viewMessage(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/viewMessageConfig';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    reminderSchedular(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/getRemindercron';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    msgexecuteSchedular(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/startExecution';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    msgstopSchedular(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/stopExecution';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    getStaticConfigurationKeys(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/GetStaticKeys';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    getFetchPublishRecord(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/FetchPublishRecord';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    getLanguage(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/viewLanguage';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    getForms(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/getFormName';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    getConfigurationKeys(messageParams) {
        let requestParam = btoa(JSON.stringify(messageParams));
        let requestToken = CryptoJS.HmacSHA256(requestParam, this.varlist.apiHashingKey).toString();
        messageParams = { 'REQUEST_DATA': requestParam, 'REQUEST_TOKEN': requestToken };
        let serviceUrl = this.varlist.serviceURL + '/getConfigKeys';
        let serviceRes = this.http.post(serviceUrl, messageParams);
        return serviceRes;
    }
    msguploadFile(formParams) {
        let serviceURL = this.varlist.serviceURL + '/fileUpload';
        let moduleResponse = this.http.post(serviceURL, formParams);
        return moduleResponse;
    }
    langReplace(languageText, languageName = "") {
        if (languageText != "" && languageText != undefined) {
            let lngToLower = languageText.toLowerCase();
            let allLangListResult = sessionStorage.getItem("ALL_LANG_LIST");
            let SeetionParsedLangRes = JSON.parse(CryptoJS.AES.decrypt(allLangListResult, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
            let sessionUserLangtoken = sessionStorage.getItem("USER_LANGPREF");
            let sessionUserLang = JSON.parse(CryptoJS.AES.decrypt(sessionUserLangtoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
            if (SeetionParsedLangRes[lngToLower] != undefined) {
                let allParsedLang = JSON.parse(SeetionParsedLangRes[lngToLower]);
                return allParsedLang[sessionUserLang] != "" && allParsedLang[sessionUserLang] != undefined
                    ? allParsedLang[sessionUserLang]
                    : languageText;
            }
            else {
                return languageText;
            }
        }
        else {
            return languageText;
        }
    }
    swalfire(type, message) {
        return Swal.fire({
            icon: type,
            text: message
        });
    }
}
MsgengineLibService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibService, deps: [{ token: i1.Router }, { token: i2.HttpClient }, { token: VarlistService }], target: i0.ɵɵFactoryTarget.Injectable });
MsgengineLibService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.HttpClient }, { type: VarlistService }]; } });

class MsgengineLibComponent {
    constructor() { }
    ngOnInit() {
    }
}
MsgengineLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MsgengineLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: MsgengineLibComponent, selector: "lib-msgengine-lib", ngImport: i0, template: `
    <p>
      msgengine-lib works change
    </p>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-msgengine-lib', template: `
    <p>
      msgengine-lib works change
    </p>
  ` }]
        }], ctorParameters: function () { return []; } });

class ValidatorchecklistService {
    constructor(commonserveice) {
        this.commonserveice = commonserveice;
    }
    blankCheck(elmVal, msg, elmId = "") {
        if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
            Swal.fire({
                icon: 'error',
                text: msg
            }).then(function () {
                if (elmId != "") {
                    setTimeout(() => {
                        const element = document.getElementById(elmId);
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    blankImgCheck(elmVal, msg) {
        if (elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Please') + msg
            });
            return false;
        }
        return true;
    }
    blankCheckRdo(elmNm, msg, elmId = "") {
        let ele = document.getElementsByName(elmNm);
        let checkedCtr = 0;
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                checkedCtr++;
            }
        }
        if (checkedCtr == 0) {
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Select') + " " + msg
            }).then(function () {
                if (elmId != "") {
                    setTimeout(() => {
                        document.getElementById(elmId).focus();
                        document.getElementById(elmId).scrollTo({ top: document.getElementById(elmId).getBoundingClientRect().top -
                                document.body.getBoundingClientRect().top - 50 });
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    blankCheckRdoDynamic(clsName, msg, elmId = "") {
        let className = 'cls_' + clsName;
        let ele = document.getElementsByClassName(className);
        let checkedCtr = 0;
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                checkedCtr++;
            }
        }
        if (checkedCtr == 0) {
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Select') + " " + msg
            }).then(function () {
                // console.log()
                if (ele[0] != undefined) {
                    setTimeout(() => {
                        document.getElementById(ele[0].id)?.closest('div').focus();
                        document.getElementById(ele[0].id).scrollIntoView();
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    blankCheckChkboxDynamic(clsName, msg, elmId = "") {
        // alert("Arpita");
        let className = 'cls_' + clsName;
        let ele = document.getElementsByClassName(className);
        let checkedCtr = 0;
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                checkedCtr++;
            }
        }
        if (checkedCtr == 0) {
            Swal.fire({
                icon: 'error',
                text: 'Select ' + msg
            }).then(function () {
                if (elmId != "") {
                    setTimeout(() => {
                        document.getElementById(elmId).focus();
                        document.getElementById(elmId).scrollTo({ top: document.getElementById(elmId).getBoundingClientRect().top -
                                document.body.getBoundingClientRect().top - 50 });
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    selectDropdown(elmVal, msg, elmId = "") {
        if (elmVal == 0 || elmVal == '' || typeof (elmVal) == undefined || elmVal == null) {
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Select') + " " + msg
            }).then(function () {
                if (elmId != "") {
                    setTimeout(() => {
                        const element = document.getElementById(elmId);
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    maxLength(elmVal, fldLngth, msg, elmId = "") {
        if (elmVal.length > 0 && elmVal.length > fldLngth) {
            Swal.fire({
                icon: 'error',
                text: msg + ' should not more than ' + fldLngth + ' character'
            }).then(function () {
                if (elmId != "") {
                    setTimeout(() => {
                        const element = document.getElementById(elmId);
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    minLength(elmVal, fldLngth, msg, elmId = "") {
        if (elmVal.length > 0 && elmVal.length < fldLngth) {
            //alert("hii");
            Swal.fire({
                icon: 'error',
                text: msg + ' should not be less than' + fldLngth + ' character'
            }).then(function () {
                if (elmId != "") {
                    setTimeout(() => {
                        const element = document.getElementById(elmId);
                        element.focus();
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            });
            return false;
        }
        return true;
    }
    validEmail(elmVal, elmId = "") {
        let pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if (elmVal != '') {
            if (pattern.test(elmVal) == true)
                return true;
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Please enter a valid email id'
                }).then(function () {
                    if (elmId != "") {
                        setTimeout(() => {
                            const element = document.getElementById(elmId);
                            element.focus();
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 500);
                    }
                });
                return false;
            }
        }
        return true;
    }
    validMob(elmVal, elmId = "") {
        let pattern = new RegExp(/^[6-9][0-9]{9}$/);
        if (elmVal != '') {
            if (pattern.test(elmVal) == true)
                return true;
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Please enter a valid mobile no'
                }).then(function () {
                    if (elmId != "") {
                        setTimeout(() => {
                            const element = document.getElementById(elmId);
                            element.focus();
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 500);
                    }
                });
                return false;
            }
        }
        return true;
    }
    blockspecialchar_first(evt, blockStatus) {
        let validStatus = true;
        if (blockStatus == true) {
            return validStatus;
        }
        let txtValue = evt.target.value;
        // console.log(txtValue);
        // if(txtValue.length == 0)
        //   {
        //     Swal.fire({
        //       icon: 'error',
        //       text: this.comConfigServ.langReplace('White Space not allowed in 1st Place')+"!!!"
        //     });
        //     (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
        //     return false;
        //   }
        switch (txtValue.charCodeAt(0)) {
            case 44:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ', Not allowed in 1st Place !!!'
                    });
                    // viewAlert(", Not allowed in 1st Place!!!");
                    validStatus = false;
                    break;
                }
            case 47:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '/ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 58:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ': Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 46:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '. Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 39:
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'Single Quote not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 32:
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'White Space not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                    // return false;
                }
            case 40:
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 41:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ') Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 45:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '- Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 95:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"_ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 59:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"; Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 124:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"| Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 63:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"? Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 34:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '" Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 35:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '# Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 36:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '$ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 38:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '& Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 126:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '~ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 96:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '` Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 33:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '! Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 37:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '% Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 94:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '^ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 42:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '* Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 92:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '\\ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 43:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '+ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 61:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '= Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 123:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '{ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 125:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '} Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 91:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '[ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 93:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '] Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 60:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '< Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 62:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '> Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            case 64:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '@ Not allowed in 1st Place !!!'
                    });
                    validStatus = false;
                    break;
                }
            default:
                validStatus = true;
                break;
        }
        if (validStatus == false) {
            // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            evt.target.value = '';
        }
        return validStatus;
    }
    checkForSpecialCharacterAllPostion(evt, type = 0) {
        if (type == true || evt.target.type == "email") {
            return true;
        }
        let txtValue = evt.target.value;
        let length = txtValue.length;
        let validStatus = true;
        if (txtValue.charCodeAt(0) == 32) {
            Swal.fire({
                icon: 'error',
                text: 'White space ' + 'not allowed in first place' + '!!!'
            });
            evt.target.value = '';
        }
        switch (txtValue.charCodeAt(length - 1)) {
            case 44:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ', ' + 'Not allowed' + '!!!'
                    });
                    // viewAlert(", Not allowed!!!");
                    validStatus = false;
                    break;
                }
            case 47:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '/ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 58:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ': ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 46:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '. ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 39:
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'Single Quote not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            // case 32:
            // {
            //     Swal.fire({
            //       icon: 'error',
            //       text: 'White Space not allowed'+'!!!'
            //     });
            //     validStatus =  false;
            //     break;
            //    // return false;
            // }
            case 40:
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 41:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ') ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 45:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '- ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 95:
                {
                    if (type != 1) {
                        Swal.fire({
                            icon: 'error',
                            text: '"_ ' + 'Not allowed' + '!!!'
                        });
                        validStatus = false;
                    }
                    break;
                }
            case 59:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"; ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 124:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"| ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 63:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"? ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 34:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '" ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 35:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '# ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 36:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '$ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 38:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '& ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 126:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '~ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 96:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '` ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 33:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '! ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 37:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '% ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 94:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '^ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 42:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '* ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 92:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '\\ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 43:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '+ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 61:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '= ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 123:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '{ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 125:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '} ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 91:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '[ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 93:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '] ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 60:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '< ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 62:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '> ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 64:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '@ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            default:
                validStatus = true;
                break;
        }
        if (validStatus == false) {
            // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            evt.target.value = '';
        }
        return validStatus;
        if (evt.target.value.indexOf(' ') > 0) {
            Swal.fire({
                icon: 'error',
                text: 'Space not allowed'
            });
            // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            evt.target.value = '';
            return false;
        }
        return true;
    }
    textareaSpecialCharacterAllPostion(evt, type = 0) {
        let txtValue = evt.target.value;
        // console.log(evt.target.value);
        let length = txtValue.length;
        let validStatus = true;
        switch (txtValue.charCodeAt(length - 1)) {
            case 47:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '/ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 58:
                {
                    Swal.fire({
                        icon: 'error',
                        text: ': ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 39:
                {
                    Swal.fire({
                        icon: 'error',
                        text: 'Single Quote not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 95:
                {
                    if (type != 1) {
                        Swal.fire({
                            icon: 'error',
                            text: '"_ ' + 'Not allowed' + '!!!'
                        });
                        validStatus = false;
                    }
                    break;
                }
            case 59:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"; ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 124:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '"| ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 34:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '" ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 35:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '# ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 36:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '$ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 38:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '& ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 126:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '~ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 96:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '` ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 33:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '! ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 37:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '% ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 94:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '^ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 42:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '* ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 92:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '\\ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 43:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '+ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 61:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '= ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 123:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '{ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 125:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '} ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 91:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '[ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 93:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '] ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 60:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '< ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 62:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '> ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            case 64:
                {
                    Swal.fire({
                        icon: 'error',
                        text: '@ ' + 'Not allowed' + '!!!'
                    });
                    validStatus = false;
                    break;
                }
            default:
                validStatus = true;
                break;
        }
        if (validStatus == false) {
            // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            evt.target.value = '';
        }
        return validStatus;
        if (evt.target.value.indexOf(' ') > 0) {
            Swal.fire({
                icon: 'error',
                text: 'Space not allowed'
            });
            // (<HTMLInputElement>document.getElementById(evt.target.id)).value='';
            evt.target.value = '';
            return false;
        }
        return true;
    }
    validPassword(elmVal, elmId = "") {
        let pattern = new RegExp(/^.*(?=.{8,15})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!%()*?]).*$/);
        if (elmVal != '') {
            //alert("hii");
            if (pattern.test(elmVal) == true)
                return true;
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Please enter a valid password'
                }).then(function () {
                    if (elmId != "") {
                        setTimeout(() => {
                            document.getElementById(elmId).focus();
                            document.getElementById(elmId).scrollTo({ top: document.getElementById(elmId).getBoundingClientRect().top -
                                    document.body.getBoundingClientRect().top - 50 });
                        }, 500);
                    }
                });
                return false;
            }
        }
        return true;
    }
    // validates Aadhar number received as string
    validAadhar(elmVal) {
        if (elmVal != '') {
            // multiplication table
            const d = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
                [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
                [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
                [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
                [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
                [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
                [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
                [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
                [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
            ];
            // permutation table
            const p = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
                [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
                [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
                [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
                [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
                [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
                [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
            ];
            let c = 0;
            let invertedArray = elmVal.split('').map(Number).reverse();
            invertedArray.forEach((val, i) => {
                c = d[c][p[(i % 8)][val]];
            });
            if (c === 0)
                return true;
            else {
                Swal.fire({
                    icon: 'error',
                    text: 'Please enter a valid aadhaar no'
                });
                return false;
            }
        }
        return true;
    }
    isCharKey(event) {
        var charCode2 = (event.which) ? event.which : event.keyCode;
        if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) &&
            (charCode2 < 97 || charCode2 > 122)) {
            return false;
        }
        return true;
    }
    isCharKeyMob(val) {
        return val.replace(/[^a-zA-z ]/g, '');
    }
    isNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
    isNumberKeyMob(val) {
        return val.replace(/[^0-9]/g, '');
    }
    isAlphaNumeric(event) {
        console.log(event);
        const charCode2 = (event.which) ? event.which : event.keyCode;
        if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 < 48 || charCode2 > 57))) {
            return false;
        }
        return true;
    }
    isAlphaNumericDynamic(event, blockSpecialChars) {
        let isshift = event.shiftKey;
        const charCode2 = (event.which) ? event.which : event.keyCode;
        if (blockSpecialChars == false) {
            if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 < 48 || charCode2 > 57))) {
                return false;
            }
            return true;
        }
        else if (blockSpecialChars == true) {
            if (((isshift == false) && charCode2 >= 48 && charCode2 <= 57) || ((isshift == false) && charCode2 >= 65 && charCode2 <= 90) || (charCode2 == 8) || ((isshift == false) && charCode2 == 190) || ((isshift == false) && charCode2 == 188) || ((isshift == false) && charCode2 == 189) || ((isshift == true) && (charCode2 == 191) || (charCode2 == 48) || (charCode2 == 57)))
                return true;
        }
        return false;
    }
    allowspecialChar(event) {
        const charCode2 = (event.which) ? event.which : event.keyCode;
        if (charCode2 > 32 && (charCode2 < 65 || charCode2 > 90) && (charCode2 < 97 || charCode2 > 122) && (charCode2 > 31 && (charCode2 <= 48 || charCode2 >= 57) && (charCode2 >= 188 || charCode2 <= 191))) {
            return false;
        }
        return true;
    }
    isAlphaNumericMob(val) {
        var numPattern = new RegExp(/^[a-zA-Z0-9-.@ /]*$/);
        if (numPattern.test(val))
            return true;
        return false;
    }
    isDecimal(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        var txtVal = event.target.value;
        if ((charCode > 47 && charCode < 58) || charCode == 46 || charCode == 8 || charCode == 190) {
            if (txtVal.indexOf(".") > 0 && charCode == 190) {
                return false;
            }
            else
                return true;
        }
        return false;
    }
    isDecimalMob(val) {
        return val.replace(/[^\d+(\.\d{1,2}]/g, '');
    }
    dynCtrlVal(ctrlValParam, elemObj) {
        let dynData = ctrlValParam['dynDataObj'];
        let elmVal = ctrlValParam['ctrlVal'];
        let drftSts = ctrlValParam['drftSts'];
        let dispNnSts = ctrlValParam['dispNnSts'];
        let sectnCtrlType = ctrlValParam['ctrlType'];
        let ctrlNm = '';
        let lblName = '';
        let ctrlType = 0;
        let mndSts = 0;
        let fldLngth = 0;
        if (sectnCtrlType == 8) {
            ctrlNm = '';
            lblName = dynData['columnName'];
            ctrlType = dynData['columnType'];
            mndSts = (dispNnSts === false) ? dynData['columnMnd'] : 0;
            fldLngth = dynData['fieldLen'];
        }
        else {
            ctrlNm = dynData['jsnControlArray'][0]['ctrlName'];
            lblName = dynData['vchLabelName'];
            ctrlType = dynData['tinControlType'];
            mndSts = (dispNnSts === false) ? dynData['tinMandatorySts'] : 0;
            fldLngth = dynData['intFieldLength'];
        }
        let valSts = true;
        // for select tag
        if (mndSts == 1 && ctrlType == 2) {
            if (drftSts == false) {
                if (!this.selectDropdown(elmVal, lblName)) {
                    valSts = false;
                }
            }
        }
        // for radio button
        else if (mndSts == 1 && (ctrlType == 5 || ctrlType == 1)) {
            if (drftSts == false) {
                if (!this.blankCheckRdoDynamic(ctrlNm, lblName)) {
                    valSts = false;
                }
            }
        }
        // for text box
        else if (mndSts == 1 && ctrlType == 6) {
            ;
            if (drftSts == false) {
                if (!this.blankCheck(elmVal, lblName)) {
                    valSts = false;
                    //dynData.focus();
                }
            }
            if (!this.maxLength(elmVal, fldLngth, lblName)) {
                valSts = false;
                //dynData.focus();
            }
        }
        // for text area
        else if (mndSts == 1 && ctrlType == 7) {
            if (drftSts == false) {
                if (!this.blankCheck(elmVal, lblName)) {
                    valSts = false;
                    //dynData.focus();
                }
            }
            if (!this.maxLength(elmVal, fldLngth, lblName)) {
                valSts = false;
                //dynData.focus();
            }
        }
        // for date box
        else if (mndSts == 1 && ctrlType == 9) {
            if (drftSts == false) {
                if (!this.blankCheck(elmVal, lblName)) {
                    valSts = false;
                }
            }
        }
        // for time box
        else if (mndSts == 1 && ctrlType == 10) {
            if (drftSts == false) {
                if (!this.blankCheck(elmVal, lblName)) {
                    valSts = false;
                }
            }
        }
        // for date time box
        else if (mndSts == 1 && ctrlType == 11) {
            if (drftSts == false) {
                if (!this.blankCheck(elmVal, lblName)) {
                    valSts = false;
                }
            }
        }
        else {
            valSts = true;
        }
        return valSts;
    }
    isDashSlashNumeric(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        // console.log(charCode);
        if (charCode > 31 && (charCode < 45 || charCode > 57 || charCode == 46))
            return false;
        return true;
    }
    isDashSlashNumericMob(val) {
        return val.replace(/[^0-9/-]/g, '');
    }
    is_url(str) {
        if (str == '' || str == null) {
            return true;
        }
        else {
            // let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            let regexp = /^https?\:\/\/[^\/\s]+(\/.*)?$/; //Accept both private and domain api url
            if (regexp.test(str)) {
                return true;
            }
            else {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace('Enter valid URL')
                });
                return false;
            }
        }
    }
    chkPassword(str) {
        let regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (regexp.test(str)) {
            return true;
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Enter valid Password'
            });
            return false;
        }
    }
    chkblankspace(str) {
        var regexp = /^\S*$/;
        if (regexp.test(str)) {
            return true;
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Space not allowed'
            });
            return false;
        }
    }
    validateFile(fileUploadType, actualFileType) {
        var ext = fileUploadType.substring(fileUploadType.lastIndexOf('/') + 1);
        const fileTypes = { "pdf": ['pdf'],
            "image": ['jpeg', 'jpe', 'png', 'gif', 'jpg'],
            "excel": ['csv', 'dbf', 'htm', 'html', 'mht', 'mhtml', 'ods', 'pdf', 'prn', 'txt', 'xla', 'xlam', 'xls', 'xlsb', 'xlsx', 'xlt', 'xltm', 'xls', 'xlsb', 'xlsm', 'xlsx', 'xlw', 'xps'],
            "doc": ['doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'htm', 'html', 'mht', 'mhtml', 'odt', 'pdf', 'rtf', 'txt', 'wps', 'xml', 'xps', 'msword'],
            "video": ['mp4', 'ogx', 'oga', 'ogv', 'ogg', 'webm'],
            "audio": ['mp3', 'mpeg']
        };
        if (fileTypes[actualFileType].includes(ext)) {
            return true;
        }
        else {
            return false;
        }
    }
    validateFileSize(uploadedFileSize, actualFileSize, actualFileSizeType) {
        if (actualFileSizeType.toLowerCase() == 'kb') {
            actualFileSize = 1024 * actualFileSize;
        }
        else {
            actualFileSize = 1024 * 1024 * actualFileSize;
        }
        let fileValidStatus = true;
        if (uploadedFileSize > actualFileSize) {
            fileValidStatus = false;
        }
        return fileValidStatus;
    }
    tablenameval(obj) {
        obj.target.value = obj.target.value.toUpperCase().replaceAll("-", "_");
    }
    checkForSpaceInAllPostion(evt) {
        if (evt.target.value.indexOf(' ') > 0) {
            Swal.fire({
                icon: 'error',
                text: 'Space not allowed'
            });
            document.getElementById(evt.target.id).value = '';
            return false;
        }
        return true;
    }
    // splregaxValidation(obj:any)
    // {
    //   let regexp=/[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]/;
    //   if (regexp.test(obj))
    //         {
    //           return true;
    //         }
    //         else
    //         {
    //           Swal.fire({
    //             icon: 'error',
    //             text: this.comConfigServ.langReplace('Special character not allowed except _')
    //           });
    //           return false;
    //         }
    // }
    containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (specialChars.test(str)) {
            return false;
        }
        else {
            return true;
        }
        //  return specialChars.test(str);
    }
}
ValidatorchecklistService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ValidatorchecklistService, deps: [{ token: MsgengineLibService }], target: i0.ɵɵFactoryTarget.Injectable });
ValidatorchecklistService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ValidatorchecklistService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ValidatorchecklistService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: MsgengineLibService }]; } });

class EncrypyDecrpyService {
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
EncrypyDecrpyService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: EncrypyDecrpyService, deps: [{ token: VarlistService }], target: i0.ɵɵFactoryTarget.Injectable });
EncrypyDecrpyService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: EncrypyDecrpyService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: EncrypyDecrpyService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: VarlistService }]; } });

class TranslatePipe {
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
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TranslatePipe, deps: [{ token: VarlistService }], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: TranslatePipe, name: "translate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'translate'
                }]
        }], ctorParameters: function () { return [{ type: VarlistService }]; } });

class LibtabsComponent {
    constructor(commonserveice) {
        this.commonserveice = commonserveice;
    }
    ngOnInit() {
        this.tabURL = this.tabMessage.tabUrl;
        if (typeof this.tabMessage.id != 'undefined' && this.tabMessage.id != '') {
            this.tabURL = this.tabMessage.tabUrl + '/' + this.tabMessage.id;
        }
    }
}
LibtabsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibtabsComponent, deps: [{ token: MsgengineLibService }], target: i0.ɵɵFactoryTarget.Component });
LibtabsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: LibtabsComponent, selector: "lib-libtabs", inputs: { tabMessage: "tabMessage", activeid: "activeid" }, ngImport: i0, template: "<li>\n    <a\n      class=\"nav-item nav-link tab-link\"\n      [ngClass]=\"\n        activeid == undefined || activeid == '' || activeid == '0'\n          ? {\n              active:\n                tabMessage.tabClass === 'active add d-none' ||\n                tabMessage.tabClass === 'active',\n              'd-none': tabMessage.tabClass === 'active edit d-none'\n            }\n          : {\n              active: tabMessage.tabClass === 'active edit d-none',\n              'd-none': tabMessage.tabClass === 'active add d-none'\n            }\n      \"\n      [routerLink]=\"activeid ? (tabMessage.tabUrl == '' ? '../'+tabMessage.tabUrl+'/'+activeid : '../'+ tabMessage.tabUrl ) : tabURL\"\n      [attr.tabspecialclass]=\"tabMessage.pageType\"\n    >\n      {{ tabMessage.tabName | translate  }}\n    </a>\n  </li>\n", styles: [""], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.RouterLinkWithHref, selector: "a[routerLink],area[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibtabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-libtabs', template: "<li>\n    <a\n      class=\"nav-item nav-link tab-link\"\n      [ngClass]=\"\n        activeid == undefined || activeid == '' || activeid == '0'\n          ? {\n              active:\n                tabMessage.tabClass === 'active add d-none' ||\n                tabMessage.tabClass === 'active',\n              'd-none': tabMessage.tabClass === 'active edit d-none'\n            }\n          : {\n              active: tabMessage.tabClass === 'active edit d-none',\n              'd-none': tabMessage.tabClass === 'active add d-none'\n            }\n      \"\n      [routerLink]=\"activeid ? (tabMessage.tabUrl == '' ? '../'+tabMessage.tabUrl+'/'+activeid : '../'+ tabMessage.tabUrl ) : tabURL\"\n      [attr.tabspecialclass]=\"tabMessage.pageType\"\n    >\n      {{ tabMessage.tabName | translate  }}\n    </a>\n  </li>\n" }]
        }], ctorParameters: function () { return [{ type: MsgengineLibService }]; }, propDecorators: { tabMessage: [{
                type: Input
            }], activeid: [{
                type: Input
            }] } });

class LibutilsComponent {
    constructor(httpClient, _location, commonserveice, encDec, varlist) {
        this.httpClient = httpClient;
        this._location = _location;
        this.commonserveice = commonserveice;
        this.encDec = encDec;
        this.varlist = varlist;
        this.callfunction = new EventEmitter();
        this.callfunction3 = new EventEmitter();
    }
    ngOnInit() {
    }
    opensearch() {
        let searchcontent = document.getElementById("search-container");
        if (searchcontent.classList.contains("active")) {
            searchcontent.classList.remove("active");
        }
        else {
            searchcontent.classList.add("active");
        }
        // let element = <HTMLInputElement><unknown>document.getElementsByClassName("search-container");
        // alert(element)
        // element.classList.toggle("active");
        // $(".search-container").toggleClass("active");
    }
    printTable() {
        let printContents;
        let popupWin;
        printContents = document.getElementById("print-section")?.innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
  <html>
    <head>
    <link href="../../assets/css/print.css" rel="stylesheet">
     
    </head>
<body onload="window.print();window.close()">
<div class="header">
<img src="../../assets/img/logoblack.png">
</div>

${printContents}</body>
  </html>`);
        popupWin.document.close();
    }
    deleteAll(ids, ftype) {
        if (ids.length == 0) {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace('Please select the record you want to delete'));
        }
        else {
            var itemids = ids.toString();
            let letterParams = {
                "itemId": itemids,
                "itemStatus": "1"
            };
            Swal.fire({
                title: this.commonserveice.langReplace('Are you sure') + '?',
                text: this.commonserveice.langReplace("You want to delete this record"),
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: this.commonserveice.langReplace('Cancel'),
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('delete it') + '!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.commonserveice.deleteAll(letterParams, ftype).subscribe({
                        next: (response) => {
                            let respData = response.RESPONSE_DATA;
                            let respToken = response.RESPONSE_TOKEN;
                            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                            // console.log(respToken);
                            // console.log(verifyToken);
                            if (respToken == verifyToken) {
                                let res = Buffer.from(respData, 'base64');
                                res = JSON.parse(res.toString());
                                // console.log(res.status);
                                if (res.status == 200) {
                                    Swal.fire(this.commonserveice.langReplace('Deleted') + ' !', this.commonserveice.langReplace('Record has been deleted'), 'success');
                                    // $('.checkAll').prop('checked', false);
                                    this.callfunction.emit();
                                    this.callfunction3.emit();
                                }
                                else if (res.status == 417) {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                                }
                                else {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                                }
                            }
                            else {
                                this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.errorApiResponse));
                            }
                        },
                        error: (msg) => {
                            this.commonserveice.directlogoutlib();
                        }
                    });
                }
            });
        }
    }
    backClicked() {
        this._location.back();
    }
    publishAll(ids, ftype, pubUnpubStatus) {
        let puberroStatus = 0;
        for (let klp of pubUnpubStatus) {
            if (klp.publishUnpublisStatus == 1) {
                puberroStatus = 1;
                break;
            }
        }
        if (puberroStatus == 1) {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace("Please select the unpublished record to publish"));
            return;
        }
        if (ids.length == 0) {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace("Please select the record you want to publish"));
        }
        else {
            let itemids = ids.toString();
            let letterParams = {
                "itemId": itemids,
                "itemStatus": "2"
            };
            Swal.fire({
                text: this.commonserveice.langReplace("You want to publish this record"),
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: this.commonserveice.langReplace('Cancel'),
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('publish it') + '!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.commonserveice.publishAll(letterParams, ftype).subscribe({
                        next: (response) => {
                            let respData = response.RESPONSE_DATA;
                            let respToken = response.RESPONSE_TOKEN;
                            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                            if (respToken == verifyToken) {
                                let res = Buffer.from(respData, 'base64');
                                let responseResult = JSON.parse(res);
                                if (responseResult.status == 200) {
                                    Swal.fire(this.commonserveice.langReplace('Published') + ' !', this.commonserveice.langReplace('Publish Records Successfully'), 'success');
                                    // $('.checkAll').prop('checked', false);
                                    this.callfunction.emit();
                                    this.callfunction3.emit();
                                }
                                else if (responseResult.status == 417) {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                                }
                                else {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                                }
                            }
                            else {
                                this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.errorApiResponse));
                            }
                        },
                        error: (msg) => {
                            this.commonserveice.directlogoutlib();
                        }
                    });
                }
            });
        }
    }
    unpublishAll(ids, ftype, pubUnpubStatus) {
        let puberroStatus = 0;
        for (let klp of pubUnpubStatus) {
            if (klp.publishUnpublisStatus == 0) {
                puberroStatus = 1;
                break;
            }
        }
        if (puberroStatus == 1) {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace('Please select the published record to unpublish'));
            return;
        }
        if (ids.length == 0) {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace('Please select the record you want to unpublish'));
        }
        else {
            let itemids = ids.toString();
            let letterParams = {
                "itemId": itemids,
                "itemStatus": "3"
            };
            Swal.fire({
                text: this.commonserveice.langReplace("You want to unpublish this record"),
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: this.commonserveice.langReplace('Cancel'),
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.commonserveice.langReplace('Yes') + ', ' + this.commonserveice.langReplace('unpublish it')
            }).then((result) => {
                if (result.isConfirmed) {
                    this.commonserveice.unpublishAll(letterParams, ftype).subscribe({
                        next: (response) => {
                            let respData = response.RESPONSE_DATA;
                            let respToken = response.RESPONSE_TOKEN;
                            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                            if (respToken == verifyToken) {
                                let res = Buffer.from(respData, 'base64');
                                let responseResult = JSON.parse(res);
                                if (responseResult.status == 200) {
                                    Swal.fire(this.commonserveice.langReplace('Unpublished'), this.commonserveice.langReplace('Unpublish Records Successfully') + '.', 'success');
                                    // alert(0)
                                    itemids = '';
                                    //   $('.checkAll').prop('checked', false);
                                    this.callfunction.emit();
                                    this.callfunction3.emit();
                                }
                                else if (res.status == 417) {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                                }
                                else {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                                }
                            }
                            else {
                                this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.errorApiResponse));
                            }
                        },
                        error: (msg) => {
                            this.commonserveice.directlogoutlib();
                        }
                    });
                }
            });
        }
    }
}
LibutilsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibutilsComponent, deps: [{ token: i2.HttpClient }, { token: i7.Location }, { token: MsgengineLibService }, { token: EncrypyDecrpyService }, { token: VarlistService }], target: i0.ɵɵFactoryTarget.Component });
LibutilsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: LibutilsComponent, selector: "lib-libutils", inputs: { childMessage: "childMessage", sendIds: "sendIds", funType: "funType", pubUnpubStatus: "pubUnpubStatus", reloadUrl: "reloadUrl" }, outputs: { callfunction: "callfunction", callfunction3: "callfunction3" }, ngImport: i0, template: " <div [ngSwitch]=\"childMessage.utilName\">\n    <div *ngSwitchCase=\"'mandatory'\">\n          <p class=\"ml-2\">( * )  {{'Indicates Mandatory Fields'| translate}} .</p>\n      </div>\n      <div *ngSwitchCase=\"'search'\">\n              <a  id=\"searchicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Search'| translate}}\" title=\"\" (click)=\"opensearch()\" data-original-title=\"Search\"><i class=\"icon-search1\"></i></a>\n          </div>\n      <div *ngSwitchCase=\"'print'\">\n              <a  id=\"printicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Print'| translate}}\" title=\"\" (click)=\"printTable()\"  data-original-title=\"Print\"><i class=\"icon-print-solid\"></i></a>   \n      </div>\n     \n      <div *ngSwitchCase=\"'delete'\">\n              <a  id=\"deleteicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Delete'| translate}}\" title=\"\" (click)=\"deleteAll(sendIds,funType)\"  data-original-title=\"Delete\"><i class=\"icon-trash-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'publish'\">\n          <a  id=\"publishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Publish'| translate}}\" title=\"\" (click)=\"publishAll(sendIds,funType,pubUnpubStatus)\"  data-original-title=\"Publish\"><i class=\"icon-volume-up-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'unpublish'\">\n          <a  id=\"unpublishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Unpublish'| translate}}\" title=\"\" (click)=\"unpublishAll(sendIds,funType,pubUnpubStatus)\" data-original-title=\"Unpublish\"><i class=\"icon-volume-off-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'download'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"downloadicon\" ngbTooltip=\"{{'Download'| translate}}\" data-original-title=\"Download\"><i class=\"icon-download-solid\"></i></a>\n          </div>\n          <div *ngSwitchCase=\"'back'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"backicon\" ngbTooltip=\"{{'Back'| translate}}\" (click)=\"backClicked()\" data-original-title=\"Back\"><i class=\"icon-arrow-left-solid\"></i></a>\n          </div>\n      <div *ngSwitchDefault></div>\n    </div> \n\n", styles: [""], dependencies: [{ kind: "directive", type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i7.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i5.NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "triggers", "container", "disableTooltip", "tooltipClass", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibutilsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-libutils', template: " <div [ngSwitch]=\"childMessage.utilName\">\n    <div *ngSwitchCase=\"'mandatory'\">\n          <p class=\"ml-2\">( * )  {{'Indicates Mandatory Fields'| translate}} .</p>\n      </div>\n      <div *ngSwitchCase=\"'search'\">\n              <a  id=\"searchicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Search'| translate}}\" title=\"\" (click)=\"opensearch()\" data-original-title=\"Search\"><i class=\"icon-search1\"></i></a>\n          </div>\n      <div *ngSwitchCase=\"'print'\">\n              <a  id=\"printicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Print'| translate}}\" title=\"\" (click)=\"printTable()\"  data-original-title=\"Print\"><i class=\"icon-print-solid\"></i></a>   \n      </div>\n     \n      <div *ngSwitchCase=\"'delete'\">\n              <a  id=\"deleteicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Delete'| translate}}\" title=\"\" (click)=\"deleteAll(sendIds,funType)\"  data-original-title=\"Delete\"><i class=\"icon-trash-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'publish'\">\n          <a  id=\"publishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Publish'| translate}}\" title=\"\" (click)=\"publishAll(sendIds,funType,pubUnpubStatus)\"  data-original-title=\"Publish\"><i class=\"icon-volume-up-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'unpublish'\">\n          <a  id=\"unpublishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Unpublish'| translate}}\" title=\"\" (click)=\"unpublishAll(sendIds,funType,pubUnpubStatus)\" data-original-title=\"Unpublish\"><i class=\"icon-volume-off-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'download'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"downloadicon\" ngbTooltip=\"{{'Download'| translate}}\" data-original-title=\"Download\"><i class=\"icon-download-solid\"></i></a>\n          </div>\n          <div *ngSwitchCase=\"'back'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"backicon\" ngbTooltip=\"{{'Back'| translate}}\" (click)=\"backClicked()\" data-original-title=\"Back\"><i class=\"icon-arrow-left-solid\"></i></a>\n          </div>\n      <div *ngSwitchDefault></div>\n    </div> \n\n" }]
        }], ctorParameters: function () { return [{ type: i2.HttpClient }, { type: i7.Location }, { type: MsgengineLibService }, { type: EncrypyDecrpyService }, { type: VarlistService }]; }, propDecorators: { childMessage: [{
                type: Input
            }], sendIds: [{
                type: Input
            }], funType: [{
                type: Input
            }], pubUnpubStatus: [{
                type: Input
            }], callfunction: [{
                type: Output,
                args: ["callfunction"]
            }], callfunction3: [{
                type: Output,
                args: ["callfunction3"]
            }], reloadUrl: [{
                type: Input
            }] } });

class AddgetwayComponent {
    //\\ ======================== // Variables // ======================== //\\ 
    constructor(route, httpClient, commonserveice, vldChkLst, encDec, varlist) {
        this.route = route;
        this.httpClient = httpClient;
        this.commonserveice = commonserveice;
        this.vldChkLst = vldChkLst;
        this.encDec = encDec;
        this.varlist = varlist;
        this.jsonurl = [{
                "pagetitle": "Gateway Configuration",
                "tabList": [{
                        "tabName": "Add",
                        "tabUrl": "../addgateway",
                        "tabClass": "active"
                    },
                    {
                        "tabName": "View",
                        "tabUrl": "../viewgateway"
                    }
                ],
                "utils": [{
                        "utilName": "mandatory"
                    }
                ],
            }];
        this.messaageslist = {
            "successMsg": "Data saved successfully",
            "updatesuccessMsg": "Data Updated successfully",
            "errorMsg": "Error in database",
            "warningtype": "You want to delete this record",
            "msgApilabel": "Label can not be blank",
            "msgApikey": "Key can not be blank",
            "msgApivalue": "Value can not be blank",
            "getwayType": "Gateway type",
            "getwayName": "Gateway name",
            "getwayURl": "Enter Gateway Url",
            "methodtype": "method type",
            "contactaddress": "Enter contact address",
            "msggetwayName": "Enter Gateway name"
        };
        this.selType = 0;
        this.selgetwayName = 0;
        this.selgetwayId = 0;
        this.dynamicListArray = [];
        this.selPostmenthod = 0;
        this.langKey = 'en';
    }
    ngOnInit() {
        this.loadconfig();
        this.getGetwaytypes();
        // this.addChangeEventForLabel();
    }
    loadconfig() {
        this.tablist = this.jsonurl[0].tabList;
        this.utillist = this.jsonurl[0].utils;
        this.title = this.jsonurl[0].pagetitle;
    }
    multilingual(test) {
        return test;
    }
    //\\ ======================== // Get getway types // ======================== //\\ 
    getGetwaytypes() {
        let getwayparm = {};
        this.commonserveice.viewGatwayTypes(getwayparm).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == "200") {
                        this.getwaytypes = res.result;
                    }
                    else if (res.status == 501) {
                        this.commonserveice.directlogoutlib();
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(res.message));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Get getway types // ======================== //\\ 
    //\\ ======================== // Get getway Names // ======================== //\\ 
    getgetwayNames() {
        let typeid = this.selType;
        this.getwayNamelist = [];
        this.selgetwayId = "0";
        let formParams = {
            "Type": typeid
        };
        this.commonserveice.getGetwayName(formParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let res = Buffer.from(respData, 'base64');
                let responseResult = JSON.parse(res.toString());
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    if (responseResult.status == "200") {
                        this.getwayNamelist = responseResult.result;
                    }
                    else if (responseResult.status == 400) {
                    }
                    else if (responseResult.status == 501) {
                        this.commonserveice.directlogoutlib();
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Get getway Names // ======================== //\\ 
    //\\ ======================== // Addmore Rows // ======================== //\\ 
    addRow() {
        let lastChild = this.dynamicListArray[this.dynamicListArray.length - 1];
        if (this.dynamicListArray.length > 0) {
            //if(!this.vldChkLst.blankCheck(this.txtUrl, this.messaageslist.getwayURl,'txtUrl'))
            if (lastChild.vchLabel === '' || typeof (lastChild.vchLabel) == undefined || lastChild.vchLabel == null) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace(this.messaageslist.msgApilabel),
                });
            }
            else if (lastChild.vchKey === '' || typeof (lastChild.vchKey) == undefined || lastChild.vchKey == null) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace(this.messaageslist.msgApikey),
                });
            }
            else if (lastChild.vchValue === '' || typeof (lastChild.vchValue) == undefined || lastChild.vchValue == null) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace(this.messaageslist.msgApivalue),
                });
            }
            else {
                this.dynamicListArray.push({
                    intId: '',
                    vchLabel: '',
                    vchKey: '',
                    vchValue: ''
                });
            }
        }
        else {
            this.dynamicListArray.push({
                intId: '',
                vchLabel: '',
                vchKey: '',
                vchValue: ''
            });
        }
    }
    //\\ ======================== // Addmore Rows // ======================== //\\ 
    deleteApiRow(i, id) {
        let formParams = {
            "intId": id
        };
        Swal.fire({
            title: this.commonserveice.langReplace('Are you sure') + ' ?',
            text: this.messaageslist.warningtype,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: this.commonserveice.langReplace('Cancel'),
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.commonserveice.langReplace('Yes') + ',' + this.commonserveice.langReplace('delete it') + "!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (this.selgetwayId == "other") {
                    //   alert("yes")
                    this.dynamicListArray.splice(i, 1);
                }
                else {
                    this.commonserveice.deleteGetwayConfig(formParams).subscribe({
                        next: (response) => {
                            let respData = response.RESPONSE_DATA;
                            let respToken = response.RESPONSE_TOKEN;
                            let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                            if (respToken == verifyToken) {
                                let res = Buffer.from(respData, 'base64');
                                res = JSON.parse(res.toString());
                                if (res.status == 200) {
                                    Swal.fire(this.commonserveice.langReplace('Deleted') + '!', this.commonserveice.langReplace(this.messaageslist.deleteMsg), 'success');
                                    this.dynamicListArray.splice(i, 1);
                                    this.viewOldGetways();
                                }
                                else if (res.status == 417) {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                                }
                                else {
                                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.messaageslist.errorMsg));
                                }
                            }
                            else {
                                this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                            }
                        },
                        error: (msg) => {
                            this.commonserveice.directlogoutlib();
                        }
                    });
                }
            }
        });
    }
    //\\ ======================== // Get old getway details // ======================== //\\
    viewOldGetways() {
        this.dynamicListArray = [];
        this.txtUrl = '';
        this.selPostmenthod = "0";
        this.txtContactAddress = "";
        this.selgetwayName = "";
        let typeid = this.selType;
        let intid = this.selgetwayId;
        if (intid != "other") {
            let formParams = {
                "typeId": typeid,
                "intId": intid
            };
            this.commonserveice.getPrevDetails(formParams).subscribe({
                next: (response) => {
                    let respData = response.RESPONSE_DATA;
                    let respToken = response.RESPONSE_TOKEN;
                    let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                    if (respToken == verifyToken) {
                        let res = Buffer.from(respData, 'base64');
                        let responseResult = JSON.parse(res);
                        if (responseResult.status == 200) {
                            this.getDetailslist = responseResult.result;
                            let getDtlsres = this.getDetailslist.result;
                            console.log(this.getDetailslist);
                            this.txtUrl = this.getDetailslist.data[0].url;
                            this.selPostmenthod = this.getDetailslist.data[0].dataPostMethod;
                            this.txtContactAddress = this.getDetailslist.data[0].contactaddress;
                            this.selgetwayName = this.getDetailslist.data[0].vchName;
                            for (let i = 0; i <= getDtlsres.length; i++) {
                                let obj = {};
                                obj["intId"] = getDtlsres[i].intId;
                                obj["vchLabel"] = getDtlsres[i].vchLabel;
                                obj["vchKey"] = getDtlsres[i].vchKey;
                                obj["vchValue"] = getDtlsres[i].vchValue;
                                this.dynamicListArray.push(obj);
                            }
                        }
                        else if (responseResult.status == 501) {
                            this.commonserveice.directlogoutlib();
                        }
                        else {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                        }
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                },
                error: (msg) => {
                    this.commonserveice.directlogoutlib();
                }
            });
        }
    }
    //\\ ======================== // Get old getway details // ======================== //\\ 
    //\\ ======================== // Create New configuration // ======================== //\\ 
    manageGetWayConfig() {
        let lastChild = this.dynamicListArray[this.dynamicListArray.length - 1];
        if (!this.vldChkLst.selectDropdown(this.selType, this.commonserveice.langReplace(this.messaageslist.getwayType), 'selType')) { }
        else if (!this.vldChkLst.selectDropdown(this.selgetwayId, this.commonserveice.langReplace(this.messaageslist.getwayName), 'selgetwayId')) { }
        else if ((this.selgetwayId == "other") && (!this.vldChkLst.blankCheck(this.txtgetwaymName, this.commonserveice.langReplace(this.messaageslist.msggetwayName), 'txtgetwaymName'))) { }
        else if (!this.vldChkLst.blankCheck(this.txtUrl, this.commonserveice.langReplace(this.messaageslist.getwayURl), 'txtUrl')) { }
        else if (!this.vldChkLst.is_url(this.txtUrl)) { }
        else if (!this.vldChkLst.selectDropdown(this.selPostmenthod, this.commonserveice.langReplace(this.messaageslist.methodtype), 'selPostMethod')) { }
        else if (!this.vldChkLst.blankCheck(this.txtContactAddress, this.commonserveice.langReplace(this.messaageslist.contactaddress), 'txtContactAddress')) { }
        else if (this.dynamicListArray.length == 0) {
            this.commonserveice.swalfire('error', this.commonserveice.langReplace("Add key values"));
        }
        else if ((this.dynamicListArray.length > 0) && (!this.vldChkLst.blankCheck(lastChild.vchLabel, this.commonserveice.langReplace(this.messaageslist.msgApilabel)))) { }
        else if ((this.dynamicListArray.length > 0) && (!this.vldChkLst.blankCheck(lastChild.vchKey, this.commonserveice.langReplace(this.messaageslist.msgApikey)))) { }
        else if ((this.dynamicListArray.length > 0) && (!this.vldChkLst.blankCheck(lastChild.vchValue, this.commonserveice.langReplace(this.messaageslist.msgApivalue)))) { }
        else {
            let selctgetwayid;
            let getwayName;
            if (this.selgetwayId == 'other') {
                selctgetwayid = '';
                getwayName = this.txtgetwaymName;
            }
            else {
                selctgetwayid = this.selgetwayId;
                getwayName = this.selgetwayName;
            }
            let docParams = {
                "itemId": selctgetwayid,
                "typeId": this.selType,
                "name": getwayName,
                "vchUrl": this.txtUrl,
                "vchDataPostMethod": this.selPostmenthod,
                "vchContactAddress": this.txtContactAddress,
                "itemStatus": "",
                "allDocsdata": this.dynamicListArray
            };
            this.commonserveice.newGetwayConfig(docParams).subscribe({
                next: (response) => {
                    let respData = response.RESPONSE_DATA;
                    let respToken = response.RESPONSE_TOKEN;
                    let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                    if (respToken == verifyToken) {
                        let res = Buffer.from(respData, 'base64');
                        let responseResult = JSON.parse(res);
                        if (responseResult.status == 200) {
                            Swal.fire({
                                text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: this.commonserveice.langReplace('Ok')
                            }).then((result) => {
                                this.resetform();
                                this.route.navigate(['admin/viewgateway']);
                            });
                        }
                        else if (responseResult.status == 202) {
                            // this.loading=false;
                            Swal.fire({
                                text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: this.commonserveice.langReplace('Ok')
                            }).then((result) => {
                                this.resetform();
                                this.route.navigate(['admin/viewgateway']);
                            });
                        }
                        else if (responseResult.status == 501) {
                            this.commonserveice.directlogoutlib();
                        }
                        else if (responseResult.status == 400) {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message.metaName[0]));
                            // this.loading=false;
                        }
                        else {
                            //this.loading=false;
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                        }
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                },
                error: (msg) => {
                    this.commonserveice.directlogoutlib();
                }
            });
        }
    }
    //\\ ======================== // Create New configuration // ======================== //\\ 
    //\\ ======================== // Reset Form // ======================== //\\ 
    resetform() {
        this.selType = 0;
        this.selgetwayId = 0;
        this.txtContactAddress = null;
        this.selPostmenthod = 0;
        this.txtUrl = null;
        this.txtContactAddress = null;
        this.selgetwayName = 0;
        this.dynamicListArray = [];
    }
}
AddgetwayComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: AddgetwayComponent, deps: [{ token: i1.Router }, { token: i2.HttpClient }, { token: MsgengineLibService }, { token: ValidatorchecklistService }, { token: EncrypyDecrpyService }, { token: VarlistService }], target: i0.ɵɵFactoryTarget.Component });
AddgetwayComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: AddgetwayComponent, selector: "lib-addgetway", ngImport: i0, template: "<!--  =============================================================================\n// File Name\t\t      : addgateway-config.component.html\n// Description \t              : This is used for config getway configuration\n// Created by                 : Bikash Kumar Panda\n// Created on                 : 17-May-2023\n// Designed by                : Bikash Kumar Panda\n// Designed on                : 17-May-2023\n// Developed by               : Bikash Kumar Panda\n// Developed on               : 18-May-2023\n// Style sheet                : addgateway-config.component.scss\n============================================================================= -->\n<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n</div>\n<!--===Page Title===-->\n<!--===controle section===-->\n<div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n        <div class=\"controls-section-header\">\n          \n            <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n               <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n              \n            </ul>\n            <div class=\"indicatorslist\">\n                <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\"></lib-libutils>\n               \n            </div>\n\n        </div>\n        <div class=\"card-body\">\n            <div class=\"controls-section\">\n                <!--begin::Form-->\n                <div class=\"row mb-3\">\n                    <div class=\"col-lg-7\">\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">*{{\"Type\" | translate}}</label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <select class=\"form-select\" [(ngModel)]=\"selType\" id=\"selType\" (change)='getgetwayNames()'>\n                                        <option value=\"0\"> {{\"Select\" | translate}}</option>\n                                        <option *ngFor=\"let gettype of getwaytypes;let i index\"\n                                            [value]=\"gettype.typeId\">{{gettype.typeName}}</option>\n                                    </select>\n\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">* {{\"Name\" | translate}} </label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <select class=\"form-select\" (change)='viewOldGetways()' id=\"selgetwayId\" [(ngModel)]=\"selgetwayId\">\n                                        <option value=\"0\" > {{\"Select\" | translate}}</option>\n                                        <option *ngFor=\"let gNames of getwayNamelist\" [value]=\"gNames.intId\">{{ \n                                            gNames.vchName }}</option>\n                                        <option value=\"other\">Other</option>\n                                    </select>\n                                    <input type=\"hidden\" [(ngModel)]=\"selgetwayName\">\n                                    <div *ngIf=\"selgetwayId == 'other' \">\n                                        <input type=\"text\" placeholder=\"Enter Name\" id=\"txtgetwaymName\"  class=\"form-control mt-3\"\n                                            [(ngModel)]=\"txtgetwaymName\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">*{{\"URL\" | translate}} </label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <input type=\"text\" class=\"form-control amhfld arabic\" name=\"vchUrl\"\n                                        [(ngModel)]=\"txtUrl\" id=\"txtUrl\" autocomplete=\"off\" value=\"\" maxlength=\"250\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">*{{\"Data post method\" | translate}}</label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <select name=\"selPostMethod\" id=\"selPostMethod\" [(ngModel)]=\"selPostmenthod\"\n                                        class=\"form-select\">\n                                        <option value=\"0\">{{\"Select\" | translate}}</option>\n                                        <option value=\"na\">NA</option>\n                                        <option value=\"get\">GET</option>\n                                        <option value=\"post\">POST</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">* {{\"Contact Address\" | translate}}</label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <textarea class=\"form-control\" [(ngModel)]=\"txtContactAddress\" id=\"txtContactAddress\" rows=\"2\" cols=\"2\">\n\n                                                                </textarea>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-5\">\n                        <div class=\"\">\n                            <h6 class=\"mb-1\"> {{\"Dynamic keys for value\" | translate}} </h6>\n                            <div class=\"overflow-auto pe-2\" style=\"height:270px;\">\n                                <table class=\"table table-bordered\">\n                                    <thead>\n                                        <tr>\n                                            <th scope=\"col\">{{\"Key\" | translate}}</th>\n                                            <th scope=\"col\">{{\"Description\" | translate}}</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <td>[APPLICANT_MOBILE]</td>\n                                            <td>{{\"This key will be used to fetch the applicant mobile number\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APPLICANT_NAME]</td>\n                                            <td>{{\"This key will be used to bind the SMS content\"}}\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APP_NO]</td>\n                                            <td>{{\"This key will be used to bind the Application number\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APP_DATE]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APP_SLNO]</td>\n                                            <td>{{\"This key will be used to bind the Letter number\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_DIST]</td>\n                                            <td>{{\"This key will be used to bind district of the  farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_BLOCK]</td>\n                                            <td>{{\"This key will be used to bind block/ULB of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_GP]</td>\n                                            <td>{{\"This key will be used to bind GP/Ward of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_VILLAGE]</td>\n                                            <td>{{\"This key will be used to bind village of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[SERVICE_VERIFICATION]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_CATEGORY]</td>\n                                            <td>{{\"This key will be used to bind caste category of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_FATHER]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_DISTRICT]</td>\n                                            <td>{{\"This key will be used to bind district of the farm\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_BLOCK]</td>\n                                            <td>{{\"This key will be used to bind block of the farm\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_GP]</td>\n                                            <td>{{\"This key will be used to bind GP of the farm\"}}\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_VILLAGE]</td>\n                                            <td>{{\"This key will be used to bind Village of the farm\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[VALID_UPTO_6_MONTH]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[VALID_UPTO_12_MONTH]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTION_DATE]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTED_LAND_AREA]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTED_TOTAL_LAND_AREA]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTED_LAND_AREA_DEVELOPED]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[VALID_UPTO_24_MONTH]</td>\n                                            <td></td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n\n\n                <div>\n                    <div class=\"table-responsive\">\n                        <table class=\"table table-bordered\">\n                            <thead>\n                                <tr>\n                                    <th scope=\"col\" style=\"width:50px\"> {{\"Sl No\" | translate}}</th>\n                                    <th scope=\"col\"> {{\"Label\" | translate}} <span class=\"text-danger\">*</span>\n                                    </th>\n                                    <th scope=\"col\">{{\"Key\" | translate}} <span class=\"text-danger\">*</span>\n                                    </th>\n                                    <th scope=\"col\">{{\"Value\" | translate}} <span class=\"text-danger\">*</span>\n                                    </th>\n                                    <th scope=\"col\" style=\"width:70px\">{{\"Action\" | translate}}</th>\n                                </tr>\n                            </thead>\n                            <tbody id=\"appendTr\">\n\n                                <tr *ngFor=\"let apiArray of dynamicListArray; let i = index;\">\n                                    <td>{{i+1}}</td>\n                                    <td>\n                                        <input class=\"form-control\" name=\"{{apiArray.vchLabel}}\"\n                                            [(ngModel)]=\"apiArray.vchLabel\" id=\"label_{{i}}\" type=\"text\" />\n                                    </td>\n                                    <td>\n                                        <input class=\"form-control\" name=\"{{apiArray.vchKey}}\"\n                                            [(ngModel)]=\"apiArray.vchKey\" id=\"key_{{i}}\" type=\"text\" />\n                                    </td>\n\n                                    <td>\n                                        <input class=\"form-control\" name=\"{{apiArray.vchValue}}\"\n                                            [(ngModel)]=\"apiArray.vchValue\" id=\"value_{{i}}\" type=\"text\" />\n                                    </td>\n                                    <td>\n                                        <button class=\"btn btn-danger px-2\" (click)=\"deleteApiRow(i, apiArray.intId)\"><i\n                                                class=\"icon-trash-alt\"></i></button>\n\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td colspan=\"6\">\n                                        <button class=\"btn btn-info btn-sm\" (click)=\"addRow()\">{{\"Add Row\" | translate}}  </button>\n                                    </td>\n\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n                <!--end::Form-->\n            </div>\n        </div>\n        <div class=\"card-footer text-center\">\n            <button class=\"btn btn-primary\" (click)=\"manageGetWayConfig()\">{{\"Submit\" | translate}}</button>\n            <button id=\"clear-all-fields\" class=\"btn btn-danger ml-1\">{{\"Reset\" | translate}}</button>\n        </div>\n    </div>\n</div>\n\n", styles: [""], dependencies: [{ kind: "directive", type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: LibtabsComponent, selector: "lib-libtabs", inputs: ["tabMessage", "activeid"] }, { kind: "component", type: LibutilsComponent, selector: "lib-libutils", inputs: ["childMessage", "sendIds", "funType", "pubUnpubStatus", "reloadUrl"], outputs: ["callfunction", "callfunction3"] }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: AddgetwayComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-addgetway', template: "<!--  =============================================================================\n// File Name\t\t      : addgateway-config.component.html\n// Description \t              : This is used for config getway configuration\n// Created by                 : Bikash Kumar Panda\n// Created on                 : 17-May-2023\n// Designed by                : Bikash Kumar Panda\n// Designed on                : 17-May-2023\n// Developed by               : Bikash Kumar Panda\n// Developed on               : 18-May-2023\n// Style sheet                : addgateway-config.component.scss\n============================================================================= -->\n<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n</div>\n<!--===Page Title===-->\n<!--===controle section===-->\n<div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n        <div class=\"controls-section-header\">\n          \n            <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n               <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n              \n            </ul>\n            <div class=\"indicatorslist\">\n                <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\"></lib-libutils>\n               \n            </div>\n\n        </div>\n        <div class=\"card-body\">\n            <div class=\"controls-section\">\n                <!--begin::Form-->\n                <div class=\"row mb-3\">\n                    <div class=\"col-lg-7\">\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">*{{\"Type\" | translate}}</label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <select class=\"form-select\" [(ngModel)]=\"selType\" id=\"selType\" (change)='getgetwayNames()'>\n                                        <option value=\"0\"> {{\"Select\" | translate}}</option>\n                                        <option *ngFor=\"let gettype of getwaytypes;let i index\"\n                                            [value]=\"gettype.typeId\">{{gettype.typeName}}</option>\n                                    </select>\n\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">* {{\"Name\" | translate}} </label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <select class=\"form-select\" (change)='viewOldGetways()' id=\"selgetwayId\" [(ngModel)]=\"selgetwayId\">\n                                        <option value=\"0\" > {{\"Select\" | translate}}</option>\n                                        <option *ngFor=\"let gNames of getwayNamelist\" [value]=\"gNames.intId\">{{ \n                                            gNames.vchName }}</option>\n                                        <option value=\"other\">Other</option>\n                                    </select>\n                                    <input type=\"hidden\" [(ngModel)]=\"selgetwayName\">\n                                    <div *ngIf=\"selgetwayId == 'other' \">\n                                        <input type=\"text\" placeholder=\"Enter Name\" id=\"txtgetwaymName\"  class=\"form-control mt-3\"\n                                            [(ngModel)]=\"txtgetwaymName\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">*{{\"URL\" | translate}} </label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <input type=\"text\" class=\"form-control amhfld arabic\" name=\"vchUrl\"\n                                        [(ngModel)]=\"txtUrl\" id=\"txtUrl\" autocomplete=\"off\" value=\"\" maxlength=\"250\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">*{{\"Data post method\" | translate}}</label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <select name=\"selPostMethod\" id=\"selPostMethod\" [(ngModel)]=\"selPostmenthod\"\n                                        class=\"form-select\">\n                                        <option value=\"0\">{{\"Select\" | translate}}</option>\n                                        <option value=\"na\">NA</option>\n                                        <option value=\"get\">GET</option>\n                                        <option value=\"post\">POST</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <label class=\"col-md-4 col-lg-4 mt-2\">* {{\"Contact Address\" | translate}}</label>\n                            <div class=\"col-md-8 col-lg-7\">\n                                <div class=\"form-group\">\n                                    <textarea class=\"form-control\" [(ngModel)]=\"txtContactAddress\" id=\"txtContactAddress\" rows=\"2\" cols=\"2\">\n\n                                                                </textarea>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-lg-5\">\n                        <div class=\"\">\n                            <h6 class=\"mb-1\"> {{\"Dynamic keys for value\" | translate}} </h6>\n                            <div class=\"overflow-auto pe-2\" style=\"height:270px;\">\n                                <table class=\"table table-bordered\">\n                                    <thead>\n                                        <tr>\n                                            <th scope=\"col\">{{\"Key\" | translate}}</th>\n                                            <th scope=\"col\">{{\"Description\" | translate}}</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>\n                                        <tr>\n                                            <td>[APPLICANT_MOBILE]</td>\n                                            <td>{{\"This key will be used to fetch the applicant mobile number\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APPLICANT_NAME]</td>\n                                            <td>{{\"This key will be used to bind the SMS content\"}}\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APP_NO]</td>\n                                            <td>{{\"This key will be used to bind the Application number\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APP_DATE]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[APP_SLNO]</td>\n                                            <td>{{\"This key will be used to bind the Letter number\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_DIST]</td>\n                                            <td>{{\"This key will be used to bind district of the  farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_BLOCK]</td>\n                                            <td>{{\"This key will be used to bind block/ULB of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_GP]</td>\n                                            <td>{{\"This key will be used to bind GP/Ward of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_VILLAGE]</td>\n                                            <td>{{\"This key will be used to bind village of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[SERVICE_VERIFICATION]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_CATEGORY]</td>\n                                            <td>{{\"This key will be used to bind caste category of the farmer\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARMER_FATHER]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_DISTRICT]</td>\n                                            <td>{{\"This key will be used to bind district of the farm\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_BLOCK]</td>\n                                            <td>{{\"This key will be used to bind block of the farm\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_GP]</td>\n                                            <td>{{\"This key will be used to bind GP of the farm\"}}\n                                            </td>\n                                        </tr>\n                                        <tr>\n                                            <td>[FARM_VILLAGE]</td>\n                                            <td>{{\"This key will be used to bind Village of the farm\"}}</td>\n                                        </tr>\n                                        <tr>\n                                            <td>[VALID_UPTO_6_MONTH]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[VALID_UPTO_12_MONTH]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTION_DATE]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTED_LAND_AREA]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTED_TOTAL_LAND_AREA]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[INSPECTED_LAND_AREA_DEVELOPED]</td>\n                                            <td></td>\n                                        </tr>\n                                        <tr>\n                                            <td>[VALID_UPTO_24_MONTH]</td>\n                                            <td></td>\n                                        </tr>\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n\n\n                <div>\n                    <div class=\"table-responsive\">\n                        <table class=\"table table-bordered\">\n                            <thead>\n                                <tr>\n                                    <th scope=\"col\" style=\"width:50px\"> {{\"Sl No\" | translate}}</th>\n                                    <th scope=\"col\"> {{\"Label\" | translate}} <span class=\"text-danger\">*</span>\n                                    </th>\n                                    <th scope=\"col\">{{\"Key\" | translate}} <span class=\"text-danger\">*</span>\n                                    </th>\n                                    <th scope=\"col\">{{\"Value\" | translate}} <span class=\"text-danger\">*</span>\n                                    </th>\n                                    <th scope=\"col\" style=\"width:70px\">{{\"Action\" | translate}}</th>\n                                </tr>\n                            </thead>\n                            <tbody id=\"appendTr\">\n\n                                <tr *ngFor=\"let apiArray of dynamicListArray; let i = index;\">\n                                    <td>{{i+1}}</td>\n                                    <td>\n                                        <input class=\"form-control\" name=\"{{apiArray.vchLabel}}\"\n                                            [(ngModel)]=\"apiArray.vchLabel\" id=\"label_{{i}}\" type=\"text\" />\n                                    </td>\n                                    <td>\n                                        <input class=\"form-control\" name=\"{{apiArray.vchKey}}\"\n                                            [(ngModel)]=\"apiArray.vchKey\" id=\"key_{{i}}\" type=\"text\" />\n                                    </td>\n\n                                    <td>\n                                        <input class=\"form-control\" name=\"{{apiArray.vchValue}}\"\n                                            [(ngModel)]=\"apiArray.vchValue\" id=\"value_{{i}}\" type=\"text\" />\n                                    </td>\n                                    <td>\n                                        <button class=\"btn btn-danger px-2\" (click)=\"deleteApiRow(i, apiArray.intId)\"><i\n                                                class=\"icon-trash-alt\"></i></button>\n\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td colspan=\"6\">\n                                        <button class=\"btn btn-info btn-sm\" (click)=\"addRow()\">{{\"Add Row\" | translate}}  </button>\n                                    </td>\n\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n                <!--end::Form-->\n            </div>\n        </div>\n        <div class=\"card-footer text-center\">\n            <button class=\"btn btn-primary\" (click)=\"manageGetWayConfig()\">{{\"Submit\" | translate}}</button>\n            <button id=\"clear-all-fields\" class=\"btn btn-danger ml-1\">{{\"Reset\" | translate}}</button>\n        </div>\n    </div>\n</div>\n\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.HttpClient }, { type: MsgengineLibService }, { type: ValidatorchecklistService }, { type: EncrypyDecrpyService }, { type: VarlistService }]; } });

class LibpaginationComponent {
    constructor() {
        this.callfunction = new EventEmitter();
    }
    ngOnInit() {
    }
    onTableDataChange(event) {
        this.callfunction.emit(event);
    }
}
LibpaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibpaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LibpaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: LibpaginationComponent, selector: "lib-libpagination", inputs: { page: "page", count: "count", tableSize: "tableSize" }, outputs: { callfunction: "callfunction" }, ngImport: i0, template: "<div class=\"d-flex justify-content-end\">\n    <pagination-controls\n    \n    previousLabel=\"{{'Prev' | translate}}\"\n    nextLabel=\"{{'Next' | translate}}\"\n    (pageChange)=\"onTableDataChange($event)\"\n  >\n  </pagination-controls>\n </div>\n\n", styles: [""], dependencies: [{ kind: "component", type: i12.PaginationControlsComponent, selector: "pagination-controls", inputs: ["id", "maxSize", "directionLinks", "autoHide", "responsive", "previousLabel", "nextLabel", "screenReaderPaginationLabel", "screenReaderPageLabel", "screenReaderCurrentLabel"], outputs: ["pageChange", "pageBoundsCorrection"] }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibpaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-libpagination', template: "<div class=\"d-flex justify-content-end\">\n    <pagination-controls\n    \n    previousLabel=\"{{'Prev' | translate}}\"\n    nextLabel=\"{{'Next' | translate}}\"\n    (pageChange)=\"onTableDataChange($event)\"\n  >\n  </pagination-controls>\n </div>\n\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { page: [{
                type: Input
            }], count: [{
                type: Input
            }], tableSize: [{
                type: Input
            }], callfunction: [{
                type: Output,
                args: ["callfunction"]
            }] } });

class ViewgetwayComponent {
    constructor(route, httpClient, commonserveice, varlist, modalService, encDec) {
        this.route = route;
        this.httpClient = httpClient;
        this.commonserveice = commonserveice;
        this.varlist = varlist;
        this.modalService = modalService;
        this.encDec = encDec;
        this.jsonurl = [
            {
                "pagetitle": "View Gateway Config",
                "tabList": [
                    { "tabName": "Add", "tabUrl": "../addgateway" },
                    { "tabName": "View", "tabUrl": "../viewgateway", "tabClass": "active" }
                ],
                "utils": [
                    { "utilName": "search" },
                    { "utilName": "print" },
                    { "utilName": "delete" },
                    { "utilName": "publish" },
                    { "utilName": "unpublish" }
                ],
                "messages": {
                    "successMsg": "Date saved successfully",
                    "errorMsg": "Error in database",
                    "warningtype": "You want to delete this record",
                    "deleteMsg": "Record has been deleted"
                }
            }
        ];
        this.selType = 0;
        this.txtName = '';
        this.page = 1;
        this.count = 0;
        this.tableSize = 10;
        this.pageSizes = [10, 20, 50, 100, 500, 1000];
        this.getwayIdArray = [];
        this.pubUnpStatus = [];
        this.chkAll = 0;
        this.sevName = " ";
        this.langKey = 'en';
        this.indexNumber = 0;
        this.sevName = varlist.serviceName;
    }
    ngOnInit() {
        this.loadvarlist();
        this.getGetwaytypes();
        this.viewAllrecrds(this.selType, this.txtName);
        // console.log(this.viewAllrecrds());
        //this.addChangeEventForLabel();
    }
    loadvarlist() {
        // this.httpClient.get<any>(this.jsonurl).subscribe((data: any) => {
        this.tablist = this.jsonurl[0].tabList;
        this.utillist = this.jsonurl[0].utils;
        this.messaageslist = this.jsonurl[0].messages;
        this.title = this.jsonurl[0].pagetitle;
        // })
    }
    multilingual(test) {
        return test;
    }
    //\\ ======================== // Get getway types // ======================== //\\ 
    getGetwaytypes() {
        let getwayparm = {};
        this.commonserveice.viewGatwayTypes(getwayparm).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == "200") {
                        this.getwaytypes = res.result;
                    }
                    else if (res.status == 501) {
                        this.commonserveice.directlogoutlib();
                    }
                    else {
                        console.log(res.messages);
                    }
                }
                else {
                    //this.loading=false;
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Get getway types // ======================== //\\ 
    onTableDataChange(event) {
        this.page = event;
        this.indexNumber = (this.page - 1) * this.tableSize;
    }
    onTableSizeChange(event) {
        this.tableSize = event.target.value;
        this.page = 1;
        this.indexNumber = 0;
    }
    //\\ ======================== // View All records // ======================== //\\ 
    viewAllrecrds(typeid, name) {
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
                    let res = Buffer.from(respData, 'base64');
                    let responseResult = JSON.parse(res);
                    if (responseResult.status == 200) {
                        this.loading = false;
                        this.getwayList = responseResult.result;
                        // console.log(this.getwayList)
                    }
                    else if (responseResult.status == 501) {
                        this.commonserveice.directlogoutlib();
                    }
                    else {
                        this.loading = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                }
                else {
                    //this.loading=false;
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    // //\\ ======================== // View All records // ======================== //\\ 
    onChange(checkid, e, publishStatus) {
        let totalCheckbox = document.querySelectorAll('.rowCheck').length;
        let totalChecked = document.querySelectorAll('.rowCheck:checked').length;
        let parentcheck = document.querySelectorAll('.checkall');
        if (totalCheckbox == totalChecked) {
            parentcheck[0].checked = true;
        }
        else {
            parentcheck[0].checked = false;
        }
        if (e.target.checked) {
            if (!this.getwayIdArray.includes(checkid)) {
                this.getwayIdArray.push(checkid);
                this.pubUnpStatus.push({ 'letterId': checkid, 'publishUnpublisStatus': publishStatus });
            }
        }
        else {
            let index = this.getwayIdArray.indexOf(checkid);
            let indxAdd = 0;
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
    selectAll(e) {
        let allid = e.target.id;
        // alert(allid)
        let checkBoxes = document.querySelectorAll('.rowCheck');
        if (e.target.checked) {
            for (let i = 0; i < checkBoxes.length; i++) {
                let ids = checkBoxes[i].id;
                this.getwayIdArray.push(parseInt(ids));
                this.pubUnpStatus.push({ 'letterId': ids, 'publishUnpublisStatus': checkBoxes[i].getAttribute("pubstatus") });
                checkBoxes[i].checked = true;
            }
        }
        else {
            this.getwayIdArray = [];
            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = false;
            }
            this.pubUnpStatus = [];
        }
    }
    // //\\ ======================== // Get old getway details // ======================== //\\
    filedata(intId, typeId, typeName) {
        this.open(this.previewModal);
        let formParams = {
            "typeId": typeId,
            "intId": intId
        };
        this.typeName = typeName;
        this.commonserveice.getPrevDetails(formParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    let responseResult = JSON.parse(res);
                    if (responseResult.status == 200) {
                        this.getwayDetails = responseResult.result.data;
                        // console.log(responseResult.result)
                        this.getDetailslist = responseResult.result.result;
                    }
                    else if (responseResult.status == 501) {
                        //this.commonserveice.directlogoutlib()
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                }
                else {
                    //this.loading=false;
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
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
    open(content) {
        this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        }, (reason) => { });
    }
    //\\ ======================== // Modal Open // ======================== //\\ 
    closeModal() {
        this.modalService.dismissAll();
    }
}
ViewgetwayComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewgetwayComponent, deps: [{ token: i1.Router }, { token: i2.HttpClient }, { token: MsgengineLibService }, { token: VarlistService }, { token: i5.NgbModal }, { token: EncrypyDecrpyService }], target: i0.ɵɵFactoryTarget.Component });
ViewgetwayComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: ViewgetwayComponent, selector: "lib-viewgetway", viewQueries: [{ propertyName: "previewModal", first: true, predicate: ["previewModal"], descendants: true }], ngImport: i0, template: "<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n  </div>\n  <!--===Page Title===-->\n  <!--===controle section===-->\n  <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n      <div class=\"controls-section-header\">\n        <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n    \n        </ul>\n        <div class=\"indicatorslist\">\n\n            <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\" [sendIds]=\"getwayIdArray\"\n            [funType]=\"sevName\" [pubUnpubStatus]=\"pubUnpStatus\"  (callfunction)=\"viewAllrecrds(selType,txtName)\"\n            (callfunction2)='selectAll($event)'></lib-libutils>\n         \n         \n        </div>\n  \n      </div>\n      <div class=\"card-body\">\n  \n\n        <div class=\"controls-section\">\n  \n          <!-- Search Panel -->\n          <div class=\"search-container active\" id=\"search-container\">\n  \n            <div class=\"search-sec\">\n  \n              <div class=\"row\">\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <select class=\"form-select\" [(ngModel)]=\"selType\">\n                      <option value=\"0\" >{{\"Select Gateway Type\" | translate}}</option>\n                      <option *ngFor=\"let gettype of getwaytypes; let i index\" [value]=\"gettype.typeId\">\n                        {{gettype.typeName}}</option>\n  \n                    </select>\n                  </div>\n                </div>\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" name=\"Form Name\" [(ngModel)]=\"txtName\"\n                      placeholder=\"{{'Enter Name' | translate}}\">\n                  </div>\n                </div>\n  \n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <button class=\"btn btn-primary\" (click)=\"viewAllrecrds(selType,txtName)\">{{\"Search\" | translate}} </button>\n                    <button class=\"btn btn-danger ml-1\" (click)=\"viewAllrecrds(0,'')\"> {{\"Reset\" | translate}}</button>\n                  </div>\n                </div>\n              </div>\n  \n  \n            </div>\n  \n  \n          </div>\n          <!-- Search Panel -->\n  \n          <div *ngIf=\"getwayList?.length > 0; else norecord\">\n  \n            <div class=\"d-flex justify-content-between mb-3\">\n              <div>\n                <ul class=\"legends\">\n                  <li>\n                    <span class=\"bg-success\"></span>{{\"Publish\" | translate}}\n                  </li>\n                  <li>\n                    <span class=\"bg-danger\"></span> {{\"Unpublish\" | translate}}\n                  </li>\n                </ul>\n              </div>\n              <div>\n  \n                <!-- {{\"Per Page\"}}:\n                <select (change)=\"onTableSizeChange($event)\">\n                  <option *ngFor=\"let size of pageSizes\" [ngValue]=\"size\">\n                    {{ size }}\n                  </option>\n                </select> -->\n  \n              </div>\n  \n            </div>\n  \n            <div class=\"table-responsive \" id=\"print-section\">\n                \n              <table data-toggle=\"table\" class=\"table table-bordered \">\n                <thead>\n                  <tr>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:25px\" valign=\"top\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input checkall\" type=\"checkbox\" (change)=\"selectAll($event)\" id=\"checkall\"\n                          name=\"checkall\" value=\"checkall\">\n  \n                      </div>\n                    </th>\n                    <th scope=\"col\" style=\"width:50px\">{{\"Sl No\" | translate}}</th>\n                    <th scope=\"col\">{{\"Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Name\" | translate}}</th>\n  \n                    <th scope=\"col\">{{\"URL\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:140px\">{{\"Action\" | translate}}</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let getways of getwayList| paginate\n                                                                      : {\n                                                                          itemsPerPage: tableSize,\n                                                                          currentPage: page,\n                                                                          totalItems: count\n                                                                        };\n                                                                  let i = index\">\n                    <td class=\"noPrint border-left-2\"\n                      [ngClass]=\"{'border-left-danger': getways.tinStatus == 0 , 'border-left-success': getways.tinStatus == 1 }\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input rowCheck\" type=\"checkbox\"\n                          (change)=\"onChange(getways.intId, $event,getways.tinStatus)\"\n                          [attr.pubstatus]=\"getways.tinStatus\" name=\"{{getways.intId }}\" [id]=\"getways.intId\"\n                          [value]=\"getways.intId\">\n  \n                      </div>\n                    </td>\n                    <td>{{i+1+indexNumber}}</td>\n                    <td>{{getways.typeName}} </td>\n                    <td>{{getways.vchName}}</td>\n  \n                    <td>{{getways.vchUrl}}</td>\n                    <td class=\"noPrint\">\n                      <a class=\"text-info\"  (click)=\"filedata(getways.intId,getways.tinType,getways.typeName)\" >{{\"View\" | translate}}</a>\n                     \n              \n  \n                    </td>\n                  </tr>\n  \n  \n  \n  \n                </tbody>\n              </table>\n            </div>\n  \n\n            <!-- <lib-pagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-pagination> -->\n            <lib-libpagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-libpagination>\n            \n          </div>\n          <ng-template #norecord>\n            <h6 class=\"no-content\"> {{\"No Record Found\" | translate}}</h6>\n  \n          </ng-template>\n  \n  \n        </div>\n  \n      </div>\n  \n    </div>\n  \n  \n  \n  </div>\n  <ng-template #previewModal id=\"previewModal\" let-modal>\n    <div class=\"modal-header\">\n      <h5 class=\"modal-title mb-0\" id=\"movetoFolderModalLabel\">\n        {{\"Gateway Details\" | translate}}\n      </h5>\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        (click)=\"closeModal()\"\n        aria-label=\"Close\"\n      ></button>\n    </div>\n\n\n\n    <div class=\"modal-body\">\n        <div *ngFor=\"let getways of getwayDetails\">\n            <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Type\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{typeName}}</label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Name\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.vchName}}</label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Url\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.url}}</label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Data post method\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.dataPostMethod}} </label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Contact Address\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.contactaddress}}</label>\n                </div>\n              </div>\n        </div>\n       \n       \n        <table class=\"table table-bordered mt-3\">\n            <thead>\n              <tr>\n                <th scope=\"col\">{{\"Label\" | translate}}</th>\n                <th scope=\"col\">{{\"Key\" | translate}}</th>\n                <th scope=\"col\">{{\"Value\" | translate}}</th>\n\n              </tr>\n            </thead>\n            <tbody>\n\n              <tr *ngFor=\"let apilist of getDetailslist; let i = index\">\n                <td>{{apilist.vchLabel}}</td>\n                <td>{{apilist.vchKey}}</td>\n                <td>{{apilist.vchValue}}</td>\n              </tr>\n\n            </tbody>\n          </table>\n    </div>\n  </ng-template>", styles: [""], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: LibtabsComponent, selector: "lib-libtabs", inputs: ["tabMessage", "activeid"] }, { kind: "component", type: LibutilsComponent, selector: "lib-libutils", inputs: ["childMessage", "sendIds", "funType", "pubUnpubStatus", "reloadUrl"], outputs: ["callfunction", "callfunction3"] }, { kind: "component", type: LibpaginationComponent, selector: "lib-libpagination", inputs: ["page", "count", "tableSize"], outputs: ["callfunction"] }, { kind: "pipe", type: i12.PaginatePipe, name: "paginate" }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewgetwayComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-viewgetway', template: "<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n  </div>\n  <!--===Page Title===-->\n  <!--===controle section===-->\n  <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n      <div class=\"controls-section-header\">\n        <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n    \n        </ul>\n        <div class=\"indicatorslist\">\n\n            <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\" [sendIds]=\"getwayIdArray\"\n            [funType]=\"sevName\" [pubUnpubStatus]=\"pubUnpStatus\"  (callfunction)=\"viewAllrecrds(selType,txtName)\"\n            (callfunction2)='selectAll($event)'></lib-libutils>\n         \n         \n        </div>\n  \n      </div>\n      <div class=\"card-body\">\n  \n\n        <div class=\"controls-section\">\n  \n          <!-- Search Panel -->\n          <div class=\"search-container active\" id=\"search-container\">\n  \n            <div class=\"search-sec\">\n  \n              <div class=\"row\">\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <select class=\"form-select\" [(ngModel)]=\"selType\">\n                      <option value=\"0\" >{{\"Select Gateway Type\" | translate}}</option>\n                      <option *ngFor=\"let gettype of getwaytypes; let i index\" [value]=\"gettype.typeId\">\n                        {{gettype.typeName}}</option>\n  \n                    </select>\n                  </div>\n                </div>\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" name=\"Form Name\" [(ngModel)]=\"txtName\"\n                      placeholder=\"{{'Enter Name' | translate}}\">\n                  </div>\n                </div>\n  \n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <button class=\"btn btn-primary\" (click)=\"viewAllrecrds(selType,txtName)\">{{\"Search\" | translate}} </button>\n                    <button class=\"btn btn-danger ml-1\" (click)=\"viewAllrecrds(0,'')\"> {{\"Reset\" | translate}}</button>\n                  </div>\n                </div>\n              </div>\n  \n  \n            </div>\n  \n  \n          </div>\n          <!-- Search Panel -->\n  \n          <div *ngIf=\"getwayList?.length > 0; else norecord\">\n  \n            <div class=\"d-flex justify-content-between mb-3\">\n              <div>\n                <ul class=\"legends\">\n                  <li>\n                    <span class=\"bg-success\"></span>{{\"Publish\" | translate}}\n                  </li>\n                  <li>\n                    <span class=\"bg-danger\"></span> {{\"Unpublish\" | translate}}\n                  </li>\n                </ul>\n              </div>\n              <div>\n  \n                <!-- {{\"Per Page\"}}:\n                <select (change)=\"onTableSizeChange($event)\">\n                  <option *ngFor=\"let size of pageSizes\" [ngValue]=\"size\">\n                    {{ size }}\n                  </option>\n                </select> -->\n  \n              </div>\n  \n            </div>\n  \n            <div class=\"table-responsive \" id=\"print-section\">\n                \n              <table data-toggle=\"table\" class=\"table table-bordered \">\n                <thead>\n                  <tr>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:25px\" valign=\"top\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input checkall\" type=\"checkbox\" (change)=\"selectAll($event)\" id=\"checkall\"\n                          name=\"checkall\" value=\"checkall\">\n  \n                      </div>\n                    </th>\n                    <th scope=\"col\" style=\"width:50px\">{{\"Sl No\" | translate}}</th>\n                    <th scope=\"col\">{{\"Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Name\" | translate}}</th>\n  \n                    <th scope=\"col\">{{\"URL\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:140px\">{{\"Action\" | translate}}</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let getways of getwayList| paginate\n                                                                      : {\n                                                                          itemsPerPage: tableSize,\n                                                                          currentPage: page,\n                                                                          totalItems: count\n                                                                        };\n                                                                  let i = index\">\n                    <td class=\"noPrint border-left-2\"\n                      [ngClass]=\"{'border-left-danger': getways.tinStatus == 0 , 'border-left-success': getways.tinStatus == 1 }\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input rowCheck\" type=\"checkbox\"\n                          (change)=\"onChange(getways.intId, $event,getways.tinStatus)\"\n                          [attr.pubstatus]=\"getways.tinStatus\" name=\"{{getways.intId }}\" [id]=\"getways.intId\"\n                          [value]=\"getways.intId\">\n  \n                      </div>\n                    </td>\n                    <td>{{i+1+indexNumber}}</td>\n                    <td>{{getways.typeName}} </td>\n                    <td>{{getways.vchName}}</td>\n  \n                    <td>{{getways.vchUrl}}</td>\n                    <td class=\"noPrint\">\n                      <a class=\"text-info\"  (click)=\"filedata(getways.intId,getways.tinType,getways.typeName)\" >{{\"View\" | translate}}</a>\n                     \n              \n  \n                    </td>\n                  </tr>\n  \n  \n  \n  \n                </tbody>\n              </table>\n            </div>\n  \n\n            <!-- <lib-pagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-pagination> -->\n            <lib-libpagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-libpagination>\n            \n          </div>\n          <ng-template #norecord>\n            <h6 class=\"no-content\"> {{\"No Record Found\" | translate}}</h6>\n  \n          </ng-template>\n  \n  \n        </div>\n  \n      </div>\n  \n    </div>\n  \n  \n  \n  </div>\n  <ng-template #previewModal id=\"previewModal\" let-modal>\n    <div class=\"modal-header\">\n      <h5 class=\"modal-title mb-0\" id=\"movetoFolderModalLabel\">\n        {{\"Gateway Details\" | translate}}\n      </h5>\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        (click)=\"closeModal()\"\n        aria-label=\"Close\"\n      ></button>\n    </div>\n\n\n\n    <div class=\"modal-body\">\n        <div *ngFor=\"let getways of getwayDetails\">\n            <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Type\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{typeName}}</label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Name\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.vchName}}</label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Url\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.url}}</label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Data post method\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.dataPostMethod}} </label>\n                </div>\n              </div>\n              <div class=\"mb-3 row\">\n                <label class=\"col-sm-4 \">{{\"Contact Address\" | translate}}</label>\n                <div class=\"col-sm-8\">\n                  : <label class=\"text-dark\">{{getways.contactaddress}}</label>\n                </div>\n              </div>\n        </div>\n       \n       \n        <table class=\"table table-bordered mt-3\">\n            <thead>\n              <tr>\n                <th scope=\"col\">{{\"Label\" | translate}}</th>\n                <th scope=\"col\">{{\"Key\" | translate}}</th>\n                <th scope=\"col\">{{\"Value\" | translate}}</th>\n\n              </tr>\n            </thead>\n            <tbody>\n\n              <tr *ngFor=\"let apilist of getDetailslist; let i = index\">\n                <td>{{apilist.vchLabel}}</td>\n                <td>{{apilist.vchKey}}</td>\n                <td>{{apilist.vchValue}}</td>\n              </tr>\n\n            </tbody>\n          </table>\n    </div>\n  </ng-template>" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.HttpClient }, { type: MsgengineLibService }, { type: VarlistService }, { type: i5.NgbModal }, { type: EncrypyDecrpyService }]; }, propDecorators: { previewModal: [{
                type: ViewChild,
                args: ['previewModal']
            }] } });

/// <reference types="@types/ckeditor" />
class AddmsgengineComponent {
    constructor(route, router, httpClient, vldChkLst, encDec, commonserveice, varlist) {
        this.route = route;
        this.router = router;
        this.httpClient = httpClient;
        this.vldChkLst = vldChkLst;
        this.encDec = encDec;
        this.commonserveice = commonserveice;
        this.varlist = varlist;
        this.messaageslist = {
            "successMsg": "New Message Generated Successfully",
            "updatesuccessMsg": "Updated Successfully",
            "errorMsg": "Error in Message creation",
            "configtype": "Configuration Type",
            "formnames": "Please a Select Form Name",
            "smsTempId": "Please Enter smsTempId",
            "messageType": "Message Type",
            "eventType": " a Event ",
            "smsSubject": "Please Enter SMS Subject",
            "smscontent": "Please Enter SMS content",
            "intMailTemplate": "Template",
            "intDocumentType": "Document Type",
            "vchDocument": "Please Choose a Document",
            "vchLanguage": "Please Choose a Language",
            "emailId": "Please Enter email id key",
            "to": "Please select to",
            "mobileNo": "Please enter mobile no key",
            "gateWayDetails": "Configuration",
            "formtype": "Form Name"
        };
        this.jsonurl = [{
                "pagetitle": "Add Message Engine",
                "tabList": [
                    {
                        "tabName": "Add",
                        "tabUrl": "",
                        "tabClass": "active add d-none"
                    },
                    {
                        "tabName": "Edit",
                        "tabUrl": "",
                        "tabClass": "active edit d-none"
                    },
                    {
                        "tabName": "View",
                        "tabUrl": "../viewmessageengine"
                    },
                    {
                        "tabName": "Reminder",
                        "tabUrl": "../viewmessagereminder"
                    }
                ],
                "utils": [{
                        "utilName": "mandatory"
                    },
                    {
                        "utilName": "back"
                    }
                ],
            }];
        this.messageId = "";
        this.txtFormId = 0;
        this.configtype = 0;
        this.smsTempId = '';
        this.smsSubject = '';
        this.messageContent = '';
        this.messageType = 0;
        this.eventType = 0;
        this.formnames = 0;
        this.intMailTemplate = 0;
        this.fileType = 0;
        this.documentFile = '';
        this.selFormName = 0;
        this.vchLanguage = 0;
        this.langKey = 'en';
        this.mailsmstoApplicant = 0;
        this.mailsmstoAuthority = 0;
        this.emailId = '';
        this.mobileNo = '';
        this.gatewayconfigDetails = '';
        this.gateWayconfigtype = 0;
        this.fileeList = [];
        this.selformId = 0;
        this.ckeConfig = this.varlist.ckconfig;
        this.formenable = this.varlist.formEnable;
        this.dynamicForm = this.varlist.dynamicForm;
    }
    ngOnInit() {
        this.loadconfig();
        if (this.varlist.formEnable == true) {
            this.getForms();
        }
        else {
            this.txtFormId = this.varlist.formId;
        }
        this.getLanguage();
        this.getStaticFormKeys();
        //this.addChangeEventForLabel();
        this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
        //  console.log(this.sessiontoken)
        let SeetionParsed;
        if (this.varlist.sessionEncrypted == true) {
            SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
        }
        else {
            SeetionParsed = JSON.parse(this.sessiontoken);
        }
        this.userId = SeetionParsed.USER_ID;
        let encSchemeId = this.router.snapshot.paramMap.get('id');
        if (encSchemeId != "") {
            let schemeStr = this.encDec.decText(encSchemeId);
            let schemeArr = schemeStr.split(':');
            this.messageId = schemeArr[0];
            this.txtFormId = schemeArr[1];
            this.txtProcessName = schemeArr[2];
            this.formnames = this.txtFormId;
            if (this.messageId != '' || this.messageId != 0) {
                this.getMessageinfo();
                this.getFormKeys();
            }
        }
    }
    changedocType() {
        this.fileeList = [];
        this.documentFile = '';
        this.documentUrl = '';
    }
    loadconfig() {
        this.tablist = this.jsonurl[0].tabList;
        this.utillist = this.jsonurl[0].utils;
        if (this.messageId == "") {
            this.title = this.multilingual(this.jsonurl[0].pagetitle);
        }
        else {
            this.title = "Edit Message Engine";
        }
    }
    multilingual(test) {
        return test;
    }
    ;
    getForms() {
        let params = {};
        this.commonserveice.getForms(params).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    //console.log('res');
                    if (res.status === 200) {
                        this.formNameslist = res.result;
                    }
                    else {
                        console.log(res.messages);
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Temp Uplaoad On select // ======================== //\\
    onSelect(event) {
        if (!this.vldChkLst.selectDropdown(this.fileType, this.messaageslist.intDocumentType)) { }
        else {
            let newFile = new FormData();
            let filetype = event.addedFiles[0].name;
            let filesize = event.addedFiles[0].size;
            let splititems = filetype.split('.', 2);
            if ((this.fileType == 1) && !(splititems[1] == 'mp3' || splititems[1] == 'mpeg')) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace("Only accept mp3 and mpeg file"),
                });
            }
            else if ((this.fileType == 1) && (filesize > 1024 * 1024 * 5)) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace("Max allow file size 5 MB"),
                });
            }
            else if ((this.fileType == 2) && !(splititems[1] == 'mp4' || splititems[1] == 'wmv' || splititems[1] == 'webm')) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace("Only mp4,wmv, webm file"),
                });
            }
            else if ((this.fileType == 2) && (filesize > 131072 * 10)) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace("Max allow file size 10 MB"),
                });
            }
            else if ((this.fileType == 3) && !(splititems[1] == 'jpeg' || splititems[1] == 'jpg' || splititems[1] == 'png')) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace("Only Upload .jpg, .jpeg, .png file"),
                });
            }
            else if ((this.fileType == 3) && (filesize > 131072)) {
                Swal.fire({
                    icon: 'error',
                    text: this.commonserveice.langReplace("Max allow file size 1 MB"),
                });
            }
            else {
                newFile.append('file', event.addedFiles[0]);
                newFile.append('fileType', splititems[1]);
                this.commonserveice.msguploadFile(newFile).subscribe({
                    next: (response) => {
                        let respData = response.RESPONSE_DATA;
                        let respToken = response.RESPONSE_TOKEN;
                        let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                        if (respToken == verifyToken) {
                            let res = Buffer.from(respData, 'base64');
                            let responseResult = JSON.parse(res);
                            if (responseResult.status == 200) {
                                //  this.files_dropped.push(event.addedFiles);
                                let obj = {};
                                obj['fileName'] = responseResult.result.fileName;
                                obj['filePath'] = responseResult.result.filePath;
                                obj['fileType'] = responseResult.result.fileType;
                                this.fileeList.push(obj);
                                this.documentFile = responseResult.result.fileName;
                            }
                            else if (responseResult.status == 400) {
                                this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message));
                            }
                            else {
                                this.commonserveice.directlogoutlib();
                            }
                        }
                        else {
                            //   this.loading = false;
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                        }
                    },
                    error: (msg) => {
                        this.commonserveice.directlogoutlib();
                    }
                });
            }
        }
        //console.log(event.addedFiles);
    }
    //\\ ======================== // Temp Uplaoad On select // ======================== //\\
    onRemove(event) {
        this.fileeList.splice(this.fileeList.indexOf(event), 1);
        // this.previewFile=false;
        //this.resetform()
    }
    //\\ ======================== // Get file Type // ======================== //\\
    getfiletypeicon(ftype) {
        let icon;
        if (ftype == 'pdf') {
            icon = 'bi-file-pdf text-danger';
        }
        else if (ftype == 'jpg' || ftype == 'jpeg' || ftype == 'png' || ftype == 'gif') {
            icon = 'bi-card-image';
        }
        else if (ftype == 'mp4' || ftype == 'mkv') {
            icon = 'bi-camera-video';
        }
        else if (ftype == 'mp3' || ftype == 'WAV') {
            icon = 'bi-file-earmark-music';
        }
        else if (ftype == 'doc' || ftype == 'docx') {
            icon = 'bi-filetype-doc text-primary';
        }
        else if (ftype == 'ppt' || ftype == 'pptx') {
            icon = 'bi-filetype-ppt text-danger';
        }
        else if (ftype == 'xls' || ftype == 'xlsx' || ftype == 'ods') {
            icon = 'bi-filetype-xls text-success';
        }
        else if (ftype == 'zip') {
            icon = 'bi-file-zip text-warning';
        }
        else {
            icon = 'bi-folder-fill text-warning';
        }
        return icon;
    }
    //\\ ======================== // Get file Type // ======================== //\\
    newGenerateMessage() {
        // this.messageContent = this.CkeditornewComponent.ckdesc;
        let configtypeVal = this.configtype;
        let smsTempIdVal = this.smsTempId;
        let messageTypeVal = this.messageType;
        let eventTypeVal = this.eventType;
        let smsSubjectVal = this.smsSubject;
        //console.log('smsSubjectVal');
        let messageContentVal = this.messageContent;
        let intMailTemplateVal = this.intMailTemplate;
        let intDocumentType = this.fileType;
        let vchDocument = this.documentFile;
        let vchLanguage = this.vchLanguage;
        if ((this.varlist.formEnable == true) && (this.varlist.dynamicForm == true) && (!this.vldChkLst.blankCheck(this.formnames, this.commonserveice.langReplace(this.messaageslist.formnames)))) { }
        else if (!this.vldChkLst.selectDropdown(configtypeVal, this.commonserveice.langReplace(this.messaageslist.configtype), 'configtype')) { }
        else if (!this.vldChkLst.selectDropdown(this.gateWayconfigtype, this.commonserveice.langReplace(this.messaageslist.gateWayDetails), 'gatewayConfigurationType')) { }
        else if (!this.vldChkLst.selectDropdown(this.messageType, this.commonserveice.langReplace(this.messaageslist.messageType), 'messageType')) { }
        else if (!this.vldChkLst.blankCheck(vchLanguage, this.commonserveice.langReplace(this.messaageslist.vchLanguage), 'vchLanguage')) { }
        else if ((configtypeVal == 2) && (!this.vldChkLst.blankCheck(this.smsTempId, this.commonserveice.langReplace(this.messaageslist.smsTempId), 'smsTempId'))) { }
        else if (!this.vldChkLst.selectDropdown(messageTypeVal, this.commonserveice.langReplace(this.messaageslist.messageType), 'messageType')) { }
        else if ((this.messageType == 1) && (!this.vldChkLst.selectDropdown(eventTypeVal, this.commonserveice.langReplace(this.messaageslist.eventType), 'eventType'))) { }
        else if ((this.mailsmstoApplicant == '') && (!this.vldChkLst.blankCheck(this.mailsmstoAuthority, this.commonserveice.langReplace(this.messaageslist.to)))) { }
        else if ((configtypeVal == 1) && (this.mailsmstoApplicant == 1) && (!this.vldChkLst.blankCheck(this.emailId, this.commonserveice.langReplace(this.messaageslist.emailId), 'emailId'))) { }
        else if ((configtypeVal != 1) && (this.mailsmstoApplicant == 1) && (!this.vldChkLst.blankCheck(this.mobileNo, this.commonserveice.langReplace(this.messaageslist.mobileNo), 'mobileNo'))) { }
        else if (!this.vldChkLst.blankCheck(smsSubjectVal, this.commonserveice.langReplace(this.messaageslist.smsSubject), 'smsSubject')) { }
        // else if ((configtypeVal == 1) && (!this.vldChkLst.blankCheck(intMailTemplateVal,this.messaageslist.intMailTemplate))) {}
        else if ((configtypeVal == 3) && (!this.vldChkLst.selectDropdown(intDocumentType, this.commonserveice.langReplace(this.messaageslist.intDocumentType), 'fileType'))) { }
        else if ((configtypeVal == 3) && (!this.vldChkLst.selectDropdown(vchDocument, this.commonserveice.langReplace(this.messaageslist.vchDocument), 'documentFile'))) { }
        else if (!this.vldChkLst.blankCheck(messageContentVal, this.commonserveice.langReplace(this.messaageslist.smscontent), 'messageContent')) { }
        else {
            if (this.varlist.formEnable == false) {
                this.txtFormId = this.varlist.formId;
            }
            else if ((this.varlist.formEnable == true) && (this.varlist.dynamicForm == false)) {
                this.txtFormId = this.selformId;
            }
            messageContentVal = this.encDec.escapeHtml(messageContentVal);
            let mailSmsApp = '';
            if (this.mailsmstoApplicant && this.mailsmstoAuthority) {
                mailSmsApp = '1,2';
            }
            else if (this.mailsmstoAuthority) {
                mailSmsApp = '2';
            }
            else if (this.mailsmstoApplicant) {
                mailSmsApp = '1';
            }
            let formparams = {
                "itemId": this.messageId,
                "formId": this.txtFormId,
                "messageConfType": configtypeVal,
                "smsTemplateId": smsTempIdVal,
                "messageType": messageTypeVal,
                "eventType": eventTypeVal,
                "subject": smsSubjectVal,
                "messageContent": messageContentVal,
                "intCreatedBy": this.userId,
                "intUpdatedBy": this.userId,
                "intMailTemplate": this.intMailTemplate,
                "intDocumentType": intDocumentType,
                "vchDocument": vchDocument,
                "vchLanguage": vchLanguage,
                "itemStatus": '',
                "vchEmailIdKey": this.emailId,
                "vchMobileKey": this.mobileNo,
                "gateWayconfigId": this.gateWayconfigtype,
                "mailSmsTo": mailSmsApp
            };
            this.commonserveice.newMessage(formparams).subscribe({
                next: (response) => {
                    let respData = response.RESPONSE_DATA;
                    let respToken = response.RESPONSE_TOKEN;
                    let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                    if (respToken == verifyToken) {
                        let res = Buffer.from(respData, 'base64');
                        let responseResult = JSON.parse(res);
                        if (responseResult.status == 200) {
                            Swal.fire({
                                text: this.commonserveice.langReplace(this.messaageslist.successMsg),
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: this.commonserveice.langReplace('Ok')
                            }).then((result) => {
                                if (messageTypeVal == 1) {
                                    this.route.navigate(['/admin/viewmessageengine']);
                                }
                                else {
                                    this.route.navigate(['/admin/viewmessagereminder']);
                                }
                                this.resetform();
                            });
                        }
                        else if (responseResult.status == 202) {
                            // this.loading=false;
                            Swal.fire({
                                text: this.commonserveice.langReplace(this.messaageslist.updatesuccessMsg),
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: this.commonserveice.langReplace('Ok')
                            }).then((result) => {
                                if (messageTypeVal == 1) {
                                    this.route.navigate(['../viewmessageengine']);
                                }
                                else {
                                    this.route.navigate(['..viewmessagereminder']);
                                }
                                this.resetform();
                            });
                        }
                        else if (responseResult.status == 501) {
                            this.commonserveice.directlogoutlib();
                        }
                        else if (responseResult.status == 400) {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(responseResult.message.metaName[0]));
                            // this.loading=false;
                        }
                        else {
                            //this.loading=false;
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                        }
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.messaageslist.errorMsg));
                    }
                },
                error: (msg) => {
                    this.commonserveice.directlogoutlib();
                }
            });
        }
    }
    getMessageinfo() {
        let messageParams = {
            "intMessageConfigId": this.messageId,
            "intMessageConfigType": '',
            "formId": "",
            "formName": ''
        };
        this.commonserveice.viewMessage(messageParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.messageList = res.result;
                        if (this.messageList.length > 0) {
                            setTimeout(() => {
                                this.selformId = this.messageList[0].intProcessId;
                            }, 1000);
                            this.configtype = this.messageList[0].intMessageConfigType;
                            this.formnames = this.messageList[0].intProcessId;
                            this.messageType = this.messageList[0].intmessageType;
                            this.eventType = this.messageList[0].intEventType;
                            this.smsSubject = this.messageList[0].vchSubject;
                            this.messageContent = this.encDec.decodeHtml(this.messageList[0].vchMessageContent);
                            // this.messageContent = this.messageList[0].vchMessageContent;
                            // console.log(this.encDec.decodeHtml(this.messageList[0].vchMessageContent));
                            // console.log(this.messageList[0].vchMessageContent);
                            this.smsTempId = this.messageList[0].vchSmsTemplateId;
                            this.fileType = this.messageList[0].intDocumentType;
                            this.documentUrl = this.messageList[0].vchDocument;
                            this.intMailTemplate = this.messageList[0].intMailTemplate;
                            this.vchLanguage = this.messageList[0].vchLanguage;
                            this.emailId = this.messageList[0].vchEmailIdKey;
                            this.mobileNo = this.messageList[0].vchMobileKey;
                            let explodedAllMailValue = (this.messageList[0].vchMailSmsTo).split(',');
                            this.gateWayconfigtype = this.messageList[0].intGateWayConfigId;
                            this.getGateWayConfigDetails();
                            if (explodedAllMailValue.includes('1')) {
                                this.mailsmstoApplicant = '1';
                            }
                            if (explodedAllMailValue.includes('2')) {
                                this.mailsmstoAuthority = '2';
                            }
                            // alert(this.messageList[0].vchLanguage);
                        }
                    }
                    else if (res.status == 417) {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.errorApiResponse));
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.errorApiResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    ;
    resetform() {
        this.configtype = "0";
        this.formnames = "0";
        this.smsTempId = null;
        this.messageType = null;
        this.eventType = null;
        this.smsSubject = null;
        this.messageContent = 0;
        this.intMailTemplate = 0;
        this.fileType = 0;
        this.documentFile = null;
        this.vchLanguage = 0;
    }
    //form key and description section----------------------------
    getFormKeys() {
        let keyParams = {
            "itemId": this.txtFormId
        };
        this.commonserveice.getConfigurationKeys(keyParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.keysArray = res.result;
                    }
                    else if (res.status == 417) {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //
    getStaticFormKeys() {
        let keyParams = {};
        this.commonserveice.getStaticConfigurationKeys(keyParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.StatickeysArray = res.result;
                    }
                    else if (res.status == 417) {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    getLanguage() {
        let params = {
            "intId": '',
        };
        this.commonserveice.getLanguage(params).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.languageList = res.result;
                        //   console.log(this.languageList)
                    }
                    else {
                        console.log(res.messages);
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
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
    mailSmsTo(evt) {
        let elemnt = evt.target;
        if (elemnt.checked) {
            if (evt.target.value == 1) {
                this.mailsmstoApplicant = evt.target.value;
            }
            else {
                this.mailsmstoAuthority = evt.target.value;
            }
        }
        else {
            if (evt.target.value == 1) {
                this.mailsmstoApplicant = 0;
            }
            else {
                this.mailsmstoAuthority = 0;
            }
        }
    }
    getGateWayConfigDetails() {
        let params = {
            "tinType": this.configtype,
        };
        this.commonserveice.getFetchPublishRecord(params).subscribe({
            next: (response) => {
                let respToken = response.RESPONSE_TOKEN;
                let respData = response.RESPONSE_DATA;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let respData = response.RESPONSE_DATA;
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.gatewayconfigDetails = res.result;
                    }
                    else if (res.status == 400) {
                        Swal.fire({
                            icon: 'error',
                            text: "error",
                        });
                    }
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
}
AddmsgengineComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: AddmsgengineComponent, deps: [{ token: i1.Router }, { token: i1.ActivatedRoute }, { token: i2.HttpClient }, { token: ValidatorchecklistService }, { token: EncrypyDecrpyService }, { token: MsgengineLibService }, { token: VarlistService }], target: i0.ɵɵFactoryTarget.Component });
AddmsgengineComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: AddmsgengineComponent, selector: "lib-addmsgengine", viewQueries: [{ propertyName: "ckeditor", first: true, predicate: ["myckeditor"], descendants: true }], ngImport: i0, template: "<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n </div>\n <!--===Page Title===-->\n <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n       <div class=\"controls-section-header\">\n        \n        \n\n          <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\" [activeid]=\"messageId\"></lib-libtabs>\n           \n         </ul>\n         <div class=\"indicatorslist\">\n             <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\"></lib-libutils>\n            \n         </div>\n\n       </div>\n       <div class=\"card-body\">\n          <div class=\"controls-section\">\n           \n             <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" *ngIf=\"formenable && !dynamicForm\">\n                 \n                     <div class=\"row\">\n                        <label class=\"col-md-6 col-lg-4\">* {{\"Form Name\" | translate}}</label>\n                        <div class=\"col-md-6 col-lg-6\">\n                           <select class=\"form-select\" id=\"selformId\" [(ngModel)]=\"selformId\">\n                              <option value=0>{{\"Select\" | translate}}</option>\n                              <option *ngFor=\"let flist of formNameslist\" value=\"{{flist.intId}}\">\n                                 {{flist.vchProcessName}}\n                              </option>\n                              \n                           </select>\n                           \n                        </div>\n                     </div>\n                  </div>\n                   <div class=\"form-group\" *ngIf=\"formenable && dynamicForm\">\n                 \n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Form Name\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"txtProcessName\" readonly [value]=\"txtProcessName\">\n                            <input type=\"hidden\" class=\"form-control\" [(ngModel)]=\"formnames\">\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Configuration Type\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"configtype\" [(ngModel)]=\"configtype\" (change)=\"getGateWayConfigDetails()\">\n                               <option value=0  selected>{{\"Select\" | translate}}</option>\n                               <option value=1>Mail</option>\n                               <option value=2>SMS</option>\n                               <option value=9>Whatsapp</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Configuration\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"gatewayConfigurationType\" [(ngModel)]=\"gateWayconfigtype\">\n                               <option value='0' [selected]=\"true\">{{\"Select\" | translate}}</option>\n                               <ng-container *ngFor=\"let gtway of gatewayconfigDetails\">\n                                  <option  value={{gtway.intId}} [selected]=\"gtway.intId==gateWayconfigtype\">{{gtway.vchName}}</option>\n                               </ng-container>\n                               \n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Message Type\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"messageType\" name=\"messageType\" [(ngModel)]=\"messageType\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=1>Messaging</option>\n                               <option value=2>Reminder</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n \n                   <!-- get language -->\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Languages\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <!-- {{vchLanguage | json }}\n                            -->\n                            <select class=\"form-select docSizeType\" name=\"vchLanguage\" id=\"vchLanguage\" [(ngModel)]=\"vchLanguage\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <!-- <option value=0>--Select--</option>\n                               <option value=\"en\">English</option> -->\n                               \n                               <option *ngFor=\"let mNames of languageList\"  value=\"{{mNames.vchAliasName}}\">\n                                  {{mNames.vchLanguageName}}\n                               </option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n \n                   <div class=\"form-group\" *ngIf=\"configtype == 2\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"SMS Template Id\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"smsTempId\" name=\"smsTempId\" [(ngModel)]=\"smsTempId\">\n                         </div>\n                      </div>\n                   </div>\n \n                   <div class=\"form-group\" *ngIf=\"messageType == 1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Events\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" name=\"messageType\" id=\"eventType\" [(ngModel)]=\"eventType\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=1>OnSubmit</option>\n                               <option value=2>OnLoad</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\" >\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"To\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\"><div class=\"form-check form-check-inline\">\n                            <input name=\"mailSmsTo\" type=\"checkbox\" id=\"mailSmsTo1\" class=\"form-check-input\" value=\"1\" (change)=\"mailSmsTo($event)\" [checked]=\"mailsmstoApplicant=='1'\">\n                            <label for=\"mailSmsTo1\" class=\"form-check-label\">{{\"Applicant\" | translate}}</label></div><div class=\"form-check form-check-inline\"><input name=\"mailSmsTo\" type=\"checkbox\" id=\"mailSmsTo2\" class=\"form-check-input \" value=\"2\" (change)=\"mailSmsTo($event)\" [checked]=\"mailsmstoAuthority=='2'\"><label for=\"mailSmsTo2\" class=\"form-check-label\">{{\"Authority\" | translate}}</label></div></div> \n                      </div>\n                   </div>\n                   <div class=\"form-group\" *ngIf=\"mailsmstoApplicant==1 && configtype==1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Email\" | translate}} ({{\"key\" | translate}})</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" name=\"emailId\" id=\"emailId\" [(ngModel)]=\"emailId\">\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\" *ngIf=\"mailsmstoApplicant==1 && configtype!=1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Mobile No\" | translate}} ({{\"key\" | translate}})</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" name=\"mobileNo\" id=\"mobileNo\" [(ngModel)]=\"mobileNo\">\n                         </div>\n                      </div>\n                   </div>\n                   <!-- mailsmstoApplicant -->\n                   <div class=\"form-group\" >\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Subject\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" name=\"smsSubject\" id=\"smsSubject\" [(ngModel)]=\"smsSubject\">\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group d-none\" *ngIf=\"configtype == 1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Choose Template\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" name=\"messageType\" id=\"intMailTemplate\" [(ngModel)]=\"intMailTemplate\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=temp_1>Template-1</option>\n                               <option value=temp_2>Template-2</option>\n                               <option value=temp_3>Template-3</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                  \n                   <div class=\"form-group\" *ngIf=\"configtype == 9\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Document Type\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"fileType\" name=\"messageType\" (change)=\"changedocType()\"\n                               [(ngModel)]=\"fileType\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=1>Audio</option>\n                               <option value=2>Video</option>\n                               <option value=3>Image</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   \n                   <div class=\"form-group row\" *ngIf=\"configtype == 9 && fileType > 0 \">\n                      <label class=\"col-md-6 col-lg-4\">* {{\"Upload Document\" | translate}}</label>\n                      <div class=\"col-md-6 col-lg-6\">\n                        <div *ngIf=\"fileeList?.length == 0\">\n                           <div class=\"custom-dropzone\" ngx-dropzone  (change)=\"fileType > 0 ? onSelect($event) :''\" >\n                                   <ngx-dropzone-label>\n                                     <div>\n                                           <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"63\" height=\"64\" viewBox=\"0 0 63 64\">\n                                               <g  fill-rule=\"nonzero\">\n                                                   <path\n                                                       d=\"M42.656 15.135a1.953 1.953 0 0 1-1.391-.578L31.5 4.795l-9.765 9.762a1.97 1.97 0 1 1-2.785-2.785L30.106.616a1.97 1.97 0 0 1 2.785 0l11.157 11.156a1.97 1.97 0 0 1-1.392 3.363z\" />\n                                                   <path\n                                                       d=\"M31.5 36.791a1.97 1.97 0 0 1-1.969-1.969V2.01a1.97 1.97 0 0 1 3.938 0v32.812a1.97 1.97 0 0 1-1.969 1.969z\" />\n                                                   <path\n                                                       d=\"M55.781 63.041H7.22A7.225 7.225 0 0 1 0 55.822V41.385a4.599 4.599 0 0 1 4.594-4.594h7.234a4.567 4.567 0 0 1 4.402 3.276l2.814 9.382a.658.658 0 0 0 .628.467h23.656a.658.658 0 0 0 .628-.467l2.814-9.385a4.572 4.572 0 0 1 4.402-3.273h7.234A4.599 4.599 0 0 1 63 41.385v14.437a7.225 7.225 0 0 1-7.219 7.219zM4.594 40.729a.656.656 0 0 0-.657.656v14.437a3.286 3.286 0 0 0 3.282 3.282H55.78a3.286 3.286 0 0 0 3.282-3.282V41.385a.656.656 0 0 0-.657-.656h-7.234a.65.65 0 0 0-.628.467L47.73 50.58a4.628 4.628 0 0 1-4.402 3.274H19.672a4.567 4.567 0 0 1-4.402-3.276l-2.814-9.382a.65.65 0 0 0-.628-.467H4.594z\" />\n                                               </g>\n                                           </svg>\n                                       \n                                           <h3>{{\"Drag and drop file here\" | translate}}</h3>\n                                           <h3>{{\"or\" | translate}}</h3>\n                                           <label for=\"fileDropRef\">{{\"Browse for file\" | translate}}</label>\n                                      \n                                     </div>\n                                   </ngx-dropzone-label>\n                                 </div>\n\n                             \n                               </div>\n                         <small class=\"text-danger\" *ngIf=\"(fileType == 1) && (fileeList?.length == 0)\">\n                            ({{\"Only .mp3, .mpeg file only maxsize 5 MB\"}})\n                         </small>\n                         <small class=\"text-danger\" *ngIf=\"(fileType == 2) && (fileeList?.length == 0)\">\n                            ({{\"Only .mp4,.wmv, .webm files only maxsize 10 MB\"}})\n                         </small>\n                         <small class=\"text-danger\" *ngIf=\"(fileType == 3) && (fileeList?.length == 0)\">\n                            ({{\"Only .jpg, .jpeg, .png file only maxsize 1 MB\"}})\n                         </small>\n                         <div class=\"files-list\" href=\"javascript:void(0)\" *ngFor=\"let f of fileeList\" >\n                           <div>\n                             <i class=\"h6 mr-1\" [ngClass]=\"getfiletypeicon(f.fileType)\" ></i> \n                           <span>{{f.fileName}}</span>\n                        </div>\n                       \n                           <a (click)=\"onRemove(f)\" class=\"text-danger\" ngbTooltip=\"Back to upload\" title=\"\"  data-original-title=\"Cancel\"><i class=\"bi bi-trash\"></i></a>\n                       </div>\n                      </div>\n                   \n                      <!-- <div class=\"col-md-1 col-lg-1\">\n                         <div *ngIf=\"fileType == 1 && documentUrl\">\n                            <audio controls>\n                               <source src=\"{{documentUrl}}\" type=\"audio/ogg\">\n                               <source src=\"{{documentUrl}}\" type=\"audio/mpeg\">\n                               {{\"Your browser does not support the audio tag\"}}.\n                            </audio>\n \n                         </div>\n                         <div *ngIf=\"fileType == 2 && documentUrl\">\n                            <video style=\"width:100%\" style=\"height:80px\" controls>\n                               <source src=\"{{documentUrl}}\" type=\"video/mp4\">\n                               <source src=\"{{documentUrl}}\" type=\"video/ogg\">\n                               {{\"Your browser does not support the video tag\"}}.\n                            </video>\n \n                         </div>\n                         <div *ngIf=\"fileType == 3 && documentUrl\">\n                            <img src=\"{{documentUrl}}\" class=\"border\" width=\"100%\" alt=\"{{documentUrl}}\">\n                         </div>\n                      </div> -->\n                   </div>\n                </div>\n \n                <!-- =========== Dynamic Key Description Section Start =================== -->\n \n                <div class=\"col-md-6\">\n                   <div class=\"mb-4\" *ngIf=\"formenable\">\n                      <h6>{{\"Dynamic keys for value\"}} <small><i\n                               class=\"fa fa-question-circle pos-abs  hlpICNKey\" data-phlp=\"tooltip\"\n                               style=\"top:10px;right:-15px;cursor: pointer;\"></i></small></h6>\n                      <div class=\"p-2 overflow-auto\" style=\"height:240px;\">\n                         <table class=\"table table-bordered\">\n                            <thead>\n                               <tr>\n                                  <th scope=\"col\">{{\"Key\" | translate}}</th>\n                                  <th scope=\"col\">{{\"Label Name\" | translate}}</th>\n                               </tr>\n                            </thead>\n                            <tbody>\n                               <tr *ngFor=\"let keys of keysArray; let i = index\">\n                                  <td>{{'{' +keys.ctrlId+'}'}}</td>\n                                  <td>{{keys.ctrlLabel}}</td>\n                               </tr>\n                            </tbody>\n                         </table>\n                      </div>\n </div>\n                      <div class=\"\" >\n                      <h6 >{{\"Static keys for value\" | translate}} <small><i\n                         class=\"fa fa-question-circle pos-abs  hlpICNKey\" data-phlp=\"tooltip\"\n                         style=\"top:10px;right:-15px;cursor: pointer;\"></i></small></h6>\n                <div class=\"overflow-auto\" style=\"height:240px;\">\n                   <table class=\"table table-bordered\">\n                      <thead>\n                         <tr>\n                            <th scope=\"col\">{{\"Key\" | translate}}</th>\n                            <th scope=\"col\">{{\"Key Description\" | translate}}</th>\n                         </tr>\n                      </thead>\n                      <tbody>\n                         <tr *ngFor=\"let keys of StatickeysArray let i = index\">\n                            <td>{{keys.keyName}}</td>\n                            <td>{{keys.keyDescription}}</td>\n                         </tr>\n                      </tbody>\n                   </table>\n                </div>\n           \n                   </div>\n                </div>\n                <!-- =========== Dynamic Key Description Section End =================== -->\n                <div class=\"form-group\">\n                   <div class=\"row\">\n                      <label class=\"col-md-4 col-lg-2\">* {{\"Message Content\" | translate}}</label>\n                      <div class=\"col-md-8 col-lg-10\">\n                        <ckeditor [(ngModel)]=\"messageContent\"  id=\"messageContent\"\n                        #myckeditor=\"ngModel\"\n                        name=\"myckeditor\"\n                        required\n                        [config]=\"ckeConfig\" \n                        debounce=\"500\" \n                        >\n                       \n                        </ckeditor>\n                         <!-- <app-ckeditornew [ckdesc]=\"messageContent\" [(ngModel)]=\"messageContent\"></app-ckeditornew> -->\n                      </div>\n                   </div>\n                </div>\n             </div>\n          </div>\n \n          <div class=\"form-group\">\n             <div class=\"row\">\n                <label class=\"col-md-4 col-lg-2\"></label>\n                <div class=\"col-md-8 col-lg-10\" *ngIf=\"messageId == ''\">\n \n                   <button class=\"btn btn-primary\"\n                      (click)=\"newGenerateMessage()\">{{\"Submit\" | translate}}</button>\n                   <button class=\"btn btn-danger ml-1\" (click)=\"resetform()\">{{\"Reset\" | translate}}</button>\n                </div>\n                <div class=\"col-md-8 col-lg-10\" *ngIf=\"messageId\">\n \n                   <button class=\"btn btn-primary\"\n                      (click)=\"newGenerateMessage()\">{{\"Update\" | translate}}</button>\n                   <button class=\"btn btn-danger ml-1\" (click)=\"resetform()\">{{\"Cancel\" | translate}}</button>\n                </div>\n             </div>\n          </div>\n       </div>\n    </div>\n </div>\n", styles: [".files-list{display:flex;margin-bottom:.5rem;padding:.8rem 1rem;background:#f7f7f7;border-radius:2px;align-items:center;justify-content:space-between;border:1px solid #e1e1e1;cursor:pointer;word-break:break-all}.files-list i{font-size:1.3rem}.files-list:hover{background:#dedede}.custom-dropzone{margin-bottom:1rem}.btn-dropzone{height:auto}.custom-dropzone{height:auto;background:var(--bg-white);border:3px dashed var(--bs-gray-200);border-radius:5px;padding:.5rem}.custom-dropzone label{color:#fff;width:auto;border-radius:4px;background-color:var(--base-color-600);padding:.6rem 1.2rem;transition:all ease-in-out .5s}.custom-dropzone svg{fill:var(--bs-gray-200);margin-bottom:.5rem;height:40px}.ngx-dropzone-label{margin:0}.custom-dropzone h3{font-size:1rem;color:var(--bs-gray-400)}.custom-dropzone:hover label{background-color:var(--base-color-700)}\n"], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i9.NgxDropzoneComponent, selector: "ngx-dropzone, [ngx-dropzone]", inputs: ["accept", "disabled", "multiple", "maxFileSize", "expandable", "disableClick", "processDirectoryDrop", "id", "aria-label", "aria-labelledby", "aria-describedby"], outputs: ["change"] }, { kind: "directive", type: i9.NgxDropzoneLabelDirective, selector: "ngx-dropzone-label" }, { kind: "directive", type: i5.NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "triggers", "container", "disableTooltip", "tooltipClass", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }, { kind: "component", type: i11.CKEditorComponent, selector: "ckeditor", inputs: ["editorUrl", "tagName", "type", "data", "readOnly", "config"], outputs: ["namespaceLoaded", "ready", "dataReady", "change", "dataChange", "dragStart", "dragEnd", "drop", "fileUploadResponse", "fileUploadRequest", "focus", "paste", "afterPaste", "blur"] }, { kind: "component", type: LibtabsComponent, selector: "lib-libtabs", inputs: ["tabMessage", "activeid"] }, { kind: "component", type: LibutilsComponent, selector: "lib-libutils", inputs: ["childMessage", "sendIds", "funType", "pubUnpubStatus", "reloadUrl"], outputs: ["callfunction", "callfunction3"] }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: AddmsgengineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-addmsgengine', template: "<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n </div>\n <!--===Page Title===-->\n <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n       <div class=\"controls-section-header\">\n        \n        \n\n          <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\" [activeid]=\"messageId\"></lib-libtabs>\n           \n         </ul>\n         <div class=\"indicatorslist\">\n             <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\"></lib-libutils>\n            \n         </div>\n\n       </div>\n       <div class=\"card-body\">\n          <div class=\"controls-section\">\n           \n             <div class=\"row\">\n                <div class=\"col-md-6\">\n                  <div class=\"form-group\" *ngIf=\"formenable && !dynamicForm\">\n                 \n                     <div class=\"row\">\n                        <label class=\"col-md-6 col-lg-4\">* {{\"Form Name\" | translate}}</label>\n                        <div class=\"col-md-6 col-lg-6\">\n                           <select class=\"form-select\" id=\"selformId\" [(ngModel)]=\"selformId\">\n                              <option value=0>{{\"Select\" | translate}}</option>\n                              <option *ngFor=\"let flist of formNameslist\" value=\"{{flist.intId}}\">\n                                 {{flist.vchProcessName}}\n                              </option>\n                              \n                           </select>\n                           \n                        </div>\n                     </div>\n                  </div>\n                   <div class=\"form-group\" *ngIf=\"formenable && dynamicForm\">\n                 \n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Form Name\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"txtProcessName\" readonly [value]=\"txtProcessName\">\n                            <input type=\"hidden\" class=\"form-control\" [(ngModel)]=\"formnames\">\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Configuration Type\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"configtype\" [(ngModel)]=\"configtype\" (change)=\"getGateWayConfigDetails()\">\n                               <option value=0  selected>{{\"Select\" | translate}}</option>\n                               <option value=1>Mail</option>\n                               <option value=2>SMS</option>\n                               <option value=9>Whatsapp</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Configuration\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"gatewayConfigurationType\" [(ngModel)]=\"gateWayconfigtype\">\n                               <option value='0' [selected]=\"true\">{{\"Select\" | translate}}</option>\n                               <ng-container *ngFor=\"let gtway of gatewayconfigDetails\">\n                                  <option  value={{gtway.intId}} [selected]=\"gtway.intId==gateWayconfigtype\">{{gtway.vchName}}</option>\n                               </ng-container>\n                               \n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Message Type\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"messageType\" name=\"messageType\" [(ngModel)]=\"messageType\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=1>Messaging</option>\n                               <option value=2>Reminder</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n \n                   <!-- get language -->\n                   <div class=\"form-group\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Languages\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <!-- {{vchLanguage | json }}\n                            -->\n                            <select class=\"form-select docSizeType\" name=\"vchLanguage\" id=\"vchLanguage\" [(ngModel)]=\"vchLanguage\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <!-- <option value=0>--Select--</option>\n                               <option value=\"en\">English</option> -->\n                               \n                               <option *ngFor=\"let mNames of languageList\"  value=\"{{mNames.vchAliasName}}\">\n                                  {{mNames.vchLanguageName}}\n                               </option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n \n                   <div class=\"form-group\" *ngIf=\"configtype == 2\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"SMS Template Id\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" id=\"smsTempId\" name=\"smsTempId\" [(ngModel)]=\"smsTempId\">\n                         </div>\n                      </div>\n                   </div>\n \n                   <div class=\"form-group\" *ngIf=\"messageType == 1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Events\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" name=\"messageType\" id=\"eventType\" [(ngModel)]=\"eventType\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=1>OnSubmit</option>\n                               <option value=2>OnLoad</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\" >\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"To\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\"><div class=\"form-check form-check-inline\">\n                            <input name=\"mailSmsTo\" type=\"checkbox\" id=\"mailSmsTo1\" class=\"form-check-input\" value=\"1\" (change)=\"mailSmsTo($event)\" [checked]=\"mailsmstoApplicant=='1'\">\n                            <label for=\"mailSmsTo1\" class=\"form-check-label\">{{\"Applicant\" | translate}}</label></div><div class=\"form-check form-check-inline\"><input name=\"mailSmsTo\" type=\"checkbox\" id=\"mailSmsTo2\" class=\"form-check-input \" value=\"2\" (change)=\"mailSmsTo($event)\" [checked]=\"mailsmstoAuthority=='2'\"><label for=\"mailSmsTo2\" class=\"form-check-label\">{{\"Authority\" | translate}}</label></div></div> \n                      </div>\n                   </div>\n                   <div class=\"form-group\" *ngIf=\"mailsmstoApplicant==1 && configtype==1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Email\" | translate}} ({{\"key\" | translate}})</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" name=\"emailId\" id=\"emailId\" [(ngModel)]=\"emailId\">\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group\" *ngIf=\"mailsmstoApplicant==1 && configtype!=1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Mobile No\" | translate}} ({{\"key\" | translate}})</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" name=\"mobileNo\" id=\"mobileNo\" [(ngModel)]=\"mobileNo\">\n                         </div>\n                      </div>\n                   </div>\n                   <!-- mailsmstoApplicant -->\n                   <div class=\"form-group\" >\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Subject\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <input type=\"text\" class=\"form-control\" name=\"smsSubject\" id=\"smsSubject\" [(ngModel)]=\"smsSubject\">\n                         </div>\n                      </div>\n                   </div>\n                   <div class=\"form-group d-none\" *ngIf=\"configtype == 1\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Choose Template\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" name=\"messageType\" id=\"intMailTemplate\" [(ngModel)]=\"intMailTemplate\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=temp_1>Template-1</option>\n                               <option value=temp_2>Template-2</option>\n                               <option value=temp_3>Template-3</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                  \n                   <div class=\"form-group\" *ngIf=\"configtype == 9\">\n                      <div class=\"row\">\n                         <label class=\"col-md-6 col-lg-4\">* {{\"Document Type\" | translate}}</label>\n                         <div class=\"col-md-6 col-lg-6\">\n                            <select class=\"form-select docSizeType\" id=\"fileType\" name=\"messageType\" (change)=\"changedocType()\"\n                               [(ngModel)]=\"fileType\">\n                               <option value=0 disabled selected>{{\"Select\" | translate}}</option>\n                               <option value=1>Audio</option>\n                               <option value=2>Video</option>\n                               <option value=3>Image</option>\n                            </select>\n                         </div>\n                      </div>\n                   </div>\n                   \n                   <div class=\"form-group row\" *ngIf=\"configtype == 9 && fileType > 0 \">\n                      <label class=\"col-md-6 col-lg-4\">* {{\"Upload Document\" | translate}}</label>\n                      <div class=\"col-md-6 col-lg-6\">\n                        <div *ngIf=\"fileeList?.length == 0\">\n                           <div class=\"custom-dropzone\" ngx-dropzone  (change)=\"fileType > 0 ? onSelect($event) :''\" >\n                                   <ngx-dropzone-label>\n                                     <div>\n                                           <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"63\" height=\"64\" viewBox=\"0 0 63 64\">\n                                               <g  fill-rule=\"nonzero\">\n                                                   <path\n                                                       d=\"M42.656 15.135a1.953 1.953 0 0 1-1.391-.578L31.5 4.795l-9.765 9.762a1.97 1.97 0 1 1-2.785-2.785L30.106.616a1.97 1.97 0 0 1 2.785 0l11.157 11.156a1.97 1.97 0 0 1-1.392 3.363z\" />\n                                                   <path\n                                                       d=\"M31.5 36.791a1.97 1.97 0 0 1-1.969-1.969V2.01a1.97 1.97 0 0 1 3.938 0v32.812a1.97 1.97 0 0 1-1.969 1.969z\" />\n                                                   <path\n                                                       d=\"M55.781 63.041H7.22A7.225 7.225 0 0 1 0 55.822V41.385a4.599 4.599 0 0 1 4.594-4.594h7.234a4.567 4.567 0 0 1 4.402 3.276l2.814 9.382a.658.658 0 0 0 .628.467h23.656a.658.658 0 0 0 .628-.467l2.814-9.385a4.572 4.572 0 0 1 4.402-3.273h7.234A4.599 4.599 0 0 1 63 41.385v14.437a7.225 7.225 0 0 1-7.219 7.219zM4.594 40.729a.656.656 0 0 0-.657.656v14.437a3.286 3.286 0 0 0 3.282 3.282H55.78a3.286 3.286 0 0 0 3.282-3.282V41.385a.656.656 0 0 0-.657-.656h-7.234a.65.65 0 0 0-.628.467L47.73 50.58a4.628 4.628 0 0 1-4.402 3.274H19.672a4.567 4.567 0 0 1-4.402-3.276l-2.814-9.382a.65.65 0 0 0-.628-.467H4.594z\" />\n                                               </g>\n                                           </svg>\n                                       \n                                           <h3>{{\"Drag and drop file here\" | translate}}</h3>\n                                           <h3>{{\"or\" | translate}}</h3>\n                                           <label for=\"fileDropRef\">{{\"Browse for file\" | translate}}</label>\n                                      \n                                     </div>\n                                   </ngx-dropzone-label>\n                                 </div>\n\n                             \n                               </div>\n                         <small class=\"text-danger\" *ngIf=\"(fileType == 1) && (fileeList?.length == 0)\">\n                            ({{\"Only .mp3, .mpeg file only maxsize 5 MB\"}})\n                         </small>\n                         <small class=\"text-danger\" *ngIf=\"(fileType == 2) && (fileeList?.length == 0)\">\n                            ({{\"Only .mp4,.wmv, .webm files only maxsize 10 MB\"}})\n                         </small>\n                         <small class=\"text-danger\" *ngIf=\"(fileType == 3) && (fileeList?.length == 0)\">\n                            ({{\"Only .jpg, .jpeg, .png file only maxsize 1 MB\"}})\n                         </small>\n                         <div class=\"files-list\" href=\"javascript:void(0)\" *ngFor=\"let f of fileeList\" >\n                           <div>\n                             <i class=\"h6 mr-1\" [ngClass]=\"getfiletypeicon(f.fileType)\" ></i> \n                           <span>{{f.fileName}}</span>\n                        </div>\n                       \n                           <a (click)=\"onRemove(f)\" class=\"text-danger\" ngbTooltip=\"Back to upload\" title=\"\"  data-original-title=\"Cancel\"><i class=\"bi bi-trash\"></i></a>\n                       </div>\n                      </div>\n                   \n                      <!-- <div class=\"col-md-1 col-lg-1\">\n                         <div *ngIf=\"fileType == 1 && documentUrl\">\n                            <audio controls>\n                               <source src=\"{{documentUrl}}\" type=\"audio/ogg\">\n                               <source src=\"{{documentUrl}}\" type=\"audio/mpeg\">\n                               {{\"Your browser does not support the audio tag\"}}.\n                            </audio>\n \n                         </div>\n                         <div *ngIf=\"fileType == 2 && documentUrl\">\n                            <video style=\"width:100%\" style=\"height:80px\" controls>\n                               <source src=\"{{documentUrl}}\" type=\"video/mp4\">\n                               <source src=\"{{documentUrl}}\" type=\"video/ogg\">\n                               {{\"Your browser does not support the video tag\"}}.\n                            </video>\n \n                         </div>\n                         <div *ngIf=\"fileType == 3 && documentUrl\">\n                            <img src=\"{{documentUrl}}\" class=\"border\" width=\"100%\" alt=\"{{documentUrl}}\">\n                         </div>\n                      </div> -->\n                   </div>\n                </div>\n \n                <!-- =========== Dynamic Key Description Section Start =================== -->\n \n                <div class=\"col-md-6\">\n                   <div class=\"mb-4\" *ngIf=\"formenable\">\n                      <h6>{{\"Dynamic keys for value\"}} <small><i\n                               class=\"fa fa-question-circle pos-abs  hlpICNKey\" data-phlp=\"tooltip\"\n                               style=\"top:10px;right:-15px;cursor: pointer;\"></i></small></h6>\n                      <div class=\"p-2 overflow-auto\" style=\"height:240px;\">\n                         <table class=\"table table-bordered\">\n                            <thead>\n                               <tr>\n                                  <th scope=\"col\">{{\"Key\" | translate}}</th>\n                                  <th scope=\"col\">{{\"Label Name\" | translate}}</th>\n                               </tr>\n                            </thead>\n                            <tbody>\n                               <tr *ngFor=\"let keys of keysArray; let i = index\">\n                                  <td>{{'{' +keys.ctrlId+'}'}}</td>\n                                  <td>{{keys.ctrlLabel}}</td>\n                               </tr>\n                            </tbody>\n                         </table>\n                      </div>\n </div>\n                      <div class=\"\" >\n                      <h6 >{{\"Static keys for value\" | translate}} <small><i\n                         class=\"fa fa-question-circle pos-abs  hlpICNKey\" data-phlp=\"tooltip\"\n                         style=\"top:10px;right:-15px;cursor: pointer;\"></i></small></h6>\n                <div class=\"overflow-auto\" style=\"height:240px;\">\n                   <table class=\"table table-bordered\">\n                      <thead>\n                         <tr>\n                            <th scope=\"col\">{{\"Key\" | translate}}</th>\n                            <th scope=\"col\">{{\"Key Description\" | translate}}</th>\n                         </tr>\n                      </thead>\n                      <tbody>\n                         <tr *ngFor=\"let keys of StatickeysArray let i = index\">\n                            <td>{{keys.keyName}}</td>\n                            <td>{{keys.keyDescription}}</td>\n                         </tr>\n                      </tbody>\n                   </table>\n                </div>\n           \n                   </div>\n                </div>\n                <!-- =========== Dynamic Key Description Section End =================== -->\n                <div class=\"form-group\">\n                   <div class=\"row\">\n                      <label class=\"col-md-4 col-lg-2\">* {{\"Message Content\" | translate}}</label>\n                      <div class=\"col-md-8 col-lg-10\">\n                        <ckeditor [(ngModel)]=\"messageContent\"  id=\"messageContent\"\n                        #myckeditor=\"ngModel\"\n                        name=\"myckeditor\"\n                        required\n                        [config]=\"ckeConfig\" \n                        debounce=\"500\" \n                        >\n                       \n                        </ckeditor>\n                         <!-- <app-ckeditornew [ckdesc]=\"messageContent\" [(ngModel)]=\"messageContent\"></app-ckeditornew> -->\n                      </div>\n                   </div>\n                </div>\n             </div>\n          </div>\n \n          <div class=\"form-group\">\n             <div class=\"row\">\n                <label class=\"col-md-4 col-lg-2\"></label>\n                <div class=\"col-md-8 col-lg-10\" *ngIf=\"messageId == ''\">\n \n                   <button class=\"btn btn-primary\"\n                      (click)=\"newGenerateMessage()\">{{\"Submit\" | translate}}</button>\n                   <button class=\"btn btn-danger ml-1\" (click)=\"resetform()\">{{\"Reset\" | translate}}</button>\n                </div>\n                <div class=\"col-md-8 col-lg-10\" *ngIf=\"messageId\">\n \n                   <button class=\"btn btn-primary\"\n                      (click)=\"newGenerateMessage()\">{{\"Update\" | translate}}</button>\n                   <button class=\"btn btn-danger ml-1\" (click)=\"resetform()\">{{\"Cancel\" | translate}}</button>\n                </div>\n             </div>\n          </div>\n       </div>\n    </div>\n </div>\n", styles: [".files-list{display:flex;margin-bottom:.5rem;padding:.8rem 1rem;background:#f7f7f7;border-radius:2px;align-items:center;justify-content:space-between;border:1px solid #e1e1e1;cursor:pointer;word-break:break-all}.files-list i{font-size:1.3rem}.files-list:hover{background:#dedede}.custom-dropzone{margin-bottom:1rem}.btn-dropzone{height:auto}.custom-dropzone{height:auto;background:var(--bg-white);border:3px dashed var(--bs-gray-200);border-radius:5px;padding:.5rem}.custom-dropzone label{color:#fff;width:auto;border-radius:4px;background-color:var(--base-color-600);padding:.6rem 1.2rem;transition:all ease-in-out .5s}.custom-dropzone svg{fill:var(--bs-gray-200);margin-bottom:.5rem;height:40px}.ngx-dropzone-label{margin:0}.custom-dropzone h3{font-size:1rem;color:var(--bs-gray-400)}.custom-dropzone:hover label{background-color:var(--base-color-700)}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.HttpClient }, { type: ValidatorchecklistService }, { type: EncrypyDecrpyService }, { type: MsgengineLibService }, { type: VarlistService }]; }, propDecorators: { ckeditor: [{
                type: ViewChild,
                args: ["myckeditor"]
            }] } });

class ViewmsgengineComponent {
    constructor(route, httpClient, 
    // public commonserveice: CommonvarlistService,
    // private getwayService: GetwayvarlistuartionService,
    commonserveice, varlist, modalService, encDec) {
        this.route = route;
        this.httpClient = httpClient;
        this.commonserveice = commonserveice;
        this.varlist = varlist;
        this.modalService = modalService;
        this.encDec = encDec;
        this.jsonurl = [
            {
                "pagetitle": "View Message Engine",
                "tabList": [
                    { "tabName": "Add", "tabUrl": "../addmessageengine" },
                    { "tabName": "View", "tabUrl": "../viewmessageengine", "tabClass": "active" },
                    { "tabName": "Reminder", "tabUrl": "../viewmessagereminder" }
                ],
                "utils": [
                    { "utilName": "search" },
                    { "utilName": "print" },
                    { "utilName": "delete" },
                    { "utilName": "publish" },
                    { "utilName": "unpublish" },
                ],
                "messages": {
                    "successMsg": "Date saved successfully",
                    "errorMsg": "Something Went Wrong",
                    "warningtype": "You want to delete this record",
                    "deleteMsg": "Record has been deleted"
                }
            }
        ];
        this.letterID = "";
        // editor: any = ClassicEditor;
        this.isFlag = true;
        this.page = 1;
        this.count = 0;
        this.tableSize = 10;
        this.pageSizes = [10, 20, 50, 100, 500, 1000];
        this.loading = false;
        this.letterIdArray = [];
        this.pubUnpStatus = [];
        this.sevName = "";
        this.selFormName = 0;
        this.txtLetterName = null;
        this.langKey = 'en';
        this.indexNumber = 0;
        this.formenable = this.varlist.formEnable;
        this.sevName = varlist.serviceModuleconfig;
    }
    ngOnInit() {
        this.loadconfig();
        this.viewItems('', '', '', '', 1);
        if (this.formenable == true) {
            this.getForms();
        }
        //this.addChangeEventForLabel();
    }
    loadconfig() {
        this.tablist = this.jsonurl[0].tabList;
        this.utillist = this.jsonurl[0].utils;
        this.messaageslist = this.jsonurl[0].messages;
        this.title = this.jsonurl[0].pagetitle;
    }
    multilingual(test) {
        return test;
    }
    getForms() {
        let params = {};
        this.commonserveice.getForms(params).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    //console.log('res');
                    if (res.status === 200) {
                        this.formNames = res.result;
                    }
                    else {
                        console.log(res.messages);
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    viewItems(MessageConfigId, intMessageConfigType, formId, formName, messageType) {
        this.letterIdArray = [];
        this.txtMessageConfigType = 0;
        this.selFormName = null;
        let messageParams = {
            "intMessageConfigId": MessageConfigId,
            "intMessageConfigType": intMessageConfigType,
            "formId": formId,
            "formName": formName,
            "messageType": messageType
        };
        this.loading = true;
        this.pubUnpStatus = [];
        this.commonserveice.viewMessage(messageParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.messageList = res.result;
                        // console.log(this.messageList)
                        this.isFlag = true;
                        this.loading = false;
                    }
                    else if (res.status == 417) {
                        this.isFlag = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                    else {
                        this.isFlag = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                }
                else {
                    this.isFlag = false;
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    viewSearchList() {
        let Formid = this.selFormName;
        let MessageConfigType = this.txtMessageConfigType;
        this.viewItems('', MessageConfigType, Formid, '', 1);
    }
    onTableDataChange(event) {
        this.page = event;
        this.indexNumber = (this.page - 1) * this.tableSize;
    }
    onTableSizeChange(event) {
        this.tableSize = event.target.value;
        this.page = 1;
        this.indexNumber = 0;
    }
    onChange(checkid, e, publishStatus) {
        let totalCheckbox = document.querySelectorAll('.rowCheck').length;
        let totalChecked = document.querySelectorAll('.rowCheck:checked').length;
        let parentcheck = document.querySelectorAll('.checkall');
        if (totalCheckbox == totalChecked) {
            parentcheck[0].checked = true;
        }
        else {
            parentcheck[0].checked = false;
        }
        if (e.target.checked) {
            if (!this.letterIdArray.includes(checkid)) {
                this.letterIdArray.push(checkid);
                this.pubUnpStatus.push({ 'letterId': checkid, 'publishUnpublisStatus': publishStatus });
            }
        }
        else {
            let index = this.letterIdArray.indexOf(checkid);
            let indxAdd = 0;
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
    selectAll(e) {
        let checkBoxes = document.querySelectorAll('.rowCheck');
        if (e.target.checked) {
            for (let i = 0; i < checkBoxes.length; i++) {
                let ids = checkBoxes[i].id;
                this.letterIdArray.push(parseInt(ids));
                this.pubUnpStatus.push({ 'letterId': ids, 'publishUnpublisStatus': checkBoxes[i].getAttribute("pubstatus") });
                checkBoxes[i].checked = true;
            }
        }
        else {
            this.pubUnpStatus = [];
            this.letterIdArray = [];
            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = false;
            }
        }
    }
    //edit function call for edit id================================
    editMessage(messageStr) {
        let encSchemeStr = this.encDec.encText(messageStr.toString());
        this.route.navigate(['/admin/addmessageengine', encSchemeStr]);
    }
    deleteLetter(messageId) {
        let messageParams = {
            "itemId": messageId,
            "itemStatus": "1"
        };
        Swal.fire({
            title: 'Are you sure' + '?',
            text: this.messaageslist.warningtype,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes' + ', ' + 'delete it' + "!"
        }).then((result) => {
            if (result.isConfirmed) {
                this.commonserveice.newMessage(messageParams).subscribe({
                    next: (response) => {
                        if (response.status == 200) {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.messaageslist.deleteMsg));
                            this.viewItems('', '', '', '', 1);
                        }
                        else {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.messaageslist.errorMsg));
                        }
                    },
                    error: (msg) => {
                        this.commonserveice.directlogoutlib();
                    }
                });
            }
        });
    }
    htmldecode(data) {
        let doc = new DOMParser().parseFromString(data, "text/html");
        return doc.documentElement.textContent;
    }
}
ViewmsgengineComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewmsgengineComponent, deps: [{ token: i1.Router }, { token: i2.HttpClient }, { token: MsgengineLibService }, { token: VarlistService }, { token: i5.NgbModal }, { token: EncrypyDecrpyService }], target: i0.ɵɵFactoryTarget.Component });
ViewmsgengineComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: ViewmsgengineComponent, selector: "lib-viewmsgengine", ngImport: i0, template: "<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n  </div>\n  <!--===Page Title===-->\n  <!--===controle section===-->\n  <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n      <div class=\"controls-section-header\">\n       \n        <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n    \n        </ul>\n        <div class=\"indicatorslist\">\n\n            <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\" [sendIds]=\"letterIdArray\" \n            [funType]=\"sevName\" [pubUnpubStatus]=\"pubUnpStatus\"  (callfunction)=\"viewItems('','','','',1)\"\n            (callfunction2)='selectAll($event)'></lib-libutils>\n          \n         \n        </div>\n\n      </div>\n      <div class=\"card-body\">\n  \n  \n        <div class=\"controls-section\">\n          <!-- Search Panel -->\n          <div class=\"search-container active\" id=\"search-container\">\n  \n            <div class=\"search-sec\">\n  \n              <div class=\"row\">\n  \n                <div class=\"col-12 col-md-3 col-lg-3\" *ngIf=\"formenable\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"selFormName\" placeholder=\"Select Form Name\">\n                  </div>\n                </div>\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <select class=\"form-select docSizeType\" [(ngModel)]=\"txtMessageConfigType\">\n                      <option value=\"0\" disabled selected>{{\"Select Message config Type\" | translate}}</option>\n                      <option value=1>Mail</option>\n                      <option value=2>SMS</option>\n                      <option value=3>Whatsapp</option>\n                    </select>\n  \n                  </div>\n                </div>\n  \n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <button class=\"btn btn-primary\" (click)=\"viewSearchList()\"> {{\"Search\" | translate}}</button>\n                    <button class=\"btn btn-danger ml-1\" (click)=\"viewItems('','','','',1)\"> {{\"Reset\" | translate}}</button>\n                  </div>\n                </div>\n              </div>\n  \n  \n            </div>\n  \n  \n          </div>\n          <!-- Search Panel -->\n          <div *ngIf=\"messageList?.length > 0; else norecord\">\n  \n            <div class=\"d-flex justify-content-between mb-3\">\n              <div>\n                <ul class=\"legends\">\n                  <li><span class=\"bg-success\"></span> {{\"Publish\" | translate}}</li>\n                  <li><span class=\"bg-danger\"></span> {{\"Unpublish\" | translate}}</li>\n                </ul>\n              </div>\n              <div>\n                {{\"Per Page\" | translate}}:\n                <select (change)=\"onTableSizeChange($event)\">\n                  <option *ngFor=\"let size of pageSizes\" [ngValue]=\"size\">\n                    {{ size }}\n                  </option>\n                </select>\n              </div>\n            </div>\n            <div class=\"table-responsive print-section\" id=\"print-section\"> \n              <table data-toggle=\"table\" class=\"table table-bordered valign-middle\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\" style=\"width:40px\" class=\"noPrint\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input checkall\" type=\"checkbox\" (change)=\"selectAll($event)\" id=\"checkall\"\n                          name=\"checkall\" value=\"checkall\">\n  \n                      </div>\n                    </th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:40px\">{{\"Sl No\"| translate }}</th>\n                    <th scope=\"col\" *ngIf=\"formenable\">{{\"Form Name\" | translate}}</th>\n                    <th scope=\"col\">{{\"Configuration Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"SMS TemplateId\" | translate}}</th>\n                    <th scope=\"col\">{{\"Message Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Language\" | translate}}</th>\n                    <th scope=\"col\">{{\"Created On\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:80px\">{{\"Action\" | translate}}</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr  *ngFor=\"let messages of messageList | paginate\n                          : {\n                              itemsPerPage: tableSize,\n                              currentPage: page,\n                              totalItems: count\n                            };\n                      let i = index\">\n                    <td class=\"noPrint border-left-2\"\n                      [ngClass]=\"{'border-left-danger': messages.tinPublishStatus === 0 , 'border-left-success': messages.tinPublishStatus === 1 }\">\n                      <div>\n                        <input class=\"form-check-input rowCheck\" type=\"checkbox\"\n                          (change)=\"onChange(messages.intMessageConfigId, $event,messages.tinPublishStatus)\"\n                          name=\"{{messages.intMessageConfigId }}\" [id]=\"messages.intMessageConfigId\"\n                          [value]=\"messages.intMessageConfigId\" [attr.pubstatus]=\"messages.tinPublishStatus\">\n                      </div>\n                    </td>\n                    <td>{{i+1+indexNumber}} </td>\n                    <td *ngIf=\"formenable\"><a type=\"button\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{messages.vchProcessName}}\n                      </a>\n                    </td>\n                    <td>\n                      <a type=\"button\" *ngIf=\"!formenable\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}\n                      </a>\n                      <span *ngIf=\"formenable\">\n                      {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}</span></td>\n                    <td>{{messages.vchSmsTemplateId !='' ? messages.vchSmsTemplateId: '--'}}</td>\n                    <td>{{messages.intmessageType == 1 ? 'Messaging': 'Reminder'}}</td>\n                    <td>{{messages.vchLanguage}}</td>\n                    <td>{{messages.dtmCreatedOn}}</td>\n                    <td class=\"noPrint\"><a class=\"text-primary\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Edit\"\n                        (click)=\"editMessage(messages.intMessageConfigId+':'+messages.intProcessId+':'+messages.vchProcessName)\"><i\n                          class=\"icon-edit-solid\"></i></a>\n                         \n                          <div class=\"modal fade noPrint\"  id=\"previewModal{{i}}\" tabindex=\"-1\" aria-labelledby=\"previewModalLabel\"\n                          aria-hidden=\"true\">\n                          <div class=\"modal-dialog modal-lg\">\n                            <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                <h5 class=\"modal-title mb-0\" id=\"previewModalLabel\">{{\"Message Details\" | translate}}\n                                </h5>\n                                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                              </div>\n                              <div class=\"modal-body\">\n                                <table class=\"table table-bordered\">\n                                  <tbody>\n                                    <tr *ngIf=\"formenable\">\n                                      <td class=\"w-25 fw-bold\">{{\"Form Name\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchProcessName}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Subject\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSubject}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 2\">\n                                      <td class=\"w-25 fw-bold\">{{\"SMS TemplateId\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSmsTemplateId}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 1\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Audio\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <audio controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"audio/mp3\">\n                                          {{\"Your browser does not support the audio tag\"}}.\n                                        </audio>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 2\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Video\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <video width=\"320\" height=\"240\" controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"video/mp4\">\n                                          {{\"Your browser does not support the video tag\"}}.\n                                        </video>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 3\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Image\" | translate}} </td>\n                                      <td colspan=\"2\"><img src=\"{{messages.vchDocument}}\" style=\"max-width:100%\"\n                                          height=\"70px\"></td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Message Content\" | translate}} </td>\n                                      <td>\n                                        <div class=\"pdfContainer\" [innerHtml]=\"htmldecode(messages.vchMessageContent)\">\n\n                                        \n                                        </div>\n                                      </td>\n                                    </tr>\n      \n      \n      \n                                  </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        \n                        </td>\n\n\n                \n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <lib-libpagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-libpagination>\n          </div>\n          <ng-template #norecord>\n            <h6 class=\"no-content\"> {{\"No Record Found\" | translate}}</h6>\n          </ng-template>\n        </div>\n  \n      </div>\n    </div>\n  </div>\n  <div class=\"loader\" *ngIf=\"loading\">\n    <div class=\"loader-item\"></div>\n    <p>{{\"Loading\"}}...</p>\n  </div>\n", styles: [""], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: LibtabsComponent, selector: "lib-libtabs", inputs: ["tabMessage", "activeid"] }, { kind: "component", type: LibutilsComponent, selector: "lib-libutils", inputs: ["childMessage", "sendIds", "funType", "pubUnpubStatus", "reloadUrl"], outputs: ["callfunction", "callfunction3"] }, { kind: "component", type: LibpaginationComponent, selector: "lib-libpagination", inputs: ["page", "count", "tableSize"], outputs: ["callfunction"] }, { kind: "pipe", type: i12.PaginatePipe, name: "paginate" }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewmsgengineComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-viewmsgengine', template: "<!--===Page Title===-->\n<div class=\"page-title\">\n\n    <h4>{{title | translate}}</h4>\n  </div>\n  <!--===Page Title===-->\n  <!--===controle section===-->\n  <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n      <div class=\"controls-section-header\">\n       \n        <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n    \n        </ul>\n        <div class=\"indicatorslist\">\n\n            <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\" [sendIds]=\"letterIdArray\" \n            [funType]=\"sevName\" [pubUnpubStatus]=\"pubUnpStatus\"  (callfunction)=\"viewItems('','','','',1)\"\n            (callfunction2)='selectAll($event)'></lib-libutils>\n          \n         \n        </div>\n\n      </div>\n      <div class=\"card-body\">\n  \n  \n        <div class=\"controls-section\">\n          <!-- Search Panel -->\n          <div class=\"search-container active\" id=\"search-container\">\n  \n            <div class=\"search-sec\">\n  \n              <div class=\"row\">\n  \n                <div class=\"col-12 col-md-3 col-lg-3\" *ngIf=\"formenable\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"selFormName\" placeholder=\"Select Form Name\">\n                  </div>\n                </div>\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <select class=\"form-select docSizeType\" [(ngModel)]=\"txtMessageConfigType\">\n                      <option value=\"0\" disabled selected>{{\"Select Message config Type\" | translate}}</option>\n                      <option value=1>Mail</option>\n                      <option value=2>SMS</option>\n                      <option value=3>Whatsapp</option>\n                    </select>\n  \n                  </div>\n                </div>\n  \n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <button class=\"btn btn-primary\" (click)=\"viewSearchList()\"> {{\"Search\" | translate}}</button>\n                    <button class=\"btn btn-danger ml-1\" (click)=\"viewItems('','','','',1)\"> {{\"Reset\" | translate}}</button>\n                  </div>\n                </div>\n              </div>\n  \n  \n            </div>\n  \n  \n          </div>\n          <!-- Search Panel -->\n          <div *ngIf=\"messageList?.length > 0; else norecord\">\n  \n            <div class=\"d-flex justify-content-between mb-3\">\n              <div>\n                <ul class=\"legends\">\n                  <li><span class=\"bg-success\"></span> {{\"Publish\" | translate}}</li>\n                  <li><span class=\"bg-danger\"></span> {{\"Unpublish\" | translate}}</li>\n                </ul>\n              </div>\n              <div>\n                {{\"Per Page\" | translate}}:\n                <select (change)=\"onTableSizeChange($event)\">\n                  <option *ngFor=\"let size of pageSizes\" [ngValue]=\"size\">\n                    {{ size }}\n                  </option>\n                </select>\n              </div>\n            </div>\n            <div class=\"table-responsive print-section\" id=\"print-section\"> \n              <table data-toggle=\"table\" class=\"table table-bordered valign-middle\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\" style=\"width:40px\" class=\"noPrint\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input checkall\" type=\"checkbox\" (change)=\"selectAll($event)\" id=\"checkall\"\n                          name=\"checkall\" value=\"checkall\">\n  \n                      </div>\n                    </th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:40px\">{{\"Sl No\"| translate }}</th>\n                    <th scope=\"col\" *ngIf=\"formenable\">{{\"Form Name\" | translate}}</th>\n                    <th scope=\"col\">{{\"Configuration Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"SMS TemplateId\" | translate}}</th>\n                    <th scope=\"col\">{{\"Message Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Language\" | translate}}</th>\n                    <th scope=\"col\">{{\"Created On\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:80px\">{{\"Action\" | translate}}</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr  *ngFor=\"let messages of messageList | paginate\n                          : {\n                              itemsPerPage: tableSize,\n                              currentPage: page,\n                              totalItems: count\n                            };\n                      let i = index\">\n                    <td class=\"noPrint border-left-2\"\n                      [ngClass]=\"{'border-left-danger': messages.tinPublishStatus === 0 , 'border-left-success': messages.tinPublishStatus === 1 }\">\n                      <div>\n                        <input class=\"form-check-input rowCheck\" type=\"checkbox\"\n                          (change)=\"onChange(messages.intMessageConfigId, $event,messages.tinPublishStatus)\"\n                          name=\"{{messages.intMessageConfigId }}\" [id]=\"messages.intMessageConfigId\"\n                          [value]=\"messages.intMessageConfigId\" [attr.pubstatus]=\"messages.tinPublishStatus\">\n                      </div>\n                    </td>\n                    <td>{{i+1+indexNumber}} </td>\n                    <td *ngIf=\"formenable\"><a type=\"button\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{messages.vchProcessName}}\n                      </a>\n                    </td>\n                    <td>\n                      <a type=\"button\" *ngIf=\"!formenable\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}\n                      </a>\n                      <span *ngIf=\"formenable\">\n                      {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}</span></td>\n                    <td>{{messages.vchSmsTemplateId !='' ? messages.vchSmsTemplateId: '--'}}</td>\n                    <td>{{messages.intmessageType == 1 ? 'Messaging': 'Reminder'}}</td>\n                    <td>{{messages.vchLanguage}}</td>\n                    <td>{{messages.dtmCreatedOn}}</td>\n                    <td class=\"noPrint\"><a class=\"text-primary\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Edit\"\n                        (click)=\"editMessage(messages.intMessageConfigId+':'+messages.intProcessId+':'+messages.vchProcessName)\"><i\n                          class=\"icon-edit-solid\"></i></a>\n                         \n                          <div class=\"modal fade noPrint\"  id=\"previewModal{{i}}\" tabindex=\"-1\" aria-labelledby=\"previewModalLabel\"\n                          aria-hidden=\"true\">\n                          <div class=\"modal-dialog modal-lg\">\n                            <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                <h5 class=\"modal-title mb-0\" id=\"previewModalLabel\">{{\"Message Details\" | translate}}\n                                </h5>\n                                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                              </div>\n                              <div class=\"modal-body\">\n                                <table class=\"table table-bordered\">\n                                  <tbody>\n                                    <tr *ngIf=\"formenable\">\n                                      <td class=\"w-25 fw-bold\">{{\"Form Name\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchProcessName}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Subject\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSubject}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 2\">\n                                      <td class=\"w-25 fw-bold\">{{\"SMS TemplateId\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSmsTemplateId}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 1\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Audio\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <audio controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"audio/mp3\">\n                                          {{\"Your browser does not support the audio tag\"}}.\n                                        </audio>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 2\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Video\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <video width=\"320\" height=\"240\" controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"video/mp4\">\n                                          {{\"Your browser does not support the video tag\"}}.\n                                        </video>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 3\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Image\" | translate}} </td>\n                                      <td colspan=\"2\"><img src=\"{{messages.vchDocument}}\" style=\"max-width:100%\"\n                                          height=\"70px\"></td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Message Content\" | translate}} </td>\n                                      <td>\n                                        <div class=\"pdfContainer\" [innerHtml]=\"htmldecode(messages.vchMessageContent)\">\n\n                                        \n                                        </div>\n                                      </td>\n                                    </tr>\n      \n      \n      \n                                  </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        \n                        </td>\n\n\n                \n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <lib-libpagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-libpagination>\n          </div>\n          <ng-template #norecord>\n            <h6 class=\"no-content\"> {{\"No Record Found\" | translate}}</h6>\n          </ng-template>\n        </div>\n  \n      </div>\n    </div>\n  </div>\n  <div class=\"loader\" *ngIf=\"loading\">\n    <div class=\"loader-item\"></div>\n    <p>{{\"Loading\"}}...</p>\n  </div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.HttpClient }, { type: MsgengineLibService }, { type: VarlistService }, { type: i5.NgbModal }, { type: EncrypyDecrpyService }]; } });

class ViewmsgreminderComponent {
    constructor(route, httpClient, commonserveice, varlist, modalService, vldChkLst, encDec) {
        this.route = route;
        this.httpClient = httpClient;
        this.commonserveice = commonserveice;
        this.varlist = varlist;
        this.modalService = modalService;
        this.vldChkLst = vldChkLst;
        this.encDec = encDec;
        this.messaageslist = {
            "successMsg": "Date saved successfully",
            "errorMsg": "Something Went Wrong",
            "warningtype": "You want to delete this record",
            "deleteMsg": "Record has been deleted",
            "schedularUrl": "Please Enter a URL",
            "schedularUrlValid": "Please Enter a Valid URL",
            "startDate": "Please select a Start Date",
            "freqType": " frequency Type",
            "freqDuration": "Please Enter frequency Duration"
        };
        this.jsonurl = [
            {
                "pagetitle": "View Reminder",
                "tabList": [
                    { "tabName": "Add", "tabUrl": "../addmessageengine" },
                    { "tabName": "View", "tabUrl": "../viewmessageengine" },
                    { "tabName": "Reminder", "tabUrl": "./viewmessagereminder", "tabClass": "active" }
                ],
                "utils": [
                    { "utilName": "search" },
                    { "utilName": "print" },
                    { "utilName": "delete" },
                    { "utilName": "publish" },
                    { "utilName": "unpublish" },
                ],
            }
        ];
        this.letterID = "";
        this.isFlag = true;
        this.page = 1;
        this.count = 0;
        this.tableSize = 10;
        this.pageSizes = [10, 20, 50, 100, 500, 1000];
        this.loading = false;
        this.letterIdArray = [];
        this.pubUnpStatus = [];
        this.sevName = "";
        this.selFormName = 0;
        this.txtLetterName = null;
        this.freqType = 0;
        this.freqDuration = null;
        this.txtFormId = null;
        this.schedularUrl = null;
        this.schedularStatus = 0;
        this.langKey = 'en';
        this.indexNumber = 0;
        this.formenable = this.varlist.formEnable;
        this.sevName = varlist.serviceModuleconfig;
    }
    ngOnInit() {
        this.loadconfig();
        this.viewItemsReminder('', '', '', '', 2);
        //this.addChangeEventForLabel();
        if (this.formenable == true) {
            this.getForms();
        }
        this.sessiontoken = sessionStorage.getItem('ADMIN_SESSION');
        let SeetionParsed;
        if (this.varlist.sessionEncrypted == true) {
            SeetionParsed = JSON.parse(CryptoJS.AES.decrypt(this.sessiontoken, this.varlist.apiHashingKey).toString(CryptoJS.enc.Utf8));
        }
        else {
            SeetionParsed = JSON.parse(this.sessiontoken);
        }
        this.userId = SeetionParsed.USER_ID;
    }
    loadconfig() {
        this.tablist = this.jsonurl[0].tabList;
        this.utillist = this.jsonurl[0].utils;
        this.title = this.jsonurl[0].pagetitle;
    }
    multilingual(test) {
        return test;
    }
    getForms() {
        let params = {};
        this.commonserveice.getForms(params).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status === 200) {
                        this.formNames = res.result;
                    }
                    else {
                        console.log(res.messages);
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    selectAll(e) {
        let checkBoxes = document.querySelectorAll('.rowCheck');
        if (e.target.checked) {
            for (let i = 0; i < checkBoxes.length; i++) {
                let ids = checkBoxes[i].id;
                this.letterIdArray.push(parseInt(ids));
                this.pubUnpStatus.push({ 'letterId': ids, 'publishUnpublisStatus': checkBoxes[i].getAttribute("pubstatus") });
                checkBoxes[i].checked = true;
            }
        }
        else {
            this.pubUnpStatus = [];
            this.letterIdArray = [];
            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = false;
            }
        }
    }
    viewItemsReminder(intMessageConfigId, intMessageConfigType, formId, formName, messageType) {
        this.letterIdArray = [];
        this.txtMessageConfigType = 0;
        this.selFormName = null;
        let messageParams = {
            "intMessageConfigId": intMessageConfigId,
            "intMessageConfigType": intMessageConfigType,
            "formId": formId,
            "formName": formName,
            "messageType": messageType
        };
        this.loading = true;
        this.pubUnpStatus = [];
        this.commonserveice.viewMessage(messageParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.messageList = res.result;
                        // console.log(this.messageList)
                        this.isFlag = true;
                        this.loading = false;
                    }
                    else if (res.status == 417) {
                        this.isFlag = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                    else {
                        this.isFlag = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                }
                else {
                    this.isFlag = false;
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    viewSearchList() {
        let Formid = this.selFormName;
        let MessageConfigType = this.txtMessageConfigType;
        this.viewItemsReminder('', MessageConfigType, Formid, '', 2);
    }
    createreminder(intProcessId, intMessageConfigId, intMessageConfigType) {
        this.open(this.createreminderModal);
        this.sMintProcessId = intProcessId;
        this.sMintMessageConfigId = intMessageConfigId;
        this.sMintMessageConfigType = intMessageConfigType;
    }
    onTableDataChange(event) {
        this.page = event;
        this.indexNumber = (this.page - 1) * this.tableSize;
    }
    onTableSizeChange(event) {
        this.tableSize = event.target.value;
        this.page = 1;
        this.indexNumber = 0;
    }
    onChange(checkid, e, publishStatus) {
        let totalCheckbox = document.querySelectorAll('.rowCheck').length;
        let totalChecked = document.querySelectorAll('.rowCheck:checked').length;
        let parentcheck = document.querySelectorAll('.checkall');
        if (totalCheckbox == totalChecked) {
            parentcheck[0].checked = true;
        }
        else {
            parentcheck[0].checked = false;
        }
        if (e.target.checked) {
            if (!this.letterIdArray.includes(checkid)) {
                this.letterIdArray.push(checkid);
                this.pubUnpStatus.push({ 'letterId': checkid, 'publishUnpublisStatus': publishStatus });
            }
        }
        else {
            let index = this.letterIdArray.indexOf(checkid);
            let indxAdd = 0;
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
    editReminder(messageStr) {
        let encSchemeStr = this.encDec.encText(messageStr.toString());
        this.route.navigate(['/admin/editReminderEngine', encSchemeStr]);
    }
    //\\ ======================== // Create Scheduler // ======================== //\\
    createSchedular() {
        let startDateVal = this.startDateTime;
        let freqTypeVal = this.freqType;
        let freqDurationVal = this.freqDuration;
        if (!this.vldChkLst.blankCheck(this.schedularUrl, this.commonserveice.langReplace(this.messaageslist.schedularUrl), 'schedularUrl')) { }
        else if (!this.vldChkLst.is_url(this.schedularUrl)) { }
        else if (!this.vldChkLst.blankCheck(startDateVal, this.commonserveice.langReplace(this.messaageslist.startDate), 'startDateTime')) { }
        else if (!this.vldChkLst.selectDropdown(freqTypeVal, this.commonserveice.langReplace(this.messaageslist.freqType), 'freqType')) { }
        else if (!this.vldChkLst.blankCheck(freqDurationVal, this.commonserveice.langReplace(this.messaageslist.freqDuration), 'freqDuration')) { }
        else {
            let messageParams = {
                "MessageConfigId": this.sMintMessageConfigId,
                "processId": this.sMintProcessId,
                "MessageConfigType": this.sMintMessageConfigType,
                "startDate": startDateVal,
                "endDate": this.endDateTime,
                "frequencyType": freqTypeVal,
                "frequencyDuration": this.freqDuration,
                "schedularUrl": this.schedularUrl,
                "SchedularStatus": this.schedularStatus
            };
            this.loading = true;
            this.commonserveice.reminderSchedular(messageParams).subscribe({
                next: (response) => {
                    let respData = response.RESPONSE_DATA;
                    let respToken = response.RESPONSE_TOKEN;
                    let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                    if (respToken == verifyToken) {
                        let res = Buffer.from(respData, 'base64');
                        res = JSON.parse(res.toString());
                        if (res.status == 200) {
                            this.loading = false;
                            this.isFlag = true;
                            Swal.fire({
                                text: this.commonserveice.langReplace("Your Schedular Created Successfully") + ' !',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: this.commonserveice.langReplace('Ok')
                            }).then((result) => {
                                this.modalService.dismissAll();
                                this.viewItemsReminder('', '', '', '', 2);
                                this.resetSchedular();
                            });
                        }
                        else if (res.status == 417) {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                        }
                        else {
                            this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                        }
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                },
                error: (msg) => {
                    this.commonserveice.directlogoutlib();
                }
            });
        }
    }
    //\\ ======================== // Create Scheduler // ======================== //\\
    //\\ ======================== // Executed Scheduler // ======================== //\\
    executeSchedular(intMessageConfigId, intProcessId) {
        let messageParams = {
            "MessageConfigId": intMessageConfigId,
            "processId": intProcessId,
        };
        this.commonserveice.msgexecuteSchedular(messageParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.loading = false;
                        this.isFlag = true;
                        Swal.fire({
                            icon: 'success',
                            text: this.commonserveice.langReplace("Your Scheduler Execution Started") + ' !',
                        });
                        this.viewItemsReminder('', '', '', '', 2);
                    }
                    else if (res.status == 417) {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Executed Scheduler // ======================== //\\
    //\\ ======================== // Stop Scheduler // ======================== //\\
    stopSchedular(intMessageConfigId, intProcessId) {
        let messageParams = {
            "MessageConfigId": intMessageConfigId,
            "processId": intProcessId,
        };
        this.commonserveice.msgstopSchedular(messageParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.loading = false;
                        this.isFlag = true;
                        Swal.fire({
                            icon: 'success',
                            text: this.commonserveice.langReplace("Your Scheduler Is Stopped") + ' !',
                        });
                        this.viewItemsReminder('', '', '', '', 2);
                    }
                    else if (res.status == 417) {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                    else {
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                }
                else {
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Stop Scheduler // ======================== //\\
    resetSchedular() {
        this.startDateTime = '';
        this.endDateTime = '';
        this.freqType = 0;
        this.freqDuration = '';
        this.schedularUrl = '';
    }
    //\\ ======================== // Show Preview // ======================== //\\
    showPreview(intMessageConfigId, intProcessId) {
        let messageParams = {
            "intMessageConfigId": intMessageConfigId,
            "intMessageConfigType": "",
            "formId": intProcessId,
            "formName": "",
            "messageType": "2"
        };
        // console.log(messageParams)
        this.loading = true;
        this.commonserveice.viewMessage(messageParams).subscribe({
            next: (response) => {
                let respData = response.RESPONSE_DATA;
                let respToken = response.RESPONSE_TOKEN;
                let verifyToken = CryptoJS.HmacSHA256(respData, this.varlist.apiHashingKey).toString();
                if (respToken == verifyToken) {
                    let res = Buffer.from(respData, 'base64');
                    res = JSON.parse(res.toString());
                    if (res.status == 200) {
                        this.excuteList = res.result;
                        //console.log(this.excuteList)
                        this.isFlag = true;
                        this.loading = false;
                    }
                    else if (res.status == 417) {
                        this.isFlag = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.somethingWrong));
                    }
                    else {
                        this.isFlag = false;
                        this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                    }
                }
                else {
                    this.isFlag = false;
                    this.commonserveice.swalfire('error', this.commonserveice.langReplace(this.varlist.invalidResponse));
                }
            },
            error: (msg) => {
                this.commonserveice.directlogoutlib();
            }
        });
    }
    //\\ ======================== // Show Preview // ======================== //\\
    //\\ ======================== // Modal Open // ======================== //\\ 
    open(content) {
        this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        }, (reason) => { });
    }
    //\\ ======================== // Modal Open // ======================== //\\ 
    closeModal() {
        this.modalService.dismissAll();
        this.resetSchedular();
    }
    //\\ ======================== // Modal Close // ======================== //\\
    htmldecode(data) {
        let doc = new DOMParser().parseFromString(data, "text/html");
        return doc.documentElement.textContent;
    }
}
ViewmsgreminderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewmsgreminderComponent, deps: [{ token: i1.Router }, { token: i2.HttpClient }, { token: MsgengineLibService }, { token: VarlistService }, { token: i5.NgbModal }, { token: ValidatorchecklistService }, { token: EncrypyDecrpyService }], target: i0.ɵɵFactoryTarget.Component });
ViewmsgreminderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: ViewmsgreminderComponent, selector: "lib-viewmsgreminder", viewQueries: [{ propertyName: "createreminderModal", first: true, predicate: ["createreminderModal"], descendants: true }], ngImport: i0, template: "<!--===Page Title===-->\n<div class=\"page-title\">\n \n    <h4>{{title | translate}}</h4>\n  </div>\n  <!--===Page Title===-->\n  \n  <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n      <div class=\"controls-section-header\">\n       \n\n        <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n    \n        </ul>\n        <div class=\"indicatorslist\">\n\n            <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\"  [sendIds]=\"letterIdArray\"\n            [funType]=\"sevName\" [pubUnpubStatus]=\"pubUnpStatus\"  (callfunction)=\"viewItemsReminder('','','','',2)\"\n            (callfunction2)='selectAll($event)'></lib-libutils>\n\n   \n         \n        </div>\n\n\n      </div>\n      <div class=\"card-body\">\n  \n  \n        <div class=\"controls-section\">\n          <!-- Search Panel -->\n          <div class=\"search-container active\" id=\"search-container\">\n  \n            <div class=\"search-sec\">\n  \n              <div class=\"row\">\n  \n                <div class=\"col-12 col-md-3 col-lg-3\" *ngIf=\"formenable\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"selFormName\" placeholder=\"Select Form Name\">\n                  </div>\n                </div>\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <select class=\"form-select docSizeType\" [(ngModel)]=\"txtMessageConfigType\">\n                      <option value=\"0\" disabled selected>{{\"Select Message config Type\" | translate}}</option>\n                      <option value=1>Mail</option>\n                      <option value=2>SMS</option>\n                      <option value=3>Whatsapp</option>\n                    </select>\n                  </div>\n                </div>\n  \n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <button class=\"btn btn-primary\" (click)=\"viewSearchList()\">{{\"Search\" | translate}} </button>\n                    <button class=\"btn btn-danger ml-1\" (click)=\"viewItemsReminder('','','','',2)\">\n                      {{\"Reset\" | translate}}</button>\n                  </div>\n                </div>\n              </div>\n  \n  \n            </div>\n  \n  \n          </div>\n          <!-- Search Panel -->\n          <div *ngIf=\"messageList?.length > 0; else norecord\">\n  \n            <div class=\"d-flex justify-content-between mb-3\">\n              <div>\n                <ul class=\"legends\">\n                  <li><span class=\"bg-success\"></span> {{\"Publish\" | translate}}</li>\n                  <li><span class=\"bg-danger\"></span>{{\"Unpublish\" | translate}} </li>\n                </ul>\n              </div>\n              <div>\n                {{\"Per Page\" | translate}} :\n                <select (change)=\"onTableSizeChange($event)\">\n                  <option *ngFor=\"let size of pageSizes\" [ngValue]=\"size\">\n                    {{ size }}\n                  </option>\n                </select>\n              </div>\n            </div>\n            <div class=\"table-responsive print-section\" id=\"print-section\">\n              <table data-toggle=\"table\" class=\"table table-bordered valign-middle\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\" style=\"width:40px\" class=\"noPrint\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input checkall\" type=\"checkbox\" (change)=\"selectAll($event)\" id=\"checkall\"\n                          name=\"checkall\" value=\"checkall\">\n  \n                      </div>\n                    </th>\n                    <th scope=\"col\" style=\"width:50px\">{{\"Sl No\" | translate}}</th>\n                    <th scope=\"col\" *ngIf=\"formenable\">{{\"Form Name\" | translate}}</th>\n                    <th scope=\"col\">{{\"Configuration Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Message Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Created On\" | translate}}</th>\n                    <th scope=\"col\">{{\"Last Execution Date\" | translate}}</th>\n                    <th scope=\"col\" [width]=\"150\">{{\"Set Reminder\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\">{{\"Preview\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:80px\">{{\"Action\" | translate}}</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let messages of messageList | paginate\n                          : {\n                              itemsPerPage: tableSize,\n                              currentPage: page,\n                              totalItems: count\n                            };\n                      let i = index\">\n                    <td class=\"noPrint border-left-2\"\n                      [ngClass]=\"{'border-left-danger': messages.tinPublishStatus === 0 , 'border-left-success': messages.tinPublishStatus === 1 }\">\n                      <div>\n                        <input class=\"form-check-input rowCheck\" [attr.pubstatus]=\"messages.tinPublishStatus\"\n                          type=\"checkbox\"\n                          (change)=\"onChange(messages.intMessageConfigId, $event,messages.tinPublishStatus)\"\n                          name=\"{{messages.intMessageConfigId}}\" [id]=\"messages.intMessageConfigId\"\n                          [value]=\"messages.intMessageConfigId\">\n                      </div>\n                    </td>\n\n\n                    \n                    <td>{{i+1+indexNumber}}</td>\n                    <td *ngIf=\"formenable\"><a type=\"button\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{messages.vchProcessName}}</a>\n                    </td>\n                    <td>\n                      <a type=\"button\" *ngIf=\"!formenable\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}\n                      </a>\n                      <span *ngIf=\"formenable\">\n                      {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}</span></td>\n                    <td>{{messages.intmessageType == 1 ? 'Messaging': 'Reminder'}}</td>\n                    <td>{{messages.dtmCreatedOn}}</td>\n                    <td>{{(messages.schedularStatus == 1) ? messages.stopExecutionDate :'--'}}</td>\n                    <!-- <td>{{messages.vchLanguage}}</td> -->\n                    <td>\n                      <a type=\"button\" class=\"btn btn-primary btn-sm text-white width-100\" \n                        *ngIf=\"messages.schedularStatus == 0\" (click)=\"createreminder(messages.intProcessId,messages.intMessageConfigId,messages.intMessageConfigType)\">\n                        {{\"Create\" | translate}} </a>\n                      <span *ngIf=\"messages.schedularStatus == 1\">\n                        <a type=\"button\" class=\"btn btn-success btn-sm text-white width-100\"\n                          (click)=\"executeSchedular(messages.intMessageConfigId,messages.intProcessId)\">{{\"EXECUTE\" | translate}}</a>\n                      </span>\n                      <span *ngIf=\"messages.schedularStatus == 2\">\n                        <a type=\"button\" class=\"btn btn-danger btn-sm text-white width-100\"\n                          (click)=\"stopSchedular(messages.intMessageConfigId,messages.intProcessId)\">{{\"STOP\" | translate}}</a>\n                      </span>\n                    </td>\n                    <td class=\"noPrint\">\n                      <div *ngIf=\"messages.schedularStatus == 1;else nodt \">\n                        <a href=\"javascriprt:void(0)\" class=\"text-info\" data-bs-toggle=\"modal\"\n                          [attr.data-bs-target]=\"'#excuteModal'+i\">{{\"Preview\" | translate}}</a>\n                      </div>\n                      <ng-template #nodt>-</ng-template>\n                    </td>\n                    <!--=========== Modal For Message Details ===================-->\n  \n                    <td class=\"noPrint\"><a class=\"text-primary\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Edit\"\n                        (click)=\"editReminder(messages.intMessageConfigId+':'+messages.intProcessId+':'+messages.vchProcessName)\"><i\n                          class=\"icon-edit-solid\"></i></a>\n\n                          <div class=\"modal fade noPrint\" id=\"excuteModal{{i}}\" tabindex=\"-1\" aria-labelledby=\"excuteModalLabel\"\n                          aria-hidden=\"true\">\n                          <div class=\"modal-dialog modal-lg\">\n                            <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                <h5 class=\"modal-title mb-0\" id=\"excuteModalLabel\">{{\"Execute Details\" | translate}}\n                                </h5>\n                                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                              </div>\n                              <div class=\"modal-body\">\n                                <table class=\"table table-bordered\">\n                                  <tbody>\n                                    <tr>\n                                      <td class=\"w-25 fw-bold\">{{\"Scheduler URL\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.schedularUrl}}</td>\n      \n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Start Date and Time\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.dtmStartDate}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"End Date and Time\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.dtmEndDate}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Frequency Type\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.frequencyType == 1 ? 'Month': (messages.frequencyType == 2)\n                                        ?'Day': (messages.frequencyType == 3) ?'Hour' :'Second'}}</td>\n                                    </tr>\n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Frequency Duration\" | translate}}</td>\n                                      <td colspan=\"2\">{{messages.frequencyDuration}}</td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n      \n      \n                        <div class=\"modal fade noPrint\" id=\"previewModal{{i}}\" tabindex=\"-1\" aria-labelledby=\"previewModalLabel\"\n                          aria-hidden=\"true\">\n                          <div class=\"modal-dialog modal-lg\">\n                            <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                <h5 class=\"modal-title mb-0\" id=\"previewModalLabel\">{{\"Message Details\" | translate}}\n                                </h5>\n                                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                              </div>\n                              <div class=\"modal-body\">\n                                <table class=\"table table-bordered\">\n                                  <tbody>\n                                    <tr *ngIf=\"formenable\">\n                                      <td class=\"w-25 fw-bold\">{{\"Form Name\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchProcessName}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Message Subject\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSubject}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 2\">\n                                      <td class=\"w-25 fw-bold\">{{\"SMS TemplateId\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSmsTemplateId}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 1\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Audio\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <audio controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"audio/mp3\">\n                                          {{\"Your browser does not support the audio tag\"}}.\n                                        </audio>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 2\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Video\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <video width=\"320\" height=\"240\" controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"video/mp4\">\n                                          {{\"Your browser does not support the video tag\"}}.\n                                        </video>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 3\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Image\" | translate}} </td>\n                                      <td colspan=\"2\"><img src=\"{{messages.vchDocument}}\" style=\"max-width:100%\"\n                                          height=\"70px\"></td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Message Content\" | translate}} </td>\n                                      <td>\n                                        <div class=\"pdfContainer\" [innerHtml]=\"htmldecode(messages.vchMessageContent)\"  ></div>\n                                      </td>\n                                    </tr>\n      \n                                  </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        \n                        </td>\n\n\n           \n  \n  \n  \n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <lib-libpagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-libpagination>\n           \n          </div>\n          <ng-template #norecord>\n            <h6 class=\"no-content\">{{\"No Record Found\" | translate}} </h6>\n          </ng-template>\n        </div>\n  \n      </div>\n    </div>\n  </div>\n\n  <ng-template #createreminderModal id=\"createreminderModal\" class=\"noPrint\" let-modal>\n    <div class=\"modal-header\">\n      <h5 class=\"modal-title mb-0\" >\n        {{\"Reminder Scheduler\" | translate}}\n      </h5>\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        (click)=\"closeModal()\"\n        aria-label=\"Close\"\n      ></button>\n    </div>\n\n\n\n    <div class=\"modal-body\">\n \n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"> <span class=\"text-danger\">*</span>\n            {{\"Scheduler URL\" | translate}}</label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"text\" [(ngModel)]=\"schedularUrl\" id=\"schedularUrl\" class=\"form-control\" name=\"\"\n              placeholder=\"https://www.google.co.in/\">\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"> <span class=\"text-danger\">*</span>{{\"Start Date and Time\" | translate}} </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"datetime-local\" [(ngModel)]=\"startDateTime\"  id=\"startDateTime\"  class=\"form-control\" name=\"\">\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"><span class=\"text-danger\"> </span>{{\"End Date and Time\" | translate}} </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"datetime-local\" [(ngModel)]=\"endDateTime\"  id=\"endDateTime\"  class=\"form-control\" name=\"\">\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"><span class=\"text-danger\">*</span>{{\"Frequency Type\" | translate}} </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <select class=\"form-select docSizeType\" [(ngModel)]=\"freqType\"  id=\"freqType\" >\n              <option value=\"0\" disabled selected>{{\"Select\" | translate}}</option>\n              <option value=1>Month</option>\n              <option value=2>Day</option>\n              <option value=3>Hours</option>\n              <option value=4>Seconds</option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"><span class=\"text-danger\">*</span> {{\"Frequency Duration\" | translate}}</label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"number\" [(ngModel)]=\"freqDuration\"  id=\"freqDuration\"  class=\"form-control\" name=\"\"\n              placeholder=\"\">\n          </div>\n        </div>\n      </div>\n\n    \n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"> </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <button class=\"btn btn-primary\"\n          \n              (click)=\"createSchedular()\">{{\"Submit\" | translate}}</button>\n            <button class=\"btn btn-danger ml-1\"\n              (click)=\"resetSchedular()\">{{\"Reset\" | translate}}</button>\n          </div>\n        </div>\n      </div>\n       \n       \n    </div>\n  </ng-template>", styles: [""], dependencies: [{ kind: "directive", type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: LibtabsComponent, selector: "lib-libtabs", inputs: ["tabMessage", "activeid"] }, { kind: "component", type: LibutilsComponent, selector: "lib-libutils", inputs: ["childMessage", "sendIds", "funType", "pubUnpubStatus", "reloadUrl"], outputs: ["callfunction", "callfunction3"] }, { kind: "component", type: LibpaginationComponent, selector: "lib-libpagination", inputs: ["page", "count", "tableSize"], outputs: ["callfunction"] }, { kind: "pipe", type: i12.PaginatePipe, name: "paginate" }, { kind: "pipe", type: TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewmsgreminderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-viewmsgreminder', template: "<!--===Page Title===-->\n<div class=\"page-title\">\n \n    <h4>{{title | translate}}</h4>\n  </div>\n  <!--===Page Title===-->\n  \n  <div class=\"page-controls-section\" id=\"page-content\">\n    <div class=\"card\">\n      <div class=\"controls-section-header\">\n       \n\n        <ul class=\"nav nav-tabs nav-fill\" role=\"tablist\">\n            <lib-libtabs *ngFor=\"let tablist of tablist\" [tabMessage]=\"tablist\"></lib-libtabs>\n    \n        </ul>\n        <div class=\"indicatorslist\">\n\n            <lib-libutils *ngFor=\"let utillist of utillist\" [childMessage]=\"utillist\"  [sendIds]=\"letterIdArray\"\n            [funType]=\"sevName\" [pubUnpubStatus]=\"pubUnpStatus\"  (callfunction)=\"viewItemsReminder('','','','',2)\"\n            (callfunction2)='selectAll($event)'></lib-libutils>\n\n   \n         \n        </div>\n\n\n      </div>\n      <div class=\"card-body\">\n  \n  \n        <div class=\"controls-section\">\n          <!-- Search Panel -->\n          <div class=\"search-container active\" id=\"search-container\">\n  \n            <div class=\"search-sec\">\n  \n              <div class=\"row\">\n  \n                <div class=\"col-12 col-md-3 col-lg-3\" *ngIf=\"formenable\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"selFormName\" placeholder=\"Select Form Name\">\n                  </div>\n                </div>\n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <select class=\"form-select docSizeType\" [(ngModel)]=\"txtMessageConfigType\">\n                      <option value=\"0\" disabled selected>{{\"Select Message config Type\" | translate}}</option>\n                      <option value=1>Mail</option>\n                      <option value=2>SMS</option>\n                      <option value=3>Whatsapp</option>\n                    </select>\n                  </div>\n                </div>\n  \n  \n                <div class=\"col-12 col-md-3 col-lg-3\">\n                  <div class=\"form-group\">\n                    <button class=\"btn btn-primary\" (click)=\"viewSearchList()\">{{\"Search\" | translate}} </button>\n                    <button class=\"btn btn-danger ml-1\" (click)=\"viewItemsReminder('','','','',2)\">\n                      {{\"Reset\" | translate}}</button>\n                  </div>\n                </div>\n              </div>\n  \n  \n            </div>\n  \n  \n          </div>\n          <!-- Search Panel -->\n          <div *ngIf=\"messageList?.length > 0; else norecord\">\n  \n            <div class=\"d-flex justify-content-between mb-3\">\n              <div>\n                <ul class=\"legends\">\n                  <li><span class=\"bg-success\"></span> {{\"Publish\" | translate}}</li>\n                  <li><span class=\"bg-danger\"></span>{{\"Unpublish\" | translate}} </li>\n                </ul>\n              </div>\n              <div>\n                {{\"Per Page\" | translate}} :\n                <select (change)=\"onTableSizeChange($event)\">\n                  <option *ngFor=\"let size of pageSizes\" [ngValue]=\"size\">\n                    {{ size }}\n                  </option>\n                </select>\n              </div>\n            </div>\n            <div class=\"table-responsive print-section\" id=\"print-section\">\n              <table data-toggle=\"table\" class=\"table table-bordered valign-middle\">\n                <thead>\n                  <tr>\n                    <th scope=\"col\" style=\"width:40px\" class=\"noPrint\">\n                      <div class=\"form-check\">\n                        <input class=\"form-check-input checkall\" type=\"checkbox\" (change)=\"selectAll($event)\" id=\"checkall\"\n                          name=\"checkall\" value=\"checkall\">\n  \n                      </div>\n                    </th>\n                    <th scope=\"col\" style=\"width:50px\">{{\"Sl No\" | translate}}</th>\n                    <th scope=\"col\" *ngIf=\"formenable\">{{\"Form Name\" | translate}}</th>\n                    <th scope=\"col\">{{\"Configuration Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Message Type\" | translate}}</th>\n                    <th scope=\"col\">{{\"Created On\" | translate}}</th>\n                    <th scope=\"col\">{{\"Last Execution Date\" | translate}}</th>\n                    <th scope=\"col\" [width]=\"150\">{{\"Set Reminder\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\">{{\"Preview\" | translate}}</th>\n                    <th scope=\"col\" class=\"noPrint\" style=\"width:80px\">{{\"Action\" | translate}}</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let messages of messageList | paginate\n                          : {\n                              itemsPerPage: tableSize,\n                              currentPage: page,\n                              totalItems: count\n                            };\n                      let i = index\">\n                    <td class=\"noPrint border-left-2\"\n                      [ngClass]=\"{'border-left-danger': messages.tinPublishStatus === 0 , 'border-left-success': messages.tinPublishStatus === 1 }\">\n                      <div>\n                        <input class=\"form-check-input rowCheck\" [attr.pubstatus]=\"messages.tinPublishStatus\"\n                          type=\"checkbox\"\n                          (change)=\"onChange(messages.intMessageConfigId, $event,messages.tinPublishStatus)\"\n                          name=\"{{messages.intMessageConfigId}}\" [id]=\"messages.intMessageConfigId\"\n                          [value]=\"messages.intMessageConfigId\">\n                      </div>\n                    </td>\n\n\n                    \n                    <td>{{i+1+indexNumber}}</td>\n                    <td *ngIf=\"formenable\"><a type=\"button\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{messages.vchProcessName}}</a>\n                    </td>\n                    <td>\n                      <a type=\"button\" *ngIf=\"!formenable\" class=\"text-primary\" data-bs-toggle=\"modal\"\n                        [attr.data-bs-target]=\"'#previewModal'+i\">\n                        {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}\n                      </a>\n                      <span *ngIf=\"formenable\">\n                      {{(messages.intMessageConfigType == 1) ? 'Mail':(messages.intMessageConfigType == 2) ?'SMS':\n                      'Whatsapp'}}</span></td>\n                    <td>{{messages.intmessageType == 1 ? 'Messaging': 'Reminder'}}</td>\n                    <td>{{messages.dtmCreatedOn}}</td>\n                    <td>{{(messages.schedularStatus == 1) ? messages.stopExecutionDate :'--'}}</td>\n                    <!-- <td>{{messages.vchLanguage}}</td> -->\n                    <td>\n                      <a type=\"button\" class=\"btn btn-primary btn-sm text-white width-100\" \n                        *ngIf=\"messages.schedularStatus == 0\" (click)=\"createreminder(messages.intProcessId,messages.intMessageConfigId,messages.intMessageConfigType)\">\n                        {{\"Create\" | translate}} </a>\n                      <span *ngIf=\"messages.schedularStatus == 1\">\n                        <a type=\"button\" class=\"btn btn-success btn-sm text-white width-100\"\n                          (click)=\"executeSchedular(messages.intMessageConfigId,messages.intProcessId)\">{{\"EXECUTE\" | translate}}</a>\n                      </span>\n                      <span *ngIf=\"messages.schedularStatus == 2\">\n                        <a type=\"button\" class=\"btn btn-danger btn-sm text-white width-100\"\n                          (click)=\"stopSchedular(messages.intMessageConfigId,messages.intProcessId)\">{{\"STOP\" | translate}}</a>\n                      </span>\n                    </td>\n                    <td class=\"noPrint\">\n                      <div *ngIf=\"messages.schedularStatus == 1;else nodt \">\n                        <a href=\"javascriprt:void(0)\" class=\"text-info\" data-bs-toggle=\"modal\"\n                          [attr.data-bs-target]=\"'#excuteModal'+i\">{{\"Preview\" | translate}}</a>\n                      </div>\n                      <ng-template #nodt>-</ng-template>\n                    </td>\n                    <!--=========== Modal For Message Details ===================-->\n  \n                    <td class=\"noPrint\"><a class=\"text-primary\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Edit\"\n                        (click)=\"editReminder(messages.intMessageConfigId+':'+messages.intProcessId+':'+messages.vchProcessName)\"><i\n                          class=\"icon-edit-solid\"></i></a>\n\n                          <div class=\"modal fade noPrint\" id=\"excuteModal{{i}}\" tabindex=\"-1\" aria-labelledby=\"excuteModalLabel\"\n                          aria-hidden=\"true\">\n                          <div class=\"modal-dialog modal-lg\">\n                            <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                <h5 class=\"modal-title mb-0\" id=\"excuteModalLabel\">{{\"Execute Details\" | translate}}\n                                </h5>\n                                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                              </div>\n                              <div class=\"modal-body\">\n                                <table class=\"table table-bordered\">\n                                  <tbody>\n                                    <tr>\n                                      <td class=\"w-25 fw-bold\">{{\"Scheduler URL\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.schedularUrl}}</td>\n      \n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Start Date and Time\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.dtmStartDate}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"End Date and Time\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.dtmEndDate}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Frequency Type\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.frequencyType == 1 ? 'Month': (messages.frequencyType == 2)\n                                        ?'Day': (messages.frequencyType == 3) ?'Hour' :'Second'}}</td>\n                                    </tr>\n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Frequency Duration\" | translate}}</td>\n                                      <td colspan=\"2\">{{messages.frequencyDuration}}</td>\n                                    </tr>\n                                  </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n      \n      \n                        <div class=\"modal fade noPrint\" id=\"previewModal{{i}}\" tabindex=\"-1\" aria-labelledby=\"previewModalLabel\"\n                          aria-hidden=\"true\">\n                          <div class=\"modal-dialog modal-lg\">\n                            <div class=\"modal-content\">\n                              <div class=\"modal-header\">\n                                <h5 class=\"modal-title mb-0\" id=\"previewModalLabel\">{{\"Message Details\" | translate}}\n                                </h5>\n                                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                              </div>\n                              <div class=\"modal-body\">\n                                <table class=\"table table-bordered\">\n                                  <tbody>\n                                    <tr *ngIf=\"formenable\">\n                                      <td class=\"w-25 fw-bold\">{{\"Form Name\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchProcessName}}</td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Message Subject\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSubject}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 2\">\n                                      <td class=\"w-25 fw-bold\">{{\"SMS TemplateId\" | translate}} </td>\n                                      <td colspan=\"2\">{{messages.vchSmsTemplateId}}</td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 1\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Audio\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <audio controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"audio/mp3\">\n                                          {{\"Your browser does not support the audio tag\"}}.\n                                        </audio>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 2\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Video\" | translate}} </td>\n                                      <td colspan=\"2\">\n                                        <video width=\"320\" height=\"240\" controls>\n                                          <source src=\"{{messages.vchDocument}}\" type=\"video/mp4\">\n                                          {{\"Your browser does not support the video tag\"}}.\n                                        </video>\n                                      </td>\n                                    </tr>\n      \n                                    <tr *ngIf=\"messages.intMessageConfigType == 3 && messages.intDocumentType == 3\">\n                                      <td class=\"w-25 fw-bold\"> {{\"Image\" | translate}} </td>\n                                      <td colspan=\"2\"><img src=\"{{messages.vchDocument}}\" style=\"max-width:100%\"\n                                          height=\"70px\"></td>\n                                    </tr>\n      \n                                    <tr>\n                                      <td class=\"fw-bold\">{{\"Message Content\" | translate}} </td>\n                                      <td>\n                                        <div class=\"pdfContainer\" [innerHtml]=\"htmldecode(messages.vchMessageContent)\"  ></div>\n                                      </td>\n                                    </tr>\n      \n                                  </tbody>\n                                </table>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        \n                        </td>\n\n\n           \n  \n  \n  \n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <lib-libpagination [page]=\"page\" [count]=\"count\" [tableSize]=\"tableSize\" (callfunction)=\"onTableDataChange($event)\"></lib-libpagination>\n           \n          </div>\n          <ng-template #norecord>\n            <h6 class=\"no-content\">{{\"No Record Found\" | translate}} </h6>\n          </ng-template>\n        </div>\n  \n      </div>\n    </div>\n  </div>\n\n  <ng-template #createreminderModal id=\"createreminderModal\" class=\"noPrint\" let-modal>\n    <div class=\"modal-header\">\n      <h5 class=\"modal-title mb-0\" >\n        {{\"Reminder Scheduler\" | translate}}\n      </h5>\n      <button\n        type=\"button\"\n        class=\"btn-close\"\n        (click)=\"closeModal()\"\n        aria-label=\"Close\"\n      ></button>\n    </div>\n\n\n\n    <div class=\"modal-body\">\n \n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"> <span class=\"text-danger\">*</span>\n            {{\"Scheduler URL\" | translate}}</label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"text\" [(ngModel)]=\"schedularUrl\" id=\"schedularUrl\" class=\"form-control\" name=\"\"\n              placeholder=\"https://www.google.co.in/\">\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"> <span class=\"text-danger\">*</span>{{\"Start Date and Time\" | translate}} </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"datetime-local\" [(ngModel)]=\"startDateTime\"  id=\"startDateTime\"  class=\"form-control\" name=\"\">\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"><span class=\"text-danger\"> </span>{{\"End Date and Time\" | translate}} </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"datetime-local\" [(ngModel)]=\"endDateTime\"  id=\"endDateTime\"  class=\"form-control\" name=\"\">\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"><span class=\"text-danger\">*</span>{{\"Frequency Type\" | translate}} </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <select class=\"form-select docSizeType\" [(ngModel)]=\"freqType\"  id=\"freqType\" >\n              <option value=\"0\" disabled selected>{{\"Select\" | translate}}</option>\n              <option value=1>Month</option>\n              <option value=2>Day</option>\n              <option value=3>Hours</option>\n              <option value=4>Seconds</option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"><span class=\"text-danger\">*</span> {{\"Frequency Duration\" | translate}}</label>\n          <div class=\"col-md-8 col-lg-6\">\n            <input type=\"number\" [(ngModel)]=\"freqDuration\"  id=\"freqDuration\"  class=\"form-control\" name=\"\"\n              placeholder=\"\">\n          </div>\n        </div>\n      </div>\n\n    \n      <div class=\"form-group\">\n        <div class=\"row\">\n          <label class=\"col-md-4 col-lg-3 text-dark\"> </label>\n          <div class=\"col-md-8 col-lg-6\">\n            <button class=\"btn btn-primary\"\n          \n              (click)=\"createSchedular()\">{{\"Submit\" | translate}}</button>\n            <button class=\"btn btn-danger ml-1\"\n              (click)=\"resetSchedular()\">{{\"Reset\" | translate}}</button>\n          </div>\n        </div>\n      </div>\n       \n       \n    </div>\n  </ng-template>" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.HttpClient }, { type: MsgengineLibService }, { type: VarlistService }, { type: i5.NgbModal }, { type: ValidatorchecklistService }, { type: EncrypyDecrpyService }]; }, propDecorators: { createreminderModal: [{
                type: ViewChild,
                args: ['createreminderModal']
            }] } });

// import { AddgetwayconfigComponent } from './addgetwayconfig/addgetwayconfig.component';
// import { ViewgetwayconfigComponent } from './viewgetwayconfig/viewgetwayconfig.component';
class MsgengineLibModule {
}
MsgengineLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MsgengineLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, declarations: [MsgengineLibComponent,
        AddgetwayComponent,
        LibtabsComponent,
        LibutilsComponent,
        LibpaginationComponent,
        ViewgetwayComponent,
        AddmsgengineComponent,
        ViewmsgengineComponent,
        ViewmsgreminderComponent,
        TranslatePipe], imports: [CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        NgbModule,
        CKEditorModule,
        NgxPaginationModule,
        NgxDropzoneModule,
        RouterModule], exports: [MsgengineLibComponent,
        AddgetwayComponent,
        LibtabsComponent,
        ViewgetwayComponent,
        AddmsgengineComponent,
        ViewmsgengineComponent,
        ViewmsgreminderComponent] });
MsgengineLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, imports: [CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        NgbModule,
        CKEditorModule,
        NgxPaginationModule,
        NgxDropzoneModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MsgengineLibComponent,
                        AddgetwayComponent,
                        LibtabsComponent,
                        LibutilsComponent,
                        LibpaginationComponent,
                        ViewgetwayComponent,
                        AddmsgengineComponent,
                        ViewmsgengineComponent,
                        ViewmsgreminderComponent,
                        TranslatePipe,
                    ],
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgxDropzoneModule,
                        NgbModule,
                        CKEditorModule,
                        NgxPaginationModule,
                        NgxDropzoneModule,
                        RouterModule
                    ],
                    exports: [
                        MsgengineLibComponent,
                        AddgetwayComponent,
                        LibtabsComponent,
                        ViewgetwayComponent,
                        AddmsgengineComponent,
                        ViewmsgengineComponent,
                        ViewmsgreminderComponent,
                    ]
                }]
        }] });

/*
 * Public API Surface of msgengine-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddgetwayComponent, AddmsgengineComponent, EncrypyDecrpyService, LibtabsComponent, LibutilsComponent, MsgengineLibComponent, MsgengineLibModule, MsgengineLibService, TranslatePipe, ValidatorchecklistService, VarlistService, ViewgetwayComponent, ViewmsgengineComponent, ViewmsgreminderComponent };
//# sourceMappingURL=msgengine-lib.mjs.map
