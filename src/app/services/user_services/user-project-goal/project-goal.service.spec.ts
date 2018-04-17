import { TestBed, inject } from '@angular/core/testing';

import { ProjectGoalService } from './project-goal.service';

describe('ProjectGoalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectGoalService]
    });
  });

  it('should be created', inject([ProjectGoalService], (service: ProjectGoalService) => {
    expect(service).toBeTruthy();
  }));
});
