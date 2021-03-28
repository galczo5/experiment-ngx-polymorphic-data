import {Component} from '@angular/core';
import {NgxPolymorphicDataComponent} from '../../projects/ngx-polymorphic-data/src/lib/ngx-polymorphic-data.component';

@Component({
  selector: 'app-example-price',
  template: `
    <ng-template #template let-data="data">
      <b>{{ data.value }}</b>
      <i class="ml-2 text-red-500 fas fa-dollar-sign"></i>
    </ng-template>
  `
})
export class PriceDollarsComponent extends NgxPolymorphicDataComponent {

  constructor() {
    super();
  }

}
