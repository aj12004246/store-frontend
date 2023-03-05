import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledPriceInputComponent } from './scheduled-price-input.component';

describe('ScheduledPriceInputComponent', () => {
  let component: ScheduledPriceInputComponent;
  let fixture: ComponentFixture<ScheduledPriceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledPriceInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledPriceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
