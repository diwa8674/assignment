import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import * as Facade from '../store';

@Component({
  selector: 'assignment-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss'],
})
export class BookManagementComponent implements OnInit {
  count: number;
  collectionCount: number;
  mobileQuery: MediaQueryList;

  constructor(private facade: Facade.BooksFacade, private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 720px)');
  }

  ngOnInit(): void {
    this.facade.getCartItemsCount().subscribe((count) => {
      this.count = count;
    });
    this.facade.getCollectionItemsCount().subscribe((count) => {
      this.collectionCount = count;
    });
  }
}
