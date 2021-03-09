import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BooksDetail } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SearchBooksService {
  constructor(private http: HttpClient) {}

  // async searchBooks(searchText: string): Promise<BooksDetail> {
  //   return await this.http
  //     .get<BooksDetail>(
  //       'https://www.googleapis.com/books/v1/volumes?q=' + searchText
  //     )
  //     .toPromise();
  // }

  async searchBooks(searchText: string): Promise<BooksDetail> {
    return await this.http
      .get<BooksDetail>(
        'https://www.googleapis.com/books/v1/volumes?q=' + searchText
      )
      .toPromise();
  }
}
