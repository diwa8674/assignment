import { Action } from '@ngrx/store';
import { BooksDetail } from '../core';

// Searching Books via Books Search API
export const SEARCH = 'Books Search';
export const SEARCH_DONE = 'Books Search Done';
// Adding Books to cart items list
export const ADD_BOOK = 'Add Book';
// Removing Book from cart items list
export const REMOVE_BOOK = 'Remove Book';
// Adding Books to collection items list
export const ADD_BOOK_TO_COLLECTION = 'Add Book To Collection List';

export class Search implements Action {
  readonly type = SEARCH;
  constructor(public payload: string) {}
}

export class SearchDone implements Action {
  readonly type = SEARCH_DONE;
  constructor(public payload: BooksDetail[]) {}
}

export class AddBook implements Action {
  readonly type = ADD_BOOK;
  constructor(public payload: string) {}
}

export class RemoveBook implements Action {
  readonly type = REMOVE_BOOK;
  constructor(public payload: string) {}
}

export class AddBookToCollection implements Action {
  readonly type = ADD_BOOK_TO_COLLECTION;
  constructor(public payload: BooksDetail) {}
}

export type Actions =
  | Search
  | SearchDone
  | AddBook
  | RemoveBook
  | AddBookToCollection;
