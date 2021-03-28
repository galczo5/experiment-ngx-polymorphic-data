import {Inject, Injectable, TemplateRef} from '@angular/core';
import {PolymorphicData} from './polymorphic-data';
import {NgxPolymorphicDataTemplateResolverStrategy, RESOLVER_STRATEGY} from './ngx-polymorphic-data-template-resolver-strategy';

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
              private readonly polymorphicTemplateService: NgxPolymorphicTemplateService) { }

  addComponent<T>(component: PolymorphicData<T>): void {
    this.definedComponents.push(component);
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
    } else if (components.length === 0) {
      throw new Error('Data cannot be displayed with defined components.');
    }

    return this.polymorphicTemplateService.get(components[0]);
  }

  private objectMatch(selector: any, data: any): boolean {
    return isEmpty(difference(selector, data));
  }
}

/*
const a = { a: 1, c: 1, b: 1, s: [1, 2, 3], d: { x: 1 } }; // selector
const b = { a: 1, b: 1, c: 1 };
console.log(difference(a, b));
 */
