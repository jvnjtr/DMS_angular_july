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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbmNoZWNrbGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL3ZhbGlkYXRpb25jaGVja2xpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQzs7O0FBUy9CLE1BQU0sT0FBTyx5QkFBeUI7SUFFcEMsWUFBb0IsY0FBa0M7UUFBbEMsbUJBQWMsR0FBZCxjQUFjLENBQW9CO0lBQUssQ0FBQztJQUc1RCxVQUFVLENBQUMsTUFBVyxFQUFFLEdBQVEsRUFBRSxRQUFhLEVBQUU7UUFDL0MsSUFBSSxNQUFNLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNSLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxHQUFHO2FBQ1YsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDTixJQUFJLEtBQUssSUFBSSxFQUFFLEVBQUU7b0JBQ2YsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDZCxNQUFNLE9BQU8sR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDakUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUNoQixPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDbEUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNUO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lB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QUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDL0IsQ0FBQTtZQUVELG9CQUFvQjtZQUNwQixNQUFNLENBQUMsR0FBRztnQkFDUixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVB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QUNwRSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVELDhCQUE4QjtJQUM5QixJQUFJO0lBQ0osc0RBQXNEO0lBQ3RELDBCQUEwQjtJQUMxQixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLHdCQUF3QjtJQUN4Qiw2QkFBNkI7SUFDN0IsNkZBQTZGO0lBQzdGLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLElBQUk7SUFJSixvQkFBb0IsQ0FBQyxHQUFPO1FBQzFCLE1BQU0sWUFBWSxHQUFHLHlDQUF5QyxDQUFDO1FBRS9ELElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDMUI7WUFFRSxPQUFPLEtBQUssQ0FBQztTQUNkO2FBRUQ7WUFFRSxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUgsa0NBQWtDO0lBQ2xDLENBQUM7O3VIQXB6RE0seUJBQXlCOzJIQUF6Qix5QkFBeUIsY0FGeEIsTUFBTTs0RkFFUCx5QkFBeUI7a0JBSHJDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuaW1wb3J0IHsgTXNnZW5naW5lTGliU2VydmljZSB9IGZyb20gJy4vbXNnZW5naW5lLWxpYi5zZXJ2aWNlJztcblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yY2hlY2tsaXN0U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoIHB1YmxpYyBjb21tb25zZXJ2ZWljZTpNc2dlbmdpbmVMaWJTZXJ2aWNlLCkgeyB9XG5cbiAgXG4gIGJsYW5rQ2hlY2soZWxtVmFsOiBhbnksIG1zZzogYW55LCBlbG1JZDogYW55ID0gXCJcIikge1xuICAgIGlmIChlbG1WYWwgPT0gJycgfHwgdHlwZW9mIChlbG1WYWwpID09IHVuZGVmaW5lZCB8fCBlbG1WYWwgPT0gbnVsbCkge1xuICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgdGV4dDogbXNnXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGVsbUlkICE9IFwiXCIpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYmxhbmtJbWdDaGVjayhlbG1WYWw6YW55LCBtc2c6YW55KVxuICB7XG4gICAgICBpZihlbG1WYWwgPT0gJycgfHwgdHlwZW9mIChlbG1WYWwpID09IHVuZGVmaW5lZCB8fCBlbG1WYWwgPT0gbnVsbClcbiAgICAgIHtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1BsZWFzZScpICttc2dcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYmxhbmtDaGVja1JkbyhlbG1ObTphbnksIG1zZzphbnksZWxtSWQ6YW55PVwiXCIpXG4gIHtcbiAgICBcbiAgICAgIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShlbG1ObSk7XG4gICAgICBsZXQgY2hlY2tlZEN0cjpudW1iZXIgPSAwO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVsZS5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICBpZigoZWxlW2ldIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQpXG4gICAgICAgICB7XG4gICAgICAgICAgXG4gICAgICAgICAgY2hlY2tlZEN0cisrO1xuICAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICBpZihjaGVja2VkQ3RyPT0wKVxuICAgICAge1xuICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnU2VsZWN0JykrXCIgXCIrbXNnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgIGlmKGVsbUlkIT1cIlwiKVxuXG4gICAgICAgICAge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5mb2N1cygpO1xuXG4gICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICB7dG9wOiAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLVxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLTUwfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIGJsYW5rQ2hlY2tSZG9EeW5hbWljKGNsc05hbWU6YW55LCBtc2c6YW55LGVsbUlkOmFueT1cIlwiKVxuICBcbiB7XG5cblxuICBsZXQgY2xhc3NOYW1lID0gICdjbHNfJytjbHNOYW1lO1xuXG4gIGxldCBlbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG5cbiAgbGV0IGNoZWNrZWRDdHI6bnVtYmVyID0gMDtcblxuICBmb3IobGV0IGkgPSAwOyBpIDwgZWxlLmxlbmd0aDsgaSsrKSB7XG5cblxuXG4gICAgIGlmKChlbGVbaV0gYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZClcblxuICAgICB7XG5cbiAgICAgXG5cbiAgICAgIGNoZWNrZWRDdHIrKztcblxuICAgICB9XG5cblxuXG4gIH1cblxuICBpZihjaGVja2VkQ3RyPT0wKVxuXG4gIHtcblxuICAgIFN3YWwuZmlyZSh7XG5cbiAgICAgIGljb246ICdlcnJvcicsXG5cbiAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1NlbGVjdCcpK1wiIFwiK21zZ1xuXG4gICAgfSkudGhlbihmdW5jdGlvbigpe1xuXG4gICAgIC8vIGNvbnNvbGUubG9nKClcblxuICAgICAgaWYoZWxlWzBdIT11bmRlZmluZWQgKVxuXG4gICAgICB7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cblxuXG4gICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZVswXS5pZCk/LmNsb3Nlc3QoJ2RpdicpKS5mb2N1cygpO1xuXG5cblxuICAgICAgICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVbMF0uaWQpKS5zY3JvbGxJbnRvVmlldygpO1xuXG5cblxuICAgICAgICB9LCA1MDApO1xuXG4gICAgICB9XG5cblxuXG4gICAgfSk7XG5cblxuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcblxufVxuXG5cbiAgYmxhbmtDaGVja0Noa2JveER5bmFtaWMoY2xzTmFtZTphbnksIG1zZzphbnksZWxtSWQ6YW55PVwiXCIpXG4gIHtcbiAgICAvLyBhbGVydChcIkFycGl0YVwiKTtcbiAgICAgIGxldCBjbGFzc05hbWUgPSAgJ2Nsc18nK2Nsc05hbWU7XG4gICAgICBsZXQgZWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgICAgbGV0IGNoZWNrZWRDdHI6bnVtYmVyID0gMDtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbGUubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgaWYoKGVsZVtpXSBhcyBIVE1MSW5wdXRFbGVtZW50KS5jaGVja2VkKVxuICAgICAgICAge1xuICAgICAgICBcbiAgICAgICAgICBjaGVja2VkQ3RyKys7XG4gICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGlmKGNoZWNrZWRDdHI9PTApXG4gICAgICB7XG4gICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICB0ZXh0OiAnU2VsZWN0ICcrbXNnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgIGlmKGVsbUlkIT1cIlwiKVxuXG4gICAgICAgICAge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5mb2N1cygpO1xuXG4gICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICB7dG9wOiAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLVxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLTUwfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzZWxlY3REcm9wZG93bihlbG1WYWw6YW55LCBtc2c6YW55LGVsbUlkOmFueT1cIlwiKVxuICB7XG4gICAgICBpZihlbG1WYWwgPT0gMCB8fCBlbG1WYWwgPT0gJycgfHwgdHlwZW9mIChlbG1WYWwpID09IHVuZGVmaW5lZCB8fCBlbG1WYWwgPT0gbnVsbClcbiAgICAgIHtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1NlbGVjdCcpK1wiIFwiK21zZ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICBpZihlbG1JZCE9XCJcIilcblxuICAgICAgICAgIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgbWF4TGVuZ3RoKGVsbVZhbDphbnksZmxkTG5ndGg6YW55LCBtc2c6YW55LGVsbUlkOmFueT1cIlwiKVxuICB7XG4gICAgICBpZihlbG1WYWwubGVuZ3RoPjAgJiYgZWxtVmFsLmxlbmd0aD5mbGRMbmd0aClcbiAgICAgIHtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgIHRleHQ6IG1zZysnIHNob3VsZCBub3QgbW9yZSB0aGFuICcgKyBmbGRMbmd0aCArICcgY2hhcmFjdGVyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICBpZihlbG1JZCE9XCJcIilcblxuICAgICAgICAgIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBtaW5MZW5ndGgoZWxtVmFsOmFueSxmbGRMbmd0aDphbnksIG1zZzphbnksZWxtSWQ6YW55PVwiXCIpXG4gIHtcbiAgIFxuICAgICAgaWYoZWxtVmFsLmxlbmd0aD4wICYmIGVsbVZhbC5sZW5ndGg8ZmxkTG5ndGgpXG4gICAgICB7XG4gICAgICAgIC8vYWxlcnQoXCJoaWlcIik7XG4gICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICB0ZXh0OiBtc2crJyBzaG91bGQgbm90IGJlIGxlc3MgdGhhbicgKyBmbGRMbmd0aCArICcgY2hhcmFjdGVyJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICBpZihlbG1JZCE9XCJcIilcblxuICAgICAgICAgIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XG4gICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICdjZW50ZXInIH0pO1xuICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIHZhbGlkRW1haWwoZWxtVmFsOmFueSxlbG1JZDphbnk9XCJcIilcbiAge1xuICAgXG4gICAgICBsZXQgcGF0dGVybiA9IG5ldyBSZWdFeHAoL14oW2EtekEtWjAtOV8uKy1dKStcXEAoKFthLXpBLVowLTktXSkrXFwuKSsoW2EtekEtWjAtOV17Miw0fSkrJC8pO1xuICAgICAgaWYgKGVsbVZhbCAhPSAnJylcbiAgICAgIHtcbiAgICBcbiAgICAgICAgICBpZiAocGF0dGVybi50ZXN0KGVsbVZhbCkgPT0gdHJ1ZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgaWQnXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgaWYoZWxtSWQhPVwiXCIpXG4gICAgXG4gICAgICAgICAgICAgIHtcbiAgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbG1JZCk7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ2NlbnRlcicgfSk7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICBcbiAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgXG4gICAgXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFsaWRNb2IoZWxtVmFsOmFueSxlbG1JZDphbnk9XCJcIilcbiAge1xuICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKC9eWzYtOV1bMC05XXs5fSQvKTtcbiAgICAgIGlmIChlbG1WYWwgIT0gJycpXG4gICAgICB7XG4gICAgICAgICAgaWYgKHBhdHRlcm4udGVzdChlbG1WYWwpID09IHRydWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgdGV4dDogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG1vYmlsZSBubydcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICBpZihlbG1JZCE9XCJcIilcbiAgICBcbiAgICAgICAgICAgICAge1xuICAgIFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsbUlkKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnY2VudGVyJyB9KTtcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xuICAgIFxuICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGJsb2Nrc3BlY2lhbGNoYXJfZmlyc3QoZXZ0OmFueSxibG9ja1N0YXR1czpib29sZWFuKVxuICAgIHtcbiAgICAgIGxldCB2YWxpZFN0YXR1cyA9IHRydWU7XG4gICAgICBpZihibG9ja1N0YXR1cyA9PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkU3RhdHVzO1xuICAgICAgICB9XG5cbiAgICAgIGxldCB0eHRWYWx1ZTpzdHJpbmcgPSBldnQudGFyZ2V0LnZhbHVlO1xuICAgICAgLy8gY29uc29sZS5sb2codHh0VmFsdWUpO1xuICAgICAgLy8gaWYodHh0VmFsdWUubGVuZ3RoID09IDApXG4gICAgICAvLyAgIHtcbiAgICAgIC8vICAgICBTd2FsLmZpcmUoe1xuICAgICAgLy8gICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgIC8vICAgICAgIHRleHQ6IHRoaXMuY29tQ29uZmlnU2Vydi5sYW5nUmVwbGFjZSgnV2hpdGUgU3BhY2Ugbm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlJykrXCIhISFcIlxuICAgICAgLy8gICAgIH0pO1xuICAgICAgLy8gICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChldnQudGFyZ2V0LmlkKSkudmFsdWU9Jyc7XG4gICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gICB9XG4gICAgICBzd2l0Y2ggKHR4dFZhbHVlLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgY2FzZSA0NDpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJywgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAgLy8gdmlld0FsZXJ0KFwiLCBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UhISFcIik7XG5cbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDQ3OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnLyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNTg6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICc6IE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA0NjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJy4gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdTaW5nbGUgUXVvdGUgbm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgIHtcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgIHRleHQ6ICdXaGl0ZSBTcGFjZSBub3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDQwOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA0MTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJykgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA0NTpcbiAgICAgICAge1xuICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgdGV4dDogJy0gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA5NTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1wiXyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA1OTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1wiOyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAxMjQ6XG4gICAgICAgIHtcblxuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1wifCBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA2MzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1wiPyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgICAgICBjYXNlIDM0OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXCIgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzU6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICcjIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzY6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICckIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnJiBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAxMjY6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICd+IE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDk2OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnYCBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAzMzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJyEgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICclIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDk0OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXiBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA0MjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJyogTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDkyOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXFxcXCBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA0MzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJysgTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDYxOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnPSBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMTIzOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAneyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICd9IE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDkxOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnWyBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA5MzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ10gTm90IGFsbG93ZWQgaW4gMXN0IFBsYWNlICEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNjA6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICc8IE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDYyOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnPiBOb3QgYWxsb3dlZCBpbiAxc3QgUGxhY2UgISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNjQ6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdAIE5vdCBhbGxvd2VkIGluIDFzdCBQbGFjZSAhISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgIHZhbGlkU3RhdHVzID0gIHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZih2YWxpZFN0YXR1cyA9PSBmYWxzZSlcbiAgICAgIHtcbiAgICAgICAgLy8gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcbiAgICAgICAgZXZ0LnRhcmdldC52YWx1ZT0nJztcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWxpZFN0YXR1cztcbiAgICB9XG5cblxuXG5cbiAgICBjaGVja0ZvclNwZWNpYWxDaGFyYWN0ZXJBbGxQb3N0aW9uKGV2dDphbnksdHlwZTphbnk9MClcbiAgICB7XG4gICAgICBpZih0eXBlID09IHRydWUgfHxldnQudGFyZ2V0LnR5cGU9PVwiZW1haWxcIil7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIFxuICAgICAgbGV0IHR4dFZhbHVlOnN0cmluZyA9IGV2dC50YXJnZXQudmFsdWU7XG4gICAgICBsZXQgbGVuZ3RoID0gdHh0VmFsdWUubGVuZ3RoO1xuICAgICAgbGV0IHZhbGlkU3RhdHVzID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgaWYodHh0VmFsdWUuY2hhckNvZGVBdCgwKSA9PSAzMikgIHtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgIHRleHQ6ICdXaGl0ZSBzcGFjZSAnKydub3QgYWxsb3dlZCBpbiBmaXJzdCBwbGFjZScrJyEhISdcbiAgICAgICAgfSk7XG4gICAgICAgIGV2dC50YXJnZXQudmFsdWU9Jyc7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAodHh0VmFsdWUuY2hhckNvZGVBdChsZW5ndGgtMSkpIHtcbiAgICAgICAgY2FzZSA0NDpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJywgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgIC8vIHZpZXdBbGVydChcIiwgTm90IGFsbG93ZWQhISFcIik7XG5cbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDQ3OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnLyAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDU4OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnOiAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDQ2OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnLiAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdTaW5nbGUgUXVvdGUgbm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYXNlIDMyOlxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAvLyAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAvLyAgICAgICB0ZXh0OiAnV2hpdGUgU3BhY2Ugbm90IGFsbG93ZWQnKychISEnXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAvLyAgICAgYnJlYWs7XG4gICAgICAgIC8vICAgIC8vIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA0MTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJykgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNDU6XG4gICAgICAgIHtcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgIHRleHQ6ICctICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDk1OlxuICAgICAgICB7aWYodHlwZSAhPTEpXG4gICAgICAgICAge1xuICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgdGV4dDogJ1wiXyAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDU5OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXCI7ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAxMjQ6XG4gICAgICAgIHtcblxuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1wifCAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNjM6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdcIj8gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGNhc2UgMzQ6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdcIiAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzU6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICcjICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDM2OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnJCAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICcmICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAxMjY6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICd+ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA5NjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ2AgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDMzOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnISAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICclICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA5NDpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ14gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDQyOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnKiAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDkyOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXFxcXCAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNDM6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICcrICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNjE6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICc9ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMTIzOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAneyAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgMTI1OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnfSAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgOTE6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdbICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA5MzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ10gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDYwOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnPCAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNjI6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICc+ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNjQ6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdAICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQgOlxuICAgICAgICB2YWxpZFN0YXR1cyA9ICB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgICB9XG4gICAgaWYodmFsaWRTdGF0dXMgPT0gZmFsc2UpXG4gICAgICB7XG4gICAgICAgIC8vICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChldnQudGFyZ2V0LmlkKSkudmFsdWU9Jyc7XG4gICAgICAgIGV2dC50YXJnZXQudmFsdWU9Jyc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsaWRTdGF0dXM7XG5cblxuICAgICAgaWYoZXZ0LnRhcmdldC52YWx1ZS5pbmRleE9mKCcgJykgPiAwKVxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnU3BhY2Ugbm90IGFsbG93ZWQnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcbiAgICAgICAgICBldnQudGFyZ2V0LnZhbHVlPScnO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH1cbiAgICB0ZXh0YXJlYVNwZWNpYWxDaGFyYWN0ZXJBbGxQb3N0aW9uKGV2dDphbnksdHlwZTphbnk9MClcbiAgICB7XG4gICAgICBsZXQgdHh0VmFsdWU6c3RyaW5nID0gZXZ0LnRhcmdldC52YWx1ZTtcbiAgICAgLy8gY29uc29sZS5sb2coZXZ0LnRhcmdldC52YWx1ZSk7XG4gICAgICBsZXQgbGVuZ3RoID0gdHh0VmFsdWUubGVuZ3RoO1xuICAgICAgbGV0IHZhbGlkU3RhdHVzID0gdHJ1ZTtcblxuICAgICAgc3dpdGNoICh0eHRWYWx1ZS5jaGFyQ29kZUF0KGxlbmd0aC0xKSkge1xuICAgICAgICBjYXNlIDQ3OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnLyAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA1ODpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJzogJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdTaW5nbGUgUXVvdGUgbm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA5NTpcbiAgICAgICAge2lmKHR5cGUgIT0xKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgIHRleHQ6ICdcIl8gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgNTk6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdcIjsgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAxMjQ6XG4gICAgICAgIHtcblxuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1wifCAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDM0OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXCIgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAzNTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJyMgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgfVxuICAgICAgICBjYXNlIDM2OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnJCAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnJiAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDEyNjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ34gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA5NjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ2AgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAzMzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJyEgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAzNzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJyUgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA5NDpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ14gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA0MjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJyogJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA5MjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1xcXFwgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA0MzpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJysgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA2MTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJz0gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAxMjM6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICd7ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAxMjU6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICd9ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA5MTpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ1sgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlIDkzOlxuICAgICAgICB7XG4gICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiAnXSAnKydOb3QgYWxsb3dlZCcrJyEhISdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB2YWxpZFN0YXR1cyA9ICBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNhc2UgNjA6XG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICc8ICcrJ05vdCBhbGxvd2VkJysnISEhJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkU3RhdHVzID0gIGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSA2MjpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJz4gJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSA2NDpcbiAgICAgICAge1xuICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgdGV4dDogJ0AgJysnTm90IGFsbG93ZWQnKychISEnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsaWRTdGF0dXMgPSAgZmFsc2U7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgIHZhbGlkU3RhdHVzID0gIHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgIH1cbiAgICBpZih2YWxpZFN0YXR1cyA9PSBmYWxzZSlcbiAgICAgIHtcbiAgICAgICAgLy8gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcbiAgICAgICAgZXZ0LnRhcmdldC52YWx1ZT0nJztcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWxpZFN0YXR1cztcblxuXG4gICAgICBpZihldnQudGFyZ2V0LnZhbHVlLmluZGV4T2YoJyAnKSA+IDApXG4gICAgICAgIHtcbiAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6ICdTcGFjZSBub3QgYWxsb3dlZCdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZ0LnRhcmdldC5pZCkpLnZhbHVlPScnO1xuICAgICAgICAgIGV2dC50YXJnZXQudmFsdWU9Jyc7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfVxuXG4gIHZhbGlkUGFzc3dvcmQoZWxtVmFsOmFueSxlbG1JZDphbnk9XCJcIilcbiAge1xuICAgICAgbGV0IHBhdHRlcm4gPSBuZXcgUmVnRXhwKC9eLiooPz0uezgsMTV9KSg/PS4qXFxkKSg/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKltAIyQlJiElKCkqP10pLiokLyk7XG4gICAgICBpZiAoZWxtVmFsICE9ICcnKVxuICAgICAge1xuICAgICAgICAvL2FsZXJ0KFwiaGlpXCIpO1xuICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoZWxtVmFsKSA9PSB0cnVlKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgIHRleHQ6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBwYXNzd29yZCdcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICBpZihlbG1JZCE9XCJcIilcbiAgICBcbiAgICAgICAgICAgICAge1xuICAgIFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIFxuICAgICAgICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsbUlkKSkuZm9jdXMoKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICB7dG9wOiAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxtSWQpKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLVxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLTUwfVxuICAgICAgICAgICAgICAgICk7XG4gICAgXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICBcbiAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuLy8gdmFsaWRhdGVzIEFhZGhhciBudW1iZXIgcmVjZWl2ZWQgYXMgc3RyaW5nXG4gIHZhbGlkQWFkaGFyKGVsbVZhbDphbnkpIHtcbiAgICBpZiAoZWxtVmFsICE9ICcnKVxuICAgICAge1xuICAgICAgICAgIC8vIG11bHRpcGxpY2F0aW9uIHRhYmxlXG4gICAgICAgICAgY29uc3QgZCA9IFtcbiAgICAgICAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSxcbiAgICAgICAgICAgIFsxLCAyLCAzLCA0LCAwLCA2LCA3LCA4LCA5LCA1XSxcbiAgICAgICAgICAgIFsyLCAzLCA0LCAwLCAxLCA3LCA4LCA5LCA1LCA2XSxcbiAgICAgICAgICAgIFszLCA0LCAwLCAxLCAyLCA4LCA5LCA1LCA2LCA3XSxcbiAgICAgICAgICAgIFs0LCAwLCAxLCAyLCAzLCA5LCA1LCA2LCA3LCA4XSxcbiAgICAgICAgICAgIFs1LCA5LCA4LCA3LCA2LCAwLCA0LCAzLCAyLCAxXSxcbiAgICAgICAgICAgIFs2LCA1LCA5LCA4LCA3LCAxLCAwLCA0LCAzLCAyXSxcbiAgICAgICAgICAgIFs3LCA2LCA1LCA5LCA4LCAyLCAxLCAwLCA0LCAzXSxcbiAgICAgICAgICAgIFs4LCA3LCA2LCA1LCA5LCAzLCAyLCAxLCAwLCA0XSxcbiAgICAgICAgICAgIFs5LCA4LCA3LCA2LCA1LCA0LCAzLCAyLCAxLCAwXVxuICAgICAgICAgIF1cblxuICAgICAgICAgIC8vIHBlcm11dGF0aW9uIHRhYmxlXG4gICAgICAgICAgY29uc3QgcCA9IFtcbiAgICAgICAgICAgIFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSxcbiAgICAgICAgICAgIFsxLCA1LCA3LCA2LCAyLCA4LCAzLCAwLCA5LCA0XSxcbiAgICAgICAgICAgIFs1LCA4LCAwLCAzLCA3LCA5LCA2LCAxLCA0LCAyXSxcbiAgICAgICAgICAgIFs4LCA5LCAxLCA2LCAwLCA0LCAzLCA1LCAyLCA3XSxcbiAgICAgICAgICAgIFs5LCA0LCA1LCAzLCAxLCAyLCA2LCA4LCA3LCAwXSxcbiAgICAgICAgICAgIFs0LCAyLCA4LCA2LCA1LCA3LCAzLCA5LCAwLCAxXSxcbiAgICAgICAgICAgIFsyLCA3LCA5LCAzLCA4LCAwLCA2LCA0LCAxLCA1XSxcbiAgICAgICAgICAgIFs3LCAwLCA0LCA2LCA5LCAxLCAzLCAyLCA1LCA4XVxuICAgICAgICAgIF1cbiAgICAgICAgICBsZXQgYyA9IDBcbiAgICAgICAgICBsZXQgaW52ZXJ0ZWRBcnJheSA9IGVsbVZhbC5zcGxpdCgnJykubWFwKE51bWJlcikucmV2ZXJzZSgpXG5cbiAgICAgICAgICBpbnZlcnRlZEFycmF5LmZvckVhY2goKHZhbDphbnksIGk6YW55KSA9PiB7XG4gICAgICAgICAgICBjID0gZFtjXVtwWyhpICUgOCldW3ZhbF1dXG4gICAgICAgICAgfSlcbiAgICAgICAgICBpZiAoYyA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICB0ZXh0OiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgYWFkaGFhciBubydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNDaGFyS2V5KGV2ZW50OmFueSl7XG4gICAgdmFyIGNoYXJDb2RlMiA9IChldmVudC53aGljaCkgPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGVcbiAgICBpZiAoY2hhckNvZGUyID4gMzIgJiYgKGNoYXJDb2RlMiA8IDY1IHx8IGNoYXJDb2RlMiA+IDkwKSAmJlxuICAgICAgICAgICAgKGNoYXJDb2RlMiA8IDk3IHx8IGNoYXJDb2RlMiA+IDEyMikgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaXNDaGFyS2V5TW9iKHZhbDogYW55KSB7XG4gICAgcmV0dXJuIHZhbC5yZXBsYWNlKC9bXmEtekEteiBdL2csICcnKTtcbiAgfVxuXG5cbiAgaXNOdW1iZXJLZXkoZXZlbnQ6YW55KVxuICB7XG4gICAgICBsZXQgY2hhckNvZGUgPSAoZXZlbnQud2hpY2gpID8gZXZlbnQud2hpY2ggOiBldmVudC5rZXlDb2RlXG4gICAgICBpZiAoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpc051bWJlcktleU1vYih2YWw6IGFueSkge1xuICAgIHJldHVybiB2YWwucmVwbGFjZSgvW14wLTldL2csICcnKTtcbiAgfVxuXG4gIGlzQWxwaGFOdW1lcmljKGV2ZW50OmFueSl7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIGNvbnN0IGNoYXJDb2RlMiA9IChldmVudC53aGljaCkgPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGVcbiAgICBpZiAoY2hhckNvZGUyID4gMzIgJiYgKGNoYXJDb2RlMiA8IDY1IHx8IGNoYXJDb2RlMiA+IDkwKSAmJiAoY2hhckNvZGUyIDwgOTcgfHwgY2hhckNvZGUyID4gMTIyKSAmJiAoY2hhckNvZGUyID4gMzEgJiYgKGNoYXJDb2RlMiA8IDQ4IHx8IGNoYXJDb2RlMiA+IDU3KSApKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9XG5cblxuICBpc0FscGhhTnVtZXJpY0R5bmFtaWMoZXZlbnQ6YW55LGJsb2NrU3BlY2lhbENoYXJzOmFueSl7XG4gICAgICBsZXQgaXNzaGlmdDphbnk9ZXZlbnQuc2hpZnRLZXk7XG4gICAgICBjb25zdCBjaGFyQ29kZTIgPSAoZXZlbnQud2hpY2gpID8gZXZlbnQud2hpY2ggOiBldmVudC5rZXlDb2RlXG4gICAgICAgIGlmKGJsb2NrU3BlY2lhbENoYXJzID09IGZhbHNlKXtcbiAgICAgICAgICAgIGlmIChjaGFyQ29kZTIgPiAzMiAmJiAoY2hhckNvZGUyIDwgNjUgfHwgY2hhckNvZGUyID4gOTApICYmIChjaGFyQ29kZTIgPCA5NyB8fCBjaGFyQ29kZTIgPiAxMjIpICYmIChjaGFyQ29kZTIgPiAzMSAmJiAoY2hhckNvZGUyIDwgNDggfHwgY2hhckNvZGUyID4gNTcpICkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKCBibG9ja1NwZWNpYWxDaGFycyA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgaWYoKChpc3NoaWZ0PT1mYWxzZSkgJiYgY2hhckNvZGUyID49IDQ4ICYmIGNoYXJDb2RlMiA8PTU3KSB8fCAoKGlzc2hpZnQ9PWZhbHNlKSAmJiBjaGFyQ29kZTIgPj0gNjUgJiYgY2hhckNvZGUyIDw9OTApIHx8IChjaGFyQ29kZTI9PTgpIHx8ICgoaXNzaGlmdD09ZmFsc2UpICYmIGNoYXJDb2RlMj09MTkwKSB8fCAoKGlzc2hpZnQ9PWZhbHNlKSAmJiBjaGFyQ29kZTIgPT0gMTg4KSB8fCgoaXNzaGlmdD09ZmFsc2UpICYmIGNoYXJDb2RlMiA9PSAxODkpfHwgKChpc3NoaWZ0ID09IHRydWUpICYmIChjaGFyQ29kZTIgPT0gMTkxKSB8fCAoY2hhckNvZGUyPT00OCkgfHwgKGNoYXJDb2RlMj09NTcpICkpXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBcbiAgfVxuXG4gIGFsbG93c3BlY2lhbENoYXIoZXZlbnQ6YW55KXtcblxuICAgIGNvbnN0IGNoYXJDb2RlMiA9IChldmVudC53aGljaCkgPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGVcbiAgICBpZiAoY2hhckNvZGUyID4gMzIgJiYgKGNoYXJDb2RlMiA8IDY1IHx8IGNoYXJDb2RlMiA+IDkwKSAmJiAoY2hhckNvZGUyIDwgOTcgfHwgY2hhckNvZGUyID4gMTIyKSAmJiAoY2hhckNvZGUyID4gMzEgJiYgKGNoYXJDb2RlMiA8PSA0OCB8fCBjaGFyQ29kZTIgPj0gNTcpICYmIChjaGFyQ29kZTIgPj0gMTg4IHx8IGNoYXJDb2RlMiA8PSAxOTEpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgfVxuXG5cbiAgaXNBbHBoYU51bWVyaWNNb2IodmFsOmFueSl7XG4gICAgdmFyIG51bVBhdHRlcm4gPSBuZXcgUmVnRXhwKC9eW2EtekEtWjAtOS0uQCAvXSokLyk7XG4gICAgaWYgKG51bVBhdHRlcm4udGVzdCh2YWwpKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEZWNpbWFsKGV2ZW50OmFueSl7XG4gICAgbGV0IGNoYXJDb2RlID0gKGV2ZW50LndoaWNoKSA/IGV2ZW50LndoaWNoIDogZXZlbnQua2V5Q29kZTtcbiAgICB2YXIgdHh0VmFsID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIGlmICgoY2hhckNvZGUgPiA0NyAmJiBjaGFyQ29kZSA8IDU4KSB8fCBjaGFyQ29kZSA9PSA0NiB8fCBjaGFyQ29kZSA9PSA4IHx8IGNoYXJDb2RlID09IDE5MClcbiAgICB7XG4gICAgICAgIGlmICh0eHRWYWwuaW5kZXhPZihcIi5cIikgPiAwICYmIGNoYXJDb2RlID09IDE5MClcbiAgICAgICAge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEZWNpbWFsTW9iKHZhbDogYW55KSB7XG4gICAgcmV0dXJuIHZhbC5yZXBsYWNlKC9bXlxcZCsoXFwuXFxkezEsMn1dL2csICcnKTtcbiAgfVxuXG5cbiAgZHluQ3RybFZhbChjdHJsVmFsUGFyYW06YW55LGVsZW1PYmo6YW55KVxuICB7XG4gICAgbGV0IGR5bkRhdGEgICAgICAgPSBjdHJsVmFsUGFyYW1bJ2R5bkRhdGFPYmonXTtcbiAgICBsZXQgZWxtVmFsICAgICAgICA9IGN0cmxWYWxQYXJhbVsnY3RybFZhbCddO1xuICAgIGxldCBkcmZ0U3RzICAgICAgID0gY3RybFZhbFBhcmFtWydkcmZ0U3RzJ107XG4gICAgbGV0IGRpc3BOblN0cyAgICAgPSBjdHJsVmFsUGFyYW1bJ2Rpc3BOblN0cyddO1xuICAgIGxldCBzZWN0bkN0cmxUeXBlID0gY3RybFZhbFBhcmFtWydjdHJsVHlwZSddO1xuICAgIGxldCBjdHJsTm0gICAgICA9ICcnO1xuICAgIGxldCBsYmxOYW1lICAgICA9ICcnO1xuICAgIGxldCBjdHJsVHlwZSAgICA9IDA7XG4gICAgbGV0IG1uZFN0cyAgICAgID0gMDtcbiAgICBsZXQgZmxkTG5ndGggICAgPSAwO1xuICAgIGlmKHNlY3RuQ3RybFR5cGU9PTgpXG4gICAge1xuICAgICAgY3RybE5tICAgICAgPSAnJztcbiAgICAgIGxibE5hbWUgICAgID0gZHluRGF0YVsnY29sdW1uTmFtZSddO1xuICAgICAgY3RybFR5cGUgICAgPSBkeW5EYXRhWydjb2x1bW5UeXBlJ107XG4gICAgICBtbmRTdHMgICAgICA9IChkaXNwTm5TdHM9PT1mYWxzZSk/ZHluRGF0YVsnY29sdW1uTW5kJ106MDtcbiAgICAgIGZsZExuZ3RoICAgID0gZHluRGF0YVsnZmllbGRMZW4nXTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGN0cmxObSAgICAgID0gZHluRGF0YVsnanNuQ29udHJvbEFycmF5J11bMF1bJ2N0cmxOYW1lJ107XG4gICAgICBsYmxOYW1lICAgICA9IGR5bkRhdGFbJ3ZjaExhYmVsTmFtZSddO1xuICAgICAgY3RybFR5cGUgICAgPSBkeW5EYXRhWyd0aW5Db250cm9sVHlwZSddO1xuICAgICAgbW5kU3RzICAgICAgPSAoZGlzcE5uU3RzPT09ZmFsc2UpP2R5bkRhdGFbJ3Rpbk1hbmRhdG9yeVN0cyddOjA7XG4gICAgICBmbGRMbmd0aCAgICA9IGR5bkRhdGFbJ2ludEZpZWxkTGVuZ3RoJ107XG4gICAgfVxuXG4gICAgbGV0IHZhbFN0cyA9IHRydWU7XG5cbiAgICAvLyBmb3Igc2VsZWN0IHRhZ1xuICAgIGlmIChtbmRTdHM9PTEgJiYgY3RybFR5cGU9PTIpIHtcbiAgICAgIGlmKGRyZnRTdHM9PWZhbHNlKVxuICAgICAge1xuICAgICAgICBpZighdGhpcy5zZWxlY3REcm9wZG93bihlbG1WYWwsbGJsTmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBmb3IgcmFkaW8gYnV0dG9uXG4gICAgZWxzZSBpZiAobW5kU3RzPT0xICYmIChjdHJsVHlwZT09NSB8fCBjdHJsVHlwZT09MSkpIHtcbiAgICAgIGlmKGRyZnRTdHM9PWZhbHNlKVxuICAgICAge1xuICAgICAgICBpZighdGhpcy5ibGFua0NoZWNrUmRvRHluYW1pYyhjdHJsTm0sbGJsTmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBmb3IgdGV4dCBib3hcbiAgICBlbHNlIGlmIChtbmRTdHM9PTEgJiYgY3RybFR5cGU9PTYpIHs7XG4gICAgICBpZihkcmZ0U3RzPT1mYWxzZSlcbiAgICAgIHtcbiAgICAgICAgaWYoIXRoaXMuYmxhbmtDaGVjayhlbG1WYWwsbGJsTmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcbiAgICAgICAgICAvL2R5bkRhdGEuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoIXRoaXMubWF4TGVuZ3RoKGVsbVZhbCxmbGRMbmd0aCxsYmxOYW1lKSlcbiAgICAgIHtcbiAgICAgICAgdmFsU3RzID0gZmFsc2U7XG4gICAgICAgIC8vZHluRGF0YS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBmb3IgdGV4dCBhcmVhXG4gICAgZWxzZSBpZiAobW5kU3RzPT0xICYmIGN0cmxUeXBlPT03KSB7XG4gICAgICBpZihkcmZ0U3RzPT1mYWxzZSlcbiAgICAgIHtcbiAgICAgICAgaWYoIXRoaXMuYmxhbmtDaGVjayhlbG1WYWwsbGJsTmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcbiAgICAgICAgICAvL2R5bkRhdGEuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoIXRoaXMubWF4TGVuZ3RoKGVsbVZhbCxmbGRMbmd0aCxsYmxOYW1lKSlcbiAgICAgIHtcbiAgICAgICAgdmFsU3RzID0gZmFsc2U7XG4gICAgICAgIC8vZHluRGF0YS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBkYXRlIGJveFxuICAgIGVsc2UgaWYgKG1uZFN0cz09MSAmJiBjdHJsVHlwZT09OSkge1xuICAgICAgaWYoZHJmdFN0cz09ZmFsc2UpXG4gICAgICB7XG4gICAgICAgIGlmKCF0aGlzLmJsYW5rQ2hlY2soZWxtVmFsLGxibE5hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgdmFsU3RzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3IgdGltZSBib3hcbiAgICBlbHNlIGlmIChtbmRTdHM9PTEgJiYgY3RybFR5cGU9PTEwKSB7XG4gICAgICBpZihkcmZ0U3RzPT1mYWxzZSlcbiAgICAgIHtcbiAgICAgICAgaWYoIXRoaXMuYmxhbmtDaGVjayhlbG1WYWwsbGJsTmFtZSkpXG4gICAgICAgIHtcbiAgICAgICAgICB2YWxTdHMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvciBkYXRlIHRpbWUgYm94XG4gICAgZWxzZSBpZiAobW5kU3RzPT0xICYmIGN0cmxUeXBlPT0xMSkge1xuICAgICAgaWYoZHJmdFN0cz09ZmFsc2UpXG4gICAgICB7XG4gICAgICAgIGlmKCF0aGlzLmJsYW5rQ2hlY2soZWxtVmFsLGxibE5hbWUpKVxuICAgICAgICB7XG4gICAgICAgICAgdmFsU3RzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBlbHNle1xuICAgICAgdmFsU3RzID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbFN0cztcbiAgfVxuXG4gIGlzRGFzaFNsYXNoTnVtZXJpYyhldmVudDphbnkpe1xuICAgIGxldCBjaGFyQ29kZSA9IChldmVudC53aGljaCkgPyBldmVudC53aGljaCA6IGV2ZW50LmtleUNvZGVcbiAgICAvLyBjb25zb2xlLmxvZyhjaGFyQ29kZSk7XG4gICAgaWYgKGNoYXJDb2RlID4gMzEgJiYgKGNoYXJDb2RlIDwgNDUgfHwgY2hhckNvZGUgPiA1NyB8fCBjaGFyQ29kZT09NDYpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaXNEYXNoU2xhc2hOdW1lcmljTW9iKHZhbDogYW55KSB7XG4gICAgcmV0dXJuIHZhbC5yZXBsYWNlKC9bXjAtOS8tXS9nLCAnJyk7XG4gIH1cbiAgaXNfdXJsKHN0cjphbnkpXG4gIHtcbiAgICBpZihzdHI9PScnIHx8IHN0ciA9PSBudWxsKVxuICB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZWxzZVxuICB7IFxuICAgICAgLy8gbGV0IHJlZ2V4cCA9ICAvXig/Oig/Omh0dHBzP3xmdHApOlxcL1xcLyk/KD86KD8hKD86MTB8MTI3KSg/OlxcLlxcZHsxLDN9KXszfSkoPyEoPzoxNjlcXC4yNTR8MTkyXFwuMTY4KSg/OlxcLlxcZHsxLDN9KXsyfSkoPyExNzJcXC4oPzoxWzYtOV18MlxcZHwzWzAtMV0pKD86XFwuXFxkezEsM30pezJ9KSg/OlsxLTldXFxkP3wxXFxkXFxkfDJbMDFdXFxkfDIyWzAtM10pKD86XFwuKD86MT9cXGR7MSwyfXwyWzAtNF1cXGR8MjVbMC01XSkpezJ9KD86XFwuKD86WzEtOV1cXGQ/fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNF0pKXwoPzooPzpbYS16XFx1MDBhMS1cXHVmZmZmMC05XS0qKSpbYS16XFx1MDBhMS1cXHVmZmZmMC05XSspKD86XFwuKD86W2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0tKikqW2EtelxcdTAwYTEtXFx1ZmZmZjAtOV0rKSooPzpcXC4oPzpbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH0pKSkoPzo6XFxkezIsNX0pPyg/OlxcL1xcUyopPyQvO1xuICAgICAgbGV0IHJlZ2V4cD0vXmh0dHBzP1xcOlxcL1xcL1teXFwvXFxzXSsoXFwvLiopPyQvOyAgICAgIC8vQWNjZXB0IGJvdGggcHJpdmF0ZSBhbmQgZG9tYWluIGFwaSB1cmxcbiAgICAgIGlmIChyZWdleHAudGVzdChzdHIpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnRW50ZXIgdmFsaWQgVVJMJylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgfVxuICB9XG4gIGNoa1Bhc3N3b3JkKHN0cjphbnkpXG4gIHtcbiAgICBsZXQgcmVnZXhwID0gIC9eKD89LipcXGQpKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qW15hLXpBLVowLTldKSg/IS4qXFxzKS57OCwxNX0kLztcbiAgICAgICAgICBpZiAocmVnZXhwLnRlc3Qoc3RyKSlcbiAgICAgICAgICB7XG4gICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgdGV4dDogJ0VudGVyIHZhbGlkIFBhc3N3b3JkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICB9XG4gIGNoa2JsYW5rc3BhY2Uoc3RyOmFueSlcbiAge1xuICAgIHZhciByZWdleHAgPSAvXlxcUyokL1xuICAgICAgICAgIGlmIChyZWdleHAudGVzdChzdHIpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAge1xuICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgdGV4dDogJ1NwYWNlIG5vdCBhbGxvd2VkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICB9XG4gIHZhbGlkYXRlRmlsZShmaWxlVXBsb2FkVHlwZTogc3RyaW5nICxhY3R1YWxGaWxlVHlwZTphbnkpIHtcbiAgICB2YXIgZXh0ID0gZmlsZVVwbG9hZFR5cGUuc3Vic3RyaW5nKGZpbGVVcGxvYWRUeXBlLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICBjb25zdCBmaWxlVHlwZXMgOmFueT1cbiAgICB7XCJwZGZcIiAgOlsncGRmJ10sXG4gICAgXCJpbWFnZVwiIDpbJ2pwZWcnLCAnanBlJywgJ3BuZycsICdnaWYnLCdqcGcnXSxcbiAgICBcImV4Y2VsXCIgOlsnY3N2JywgJ2RiZicsICdodG0nLCdodG1sJywnbWh0JywgJ21odG1sJywgJ29kcycsJ3BkZicsICdwcm4nLCAgJ3R4dCcsICd4bGEnLCAneGxhbScsICd4bHMnLCAneGxzYicsICd4bHN4JywneGx0JywgJ3hsdG0nLCAneGxzJywgJ3hsc2InLCAneGxzbScsICd4bHN4JywneGx3JywgJ3hwcyddLFxuICAgIFwiZG9jXCIgICA6Wydkb2MnLCAnZG9jbScsICdkb2N4JywgJ2RvdCcsJ2RvdG0nLCAnZG90eCcsJ2h0bScsICdodG1sJywgJ21odCcsICdtaHRtbCcsICdvZHQnLCAncGRmJywgJ3J0ZicsICd0eHQnLCAnd3BzJywgJ3htbCcsJ3hwcycsJ21zd29yZCddLFxuICAgIFwidmlkZW9cIiA6WydtcDQnLCdvZ3gnLCdvZ2EnLCdvZ3YnLCdvZ2cnLCd3ZWJtJ10sXG4gICAgXCJhdWRpb1wiOlsnbXAzJywnbXBlZyddXG4gIH07XG4gICAgIGlmIChmaWxlVHlwZXNbYWN0dWFsRmlsZVR5cGVdLmluY2x1ZGVzKGV4dCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgIH1cbiAgICAgZWxzZSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgIH1cbn1cbiAgICB2YWxpZGF0ZUZpbGVTaXplKHVwbG9hZGVkRmlsZVNpemU6YW55LGFjdHVhbEZpbGVTaXplOmFueSxhY3R1YWxGaWxlU2l6ZVR5cGU6YW55KVxuICAgIHtcblxuICAgICAgaWYgKGFjdHVhbEZpbGVTaXplVHlwZS50b0xvd2VyQ2FzZSgpID09ICdrYicpXG4gICAgICB7XG4gICAgICAgIGFjdHVhbEZpbGVTaXplID0gMTAyNCphY3R1YWxGaWxlU2l6ZTtcbiAgICAgIH1cbiAgICAgIGVsc2VcbiAgICAgIHtcbiAgICAgICAgYWN0dWFsRmlsZVNpemUgPSAxMDI0KjEwMjQqYWN0dWFsRmlsZVNpemU7XG4gICAgICB9XG5cbiAgICAgIGxldCBmaWxlVmFsaWRTdGF0dXMgPSB0cnVlO1xuICAgICAgICBpZih1cGxvYWRlZEZpbGVTaXplID4gYWN0dWFsRmlsZVNpemUpXG4gICAgICAgICAge1xuICAgICAgICAgICAgZmlsZVZhbGlkU3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgcmV0dXJuIGZpbGVWYWxpZFN0YXR1cztcbiAgICB9XG5cbiAgICB0YWJsZW5hbWV2YWwob2JqOmFueSkge1xuICAgICAgb2JqLnRhcmdldC52YWx1ZT1vYmoudGFyZ2V0LnZhbHVlLnRvVXBwZXJDYXNlKCkucmVwbGFjZUFsbChcIi1cIiwgXCJfXCIpO1xuICAgIH1cblxuICAgIGNoZWNrRm9yU3BhY2VJbkFsbFBvc3Rpb24oZXZ0OmFueSlcbiAgICAgIHtcbiAgICAgICAgaWYoZXZ0LnRhcmdldC52YWx1ZS5pbmRleE9mKCcgJykgPiAwKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgIHRleHQ6ICdTcGFjZSBub3QgYWxsb3dlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGV2dC50YXJnZXQuaWQpKS52YWx1ZT0nJztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIH1cblxuICAgICAgLy8gc3BscmVnYXhWYWxpZGF0aW9uKG9iajphbnkpXG4gICAgICAvLyB7XG4gICAgICAvLyAgIGxldCByZWdleHA9L1shQCMkJV4mKigpK1xcPVxcW1xcXXt9Oyc6XCJcXFxcfCwuPD5cXC8/XS87XG4gICAgICAvLyAgIGlmIChyZWdleHAudGVzdChvYmopKVxuICAgICAgLy8gICAgICAgICB7XG4gICAgICAvLyAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyAgICAgICAgIH1cbiAgICAgIC8vICAgICAgICAgZWxzZVxuICAgICAgLy8gICAgICAgICB7XG4gICAgICAvLyAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgIC8vICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAvLyAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbUNvbmZpZ1NlcnYubGFuZ1JlcGxhY2UoJ1NwZWNpYWwgY2hhcmFjdGVyIG5vdCBhbGxvd2VkIGV4Y2VwdCBfJylcbiAgICAgIC8vICAgICAgICAgICB9KTtcbiAgICAgIC8vICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyAgICAgICAgIH1cbiAgICAgIC8vIH1cblxuICAgIFxuICAgICAgXG4gICAgICBjb250YWluc1NwZWNpYWxDaGFycyhzdHI6YW55KSB7XG4gICAgICAgIGNvbnN0IHNwZWNpYWxDaGFycyA9IC9bYCFAIyQlXiYqKClfK1xcLT1cXFtcXF17fTsnOlwiXFxcXHwsLjw+XFwvP35dLztcbiAgXG4gICAgICAgIGlmIChzcGVjaWFsQ2hhcnMudGVzdChzdHIpKVxuICAgICAgICB7XG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICBcbiAgICAgIC8vICByZXR1cm4gc3BlY2lhbENoYXJzLnRlc3Qoc3RyKTtcbiAgICAgIH1cbn1cbiJdfQ==