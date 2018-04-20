import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectMoreDetailsComponent } from './view-project-more-details.component';

describe('ViewProjectMoreDetailsComponent', () => {
  let component: ViewProjectMoreDetailsComponent;
  let fixture: ComponentFixture<ViewProjectMoreDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectMoreDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectMoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
