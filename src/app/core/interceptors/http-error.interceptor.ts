import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notify: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Something went wrong. Please try again.';
        if (error.status === 0)
          message = 'Network error. Check your connection.';
        else if (error.status === 401)
          message = 'Unauthorized. Please log in again.';
        else if (error.status === 403) message = 'Access denied.';
        else if (error.status === 404) message = 'Not found.';
        else if (error.status === 409)
          message = 'Conflict. The data already exists.';
        else if (error.error?.message) message = error.error.message;

        this.notify.error(message);
        return throwError(() => error);
      })
    );
  }
}
