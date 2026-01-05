import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { API_BASE } from '../../../http/api.base';
import { LoginResponse, Session, Role } from '../models/auth.models';
import { tap } from 'rxjs/operators';
import { environment } from 'projects/hop-shell/src/environments/environment';
// import { environment } from '../../src/environments/environment';

const STORAGE_KEY = 'hop-web.session';

const API_BASE = environment.authService

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _session = signal<Session | null>(this.load());
  session = this._session.asReadonly();

  isAuthed = computed(() => !!this._session());
  role = computed<Role | null>(() => this._session()?.role ?? null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${API_BASE}/auth/login`, { username, password }).pipe(
      tap(res => {
         const session: Session = { token: res.token, username: res.username, role: res.role };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        this._session.set(session);
      })
    );
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this._session.set(null);
  }

  private load(): Session | null {
    try {
      const token = localStorage.getItem(STORAGE_KEY);

      if (!token) {
        this.logout();
      } else {
        if(this.isJwtExpired(token)) {
          this.logout();
        }
      }

      return token ? (JSON.parse(token) as Session) : null;
    } catch {
      return null;
    }
  }

  private isJwtExpired(token: string): boolean {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    const { exp } = JSON.parse(json) as { exp?: number };
    if (!exp) return true; // no exp? assume bad token
    
    const remainingSeconds = Math.max(
      0, Math.floor(( (exp * 1000) - Date.now()) / 1000)
    );

    console.log('token', json, Date.now(), exp * 1000, this.formatRemainingTime(remainingSeconds))
    return Date.now() >= exp * 1000;
  }

  private formatRemainingTime(totalSeconds: number): string {
    if (totalSeconds <= 0) return 'expired';

    // seconds
    if (totalSeconds < 60) {
      return `${totalSeconds}s`;
    }

    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    // minutes
    if (totalMinutes < 60) {
      // return `${totalMinutes}m`;
      return `${totalMinutes}m:${remainingSeconds.toString().padStart(2, '0')}s`;
    }

    // hours : minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h:${minutes.toString().padStart(2, '0')}m`;
  }

}
