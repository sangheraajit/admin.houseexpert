import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTypesAddEditComponent } from './provider-types-add-edit.component';

describe('ProviderTypesAddEditComponent', () => {
  let component: ProviderTypesAddEditComponent;
  let fixture: ComponentFixture<ProviderTypesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderTypesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
