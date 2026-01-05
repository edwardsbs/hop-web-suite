import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/data-access/services/auth.service';
import { BannerComponent } from './banner.component';

@Component({
  selector: 'hop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, BannerComponent],
})
export class LoginComponent {

  @Input() navUrl: string = ''
  private returnUrl = '/';

  constructor() {
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
   }

 
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  u = 'editor';
  p = 'editor';
  err = signal<string | null>(null);

  go() {
    this.err.set(null);
    this.auth.login(this.u, this.p).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: () => this.err.set('Invalid credentials.')
    });
  }

}
