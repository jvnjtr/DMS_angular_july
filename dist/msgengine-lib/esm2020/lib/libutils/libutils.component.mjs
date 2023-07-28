import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { Buffer } from 'buffer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
import * as i3 from "../msgengine-lib.service";
import * as i4 from "../encrypy-decrpy.service";
import * as i5 from "../varlist.service";
import * as i6 from "@ng-bootstrap/ng-bootstrap";
import * as i7 from "../translate.pipe";
export class LibutilsComponent {
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
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Please select the record you want to delete') + '.',
            });
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
                    this.commonserveice.deleteAll(letterParams, ftype).subscribe((response) => {
                        // console.log(response);
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
                                Swal.fire({
                                    icon: 'error',
                                    text: this.commonserveice.langReplace(this.varlist.invalidResponse),
                                });
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    text: this.commonserveice.langReplace(this.varlist.somethingWrong),
                                });
                            }
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: this.commonserveice.langReplace(this.varlist.errorApiResponse),
                            });
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
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Please select the unpublished record to publish') + '.',
            });
            return;
        }
        if (ids.length == 0) {
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Please select the record you want to publish') + '.',
            });
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
                    this.commonserveice.publishAll(letterParams, ftype).subscribe((response) => {
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
                                Swal.fire({
                                    icon: 'error',
                                    text: this.commonserveice.langReplace(this.varlist.invalidResponse),
                                });
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    text: this.commonserveice.langReplace(this.varlist.somethingWrong),
                                });
                            }
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: " ",
                            });
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
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Please select the published record to unpublish') + '.',
            });
            return;
        }
        if (ids.length == 0) {
            Swal.fire({
                icon: 'error',
                text: this.commonserveice.langReplace('Please select the record you want to unpublish') + '.',
            });
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
                    this.commonserveice.unpublishAll(letterParams, ftype).subscribe((response) => {
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
                                Swal.fire({
                                    icon: 'error',
                                    text: this.commonserveice.langReplace(this.varlist.invalidResponse),
                                });
                            }
                            else {
                                Swal.fire({
                                    icon: 'error',
                                    text: this.commonserveice.langReplace(this.varlist.somethingWrong),
                                });
                            }
                        }
                        else {
                            Swal.fire({
                                icon: 'error',
                                text: this.commonserveice.langReplace(this.varlist.errorApiResponse),
                            });
                        }
                    });
                }
            });
        }
    }
}
LibutilsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibutilsComponent, deps: [{ token: i1.HttpClient }, { token: i2.Location }, { token: i3.MsgengineLibService }, { token: i4.EncrypyDecrpyService }, { token: i5.VarlistService }], target: i0.ɵɵFactoryTarget.Component });
LibutilsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: LibutilsComponent, selector: "lib-libutils", inputs: { childMessage: "childMessage", sendIds: "sendIds", funType: "funType", pubUnpubStatus: "pubUnpubStatus", reloadUrl: "reloadUrl" }, outputs: { callfunction: "callfunction", callfunction3: "callfunction3" }, ngImport: i0, template: " <div [ngSwitch]=\"childMessage.utilName\">\n    <div *ngSwitchCase=\"'mandatory'\">\n          <p class=\"ml-2\">( * )  {{'Indicates Mandatory Fields'| translate}} .</p>\n      </div>\n      <div *ngSwitchCase=\"'search'\">\n              <a  id=\"searchicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Search'| translate}}\" title=\"\" (click)=\"opensearch()\" data-original-title=\"Search\"><i class=\"icon-search1\"></i></a>\n          </div>\n      <div *ngSwitchCase=\"'print'\">\n              <a  id=\"printicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Print'| translate}}\" title=\"\" (click)=\"printTable()\"  data-original-title=\"Print\"><i class=\"icon-print-solid\"></i></a>   \n      </div>\n     \n      <div *ngSwitchCase=\"'delete'\">\n              <a  id=\"deleteicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Delete'| translate}}\" title=\"\" (click)=\"deleteAll(sendIds,funType)\"  data-original-title=\"Delete\"><i class=\"icon-trash-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'publish'\">\n          <a  id=\"publishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Publish'| translate}}\" title=\"\" (click)=\"publishAll(sendIds,funType,pubUnpubStatus)\"  data-original-title=\"Publish\"><i class=\"icon-volume-up-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'unpublish'\">\n          <a  id=\"unpublishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Unpublish'| translate}}\" title=\"\" (click)=\"unpublishAll(sendIds,funType,pubUnpubStatus)\" data-original-title=\"Unpublish\"><i class=\"icon-volume-off-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'download'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"downloadicon\" ngbTooltip=\"{{'Download'| translate}}\" data-original-title=\"Download\"><i class=\"icon-download-solid\"></i></a>\n          </div>\n          <div *ngSwitchCase=\"'back'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"backicon\" ngbTooltip=\"{{'Back'| translate}}\" (click)=\"backClicked()\" data-original-title=\"Back\"><i class=\"icon-arrow-left-solid\"></i></a>\n          </div>\n      <div *ngSwitchDefault></div>\n    </div> \n\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i6.NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "triggers", "container", "disableTooltip", "tooltipClass", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }, { kind: "pipe", type: i7.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibutilsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-libutils', template: " <div [ngSwitch]=\"childMessage.utilName\">\n    <div *ngSwitchCase=\"'mandatory'\">\n          <p class=\"ml-2\">( * )  {{'Indicates Mandatory Fields'| translate}} .</p>\n      </div>\n      <div *ngSwitchCase=\"'search'\">\n              <a  id=\"searchicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Search'| translate}}\" title=\"\" (click)=\"opensearch()\" data-original-title=\"Search\"><i class=\"icon-search1\"></i></a>\n          </div>\n      <div *ngSwitchCase=\"'print'\">\n              <a  id=\"printicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Print'| translate}}\" title=\"\" (click)=\"printTable()\"  data-original-title=\"Print\"><i class=\"icon-print-solid\"></i></a>   \n      </div>\n     \n      <div *ngSwitchCase=\"'delete'\">\n              <a  id=\"deleteicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Delete'| translate}}\" title=\"\" (click)=\"deleteAll(sendIds,funType)\"  data-original-title=\"Delete\"><i class=\"icon-trash-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'publish'\">\n          <a  id=\"publishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Publish'| translate}}\" title=\"\" (click)=\"publishAll(sendIds,funType,pubUnpubStatus)\"  data-original-title=\"Publish\"><i class=\"icon-volume-up-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'unpublish'\">\n          <a  id=\"unpublishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Unpublish'| translate}}\" title=\"\" (click)=\"unpublishAll(sendIds,funType,pubUnpubStatus)\" data-original-title=\"Unpublish\"><i class=\"icon-volume-off-solid\"></i></a>\n      </div>\n      <div *ngSwitchCase=\"'download'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"downloadicon\" ngbTooltip=\"{{'Download'| translate}}\" data-original-title=\"Download\"><i class=\"icon-download-solid\"></i></a>\n          </div>\n          <div *ngSwitchCase=\"'back'\">\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"backicon\" ngbTooltip=\"{{'Back'| translate}}\" (click)=\"backClicked()\" data-original-title=\"Back\"><i class=\"icon-arrow-left-solid\"></i></a>\n          </div>\n      <div *ngSwitchDefault></div>\n    </div> \n\n" }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.Location }, { type: i3.MsgengineLibService }, { type: i4.EncrypyDecrpyService }, { type: i5.VarlistService }]; }, propDecorators: { childMessage: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlidXRpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL2xpYnV0aWxzL2xpYnV0aWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21zZ2VuZ2luZS1saWIvc3JjL2xpYi9saWJ1dGlscy9saWJ1dGlscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQztBQUMvQixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUd0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7QUFVaEMsTUFBTSxPQUFPLGlCQUFpQjtJQWU1QixZQUNVLFVBQXNCLEVBQ3RCLFNBQW1CLEVBQ3BCLGNBQWtDLEVBQ2pDLE1BQTRCLEVBQzVCLE9BQXNCO1FBSnRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFDNUIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQWRSLGlCQUFZLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsa0JBQWEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWdCN0UsQ0FBQztJQUVGLFFBQVE7SUFDUixDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksYUFBYSxHQUFPLFFBQVEsQ0FB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LENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO2lDQUNsRSxDQUFDLENBQUM7NkJBQ0o7aUNBQ0k7Z0NBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQztvQ0FDUixJQUFJLEVBQUUsT0FBTztvQ0FDYixJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7aUNBRW5FLENBQUMsQ0FBQzs2QkFDSjt5QkFDRjs2QkFBTTs0QkFFTCxJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUNSLElBQUksRUFBRSxPQUFPO2dDQUNaLElBQUksRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDOzZCQUNyRSxDQUFDLENBQUM7eUJBQ0o7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQzs7K0dBM1VVLGlCQUFpQjttR0FBakIsaUJBQWlCLDJRQ3JCOUIseW9FQTZCQTs0RkRSYSxpQkFBaUI7a0JBTDdCLFNBQVM7K0JBQ0UsY0FBYzswTkFNZixZQUFZO3NCQUFwQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDa0IsWUFBWTtzQkFBbkMsTUFBTTt1QkFBQyxjQUFjO2dCQUNHLGFBQWE7c0JBQXJDLE1BQU07dUJBQUMsZUFBZTtnQkFDaEIsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbmNyeXB5RGVjcnB5U2VydmljZSB9IGZyb20gJy4uL2VuY3J5cHktZGVjcnB5LnNlcnZpY2UnO1xuaW1wb3J0IHsgTXNnZW5naW5lTGliU2VydmljZSB9IGZyb20gJy4uL21zZ2VuZ2luZS1saWIuc2VydmljZSc7XG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XG5pbXBvcnQgKiBhcyBDcnlwdG9KUyBmcm9tICdjcnlwdG8tanMnO1xuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcic7XG5pbXBvcnQgeyBWYXJsaXN0U2VydmljZSB9IGZyb20gJy4uL3Zhcmxpc3Quc2VydmljZSc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbGlidXRpbHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGlidXRpbHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saWJ1dGlscy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlidXRpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBtZXNzYWdlOmFueTtcbiAgQElucHV0KCkgY2hpbGRNZXNzYWdlOmFueTtcbiAgQElucHV0KCkgc2VuZElkczphbnk7XG4gIEBJbnB1dCgpIGZ1blR5cGU6YW55O1xuICBASW5wdXQoKSBwdWJVbnB1YlN0YXR1czogYW55O1xuICBAT3V0cHV0KFwiY2FsbGZ1bmN0aW9uXCIpIGNhbGxmdW5jdGlvbjpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dChcImNhbGxmdW5jdGlvbjNcIikgY2FsbGZ1bmN0aW9uMzpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbkBJbnB1dCgpIHJlbG9hZFVybDphbnk7XG5cblxuXG5cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIF9sb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHVibGljIGNvbW1vbnNlcnZlaWNlOk1zZ2VuZ2luZUxpYlNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbmNEZWM6IEVuY3J5cHlEZWNycHlTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmFybGlzdDpWYXJsaXN0U2VydmljZVxuICApIHtcbiAgXG4gICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cbiAgb3BlbnNlYXJjaCgpe1xuICAgIGxldCBzZWFyY2hjb250ZW50OmFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWNvbnRhaW5lclwiKTtcbiAgXG4gICAgaWYoc2VhcmNoY29udGVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgc2VhcmNoY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VhcmNoY29udGVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH1cbiAgICAvLyBsZXQgZWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50Pjx1bmtub3duPmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWFyY2gtY29udGFpbmVyXCIpO1xuICAgIC8vIGFsZXJ0KGVsZW1lbnQpXG4gICAgLy8gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xuICBcblxuICAgLy8gJChcIi5zZWFyY2gtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgcHJpbnRUYWJsZSgpe1xuICAgIGxldCBwcmludENvbnRlbnRzOmFueTtcbiAgICBsZXQgcG9wdXBXaW46YW55O1xuICAgIHByaW50Q29udGVudHMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmludC1zZWN0aW9uXCIpPy5pbm5lckhUTUw7XG4gICAgcG9wdXBXaW4gPSB3aW5kb3cub3BlbignJywgJ19ibGFuaycsICd0b3A9MCxsZWZ0PTAsaGVpZ2h0PTEwMCUsd2lkdGg9YXV0bycpO1xuICAgIHBvcHVwV2luLmRvY3VtZW50Lm9wZW4oKTtcbiAgICBwb3B1cFdpbi5kb2N1bWVudC53cml0ZShgXG4gIDxodG1sPlxuICAgIDxoZWFkPlxuICAgIDxsaW5rIGhyZWY9XCIuLi8uLi9hc3NldHMvY3NzL3ByaW50LmNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIj5cbiAgICAgXG4gICAgPC9oZWFkPlxuPGJvZHkgb25sb2FkPVwid2luZG93LnByaW50KCk7d2luZG93LmNsb3NlKClcIj5cbjxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbjxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltZy9sb2dvYmxhY2sucG5nXCI+XG48L2Rpdj5cblxuJHtwcmludENvbnRlbnRzfTwvYm9keT5cbiAgPC9odG1sPmBcbiAgICApO1xuICAgIHBvcHVwV2luLmRvY3VtZW50LmNsb3NlKCk7XG4gIH1cblxuICBkZWxldGVBbGwoaWRzOmFueSxmdHlwZTphbnkpIHtcbiAgICBpZiAoaWRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBTd2FsLmZpcmUoe1xuICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICB0ZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQbGVhc2Ugc2VsZWN0IHRoZSByZWNvcmQgeW91IHdhbnQgdG8gZGVsZXRlJykgKyAnLicsXG5cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBpdGVtaWRzID0gaWRzLnRvU3RyaW5nKCk7XG5cbiAgICAgIGxldCBsZXR0ZXJQYXJhbXMgPSB7XG4gICAgICAgIFwiaXRlbUlkXCI6IGl0ZW1pZHMsXG4gICAgICAgIFwiaXRlbVN0YXR1c1wiOiBcIjFcIlxuICAgICAgfTtcblxuICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ0FyZSB5b3Ugc3VyZScpICsgJz8nLFxuICAgICAgICB0ZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKFwiWW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcmVjb3JkXCIpLFxuICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ0NhbmNlbCcpLFxuICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcbiAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1llcycpICsgJywgJyArIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ2RlbGV0ZSBpdCcpICsgJyEnXG4gICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LmlzQ29uZmlybWVkKSB7XG4gICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5kZWxldGVBbGwobGV0dGVyUGFyYW1zLCBmdHlwZSkuc3Vic2NyaWJlKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICBsZXQgcmVzcERhdGEgPSByZXNwb25zZS5SRVNQT05TRV9EQVRBO1xuICAgICAgICAgICAgbGV0IHJlc3BUb2tlbiA9IHJlc3BvbnNlLlJFU1BPTlNFX1RPS0VOO1xuICAgICAgICAgICAgbGV0IHZlcmlmeVRva2VuID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihyZXNwRGF0YSwgdGhpcy52YXJsaXN0LmFwaUhhc2hpbmdLZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwVG9rZW4pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmVyaWZ5VG9rZW4pO1xuXG4gICAgICAgICAgICBpZiAocmVzcFRva2VuID09IHZlcmlmeVRva2VuKSB7XG4gICAgICAgICAgICAgIGxldCByZXM6IGFueSA9IEJ1ZmZlci5mcm9tKHJlc3BEYXRhLCAnYmFzZTY0Jyk7XG4gICAgICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuc3RhdHVzKTtcblxuICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBTd2FsLmZpcmUoXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdEZWxldGVkJykrJyAhJyxcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1JlY29yZCBoYXMgYmVlbiBkZWxldGVkJyksXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAvLyAkKCcuY2hlY2tBbGwnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGZ1bmN0aW9uLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxmdW5jdGlvbjMuZW1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT0gNDE3KSB7XG4gICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgIHRleHQ6dGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3QuaW52YWxpZFJlc3BvbnNlKSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3Quc29tZXRoaW5nV3JvbmcpLFxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgdGV4dDp0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5lcnJvckFwaVJlc3BvbnNlKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICB9XG4gICAgICB9KVxuXG5cblxuICAgIH1cbiAgfVxuICBiYWNrQ2xpY2tlZCgpIHtcbiAgICB0aGlzLl9sb2NhdGlvbi5iYWNrKCk7XG4gIH1cbiAgcHVibGlzaEFsbChpZHM6YW55LGZ0eXBlOmFueSxwdWJVbnB1YlN0YXR1czogYW55KSB7XG4gICAgbGV0IHB1YmVycm9TdGF0dXM6IGFueSA9IDA7XG4gICAgZm9yIChsZXQga2xwIG9mIHB1YlVucHViU3RhdHVzKSB7XG5cbiAgICAgIGlmIChrbHAucHVibGlzaFVucHVibGlzU3RhdHVzID09IDEpIHtcbiAgICAgICAgcHViZXJyb1N0YXR1cyA9IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHViZXJyb1N0YXR1cyA9PSAxKSB7XG4gICAgICBTd2FsLmZpcmUoe1xuICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICB0ZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQbGVhc2Ugc2VsZWN0IHRoZSB1bnB1Ymxpc2hlZCByZWNvcmQgdG8gcHVibGlzaCcpICsgJy4nLFxuXG4gICAgICB9KTtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChpZHMubGVuZ3RoID09IDApIHtcbiAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1BsZWFzZSBzZWxlY3QgdGhlIHJlY29yZCB5b3Ugd2FudCB0byBwdWJsaXNoJykgKyAnLicsXG5cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcblxuICAgICAgbGV0IGl0ZW1pZHMgPSBpZHMudG9TdHJpbmcoKTtcblxuICAgICAgbGV0IGxldHRlclBhcmFtcyA9IHtcbiAgICAgICAgXCJpdGVtSWRcIjogaXRlbWlkcyxcbiAgICAgICAgXCJpdGVtU3RhdHVzXCI6IFwiMlwiXG4gICAgICB9O1xuXG4gICAgICBTd2FsLmZpcmUoe1xuICAgICAgICB0ZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKFwiWW91IHdhbnQgdG8gcHVibGlzaCB0aGlzIHJlY29yZFwiKSxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdDYW5jZWwnKSxcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdZZXMnKSArICcsICcgKyB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdwdWJsaXNoIGl0JykgKyAnISdcbiAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG5cbiAgICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xuXG4gICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5wdWJsaXNoQWxsKGxldHRlclBhcmFtcywgZnR5cGUpLnN1YnNjcmliZSgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3BEYXRhID0gcmVzcG9uc2UuUkVTUE9OU0VfREFUQTtcbiAgICAgICAgICAgIGxldCByZXNwVG9rZW4gPSByZXNwb25zZS5SRVNQT05TRV9UT0tFTjtcbiAgICAgICAgICAgIGxldCB2ZXJpZnlUb2tlbiA9IENyeXB0b0pTLkhtYWNTSEEyNTYocmVzcERhdGEsIHRoaXMudmFybGlzdC5hcGlIYXNoaW5nS2V5KS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHJlc3BUb2tlbiA9PSB2ZXJpZnlUb2tlbikge1xuICAgICAgICAgICAgICBsZXQgcmVzOiBhbnkgPSBCdWZmZXIuZnJvbShyZXNwRGF0YSwgJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VSZXN1bHQgPSBKU09OLnBhcnNlKHJlcylcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGlmIChyZXNwb25zZVJlc3VsdC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFN3YWwuZmlyZShcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1B1Ymxpc2hlZCcpKycgIScsXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQdWJsaXNoIFJlY29yZHMgU3VjY2Vzc2Z1bGx5JyksXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAvLyAkKCcuY2hlY2tBbGwnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGZ1bmN0aW9uLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxmdW5jdGlvbjMuZW1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlUmVzdWx0LnN0YXR1cyA9PSA0MTcpIHtcbiAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgdGV4dDp0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5pbnZhbGlkUmVzcG9uc2UpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3Quc29tZXRoaW5nV3JvbmcpLFxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIiBcIixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgIH0pXG5cblxuXG4gICAgfVxuICB9XG4gIHVucHVibGlzaEFsbChpZHM6YW55LGZ0eXBlOmFueSxwdWJVbnB1YlN0YXR1czogYW55KSB7XG4gICAgbGV0IHB1YmVycm9TdGF0dXM6IGFueSA9IDA7XG4gICAgZm9yIChsZXQga2xwIG9mIHB1YlVucHViU3RhdHVzKSB7XG4gICAgICBpZiAoa2xwLnB1Ymxpc2hVbnB1Ymxpc1N0YXR1cyA9PSAwKSB7XG4gICAgICAgIHB1YmVycm9TdGF0dXMgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHB1YmVycm9TdGF0dXMgPT0gMSkge1xuICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnUGxlYXNlIHNlbGVjdCB0aGUgcHVibGlzaGVkIHJlY29yZCB0byB1bnB1Ymxpc2gnKSArICcuJyxcblxuICAgICAgfSk7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaWRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBTd2FsLmZpcmUoe1xuICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICB0ZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQbGVhc2Ugc2VsZWN0IHRoZSByZWNvcmQgeW91IHdhbnQgdG8gdW5wdWJsaXNoJykgKyAnLicsXG5cbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBpdGVtaWRzID0gaWRzLnRvU3RyaW5nKCk7XG5cbiAgICAgIGxldCBsZXR0ZXJQYXJhbXMgPSB7XG4gICAgICAgIFwiaXRlbUlkXCI6IGl0ZW1pZHMsXG4gICAgICAgIFwiaXRlbVN0YXR1c1wiOiBcIjNcIlxuICAgICAgfTtcbiAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoXCJZb3Ugd2FudCB0byB1bnB1Ymxpc2ggdGhpcyByZWNvcmRcIiksXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnQ2FuY2VsJyksXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnWWVzJykgKyAnLCAnICsgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgndW5wdWJsaXNoIGl0JylcbiAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcbiAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnVucHVibGlzaEFsbChsZXR0ZXJQYXJhbXMsIGZ0eXBlKS5zdWJzY3JpYmUoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcmVzcERhdGEgPSByZXNwb25zZS5SRVNQT05TRV9EQVRBO1xuICAgICAgICAgICAgbGV0IHJlc3BUb2tlbiA9IHJlc3BvbnNlLlJFU1BPTlNFX1RPS0VOO1xuICAgICAgICAgICAgbGV0IHZlcmlmeVRva2VuID0gQ3J5cHRvSlMuSG1hY1NIQTI1NihyZXNwRGF0YSwgdGhpcy52YXJsaXN0LmFwaUhhc2hpbmdLZXkpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAocmVzcFRva2VuID09IHZlcmlmeVRva2VuKSB7XG4gICAgICAgICAgICAgIGxldCByZXM6IGFueSA9IEJ1ZmZlci5mcm9tKHJlc3BEYXRhLCAnYmFzZTY0Jyk7XG4gICAgICAgICAgICAgIGxldCByZXNwb25zZVJlc3VsdCA9IEpTT04ucGFyc2UocmVzKVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlUmVzdWx0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBTd2FsLmZpcmUoXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdVbnB1Ymxpc2hlZCcpLFxuICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnVW5wdWJsaXNoIFJlY29yZHMgU3VjY2Vzc2Z1bGx5JykgKyAnLicsXG4gICAgICAgICAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAvLyBhbGVydCgwKVxuICAgICAgICAgICAgICAgIGl0ZW1pZHMgPSAnJztcbiAgICAgICAgICAgICAvLyAgICQoJy5jaGVja0FsbCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24uZW1pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGZ1bmN0aW9uMy5lbWl0KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSA0MTcpIHtcbiAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgdGV4dDp0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5pbnZhbGlkUmVzcG9uc2UpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3Quc29tZXRoaW5nV3JvbmcpLFxuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgdGV4dDp0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5lcnJvckFwaVJlc3BvbnNlKSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCIgPGRpdiBbbmdTd2l0Y2hdPVwiY2hpbGRNZXNzYWdlLnV0aWxOYW1lXCI+XG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ21hbmRhdG9yeSdcIj5cbiAgICAgICAgICA8cCBjbGFzcz1cIm1sLTJcIj4oICogKSAge3snSW5kaWNhdGVzIE1hbmRhdG9yeSBGaWVsZHMnfCB0cmFuc2xhdGV9fSAuPC9wPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc2VhcmNoJ1wiPlxuICAgICAgICAgICAgICA8YSAgaWQ9XCJzZWFyY2hpY29uXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG5nYlRvb2x0aXA9XCJ7eydTZWFyY2gnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cIm9wZW5zZWFyY2goKVwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJTZWFyY2hcIj48aSBjbGFzcz1cImljb24tc2VhcmNoMVwiPjwvaT48L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncHJpbnQnXCI+XG4gICAgICAgICAgICAgIDxhICBpZD1cInByaW50aWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snUHJpbnQnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cInByaW50VGFibGUoKVwiICBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiUHJpbnRcIj48aSBjbGFzcz1cImljb24tcHJpbnQtc29saWRcIj48L2k+PC9hPiAgIFxuICAgICAgPC9kaXY+XG4gICAgIFxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RlbGV0ZSdcIj5cbiAgICAgICAgICAgICAgPGEgIGlkPVwiZGVsZXRlaWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snRGVsZXRlJ3wgdHJhbnNsYXRlfX1cIiB0aXRsZT1cIlwiIChjbGljayk9XCJkZWxldGVBbGwoc2VuZElkcyxmdW5UeXBlKVwiICBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiRGVsZXRlXCI+PGkgY2xhc3M9XCJpY29uLXRyYXNoLXNvbGlkXCI+PC9pPjwvYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3B1Ymxpc2gnXCI+XG4gICAgICAgICAgPGEgIGlkPVwicHVibGlzaGljb25cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgbmdiVG9vbHRpcD1cInt7J1B1Ymxpc2gnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cInB1Ymxpc2hBbGwoc2VuZElkcyxmdW5UeXBlLHB1YlVucHViU3RhdHVzKVwiICBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiUHVibGlzaFwiPjxpIGNsYXNzPVwiaWNvbi12b2x1bWUtdXAtc29saWRcIj48L2k+PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndW5wdWJsaXNoJ1wiPlxuICAgICAgICAgIDxhICBpZD1cInVucHVibGlzaGljb25cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgbmdiVG9vbHRpcD1cInt7J1VucHVibGlzaCd8IHRyYW5zbGF0ZX19XCIgdGl0bGU9XCJcIiAoY2xpY2spPVwidW5wdWJsaXNoQWxsKHNlbmRJZHMsZnVuVHlwZSxwdWJVbnB1YlN0YXR1cylcIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiVW5wdWJsaXNoXCI+PGkgY2xhc3M9XCJpY29uLXZvbHVtZS1vZmYtc29saWRcIj48L2k+PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZG93bmxvYWQnXCI+XG4gICAgICAgICAgICAgIDxhICB0aXRsZT1cIlwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBpZD1cImRvd25sb2FkaWNvblwiIG5nYlRvb2x0aXA9XCJ7eydEb3dubG9hZCd8IHRyYW5zbGF0ZX19XCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cIkRvd25sb2FkXCI+PGkgY2xhc3M9XCJpY29uLWRvd25sb2FkLXNvbGlkXCI+PC9pPjwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInYmFjaydcIj5cbiAgICAgICAgICAgICAgPGEgIHRpdGxlPVwiXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGlkPVwiYmFja2ljb25cIiBuZ2JUb29sdGlwPVwie3snQmFjayd8IHRyYW5zbGF0ZX19XCIgKGNsaWNrKT1cImJhY2tDbGlja2VkKClcIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiQmFja1wiPjxpIGNsYXNzPVwiaWNvbi1hcnJvdy1sZWZ0LXNvbGlkXCI+PC9pPjwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdD48L2Rpdj5cbiAgICA8L2Rpdj4gXG5cbiJdfQ==