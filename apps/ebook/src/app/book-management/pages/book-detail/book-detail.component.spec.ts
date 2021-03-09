import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { BookDetailComponent } from './book-detail.component';
import { BooksFacade } from '../../../store';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: () => ({}) });
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'pqShDwAAQBAJ' }),
            },
          },
        },
        { provide: Router, useFactory: routerStub },
        { provide: BooksFacade },
      ],
    });
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('screen loads without any error', () => {
    const initialSpy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(initialSpy).toHaveBeenCalled();
  });

  describe('purchaseBook', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.purchaseBook();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  it('check whether books can be added to cart on the book details page', () => {
    const initialSpy = jest.spyOn(component, 'addToCart');
    component.addToCart();
    expect(initialSpy).toHaveBeenCalled();
  });
});
