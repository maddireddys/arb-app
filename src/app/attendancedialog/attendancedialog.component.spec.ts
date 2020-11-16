import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancedialogComponent } from './attendancedialog.component';

describe('AttendancedialogComponent', () => {
  let component: AttendancedialogComponent;
  let fixture: ComponentFixture<AttendancedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendancedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
