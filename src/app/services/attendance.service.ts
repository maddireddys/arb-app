import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AttendanceDetails } from '../models/AttendanceDetails';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient,
    private alertService: AlertService) { }

    addAttendance(attendanceDetails : AttendanceDetails[]) {
      return this.http.post<any>(this.baseUrl+'/attendance/add', attendanceDetails)
          .pipe(map(data => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              if(data.status === 'Success') {
                this.alertService.success("Attendance Added succesfully", true);
                return data;
              }else {
                this.alertService.error(data.data.message, true);
              }
          }));
    }
}
