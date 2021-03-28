import {Type} from '@angular/core';
import {NgxPolymorphicDataComponent} from './ngx-polymorphic-data.component';

export type FunctionSelector<T> = (data: T) => boolean;
export type ObjectSelector = any;
export type PolymorphicDataSelector<T> = ObjectSelector | FunctionSelector<T>;

export class PolymorphicData<T> {

  constructor(public readonly id: string,
              public readonly component: Type<NgxPolymorphicDataComponent>,
              public readonly selector: PolymorphicDataSelector<T>) {
  }

}

export function createPolymorphicData<T = any>(component: Type<NgxPolymorphicDataComponent>,
                                               selector: PolymorphicDataSelector<T>): PolymorphicData<T> {
  const id = (Math.random() * 1e32).toString(36);
  return new PolymorphicData<T>(id, component, selector);
}
