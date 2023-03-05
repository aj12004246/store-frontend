import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaleInputComponent } from './sale-input.component';

describe('SaleInputComponent', () => {
  let component: SaleInputComponent;
  let fixture: ComponentFixture<SaleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleInputComponent);

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
