import { Component, OnInit } from '@angular/core';

import * as Facade from '../../../store';

@Component({
  selector: 'assignment-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  componentType = 'cart';
  showAllCartItems: boolean;
  cartBookId: string;

  constructor(private facade: Facade.BooksFacade) {}

  ngOnInit(): void {
    this.displayAllCartItems();
  }

  displayAllCartItems(): void {
    this.showAllCartItems = true;
  }

  onCardClick(bookId: string): void {
    this.showAllCartItems = false;
    this.cartBookId = bookId;
  }

  removeItem(bookId: string): void {
    this.facade.removeItemFromCart(bookId);
    this.displayAllCartItems();
  }
}
