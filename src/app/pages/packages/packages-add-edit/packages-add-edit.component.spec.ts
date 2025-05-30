import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesAddEditComponent } from './packages-add-edit.component';

describe('PackagesAddEditComponent', () => {
  let component: PackagesAddEditComponent;
  let fixture: ComponentFixture<PackagesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
