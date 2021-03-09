import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import * as Facade from '../../../store';
import * as sharedModule from '../../../shared';
import { BooksDetail } from '../../../core';

@Component({
  selector: 'assignment-purchase-book',
  templateUrl: './purchase-book.component.html',
  styleUrls: ['./purchase-book.component.scss'],
})
export class PurchaseBookComponent implements OnInit {
  bookId: string;
  imagePath: String =
    'https://static.vecteezy.com/system/resources/thumbnails/000/437/183/small/Ecommerce__28108_29.jpg';
  name: string;
  email: string;
  phone: string;
  address: string;

  constructor(
    private facade: Facade.BooksFacade,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
  }

  onSubmit(): void {
    this.facade.addBookToCollectionList(
      new BooksDetail({
        id: this.bookId,
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
      })
    );
    this.dialog.open(sharedModule.DialogComponent);
  }
}
