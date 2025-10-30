import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatListModule, MatProgressBarModule, MatCardModule, RouterLink, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private api = inject(ApiService);
  enrollments$ = this.api.myEnrollments();
}
