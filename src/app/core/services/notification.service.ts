// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/toastr';

type ToastType = 'success' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private snack: MatSnackBar) {}

  private toast(message: string, type: ToastType, ms = 6000) {
    this.snack.openFromComponent(ToastComponent, {
      data: { message, type },
      duration: ms,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['toast-container'],
    });
  }

  success(msg: string, ms?: number) {
    this.toast(msg, 'success', ms);
  }
  error(msg: string, ms?: number) {
    this.toast(msg, 'error', ms);
  }
  info(msg: string, ms?: number) {
    this.toast(msg, 'info', ms);
  }
}
