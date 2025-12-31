// src/app/core/auth/auth.store.ts
import { Injectable, computed, signal } from '@angular/core';

export type User = {
  id: string;
  name: string;
  roles: string[];
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  // Private writable state
  private readonly _user = signal<User | null>(null);
  private readonly _token = signal<string | null>(null);
  private readonly _loading = signal(false);

  // Public readonly signals
  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly loading = this._loading.asReadonly();

  // Derived/computed state
  readonly isAuthed = computed(() => !!this._token());
  readonly roles = computed(() => this._user()?.roles ?? []);

  hasRole(role: string) {
    return computed(() => this.roles().includes(role));
  }

  hasAnyRole(...roles: string[]) {
    return computed(() => roles.some(r => this.roles().includes(r)));
  }

  // Mutations
  setSession(user: User, token: string) {
    this._user.set(user);
    this._token.set(token);
  }

  clearSession() {
    this._user.set(null);
    this._token.set(null);
  }

  setLoading(v: boolean) {
    this._loading.set(v);
  }
}
