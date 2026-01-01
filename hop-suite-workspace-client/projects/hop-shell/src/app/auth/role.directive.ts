import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from './/data-access/services/auth.service';
import { Role } from './data-access/models/auth.models';

@Directive({ selector: '[appRole]' })
export class RoleDirective {
  private auth = inject(AuthService);
  private tpl = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);

  @Input('appRole') allowed: Role[] = [];

  constructor() {
    effect(() => {
      this.vcr.clear();
      const role = this.auth.role();
      if (role && this.allowed.includes(role)) {
        this.vcr.createEmbeddedView(this.tpl);
      }
    });
  }
}
