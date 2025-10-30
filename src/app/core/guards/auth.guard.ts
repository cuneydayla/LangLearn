import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login?redirect=' + encodeURIComponent(state.url);
    return false;
  }
  return true;
};
