import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperViewComponent } from './shopkeeper-view.component';

describe('ShopkeeperViewComponent', () => {
  let component: ShopkeeperViewComponent;
  let fixture: ComponentFixture<ShopkeeperViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopkeeperViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopkeeperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
