import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTypesListComponent } from './provider-types-list.component';

describe('ProviderTypesListComponent', () => {
  let component: ProviderTypesListComponent;
  let fixture: ComponentFixture<ProviderTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderTypesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
