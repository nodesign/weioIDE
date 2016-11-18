/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatusMonitorService } from './status-monitor.service';

describe('StatusMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusMonitorService]
    });
  });

  it('should ...', inject([StatusMonitorService], (service: StatusMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
