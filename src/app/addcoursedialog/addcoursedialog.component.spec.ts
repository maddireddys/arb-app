import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoursedialogComponent } from './addcoursedialog.component';

describe('AddcoursedialogComponent', () => {
  let component: AddcoursedialogComponent;
  let fixture: ComponentFixture<AddcoursedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcoursedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcoursedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
