import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesDinamicComponent } from './tables-dinamic.component';

describe('TablesDinamicComponent', () => {
  let component: TablesDinamicComponent;
  let fixture: ComponentFixture<TablesDinamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesDinamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesDinamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
