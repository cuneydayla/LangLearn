import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourseDetail } from '../../../core/models/course';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  course$: Observable<CourseDetail> | null = null;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.course$ = this.api.getCourse(id);
  }

  enroll(id: string) {
    this.api.enroll(id).subscribe(() => {
      this.notificationService.success('Enrolled successfully!');
      this.router.navigate(['/dashboard']);
    });
  }
}
