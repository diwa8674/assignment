import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { concat, of, throwError } from 'rxjs';

import { StoreModule } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';

import { Utils } from '../../../shared';
import { BooksDetail, generateMockBook } from '../../../core';
import { BooksFacade } from '../../../store';
import { BooksListComponent } from './books-list.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;
  const booksDetailStub: BooksDetail = generateMockBook();
  beforeEach(() => {
    const routerStub = () => ({ navigate: () => ({}) });
    const utilsStub = () => ({ isBlank: () => ({}) });
    const nGXLoggerStub = () => ({ error: () => ({}) });

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BooksListComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: Utils, useFactory: utilsStub },
        { provide: NGXLogger, useFactory: nGXLoggerStub },
        {
          provide: BooksFacade,
          useValue: {
            loadBooks: () => concat(of([]), throwError(new Error('oops!'))),
            loadBooksInCart: () =>
              concat(of([]), throwError(new Error('oops!'))),
            loadBooksInCollection: () =>
              concat(of([]), throwError(new Error('oops!'))),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`subscriptions has default value`, () => {
    expect(component.subscriptions).toEqual([]);
  });

  describe('onCardClick', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.componentType = 'search';
      component.onCardClick(booksDetailStub);
      component.componentType = 'cart';
      component.onCardClick(booksDetailStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const nGXLoggerStub: NGXLogger = fixture.debugElement.injector.get(
        NGXLogger
      );
      spyOn(nGXLoggerStub, 'error').and.callThrough();
      component.ngOnChanges({
        componentType: new SimpleChange(null, 'search', true),
      });
      expect(nGXLoggerStub.error).toHaveBeenCalled();
    });

    it('makes expected calls for cart component', () => {
      const nGXLoggerStub: NGXLogger = fixture.debugElement.injector.get(
        NGXLogger
      );
      spyOn(nGXLoggerStub, 'error').and.callThrough();
      component.ngOnChanges({
        componentType: new SimpleChange(null, 'cart', true),
      });
      expect(nGXLoggerStub.error).toHaveBeenCalled();
    });

    it('makes expected calls for collection component', () => {
      const nGXLoggerStub: NGXLogger = fixture.debugElement.injector.get(
        NGXLogger
      );
      spyOn(nGXLoggerStub, 'error').and.callThrough();
      component.ngOnChanges({
        componentType: new SimpleChange(null, 'collection', true),
      });
      expect(nGXLoggerStub.error).toHaveBeenCalled();
    });
  });

  describe('check whether able to get all book details properly', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getBookImageLinks').and.callThrough();
      component.getBookImageLinks(booksDetailStub);
      component.getBookInfo(booksDetailStub, 'description');
      component.getBillingDetails(booksDetailStub, 'name');
      expect(component.getBookImageLinks).toHaveBeenCalled();
    });
  });
});
