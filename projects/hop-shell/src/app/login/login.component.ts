import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor() { }

 
  private auth = inject(AuthService);
  private router = inject(Router);
  u = 'editor';
  p = 'editor';
  err = signal<string | null>(null);

  go() {
    this.err.set(null);
    this.auth.login(this.u, this.p).subscribe({
      next: () => this.router.navigateByUrl('/work-items'),
      error: () => this.err.set('Invalid credentials.')
    });
  }

}
