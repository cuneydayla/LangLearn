import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course, CourseDetail } from '../models/course';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  base = '/api';

  getCourses() {
    return this.http.get<Course[]>(`${this.base}/courses`);
  }
  getCourse(id: string) {
    return this.http.get<CourseDetail>(`${this.base}/courses/${id}`);
  }
  enroll(courseId: string) {
    return this.http.post(`${this.base}/courses/${courseId}/enroll`, {});
  }
  myEnrollments() {
    return this.http.get<any[]>(`${this.base}/me/enrollments`);
  }
  getProgress(courseId: string) {
    return this.http.get<any>(`${this.base}/me/progress/${courseId}`);
  }
  updateProgress(courseId: string, body: any) {
    return this.http.patch(`${this.base}/me/progress/${courseId}`, body);
  }
}
