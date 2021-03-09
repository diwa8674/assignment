import { reducer } from './books.reducer';
import * as fromBooks from './books.reducer';
import * as BookActions from './books.actions';
import { BooksDetail, generateMockBook } from '../core';

describe('BooksReducer', () => {
  const book1 = generateMockBook();
  const initialState: fromBooks.State = {
    list: [book1],
    cartItems: [],
    collectionItems: [],
    loaded: false,
    searchKey: '',
    searchHistory: [],
  };

  describe('undefined action in reducer', () => {
    it('should return the default state', () => {
      const expected = {
        ...initialState,
        list: [],
      };
      const result = reducer(undefined, {} as any);
      expect(result).toEqual(expected);
    });
  });

  describe('reducer should store data after search operation', () => {
    function searchBooks(booksInitialState: any, searchKey: string) {
      const createAction = new BookActions.Search(searchKey);

      const result = reducer(booksInitialState, createAction);
      const expected = {
        ...initialState,
        searchKey: 'angular',
        searchHistory: ['angular'],
      };
      expect(result).toEqual(expected);
    }
    function searchBooksDone(booksInitialState: any) {
      const createAction = new BookActions.SearchDone([book1]);

      const result = reducer(booksInitialState, createAction);
      const expected = {
        ...initialState,
        loaded: true,
      };
      expect(result).toEqual(expected);
    }
    it('reducer should store data after initial search text is passed', () => {
      searchBooks(initialState, 'angular');
    });

    it(
      'reducer should store data after initial search done and results ' +
        ' returned',
      () => {
        searchBooksDone(initialState);
      }
    );
  });

  describe(
    'add book to cart/remove book from cart successfully upon ' + 'selection',
    () => {
      function addBookToCart(booksInitialState: any, expected: Object) {
        const createAction = new BookActions.AddBook('1');

        const result = reducer(booksInitialState, createAction);
        expect(result).toEqual(expected);
      }
      it('should be able add book to cart successfully', () => {
        const expected = {
          ...initialState,
          cartItems: [book1],
        };
        addBookToCart(initialState, expected);
      });

      it(
        'should be able maintain book state in cart when same is ' +
          'added again ',
        () => {
          const expected = {
            ...initialState,
            cartItems: [book1],
            collectionItems: [book1],
          };
          const initialStateWithSameBook = {
            ...initialState,
            cartItems: [book1],
            collectionItems: [book1],
          };
          addBookToCart(initialStateWithSameBook, expected);
        }
      );
    }
  );

  describe(
    'able to remove book from the cart when clicked on remove button' +
      ' on the book list',
    () => {
      function removeBookFromCart(booksInitialState: any, expected: Object) {
        const createAction = new BookActions.RemoveBook('1');

        const result = reducer(booksInitialState, createAction);
        expect(result).toEqual(expected);
      }
      it('successfully remove the book added in cart', () => {
        const expected = {
          ...initialState,
          cartItems: [],
        };
        const initialStateWithSameBook = {
          ...initialState,
          cartItems: [book1],
        };
        removeBookFromCart(initialStateWithSameBook, expected);
      });
    }
  );

  describe(
    'able to remove book from the cart and add the corresponding ' +
      'book to collection list',
    () => {
      function removeBookFromCartAndAddToCollection(
        booksInitialState: any,
        expected: Object
      ) {
        const createAction = new BookActions.AddBookToCollection(
          new BooksDetail({
            id: '1',
            name: 'angular',
            email: 'cdcd@y.com',
            phone: '9809879',
            address: 'csdcdscdscsdcs',
          })
        );

        const result = reducer(booksInitialState, createAction);
        expect(result).toEqual(expected);
      }
      function addBookToCollectionEvenNoBillingInfo(
        booksInitialState: any,
        expected: Object
      ) {
        const createAction = new BookActions.AddBookToCollection(
          new BooksDetail({
            id: '1',
          })
        );

        const result = reducer(booksInitialState, createAction);
        expect(result).toEqual(expected);
      }
      it(
        'successfully remove the book added in cart and add ' +
          'to collection list',
        () => {
          const expected = {
            ...initialState,
            cartItems: [],
            collectionItems: [
              new BooksDetail({
                items: book1,
                id: '1',
                name: 'angular',
                email: 'cdcd@y.com',
                phone: '9809879',
                address: 'csdcdscdscsdcs',
              }),
            ],
          };
          const initialStateWithSameBook = {
            ...initialState,
            cartItems: [book1],
            collectionItems: [],
          };
          removeBookFromCartAndAddToCollection(
            initialStateWithSameBook,
            expected
          );
        }
      );

      it(
        'successfully remove the book added in cart and add ' +
          'to collection list when billing details are not there',
        () => {
          const expected = {
            ...initialState,
            cartItems: [],
            collectionItems: [
              new BooksDetail({
                items: book1,
                id: '1',
              }),
            ],
          };
          const initialStateWithSameBook = {
            ...initialState,
            cartItems: [book1],
            collectionItems: [],
          };
          addBookToCollectionEvenNoBillingInfo(
            initialStateWithSameBook,
            expected
          );
        }
      );

      it(
        'successfully remove the book added in cart and not to add ' +
          'books to collection list' +
          'when already the book is in collection list',
        () => {
          const expected = {
            ...initialState,
            cartItems: [],
            collectionItems: [
              new BooksDetail({
                items: book1,
                id: '1',
                name: 'angular',
                email: 'cdcd@y.com',
                phone: '9809879',
                address: 'csdcdscdscsdcs',
              }),
            ],
          };
          const initialStateWithSameBook = {
            ...initialState,
            cartItems: [book1],
            collectionItems: [
              new BooksDetail({
                items: book1,
                id: '1',
                name: 'angular',
                email: 'cdcd@y.com',
                phone: '9809879',
                address: 'csdcdscdscsdcs',
              }),
            ],
          };
          removeBookFromCartAndAddToCollection(
            initialStateWithSameBook,
            expected
          );
        }
      );
    }
  );
});
