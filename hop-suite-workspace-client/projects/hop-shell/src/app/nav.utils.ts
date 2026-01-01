// nav.utils.ts
import { Route } from '@angular/router';

export type Application = {
  section: string,
  appName: string,
  appRoute: string,
  appDescription: string,
  icon: string,
  isActive: boolean,
}

export function extractNavItems(routes: Route[],  parentPath = ''): Application[] {
  return routes.filter(r => r.path !== 'home').flatMap(route => {
    const currentPath =
      route.path != null
        ? `${parentPath}/${route.path}`.replace('//', '/')
        : parentPath;

    const current: Application[] =
      route.data?.['showInNav']
        ? [
            {
                section: route.data?.['section'],
                appName: route.data?.['label'],
                appRoute: route.path?? '',
                appDescription: route.data?.['description'],
                icon: route.data?.['icon'],
                isActive: true,
            } as Application
        ]
        : [];

    const children = route.children
      ? extractNavItems(route.children, currentPath)
      : [];

    return [...current, ...children];
  });
}
