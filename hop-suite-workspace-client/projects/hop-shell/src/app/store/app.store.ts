// import { computed, inject } from '@angular/core';
// import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

// export type User = {
//   id: string;
//   name: string;
//   dept: string;
//   roles: string[];
// };

// type AppState = {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
// };

// const initialState: AppState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
// };

// export const AppStore = signalStore(
//   { providedIn: 'root' }, // <-- global singleton
//   withState(initialState),

//   withComputed((store) => ({
//     // selectors, but signal-style
//     userName: computed(() => store.user()?.name ?? ''),
//     dept: computed(() => store.user()?.dept ?? ''),
//     roles: computed(() => store.user()?.roles ?? []),

//     hasRole: computed(() => (role: string) => store.user()?.roles?.includes(role) ?? false),

//     // Example: app experience gates
//     canSeeAdmin: computed(() => store.user()?.roles?.includes('Admin') ?? false),
//   })),

//   withMethods((store) => ({
//     setAuth(payload: { user: User; token: string }) {
//       patchState(store, {
//         user: payload.user,
//         token: payload.token,
//         isAuthenticated: true,
//       });
//     },

//     clearAuth() {
//       patchState(store, {
//         user: null,
//         token: null,
//         isAuthenticated: false,
//       });
//     },

//     updateUser(partial: Partial<User>) {
//       const current = store.user();
//       if (!current) return;
//       patchState(store, { user: { ...current, ...partial } });
//     },
//   }))
// );