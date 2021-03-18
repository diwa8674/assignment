import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  BookManagementComponent,
  BookManagementModule,
} from './book-management';
import { CoreModule } from './core';
import { DialogComponent, Utils, MaterialModule } from './shared';

@NgModule({
  declarations: [AppComponent, BookManagementComponent, DialogComponent],
  imports: [
    BrowserModule,
    RouterModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    BrowserAnimationsModule,
    AppRoutingModule,
    BookManagementModule,
    MaterialModule,
    CoreModule,
    EffectsModule.forRoot([]),
    NgbModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
    }),
  ],
  providers: [Utils],
  bootstrap: [AppComponent],
})
export class AppModule {}
