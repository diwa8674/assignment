import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';

import { generateMockBook, SearchBooksService } from '../core';
import { BookEffects } from './books.effects';
import * as BookActions from './books.actions';

describe('BookEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let db: any;
  let effects: BookEffects;
  let actions$: Observable<unknown>;

  const book1 = generateMockBook();

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
          payload: book1,
        },
      });

      db.searchBooks = jest.fn(() => response);

      expect(effects.loadBooks$).toBeObservable(expected);
    });
  });
});
