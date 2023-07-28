import { VarlistService } from './varlist.service';
import * as i0 from "@angular/core";
export declare class EncrypyDecrpyService {
    private varlist;
    constructor(varlist: VarlistService);
    encText(plainText: any): string;
    decText(encryptedText: any): string;
    escapeHtml(text: string): string;
    decodeHtml(str: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<EncrypyDecrpyService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EncrypyDecrpyService>;
}
