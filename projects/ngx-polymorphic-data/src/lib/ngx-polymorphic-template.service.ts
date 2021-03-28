import {ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef} from '@angular/core';
import {PolymorphicData} from './polymorphic-data';
import {NgxPolymorphicDataTemplateResolverStrategy, RESOLVER_STRATEGY} from './ngx-polymorphic-data-template-resolver-strategy';

@Injectable({
  providedIn: 'root'
})
export class NgxPolymorphicTemplateService {

  private readonly templates: Map<string, TemplateRef<any>> = new Map<string, TemplateRef<any>>();

  constructor(@Inject(RESOLVER_STRATEGY) private readonly strategy: NgxPolymorphicDataTemplateResolverStrategy,
              private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly injector: Injector) { }

  get(polymorphicData: PolymorphicData<any>): TemplateRef<any> {

    const id = polymorphicData.id;

    if (this.templates.has(id)) {
      return this.templates.get(id);
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(polymorphicData.component);
    const componentRef = componentFactory.create(this.injector);

    componentRef.changeDetectorRef.detectChanges();

    const templateRef = componentRef.instance.template;

    if (!templateRef) {
      throw new Error(`NgxPolymorphicDataComponent has to contain element <ng-template #template></ng-template>`);
    }

    this.templates.set(id, templateRef);
    return templateRef;
  }

}
