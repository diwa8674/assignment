import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { BooksDetail } from '../../../core';
import * as Facade from '../../../store';

@Component({
  selector: 'assignment-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('componentType') componentType: string;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('cartBookId') cartBookId: string;

  @Output() removeBookButtonClicked = new EventEmitter<string>();

  bookId: string;
  book: BooksDetail;
  averageRating: number;
  cartComponent: boolean;

  cartBookDetailsSubscription: Subscription;
  booksListSubscription: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private facade: Facade.BooksFacade,
    private route: ActivatedRoute,
    private router: Router,
    private logger: NGXLogger
  ) {}

  get componentTypeValue(): string {
    return this.componentType;
  }

  get cartBookIdValue(): string {
    return this.cartBookId;
  }

  ngOnInit(): void {
    if (this.componentTypeValue === 'cart') {
      this.bookId = this.cartBookIdValue;
      this.cartComponent = true;
      this.cartBookDetailsSubscription = this.facade
        .getBookDetailsWithIdInCart(this.bookId)
        .subscribe(
          (data) => {
            this.book = data;
          },
          (error) => {
            this.logger.error('Error Occured:' + error);
          }
        );
      this.subscriptions.push(this.cartBookDetailsSubscription);
    } else {
      this.bookId = this.route.snapshot.paramMap.get('id');
      this.booksListSubscription = this.facade
        .getBookDetailsWithId(this.bookId)
        .subscribe(
          (data) => {
            this.book = data;
          },
          (error) => {
            this.logger.error('Error Occured:' + error);
          }
        );
      this.subscriptions.push(this.booksListSubscription);
    }
  }

  getBookImageLinks(): string {
    return this.book.volumeInfo.imageLinks.smallThumbnail;
  }

  getBookInfo(info: string): string {
    this.averageRating = this.book.volumeInfo.averageRating;
    return this.book.volumeInfo[info];
  }

  purchaseBook(): void {
    this.router.navigate(['/buy', this.bookId]);
  }

  addToCart(): void {
    this.facade.addBookToCartList(this.bookId);
  }

  removeItem(): void {
    this.removeBookButtonClicked.emit(this.bookId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
