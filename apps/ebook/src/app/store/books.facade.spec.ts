import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { BooksDetail } from '../core';
import { BooksFacade } from './books.facade';

describe('BooksFacade', () => {
  let service: BooksFacade;

  beforeEach(() => {
    const storeStub = () => ({
      select: () => ({}),
      dispatch: () => ({}),
    });
    TestBed.configureTestingModule({
      providers: [BooksFacade, { provide: Store, useFactory: storeStub }],
    });
    service = TestBed.inject(BooksFacade);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('addBookToCollectionList', () => {
    it('makes expected calls', () => {
      const storeStub: Store = TestBed.inject(Store);
      const booksDetailStub: BooksDetail = <any>{};
      spyOn(storeStub, 'dispatch').and.callThrough();
      service.addBookToCollectionList(booksDetailStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });

  describe('getCollectionItemsCount', () => {
    it('makes expected calls', () => {
      const storeStub: Store = TestBed.inject(Store);
      spyOn(storeStub, 'select').and.callThrough();
      service.getCollectionItemsCount();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });

  describe('getCartItemsCount', () => {
    it('makes expected calls', () => {
      const storeStub: Store = TestBed.inject(Store);
      spyOn(storeStub, 'select').and.callThrough();
      service.getCartItemsCount();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
});
