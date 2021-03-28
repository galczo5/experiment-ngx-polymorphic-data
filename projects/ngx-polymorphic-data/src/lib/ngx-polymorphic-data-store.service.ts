import {Inject, Injectable, TemplateRef} from '@angular/core';
import {PolymorphicData} from './polymorphic-data';
import {NgxPolymorphicDataTemplateResolverStrategy, RESOLVER_STRATEGY, THROW_ERROR_WHEN_TEMPLATE_NOT_FOUND} from './ngx-polymorphic-data-template-resolver-strategy';

import { transform, isEqual, isObject, isEmpty } from 'lodash';
import {NgxPolymorphicTemplateService} from './ngx-polymorphic-template.service';

function difference(object, base): any {
  return transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value;
    }
  });
}

@Injectable({
  providedIn: 'root'
})
export class NgxPolymorphicDataStoreService {

  private readonly definedComponents: Array<PolymorphicData<any>> = [];

  constructor(@Inject(RESOLVER_STRATEGY) private readonly strategy: NgxPolymorphicDataTemplateResolverStrategy,
              @Inject(THROW_ERROR_WHEN_TEMPLATE_NOT_FOUND) private readonly throwErrorWhenTemplateNotFound: boolean,
              private readonly polymorphicTemplateService: NgxPolymorphicTemplateService) { }

  addComponent<T>(component: PolymorphicData<T>): void {
    this.definedComponents.push(component);
  }

  addComponents<T>(components: Array<PolymorphicData<T>>): void {
    components.forEach(c => this.addComponent(c));
  }

  resolveTemplateRef(data: any): TemplateRef<any> {
    const components = this.definedComponents.filter(c => {
      if (typeof c.selector === 'function') {
        return c.selector(data);
      } else {
        return this.objectMatch(c.selector, data);
      }
    });

    if (this.strategy === NgxPolymorphicDataTemplateResolverStrategy.THROW_ERROR && components.length > 1) {
      throw new Error('More than one components can display data.');
    } else if (this.throwErrorWhenTemplateNotFound && components.length === 0) {
      throw new Error('Data cannot be displayed with defined components.');
    } else if (!this.throwErrorWhenTemplateNotFound && components.length === 0) {
      return null;
    }

    return this.polymorphicTemplateService.get(components[0]);
  }

  private objectMatch(selector: any, data: any): boolean {
    return isEmpty(difference(selector, data));
  }
}
