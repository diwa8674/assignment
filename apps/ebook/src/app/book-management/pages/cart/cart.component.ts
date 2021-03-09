import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as Facade from '../../../store';
import { BooksDetail } from '../../../core';

@Component({
  selector: 'assignment-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  books: Observable<BooksDetail[]>;
  showAllCartItems: boolean;
  book: any;
  bookId: string;

  constructor(private facade: Facade.BooksFacade, private router: Router) {}

  ngOnInit(): void {
    this.displayAllCartItems();
  }

  displayAllCartItems(): void {
    this.showAllCartItems = true;
    this.books = this.facade.loadBooksInCart$;
  }
  onCardClick(item: Object): void {
    this.bookId = this.getIdOfBook(item);
    this.showAllCartItems = false;
    this.facade.getBookDetailsWithIdInCart(this.bookId).subscribe((data) => {
      this.book = data;
    });
  }

  getIdOfBook(item: Object): string {
    try {
      return JSON.parse(JSON.stringify(item)).id;
    } catch (error) {
      console.log('Error occured when converting json into object');
    }
  }
  purchaseBook(): void {
    this.router.navigate(['/buy', this.bookId]);
  }

  removeItem(item: Object): void {
    this.facade.removeItemFromCart(this.getIdOfBook(item));
    this.displayAllCartItems();
  }

  trackByBookId(index: number, book: any): string {
    return book.id;
  }
}
