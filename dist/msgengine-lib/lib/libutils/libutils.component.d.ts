import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import { MsgengineLibService } from '../msgengine-lib.service';
import { Location } from '@angular/common';
import { VarlistService } from '../varlist.service';
import * as i0 from "@angular/core";
export declare class LibutilsComponent implements OnInit {
    private httpClient;
    private _location;
    commonserveice: MsgengineLibService;
    private encDec;
    private varlist;
    message: any;
    childMessage: any;
    sendIds: any;
    funType: any;
    pubUnpubStatus: any;
    callfunction: EventEmitter<any>;
    callfunction3: EventEmitter<any>;
    reloadUrl: any;
    constructor(httpClient: HttpClient, _location: Location, commonserveice: MsgengineLibService, encDec: EncrypyDecrpyService, varlist: VarlistService);
    ngOnInit(): void;
    opensearch(): void;
    printTable(): void;
    deleteAll(ids: any, ftype: any): void;
    backClicked(): void;
    publishAll(ids: any, ftype: any, pubUnpubStatus: any): void;
    unpublishAll(ids: any, ftype: any, pubUnpubStatus: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LibutilsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LibutilsComponent, "lib-libutils", never, { "childMessage": "childMessage"; "sendIds": "sendIds"; "funType": "funType"; "pubUnpubStatus": "pubUnpubStatus"; "reloadUrl": "reloadUrl"; }, { "callfunction": "callfunction"; "callfunction3": "callfunction3"; }, never, never, false>;
}