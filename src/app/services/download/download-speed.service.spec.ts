import { TestBed } from '@angular/core/testing';

import { DownloadSpeedService } from './download-speed.service';

describe('DownloadSpeedService', () => {
  let service: DownloadSpeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadSpeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
