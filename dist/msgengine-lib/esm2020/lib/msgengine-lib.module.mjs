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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNnZW5naW5lLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tc2dlbmdpbmUtbGliL3NyYy9saWIvbXNnZW5naW5lLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUN2RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBS2pELDBGQUEwRjtBQUMxRiw2RkFBNkY7QUE2QzdGLE1BQU0sT0FBTyxrQkFBa0I7O2dIQUFsQixrQkFBa0I7aUhBQWxCLGtCQUFrQixpQkFwQzNCLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLGFBQWEsYUFNYixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLFNBQVM7UUFDVCxjQUFjO1FBQ2QsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixZQUFZLGFBR1oscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsd0JBQXdCO2lIQUdmLGtCQUFrQixZQXJCM0IsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixTQUFTO1FBQ1QsY0FBYztRQUNkLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsWUFBWTs0RkFZSCxrQkFBa0I7a0JBdEM5QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLHNCQUFzQjt3QkFDdEIsbUJBQW1CO3dCQUNuQixxQkFBcUI7d0JBQ3JCLHNCQUFzQjt3QkFDdEIsd0JBQXdCO3dCQUN4QixhQUFhO3FCQUlkO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGlCQUFpQjt3QkFDakIsU0FBUzt3QkFDVCxjQUFjO3dCQUNkLG1CQUFtQjt3QkFDbkIsaUJBQWlCO3dCQUNqQixZQUFZO3FCQUNiO29CQUNELE9BQU8sRUFBRTt3QkFDUCxxQkFBcUI7d0JBQ3JCLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLHFCQUFxQjt3QkFDckIsc0JBQXNCO3dCQUN0Qix3QkFBd0I7cUJBQ3pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1zZ2VuZ2luZUxpYkNvbXBvbmVudCB9IGZyb20gJy4vbXNnZW5naW5lLWxpYi5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ3hEcm9wem9uZU1vZHVsZSB9IGZyb20gJ25neC1kcm9wem9uZSc7XG5cbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IENLRWRpdG9yTW9kdWxlIH0gZnJvbSAnY2tlZGl0b3I0LWFuZ3VsYXInO1xuaW1wb3J0IHsgQWRkZ2V0d2F5Q29tcG9uZW50IH0gZnJvbSAnLi9hZGRnZXR3YXkvYWRkZ2V0d2F5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5cbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMaWJ0YWJzQ29tcG9uZW50IH0gZnJvbSAnLi9saWJ0YWJzL2xpYnRhYnMuY29tcG9uZW50JztcbmltcG9ydCB7IExpYnV0aWxzQ29tcG9uZW50IH0gZnJvbSAnLi9saWJ1dGlscy9saWJ1dGlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlicGFnaW5hdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbGlicGFnaW5hdGlvbi9saWJwYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3Z2V0d2F5Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3Z2V0d2F5L3ZpZXdnZXR3YXkuY29tcG9uZW50JztcbmltcG9ydCB7IEFkZG1zZ2VuZ2luZUNvbXBvbmVudCB9IGZyb20gJy4vYWRkbXNnZW5naW5lL2FkZG1zZ2VuZ2luZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVmlld21zZ2VuZ2luZUNvbXBvbmVudCB9IGZyb20gJy4vdmlld21zZ2VuZ2luZS92aWV3bXNnZW5naW5lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3bXNncmVtaW5kZXJDb21wb25lbnQgfSBmcm9tICcuL3ZpZXdtc2dyZW1pbmRlci92aWV3bXNncmVtaW5kZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRyYW5zbGF0ZVBpcGUgfSBmcm9tICcuL3RyYW5zbGF0ZS5waXBlJztcblxuXG5cblxuLy8gaW1wb3J0IHsgQWRkZ2V0d2F5Y29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi9hZGRnZXR3YXljb25maWcvYWRkZ2V0d2F5Y29uZmlnLmNvbXBvbmVudCc7XG4vLyBpbXBvcnQgeyBWaWV3Z2V0d2F5Y29uZmlnQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3Z2V0d2F5Y29uZmlnL3ZpZXdnZXR3YXljb25maWcuY29tcG9uZW50JztcblxuXG5cblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1zZ2VuZ2luZUxpYkNvbXBvbmVudCxcbiAgICBBZGRnZXR3YXlDb21wb25lbnQsXG4gICAgTGlidGFic0NvbXBvbmVudCxcbiAgICBMaWJ1dGlsc0NvbXBvbmVudCxcbiAgICBMaWJwYWdpbmF0aW9uQ29tcG9uZW50LFxuICAgIFZpZXdnZXR3YXlDb21wb25lbnQsXG4gICAgQWRkbXNnZW5naW5lQ29tcG9uZW50LFxuICAgIFZpZXdtc2dlbmdpbmVDb21wb25lbnQsXG4gICAgVmlld21zZ3JlbWluZGVyQ29tcG9uZW50LFxuICAgIFRyYW5zbGF0ZVBpcGUsXG4gICAgXG5cblxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBOZ3hEcm9wem9uZU1vZHVsZSxcbiAgICBOZ2JNb2R1bGUsXG4gICAgQ0tFZGl0b3JNb2R1bGUsXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcbiAgICBOZ3hEcm9wem9uZU1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1zZ2VuZ2luZUxpYkNvbXBvbmVudCxcbiAgICBBZGRnZXR3YXlDb21wb25lbnQsXG4gICAgTGlidGFic0NvbXBvbmVudCxcbiAgICBWaWV3Z2V0d2F5Q29tcG9uZW50LFxuICAgIEFkZG1zZ2VuZ2luZUNvbXBvbmVudCxcbiAgICBWaWV3bXNnZW5naW5lQ29tcG9uZW50LFxuICAgIFZpZXdtc2dyZW1pbmRlckNvbXBvbmVudCxcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNc2dlbmdpbmVMaWJNb2R1bGUgeyBcblxuXG4gIFxufVxuIl19