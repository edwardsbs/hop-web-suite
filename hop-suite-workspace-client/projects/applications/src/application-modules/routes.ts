import { Route, Routes } from '@angular/router';
import { FirstHopFeatureComponent } from './first-hop-feature/first-hop-feature.component';
import { SecondFeatureAppComponent } from './second-feature-app/second-feature-app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from 'projects/hop-shell/src/app/auth/auth.guard';


export const FEATURES_ROUTES: Routes = [
  { path: 'home', component: HomePageComponent,
    canMatch: [authGuard],
    data: { section: '', label: 'Home', icon: 'home', description: 'Back to Home', showInNav: true }
   },
  { path: 'first-hop-feature', component: FirstHopFeatureComponent,
    canMatch: [authGuard],
    data: { section: 'PSCC', label: 'First App', icon: 'alarm_on', description: 'High level STUFF', showInNav: true }
   },
  { path: 'second-hop-feature', component: SecondFeatureAppComponent,
    canMatch: [authGuard],
    data: { section: 'Business Unit', label: '2nd App', icon: 'add_shopping_cart', description: 'Taking CARE of business', showInNav: true }
   },
];
