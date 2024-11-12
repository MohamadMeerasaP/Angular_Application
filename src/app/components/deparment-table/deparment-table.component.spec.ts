import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentTableComponent } from './deparment-table.component';

describe('DeparmentTableComponent', () => {
  let component: DeparmentTableComponent;
  let fixture: ComponentFixture<DeparmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeparmentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
