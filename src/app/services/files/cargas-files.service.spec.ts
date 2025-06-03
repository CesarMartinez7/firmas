import { TestBed } from '@angular/core/testing';

import { CargasFilesService } from './cargas-files.service';

describe('CargasFilesService', () => {
  let service: CargasFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargasFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
