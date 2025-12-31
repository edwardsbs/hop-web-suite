import { Injectable } from "@angular/core";
import { Route } from "@angular/router";
import { Application, extractNavItems } from "./nav.utils";

@Injectable({ providedIn: 'root' })
export class NavService {
  getNavItems(routes: Route[]): Application[] {
    return extractNavItems(routes);
  }
}