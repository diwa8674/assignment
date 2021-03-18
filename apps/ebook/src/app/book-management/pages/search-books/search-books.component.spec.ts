import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { Utils } from '../../../shared';
import { BooksFacade } from '../../../store';
import { SearchBooksComponent } from './search-books.component';

describe('SearchBooksComponent', () => {
  let component: SearchBooksComponent;
  let fixture: ComponentFixture<SearchBooksComponent>;

  beforeEach(() => {
    const utilsStub = () => ({
      isBlank: () => {
        return false;
      },
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchBooksComponent],
      providers: [
        { provide: Utils, useFactory: utilsStub },
        { provide: BooksFacade },
      ],
    });
    fixture = TestBed.createComponent(SearchBooksComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`componentType has default value`, () => {
    expect(component.componentType).toEqual(`search`);
  });

  it('load ngOnit without error', () => {
    const spy = jest.spyOn(component, 'searchBooks');
    component.searchBooks('angular');

    expect(spy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.searchBooks).toBeCalled();
  });
});
