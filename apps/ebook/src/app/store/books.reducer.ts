import { BooksDetail } from '../core';

import * as BookActions from './books.actions';

export interface State {
  list: BooksDetail[];
  cartItems: BooksDetail[];
  collectionItems: BooksDetail[];
  loaded: boolean;
  searchKey: string;
  searchHistory: string[];
}

const initialState: State = {
  list: [],
  cartItems: [],
  collectionItems: [],
  loaded: false,
  searchKey: '',
  searchHistory: [],
};

export function reducer(
  state = initialState,
  action: BookActions.Actions
): State {
  switch (action.type) {
    case BookActions.SEARCH: {
      return {
        ...state,
        loaded: false,
        searchKey: action.payload,
        searchHistory: state.searchHistory.concat(action.payload),
      };
    }
    case BookActions.SEARCH_DONE: {
      return {
        ...state,
        loaded: true,
        list: action.payload,
      };
    }
    case BookActions.ADD_BOOK: {
      return {
        ...state,
        cartItems: checkCartValidity(state, action),
      };
    }
    case BookActions.REMOVE_BOOK: {
      return {
        ...state,
        cartItems: state.cartItems.filter((data) => data.id !== action.payload),
      };
    }
    case BookActions.ADD_BOOK_TO_COLLECTION: {
      return {
        ...state,
        cartItems: removeItemsFromCartAfterPurchase(state, action),
        collectionItems: checkCollectionValidity(state, action),
      };
    }

    default: {
      return state;
    }
  }
}

function checkCartValidity(
  state: State,
  action: BookActions.AddBook
): BooksDetail[] {
  const filteredData = state.collectionItems.some(
    (data) => data.id === action.payload
  );
  const alreadyBookAdded = state.cartItems.some(
    (data) => data.id === action.payload
  );
  if (filteredData || alreadyBookAdded) {
    return state.cartItems;
  } else {
    return state.cartItems.concat(
      state.list.filter((data) => data.id === action.payload)
    );
  }
}

function checkCollectionValidity(
  state: State,
  action: BookActions.AddBookToCollection
): BooksDetail[] {
  const alreadyBookAdded = state.collectionItems.some(
    (data) => data.id === action.payload.id
  );
  if (alreadyBookAdded) {
    return state.collectionItems;
  } else {
    const filteredData = state.list.filter(
      (data) => data.id === action.payload.id
    )[0];
    return state.collectionItems.concat(
      new BooksDetail({
        items: filteredData,
        id: filteredData.id,
        name: action.payload.name ? action.payload.name : '',
        email: action.payload.email ? action.payload.email : '',
        phone: action.payload.phone ? action.payload.phone : '',
        address: action.payload.address ? action.payload.address : '',
      })
    );
  }
}

function removeItemsFromCartAfterPurchase(
  state: State,
  action: BookActions.AddBookToCollection
): BooksDetail[] {
  return state.cartItems.filter((data) => data.id !== action.payload.id);
}
