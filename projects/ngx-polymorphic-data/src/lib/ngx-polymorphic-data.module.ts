import {APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {
  NgxPolymorphicDataTemplateResolverStrategy,
  RESOLVER_STRATEGY,
  THROW_ERROR_WHEN_TEMPLATE_NOT_FOUND
} from './ngx-polymorphic-data-template-resolver-strategy';
import {NgxDataComponent} from './ngx-data.component';
import {CommonModule} from '@angular/common';
import {PolymorphicData} from './polymorphic-data';
import {NgxPolymorphicDataStoreService} from './ngx-polymorphic-data-store.service';

export const COMPONENT = new InjectionToken('');

export type NgxPolymorphicDataOptions = {
  resolverStrategy: NgxPolymorphicDataTemplateResolverStrategy,
  throwErrorWhenTemplateNotFound: boolean
};

/**
 * @dynamic
 */
export function componentFactory(data: Array<Array<PolymorphicData<any>>>,
                                 polymorphicDataStoreService: NgxPolymorphicDataStoreService): () => void {
  return () => {
    const flatList = data.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
    polymorphicDataStoreService.addComponents(flatList);
  };
}

/**
 * @dynamic
 */
@NgModule({
  declarations: [NgxDataComponent],
  imports: [CommonModule],
  exports: [NgxDataComponent]
})
export class NgxPolymorphicDataModule {

  static forComponents(components: Array<PolymorphicData<any>>,
                       options?: Partial<NgxPolymorphicDataOptions>): ModuleWithProviders<NgxPolymorphicDataModule> {

    return {
      ngModule: NgxPolymorphicDataModule,
      providers: [
        {
          provide: RESOLVER_STRATEGY,
          useValue: options.resolverStrategy !== undefined
            ? options.resolverStrategy
            : NgxPolymorphicDataTemplateResolverStrategy.FIRST
        },
        {
          provide: THROW_ERROR_WHEN_TEMPLATE_NOT_FOUND,
          useValue: options.throwErrorWhenTemplateNotFound !== undefined
            ? options.throwErrorWhenTemplateNotFound
            : true
        },
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
