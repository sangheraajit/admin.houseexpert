import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAddEditComponent } from './customer-add-edit.component';



describe('ArticlemstAddEditComponent', () => {
  let component: CustomerAddEditComponent;
  let fixture: ComponentFixture<CustomerAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
