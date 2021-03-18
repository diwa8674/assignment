import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '../shared';
import { BookManagementRoutingModule } from './book-management-routing.module';
import {
  SearchBooksComponent,
  CartComponent,
  CollectionComponent,
  BookDetailComponent,
} from './pages';
import { reducer, BookEffects, BooksFacade } from '../store';
import { PurchaseBookComponent } from './pages/purchase-book/purchase-book.component';
import { BooksListComponent } from './pages/books-list/books-list.component';

@NgModule({
  declarations: [
    SearchBooksComponent,
    CartComponent,
    CollectionComponent,
    BookDetailComponent,
    PurchaseBookComponent,
    BooksListComponent,
  ],
  imports: [
    CommonModule,
    BookManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forFeature('books', reducer),
    EffectsModule.forFeature([BookEffects]),
    NgbModule,
  ],
  providers: [BooksFacade],
})
export class BookManagementModule {}
