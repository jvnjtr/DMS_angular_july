import { OnInit } from '@angular/core';
import { MsgengineLibService } from '../msgengine-lib.service';
import * as i0 from "@angular/core";
export declare class LibtabsComponent implements OnInit {
    commonserveice: MsgengineLibService;
    message: any;
    tabMessage: any;
    activeid: any;
    tabURL: any;
    constructor(commonserveice: MsgengineLibService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LibtabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LibtabsComponent, "lib-libtabs", never, { "tabMessage": "tabMessage"; "activeid": "activeid"; }, {}, never, never, false>;
}
