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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlidXRpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL2xpYnV0aWxzL2xpYnV0aWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21zZ2VuZ2luZS1saWIvc3JjL2xpYi9saWJ1dGlscy9saWJ1dGlscy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sSUFBSSxNQUFNLGFBQWEsQ0FBQztBQUMvQixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUd0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7Ozs7Ozs7QUFVaEMsTUFBTSxPQUFPLGlCQUFpQjtJQWU1QixZQUNVLFVBQXNCLEVBQ3RCLFNBQW1CLEVBQ3BCLGNBQWtDLEVBQ2pDLE1BQTRCLEVBQzVCLE9BQXNCO1FBSnRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNwQixtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBc0I7UUFDNUIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQWRSLGlCQUFZLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsa0JBQWEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWdCN0UsQ0FBQztJQUVGLFFBQVE7SUFDUixDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksYUFBYSxHQUFPLFFBQVEsQ0FB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LENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtpQ0FFcEc7cUNBQ0k7b0NBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQTtpQ0FFbkc7NkJBQ0Y7aUNBQU07Z0NBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBOzZCQUVyRzt3QkFDSCxDQUFDO3dCQUNELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFOzRCQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxFQUFFLENBQUE7d0JBQzdDLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUVGO1lBQ0gsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7OytHQWhUVSxpQkFBaUI7bUdBQWpCLGlCQUFpQiwyUUNyQjlCLHlvRUE2QkE7NEZEUmEsaUJBQWlCO2tCQUw3QixTQUFTOytCQUNFLGNBQWM7ME5BTWYsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ2tCLFlBQVk7c0JBQW5DLE1BQU07dUJBQUMsY0FBYztnQkFDRyxhQUFhO3NCQUFyQyxNQUFNO3VCQUFDLGVBQWU7Z0JBQ2hCLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW5jcnlweURlY3JweVNlcnZpY2UgfSBmcm9tICcuLi9lbmNyeXB5LWRlY3JweS5zZXJ2aWNlJztcbmltcG9ydCB7IE1zZ2VuZ2luZUxpYlNlcnZpY2UgfSBmcm9tICcuLi9tc2dlbmdpbmUtbGliLnNlcnZpY2UnO1xuaW1wb3J0IFN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xuaW1wb3J0ICogYXMgQ3J5cHRvSlMgZnJvbSAnY3J5cHRvLWpzJztcbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgKiBhcyAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tICdidWZmZXInO1xuaW1wb3J0IHsgVmFybGlzdFNlcnZpY2UgfSBmcm9tICcuLi92YXJsaXN0LnNlcnZpY2UnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWxpYnV0aWxzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpYnV0aWxzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlidXRpbHMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpYnV0aWxzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgbWVzc2FnZTphbnk7XG4gIEBJbnB1dCgpIGNoaWxkTWVzc2FnZTphbnk7XG4gIEBJbnB1dCgpIHNlbmRJZHM6YW55O1xuICBASW5wdXQoKSBmdW5UeXBlOmFueTtcbiAgQElucHV0KCkgcHViVW5wdWJTdGF0dXM6IGFueTtcbiAgQE91dHB1dChcImNhbGxmdW5jdGlvblwiKSBjYWxsZnVuY3Rpb246RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoXCJjYWxsZnVuY3Rpb24zXCIpIGNhbGxmdW5jdGlvbjM6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5ASW5wdXQoKSByZWxvYWRVcmw6YW55O1xuXG5cblxuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBfbG9jYXRpb246IExvY2F0aW9uLFxuICAgIHB1YmxpYyBjb21tb25zZXJ2ZWljZTpNc2dlbmdpbmVMaWJTZXJ2aWNlLFxuICAgIHByaXZhdGUgZW5jRGVjOiBFbmNyeXB5RGVjcnB5U2VydmljZSxcbiAgICBwcml2YXRlIHZhcmxpc3Q6VmFybGlzdFNlcnZpY2VcbiAgKSB7XG4gIFxuICAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG4gIG9wZW5zZWFyY2goKXtcbiAgICBsZXQgc2VhcmNoY29udGVudDphbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1jb250YWluZXJcIik7XG4gIFxuICAgIGlmKHNlYXJjaGNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgIHNlYXJjaGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNlYXJjaGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9XG4gICAgLy8gbGV0IGVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD48dW5rbm93bj5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VhcmNoLWNvbnRhaW5lclwiKTtcbiAgICAvLyBhbGVydChlbGVtZW50KVxuICAgIC8vIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcbiAgXG5cbiAgIC8vICQoXCIuc2VhcmNoLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIHByaW50VGFibGUoKXtcbiAgICBsZXQgcHJpbnRDb250ZW50czphbnk7XG4gICAgbGV0IHBvcHVwV2luOmFueTtcbiAgICBwcmludENvbnRlbnRzID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpbnQtc2VjdGlvblwiKT8uaW5uZXJIVE1MO1xuICAgIHBvcHVwV2luID0gd2luZG93Lm9wZW4oJycsICdfYmxhbmsnLCAndG9wPTAsbGVmdD0wLGhlaWdodD0xMDAlLHdpZHRoPWF1dG8nKTtcbiAgICBwb3B1cFdpbi5kb2N1bWVudC5vcGVuKCk7XG4gICAgcG9wdXBXaW4uZG9jdW1lbnQud3JpdGUoYFxuICA8aHRtbD5cbiAgICA8aGVhZD5cbiAgICA8bGluayBocmVmPVwiLi4vLi4vYXNzZXRzL2Nzcy9wcmludC5jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCI+XG4gICAgIFxuICAgIDwvaGVhZD5cbjxib2R5IG9ubG9hZD1cIndpbmRvdy5wcmludCgpO3dpbmRvdy5jbG9zZSgpXCI+XG48ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG48aW1nIHNyYz1cIi4uLy4uL2Fzc2V0cy9pbWcvbG9nb2JsYWNrLnBuZ1wiPlxuPC9kaXY+XG5cbiR7cHJpbnRDb250ZW50c308L2JvZHk+XG4gIDwvaHRtbD5gXG4gICAgKTtcbiAgICBwb3B1cFdpbi5kb2N1bWVudC5jbG9zZSgpO1xuICB9XG5cbiAgZGVsZXRlQWxsKGlkczphbnksZnR5cGU6YW55KSB7XG4gICAgaWYgKGlkcy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1BsZWFzZSBzZWxlY3QgdGhlIHJlY29yZCB5b3Ugd2FudCB0byBkZWxldGUnKSlcbiBcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgaXRlbWlkcyA9IGlkcy50b1N0cmluZygpO1xuXG4gICAgICBsZXQgbGV0dGVyUGFyYW1zID0ge1xuICAgICAgICBcIml0ZW1JZFwiOiBpdGVtaWRzLFxuICAgICAgICBcIml0ZW1TdGF0dXNcIjogXCIxXCJcbiAgICAgIH07XG5cbiAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdBcmUgeW91IHN1cmUnKSArICc/JyxcbiAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZShcIllvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHJlY29yZFwiKSxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdDYW5jZWwnKSxcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdZZXMnKSArICcsICcgKyB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdkZWxldGUgaXQnKSArICchJ1xuICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xuICAgICAgICAgIFxuICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UuZGVsZXRlQWxsKGxldHRlclBhcmFtcywgZnR5cGUpLnN1YnNjcmliZSh7XG4gIG5leHQ6IChyZXNwb25zZSkgPT4ge1xuICAgIGxldCByZXNwRGF0YSA9IHJlc3BvbnNlLlJFU1BPTlNFX0RBVEE7XG4gICAgbGV0IHJlc3BUb2tlbiA9IHJlc3BvbnNlLlJFU1BPTlNFX1RPS0VOO1xuICAgIGxldCB2ZXJpZnlUb2tlbiA9IENyeXB0b0pTLkhtYWNTSEEyNTYocmVzcERhdGEsIHRoaXMudmFybGlzdC5hcGlIYXNoaW5nS2V5KS50b1N0cmluZygpO1xuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BUb2tlbik7XG4gICAgLy8gY29uc29sZS5sb2codmVyaWZ5VG9rZW4pO1xuXG4gICAgaWYgKHJlc3BUb2tlbiA9PSB2ZXJpZnlUb2tlbikge1xuICAgICAgbGV0IHJlczogYW55ID0gQnVmZmVyLmZyb20ocmVzcERhdGEsICdiYXNlNjQnKTtcbiAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzLnRvU3RyaW5nKCkpO1xuICAgICAgLy8gY29uc29sZS5sb2cocmVzLnN0YXR1cyk7XG5cbiAgICAgIGlmIChyZXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBTd2FsLmZpcmUoXG4gICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnRGVsZXRlZCcpKycgIScsXG4gICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnUmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQnKSxcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKVxuICAgICAgIC8vICQoJy5jaGVja0FsbCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY2FsbGZ1bmN0aW9uLmVtaXQoKTtcbiAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24zLmVtaXQoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1cyA9PSA0MTcpIHtcbiAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UodGhpcy52YXJsaXN0LmludmFsaWRSZXNwb25zZSkpXG4gICAgIFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5zb21ldGhpbmdXcm9uZykpXG4gICAgIFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3QuZXJyb3JBcGlSZXNwb25zZSkpXG4gIFxuICAgIH1cbiAgfSxcbiAgZXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UuZGlyZWN0bG9nb3V0bGliKClcbiB9XG59KVxuICAgICAgICBcblxuXG5cbiAgICAgICAgfVxuICAgICAgfSlcblxuXG5cbiAgICB9XG4gIH1cbiAgYmFja0NsaWNrZWQoKSB7XG4gICAgdGhpcy5fbG9jYXRpb24uYmFjaygpO1xuICB9XG4gIHB1Ymxpc2hBbGwoaWRzOmFueSxmdHlwZTphbnkscHViVW5wdWJTdGF0dXM6IGFueSkge1xuICAgIGxldCBwdWJlcnJvU3RhdHVzOiBhbnkgPSAwO1xuICAgIGZvciAobGV0IGtscCBvZiBwdWJVbnB1YlN0YXR1cykge1xuXG4gICAgICBpZiAoa2xwLnB1Ymxpc2hVbnB1Ymxpc1N0YXR1cyA9PSAxKSB7XG4gICAgICAgIHB1YmVycm9TdGF0dXMgPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHB1YmVycm9TdGF0dXMgPT0gMSkge1xuICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoXCJQbGVhc2Ugc2VsZWN0IHRoZSB1bnB1Ymxpc2hlZCByZWNvcmQgdG8gcHVibGlzaFwiKSlcbiAgICAgXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoaWRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZShcIlBsZWFzZSBzZWxlY3QgdGhlIHJlY29yZCB5b3Ugd2FudCB0byBwdWJsaXNoXCIpKVxuICBcbiAgICB9XG4gICAgZWxzZSB7XG5cbiAgICAgIGxldCBpdGVtaWRzID0gaWRzLnRvU3RyaW5nKCk7XG5cbiAgICAgIGxldCBsZXR0ZXJQYXJhbXMgPSB7XG4gICAgICAgIFwiaXRlbUlkXCI6IGl0ZW1pZHMsXG4gICAgICAgIFwiaXRlbVN0YXR1c1wiOiBcIjJcIlxuICAgICAgfTtcblxuICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZShcIllvdSB3YW50IHRvIHB1Ymxpc2ggdGhpcyByZWNvcmRcIiksXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnQ2FuY2VsJyksXG4gICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxuICAgICAgICBjYW5jZWxCdXR0b25Db2xvcjogJyNkMzMnLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnWWVzJykgKyAnLCAnICsgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgncHVibGlzaCBpdCcpICsgJyEnXG4gICAgICB9KS50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuXG4gICAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcbiAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnB1Ymxpc2hBbGwobGV0dGVyUGFyYW1zLCBmdHlwZSkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgcmVzcERhdGEgPSByZXNwb25zZS5SRVNQT05TRV9EQVRBO1xuICAgICAgICAgICAgICBsZXQgcmVzcFRva2VuID0gcmVzcG9uc2UuUkVTUE9OU0VfVE9LRU47XG4gICAgICAgICAgICAgIGxldCB2ZXJpZnlUb2tlbiA9IENyeXB0b0pTLkhtYWNTSEEyNTYocmVzcERhdGEsIHRoaXMudmFybGlzdC5hcGlIYXNoaW5nS2V5KS50b1N0cmluZygpO1xuICAgICAgICAgICAgICBpZiAocmVzcFRva2VuID09IHZlcmlmeVRva2VuKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlczogYW55ID0gQnVmZmVyLmZyb20ocmVzcERhdGEsICdiYXNlNjQnKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2VSZXN1bHQgPSBKU09OLnBhcnNlKHJlcylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VSZXN1bHQuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQdWJsaXNoZWQnKSsnICEnLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQdWJsaXNoIFJlY29yZHMgU3VjY2Vzc2Z1bGx5JyksXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAvLyAkKCcuY2hlY2tBbGwnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24uZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24zLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlUmVzdWx0LnN0YXR1cyA9PSA0MTcpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5pbnZhbGlkUmVzcG9uc2UpKVxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5zb21ldGhpbmdXcm9uZykpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5lcnJvckFwaVJlc3BvbnNlKSlcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLmRpcmVjdGxvZ291dGxpYigpXG4gICAgICAgICAgIH1cbiAgICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICB9XG4gICAgICB9KVxuXG5cblxuICAgIH1cbiAgfVxuICB1bnB1Ymxpc2hBbGwoaWRzOmFueSxmdHlwZTphbnkscHViVW5wdWJTdGF0dXM6IGFueSkge1xuICAgIGxldCBwdWJlcnJvU3RhdHVzOiBhbnkgPSAwO1xuICAgIGZvciAobGV0IGtscCBvZiBwdWJVbnB1YlN0YXR1cykge1xuICAgICAgaWYgKGtscC5wdWJsaXNoVW5wdWJsaXNTdGF0dXMgPT0gMCkge1xuICAgICAgICBwdWJlcnJvU3RhdHVzID0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwdWJlcnJvU3RhdHVzID09IDEpIHtcbiAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdQbGVhc2Ugc2VsZWN0IHRoZSBwdWJsaXNoZWQgcmVjb3JkIHRvIHVucHVibGlzaCcpKVxuICAgIFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGlkcy5sZW5ndGggPT0gMCkge1xuICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5zd2FsZmlyZSgnZXJyb3InLHRoaXMuY29tbW9uc2VydmVpY2UubGFuZ1JlcGxhY2UoJ1BsZWFzZSBzZWxlY3QgdGhlIHJlY29yZCB5b3Ugd2FudCB0byB1bnB1Ymxpc2gnKSlcbiAgICAgXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGl0ZW1pZHMgPSBpZHMudG9TdHJpbmcoKTtcblxuICAgICAgbGV0IGxldHRlclBhcmFtcyA9IHtcbiAgICAgICAgXCJpdGVtSWRcIjogaXRlbWlkcyxcbiAgICAgICAgXCJpdGVtU3RhdHVzXCI6IFwiM1wiXG4gICAgICB9O1xuICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgdGV4dDogdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZShcIllvdSB3YW50IHRvIHVucHVibGlzaCB0aGlzIHJlY29yZFwiKSxcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdDYW5jZWwnKSxcbiAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzMwODVkNicsXG4gICAgICAgIGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCdZZXMnKSArICcsICcgKyB0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKCd1bnB1Ymxpc2ggaXQnKVxuICAgICAgfSkudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xuICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2UudW5wdWJsaXNoQWxsKGxldHRlclBhcmFtcywgZnR5cGUpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBuZXh0OiAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgbGV0IHJlc3BEYXRhID0gcmVzcG9uc2UuUkVTUE9OU0VfREFUQTtcbiAgICAgICAgICAgICAgbGV0IHJlc3BUb2tlbiA9IHJlc3BvbnNlLlJFU1BPTlNFX1RPS0VOO1xuICAgICAgICAgICAgICBsZXQgdmVyaWZ5VG9rZW4gPSBDcnlwdG9KUy5IbWFjU0hBMjU2KHJlc3BEYXRhLCB0aGlzLnZhcmxpc3QuYXBpSGFzaGluZ0tleSkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgaWYgKHJlc3BUb2tlbiA9PSB2ZXJpZnlUb2tlbikge1xuICAgICAgICAgICAgICAgIGxldCByZXM6IGFueSA9IEJ1ZmZlci5mcm9tKHJlc3BEYXRhLCAnYmFzZTY0Jyk7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlUmVzdWx0ID0gSlNPTi5wYXJzZShyZXMpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlUmVzdWx0LnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgIFN3YWwuZmlyZShcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnVW5wdWJsaXNoZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSgnVW5wdWJsaXNoIFJlY29yZHMgU3VjY2Vzc2Z1bGx5JykgKyAnLicsXG4gICAgICAgICAgICAgICAgICAgICdzdWNjZXNzJ1xuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAvLyBhbGVydCgwKVxuICAgICAgICAgICAgICAgICAgaXRlbWlkcyA9ICcnO1xuICAgICAgICAgICAgICAgLy8gICAkKCcuY2hlY2tBbGwnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24uZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsZnVuY3Rpb24zLmVtaXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXMgPT0gNDE3KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3QuaW52YWxpZFJlc3BvbnNlKSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbW1vbnNlcnZlaWNlLnN3YWxmaXJlKCdlcnJvcicsdGhpcy5jb21tb25zZXJ2ZWljZS5sYW5nUmVwbGFjZSh0aGlzLnZhcmxpc3Quc29tZXRoaW5nV3JvbmcpKVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbW9uc2VydmVpY2Uuc3dhbGZpcmUoJ2Vycm9yJyx0aGlzLmNvbW1vbnNlcnZlaWNlLmxhbmdSZXBsYWNlKHRoaXMudmFybGlzdC5lcnJvckFwaVJlc3BvbnNlKSlcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAobXNnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgdGhpcy5jb21tb25zZXJ2ZWljZS5kaXJlY3Rsb2dvdXRsaWIoKVxuICAgICAgICAgICB9XG4gICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsIiA8ZGl2IFtuZ1N3aXRjaF09XCJjaGlsZE1lc3NhZ2UudXRpbE5hbWVcIj5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbWFuZGF0b3J5J1wiPlxuICAgICAgICAgIDxwIGNsYXNzPVwibWwtMlwiPiggKiApICB7eydJbmRpY2F0ZXMgTWFuZGF0b3J5IEZpZWxkcyd8IHRyYW5zbGF0ZX19IC48L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidzZWFyY2gnXCI+XG4gICAgICAgICAgICAgIDxhICBpZD1cInNlYXJjaGljb25cIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgbmdiVG9vbHRpcD1cInt7J1NlYXJjaCd8IHRyYW5zbGF0ZX19XCIgdGl0bGU9XCJcIiAoY2xpY2spPVwib3BlbnNlYXJjaCgpXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cIlNlYXJjaFwiPjxpIGNsYXNzPVwiaWNvbi1zZWFyY2gxXCI+PC9pPjwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidwcmludCdcIj5cbiAgICAgICAgICAgICAgPGEgIGlkPVwicHJpbnRpY29uXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG5nYlRvb2x0aXA9XCJ7eydQcmludCd8IHRyYW5zbGF0ZX19XCIgdGl0bGU9XCJcIiAoY2xpY2spPVwicHJpbnRUYWJsZSgpXCIgIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJQcmludFwiPjxpIGNsYXNzPVwiaWNvbi1wcmludC1zb2xpZFwiPjwvaT48L2E+ICAgXG4gICAgICA8L2Rpdj5cbiAgICAgXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZGVsZXRlJ1wiPlxuICAgICAgICAgICAgICA8YSAgaWQ9XCJkZWxldGVpY29uXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIG5nYlRvb2x0aXA9XCJ7eydEZWxldGUnfCB0cmFuc2xhdGV9fVwiIHRpdGxlPVwiXCIgKGNsaWNrKT1cImRlbGV0ZUFsbChzZW5kSWRzLGZ1blR5cGUpXCIgIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJEZWxldGVcIj48aSBjbGFzcz1cImljb24tdHJhc2gtc29saWRcIj48L2k+PC9hPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIncHVibGlzaCdcIj5cbiAgICAgICAgICA8YSAgaWQ9XCJwdWJsaXNoaWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snUHVibGlzaCd8IHRyYW5zbGF0ZX19XCIgdGl0bGU9XCJcIiAoY2xpY2spPVwicHVibGlzaEFsbChzZW5kSWRzLGZ1blR5cGUscHViVW5wdWJTdGF0dXMpXCIgIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJQdWJsaXNoXCI+PGkgY2xhc3M9XCJpY29uLXZvbHVtZS11cC1zb2xpZFwiPjwvaT48L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIid1bnB1Ymxpc2gnXCI+XG4gICAgICAgICAgPGEgIGlkPVwidW5wdWJsaXNoaWNvblwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBuZ2JUb29sdGlwPVwie3snVW5wdWJsaXNoJ3wgdHJhbnNsYXRlfX1cIiB0aXRsZT1cIlwiIChjbGljayk9XCJ1bnB1Ymxpc2hBbGwoc2VuZElkcyxmdW5UeXBlLHB1YlVucHViU3RhdHVzKVwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJVbnB1Ymxpc2hcIj48aSBjbGFzcz1cImljb24tdm9sdW1lLW9mZi1zb2xpZFwiPjwvaT48L2E+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidkb3dubG9hZCdcIj5cbiAgICAgICAgICAgICAgPGEgIHRpdGxlPVwiXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGlkPVwiZG93bmxvYWRpY29uXCIgbmdiVG9vbHRpcD1cInt7J0Rvd25sb2FkJ3wgdHJhbnNsYXRlfX1cIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiRG93bmxvYWRcIj48aSBjbGFzcz1cImljb24tZG93bmxvYWQtc29saWRcIj48L2k+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidiYWNrJ1wiPlxuICAgICAgICAgICAgICA8YSAgdGl0bGU9XCJcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgaWQ9XCJiYWNraWNvblwiIG5nYlRvb2x0aXA9XCJ7eydCYWNrJ3wgdHJhbnNsYXRlfX1cIiAoY2xpY2spPVwiYmFja0NsaWNrZWQoKVwiIGRhdGEtb3JpZ2luYWwtdGl0bGU9XCJCYWNrXCI+PGkgY2xhc3M9XCJpY29uLWFycm93LWxlZnQtc29saWRcIj48L2k+PC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0PjwvZGl2PlxuICAgIDwvZGl2PiBcblxuIl19