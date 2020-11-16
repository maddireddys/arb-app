import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CourseDetails } from '../models/CourseDetails';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.sass']
})
export class StudenthomeComponent implements OnInit {
  courseDetails: CourseDetails[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.loadStudentCourse();
  }

  loadStudentCourse() {
    this.courseService.loadStudentCourse(this.authService.loggedinUser.id)
      .pipe(first())
      .subscribe(
          data => {
                this.courseDetails = data.data;
                console.log(JSON.stringify(this.courseDetails));
          },
          error => {
              console.log("internal serve error");
          });
  }
  enrolCourse(courseId) {
    this.courseService.emrolCourse(this.authService.loggedinUser.id, courseId)
      .pipe(first())
      .subscribe(
          data => {
                this.loadStudentCourse();
          },
          error => {
              console.log("internal serve error");
          });
  }

}
