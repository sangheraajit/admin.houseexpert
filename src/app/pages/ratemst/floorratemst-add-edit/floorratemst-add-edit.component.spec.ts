import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorratemstAddEditComponent } from './floorratemst-add-edit.component';

describe('FloorratemstAddEditComponent', () => {
  let component: FloorratemstAddEditComponent;
  let fixture: ComponentFixture<FloorratemstAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorratemstAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorratemstAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
