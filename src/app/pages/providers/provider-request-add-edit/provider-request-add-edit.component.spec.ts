import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestAddEditComponent } from './provider-request-add-edit.component';

describe('ProviderRequestAddEditComponent', () => {
  let component: ProviderRequestAddEditComponent;
  let fixture: ComponentFixture<ProviderRequestAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderRequestAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRequestAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
