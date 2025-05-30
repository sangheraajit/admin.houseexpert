import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesAddEditComponent } from './charges-add-edit.component';

describe('ChargesAddEditComponent', () => {
  let component: ChargesAddEditComponent;
  let fixture: ComponentFixture<ChargesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
