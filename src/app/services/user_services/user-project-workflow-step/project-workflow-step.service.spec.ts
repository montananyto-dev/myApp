import { TestBed, inject } from '@angular/core/testing';

import { ProjectWorkflowStepService } from './project-workflow-step.service';

describe('ProjectWorkflowStepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectWorkflowStepService]
    });
  });

  it('should be created', inject([ProjectWorkflowStepService], (service: ProjectWorkflowStepService) => {
    expect(service).toBeTruthy();
  }));
});
