import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hide = true;
  loading = false;
  error: string | null = null;
  constructor(
    private auth: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  submit(form: NgForm) {
    if (form.invalid) return;

    const { email, password, name } = form.value;
    this.auth.register({ email, password, name }).subscribe({
      next: () => {
        this.notificationService.success('Registration successful!');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
