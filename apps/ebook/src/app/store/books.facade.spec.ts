import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';

import { generateMockBook } from '../core';
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
      const booksDetailStub = generateMockBook();
      spyOn(storeStub, 'dispatch').and.callThrough();
      service.addBookToCollectionList(booksDetailStub);
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });

  describe('load book details and others without issues', () => {
    it('makes expected calls during getting book details', () => {
      const storeStub: Store = TestBed.inject(Store);
      spyOn(storeStub, 'select').and.callThrough();
      service.getCollectionItemsCount();
      service.loadBooks();
      service.loadBooksInCart();
      service.loadBooksInCollection();
      expect(storeStub.select).toHaveBeenCalled();
    });

    it('makes expected calls during getting book details in cart', () => {
      const storeStub: Store = TestBed.inject(Store);
      spyOn(storeStub, 'select').and.callThrough();
      service.addBookToCartList('1');
      service.getBookDetailsWithId('1');
      service.getBookDetailsWithIdInCart('2');
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
