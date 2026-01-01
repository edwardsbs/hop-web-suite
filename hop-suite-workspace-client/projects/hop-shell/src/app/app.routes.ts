import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', title: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: '',
        title: '',
        loadChildren: () =>
        import('features').then(m => m.FEATURES_ROUTES) //'features' path is set in the tsconfig.json file
    },
];

