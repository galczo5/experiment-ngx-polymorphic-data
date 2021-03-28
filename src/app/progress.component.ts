import {Component} from '@angular/core';
import {NgxPolymorphicDataComponent} from '../../projects/ngx-polymorphic-data/src/lib/ngx-polymorphic-data.component';

@Component({
  selector: 'app-example',
  template: `
    <ng-template #template let-data="data">
      <div class="flex items-center">
        <div class="bg-gray-100 flex-1 h-2 rounded overflow-hidden">
          <div class="bg-blue-500 h-full" [style.width.%]="data.value"></div>
        </div>
        <div class="p-2 text-sm text-gray-500">
          {{ data.value }} %
        </div>
      </div>
    </ng-template>
  `
})
export class ProgressComponent extends NgxPolymorphicDataComponent {

  constructor() {
    super();
  }

}
