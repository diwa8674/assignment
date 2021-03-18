import { Utils } from './utils';

describe('Utils', () => {
  it('should create an instance', () => {
    expect(new Utils()).toBeTruthy();
  });

  it('check isBlank method', () => {
    const isBlankResponse = new Utils().isBlank('SearchQuery');
    expect(isBlankResponse).toBeDefined;
  });
});
