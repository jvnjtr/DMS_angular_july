import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import * as i0 from "@angular/core";
import * as i1 from "./msgengine-lib.service";
export class ValidatorchecklistService {
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
ValidatorchecklistService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ValidatorchecklistService, deps: [{ token: i1.MsgengineLibService }], target: i0.ɵɵFactoryTarget.Injectable });
ValidatorchecklistService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ValidatorchecklistService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ValidatorchecklistService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.MsgengineLibService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbmNoZWNrbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL3ZhbGlkYXRpb25jaGVja2xpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQzs7O0FBUy9CLE1BQU0sT0FBTyx5QkFBeUI7SUFFcEMsWUFBb0IsY0FBa0M7UUFBbEMsbUJBQWMsR0FBZCxjQUFjLENBQW9CO0lBQUssQ0FBQztJQUc1RCxVQUFVLENBQUMsTUFBVyxFQUFFLEdBQVEsRUFBRSxRQUFhLEVBQUU7UUFDL0MsSUFBSSxNQUFNLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxHQUFHO2FBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDTixJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7b0JBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDZCxNQUFNLE9BQU8sR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNoQixPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbEUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNUO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lB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QUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDL0IsQ0FBQTtZQUVELG9CQUFvQjtZQUNwQixNQUFNLENBQUMsR0FBRztnQkFDUixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVB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QUNwRSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFJO0lBQ0osc0RBQXNEO0lBQ3RELDBCQUEwQjtJQUMxQixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0IsNkZBQTZGO0lBQzdGLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLElBQUk7SUFJSixvQkFBb0IsQ0FBQyxHQUFPO1FBQzFCLE1BQU0sWUFBWSxHQUFHLHlDQUF5QyxDQUFDO1FBRS9ELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDMUI7WUFFRSxPQUFPLEtBQUssQ0FBQztTQUNkO2FBRUQ7WUFFRSxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUgsa0NBQWtDO0lBQ2xDLENBQUM7O3VIQXB6RE0seUJBQXlCOzJIQUF6Qix5QkFBeUIsY0FGeEIsTUFBTTs0RkFFUCx5QkFBeUI7a0JBSHJDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XHJcbmltcG9ydCB7IE1zZ2VuZ2luZUxpYlNlcnZpY2UgfSBmcm9tICcuL21zZ2VuZ2luZS1saWIuc2VydmljZSc7XHJcblxyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JjaGVja2xpc3RTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoIHB1YmxpYyBjb21tb25zZXJ2ZWljZTpNc2dlbmdpbmVMaWJTZXJ2aWNlLCkgeyB9XHJcblxyXG4gIFxyXG4gIGJsYW5rQ2hlY2soZWxtVmFsOiBhbnksIG1zZzogYW55LCBlbG1JZDogYW55ID0gXCJcIikge1xyXG4gICAgaWYgKGVsbVZhbCA9PSAnJyB8fCB0eXBlb2YgKGVsbVZhbCkgPT0gdW5kZWZpbmVkIHx8IGVsbVZhbCA9PSBudWxsKSB7XHJcbiAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICB0ZXh0OiBtc2dcclxuICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGVsbUlkICE9IFwiXCIpIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcclxuICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBibGFua0ltZ0NoZWNrKGVsbVZhbDphbnksIG1zZzphbnkpXHJcbiAge1xyXG4gICAgICBpZihlbG1WYWwgPT0gJycgfHwgdHlwZW9mIChlbG1WYWwpID09IHVuZGVmaW5lZCB8fCBlbG1WYWwgPT0gbnVsbClcclxuICAgICAge1xyXG4gICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnUGxlYXNlJykgK21zZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGJsYW5rQ2hlY2tSZG8oZWxtTm06YW55LCBtc2c6YW55LGVsbUlkOmFueT1cIlwiKVxyXG4gIHtcclxuICAgIFxyXG4gICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoZWxtTm0pO1xyXG4gICAgICBsZXQgY2hlY2tlZEN0cjpudW1iZXIgPSAwO1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWxlLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICBpZigoZWxlW2ldIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgY2hlY2tlZEN0cisrO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGlmKGNoZWNrZWRDdHI9PTApXHJcbiAgICAgIHtcclxuICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1NlbGVjdCcpK1wiIFwiK21zZ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICBpZihlbG1JZCE9XCJcIilcclxuXHJcbiAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsbUlkKSkuZm9jdXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCkpLnNjcm9sbFRvKFxyXG4gICAgICAgICAgICAgICAge3RvcDogKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsbUlkKSkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC1cclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLTUwfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcblxyXG4gIGJsYW5rQ2hlY2tSZG9EeW5hbWljKGNsc05hbWU6YW55LCBtc2c6YW55LGVsbUlkOmFueT1cIlwiKVxyXG4gIFxyXG4ge1xyXG5cclxuXHJcbiAgbGV0IGNsYXNzTmFtZSA9ICAnY2xzXycrY2xzTmFtZTtcclxuXHJcbiAgbGV0IGVsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcclxuXHJcbiAgbGV0IGNoZWNrZWRDdHI6bnVtYmVyID0gMDtcclxuXHJcbiAgZm9yKGxldCBpID0gMDsgaSA8IGVsZS5sZW5ndGg7IGkrKykge1xyXG5cclxuXHJcblxyXG4gICAgIGlmKChlbGVbaV0gYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZClcclxuXHJcbiAgICAge1xyXG5cclxuICAgICBcclxuXHJcbiAgICAgIGNoZWNrZWRDdHIrKztcclxuXHJcbiAgICAgfVxyXG5cclxuXHJcblxyXG4gIH1cclxuXHJcbiAgaWYoY2hlY2tlZEN0cj09MClcclxuXHJcbiAge1xyXG5cclxuICAgIFN3YWwuZmlyZSh7XHJcblxyXG4gICAgICBpY29uOiAnZXJyb3InLFxyXG5cclxuICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnU2VsZWN0JykrXCIgXCIrbXNnXHJcblxyXG4gICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAvLyBjb25zb2xlLmxvZygpXHJcblxyXG4gICAgICBpZihlbGVbMF0hPXVuZGVmaW5lZCApXHJcblxyXG4gICAgICB7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZVswXS5pZCk/LmNsb3Nlc3QoJ2RpdicpKS5mb2N1cygpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZVswXS5pZCkpLnNjcm9sbEludG9WaWV3KCk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG5cclxufVxyXG5cclxuXHJcbiAgYmxhbmtDaGVja0Noa2JveER5bmFtaWMoY2xzTmFtZTphbnksIG1zZzphbnksZWxtSWQ6YW55PVwiXCIpXHJcbiAge1xyXG4gICAgLy8gYWxlcnQoXCJBcnBpdGFcIik7XHJcbiAgICAgIGxldCBjbGFzc05hbWUgPSAgJ2Nsc18nK2Nsc05hbWU7XHJcbiAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XHJcbiAgICAgIGxldCBjaGVja2VkQ3RyOm51bWJlciA9IDA7XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbGUubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgIGlmKChlbGVbaV0gYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZClcclxuICAgICAgICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgY2hlY2tlZEN0cisrO1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIGlmKGNoZWNrZWRDdHI9PTApXHJcbiAgICAgIHtcclxuICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgIHRleHQ6ICdTZWxlY3QgJyttc2dcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgaWYoZWxtSWQhPVwiXCIpXHJcblxyXG4gICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCkpLmZvY3VzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5zY3JvbGxUbyhcclxuICAgICAgICAgICAgICAgIHt0b3A6ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCkpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtXHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC01MH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHNlbGVjdERyb3Bkb3duKGVsbVZhbDphbnksIG1zZzphbnksZWxtSWQ6YW55PVwiXCIpXHJcbiAge1xyXG4gICAgICBpZihlbG1WYWwgPT0gMCB8fCBlbG1WYWwgPT0gJycgfHwgdHlwZW9mIChlbG1WYWwpID09IHVuZGVmaW5lZCB8fCBlbG1WYWwgPT0gbnVsbClcclxuICAgICAge1xyXG4gICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnU2VsZWN0JykrXCIgXCIrbXNnXHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgIGlmKGVsbUlkIT1cIlwiKVxyXG5cclxuICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XHJcbiAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgbWF4TGVuZ3RoKGVsbVZhbDphbnksZmxkTG5ndGg6YW55LCBtc2c6YW55LGVsbUlkOmFueT1cIlwiKVxyXG4gIHtcclxuICAgICAgaWYoZWxtVmFsLmxlbmd0aD4wICYmIGVsbVZhbC5sZW5ndGg+ZmxkTG5ndGgpXHJcbiAgICAgIHtcclxuICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgIHRleHQ6IG1zZysnIHNob3VsZCBub3QgbW9yZSB0aGFuICcgKyBmbGRMbmd0aCArICcgY2hhcmFjdGVyJ1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICBpZihlbG1JZCE9XCJcIilcclxuXHJcbiAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpO1xyXG4gICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcblxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBtaW5MZW5ndGgoZWxtVmFsOmFueSxmbGRMbmd0aDphbnksIG1zZzphbnksZWxtSWQ6YW55PVwiXCIpXHJcbiAge1xyXG4gICBcclxuICAgICAgaWYoZWxtVmFsLmxlbmd0aD4wICYmIGVsbVZhbC5sZW5ndGg8ZmxkTG5ndGgpXHJcbiAgICAgIHtcclxuICAgICAgICAvL2FsZXJ0KFwiaGlpXCIpO1xyXG4gICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgdGV4dDogbXNnKycgc2hvdWxkIG5vdCBiZSBsZXNzIHRoYW4nICsgZmxkTG5ndGggKyAnIGNoYXJhY3RlcidcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgaWYoZWxtSWQhPVwiXCIpXHJcblxyXG4gICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsbUlkKTtcclxuICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcblxyXG4gIHZhbGlkRW1haWwoZWxtVmFsOmFueSxlbG1JZDphbnk9XCJcIilcclxuICB7XHJcbiAgIFxyXG4gICAgICBsZXQgcGF0dGVybiA9IG5ldyBSZWdFeHAoL14oW2EtekEtWjAtOV8uKy1dKStcXEAoKFthLXpBLVowLTktXSkrXFwuKSsoW2EtekEtWjAtOV17Miw0fSkrJC8pO1xyXG4gICAgICBpZiAoZWxtVmFsICE9ICcnKVxyXG4gICAgICB7XHJcbiAgICBcclxuICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoZWxtVmFsKSA9PSB0cnVlKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBpZCdcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICBpZihlbG1JZCE9XCJcIilcclxuICAgIFxyXG4gICAgICAgICAgICAgIHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XHJcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgdmFsaWRNb2IoZWxtVmFsOmFueSxlbG1JZDphbnk9XCJcIilcclxuICB7XHJcbiAgICAgIGxldCBwYXR0ZXJuID0gbmV3IFJlZ0V4cCgvXls2LTldWzAtOV17OX0kLyk7XHJcbiAgICAgIGlmIChlbG1WYWwgIT0gJycpXHJcbiAgICAgIHtcclxuICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoZWxtVmFsKSA9PSB0cnVlKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBtb2JpbGUgbm8nXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgICAgaWYoZWxtSWQhPVwiXCIpXHJcbiAgICBcclxuICAgICAgICAgICAgICB7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpO1xyXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGJsb2Nrc3BlY2lhbGNoYXJfZmlyc3QoZXZ0OmFueSxibG9ja1N0YXR1czpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICBsZXQgdmFsaWRTdGF0dXMgPSB0cnVlO1xyXG4gICAgICBpZihibG9ja1N0YXR1cyA9PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHJldHVybiB2YWxpZFN0YXR1cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICBsZXQgdHh0VmFsdWU6c3RyaW5nID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgLy8gY29uc29sZS5sb2codHh0VmFsdWUpO1xyXG4gICAgICAvLyBpZih0eHRWYWx1ZS5sZW5ndGggPT0gMClcclxuICAgICAgLy8gICB7XHJcbiAgICAgIC8vICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAvLyAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAvLyAgICAgICB0ZXh0OiB0aGlzLmNvbUNvbmZpZ1NlcnYubGFuZ1JlcGxhY2UoJ1doaXRlIFNwYWNlIG5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZScpK1wiISEhXCJcclxuICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAvLyAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcclxuICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIHN3aXRjaCAodHh0VmFsdWUuY2hhckNvZGVBdCgwKSkge1xyXG4gICAgICAgIGNhc2UgNDQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJywgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIC8vIHZpZXdBbGVydChcIiwgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlISEhXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA0NzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnLyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNTg6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJzogTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDQ2OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICcuIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdTaW5nbGUgUXVvdGUgbm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgdGV4dDogJ1doaXRlIFNwYWNlIG5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA0MTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnKSBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNDU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgdGV4dDogJy0gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA5NTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXCJfIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDU5OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdcIjsgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMTI0OlxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXCJ8IE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDYzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdcIj8gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBjYXNlIDM0OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdcIiBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAzNTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnIyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMzY6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJyQgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJyYgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMTI2OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICd+IE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDk2OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdgIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDMzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICchIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICclIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDk0OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdeIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDQyOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICcqIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgOTI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1xcXFwgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNDM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJysgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA2MTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnPSBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDEyMzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAneyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAxMjU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ30gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgOTE6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1sgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgOTM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ10gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNjA6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJzwgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNjI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJz4gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA2NDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQCBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZhdWx0IDpcclxuICAgICAgICB2YWxpZFN0YXR1cyA9ICB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgaWYodmFsaWRTdGF0dXMgPT0gZmFsc2UpXHJcbiAgICAgIHtcclxuICAgICAgICAvLyAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZ0LnRhcmdldC5pZCkpLnZhbHVlPScnO1xyXG4gICAgICAgIGV2dC50YXJnZXQudmFsdWU9Jyc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHZhbGlkU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIGNoZWNrRm9yU3BlY2lhbENoYXJhY3RlckFsbFBvc3Rpb24oZXZ0OmFueSx0eXBlOmFueT0wKVxyXG4gICAge1xyXG4gICAgICBpZih0eXBlID09IHRydWUgfHxldnQudGFyZ2V0LnR5cGU9PVwiZW1haWxcIil7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIFxyXG4gICAgICBsZXQgdHh0VmFsdWU6c3RyaW5nID0gZXZ0LnRhcmdldC52YWx1ZTtcclxuICAgICAgbGV0IGxlbmd0aCA9IHR4dFZhbHVlLmxlbmd0aDtcclxuICAgICAgbGV0IHZhbGlkU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgXHJcbiAgICAgIGlmKHR4dFZhbHVlLmNoYXJDb2RlQXQoMCkgPT0gMzIpICB7XHJcbiAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICB0ZXh0OiAnV2hpdGUgc3BhY2UgJysnbm90IGFsbG93ZWQgaW4gZmlyc3QgcGxhY2UnKychISEnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZXZ0LnRhcmdldC52YWx1ZT0nJztcclxuICAgICAgfVxyXG5cclxuICAgICAgc3dpdGNoICh0eHRWYWx1ZS5jaGFyQ29kZUF0KGxlbmd0aC0xKSkge1xyXG4gICAgICAgIGNhc2UgNDQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJywgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICAvLyB2aWV3QWxlcnQoXCIsIE5vdCBhbGxvd2VkISEhXCIpO1xyXG5cclxuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA0NzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnLyAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDU4OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICc6ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNDY6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJy4gJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdTaW5nbGUgUXVvdGUgbm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYXNlIDMyOlxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAvLyAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgIC8vICAgICAgIHRleHQ6ICdXaGl0ZSBTcGFjZSBub3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBjYXNlIDQwOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA0MTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnKSAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDQ1OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICctICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDk1OlxyXG4gICAgICAgIHtpZih0eXBlICE9MSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICdcIl8gJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNTk6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1wiOyAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMTI0OlxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXCJ8ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA2MzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXCI/ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGNhc2UgMzQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1wiICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAzNTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnIyAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDM2OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICckICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAzODpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnJiAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMTI2OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICd+ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA5NjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnYCAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMzM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJyEgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICclICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA5NDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXiAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNDI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJyogJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgOTI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1xcXFwgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDQzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICcrICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDYxOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICc9ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDEyMzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAneyAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgMTI1OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICd9ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA5MTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnWyAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgOTM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ10gJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDYwOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICc8ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA2MjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnPiAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA2NDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQCAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgdmFsaWRTdGF0dXMgPSAgdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgIH1cclxuICAgIGlmKHZhbGlkU3RhdHVzID09IGZhbHNlKVxyXG4gICAgICB7XHJcbiAgICAgICAgLy8gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcclxuICAgICAgICBldnQudGFyZ2V0LnZhbHVlPScnO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB2YWxpZFN0YXR1cztcclxuXHJcblxyXG4gICAgICBpZihldnQudGFyZ2V0LnZhbHVlLmluZGV4T2YoJyAnKSA+IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1NwYWNlIG5vdCBhbGxvd2VkJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAvLyAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZ0LnRhcmdldC5pZCkpLnZhbHVlPScnO1xyXG4gICAgICAgICAgZXZ0LnRhcmdldC52YWx1ZT0nJztcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgfVxyXG4gICAgdGV4dGFyZWFTcGVjaWFsQ2hhcmFjdGVyQWxsUG9zdGlvbihldnQ6YW55LHR5cGU6YW55PTApXHJcbiAgICB7XHJcbiAgICAgIGxldCB0eHRWYWx1ZTpzdHJpbmcgPSBldnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgIC8vIGNvbnNvbGUubG9nKGV2dC50YXJnZXQudmFsdWUpO1xyXG4gICAgICBsZXQgbGVuZ3RoID0gdHh0VmFsdWUubGVuZ3RoO1xyXG4gICAgICBsZXQgdmFsaWRTdGF0dXMgPSB0cnVlO1xyXG5cclxuICAgICAgc3dpdGNoICh0eHRWYWx1ZS5jaGFyQ29kZUF0KGxlbmd0aC0xKSkge1xyXG4gICAgICAgIGNhc2UgNDc6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJy8gJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDU4OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICc6ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnU2luZ2xlIFF1b3RlIG5vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDk1OlxyXG4gICAgICAgIHtpZih0eXBlICE9MSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIHRleHQ6ICdcIl8gJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA1OTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXCI7ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDEyNDpcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1wifCAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAzNDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXCIgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgMzU6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJyMgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDM2OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICckICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICcmICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXNlIDEyNjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnfiAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA5NjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnYCAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAzMzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnISAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnJSAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA5NDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXiAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA0MjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnKiAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA5MjpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnXFxcXCAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA0MzpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnKyAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSA2MTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnPSAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FzZSAxMjM6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ3sgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDEyNTpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnfSAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgOTE6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ1sgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIDkzOlxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICddICcrJ05vdCBhbGxvd2VkJysnISEhJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSA2MDpcclxuICAgICAgICB7XHJcbiAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICB0ZXh0OiAnPCAnKydOb3QgYWxsb3dlZCcrJyEhISdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgNjI6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJz4gJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhc2UgNjQ6XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgdGV4dDogJ0AgJysnTm90IGFsbG93ZWQnKychISEnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHZhbGlkU3RhdHVzID0gIHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICB9XHJcbiAgICBpZih2YWxpZFN0YXR1cyA9PSBmYWxzZSlcclxuICAgICAge1xyXG4gICAgICAgIC8vICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChldnQudGFyZ2V0LmlkKSkudmFsdWU9Jyc7XHJcbiAgICAgICAgZXZ0LnRhcmdldC52YWx1ZT0nJztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsaWRTdGF0dXM7XHJcblxyXG5cclxuICAgICAgaWYoZXZ0LnRhcmdldC52YWx1ZS5pbmRleE9mKCcgJykgPiAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIHRleHQ6ICdTcGFjZSBub3QgYWxsb3dlZCdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgLy8gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcclxuICAgICAgICAgIGV2dC50YXJnZXQudmFsdWU9Jyc7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgdmFsaWRQYXNzd29yZChlbG1WYWw6YW55LGVsbUlkOmFueT1cIlwiKVxyXG4gIHtcclxuICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKC9eLiooPz0uezgsMTV9KSg/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKltAIyQlJiElKCkqP10pLiokLyk7XHJcbiAgICAgIGlmIChlbG1WYWwgIT0gJycpXHJcbiAgICAgIHtcclxuICAgICAgICAvL2FsZXJ0KFwiaGlpXCIpO1xyXG4gICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChlbG1WYWwpID09IHRydWUpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgdGV4dDogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIHBhc3N3b3JkJ1xyXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgIGlmKGVsbUlkIT1cIlwiKVxyXG4gICAgXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5mb2N1cygpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5zY3JvbGxUbyhcclxuICAgICAgICAgICAgICAgIHt0b3A6ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCkpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtXHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC01MH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4vLyB2YWxpZGF0ZXMgQWFkaGFyIG51bWJlciByZWNlaXZlZCBhcyBzdHJpbmdcclxuICB2YWxpZEFhZGhhcihlbG1WYWw6YW55KSB7XHJcbiAgICBpZiAoZWxtVmFsICE9ICcnKVxyXG4gICAgICB7XHJcbiAgICAgICAgICAvLyBtdWx0aXBsaWNhdGlvbiB0YWJsZVxyXG4gICAgICAgICAgY29uc3QgZCA9IFtcclxuICAgICAgICAgICAgWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDldLFxyXG4gICAgICAgICAgICBbMSwgMiwgMywgNCwgMCwgNiwgNywgOCwgOSwgNV0sXHJcbiAgICAgICAgICAgIFsyLCAzLCA0LCAwLCAxLCA3LCA4LCA5LCA1LCA2XSxcclxuICAgICAgICAgICAgWzMsIDQsIDAsIDEsIDIsIDgsIDksIDUsIDYsIDddLFxyXG4gICAgICAgICAgICBbNCwgMCwgMSwgMiwgMywgOSwgNSwgNiwgNywgOF0sXHJcbiAgICAgICAgICAgIFs1LCA5LCA4LCA3LCA2LCAwLCA0LCAzLCAyLCAxXSxcclxuICAgICAgICAgICAgWzYsIDUsIDksIDgsIDcsIDEsIDAsIDQsIDMsIDJdLFxyXG4gICAgICAgICAgICBbNywgNiwgNSwgOSwgOCwgMiwgMSwgMCwgNCwgM10sXHJcbiAgICAgICAgICAgIFs4LCA3LCA2LCA1LCA5LCAzLCAyLCAxLCAwLCA0XSxcclxuICAgICAgICAgICAgWzksIDgsIDcsIDYsIDUsIDQsIDMsIDIsIDEsIDBdXHJcbiAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgLy8gcGVybXV0YXRpb24gdGFibGVcclxuICAgICAgICAgIGNvbnN0IHAgPSBbXHJcbiAgICAgICAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSxcclxuICAgICAgICAgICAgWzEsIDUsIDcsIDYsIDIsIDgsIDMsIDAsIDksIDRdLFxyXG4gICAgICAgICAgICBbNSwgOCwgMCwgMywgNywgOSwgNiwgMSwgNCwgMl0sXHJcbiAgICAgICAgICAgIFs4LCA5LCAxLCA2LCAwLCA0LCAzLCA1LCAyLCA3XSxcclxuICAgICAgICAgICAgWzksIDQsIDUsIDMsIDEsIDIsIDYsIDgsIDcsIDBdLFxyXG4gICAgICAgICAgICBbNCwgMiwgOCwgNiwgNSwgNywgMywgOSwgMCwgMV0sXHJcbiAgICAgICAgICAgIFsyLCA3LCA5LCAzLCA4LCAwLCA2LCA0LCAxLCA1XSxcclxuICAgICAgICAgICAgWzcsIDAsIDQsIDYsIDksIDEsIDMsIDIsIDUsIDhdXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgICBsZXQgYyA9IDBcclxuICAgICAgICAgIGxldCBpbnZlcnRlZEFycmF5ID0gZWxtVmFsLnNwbGl0KCcnKS5tYXAoTnVtYmVyKS5yZXZlcnNlKClcclxuXHJcbiAgICAgICAgICBpbnZlcnRlZEFycmF5LmZvckVhY2goKHZhbDphbnksIGk6YW55KSA9PiB7XHJcbiAgICAgICAgICAgIGMgPSBkW2NdW3BbKGkgJSA4KV1bdmFsXV1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBpZiAoYyA9PT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgYWFkaGFhciBubydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlzQ2hhcktleShldmVudDphbnkpe1xyXG4gICAgdmFyIGNoYXJDb2RlMiA9IChldmVudC53aGljaCkgPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGVcclxuICAgIGlmIChjaGFyQ29kZTIgPiAzMiAmJiAoY2hhckNvZGUyIDwgNjUgfHwgY2hhckNvZGUyID4gOTApICYmXHJcbiAgICAgICAgICAgIChjaGFyQ29kZTIgPCA5NyB8fCBjaGFyQ29kZTIgPiAxMjIpICkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBpc0NoYXJLZXlNb2IodmFsOiBhbnkpIHtcclxuICAgIHJldHVybiB2YWwucmVwbGFjZSgvW15hLXpBLXogXS9nLCAnJyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgaXNOdW1iZXJLZXkoZXZlbnQ6YW55KVxyXG4gIHtcclxuICAgICAgbGV0IGNoYXJDb2RlID0gKGV2ZW50LndoaWNoKSA/IGV2ZW50LndoaWNoIDogZXZlbnQua2V5Q29kZVxyXG4gICAgICBpZiAoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIGlzTnVtYmVyS2V5TW9iKHZhbDogYW55KSB7XHJcbiAgICByZXR1cm4gdmFsLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XHJcbiAgfVxyXG5cclxuICBpc0FscGhhTnVtZXJpYyhldmVudDphbnkpe1xyXG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgY29uc3QgY2hhckNvZGUyID0gKGV2ZW50LndoaWNoKSA/IGV2ZW50LndoaWNoIDogZXZlbnQua2V5Q29kZVxyXG4gICAgaWYgKGNoYXJDb2RlMiA+IDMyICYmIChjaGFyQ29kZTIgPCA2NSB8fCBjaGFyQ29kZTIgPiA5MCkgJiYgKGNoYXJDb2RlMiA8IDk3IHx8IGNoYXJDb2RlMiA+IDEyMikgJiYgKGNoYXJDb2RlMiA+IDMxICYmIChjaGFyQ29kZTIgPCA0OCB8fCBjaGFyQ29kZTIgPiA1NykgKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgaXNBbHBoYU51bWVyaWNEeW5hbWljKGV2ZW50OmFueSxibG9ja1NwZWNpYWxDaGFyczphbnkpe1xyXG4gICAgICBsZXQgaXNzaGlmdDphbnk9ZXZlbnQuc2hpZnRLZXk7XHJcbiAgICAgIGNvbnN0IGNoYXJDb2RlMiA9IChldmVudC53aGljaCkgPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGVcclxuICAgICAgICBpZihibG9ja1NwZWNpYWxDaGFycyA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZTIgPiAzMiAmJiAoY2hhckNvZGUyIDwgNjUgfHwgY2hhckNvZGUyID4gOTApICYmIChjaGFyQ29kZTIgPCA5NyB8fCBjaGFyQ29kZTIgPiAxMjIpICYmIChjaGFyQ29kZTIgPiAzMSAmJiAoY2hhckNvZGUyIDwgNDggfHwgY2hhckNvZGUyID4gNTcpICkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiggYmxvY2tTcGVjaWFsQ2hhcnMgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgaWYoKChpc3NoaWZ0PT1mYWxzZSkgJiYgY2hhckNvZGUyID49IDQ4ICYmIGNoYXJDb2RlMiA8PTU3KSB8fCAoKGlzc2hpZnQ9PWZhbHNlKSAmJiBjaGFyQ29kZTIgPj0gNjUgJiYgY2hhckNvZGUyIDw9OTApIHx8IChjaGFyQ29kZTI9PTgpIHx8ICgoaXNzaGlmdD09ZmFsc2UpICYmIGNoYXJDb2RlMj09MTkwKSB8fCAoKGlzc2hpZnQ9PWZhbHNlKSAmJiBjaGFyQ29kZTIgPT0gMTg4KSB8fCgoaXNzaGlmdD09ZmFsc2UpICYmIGNoYXJDb2RlMiA9PSAxODkpfHwgKChpc3NoaWZ0ID09IHRydWUpICYmIChjaGFyQ29kZTIgPT0gMTkxKSB8fCAoY2hhckNvZGUyPT00OCkgfHwgKGNoYXJDb2RlMj09NTcpICkpXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICBhbGxvd3NwZWNpYWxDaGFyKGV2ZW50OmFueSl7XHJcblxyXG4gICAgY29uc3QgY2hhckNvZGUyID0gKGV2ZW50LndoaWNoKSA/IGV2ZW50LndoaWNoIDogZXZlbnQua2V5Q29kZVxyXG4gICAgaWYgKGNoYXJDb2RlMiA+IDMyICYmIChjaGFyQ29kZTIgPCA2NSB8fCBjaGFyQ29kZTIgPiA5MCkgJiYgKGNoYXJDb2RlMiA8IDk3IHx8IGNoYXJDb2RlMiA+IDEyMikgJiYgKGNoYXJDb2RlMiA+IDMxICYmIChjaGFyQ29kZTIgPD0gNDggfHwgY2hhckNvZGUyID49IDU3KSAmJiAoY2hhckNvZGUyID49IDE4OCB8fCBjaGFyQ29kZTIgPD0gMTkxKSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGlzQWxwaGFOdW1lcmljTW9iKHZhbDphbnkpe1xyXG4gICAgdmFyIG51bVBhdHRlcm4gPSBuZXcgUmVnRXhwKC9eW2EtekEtWjAtOS0uQCAvXSokLyk7XHJcbiAgICBpZiAobnVtUGF0dGVybi50ZXN0KHZhbCkpXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNEZWNpbWFsKGV2ZW50OmFueSl7XHJcbiAgICBsZXQgY2hhckNvZGUgPSAoZXZlbnQud2hpY2gpID8gZXZlbnQud2hpY2ggOiBldmVudC5rZXlDb2RlO1xyXG4gICAgdmFyIHR4dFZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgIGlmICgoY2hhckNvZGUgPiA0NyAmJiBjaGFyQ29kZSA8IDU4KSB8fCBjaGFyQ29kZSA9PSA0NiB8fCBjaGFyQ29kZSA9PSA4IHx8IGNoYXJDb2RlID09IDE5MClcclxuICAgIHtcclxuICAgICAgICBpZiAodHh0VmFsLmluZGV4T2YoXCIuXCIpID4gMCAmJiBjaGFyQ29kZSA9PSAxOTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNEZWNpbWFsTW9iKHZhbDogYW55KSB7XHJcbiAgICByZXR1cm4gdmFsLnJlcGxhY2UoL1teXFxkKyhcXC5cXGR7MSwyfV0vZywgJycpO1xyXG4gIH1cclxuXHJcblxyXG4gIGR5bkN0cmxWYWwoY3RybFZhbFBhcmFtOmFueSxlbGVtT2JqOmFueSlcclxuICB7XHJcbiAgICBsZXQgZHluRGF0YSAgICAgICA9IGN0cmxWYWxQYXJhbVsnZHluRGF0YU9iaiddO1xyXG4gICAgbGV0IGVsbVZhbCAgICAgICAgPSBjdHJsVmFsUGFyYW1bJ2N0cmxWYWwnXTtcclxuICAgIGxldCBkcmZ0U3RzICAgICAgID0gY3RybFZhbFBhcmFtWydkcmZ0U3RzJ107XHJcbiAgICBsZXQgZGlzcE5uU3RzICAgICA9IGN0cmxWYWxQYXJhbVsnZGlzcE5uU3RzJ107XHJcbiAgICBsZXQgc2VjdG5DdHJsVHlwZSA9IGN0cmxWYWxQYXJhbVsnY3RybFR5cGUnXTtcclxuICAgIGxldCBjdHJsTm0gICAgICA9ICcnO1xyXG4gICAgbGV0IGxibE5hbWUgICAgID0gJyc7XHJcbiAgICBsZXQgY3RybFR5cGUgICAgPSAwO1xyXG4gICAgbGV0IG1uZFN0cyAgICAgID0gMDtcclxuICAgIGxldCBmbGRMbmd0aCAgICA9IDA7XHJcbiAgICBpZihzZWN0bkN0cmxUeXBlPT04KVxyXG4gICAge1xyXG4gICAgICBjdHJsTm0gICAgICA9ICcnO1xyXG4gICAgICBsYmxOYW1lICAgICA9IGR5bkRhdGFbJ2NvbHVtbk5hbWUnXTtcclxuICAgICAgY3RybFR5cGUgICAgPSBkeW5EYXRhWydjb2x1bW5UeXBlJ107XHJcbiAgICAgIG1uZFN0cyAgICAgID0gKGRpc3BOblN0cz09PWZhbHNlKT9keW5EYXRhWydjb2x1bW5NbmQnXTowO1xyXG4gICAgICBmbGRMbmd0aCAgICA9IGR5bkRhdGFbJ2ZpZWxkTGVuJ107XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBjdHJsTm0gICAgICA9IGR5bkRhdGFbJ2pzbkNvbnRyb2xBcnJheSddWzBdWydjdHJsTmFtZSddO1xyXG4gICAgICBsYmxOYW1lICAgICA9IGR5bkRhdGFbJ3ZjaExhYmVsTmFtZSddO1xyXG4gICAgICBjdHJsVHlwZSAgICA9IGR5bkRhdGFbJ3RpbkNvbnRyb2xUeXBlJ107XHJcbiAgICAgIG1uZFN0cyAgICAgID0gKGRpc3BOblN0cz09PWZhbHNlKT9keW5EYXRhWyd0aW5NYW5kYXRvcnlTdHMnXTowO1xyXG4gICAgICBmbGRMbmd0aCAgICA9IGR5bkRhdGFbJ2ludEZpZWxkTGVuZ3RoJ107XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHZhbFN0cyA9IHRydWU7XHJcblxyXG4gICAgLy8gZm9yIHNlbGVjdCB0YWdcclxuICAgIGlmIChtbmRTdHM9PTEgJiYgY3RybFR5cGU9PTIpIHtcclxuICAgICAgaWYoZHJmdFN0cz09ZmFsc2UpXHJcbiAgICAgIHtcclxuICAgICAgICBpZighdGhpcy5zZWxlY3REcm9wZG93bihlbG1WYWwsbGJsTmFtZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsU3RzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBmb3IgcmFkaW8gYnV0dG9uXHJcbiAgICBlbHNlIGlmIChtbmRTdHM9PTEgJiYgKGN0cmxUeXBlPT01IHx8IGN0cmxUeXBlPT0xKSkge1xyXG4gICAgICBpZihkcmZ0U3RzPT1mYWxzZSlcclxuICAgICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmJsYW5rQ2hlY2tSZG9EeW5hbWljKGN0cmxObSxsYmxOYW1lKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGZvciB0ZXh0IGJveFxyXG4gICAgZWxzZSBpZiAobW5kU3RzPT0xICYmIGN0cmxUeXBlPT02KSB7O1xyXG4gICAgICBpZihkcmZ0U3RzPT1mYWxzZSlcclxuICAgICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmJsYW5rQ2hlY2soZWxtVmFsLGxibE5hbWUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbFN0cyA9IGZhbHNlO1xyXG4gICAgICAgICAgLy9keW5EYXRhLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCF0aGlzLm1heExlbmd0aChlbG1WYWwsZmxkTG5ndGgsbGJsTmFtZSkpXHJcbiAgICAgIHtcclxuICAgICAgICB2YWxTdHMgPSBmYWxzZTtcclxuICAgICAgICAvL2R5bkRhdGEuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZm9yIHRleHQgYXJlYVxyXG4gICAgZWxzZSBpZiAobW5kU3RzPT0xICYmIGN0cmxUeXBlPT03KSB7XHJcbiAgICAgIGlmKGRyZnRTdHM9PWZhbHNlKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuYmxhbmtDaGVjayhlbG1WYWwsbGJsTmFtZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmFsU3RzID0gZmFsc2U7XHJcbiAgICAgICAgICAvL2R5bkRhdGEuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoIXRoaXMubWF4TGVuZ3RoKGVsbVZhbCxmbGRMbmd0aCxsYmxOYW1lKSlcclxuICAgICAge1xyXG4gICAgICAgIHZhbFN0cyA9IGZhbHNlO1xyXG4gICAgICAgIC8vZHluRGF0YS5mb2N1cygpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9yIGRhdGUgYm94XHJcbiAgICBlbHNlIGlmIChtbmRTdHM9PTEgJiYgY3RybFR5cGU9PTkpIHtcclxuICAgICAgaWYoZHJmdFN0cz09ZmFsc2UpXHJcbiAgICAgIHtcclxuICAgICAgICBpZighdGhpcy5ibGFua0NoZWNrKGVsbVZhbCxsYmxOYW1lKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3IgdGltZSBib3hcclxuICAgIGVsc2UgaWYgKG1uZFN0cz09MSAmJiBjdHJsVHlwZT09MTApIHtcclxuICAgICAgaWYoZHJmdFN0cz09ZmFsc2UpXHJcbiAgICAgIHtcclxuICAgICAgICBpZighdGhpcy5ibGFua0NoZWNrKGVsbVZhbCxsYmxOYW1lKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3IgZGF0ZSB0aW1lIGJveFxyXG4gICAgZWxzZSBpZiAobW5kU3RzPT0xICYmIGN0cmxUeXBlPT0xMSkge1xyXG4gICAgICBpZihkcmZ0U3RzPT1mYWxzZSlcclxuICAgICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmJsYW5rQ2hlY2soZWxtVmFsLGxibE5hbWUpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHZhbFN0cyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVsc2V7XHJcbiAgICAgIHZhbFN0cyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsU3RzO1xyXG4gIH1cclxuXHJcbiAgaXNEYXNoU2xhc2hOdW1lcmljKGV2ZW50OmFueSl7XHJcbiAgICBsZXQgY2hhckNvZGUgPSAoZXZlbnQud2hpY2gpID8gZXZlbnQud2hpY2ggOiBldmVudC5rZXlDb2RlXHJcbiAgICAvLyBjb25zb2xlLmxvZyhjaGFyQ29kZSk7XHJcbiAgICBpZiAoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0NSB8fCBjaGFyQ29kZSA+IDU3IHx8IGNoYXJDb2RlPT00NikpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIGlzRGFzaFNsYXNoTnVtZXJpY01vYih2YWw6IGFueSkge1xyXG4gICAgcmV0dXJuIHZhbC5yZXBsYWNlKC9bXjAtOS8tXS9nLCAnJyk7XHJcbiAgfVxyXG4gIGlzX3VybChzdHI6YW55KVxyXG4gIHtcclxuICAgIGlmKHN0cj09JycgfHwgc3RyID09IG51bGwpXHJcbiAge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIGVsc2VcclxuICB7IFxyXG4gICAgICAvLyBsZXQgcmVnZXhwID0gIC9eKD86KD86aHR0cHM/fGZ0cCk6XFwvXFwvKT8oPzooPyEoPzoxMHwxMjcpKD86XFwuXFxkezEsM30pezN9KSg/ISg/OjE2OVxcLjI1NHwxOTJcXC4xNjgpKD86XFwuXFxkezEsM30pezJ9KSg/ITE3MlxcLig/OjFbNi05XXwyXFxkfDNbMC0xXSkoPzpcXC5cXGR7MSwzfSl7Mn0pKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswMV1cXGR8MjJbMC0zXSkoPzpcXC4oPzoxP1xcZHsxLDJ9fDJbMC00XVxcZHwyNVswLTVdKSl7Mn0oPzpcXC4oPzpbMS05XVxcZD98MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC00XSkpfCg/Oig/OlthLXpcXHUwMGExLVxcdWZmZmYwLTldLSopKlthLXpcXHUwMGExLVxcdWZmZmYwLTldKykoPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKig/OlxcLig/OlthLXpcXHUwMGExLVxcdWZmZmZdezIsfSkpKSg/OjpcXGR7Miw1fSk/KD86XFwvXFxTKik/JC87XHJcbiAgICAgIGxldCByZWdleHA9L15odHRwcz9cXDpcXC9cXC9bXlxcL1xcc10rKFxcLy4qKT8kLzsgICAgICAvL0FjY2VwdCBib3RoIHByaXZhdGUgYW5kIGRvbWFpbiBhcGkgdXJsXHJcbiAgICAgIGlmIChyZWdleHAudGVzdChzdHIpKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgU3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ0VudGVyIHZhbGlkIFVSTCcpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICB9XHJcbiAgfVxyXG4gIGNoa1Bhc3N3b3JkKHN0cjphbnkpXHJcbiAge1xyXG4gICAgbGV0IHJlZ2V4cCA9ICAvXig/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlteYS16QS1aMC05XSkoPyEuKlxccykuezgsMTV9JC87XHJcbiAgICAgICAgICBpZiAocmVnZXhwLnRlc3Qoc3RyKSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgdGV4dDogJ0VudGVyIHZhbGlkIFBhc3N3b3JkJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gIH1cclxuICBjaGtibGFua3NwYWNlKHN0cjphbnkpXHJcbiAge1xyXG4gICAgdmFyIHJlZ2V4cCA9IC9eXFxTKiQvXHJcbiAgICAgICAgICBpZiAocmVnZXhwLnRlc3Qoc3RyKSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICB0ZXh0OiAnU3BhY2Ugbm90IGFsbG93ZWQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgfVxyXG4gIHZhbGlkYXRlRmlsZShmaWxlVXBsb2FkVHlwZTogc3RyaW5nICxhY3R1YWxGaWxlVHlwZTphbnkpIHtcclxuICAgIHZhciBleHQgPSBmaWxlVXBsb2FkVHlwZS5zdWJzdHJpbmcoZmlsZVVwbG9hZFR5cGUubGFzdEluZGV4T2YoJy8nKSArIDEpO1xyXG4gICAgY29uc3QgZmlsZVR5cGVzIDphbnk9XHJcbiAgICB7XCJwZGZcIiAgOlsncGRmJ10sXHJcbiAgICBcImltYWdlXCIgOlsnanBlZycsICdqcGUnLCAncG5nJywgJ2dpZicsJ2pwZyddLFxyXG4gICAgXCJleGNlbFwiIDpbJ2NzdicsICdkYmYnLCAnaHRtJywnaHRtbCcsJ21odCcsICdtaHRtbCcsICdvZHMnLCdwZGYnLCAncHJuJywgICd0eHQnLCAneGxhJywgJ3hsYW0nLCAneGxzJywgJ3hsc2InLCAneGxzeCcsJ3hsdCcsICd4bHRtJywgJ3hscycsICd4bHNiJywgJ3hsc20nLCAneGxzeCcsJ3hsdycsICd4cHMnXSxcclxuICAgIFwiZG9jXCIgICA6Wydkb2MnLCAnZG9jbScsICdkb2N4JywgJ2RvdCcsJ2RvdG0nLCAnZG90eCcsJ2h0bScsICdodG1sJywgJ21odCcsICdtaHRtbCcsICdvZHQnLCAncGRmJywgJ3J0ZicsICd0eHQnLCAnd3BzJywgJ3htbCcsJ3hwcycsJ21zd29yZCddLFxyXG4gICAgXCJ2aWRlb1wiIDpbJ21wNCcsJ29neCcsJ29nYScsJ29ndicsJ29nZycsJ3dlYm0nXSxcclxuICAgIFwiYXVkaW9cIjpbJ21wMycsJ21wZWcnXVxyXG4gIH07XHJcbiAgICAgaWYgKGZpbGVUeXBlc1thY3R1YWxGaWxlVHlwZV0uaW5jbHVkZXMoZXh0KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgIH1cclxuICAgICBlbHNlIHtcclxuICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgIH1cclxufVxyXG4gICAgdmFsaWRhdGVGaWxlU2l6ZSh1cGxvYWRlZEZpbGVTaXplOmFueSxhY3R1YWxGaWxlU2l6ZTphbnksYWN0dWFsRmlsZVNpemVUeXBlOmFueSlcclxuICAgIHtcclxuXHJcbiAgICAgIGlmIChhY3R1YWxGaWxlU2l6ZVR5cGUudG9Mb3dlckNhc2UoKSA9PSAna2InKVxyXG4gICAgICB7XHJcbiAgICAgICAgYWN0dWFsRmlsZVNpemUgPSAxMDI0KmFjdHVhbEZpbGVTaXplO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2VcclxuICAgICAge1xyXG4gICAgICAgIGFjdHVhbEZpbGVTaXplID0gMTAyNCoxMDI0KmFjdHVhbEZpbGVTaXplO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgZmlsZVZhbGlkU3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICBpZih1cGxvYWRlZEZpbGVTaXplID4gYWN0dWFsRmlsZVNpemUpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGZpbGVWYWxpZFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICByZXR1cm4gZmlsZVZhbGlkU3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRhYmxlbmFtZXZhbChvYmo6YW55KSB7XHJcbiAgICAgIG9iai50YXJnZXQudmFsdWU9b2JqLnRhcmdldC52YWx1ZS50b1VwcGVyQ2FzZSgpLnJlcGxhY2VBbGwoXCItXCIsIFwiX1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0ZvclNwYWNlSW5BbGxQb3N0aW9uKGV2dDphbnkpXHJcbiAgICAgIHtcclxuICAgICAgICBpZihldnQudGFyZ2V0LnZhbHVlLmluZGV4T2YoJyAnKSA+IDApXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICB0ZXh0OiAnU3BhY2Ugbm90IGFsbG93ZWQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZ0LnRhcmdldC5pZCkpLnZhbHVlPScnO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHNwbHJlZ2F4VmFsaWRhdGlvbihvYmo6YW55KVxyXG4gICAgICAvLyB7XHJcbiAgICAgIC8vICAgbGV0IHJlZ2V4cD0vWyFAIyQlXiYqKCkrXFw9XFxbXFxde307JzpcIlxcXFx8LC48PlxcLz9dLztcclxuICAgICAgLy8gICBpZiAocmVnZXhwLnRlc3Qob2JqKSlcclxuICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgIC8vICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgIC8vICAgICAgICAgZWxzZVxyXG4gICAgICAvLyAgICAgICAgIHtcclxuICAgICAgLy8gICAgICAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgIC8vICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgIC8vICAgICAgICAgICAgIHRleHQ6IHRoaXMuY29tQ29uZmlnU2Vydi5sYW5nUmVwbGFjZSgnU3BlY2lhbCBjaGFyYWN0ZXIgbm90IGFsbG93ZWQgZXhjZXB0IF8nKVxyXG4gICAgICAvLyAgICAgICAgICAgfSk7XHJcbiAgICAgIC8vICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAvLyB9XHJcblxyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgICBjb250YWluc1NwZWNpYWxDaGFycyhzdHI6YW55KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlY2lhbENoYXJzID0gL1tgIUAjJCVeJiooKV8rXFwtPVxcW1xcXXt9Oyc6XCJcXFxcfCwuPD5cXC8/fl0vO1xyXG4gIFxyXG4gICAgICAgIGlmIChzcGVjaWFsQ2hhcnMudGVzdChzdHIpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gIFxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gIFxyXG4gICAgICAvLyAgcmV0dXJuIHNwZWNpYWxDaGFycy50ZXN0KHN0cik7XHJcbiAgICAgIH1cclxufVxyXG4iXX0=