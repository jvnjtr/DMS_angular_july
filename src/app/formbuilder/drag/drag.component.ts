import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { DropService } from 'src/app/services/drop.service';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss']
})
export class DragComponent implements OnInit {

  constructor(public dropService: DropService) { }

  ngOnInit() {

  }

  currentDateTime: any;
  origin = [
    { ctrlTypeId: 1, controlname: "Label", controltype: "label", ctrlicon: "icon-text-width-solid", ctrlclass: "UiLabelField" },
    { ctrlTypeId: 2, controlname: "TextBox", controltype: "text", ctrlicon: "icon-keyboard", ctrlclass: "UiTextField" },
    { ctrlTypeId: 3, controlname: "Dropdown", controltype: "select", ctrlicon: "icon-list-ul-solid", ctrlclass: "UiSelectField" },
    { ctrlTypeId: 4, controlname: "TextArea", controltype: "textarea", ctrlicon: "icon-tablet-solid", ctrlclass: "UiTextareaField" },
    { ctrlTypeId: 5, controlname: "Checkbox", controltype: "checkbox", ctrlicon: "icon-square", ctrlclass: "UiCheckField" },
    { ctrlTypeId: 6, controlname: "Radio", controltype: "radio", ctrlicon: "icon-circle", ctrlclass: "UiRadioField" },
    { ctrlTypeId: 7, controlname: "File Upload", controltype: "file", ctrlicon: "icon-upload-solid", ctrlclass: "UiFileField" },
    { ctrlTypeId: 8, controlname: "Heading", controltype: "Heading", ctrlicon: "icon-heading-solid", ctrlclass: "UiHeadingField" },
    { ctrlTypeId: 9, controlname: "Link Button", controltype: "button", ctrlicon: "icon-closed-captioning", ctrlclass: "UiBtnField" },
    { ctrlTypeId: 11, controlname: "Hidden", controltype: "hidden", ctrlicon: "icon-keyboard", ctrlclass: "UiHiddenField" },
    { ctrlTypeId: 12, controlname: "Paragraph", controltype: "paragraph", ctrlicon: "icon-paragraph-solid", ctrlclass: "UiParagraphField" },
    { ctrlTypeId: 10, controlname: "Addmore", controltype: "addmore", ctrlicon: "icon-plus-solid", ctrlclass: "UiAddmoreField" },
  ];

  onDrop(event: CdkDragDrop<any[]>) {
    this.dropService.drop(event);
  }
}
