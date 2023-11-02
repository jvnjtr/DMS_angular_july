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
LibutilsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibutilsComponent, deps: [{ token: i1.HttpClient }, { token: i2.Location }, { token: i3.MsgengineLibService }, { token: i4.EncrypyDecrpyService }, { token: i5.VarlistService }], target: i0.ɵɵFactoryTarget.Component });
LibutilsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: LibutilsComponent, selector: "lib-libutils", inputs: { childMessage: "childMessage", sendIds: "sendIds", funType: "funType", pubUnpubStatus: "pubUnpubStatus", reloadUrl: "reloadUrl" }, outputs: { callfunction: "callfunction", callfunction3: "callfunction3" }, ngImport: i0, template: " <div [ngSwitch]=\"childMessage.utilName\">\r\n    <div *ngSwitchCase=\"'mandatory'\">\r\n          <p class=\"ml-2\">( * )  {{'Indicates Mandatory Fields'| translate}} .</p>\r\n      </div>\r\n      <div *ngSwitchCase=\"'search'\">\r\n              <a  id=\"searchicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Search'| translate}}\" title=\"\" (click)=\"opensearch()\" data-original-title=\"Search\"><i class=\"icon-search1\"></i></a>\r\n          </div>\r\n      <div *ngSwitchCase=\"'print'\">\r\n              <a  id=\"printicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Print'| translate}}\" title=\"\" (click)=\"printTable()\"  data-original-title=\"Print\"><i class=\"icon-print-solid\"></i></a>   \r\n      </div>\r\n     \r\n      <div *ngSwitchCase=\"'delete'\">\r\n              <a  id=\"deleteicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Delete'| translate}}\" title=\"\" (click)=\"deleteAll(sendIds,funType)\"  data-original-title=\"Delete\"><i class=\"icon-trash-solid\"></i></a>\r\n      </div>\r\n      <div *ngSwitchCase=\"'publish'\">\r\n          <a  id=\"publishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Publish'| translate}}\" title=\"\" (click)=\"publishAll(sendIds,funType,pubUnpubStatus)\"  data-original-title=\"Publish\"><i class=\"icon-volume-up-solid\"></i></a>\r\n      </div>\r\n      <div *ngSwitchCase=\"'unpublish'\">\r\n          <a  id=\"unpublishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Unpublish'| translate}}\" title=\"\" (click)=\"unpublishAll(sendIds,funType,pubUnpubStatus)\" data-original-title=\"Unpublish\"><i class=\"icon-volume-off-solid\"></i></a>\r\n      </div>\r\n      <div *ngSwitchCase=\"'download'\">\r\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"downloadicon\" ngbTooltip=\"{{'Download'| translate}}\" data-original-title=\"Download\"><i class=\"icon-download-solid\"></i></a>\r\n          </div>\r\n          <div *ngSwitchCase=\"'back'\">\r\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"backicon\" ngbTooltip=\"{{'Back'| translate}}\" (click)=\"backClicked()\" data-original-title=\"Back\"><i class=\"icon-arrow-left-solid\"></i></a>\r\n          </div>\r\n      <div *ngSwitchDefault></div>\r\n    </div> \r\n\r\n", styles: [""], dependencies: [{ kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "directive", type: i6.NgbTooltip, selector: "[ngbTooltip]", inputs: ["animation", "autoClose", "placement", "triggers", "container", "disableTooltip", "tooltipClass", "openDelay", "closeDelay", "ngbTooltip"], outputs: ["shown", "hidden"], exportAs: ["ngbTooltip"] }, { kind: "pipe", type: i7.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibutilsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-libutils', template: " <div [ngSwitch]=\"childMessage.utilName\">\r\n    <div *ngSwitchCase=\"'mandatory'\">\r\n          <p class=\"ml-2\">( * )  {{'Indicates Mandatory Fields'| translate}} .</p>\r\n      </div>\r\n      <div *ngSwitchCase=\"'search'\">\r\n              <a  id=\"searchicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Search'| translate}}\" title=\"\" (click)=\"opensearch()\" data-original-title=\"Search\"><i class=\"icon-search1\"></i></a>\r\n          </div>\r\n      <div *ngSwitchCase=\"'print'\">\r\n              <a  id=\"printicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Print'| translate}}\" title=\"\" (click)=\"printTable()\"  data-original-title=\"Print\"><i class=\"icon-print-solid\"></i></a>   \r\n      </div>\r\n     \r\n      <div *ngSwitchCase=\"'delete'\">\r\n              <a  id=\"deleteicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Delete'| translate}}\" title=\"\" (click)=\"deleteAll(sendIds,funType)\"  data-original-title=\"Delete\"><i class=\"icon-trash-solid\"></i></a>\r\n      </div>\r\n      <div *ngSwitchCase=\"'publish'\">\r\n          <a  id=\"publishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Publish'| translate}}\" title=\"\" (click)=\"publishAll(sendIds,funType,pubUnpubStatus)\"  data-original-title=\"Publish\"><i class=\"icon-volume-up-solid\"></i></a>\r\n      </div>\r\n      <div *ngSwitchCase=\"'unpublish'\">\r\n          <a  id=\"unpublishicon\" href=\"javascript:void(0)\" ngbTooltip=\"{{'Unpublish'| translate}}\" title=\"\" (click)=\"unpublishAll(sendIds,funType,pubUnpubStatus)\" data-original-title=\"Unpublish\"><i class=\"icon-volume-off-solid\"></i></a>\r\n      </div>\r\n      <div *ngSwitchCase=\"'download'\">\r\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"downloadicon\" ngbTooltip=\"{{'Download'| translate}}\" data-original-title=\"Download\"><i class=\"icon-download-solid\"></i></a>\r\n          </div>\r\n          <div *ngSwitchCase=\"'back'\">\r\n              <a  title=\"\" href=\"javascript:void(0)\" id=\"backicon\" ngbTooltip=\"{{'Back'| translate}}\" (click)=\"backClicked()\" data-original-title=\"Back\"><i class=\"icon-arrow-left-solid\"></i></a>\r\n          </div>\r\n      <div *ngSwitchDefault></div>\r\n    </div> \r\n\r\n" }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlidXRpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL2xpYnV0aWxzL2xpYnV0aWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21zZ2VuZ2luZS1saWIvc3JjL2xpYi9saWJ1dGlscy9saWJ1dGlscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQztBQUMvQixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUd0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7QUFVaEMsTUFBTSxPQUFPLGlCQUFpQjtJQWU1QixZQUNVLFVBQXNCLEVBQ3RCLFNBQW1CLEVBQ3BCLGNBQWtDLEVBQ2pDLE1BQTRCLEVBQzVCLE9BQXNCO1FBSnRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFDNUIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQWRSLGlCQUFZLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsa0JBQWEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWdCN0UsQ0FBQztJQUVGLFFBQVE7SUFDUixDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksYUFBYSxHQUFPLFFBQVEsQ0FB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LENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtpQ0FFcEc7cUNBQ0k7b0NBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtpQ0FFbkc7NkJBQ0Y7aUNBQU07Z0NBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBOzZCQUVyRzt3QkFDSCxDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLENBQUE7d0JBQzdDLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUVGO1lBQ0gsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7OytHQWhUVSxpQkFBaUI7bUdBQWpCLGlCQUFpQiwyUUNyQjlCLG1zRUE2QkE7NEZEUmEsaUJBQWlCO2tCQUw3QixTQUFTOytCQUNFLGNBQWM7ME5BTWYsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ2tCLFlBQVk7c0JBQW5DLE1BQU07dUJBQUMsY0FBYztnQkFDRyxhQUFhO3NCQUFyQyxNQUFNO3VCQUFDLGVBQWU7Z0JBQ2hCLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEVuY3J5cHlEZWNycHlTZXJ2aWNlIH0gZnJvbSAnLi4vZW5jcnlweS1kZWNycHkuc2VydmljZSc7XHJcbmltcG9ydCB7IE1zZ2VuZ2luZUxpYlNlcnZpY2UgfSBmcm9tICcuLi9tc2dlbmdpbmUtbGliLnNlcnZpY2UnO1xyXG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XHJcbmltcG9ydCAqIGFzIENyeXB0b0pTIGZyb20gJ2NyeXB0by1qcyc7XHJcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAnYnVmZmVyJztcclxuaW1wb3J0IHsgVmFybGlzdFNlcnZpY2UgfSBmcm9tICcuLi92YXJsaXN0LnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi1saWJ1dGlscycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xpYnV0aWxzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9saWJ1dGlscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIExpYnV0aWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBtZXNzYWdlOmFueTtcclxuICBASW5wdXQoKSBjaGlsZE1lc3NhZ2U6YW55O1xyXG4gIEBJbnB1dCgpIHNlbmRJZHM6YW55O1xyXG4gIEBJbnB1dCgpIGZ1blR5cGU6YW55O1xyXG4gIEBJbnB1dCgpIHB1YlVucHViU3RhdHVzOiBhbnk7XHJcbiAgQE91dHB1dChcImNhbGxmdW5jdGlvblwiKSBjYWxsZnVuY3Rpb246RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dChcImNhbGxmdW5jdGlvbjNcIikgY2FsbGZ1bmN0aW9uMzpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuQElucHV0KCkgcmVsb2FkVXJsOmFueTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgaHR0cENsaWVudDogSHR0cENsaWVudCxcclxuICAgIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvbixcclxuICAgIHB1YmxpYyBjb21tb25zZXJ2ZWljZTpNc2dlbmdpbmVMaWJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBlbmNEZWM6IEVuY3J5cHlEZWNycHlTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSB2YXJsaXN0OlZhcmxpc3RTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgXHJcbiAgIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgfVxyXG4gIG9wZW5zZWFyY2goKXtcclxuICAgIGxldCBzZWFyY2hjb250ZW50OmFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWNvbnRhaW5lclwiKTtcclxuICBcclxuICAgIGlmKHNlYXJjaGNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgc2VhcmNoY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgc2VhcmNoY29udGVudC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gbGV0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD48dW5rbm93bj5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VhcmNoLWNvbnRhaW5lclwiKTtcclxuICAgIC8vIGFsZXJ0KGVsZW1lbnQpXHJcbiAgICAvLyBlbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgXHJcblxyXG4gICAvLyAkKFwiLnNlYXJjaC1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgfVxyXG5cclxuICBwcmludFRhYmxlKCl7XHJcbiAgICBsZXQgcHJpbnRDb250ZW50czphbnk7XHJcbiAgICBsZXQgcG9wdXBXaW46YW55O1xyXG4gICAgcHJpbnRDb250ZW50cyA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByaW50LXNlY3Rpb25cIik/LmlubmVySFRNTDtcclxuICAgIHBvcHVwV2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnLCAndG9wPTAsbGVmdD0wLGhlaWdodD0xMDAlLHdpZHRoPWF1dG8nKTtcclxuICAgIHBvcHVwV2luLmRvY3VtZW50Lm9wZW4oKTtcclxuICAgIHBvcHVwV2luLmRvY3VtZW50LndyaXRlKGBcclxuICA8aHRtbD5cclxuICAgIDxoZWFkPlxyXG4gICAgPGxpbmsgaHJlZj1cIi4uLy4uL2Fzc2V0cy9jc3MvcHJpbnQuY3NzXCIgcmVsPVwic3R5bGVzaGVldFwiPlxyXG4gICAgIFxyXG4gICAgPC9oZWFkPlxyXG48Ym9keSBvbmxvYWQ9XCJ3aW5kb3cucHJpbnQoKTt3aW5kb3cuY2xvc2UoKVwiPlxyXG48ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbjxpbWcgc3JjPVwiLi4vLi4vYXNzZXRzL2ltZy9sb2dvYmxhY2sucG5nXCI+XHJcbjwvZGl2PlxyXG5cclxuJHtwcmludENvbnRlbnRzfTwvYm9keT5cclxuICA8L2h0bWw+YFxyXG4gICAgKTtcclxuICAgIHBvcHVwV2luLmRvY3VtZW50LmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBkZWxldGVBbGwoaWRzOmFueSxmdHlwZTphbnkpIHtcclxuICAgIGlmIChpZHMubGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1BsZWFzZSBzZWxlY3QgdGhlIHJlY29yZCB5b3Ugd2FudCB0byBkZWxldGUnKSlcclxuIFxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHZhciBpdGVtaWRzID0gaWRzLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICBsZXQgbGV0dGVyUGFyYW1zID0ge1xyXG4gICAgICAgIFwiaXRlbUlkXCI6IGl0ZW1pZHMsXHJcbiAgICAgICAgXCJpdGVtU3RhdHVzXCI6IFwiMVwiXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdBcmUgeW91IHN1cmUnKSArICc/JyxcclxuICAgICAgICB0ZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKFwiWW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcmVjb3JkXCIpLFxyXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ0NhbmNlbCcpLFxyXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1llcycpICsgJywgJyArIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ2RlbGV0ZSBpdCcpICsgJyEnXHJcbiAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmRlbGV0ZUFsbChsZXR0ZXJQYXJhbXMsIGZ0eXBlKS5zdWJzY3JpYmUoe1xyXG4gIG5leHQ6IChyZXNwb25zZSkgPT4ge1xyXG4gICAgbGV0IHJlc3BEYXRhID0gcmVzcG9uc2UuUkVTUE9OU0VfREFUQTtcclxuICAgIGxldCByZXNwVG9rZW4gPSByZXNwb25zZS5SRVNQT05TRV9UT0tFTjtcclxuICAgIGxldCB2ZXJpZnlUb2tlbiA9IENyeXB0b0pTLkhtYWNTSEEyNTYocmVzcERhdGEsIHRoaXMudmFybGlzdC5hcGlIYXNoaW5nS2V5KS50b1N0cmluZygpO1xyXG4gICAgLy8gY29uc29sZS5sb2cocmVzcFRva2VuKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHZlcmlmeVRva2VuKTtcclxuXHJcbiAgICBpZiAocmVzcFRva2VuID09IHZlcmlmeVRva2VuKSB7XHJcbiAgICAgIGxldCByZXM6IGFueSA9IEJ1ZmZlci5mcm9tKHJlc3BEYXRhLCAnYmFzZTY0Jyk7XHJcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzLnRvU3RyaW5nKCkpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhyZXMuc3RhdHVzKTtcclxuXHJcbiAgICAgIGlmIChyZXMuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgIFN3YWwuZmlyZShcclxuICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ0RlbGV0ZWQnKSsnICEnLFxyXG4gICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnUmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQnKSxcclxuICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgIClcclxuICAgICAgIC8vICQoJy5jaGVja0FsbCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24uZW1pdCgpO1xyXG4gICAgICAgIHRoaXMuY2FsbGZ1bmN0aW9uMy5lbWl0KCk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSA0MTcpIHtcclxuICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3QuaW52YWxpZFJlc3BvbnNlKSlcclxuICAgICBcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3Quc29tZXRoaW5nV3JvbmcpKVxyXG4gICAgIFxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3QuZXJyb3JBcGlSZXNwb25zZSkpXHJcbiAgXHJcbiAgICB9XHJcbiAgfSxcclxuICBlcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmRpcmVjdGxvZ291dGxpYigpXHJcbiB9XHJcbn0pXHJcbiAgICAgICAgXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBiYWNrQ2xpY2tlZCgpIHtcclxuICAgIHRoaXMuX2xvY2F0aW9uLmJhY2soKTtcclxuICB9XHJcbiAgcHVibGlzaEFsbChpZHM6YW55LGZ0eXBlOmFueSxwdWJVbnB1YlN0YXR1czogYW55KSB7XHJcbiAgICBsZXQgcHViZXJyb1N0YXR1czogYW55ID0gMDtcclxuICAgIGZvciAobGV0IGtscCBvZiBwdWJVbnB1YlN0YXR1cykge1xyXG5cclxuICAgICAgaWYgKGtscC5wdWJsaXNoVW5wdWJsaXNTdGF0dXMgPT0gMSkge1xyXG4gICAgICAgIHB1YmVycm9TdGF0dXMgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocHViZXJyb1N0YXR1cyA9PSAxKSB7XHJcbiAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKFwiUGxlYXNlIHNlbGVjdCB0aGUgdW5wdWJsaXNoZWQgcmVjb3JkIHRvIHB1Ymxpc2hcIikpXHJcbiAgICAgXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpZHMubGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoXCJQbGVhc2Ugc2VsZWN0IHRoZSByZWNvcmQgeW91IHdhbnQgdG8gcHVibGlzaFwiKSlcclxuICBcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG5cclxuICAgICAgbGV0IGl0ZW1pZHMgPSBpZHMudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgIGxldCBsZXR0ZXJQYXJhbXMgPSB7XHJcbiAgICAgICAgXCJpdGVtSWRcIjogaXRlbWlkcyxcclxuICAgICAgICBcIml0ZW1TdGF0dXNcIjogXCIyXCJcclxuICAgICAgfTtcclxuXHJcbiAgICAgIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZShcIllvdSB3YW50IHRvIHB1Ymxpc2ggdGhpcyByZWNvcmRcIiksXHJcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnQ2FuY2VsJyksXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnWWVzJykgKyAnLCAnICsgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgncHVibGlzaCBpdCcpICsgJyEnXHJcbiAgICAgIH0pLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcclxuICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UucHVibGlzaEFsbChsZXR0ZXJQYXJhbXMsIGZ0eXBlKS5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBuZXh0OiAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgcmVzcERhdGEgPSByZXNwb25zZS5SRVNQT05TRV9EQVRBO1xyXG4gICAgICAgICAgICAgIGxldCByZXNwVG9rZW4gPSByZXNwb25zZS5SRVNQT05TRV9UT0tFTjtcclxuICAgICAgICAgICAgICBsZXQgdmVyaWZ5VG9rZW4gPSBDcnlwdG9KUy5IbWFjU0hBMjU2KHJlc3BEYXRhLCB0aGlzLnZhcmxpc3QuYXBpSGFzaGluZ0tleSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICBpZiAocmVzcFRva2VuID09IHZlcmlmeVRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzOiBhbnkgPSBCdWZmZXIuZnJvbShyZXNwRGF0YSwgJ2Jhc2U2NCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlUmVzdWx0ID0gSlNPTi5wYXJzZShyZXMpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVJlc3VsdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1B1Ymxpc2hlZCcpKycgIScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnUHVibGlzaCBSZWNvcmRzIFN1Y2Nlc3NmdWxseScpLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgLy8gJCgnLmNoZWNrQWxsJykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24uZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNhbGxmdW5jdGlvbjMuZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZVJlc3VsdC5zdGF0dXMgPT0gNDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5pbnZhbGlkUmVzcG9uc2UpKVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UodGhpcy52YXJsaXN0LnNvbWV0aGluZ1dyb25nKSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3QuZXJyb3JBcGlSZXNwb25zZSkpXHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UuZGlyZWN0bG9nb3V0bGliKClcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gIH1cclxuICB1bnB1Ymxpc2hBbGwoaWRzOmFueSxmdHlwZTphbnkscHViVW5wdWJTdGF0dXM6IGFueSkge1xyXG4gICAgbGV0IHB1YmVycm9TdGF0dXM6IGFueSA9IDA7XHJcbiAgICBmb3IgKGxldCBrbHAgb2YgcHViVW5wdWJTdGF0dXMpIHtcclxuICAgICAgaWYgKGtscC5wdWJsaXNoVW5wdWJsaXNTdGF0dXMgPT0gMCkge1xyXG4gICAgICAgIHB1YmVycm9TdGF0dXMgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocHViZXJyb1N0YXR1cyA9PSAxKSB7XHJcbiAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQbGVhc2Ugc2VsZWN0IHRoZSBwdWJsaXNoZWQgcmVjb3JkIHRvIHVucHVibGlzaCcpKVxyXG4gICAgXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpZHMubGVuZ3RoID09IDApIHtcclxuICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1BsZWFzZSBzZWxlY3QgdGhlIHJlY29yZCB5b3Ugd2FudCB0byB1bnB1Ymxpc2gnKSlcclxuICAgICBcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBsZXQgaXRlbWlkcyA9IGlkcy50b1N0cmluZygpO1xyXG5cclxuICAgICAgbGV0IGxldHRlclBhcmFtcyA9IHtcclxuICAgICAgICBcIml0ZW1JZFwiOiBpdGVtaWRzLFxyXG4gICAgICAgIFwiaXRlbVN0YXR1c1wiOiBcIjNcIlxyXG4gICAgICB9O1xyXG4gICAgICBTd2FsLmZpcmUoe1xyXG4gICAgICAgIHRleHQ6IHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoXCJZb3Ugd2FudCB0byB1bnB1Ymxpc2ggdGhpcyByZWNvcmRcIiksXHJcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnQ2FuY2VsJyksXHJcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXHJcbiAgICAgICAgY2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnWWVzJykgKyAnLCAnICsgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgndW5wdWJsaXNoIGl0JylcclxuICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzQ29uZmlybWVkKSB7XHJcbiAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnVucHVibGlzaEFsbChsZXR0ZXJQYXJhbXMsIGZ0eXBlKS5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBuZXh0OiAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgcmVzcERhdGEgPSByZXNwb25zZS5SRVNQT05TRV9EQVRBO1xyXG4gICAgICAgICAgICAgIGxldCByZXNwVG9rZW4gPSByZXNwb25zZS5SRVNQT05TRV9UT0tFTjtcclxuICAgICAgICAgICAgICBsZXQgdmVyaWZ5VG9rZW4gPSBDcnlwdG9KUy5IbWFjU0hBMjU2KHJlc3BEYXRhLCB0aGlzLnZhcmxpc3QuYXBpSGFzaGluZ0tleSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICBpZiAocmVzcFRva2VuID09IHZlcmlmeVRva2VuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzOiBhbnkgPSBCdWZmZXIuZnJvbShyZXNwRGF0YSwgJ2Jhc2U2NCcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlUmVzdWx0ID0gSlNPTi5wYXJzZShyZXMpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZVJlc3VsdC5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIFN3YWwuZmlyZShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdVbnB1Ymxpc2hlZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1VucHVibGlzaCBSZWNvcmRzIFN1Y2Nlc3NmdWxseScpICsgJy4nLFxyXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgLy8gYWxlcnQoMClcclxuICAgICAgICAgICAgICAgICAgaXRlbWlkcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAvLyAgICQoJy5jaGVja0FsbCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGZ1bmN0aW9uLmVtaXQoKTtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24zLmVtaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSA0MTcpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UodGhpcy52YXJsaXN0LmludmFsaWRSZXNwb25zZSkpXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3Quc29tZXRoaW5nV3JvbmcpKVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UodGhpcy52YXJsaXN0LmVycm9yQXBpUmVzcG9uc2UpKVxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogKG1zZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5kaXJlY3Rsb2dvdXRsaWIoKVxyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgfSlcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIiA8ZGl2IFtuZ1N3aXRjaF09XCJjaGlsZE1lc3NhZ2UudXRpbE5hbWVcIj5cclxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidtYW5kYXRvcnknXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cIm1sLTJcIj4oICogKSAge3snSW5kaWNhdGVzIE1hbmRhdG9yeSBGaWVsZHMnfCB0cmFuc2xhdGV9fSAuPC9wPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3NlYXJjaCdcIj5cclxuICAgICAgICAgICAgICA8YSAgaWQ9XCJzZWFyY2hpY29uXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG5nYlRvb2x0aXA9XCJ7eydTZWFyY2gnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cIm9wZW5zZWFyY2goKVwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJTZWFyY2hcIj48aSBjbGFzcz1cImljb24tc2VhcmNoMVwiPjwvaT48L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3ByaW50J1wiPlxyXG4gICAgICAgICAgICAgIDxhICBpZD1cInByaW50aWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snUHJpbnQnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cInByaW50VGFibGUoKVwiICBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiUHJpbnRcIj48aSBjbGFzcz1cImljb24tcHJpbnQtc29saWRcIj48L2k+PC9hPiAgIFxyXG4gICAgICA8L2Rpdj5cclxuICAgICBcclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2RlbGV0ZSdcIj5cclxuICAgICAgICAgICAgICA8YSAgaWQ9XCJkZWxldGVpY29uXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG5nYlRvb2x0aXA9XCJ7eydEZWxldGUnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cImRlbGV0ZUFsbChzZW5kSWRzLGZ1blR5cGUpXCIgIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJEZWxldGVcIj48aSBjbGFzcz1cImljb24tdHJhc2gtc29saWRcIj48L2k+PC9hPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3B1Ymxpc2gnXCI+XHJcbiAgICAgICAgICA8YSAgaWQ9XCJwdWJsaXNoaWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snUHVibGlzaCd8IHRyYW5zbGF0ZX19XCIgdGl0bGU9XCJcIiAoY2xpY2spPVwicHVibGlzaEFsbChzZW5kSWRzLGZ1blR5cGUscHViVW5wdWJTdGF0dXMpXCIgIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJQdWJsaXNoXCI+PGkgY2xhc3M9XCJpY29uLXZvbHVtZS11cC1zb2xpZFwiPjwvaT48L2E+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIndW5wdWJsaXNoJ1wiPlxyXG4gICAgICAgICAgPGEgIGlkPVwidW5wdWJsaXNoaWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snVW5wdWJsaXNoJ3wgdHJhbnNsYXRlfX1cIiB0aXRsZT1cIlwiIChjbGljayk9XCJ1bnB1Ymxpc2hBbGwoc2VuZElkcyxmdW5UeXBlLHB1YlVucHViU3RhdHVzKVwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJVbnB1Ymxpc2hcIj48aSBjbGFzcz1cImljb24tdm9sdW1lLW9mZi1zb2xpZFwiPjwvaT48L2E+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZG93bmxvYWQnXCI+XHJcbiAgICAgICAgICAgICAgPGEgIHRpdGxlPVwiXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGlkPVwiZG93bmxvYWRpY29uXCIgbmdiVG9vbHRpcD1cInt7J0Rvd25sb2FkJ3wgdHJhbnNsYXRlfX1cIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiRG93bmxvYWRcIj48aSBjbGFzcz1cImljb24tZG93bmxvYWQtc29saWRcIj48L2k+PC9hPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInYmFjaydcIj5cclxuICAgICAgICAgICAgICA8YSAgdGl0bGU9XCJcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgaWQ9XCJiYWNraWNvblwiIG5nYlRvb2x0aXA9XCJ7eydCYWNrJ3wgdHJhbnNsYXRlfX1cIiAoY2xpY2spPVwiYmFja0NsaWNrZWQoKVwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJCYWNrXCI+PGkgY2xhc3M9XCJpY29uLWFycm93LWxlZnQtc29saWRcIj48L2k+PC9hPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nU3dpdGNoRGVmYXVsdD48L2Rpdj5cclxuICAgIDwvZGl2PiBcclxuXHJcbiJdfQ==