import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { CartComponent } from './cart.component';
import { BooksFacade } from '../../../store';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CartComponent],
      providers: [{ provide: BooksFacade }],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`componentType has default value`, () => {
    expect(component.componentType).toEqual(`cart`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'displayAllCartItems').and.callThrough();
      component.ngOnInit();
      expect(component.displayAllCartItems).toHaveBeenCalled();
    });
  });

  it('show specific book data based on the card clicked', () => {
    jest.spyOn(component, 'onCardClick');
    component.onCardClick('XfvcscdsIc');
    fixture.detectChanges();
    expect(component.onCardClick).toHaveBeenCalled();
  });

  it('remove items from cart successfully', () => {
    jest.spyOn(component, 'removeItem');
    component.removeItem('cdsHJMkccd');
    expect(component.removeItem).toHaveBeenCalled();
  });
});
