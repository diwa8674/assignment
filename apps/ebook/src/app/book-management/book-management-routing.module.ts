import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  SearchBooksComponent,
  CartComponent,
  CollectionComponent,
  BookDetailComponent,
  PurchaseBookComponent,
} from './pages';

const routes: Routes = [
  {
    path: 'search',
    component: SearchBooksComponent,
  },
  {
    path: 'details/:id',
    component: BookDetailComponent,
  },
  {
    path: 'buy/:id',
    component: PurchaseBookComponent,
  },
  { path: 'cart', component: CartComponent },
  { path: 'collection', component: CollectionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BookManagementRoutingModule {}
