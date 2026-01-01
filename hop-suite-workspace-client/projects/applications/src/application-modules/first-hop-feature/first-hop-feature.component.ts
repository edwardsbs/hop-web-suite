import { Component, computed, inject } from '@angular/core';
import { AuthStore } from '../../../../hop-shell/src/app/auth/data-access/store/auth.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'first-hop-feature',
  templateUrl: './first-hop-feature.component.html',
  styleUrl: './first-hop-feature.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class FirstHopFeatureComponent {
  private auth = inject(AuthStore);

  name = computed(() => this.auth.user()?.name ?? 'Guest');
  isAdmin = this.auth.hasRole('Admin'); // returns a computed signal

}
