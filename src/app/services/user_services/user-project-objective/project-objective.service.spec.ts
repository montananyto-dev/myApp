import { TestBed, inject } from '@angular/core/testing';

import { ProjectObjectiveService } from './project-objective.service';

describe('ProjectObjectiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectObjectiveService]
    });
  });

  it('should be created', inject([ProjectObjectiveService], (service: ProjectObjectiveService) => {
    expect(service).toBeTruthy();
  }));
});
