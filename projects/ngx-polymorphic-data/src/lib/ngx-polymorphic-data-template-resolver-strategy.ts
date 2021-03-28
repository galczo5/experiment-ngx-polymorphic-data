import {InjectionToken} from '@angular/core';

export enum NgxPolymorphicDataTemplateResolverStrategy {
  FIRST = 0,
  THROW_ERROR = 1
}

export const RESOLVER_STRATEGY = new InjectionToken('');

export const THROW_ERROR_WHEN_TEMPLATE_NOT_FOUND = new InjectionToken('');
