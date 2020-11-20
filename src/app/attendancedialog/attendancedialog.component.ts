import { Component, Inject, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AttendanceDetails } from '../models/AttendanceDetails';
import { DialogData } from '../models/DialogData';
import { EnrolmentsDetails } from '../models/EnrolmentsDetails';
import { AlertService } from '../services/alert.service';
import { AttendanceService } from '../services/attendance.service';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-attendancedialog',
  templateUrl: './attendancedialog.component.html',
  styleUrls: ['./attendancedialog.component.sass']
})
export class AttendancedialogComponent implements OnInit {
  enrolmentsDetails: EnrolmentsDetails[];
  attendanceMap : Map<number, AttendanceDetails>;
  baseUrl = environment.baseUrl
  attendanceForm: FormGroup;
  loading = false;
  submitted = false;
  date = new FormControl(new Date());

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private courseService: CourseService,
    private alertService: AlertService,
    private attendanceService: AttendanceService,
    public dialogRef: MatDialogRef<AttendancedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

    }

  ngOnInit(): void {
    this.attendanceForm = this.formBuilder.group({
      id: [''],
    });
    this.loadEnrolments(this.data.courseId)
  }

  get f() { return this.attendanceForm.controls; }

  loadEnrolments(courseId) {
    this.attendanceMap = new Map();
    this.courseService.loadEnrolments(courseId)
      .pipe(first())
      .subscribe(
          data => {
              if(data.status == 'Success') {
                this.enrolmentsDetails = data.data;
              } 
          },
          error => {
              console.log("internal serve error");
          });
  }
  add() {
    this.submitted = true;
  if (this.attendanceForm.invalid || !this.attendanceMap) {
    this.alertService.error("Invalid input");
    this.submitted = false;
    return;
}
this.loading = true;
let dtos = Array.from(this.attendanceMap, ([name, value]) => ( value ));
if(dtos.length < 1) {
  this.loading = false;
  this.submitted = false;
  this.alertService.error("Please select at least one");
  return;
}
    this.attendanceService.addAttendance(dtos)
      .pipe(first())
      .subscribe(
          data => {
              if(data.status == 'Success') {
                this.dialogRef.close();
              } else {
                this.loading = false;
                this.alertService.error(data.data.message);
                this.dialogRef.close();
              }
          },
          error => {
              console.log("internal serve error");
              this.loading = false;
          });
  }

  onchange(enrolmentId, studentId, courseId, status, index) {
    if (!this.data) {
      this.submitted = true;
      return;
    }
    if(status) {
      let ad = new AttendanceDetails();
      ad.courseId = courseId;
      ad.enrolmentId = enrolmentId;
      ad.studentId = studentId;
      ad.status = status;
      ad.date = this.date.value;
      this.attendanceMap.set(index, ad);
    } else {
      this.attendanceMap.delete(index);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

