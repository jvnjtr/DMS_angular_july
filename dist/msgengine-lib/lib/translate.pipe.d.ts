import { PipeTransform } from '@angular/core';
import { VarlistService } from './varlist.service';
import * as i0 from "@angular/core";
export declare class TranslatePipe implements PipeTransform {
    varlist: VarlistService;
    constructor(varlist: VarlistService);
    transform(languageText: any): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslatePipe, "translate", false>;
}
