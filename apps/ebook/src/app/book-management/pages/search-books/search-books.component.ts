import { Component } from '@angular/core';

import * as Facade from '../../../store';
import { Utils } from '../../../shared';

@Component({
  selector: 'assignment-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss'],
})
export class SearchBooksComponent {
  componentType = 'search';
  searchText: string;

  constructor(private facade: Facade.BooksFacade, private utils: Utils) {}

  async searchBooks(searchText: string) {
    /* istanbul ignore else */
    if (!this.utils.isBlank(searchText)) {
      this.facade.searchBooks(searchText);
    }
  }
}
