import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CollectionComponent } from './collection.component';
import { BooksFacade } from '../../../store';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let booksFacade: BooksFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CollectionComponent],
      providers: [{ provide: BooksFacade }],
    });
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    booksFacade = TestBed.inject(BooksFacade);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('page loads initialy without any error', () => {
    component.ngOnInit();
  });

  it('trackByBookId should properly work', () => {
    jest.spyOn(component, 'trackByBookId');
    component.trackByBookId(1, { id: 'cdHJcGiju' });
    expect(component.trackByBookId).toHaveBeenCalled();
  });
});
