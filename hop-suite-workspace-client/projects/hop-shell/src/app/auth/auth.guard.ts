import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './data-access/services/auth.service';
// import { AuthStore } from './data-access/store/auth.store';

export const authGuard: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const auth = inject(AuthService);
  // const store = inject(AuthStore);
  const router = inject(Router);

  if (auth.isAuthed()) return true;
  // return router.parseUrl('/login');

  // Reconstruct attempted path: /whatever/they/wanted
  console.log('segments', segments)
  const returnUrl = '/' + segments.map(s => s.path).join('/');

  return router.createUrlTree(
    ['/login'],
    { queryParams: { returnUrl } }
  );

};

export const roleGuard = (roles: string[]): CanMatchFn => (_route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.role();
  if (!role) return router.parseUrl('/login');
  if (roles.includes(role)) return true;

  return router.parseUrl('/forbidden');
};
