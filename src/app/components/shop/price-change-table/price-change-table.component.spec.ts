import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangeTableComponent } from './price-change-table.component';

describe('PriceChangeTableComponent', () => {
  let component: PriceChangeTableComponent;
  let fixture: ComponentFixture<PriceChangeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceChangeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
