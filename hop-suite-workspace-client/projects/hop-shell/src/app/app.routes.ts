import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', title: '', pathMatch: 'full', redirectTo: 'home' },
    // { path: 'login', title: 'Login', component: LoginComponent, },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        title: '',
        loadChildren: () =>
        import('features').then(m => m.FEATURES_ROUTES) //'features' path is set in the tsconfig.json file
    },
];

