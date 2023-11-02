import { NgModule } from '@angular/core';
import { MsgengineLibComponent } from './msgengine-lib.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ckeditor4-angular';
import { AddgetwayComponent } from './addgetway/addgetway.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LibtabsComponent } from './libtabs/libtabs.component';
import { LibutilsComponent } from './libutils/libutils.component';
import { LibpaginationComponent } from './libpagination/libpagination.component';
import { ViewgetwayComponent } from './viewgetway/viewgetway.component';
import { AddmsgengineComponent } from './addmsgengine/addmsgengine.component';
import { ViewmsgengineComponent } from './viewmsgengine/viewmsgengine.component';
import { ViewmsgreminderComponent } from './viewmsgreminder/viewmsgreminder.component';
import { TranslatePipe } from './translate.pipe';
import * as i0 from "@angular/core";
// import { AddgetwayconfigComponent } from './addgetwayconfig/addgetwayconfig.component';
// import { ViewgetwayconfigComponent } from './viewgetwayconfig/viewgetwayconfig.component';
export class MsgengineLibModule {
}
MsgengineLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MsgengineLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, declarations: [MsgengineLibComponent,
        AddgetwayComponent,
        LibtabsComponent,
        LibutilsComponent,
        LibpaginationComponent,
        ViewgetwayComponent,
        AddmsgengineComponent,
        ViewmsgengineComponent,
        ViewmsgreminderComponent,
        TranslatePipe], imports: [CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        NgbModule,
        CKEditorModule,
        NgxPaginationModule,
        NgxDropzoneModule,
        RouterModule], exports: [MsgengineLibComponent,
        AddgetwayComponent,
        LibtabsComponent,
        ViewgetwayComponent,
        AddmsgengineComponent,
        ViewmsgengineComponent,
        ViewmsgreminderComponent] });
MsgengineLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, imports: [CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDropzoneModule,
        NgbModule,
        CKEditorModule,
        NgxPaginationModule,
        NgxDropzoneModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: MsgengineLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MsgengineLibComponent,
                        AddgetwayComponent,
                        LibtabsComponent,
                        LibutilsComponent,
                        LibpaginationComponent,
                        ViewgetwayComponent,
                        AddmsgengineComponent,
                        ViewmsgengineComponent,
                        ViewmsgreminderComponent,
                        TranslatePipe,
                    ],
                    imports: [
                        CommonModule,
                        HttpClientModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgxDropzoneModule,
                        NgbModule,
                        CKEditorModule,
                        NgxPaginationModule,
                        NgxDropzoneModule,
                        RouterModule
                    ],
                    exports: [
                        MsgengineLibComponent,
                        AddgetwayComponent,
                        LibtabsComponent,
                        ViewgetwayComponent,
                        AddmsgengineComponent,
                        ViewmsgengineComponent,
                        ViewmsgreminderComponent,
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnZW5naW5lLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tc2dlbmdpbmUtbGliL3NyYy9saWIvbXNnZW5naW5lLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBS2pELDBGQUEwRjtBQUMxRiw2RkFBNkY7QUE2QzdGLE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFwQzNCLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLGFBQWEsYUFNYixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLFNBQVM7UUFDVCxjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixZQUFZLGFBR1oscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsd0JBQXdCO2lIQUdmLGtCQUFrQixZQXJCM0IsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixTQUFTO1FBQ1QsY0FBYztRQUNkLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsWUFBWTs0RkFZSCxrQkFBa0I7a0JBdEM5QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4QixhQUFhO3FCQUlkO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsU0FBUzt3QkFDVCxjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7cUJBQ3pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXNnZW5naW5lTGliQ29tcG9uZW50IH0gZnJvbSAnLi9tc2dlbmdpbmUtbGliLmNvbXBvbmVudCc7XHJcblxyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4RHJvcHpvbmVNb2R1bGUgfSBmcm9tICduZ3gtZHJvcHpvbmUnO1xyXG5cclxuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xyXG5cclxuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcclxuaW1wb3J0IHsgQ0tFZGl0b3JNb2R1bGUgfSBmcm9tICdja2VkaXRvcjQtYW5ndWxhcic7XHJcbmltcG9ydCB7IEFkZGdldHdheUNvbXBvbmVudCB9IGZyb20gJy4vYWRkZ2V0d2F5L2FkZGdldHdheS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuXHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IExpYnRhYnNDb21wb25lbnQgfSBmcm9tICcuL2xpYnRhYnMvbGlidGFicy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaWJ1dGlsc0NvbXBvbmVudCB9IGZyb20gJy4vbGlidXRpbHMvbGlidXRpbHMuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlicGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbGlicGFnaW5hdGlvbi9saWJwYWdpbmF0aW9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpZXdnZXR3YXlDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdnZXR3YXkvdmlld2dldHdheS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBZGRtc2dlbmdpbmVDb21wb25lbnQgfSBmcm9tICcuL2FkZG1zZ2VuZ2luZS9hZGRtc2dlbmdpbmUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVmlld21zZ2VuZ2luZUNvbXBvbmVudCB9IGZyb20gJy4vdmlld21zZ2VuZ2luZS92aWV3bXNnZW5naW5lLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFZpZXdtc2dyZW1pbmRlckNvbXBvbmVudCB9IGZyb20gJy4vdmlld21zZ3JlbWluZGVyL3ZpZXdtc2dyZW1pbmRlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUcmFuc2xhdGVQaXBlIH0gZnJvbSAnLi90cmFuc2xhdGUucGlwZSc7XHJcblxyXG5cclxuXHJcblxyXG4vLyBpbXBvcnQgeyBBZGRnZXR3YXljb25maWdDb21wb25lbnQgfSBmcm9tICcuL2FkZGdldHdheWNvbmZpZy9hZGRnZXR3YXljb25maWcuY29tcG9uZW50JztcclxuLy8gaW1wb3J0IHsgVmlld2dldHdheWNvbmZpZ0NvbXBvbmVudCB9IGZyb20gJy4vdmlld2dldHdheWNvbmZpZy92aWV3Z2V0d2F5Y29uZmlnLmNvbXBvbmVudCc7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNc2dlbmdpbmVMaWJDb21wb25lbnQsXHJcbiAgICBBZGRnZXR3YXlDb21wb25lbnQsXHJcbiAgICBMaWJ0YWJzQ29tcG9uZW50LFxyXG4gICAgTGlidXRpbHNDb21wb25lbnQsXHJcbiAgICBMaWJwYWdpbmF0aW9uQ29tcG9uZW50LFxyXG4gICAgVmlld2dldHdheUNvbXBvbmVudCxcclxuICAgIEFkZG1zZ2VuZ2luZUNvbXBvbmVudCxcclxuICAgIFZpZXdtc2dlbmdpbmVDb21wb25lbnQsXHJcbiAgICBWaWV3bXNncmVtaW5kZXJDb21wb25lbnQsXHJcbiAgICBUcmFuc2xhdGVQaXBlLFxyXG4gICAgXHJcblxyXG5cclxuICBdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBOZ3hEcm9wem9uZU1vZHVsZSxcclxuICAgIE5nYk1vZHVsZSxcclxuICAgIENLRWRpdG9yTW9kdWxlLFxyXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcclxuICAgIE5neERyb3B6b25lTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNc2dlbmdpbmVMaWJDb21wb25lbnQsXHJcbiAgICBBZGRnZXR3YXlDb21wb25lbnQsXHJcbiAgICBMaWJ0YWJzQ29tcG9uZW50LFxyXG4gICAgVmlld2dldHdheUNvbXBvbmVudCxcclxuICAgIEFkZG1zZ2VuZ2luZUNvbXBvbmVudCxcclxuICAgIFZpZXdtc2dlbmdpbmVDb21wb25lbnQsXHJcbiAgICBWaWV3bXNncmVtaW5kZXJDb21wb25lbnQsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXNnZW5naW5lTGliTW9kdWxlIHsgXHJcblxyXG5cclxuICBcclxufVxyXG4iXX0=