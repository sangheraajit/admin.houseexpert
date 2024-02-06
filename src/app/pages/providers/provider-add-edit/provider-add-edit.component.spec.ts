import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAddEditComponent } from './provider-add-edit.component';

describe('ProviderAddEditComponent', () => {
  let component: ProviderAddEditComponent;
  let fixture: ComponentFixture<ProviderAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
