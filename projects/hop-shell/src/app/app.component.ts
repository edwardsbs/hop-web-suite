import { Component, computed, inject, signal } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Application, extractNavItems } from './nav.utils';
import { routes } from './app.routes';
import { NavService } from './nav.service';
import { FEATURES_ROUTES } from 'features';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule, 
    RouterLink, 
    MatButtonModule,
    MatMenuModule, 
    MatIconModule, 
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('hop-shell');

  navService = inject(NavService);

  constructor() {}



  navItems = signal(this.navService.getNavItems(FEATURES_ROUTES));
  
  appCategories = computed(() => {
    return [...new Set(
        this.navItems()
            .map(item => {
                const value = item['section'];
                return typeof value === "string" ? value : String(value);
            })
    )];
  })

  nestedAppList = computed(() => {
    let apps: {section: string, apps: Application[]}[] = []
    this.appCategories().forEach(c => {
      apps.push({
        section: c,
        apps: this.navItems().filter(a => a.section === c)
      }  as {section: string, apps: Application[]})
    })
    return apps
  })

  
}
