import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-addcoursedialog',
  templateUrl: './addcoursedialog.component.html',
  styleUrls: ['./addcoursedialog.component.sass']
})
export class AddcoursedialogComponent implements OnInit {
  courseForm: FormGroup;
  loading = false;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private courseService: CourseService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddcoursedialogComponent>,
    ) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  get f() { return this.courseForm.controls; }

  onSubmit() {
    this.submitted = true;
  if (this.courseForm.invalid) {
    return;
}
this.loading = true;
    this.courseService.addCourse(this.courseForm.controls.name.value, this.authService.loggedinUser.id)
      .pipe(first())
      .subscribe(
          data => {
              if(data.status == 'Success') {
                this.alertService.success("Course added succesfully");
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
  closeDialog() {
    this.dialogRef.close();
  }

}
