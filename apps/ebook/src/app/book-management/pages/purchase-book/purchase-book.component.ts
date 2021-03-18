import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as Facade from '../../../store';
import * as sharedModule from '../../../shared';
import { BooksDetail } from '../../../core';

@Component({
  selector: 'assignment-purchase-book',
  templateUrl: './purchase-book.component.html',
  styleUrls: ['./purchase-book.component.scss'],
})
export class PurchaseBookComponent implements OnInit, OnDestroy {
  purchaseForm: FormGroup;
  bookId: string;
  imagePath =
    'https://static.vecteezy.com/system/resources/thumbnails/000/437/183/small/Ecommerce__28108_29.jpg';

  routeParamSubscription: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private facade: Facade.BooksFacade,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.purchaseForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      address: new FormControl(null),
    });
    this.routeParamSubscription = this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });
    this.subscriptions.push(this.routeParamSubscription);
  }

  onSubmit(): void {
    this.facade.addBookToCollectionList(
      new BooksDetail({
        id: this.bookId,
        volumeInfo: null,
        name: this.purchaseForm.controls['name'].value,
        email: this.purchaseForm.controls['email'].value,
        phone: this.purchaseForm.controls['phone'].value,
        address: this.purchaseForm.controls['address'].value,
      })
    );
    this.dialog.open(sharedModule.DialogComponent);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
