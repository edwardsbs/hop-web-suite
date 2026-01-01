import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './data-access/services/auth.service';

export const authGuard: CanMatchFn = (_route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthed()) return true;
  return router.parseUrl('/login');
};

export const roleGuard = (roles: string[]): CanMatchFn => (_route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.role();
  if (!role) return router.parseUrl('/login');
  if (roles.includes(role)) return true;

  return router.parseUrl('/forbidden');
};
