import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkDeparmentTableComponent } from './bulk-deparment-table.component';

describe('BulkDeparmentTableComponent', () => {
  let component: BulkDeparmentTableComponent;
  let fixture: ComponentFixture<BulkDeparmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkDeparmentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkDeparmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
