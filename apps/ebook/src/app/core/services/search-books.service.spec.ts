import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchBooksService } from './search-books.service';

describe('SearchBooksService', () => {
  let service: SearchBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchBooksService],
    });
    service = TestBed.inject(SearchBooksService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('check whether books are properly searched and returned based on the entered text', () => {
    jest.spyOn(service, 'searchBooks');
    service.searchBooks('angular');
  });
});
