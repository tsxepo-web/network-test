import { TestBed } from '@angular/core/testing';

import { UploadSpeedService } from './upload-speed.service';

describe('UploadSpeedService', () => {
  let service: UploadSpeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadSpeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
