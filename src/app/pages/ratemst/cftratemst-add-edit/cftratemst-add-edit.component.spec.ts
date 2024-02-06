import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CftratemstAddEditComponent } from './cftratemst-add-edit.component';

describe('CftratemstAddEditComponent', () => {
  let component: CftratemstAddEditComponent;
  let fixture: ComponentFixture<CftratemstAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CftratemstAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CftratemstAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
