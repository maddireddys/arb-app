import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CourseDetails } from '../models/CourseDetails';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseSub: BehaviorSubject<CourseDetails>;
  public courses: Observable<CourseDetails>;
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient,
    private alertService: AlertService) {
    this.courseSub = new BehaviorSubject<CourseDetails>(JSON.parse(localStorage.getItem('user')));
    this.courses = this.courseSub.asObservable();
  }

  loadCourses(userId) {
    return this.http.get<any>(this.baseUrl+'/course/user/'+userId)
        .pipe(map(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(data.status === 'Success') {
              this.courseSub.next(data.data);
            }
            return data;
        }));
}

addCourse(name, userId) {
    return this.http.post<any>(this.baseUrl+'/course/add', { name, userId})
        .pipe(map(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return data;
        }));
}

emrolCourse(studentId, courseId) {
  return this.http.post<any>(this.baseUrl+'/course/enrol', { studentId, courseId})
      .pipe(map(data => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if(data.status === 'Success') {
            this.alertService.success("Succesfully Enrolled Course", true);
            return data;
          }else {
            this.alertService.error(data.data.message, true);
          }
      }));
}

loadStudentCourse(studentId) {
  return this.http.get<any>(this.baseUrl+'/course/student/'+studentId)
      .pipe(map(data => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if(data.status === 'Success') {
            return data;
          }else {
            this.alertService.error('No Courses found', true);
          }
      }));
}

loadEnrolments(courseId) {
  return this.http.get<any>(this.baseUrl+'/course/enrolments/'+courseId)
      .pipe(map(data => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if(data.status === 'Success') {
            return data;
          } else {
            this.alertService.error('No Enrolments found', true);
          }
          
      }));
}



}

