import { TestBed, inject } from '@angular/core/testing';

import { UserProjectTeamMembersService } from './user-project-team-members.service';

describe('UserProjectTeamMembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserProjectTeamMembersService]
    });
  });

  it('should be created', inject([UserProjectTeamMembersService], (service: UserProjectTeamMembersService) => {
    expect(service).toBeTruthy();
  }));
});
