import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './books.reducer';

const getBooksState = createFeatureSelector<State>('books');

export const selectBooksList = createSelector(
  getBooksState,
  (state) => state.list
);

export const selectBookListById = (id: string) =>
  createSelector(getBooksState, (state) => {
    if (state) {
      return state.list.find((item) => {
        return item.id === id;
      });
    } else {
      return [];
    }
  });

export const selectCartList = createSelector(
  getBooksState,
  (state) => state.cartItems
);

export const getCartItemsCount = createSelector(getBooksState, (state) =>
  state.cartItems ? state.cartItems.length : 0
);

export const selectCartListById = (id: string) =>
  createSelector(getBooksState, (state) => {
    if (state) {
      return state.cartItems.find((cartItems) => {
        return cartItems.id === id;
      });
    } else {
      return [];
    }
  });

export const selectCollectionList = createSelector(
  getBooksState,
  (state) => state.collectionItems
);

export const getCollectionItemsCount = createSelector(getBooksState, (state) =>
  state.collectionItems ? state.collectionItems.length : 0
);
