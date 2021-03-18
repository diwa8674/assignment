import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { cold } from 'jasmine-marbles';

import { SearchBooksService } from './search-books.service';

describe('SearchBooksService', () => {
  let service: SearchBooksService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: { get: jest.fn() } }],
    });
    service = TestBed.inject(SearchBooksService);
    http = TestBed.inject(HttpClient);
  });

  const books = {
    items: [
      { id: '12345', volumeInfo: { title: 'Title' } },
      { id: '67890', volumeInfo: { title: 'Another Title' } },
    ],
  };

  const queryTitle = 'Book Title';

  it('should call the search api and return the search results', () => {
    const response = cold('-a|', { a: books });
    http.get = jest.fn(() => response);
    service.searchBooks(queryTitle);
    expect(http.get).toHaveBeenCalledWith(
      `https://www.googleapis.com/books/v1/volumes?q=${queryTitle}`
    );
  });
});
