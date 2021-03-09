import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as BookActions from './books.actions';
import { SearchBooksService } from '../core';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private searchBooksService: SearchBooksService
  ) {}

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.SEARCH),
      mergeMap((searchText) => {
        return from(
          this.searchBooksService.searchBooks(
            JSON.parse(JSON.stringify(searchText)).payload
          )
        ).pipe(
          mergeMap((list) => [
            {
              type: BookActions.SEARCH_DONE,
              payload: list.items,
            },
          ])
        );
      })
    )
  );
}
