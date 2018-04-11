import { TestBed, inject } from '@angular/core/testing';

import { UserProjectService } from './user-project.service';

describe('UserProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProjectService]
    });
  });

  it('should be created', inject([UserProjectService], (service: UserProjectService) => {
    expect(service).toBeTruthy();
  }));
});
