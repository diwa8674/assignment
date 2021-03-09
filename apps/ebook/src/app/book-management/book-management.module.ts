import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../shared';
import { BookManagementRoutingModule } from './book-management-routing.module';
import { SearchBooksComponent } from './pages';
import { CartComponent } from './pages';
import { CollectionComponent } from './pages';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { reducer, BookEffects, BooksFacade } from '../store';
import { PurchaseBookComponent } from './pages/purchase-book/purchase-book.component';
@NgModule({
  declarations: [
    SearchBooksComponent,
    CartComponent,
    CollectionComponent,
    BookDetailComponent,
    PurchaseBookComponent,
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
