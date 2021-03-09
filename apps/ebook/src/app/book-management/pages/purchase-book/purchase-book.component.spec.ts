import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { PurchaseBookComponent } from './purchase-book.component';
import { BooksFacade } from '../../../store';

describe('PurchaseBookComponent', () => {
  let component: PurchaseBookComponent;
  let fixture: ComponentFixture<PurchaseBookComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({ open: () => ({}) });
    const activatedRouteStub = () => ({
      params: { subscribe: (f: (arg0: {}) => any) => f({}) },
    });
    TestBed.configureTestingModule({
      imports: [FormsModule, StoreModule.forRoot({})],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PurchaseBookComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: BooksFacade },
      ],
    });
    fixture = TestBed.createComponent(PurchaseBookComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`imagePath has default value`, () => {
    expect(component.imagePath).toEqual(
      `https://static.vecteezy.com/system/resources/thumbnails/000/437/183/small/Ecommerce__28108_29.jpg`
    );
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const matDialogStub: MatDialog = fixture.debugElement.injector.get(
        MatDialog
      );
      spyOn(matDialogStub, 'open').and.callThrough();
      component.onSubmit();
      expect(matDialogStub.open).toHaveBeenCalled();
    });
  });

  it('page loads initially without any error', () => {
    component.ngOnInit();
  });
});
