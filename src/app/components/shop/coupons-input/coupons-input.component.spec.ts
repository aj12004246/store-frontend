import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsInputComponent } from './coupons-input.component';

describe('CouponsInputComponent', () => {
  let component: CouponsInputComponent;
  let fixture: ComponentFixture<CouponsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
