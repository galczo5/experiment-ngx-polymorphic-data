import {Component} from '@angular/core';
import {NgxPolymorphicDataComponent} from '../../projects/ngx-polymorphic-data/src/lib/ngx-polymorphic-data.component';

@Component({
  selector: 'app-example-price',
  template: `
    <ng-template #template let-data="data">
      <b>{{ data.value }}</b>
      <i class="ml-2 text-red-500 fas fa-euro-sign"></i>
    </ng-template>
  `
})
export class PriceEuroComponent extends NgxPolymorphicDataComponent {

  constructor() {
    super();
  }

}
