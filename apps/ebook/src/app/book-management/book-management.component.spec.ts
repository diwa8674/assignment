import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BookManagementComponent } from './book-management.component';
import { BooksFacade } from '../store';

describe('BookManagementComponent', () => {
  let component: BookManagementComponent;
  let fixture: ComponentFixture<BookManagementComponent>;
  let booksFacade: BooksFacade;

  beforeEach(() => {
    const mediaMatcherStub = () => ({ matchMedia: () => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BookManagementComponent],
      providers: [
        {
          provide: BooksFacade,
          useValue: {
            getCartItemsCount: () => of(1),
            getCollectionItemsCount: () => of(2),
          },
        },
        { provide: MediaMatcher, useFactory: mediaMatcherStub },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(BookManagementComponent);
    component = fixture.componentInstance;
    booksFacade = TestBed.inject(BooksFacade);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
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
});
