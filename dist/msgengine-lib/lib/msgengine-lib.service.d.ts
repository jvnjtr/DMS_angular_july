/// <reference types="sweetalert2" />
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VarlistService } from './varlist.service';
import * as i0 from "@angular/core";
export declare class MsgengineLibService {
    private router;
    private http;
    private varlist;
    constructor(router: Router, http: HttpClient, varlist: VarlistService);
    directlogoutlib(): void;
    getGetwayName(formParams: any): Observable<any>;
    viewGatwayTypes(formParams: any): Observable<any>;
    newGetwayConfig(docParams: any): Observable<any>;
    viewGetwayConfig(docParams: any): Observable<any>;
    getPrevDetails(docParams: any): Observable<any>;
    deleteGetwayConfig(docParams: any): Observable<any>;
    deleteAll(formParams: any, fname: any): Observable<any>;
    publishAll(formParams: any, fname: any): Observable<any>;
    unpublishAll(formParams: any, fname: any): Observable<any>;
    newMessage(messageParams: any): Observable<any>;
    viewMessage(messageParams: any): Observable<any>;
    reminderSchedular(messageParams: any): Observable<any>;
    msgexecuteSchedular(messageParams: any): Observable<any>;
    msgstopSchedular(messageParams: any): Observable<any>;
    getStaticConfigurationKeys(messageParams: any): Observable<any>;
    getFetchPublishRecord(messageParams: any): Observable<any>;
    getLanguage(messageParams: any): Observable<any>;
    getForms(messageParams: any): Observable<any>;
    getConfigurationKeys(messageParams: any): Observable<any>;
    msguploadFile(formParams: any): Observable<any>;
    langReplace(languageText: any, languageName?: any): any;
    swalfire(type: any, message: any): Promise<import("sweetalert2").SweetAlertResult<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MsgengineLibService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MsgengineLibService>;
}
