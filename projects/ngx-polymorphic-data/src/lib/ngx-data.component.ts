import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef} from '@angular/core';
import {NgxPolymorphicDataStoreService} from './ngx-polymorphic-data-store.service';

@Component({
  selector: 'ngx-data',
  template: `
    <ng-container *ngIf="templateRef">
      <ng-container *ngTemplateOutlet="templateRef; context: getContext()"></ng-container>
    </ng-container>
  `,
  styles: [
  ]
})
export class NgxDataComponent implements OnChanges {

  @Input()
  data: any;
  templateRef: TemplateRef<any>;

  constructor(private readonly polymorphicDataStoreService: NgxPolymorphicDataStoreService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.templateRef = this.polymorphicDataStoreService.resolveTemplateRef(this.data);
    }
  }

  getContext(): { data: any } {
    return {
      data: this.data
    };
  }

}
