import { EventEmitter, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class LibpaginationComponent implements OnInit {
    page: any;
    count: any;
    tableSize: any;
    callfunction: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    onTableDataChange(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LibpaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LibpaginationComponent, "lib-libpagination", never, { "page": "page"; "count": "count"; "tableSize": "tableSize"; }, { "callfunction": "callfunction"; }, never, never, false>;
}
