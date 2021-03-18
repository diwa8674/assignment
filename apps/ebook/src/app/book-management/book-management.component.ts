import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import * as Facade from '../store';

@Component({
  selector: 'assignment-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss'],
})
export class BookManagementComponent implements OnInit, OnDestroy {
  count: number;
  collectionCount: number;
  mobileQuery: MediaQueryList;

  cartItemsCountSubscription: Subscription;
  collectionItemsCountSubscription: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private facade: Facade.BooksFacade,
    private media: MediaMatcher,
    private logger: NGXLogger
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 720px)');
  }

  ngOnInit(): void {
    this.cartItemsCountSubscription = this.facade.getCartItemsCount().subscribe(
      (count) => {
        this.count = count;
      },
      (error) => {
        this.logger.error('Error Occured:' + error);
      }
    );
    this.collectionItemsCountSubscription = this.facade
      .getCollectionItemsCount()
      .subscribe(
        (count) => {
          this.collectionCount = count;
        },
        (error) => {
          this.logger.error('Error Occured:' + error);
        }
      );
    this.subscriptions.push(this.cartItemsCountSubscription);
    this.subscriptions.push(this.collectionItemsCountSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
