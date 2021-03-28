import {Component} from '@angular/core';
import {NgxPolymorphicDataComponent} from '../../projects/ngx-polymorphic-data/src/lib/ngx-polymorphic-data.component';

@Component({
  selector: 'app-example',
  template: `
    <ng-template #template let-data="data">
      <i class="fas fa-user-check text-green-500 mr-2"></i>
      {{ data.firstName }} <b>{{ data.lastName }}</b>
    </ng-template>
  `
})
export class FullNameComponent extends NgxPolymorphicDataComponent {

  constructor() {
    super();
  }

}
