import { TestBed } from '@angular/core/testing';

import { SettingTablesService } from './setting-tables.service';

describe('SettingTablesService', () => {
  let service: SettingTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
