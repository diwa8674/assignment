import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import * as Facade from '../../../store';
import { BooksDetail } from '../../../core';
import { Utils } from '../../../shared';

@Component({
  selector: 'assignment-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnChanges, OnDestroy {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('componentType') componentType: string;
  @Output() afterCardClicked = new EventEmitter<string>();

  booksListSubscription: Subscription;
  cartBookListSubscription: Subscription;
  collectionBookListSubscription: Subscription;
  subscriptions: Subscription[] = [];

  books: BooksDetail[];
  bookId: string;
  averageRating: number;
  billingDetailsTab: boolean;

  constructor(
    private facade: Facade.BooksFacade,
    private router: Router,
    private utils: Utils,
    private logger: NGXLogger
  ) {}

  get componentTypeValue(): string {
    return this.componentType;
  }
  onCardClick(item: BooksDetail) {
    this.bookId = item.id;
    /* istanbul ignore else */
    if (this.componentTypeValue === 'search') {
      this.router.navigate(['/details', this.bookId]);
    } else if (this.componentTypeValue === 'cart') {
      this.afterCardClicked.emit(this.bookId);
    }
  }

  ngOnChanges(change: SimpleChanges): void {
    /* istanbul ignore else */
    if (change['componentType'].currentValue === 'search') {
      this.booksListSubscription = this.facade.loadBooks().subscribe(
        (data) => {
          this.books = data;
        },
        (error) => {
          this.logger.error('Error Occured:' + error);
        }
      );
      this.subscriptions.push(this.booksListSubscription);
    } else if (change['componentType'].currentValue === 'cart') {
      this.cartBookListSubscription = this.facade.loadBooksInCart().subscribe(
        (data) => {
          this.books = data;
        },
        (error) => {
          this.logger.error('Error Occured:' + error);
        }
      );
      this.subscriptions.push(this.cartBookListSubscription);
    } else if (change['componentType'].currentValue === 'collection') {
      this.collectionBookListSubscription = this.facade
        .loadBooksInCollection()
        .subscribe(
          (data) => {
            this.books = data;
          },
          (error) => {
            this.logger.error('Error Occured:' + error);
          }
        );
      this.billingDetailsTab = true;
      this.subscriptions.push(this.collectionBookListSubscription);
    }
  }

  getBookImageLinks(book: BooksDetail): string {
    const imgPath = book.volumeInfo.imageLinks;
    /* istanbul ignore else */
    if (imgPath) {
      return imgPath.smallThumbnail;
    }
  }

  getBookInfo(book: BooksDetail, info: string): string {
    this.averageRating = book.volumeInfo.averageRating;
    return book.volumeInfo[info];
  }

  getBillingDetails(book: BooksDetail, info: string): string {
    return book[info];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
