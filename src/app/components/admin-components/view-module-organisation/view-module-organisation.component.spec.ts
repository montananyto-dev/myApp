import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModuleOrganisationComponent } from './view-module-organisation.component';

describe('ViewModuleOrganisationComponent', () => {
  let component: ViewModuleOrganisationComponent;
  let fixture: ComponentFixture<ViewModuleOrganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewModuleOrganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModuleOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
