import {APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {NgxPolymorphicDataComponent} from './ngx-polymorphic-data.component';
import {NgxPolymorphicDataTemplateResolverStrategy, RESOLVER_STRATEGY} from './ngx-polymorphic-data-template-resolver-strategy';
import {NgxDataComponent} from './ngx-data.component';
import {CommonModule} from '@angular/common';
import {PolymorphicData} from './polymorphic-data';
import {NgxPolymorphicDataStoreService} from './ngx-polymorphic-data-store.service';

export const COMPONENT = new InjectionToken('');

/**
 * @dynamic
 */
export function componentFactory(data: Array<Array<PolymorphicData<any>>>,
                                 polymorphicDataStoreService: NgxPolymorphicDataStoreService): () => void {
  return () => {
    const flatList = data.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
    for (const component of flatList) {
      polymorphicDataStoreService.addComponent(component);
    }
  };
}

/**
 * @dynamic
 */
@NgModule({
  declarations: [NgxDataComponent],
  imports: [
    CommonModule
  ],
  providers: [
    {provide: RESOLVER_STRATEGY, useValue: NgxPolymorphicDataTemplateResolverStrategy.FIRST}
  ],
  exports: [NgxDataComponent]
})
export class NgxPolymorphicDataModule {

  static forComponents(...components: Array<PolymorphicData<any>>): ModuleWithProviders<NgxPolymorphicDataModule> {
    return {
      ngModule: NgxPolymorphicDataModule,
      providers: [
        {
          provide: COMPONENT,
          useValue: components,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: componentFactory,
          deps: [COMPONENT, NgxPolymorphicDataStoreService],
          multi: true
        }
      ]
    };
  }

}
