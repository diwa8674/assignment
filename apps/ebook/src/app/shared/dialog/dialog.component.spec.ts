import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DialogComponent],
    });
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
