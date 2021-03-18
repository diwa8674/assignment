import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { concat, of, throwError } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

import { BooksDetail, generateMockBook } from '../../../core';
import { BooksFacade } from '../../../store';
import { BookDetailComponent } from './book-detail.component';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  const booksDetailStub: BooksDetail = generateMockBook();

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } },
    });
    const routerStub = () => ({ navigate: () => ({}) });
    const nGXLoggerStub = () => ({ error: () => ({}) });
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookDetailComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: NGXLogger, useFactory: nGXLoggerStub },
        {
          provide: BooksFacade,
          useValue: {
            getBookDetailsWithId: () =>
              concat(of(booksDetailStub), throwError(new Error('oops!'))),
            getBookDetailsWithIdInCart: () =>
              concat(of(booksDetailStub), throwError(new Error('oops!'))),
            addBookToCartList: () => ({}),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`subscriptions has default value`, () => {
    expect(component.subscriptions).toEqual([]);
  });

  describe('ngOnInit should be loaded without issues', () => {
    it('makes expected calls', () => {
      const nGXLoggerStub: NGXLogger = fixture.debugElement.injector.get(
        NGXLogger
      );
      spyOn(nGXLoggerStub, 'error').and.callThrough();
      component.ngOnInit();
      expect(nGXLoggerStub.error).toHaveBeenCalled();
      component.componentType = 'cart';
      component.ngOnInit();
    });
  });

  describe('purchaseBook', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.purchaseBook();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('check whether able to get all book details properly', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getBookImageLinks').and.callThrough();
      component.book = booksDetailStub;
      component.getBookImageLinks();
      component.getBookInfo('description');
      component.addToCart();
      component.removeItem();
      expect(component.getBookImageLinks).toHaveBeenCalled();
    });
  });
});
