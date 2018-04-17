import { TestBed, inject } from '@angular/core/testing';

import { ProjectCommentService } from './project-comment.service';

describe('ProjectCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCommentService]
    });
  });

  it('should be created', inject([ProjectCommentService], (service: ProjectCommentService) => {
    expect(service).toBeTruthy();
  }));
});
