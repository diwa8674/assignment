import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { BooksDetail } from '../core';

import * as BooksActions from './books.actions';
import * as BooksReducers from './books.reducer';
import * as BooksSelectors from './books.selectors';

@Injectable()
export class BooksFacade {
  loadBooks$ = this.store.select(BooksSelectors.selectBooksList);

  loadBooksInCart$ = this.store.select(BooksSelectors.selectCartList);

  loadBooksInCollection$ = this.store.select(
    BooksSelectors.selectCollectionList
  );

  constructor(private store: Store<BooksReducers.State>) {}

  getCollectionItemsCount() {
    return this.store.select(BooksSelectors.getCollectionItemsCount);
  }

  getCartItemsCount() {
    return this.store.select(BooksSelectors.getCartItemsCount);
  }

  searchBooks(searchText: string) {
    this.store.dispatch(new BooksActions.Search(searchText));
  }

  addBookToCartList(id: string) {
    this.store.dispatch(new BooksActions.AddBook(id));
  }

  getBookDetailsWithId(id: string) {
    return this.store.select(BooksSelectors.selectBookListById(id));
  }

  getBookDetailsWithIdInCart(id: string) {
    return this.store.select(BooksSelectors.selectCartListById(id));
  }

  removeItemFromCart(id: string) {
    this.store.dispatch(new BooksActions.RemoveBook(id));
  }

  addBookToCollectionList(booksDetail: BooksDetail) {
    this.store.dispatch(new BooksActions.AddBookToCollection(booksDetail));
  }
}
