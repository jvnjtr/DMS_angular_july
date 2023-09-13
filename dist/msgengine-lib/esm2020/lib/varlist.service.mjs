import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class VarlistService {
    constructor() {
        this.apiHashingKey = '22CSMTOOL2022';
        this.encryptIV = '26102021@qwI';
        this.serviceURL = 'http://172.27.30.93:7001/dms_php_admin/admin/message_module';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFybGlzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbXNnZW5naW5lLWxpYi9zcmMvbGliL3Zhcmxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sY0FBYztJQUgzQjtRQUlDLGtCQUFhLEdBQU0sZUFBZSxDQUFDO1FBQ2xDLGNBQVMsR0FBTSxjQUFjLENBQUM7UUFDOUIsZUFBVSxHQUFNLDZEQUE2RCxDQUFDO1FBQzlFLGdCQUFXLEdBQUssbUJBQW1CLENBQUM7UUFDcEMsd0JBQW1CLEdBQUssc0JBQXNCLENBQUM7UUFDL0MsZUFBVSxHQUFLLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFLLEtBQUssQ0FBQztRQUN0QixxQkFBZ0IsR0FBSyxJQUFJLENBQUM7UUFDMUIsV0FBTSxHQUFLLEdBQUcsQ0FBQztRQUNmLG1CQUFjLEdBQU0sc0JBQXNCLENBQUM7UUFDM0Msb0JBQWUsR0FBTSxrQkFBa0IsQ0FBQztRQUN4QyxxQkFBZ0IsR0FBTSx1QkFBdUIsQ0FBQztRQUM5QyxhQUFRLEdBQUs7WUFFWCxRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLE1BQU0sRUFBQyxHQUFHO1lBQ1YscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixVQUFVLEVBQUUsK0JBQStCO1lBQzNDLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLGFBQWEsRUFBRSxXQUFXO1lBQzFCLGFBQWEsRUFBRTtnQkFDYixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsRUFBRTtnQkFDOUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDcEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFO2dCQUM3RSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLEVBQUU7Z0JBQzNELEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFO2dCQUN6RixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3BDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFFdEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDcEMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN0QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7YUFDckM7WUFDRCxhQUFhLEVBQUUsMmFBQTJhO1NBQzNiLENBQUE7S0FDRjs7NEdBeENZLGNBQWM7Z0hBQWQsY0FBYyxjQUZiLE1BQU07NEZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFZhcmxpc3RTZXJ2aWNlIHtcbiBhcGlIYXNoaW5nS2V5OmFueT0gJzIyQ1NNVE9PTDIwMjInO1xuICBlbmNyeXB0SVY6YW55PSAnMjYxMDIwMjFAcXdJJztcbiAgc2VydmljZVVSTDphbnk9ICdodHRwOi8vMTcyLjI3LjMwLjkzOjcwMDEvZG1zX3BocF9hZG1pbi9hZG1pbi9tZXNzYWdlX21vZHVsZSc7XG4gIHNlcnZpY2VOYW1lOmFueT0nL3B1Ymxpc2hVbnB1Ymxpc2gnO1xuICBzZXJ2aWNlTW9kdWxlY29uZmlnOmFueT0nL21hbmFnZU1lc3NhZ2VDb25maWcnO1xuICBmb3JtRW5hYmxlOmFueT1mYWxzZTtcbiAgZHluYW1pY0Zvcm06YW55PWZhbHNlO1xuICBzZXNzaW9uRW5jcnlwdGVkOmFueT10cnVlO1xuICBmb3JtSWQ6YW55PVwiMFwiO1xuICBzb21ldGhpbmdXcm9uZzphbnk9ICdzb21ldGhpbmcgd2VudCB3cm9uZyc7XG4gIGludmFsaWRSZXNwb25zZTphbnk9ICdJbnZhbGlkIFJlc3BvbnNlJztcbiAgZXJyb3JBcGlSZXNwb25zZTphbnk9ICdFcnJvciBpbiBBUEkgcmVzcG9uc2UnO1xuICBja2NvbmZpZzphbnk9e1xuICAgICAgXG4gICAgbGFuZ3VhZ2U6IFwiZW5cIixcbiAgICBhbGxvd2VkQ29udGVudDogdHJ1ZSxcbiAgICBoZWlnaHQ6MjAwLFxuICAgIGZvcmNlUGFzdGVBc1BsYWluVGV4dDogdHJ1ZSxcbiAgICBmb250X25hbWVzOiAnQXJpYWw7VGltZXMgTmV3IFJvbWFuO1ZlcmRhbmEnLFxuICAgIGV4dHJhUGx1Z2luczogJ2RpdmFyZWEnLFxuICAgIHJlbW92ZVBsdWdpbnM6ICdleHBvcnRwZGYnLFxuICAgIHRvb2xiYXJHcm91cHM6IFtcbiAgICAgIHsgbmFtZTogJ2RvY3VtZW50JywgZ3JvdXBzOiBbJ21vZGUnLCAnZG9jdW1lbnQnLCAnZG9jdG9vbHMnXSB9LFxuICAgICAgeyBuYW1lOiAnY2xpcGJvYXJkJywgZ3JvdXBzOiBbJ2NsaXBib2FyZCcsICd1bmRvJ10gfSxcbiAgICAgIHsgbmFtZTogJ2VkaXRpbmcnLCBncm91cHM6IFsnZmluZCcsICdzZWxlY3Rpb24nLCAnc3BlbGxjaGVja2VyJywgJ2VkaXRpbmcnXSB9LFxuICAgICAgeyBuYW1lOiAnZm9ybXMnLCBncm91cHM6IFsnZm9ybXMnXSB9LFxuICAgICAgeyBuYW1lOiAnYmFzaWNzdHlsZXMnLCBncm91cHM6IFsnYmFzaWNzdHlsZXMnLCAnY2xlYW51cCddIH0sXG4gICAgICB7IG5hbWU6ICdwYXJhZ3JhcGgnLCBncm91cHM6IFsnbGlzdCcsICdpbmRlbnQnLCAnYmxvY2tzJywgJ2FsaWduJywgJ2JpZGknLCAncGFyYWdyYXBoJ10gfSxcbiAgICAgIHsgbmFtZTogJ2xpbmtzJywgZ3JvdXBzOiBbJ2xpbmtzJ10gfSxcbiAgICAgIHsgbmFtZTogJ2luc2VydCcsIGdyb3VwczogWydpbnNlcnQnXSB9LFxuICAgICBcbiAgICAgIHsgbmFtZTogJ3N0eWxlcycsIGdyb3VwczogWydzdHlsZXMnXSB9LFxuICAgICAgeyBuYW1lOiAnY29sb3JzJywgZ3JvdXBzOiBbJ2NvbG9ycyddIH0sXG4gICAgICB7IG5hbWU6ICd0b29scycsIGdyb3VwczogWyd0b29scyddIH0sXG4gICAgICB7IG5hbWU6ICdvdGhlcnMnLCBncm91cHM6IFsnb3RoZXJzJ10gfSxcbiAgICAgIHsgbmFtZTogJ2Fib3V0JywgZ3JvdXBzOiBbJ2Fib3V0J10gfVxuICAgIF0sXG4gICAgcmVtb3ZlQnV0dG9uczogJ1NvdXJjZSxTYXZlLE5ld1BhZ2UsUHJldmlldyxQcmludCxUZW1wbGF0ZXMsQ3V0LENvcHksUGFzdGUsUGFzdGVUZXh0LFBhc3RlRnJvbVdvcmQsVW5kbyxSZWRvLEZpbmQsUmVwbGFjZSxTZWxlY3RBbGwsU2NheXQsRm9ybSxDaGVja2JveCxSYWRpbyxUZXh0RmllbGQsVGV4dGFyZWEsU2VsZWN0LEJ1dHRvbixJbWFnZUJ1dHRvbixIaWRkZW5GaWVsZCxTdHJpa2UsU3Vic2NyaXB0LFN1cGVyc2NyaXB0LENvcHlGb3JtYXR0aW5nLFJlbW92ZUZvcm1hdCxPdXRkZW50LEluZGVudCxDcmVhdGVEaXYsQmxvY2txdW90ZSxCaWRpTHRyLEJpZGlSdGwsTGFuZ3VhZ2UsVW5saW5rLEFuY2hvcixJbWFnZSxGbGFzaCxUYWJsZSxIb3Jpem9udGFsUnVsZSxTbWlsZXksU3BlY2lhbENoYXIsUGFnZUJyZWFrLElmcmFtZSxNYXhpbWl6ZSxTaG93QmxvY2tzLEFib3V0J1xuICB9XG59XG4iXX0=