import { TestBed } from '@angular/core/testing';

import { PlantasDataService } from './plantas-data.service';

describe('PlantasDataService', () => {
  let service: PlantasDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantasDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
