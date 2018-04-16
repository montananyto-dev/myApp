import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserModuleComponent } from './view-user-module.component';

describe('ViewUserModuleComponent', () => {
  let component: ViewUserModuleComponent;
  let fixture: ComponentFixture<ViewUserModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
