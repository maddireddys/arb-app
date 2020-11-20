import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AttendanceDetailsResp } from '../models/AttendanceDetailsResp';
import { DialogData } from '../models/DialogData';
import { AttendanceService } from '../services/attendance.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-attendance-show-dialog',
  templateUrl: './attendance-show-dialog.component.html',
  styleUrls: ['./attendance-show-dialog.component.sass']
})
export class AttendanceShowDialogComponent implements OnInit {
  details: AttendanceDetailsResp[];

  constructor(private authService: AuthService,
    private attendanceService: AttendanceService,
    public dialogRef: MatDialogRef<AttendanceShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.loadAttendanceDetails(this.data.courseId);
  }

  loadAttendanceDetails(courseId) {
    this.attendanceService.loadAttendance(courseId, this.authService.loggedinUser.id)
      .pipe(first())
      .subscribe(
          data => {
            this.details = data.data;
          },
          error => {
              this.details = undefined;
              console.log("internal serve error");
          });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
