import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as Facade from '../../../store';
@Component({
  selector: 'assignment-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  bookId: string;
  book: any;

  constructor(
    private facade: Facade.BooksFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.facade.getBookDetailsWithId(this.bookId).subscribe((data) => {
      this.book = data;
    });
  }

  purchaseBook(): void {
    this.router.navigate(['/buy', this.bookId]);
  }

  addToCart(): void {
    this.facade.addBookToCartList(this.bookId);
  }
}
