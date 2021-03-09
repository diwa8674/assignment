import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { BooksDetail, SearchBooksService } from '../core';
import { BookEffects } from './books.effects';
import * as BookActions from './books.actions';

describe('BookEffects', () => {
  let db: any;
  let effects: BookEffects;
  let actions$: Observable<any>;

  const book1 = { items: {} } as BooksDetail;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        {
          provide: SearchBooksService,
          useValue: {
            searchBooks: jest.fn(),
          },
        },
        provideMockActions(() => actions$),
      ],
    });
    db = TestBed.inject(SearchBooksService);
    effects = TestBed.inject(BookEffects);
    actions$ = TestBed.inject(Actions);
  });

  describe('search books successfully', () => {
    it('should return a collection with the books on success', () => {
      const action = new BookActions.Search('angular');
      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: book1 });
      const expected = cold('--c', {
        c: {
          type: BookActions.SEARCH_DONE,
          payload: book1.items,
        },
      });

      db.searchBooks = jest.fn(() => response);

      expect(effects.loadBooks$).toBeObservable(expected);
    });
  });
});
