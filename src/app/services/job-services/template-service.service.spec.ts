import { TestBed } from '@angular/core/testing';

import { TemplateServiceService } from './template-service.service';

describe('TemplateServiceService', () => {
  let service: TemplateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
