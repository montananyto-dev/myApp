import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserOrganisationComponent } from './view-user-organisation.component';

describe('ViewUserOrganisationComponent', () => {
  let component: ViewUserOrganisationComponent;
  let fixture: ComponentFixture<ViewUserOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
