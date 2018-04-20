import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseOrganisationComponent } from './view-course-organisation.component';

describe('ViewCourseOrganisationComponent', () => {
  let component: ViewCourseOrganisationComponent;
  let fixture: ComponentFixture<ViewCourseOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
