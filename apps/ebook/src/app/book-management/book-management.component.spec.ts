import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { concat, of, throwError } from 'rxjs';

import { NGXLogger } from 'ngx-logger';

import { BooksFacade } from '../store';
import { BookManagementComponent } from './book-management.component';

describe('BookManagementComponent', () => {
  let component: BookManagementComponent;
  let fixture: ComponentFixture<BookManagementComponent>;
  let booksFacade: BooksFacade;

  beforeEach(() => {
    const mediaMatcherStub = () => ({ matchMedia: () => ({}) });
    const nGXLoggerStub = () => ({ error: () => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookManagementComponent],
      providers: [
        {
          provide: BooksFacade,
          useValue: {
            getCartItemsCount: () =>
              concat(of(1), throwError(new Error('oops!'))),
            getCollectionItemsCount: () =>
              concat(of(1), throwError(new Error('oops!'))),
          },
        },
        { provide: MediaMatcher, useFactory: mediaMatcherStub },
        { provide: NGXLogger, useFactory: nGXLoggerStub },
      ],
    });
    fixture = TestBed.createComponent(BookManagementComponent);
    component = fixture.componentInstance;
    booksFacade = TestBed.inject(BooksFacade);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`subscriptions has default value`, () => {
    expect(component.subscriptions).toEqual([]);
  });

  it(
    'should call getCartItemsCount and getCollectionItemsCount to get count of cart and collection list properly',
    waitForAsync(() => {
      jest.spyOn(booksFacade, 'getCartItemsCount');
      jest.spyOn(booksFacade, 'getCollectionItemsCount');
      component.ngOnInit();
      fixture.detectChanges();
      expect(booksFacade.getCartItemsCount).toHaveBeenCalled();
      expect(booksFacade.getCollectionItemsCount).toHaveBeenCalled();
    })
  );

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const nGXLoggerStub: NGXLogger = fixture.debugElement.injector.get(
        NGXLogger
      );
      spyOn(nGXLoggerStub, 'error').and.callThrough();
      component.ngOnInit();
      expect(nGXLoggerStub.error).toHaveBeenCalled();
    });
  });
});
