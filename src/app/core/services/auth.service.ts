import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap, of, catchError } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export interface AuthUser {
  email: string;
  name?: string;
  sub?: string;
  [k: string]: any;
}

const USE_ME_ENDPOINT = false;

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentToken = signal<string | null>(localStorage.getItem('token'));

  private _user = signal<AuthUser | null>(
    this.decodeUser(localStorage.getItem('token'))
  );
  user = this._user;
  user$ = toObservable(this._user);
  isAuthed = computed(() => !!this.currentToken());

  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    return this.http
      .post<{ accessToken: string }>('/api/auth/login', { email, password })
      .pipe(
        tap(({ accessToken }) => {
          localStorage.setItem('token', accessToken);
          this.currentToken.set(accessToken);
          this._user.set(this.decodeUser(accessToken));
        }),
        switchMap((res) =>
          USE_ME_ENDPOINT
            ? this.http.get<AuthUser>('/api/auth/me').pipe(
                tap((user) => this._user.set(user)),
                catchError(() => of(res))
              )
            : of(res)
        )
      );
  }

  register(payload: { email: string; password: string; name?: string }) {
    return this.http.post('/api/auth/register', payload);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentToken.set(null);
    this._user.set(null);
  }


  private decodeUser(token: string | null): AuthUser | null {
    if (!token) return null;
    try {
      const [, payload] = token.split('.');
      if (!payload) return null;
      const json = JSON.parse(this.base64UrlDecode(payload));
      const email = json.email || json.preferred_username || json.upn || null;
      const name = json.name || json.given_name || json.nickname || undefined;
      const sub = json.sub || undefined;
      if (!email && !name) return null; // nothing useful
      return { email: email ?? '(unknown)', name, sub, ...json };
    } catch {
      return null;
    }
  }

  private base64UrlDecode(s: string): string {
    // base64url -> base64
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    // pad
    while (s.length % 4) s += '=';
    return decodeURIComponent(
      atob(s)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }
}
