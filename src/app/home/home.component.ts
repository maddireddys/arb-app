import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AddcoursedialogComponent } from '../addcoursedialog/addcoursedialog.component';
import { AttendancedialogComponent } from '../attendancedialog/attendancedialog.component';
import { CourseDetails } from '../models/CourseDetails';
import { UserDetails } from '../models/UserDetails';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  title = 'arb-app';
  courseDetails: CourseDetails[];
  loading = false;
  submitted = false;

    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private courseService: CourseService,
        private alertService: AlertService,
        private dialog: MatDialog
    ) {
        
    }

    openDialog() {
      const dialogRef = this.dialog.open(AddcoursedialogComponent);
  
      dialogRef.afterClosed().subscribe(result => {
        this.loadCourses();
      });
    }

    ngOnInit(): void {
      this.loadCourses();
    }

    openAttendanceDialog(courseId: number) {
      const dialogRef = this.dialog.open(AttendancedialogComponent,
        {width: '40%',data: {courseId: courseId}});
  
      dialogRef.afterClosed().subscribe(result => {
        this.loadCourses();
      });
    }

    loadCourses() {
      this.courseService.loadCourses(this.authService.loggedinUser.id)
        .pipe(first())
        .subscribe(
            data => {
                if(data.status == 'Success') {
                  this.courseDetails = data.data;
                } else {
                  this.alertService.error(data.data.message, true);
                }
            },
            error => {
                console.log("internal serve error");
            });
    }
}
