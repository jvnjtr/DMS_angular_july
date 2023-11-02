import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class VarlistService {
    constructor() {
        this.apiHashingKey = '22CSMTOOL2022';
        this.encryptIV = '26102021@qwI';
        this.serviceURL = 'http://192.168.10.186/dms_testI/admin/message_module';
        this.serviceName = '/publishUnpublish';
        this.serviceModuleconfig = '/manageMessageConfig';
        this.formEnable = false;
        this.dynamicForm = false;
        this.sessionEncrypted = true;
        this.formId = "0";
        this.somethingWrong = 'something went wrong';
        this.invalidResponse = 'Invalid Response';
        this.errorApiResponse = 'Error in API response';
        this.ckconfig = {
            language: "en",
            allowedContent: true,
            height: 200,
            forcePasteAsPlainText: true,
            font_names: 'Arial;Times New Roman;Verdana',
            extraPlugins: 'divarea',
            removePlugins: 'exportpdf',
            toolbarGroups: [
                { name: 'document', groups: ['mode', 'document', 'doctools'] },
                { name: 'clipboard', groups: ['clipboard', 'undo'] },
                { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                { name: 'forms', groups: ['forms'] },
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                { name: 'links', groups: ['links'] },
                { name: 'insert', groups: ['insert'] },
                { name: 'styles', groups: ['styles'] },
                { name: 'colors', groups: ['colors'] },
                { name: 'tools', groups: ['tools'] },
                { name: 'others', groups: ['others'] },
                { name: 'about', groups: ['about'] }
            ],
            removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
        };
    }
}
VarlistService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: VarlistService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
VarlistService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: VarlistService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: VarlistService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFybGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL3Zhcmxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sY0FBYztJQUgzQjtRQUlDLGtCQUFhLEdBQU0sZUFBZSxDQUFDO1FBQ2xDLGNBQVMsR0FBTSxjQUFjLENBQUM7UUFDOUIsZUFBVSxHQUFNLHNEQUFzRCxDQUFDO1FBQ3ZFLGdCQUFXLEdBQUssbUJBQW1CLENBQUM7UUFDcEMsd0JBQW1CLEdBQUssc0JBQXNCLENBQUM7UUFDL0MsZUFBVSxHQUFLLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFLLEtBQUssQ0FBQztRQUN0QixxQkFBZ0IsR0FBSyxJQUFJLENBQUM7UUFDMUIsV0FBTSxHQUFLLEdBQUcsQ0FBQztRQUNmLG1CQUFjLEdBQU0sc0JBQXNCLENBQUM7UUFDM0Msb0JBQWUsR0FBTSxrQkFBa0IsQ0FBQztRQUN4QyxxQkFBZ0IsR0FBTSx1QkFBdUIsQ0FBQztRQUM5QyxhQUFRLEdBQUs7WUFFWCxRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLE1BQU0sRUFBQyxHQUFHO1lBQ1YscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixVQUFVLEVBQUUsK0JBQStCO1lBQzNDLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLGFBQWEsRUFBRSxXQUFXO1lBQzFCLGFBQWEsRUFBRTtnQkFDYixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRTtnQkFDOUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDcEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUM3RSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQzNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFO2dCQUN6RixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFFdEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDcEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7YUFDckM7WUFDRCxhQUFhLEVBQUUsMmFBQTJhO1NBQzNiLENBQUE7S0FDRjs7NEdBeENZLGNBQWM7Z0hBQWQsY0FBYyxjQUZiLE1BQU07NEZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBWYXJsaXN0U2VydmljZSB7XHJcbiBhcGlIYXNoaW5nS2V5OmFueT0gJzIyQ1NNVE9PTDIwMjInO1xyXG4gIGVuY3J5cHRJVjphbnk9ICcyNjEwMjAyMUBxd0knO1xyXG4gIHNlcnZpY2VVUkw6YW55PSAnaHR0cDovLzE5Mi4xNjguMTAuMTg2L2Rtc190ZXN0SS9hZG1pbi9tZXNzYWdlX21vZHVsZSc7XHJcbiAgc2VydmljZU5hbWU6YW55PScvcHVibGlzaFVucHVibGlzaCc7XHJcbiAgc2VydmljZU1vZHVsZWNvbmZpZzphbnk9Jy9tYW5hZ2VNZXNzYWdlQ29uZmlnJztcclxuICBmb3JtRW5hYmxlOmFueT1mYWxzZTtcclxuICBkeW5hbWljRm9ybTphbnk9ZmFsc2U7XHJcbiAgc2Vzc2lvbkVuY3J5cHRlZDphbnk9dHJ1ZTtcclxuICBmb3JtSWQ6YW55PVwiMFwiO1xyXG4gIHNvbWV0aGluZ1dyb25nOmFueT0gJ3NvbWV0aGluZyB3ZW50IHdyb25nJztcclxuICBpbnZhbGlkUmVzcG9uc2U6YW55PSAnSW52YWxpZCBSZXNwb25zZSc7XHJcbiAgZXJyb3JBcGlSZXNwb25zZTphbnk9ICdFcnJvciBpbiBBUEkgcmVzcG9uc2UnO1xyXG4gIGNrY29uZmlnOmFueT17XHJcbiAgICAgIFxyXG4gICAgbGFuZ3VhZ2U6IFwiZW5cIixcclxuICAgIGFsbG93ZWRDb250ZW50OiB0cnVlLFxyXG4gICAgaGVpZ2h0OjIwMCxcclxuICAgIGZvcmNlUGFzdGVBc1BsYWluVGV4dDogdHJ1ZSxcclxuICAgIGZvbnRfbmFtZXM6ICdBcmlhbDtUaW1lcyBOZXcgUm9tYW47VmVyZGFuYScsXHJcbiAgICBleHRyYVBsdWdpbnM6ICdkaXZhcmVhJyxcclxuICAgIHJlbW92ZVBsdWdpbnM6ICdleHBvcnRwZGYnLFxyXG4gICAgdG9vbGJhckdyb3VwczogW1xyXG4gICAgICB7IG5hbWU6ICdkb2N1bWVudCcsIGdyb3VwczogWydtb2RlJywgJ2RvY3VtZW50JywgJ2RvY3Rvb2xzJ10gfSxcclxuICAgICAgeyBuYW1lOiAnY2xpcGJvYXJkJywgZ3JvdXBzOiBbJ2NsaXBib2FyZCcsICd1bmRvJ10gfSxcclxuICAgICAgeyBuYW1lOiAnZWRpdGluZycsIGdyb3VwczogWydmaW5kJywgJ3NlbGVjdGlvbicsICdzcGVsbGNoZWNrZXInLCAnZWRpdGluZyddIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Zvcm1zJywgZ3JvdXBzOiBbJ2Zvcm1zJ10gfSxcclxuICAgICAgeyBuYW1lOiAnYmFzaWNzdHlsZXMnLCBncm91cHM6IFsnYmFzaWNzdHlsZXMnLCAnY2xlYW51cCddIH0sXHJcbiAgICAgIHsgbmFtZTogJ3BhcmFncmFwaCcsIGdyb3VwczogWydsaXN0JywgJ2luZGVudCcsICdibG9ja3MnLCAnYWxpZ24nLCAnYmlkaScsICdwYXJhZ3JhcGgnXSB9LFxyXG4gICAgICB7IG5hbWU6ICdsaW5rcycsIGdyb3VwczogWydsaW5rcyddIH0sXHJcbiAgICAgIHsgbmFtZTogJ2luc2VydCcsIGdyb3VwczogWydpbnNlcnQnXSB9LFxyXG4gICAgIFxyXG4gICAgICB7IG5hbWU6ICdzdHlsZXMnLCBncm91cHM6IFsnc3R5bGVzJ10gfSxcclxuICAgICAgeyBuYW1lOiAnY29sb3JzJywgZ3JvdXBzOiBbJ2NvbG9ycyddIH0sXHJcbiAgICAgIHsgbmFtZTogJ3Rvb2xzJywgZ3JvdXBzOiBbJ3Rvb2xzJ10gfSxcclxuICAgICAgeyBuYW1lOiAnb3RoZXJzJywgZ3JvdXBzOiBbJ290aGVycyddIH0sXHJcbiAgICAgIHsgbmFtZTogJ2Fib3V0JywgZ3JvdXBzOiBbJ2Fib3V0J10gfVxyXG4gICAgXSxcclxuICAgIHJlbW92ZUJ1dHRvbnM6ICdTb3VyY2UsU2F2ZSxOZXdQYWdlLFByZXZpZXcsUHJpbnQsVGVtcGxhdGVzLEN1dCxDb3B5LFBhc3RlLFBhc3RlVGV4dCxQYXN0ZUZyb21Xb3JkLFVuZG8sUmVkbyxGaW5kLFJlcGxhY2UsU2VsZWN0QWxsLFNjYXl0LEZvcm0sQ2hlY2tib3gsUmFkaW8sVGV4dEZpZWxkLFRleHRhcmVhLFNlbGVjdCxCdXR0b24sSW1hZ2VCdXR0b24sSGlkZGVuRmllbGQsU3RyaWtlLFN1YnNjcmlwdCxTdXBlcnNjcmlwdCxDb3B5Rm9ybWF0dGluZyxSZW1vdmVGb3JtYXQsT3V0ZGVudCxJbmRlbnQsQ3JlYXRlRGl2LEJsb2NrcXVvdGUsQmlkaUx0cixCaWRpUnRsLExhbmd1YWdlLFVubGluayxBbmNob3IsSW1hZ2UsRmxhc2gsVGFibGUsSG9yaXpvbnRhbFJ1bGUsU21pbGV5LFNwZWNpYWxDaGFyLFBhZ2VCcmVhayxJZnJhbWUsTWF4aW1pemUsU2hvd0Jsb2NrcyxBYm91dCdcclxuICB9XHJcbn1cclxuIl19