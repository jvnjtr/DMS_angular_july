import { HttpClient } from '@angular/common/http';
import { ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgengineLibService } from '../msgengine-lib.service';
import { EncrypyDecrpyService } from '../encrypy-decrpy.service';
import { VarlistService } from '../varlist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as i0 from "@angular/core";
export declare class ViewgetwayComponent implements OnInit {
    private route;
    private httpClient;
    commonserveice: MsgengineLibService;
    private varlist;
    private modalService;
    private encDec;
    previewModal: ElementRef;
    title: any;
    tablist: any;
    utillist: any;
    messaageslist: any;
    jsonurl: any;
    getwaytypes: any;
    selType: any;
    txtName: any;
    getwayList: any;
    POSTS: any;
    page: number;
    count: number;
    tableSize: number;
    pageSizes: number[];
    getwayIdArray: any;
    pubUnpStatus: any[];
    getDetailslist: any;
    getwayDetails: any;
    chkAll: any;
    sevName: any;
    loading: boolean;
    langKey: any;
    indexNumber: any;
    typeName: any;
    constructor(route: Router, httpClient: HttpClient, commonserveice: MsgengineLibService, varlist: VarlistService, modalService: NgbModal, encDec: EncrypyDecrpyService);
    ngOnInit(): void;
    loadvarlist(): void;
    multilingual(test: any): any;
    getGetwaytypes(): void;
    onTableDataChange(event: any): void;
    onTableSizeChange(event: any): void;
    viewAllrecrds(typeid: any, name: any): void;
    onChange(checkid: any, e: any, publishStatus: any): void;
    selectAll(e: any): void;
    filedata(intId: any, typeId: any, typeName: any): void;
    open(content: any): void;
    closeModal(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewgetwayComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewgetwayComponent, "lib-viewgetway", never, {}, {}, never, never, false>;
}
