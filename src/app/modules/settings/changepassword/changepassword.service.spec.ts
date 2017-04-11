import { TestBed, inject } from '@angular/core/testing';
import { ChangepasswordService } from './changepassword.service';

describe('ChangepasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangepasswordService]
    });
  });

  it('should ...', inject([ChangepasswordService], (service: ChangepasswordService) => {
    expect(service).toBeTruthy();
  }));
});
