import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserCourseComponent } from './view-user-course.component';

describe('ViewUserCourseComponent', () => {
  let component: ViewUserCourseComponent;
  let fixture: ComponentFixture<ViewUserCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
