import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'ngx-polymorphic-data',
  template: ``,
  styles: []
})
export abstract class NgxPolymorphicDataComponent {

  @ViewChild('template', { read: TemplateRef })
  template: TemplateRef<any>;

  protected constructor() { }

}
