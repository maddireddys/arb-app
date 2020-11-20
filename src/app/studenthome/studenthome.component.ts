import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AttendanceShowDialogComponent } from '../attendance-show-dialog/attendance-show-dialog.component';
import { AttendancedialogComponent } from '../attendancedialog/attendancedialog.component';
import { CourseDetails } from '../models/CourseDetails';
import { DialogData } from '../models/DialogData';
import { AlertService } from '../services/alert.service';
import { AttendanceService } from '../services/attendance.service';
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
    private attendanceService: AttendanceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadStudentCourse();
  }

  loadStudentCourse() {
    this.courseService.loadStudentCourse(this.authService.loggedinUser.id)
      .pipe(first())
      .subscribe(
          data => {
                this.courseDetails = data.data;
          },
          error => {
              console.log("internal serve error");
              localStorage.removeItem('user');
              this.router.navigate(['/login']);
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

  showAttendanceDialog(courseId) {
    const dialogRef = this.dialog.open(AttendanceShowDialogComponent,
      {width: '60%',data: {courseId: courseId}});
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
