import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

type ToastType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div
      class="toast"
      [class.error]="data.type === 'error'"
      [class.success]="data.type === 'success'"
      [class.info]="data.type === 'info'"
    >
      <mat-icon class="icon" aria-hidden="true">
        {{
          data.type === 'success'
            ? 'check_circle'
            : data.type === 'error'
            ? 'error'
            : 'info'
        }}
      </mat-icon>
      <div class="text">{{ data.message }}</div>
      <button mat-button class="close" (click)="ref.dismiss()">Dismiss</button>
    </div>
  `,
  styles: [
    `
      .toast .close {
        color: #f1f5f9 !important; /* light slate text */
        background: rgba(255, 255, 255, 0.08);
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 13px;
        text-transform: none;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .toast .close:hover {
        background: rgba(255, 255, 255, 0.18);
        color: #fff;
      }

      .toast {
        display: grid;
        grid-template-columns: 22px 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        width: min(560px, calc(100vw - 32px));
        border-radius: 14px;
        backdrop-filter: blur(8px);
        box-shadow: 0 18px 40px rgba(2, 6, 23, 0.35),
          0 6px 18px rgba(2, 6, 23, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(15, 23, 42, 0.88); /* deep slate */
        color: #e5e7eb; /* light text */
        font-weight: 500;
        animation: toastIn 0.18s ease-out;
      }
      .toast.success {
        border-left: 6px solid #10b981;
      } /* emerald */
      .toast.error {
        border-left: 6px solid #ef4444;
      } /* red */
      .toast.info {
        border-left: 6px solid #3b82f6;
      } /* blue */

      .icon {
        font-size: 22px;
        width: 22px;
        height: 22px;
        opacity: 0.95;
      }
      .close {
        color: #cbd5e1;
        line-height: 1;
      }
      .close:hover {
        color: #fff;
      }

      @keyframes toastIn {
        from {
          transform: translateY(-8px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; type: ToastType },
    public ref: MatSnackBarRef<ToastComponent>
  ) {}
}
