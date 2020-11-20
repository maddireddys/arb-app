import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceShowDialogComponent } from './attendance-show-dialog.component';

describe('AttendanceShowDialogComponent', () => {
  let component: AttendanceShowDialogComponent;
  let fixture: ComponentFixture<AttendanceShowDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceShowDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceShowDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
