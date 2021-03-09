import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBooksComponent } from './pages';
import { CartComponent } from './pages';
import { CollectionComponent } from './pages';
import { BookDetailComponent } from './pages';
import { PurchaseBookComponent } from './pages';

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
