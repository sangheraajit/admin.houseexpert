import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CftratemstListComponent } from './cftratemst-list.component';

describe('CftratemstListComponent', () => {
  let component: CftratemstListComponent;
  let fixture: ComponentFixture<CftratemstListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CftratemstListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CftratemstListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
