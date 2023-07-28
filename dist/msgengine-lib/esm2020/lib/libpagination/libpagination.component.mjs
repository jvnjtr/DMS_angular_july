import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ngx-pagination";
import * as i2 from "../translate.pipe";
export class LibpaginationComponent {
    constructor() {
        this.callfunction = new EventEmitter();
    }
    ngOnInit() {
    }
    onTableDataChange(event) {
        this.callfunction.emit(event);
    }
}
LibpaginationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibpaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
LibpaginationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: LibpaginationComponent, selector: "lib-libpagination", inputs: { page: "page", count: "count", tableSize: "tableSize" }, outputs: { callfunction: "callfunction" }, ngImport: i0, template: "<div class=\"d-flex justify-content-end\">\n    <pagination-controls\n    \n    previousLabel=\"{{'Prev' | translate}}\"\n    nextLabel=\"{{'Next' | translate}}\"\n    (pageChange)=\"onTableDataChange($event)\"\n  >\n  </pagination-controls>\n </div>\n\n", styles: [""], dependencies: [{ kind: "component", type: i1.PaginationControlsComponent, selector: "pagination-controls", inputs: ["id", "maxSize", "directionLinks", "autoHide", "responsive", "previousLabel", "nextLabel", "screenReaderPaginationLabel", "screenReaderPageLabel", "screenReaderCurrentLabel"], outputs: ["pageChange", "pageBoundsCorrection"] }, { kind: "pipe", type: i2.TranslatePipe, name: "translate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: LibpaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-libpagination', template: "<div class=\"d-flex justify-content-end\">\n    <pagination-controls\n    \n    previousLabel=\"{{'Prev' | translate}}\"\n    nextLabel=\"{{'Next' | translate}}\"\n    (pageChange)=\"onTableDataChange($event)\"\n  >\n  </pagination-controls>\n </div>\n\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { page: [{
                type: Input
            }], count: [{
                type: Input
            }], tableSize: [{
                type: Input
            }], callfunction: [{
                type: Output,
                args: ["callfunction"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tc2dlbmdpbmUtbGliL3NyYy9saWIvbGlicGFnaW5hdGlvbi9saWJwYWdpbmF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21zZ2VuZ2luZS1saWIvc3JjL2xpYi9saWJwYWdpbmF0aW9uL2xpYnBhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQU8vRSxNQUFNLE9BQU8sc0JBQXNCO0lBTWpDO1FBRHdCLGlCQUFZLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQztJQUNELGlCQUFpQixDQUFDLEtBQVU7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7b0hBWlUsc0JBQXNCO3dHQUF0QixzQkFBc0Isc0tDUG5DLGdRQVVBOzRGREhhLHNCQUFzQjtrQkFMbEMsU0FBUzsrQkFDRSxtQkFBbUI7MEVBS3BCLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFFa0IsWUFBWTtzQkFBbkMsTUFBTTt1QkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbGlicGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9saWJwYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlicGFnaW5hdGlvbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlicGFnaW5hdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHBhZ2U6YW55O1xuICBASW5wdXQoKSBjb3VudDphbnk7XG4gIEBJbnB1dCgpIHRhYmxlU2l6ZTphbnk7XG5cbiAgQE91dHB1dChcImNhbGxmdW5jdGlvblwiKSBjYWxsZnVuY3Rpb246RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cbiAgb25UYWJsZURhdGFDaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuY2FsbGZ1bmN0aW9uLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZC1mbGV4IGp1c3RpZnktY29udGVudC1lbmRcIj5cbiAgICA8cGFnaW5hdGlvbi1jb250cm9sc1xuICAgIFxuICAgIHByZXZpb3VzTGFiZWw9XCJ7eydQcmV2JyB8IHRyYW5zbGF0ZX19XCJcbiAgICBuZXh0TGFiZWw9XCJ7eydOZXh0JyB8IHRyYW5zbGF0ZX19XCJcbiAgICAocGFnZUNoYW5nZSk9XCJvblRhYmxlRGF0YUNoYW5nZSgkZXZlbnQpXCJcbiAgPlxuICA8L3BhZ2luYXRpb24tY29udHJvbHM+XG4gPC9kaXY+XG5cbiJdfQ==