import { BooksDetail } from '../core';
import * as fromSelector from './books.selectors';

describe('selector test', () => {
  const state = {
    list: [
      { id: '1', name: 'cdscds' } as BooksDetail,
      { id: '2', name: 'cdscdsre34' } as BooksDetail,
    ],
    cartItems: [{ id: '1', name: 'cdscds' } as BooksDetail],
    collectionItems: [{ id: '1', name: 'cdscds' } as BooksDetail],
  };
  describe('', () => {
    const expected = { id: '1', name: 'cdscds' } as BooksDetail;
    it('selectBooksList should return list of book details properly', () => {
      expect(fromSelector.selectBookListById('1').projector(state)).toEqual(
        expected
      );
    });
  });
  describe(
    'selectCartListById selector should return cart list item ' + 'based on id',
    () => {
      const expected = { id: '1', name: 'cdscds' } as BooksDetail;
      it('selectCartListById should return list of book details properly', () => {
        expect(fromSelector.selectCartListById('1').projector(state)).toEqual(
          expected
        );
      });
    }
  );

  describe(
    'selectCollectionList selector should return items within ' +
      'within collectionitems list',
    () => {
      it('selectCollectionList should return collection item list', () => {
        const expected = [{ id: '1', name: 'cdscds' } as BooksDetail];
        expect(fromSelector.selectCollectionList.projector(state)).toEqual(
          expected
        );
      });
      it(
        'getCollectionItemsCount should return collection list ' +
          'items count',
        () => {
          expect(fromSelector.getCollectionItemsCount.projector(state)).toEqual(
            1
          );
        }
      );
      it(
        'getCollectionItemsCount should return collection list count as 0' +
          'if no collectionitems list iself not present in state ',
        () => {
          expect(
            fromSelector.getCollectionItemsCount.projector(
              delete state.collectionItems
            )
          ).toEqual(0);
        }
      );
    }
  );

  describe(
    'getCartItemsCount selector should return cart items count ' +
      'successfully',
    () => {
      it('when cart items does not contain any book', () => {
        expect(fromSelector.getCartItemsCount.projector(state)).toEqual(1);
      });
      it('when cart items list itself not present in state', () => {
        expect(
          fromSelector.getCartItemsCount.projector(delete state.cartItems)
        ).toEqual(0);
      });
    }
  );
});
