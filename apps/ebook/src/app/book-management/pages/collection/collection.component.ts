import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as Facade from '../../../store';
import { BooksDetail } from '../../../core';

@Component({
  selector: 'assignment-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  books: Observable<BooksDetail[]>;
  constructor(private facade: Facade.BooksFacade) {}

  ngOnInit(): void {
    this.books = this.facade.loadBooksInCollection$;
  }

  trackByBookId(index: number, book: any): string {
    return book.id;
  }
}
