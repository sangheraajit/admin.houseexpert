import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRequestListComponent } from './provider-request-list.component';

describe('ProviderRequestListComponent', () => {
  let component: ProviderRequestListComponent;
  let fixture: ComponentFixture<ProviderRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
