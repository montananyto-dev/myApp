import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectCommentComponent } from './view-project-comment.component';

describe('ViewProjectCommentComponent', () => {
  let component: ViewProjectCommentComponent;
  let fixture: ComponentFixture<ViewProjectCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
