import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-banner',
  standalone: true,
  template: `
    <div class="banner" role="status" [attr.aria-live]="kind==='error' ? 'assertive' : 'polite'">
      @if(title) {
        <strong>{{title}}</strong>
      }
      <span>{{message}}</span>
    </div>
  `,
  styles: [`
    .banner{ padding:12px; border-radius:10px; border:1px solid #ccc; }
  `]
})
export class BannerComponent {
  @Input() title?: string;
  @Input() message = '';
  @Input() kind: 'info'|'error' = 'info';
}
