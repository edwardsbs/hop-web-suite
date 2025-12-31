import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../../http/api.base';
import { LoginResponse, Session, Role } from '../models/auth.models';
import { tap } from 'rxjs/operators';

const STORAGE_KEY = 'opstrack.session';

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
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  }
}
