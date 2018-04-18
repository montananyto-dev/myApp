import { TestBed, inject } from '@angular/core/testing';

import { ViewTaskCommentsService } from './view-task-comments.service';

describe('ViewTaskCommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewTaskCommentsService]
    });
  });

  it('should be created', inject([ViewTaskCommentsService], (service: ViewTaskCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
